import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { db } from '../db/database.js'
import {
  findUserByIdentifier,
  findUserById,
  findUserByEmail,
  isStrongPassword,
  createVerification,
  verifyCode,
  maskEmail,
} from '../services/authService.js'
import {
  generateSessionToken,
  setSessionCookie,
  clearSessionCookie,
  optionalAuthMiddleware,
} from '../services/sessionService.js'
import {
  sendVerificationEmail,
  send2FAEmail,
  sendPasswordResetEmail,
} from '../services/emailService.js'
import rateLimit from 'express-rate-limit'

const router = Router()

// Rate limiters for brute-force prevention
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: { error: 'Too many authentication attempts. Please try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
})

const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: 'Too many OTP verification attempts. Please wait 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
})

function isSmtpConfigured() {
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS
  return Boolean(pass && !pass.includes('xxxxxxxx') && !pass.includes('your_'))
}

// 1. SIGNUP (Email-based)
router.post('/signup', authLimiter, async (req, res) => {
  try {
    const { name, email, phone, password } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Full name, email, and password are required.' })
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({
        error: 'Password must be at least 8 characters long and include an uppercase letter, lowercase letter, a number, and a special character.',
      })
    }

    const existingUser = findUserByEmail(email)
    if (existingUser) {
      return res.status(400).json({ error: 'An account with this email address already exists. Please log in.' })
    }

    const salt = bcrypt.genSaltSync(12)
    const passwordHash = bcrypt.hashSync(password, salt)
    const now = new Date().toISOString()
    const userId = `user_${Date.now()}`

    db.prepare(`
      INSERT INTO users (id, name, email, phone, password_hash, email_verified, phone_verified, two_factor_enabled, role, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, 0, 1, 0, 'student', ?, ?)
    `).run(userId, name.trim(), email.toLowerCase().trim(), phone ? phone.trim() : '', passwordHash, now, now)

    const user = findUserById(userId)

    // Generate Email verification OTP
    const emailVer = createVerification({
      userId: user.id,
      purpose: 'email_verify',
      destination: user.email,
      isNumeric: true,
    })

    const appUrl = process.env.APP_URL || `${req.protocol}://${req.get('host')}`
    const verifyLink = `${appUrl}/verify-email?token=${emailVer.rawCode}&email=${encodeURIComponent(user.email)}`
    
    await sendVerificationEmail(user.email, user.name, emailVer.rawCode, verifyLink)

    const smtpReady = isSmtpConfigured()

    res.status(201).json({
      success: true,
      message: 'Account registered! Please enter the 6-digit verification code sent to your email.',
      userId: user.id,
      email: user.email,
      maskedEmail: maskEmail(user.email),
      devCode: !smtpReady ? emailVer.rawCode : undefined,
    })
  } catch (err) {
    console.error('Signup error:', err.message)
    res.status(400).json({ error: err.message || 'Signup failed.' })
  }
})

// 2. VERIFY EMAIL AND AUTO LOGIN
router.post('/verify-email', otpLimiter, (req, res) => {
  try {
    const { userId, email, code } = req.body
    let targetUserId = userId

    if (!targetUserId && email) {
      const user = findUserByEmail(email)
      if (user) targetUserId = user.id
    }

    if (!targetUserId || !code) {
      return res.status(400).json({ error: 'User identifier and verification code are required.' })
    }

    verifyCode({ userId: targetUserId, purpose: 'email_verify', code: String(code).trim() })

    const user = findUserById(targetUserId)
    if (!user) {
      return res.status(404).json({ error: 'User not found.' })
    }

    const now = new Date().toISOString()
    db.prepare('UPDATE users SET email_verified = 1, phone_verified = 1, last_login = ?, updated_at = ? WHERE id = ?').run(now, now, user.id)

    const token = generateSessionToken(user)
    setSessionCookie(res, token)

    const { password_hash, ...safeUser } = user
    res.json({
      success: true,
      message: 'Email successfully verified. You are now logged in.',
      emailVerified: true,
      user: safeUser,
      token,
    })
  } catch (err) {
    res.status(400).json({ error: err.message || 'Email verification failed.' })
  }
})

// 3. RESEND EMAIL VERIFICATION CODE
router.post('/resend-email-otp', otpLimiter, async (req, res) => {
  try {
    const { userId, email } = req.body
    let user = userId ? findUserById(userId) : findUserByEmail(email)
    if (!user) return res.status(404).json({ error: 'User not found.' })

    if (user.email_verified) {
      return res.status(400).json({ error: 'Email address is already verified.' })
    }

    const ver = createVerification({
      userId: user.id,
      purpose: 'email_verify',
      destination: user.email,
      isNumeric: true,
    })

    const appUrl = process.env.APP_URL || `${req.protocol}://${req.get('host')}`
    const verifyLink = `${appUrl}/verify-email?token=${ver.rawCode}&email=${encodeURIComponent(user.email)}`
    await sendVerificationEmail(user.email, user.name, ver.rawCode, verifyLink)

    const smtpReady = isSmtpConfigured()
    res.json({
      success: true,
      message: 'New verification code sent to your email.',
      maskedEmail: maskEmail(user.email),
      devCode: !smtpReady ? ver.rawCode : undefined,
    })
  } catch (err) {
    res.status(400).json({ error: err.message || 'Could not resend email code.' })
  }
})

// 4. LOGIN (Email & Password -> 2FA if enabled)
router.post('/login', authLimiter, async (req, res) => {
  try {
    const { identifier, password } = req.body
    if (!identifier || !password) {
      return res.status(400).json({ error: 'Email and password are required.' })
    }

    const user = findUserByIdentifier(identifier)
    if (!user) {
      return res.status(401).json({ error: 'No account found with this email address.' })
    }

    const passwordMatches = bcrypt.compareSync(password, user.password_hash)
    if (!passwordMatches) {
      return res.status(401).json({ error: 'Incorrect password. Please try again.' })
    }

    // Two-Step Verification Check
    if (user.two_factor_enabled) {
      const ver = createVerification({
        userId: user.id,
        purpose: 'login_2fa',
        destination: user.email,
        isNumeric: true,
      })

      await send2FAEmail(user.email, user.name, ver.rawCode)
      const smtpReady = isSmtpConfigured()

      return res.json({
        require2FA: true,
        userId: user.id,
        maskedEmail: maskEmail(user.email),
        channel: 'email',
        message: 'Security code sent to your registered email.',
        devCode: !smtpReady ? ver.rawCode : undefined,
      })
    }

    // Direct Login
    const now = new Date().toISOString()
    db.prepare('UPDATE users SET last_login = ?, updated_at = ? WHERE id = ?').run(now, now, user.id)

    const token = generateSessionToken(user)
    setSessionCookie(res, token)

    const { password_hash, ...safeUser } = user
    res.json({ success: true, user: safeUser, token })
  } catch (err) {
    res.status(500).json({ error: err.message || 'Login failed.' })
  }
})

// 5. RESEND LOGIN 2FA OTP
router.post('/send-2fa-otp', otpLimiter, async (req, res) => {
  try {
    const { userId } = req.body
    const user = findUserById(userId)
    if (!user) return res.status(404).json({ error: 'User not found.' })

    const ver = createVerification({
      userId: user.id,
      purpose: 'login_2fa',
      destination: user.email,
      isNumeric: true,
    })

    await send2FAEmail(user.email, user.name, ver.rawCode)
    const smtpReady = isSmtpConfigured()

    res.json({
      success: true,
      message: 'Security code sent to your email.',
      channel: 'email',
      devCode: !smtpReady ? ver.rawCode : undefined,
    })
  } catch (err) {
    res.status(400).json({ error: err.message || 'Could not send 2FA code.' })
  }
})

// 6. VERIFY 2FA AND ESTABLISH SESSION
router.post('/verify-2fa', otpLimiter, (req, res) => {
  try {
    const { userId, code } = req.body
    if (!userId || !code) {
      return res.status(400).json({ error: 'User identifier and verification code are required.' })
    }

    verifyCode({ userId, purpose: 'login_2fa', code: String(code).trim() })

    const user = findUserById(userId)
    if (!user) return res.status(404).json({ error: 'User account not found.' })

    const now = new Date().toISOString()
    db.prepare('UPDATE users SET last_login = ?, updated_at = ? WHERE id = ?').run(now, now, user.id)

    const token = generateSessionToken(user)
    setSessionCookie(res, token)

    const { password_hash, ...safeUser } = user
    res.json({
      success: true,
      message: 'Authentication successful.',
      user: safeUser,
      token,
    })
  } catch (err) {
    res.status(400).json({ error: err.message || 'Verification failed.' })
  }
})

// 7. FORGOT PASSWORD REQUEST
router.post('/forgot-password', authLimiter, async (req, res) => {
  try {
    const { email } = req.body
    if (!email) return res.status(400).json({ error: 'Email address is required.' })

    const user = findUserByEmail(email)
    if (user) {
      const ver = createVerification({
        userId: user.id,
        purpose: 'password_reset',
        destination: user.email,
        isNumeric: false,
      })

      const appUrl = process.env.APP_URL || `${req.protocol}://${req.get('host')}`
      const resetLink = `${appUrl}/reset-password?token=${ver.rawCode}&email=${encodeURIComponent(user.email)}`
      await sendPasswordResetEmail(user.email, user.name, resetLink)
    }

    res.json({
      success: true,
      message: 'If an account exists with this email address, a password reset link has been sent.',
    })
  } catch (err) {
    res.status(500).json({ error: 'Could not process password reset request.' })
  }
})

// 8. RESET PASSWORD
router.post('/reset-password', authLimiter, (req, res) => {
  try {
    const { token, email, newPassword } = req.body
    if (!token || !email || !newPassword) {
      return res.status(400).json({ error: 'Token, email, and new password are required.' })
    }

    if (!isStrongPassword(newPassword)) {
      return res.status(400).json({
        error: 'Password must be at least 8 characters long and include an uppercase letter, lowercase letter, a number, and a special character.',
      })
    }

    const user = findUserByEmail(email)
    if (!user) return res.status(400).json({ error: 'Invalid or expired password reset link.' })

    verifyCode({ userId: user.id, purpose: 'password_reset', code: token })

    const salt = bcrypt.genSaltSync(12)
    const passwordHash = bcrypt.hashSync(newPassword, salt)
    const now = new Date().toISOString()

    db.prepare('UPDATE users SET password_hash = ?, updated_at = ? WHERE id = ?').run(passwordHash, now, user.id)

    res.json({ success: true, message: 'Password has been successfully updated. You may now log in.' })
  } catch (err) {
    res.status(400).json({ error: err.message || 'Password reset failed.' })
  }
})

// 9. CURRENT USER
router.get('/me', optionalAuthMiddleware, (req, res) => {
  res.json({ success: true, user: req.user || null })
})

// 10. LOGOUT
router.post('/logout', (req, res) => {
  clearSessionCookie(res)
  res.json({ success: true, message: 'Successfully logged out.' })
})

export default router
