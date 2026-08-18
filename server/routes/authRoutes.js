import { Router } from 'express'
import bcrypt from 'bcryptjs'
import rateLimit from 'express-rate-limit'
import {
  createUser,
  findUserByEmail,
  findUserById,
  findUserByIdentifier,
  createVerification,
  verifyCode,
  maskEmail,
  maskPhone,
  isValidEmail,
  isStrongPassword,
} from '../services/authService.js'
import { sendVerificationEmail, send2FAEmail, sendPasswordResetEmail } from '../services/emailService.js'
import { sendPhoneOtp } from '../services/smsService.js'
import { generateSessionToken, setSessionCookie, clearSessionCookie, authMiddleware } from '../services/sessionService.js'
import { db } from '../db/database.js'

const router = Router()

// Rate limiters for security
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 30, // 30 attempts per IP
  message: { error: 'Too many authentication attempts. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
})

const otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 15,
  message: { error: 'Too many OTP requests. Please try again in a few minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
})

// 1. SIGNUP
router.post('/signup', authLimiter, async (req, res) => {
  try {
    const { name, email, phone, password, confirmPassword } = req.body

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ error: 'All fields are required.' })
    }

    if (confirmPassword !== undefined && password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match.' })
    }

    const user = createUser({ name, email, phone, password })

    // Generate and send initial Email Verification Code
    const emailVer = createVerification({
      userId: user.id,
      purpose: 'email_verify',
      destination: user.email,
      isNumeric: true,
    })

    const appUrl = process.env.APP_URL || `${req.protocol}://${req.get('host')}`
    const verifyLink = `${appUrl}/verify-email?token=${emailVer.rawCode}&email=${encodeURIComponent(user.email)}`
    
    await sendVerificationEmail(user.email, user.name, emailVer.rawCode, verifyLink)

    // Generate initial Phone OTP
    const phoneVer = createVerification({
      userId: user.id,
      purpose: 'phone_verify',
      destination: user.phone,
      isNumeric: true,
    })
    await sendPhoneOtp(user.phone, phoneVer.rawCode, 'verification')

    res.status(201).json({
      success: true,
      message: 'Account created. Please verify your email and phone number.',
      userId: user.id,
      email: user.email,
      phone: user.phone,
      maskedEmail: maskEmail(user.email),
      maskedPhone: maskPhone(user.phone),
    })
  } catch (err) {
    res.status(400).json({ error: err.message || 'Signup failed.' })
  }
})

// 2. VERIFY EMAIL
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

    const result = verifyCode({ userId: targetUserId, purpose: 'email_verify', code: String(code).trim() })
    res.json({ success: true, message: 'Email successfully verified.', emailVerified: true })
  } catch (err) {
    res.status(400).json({ error: err.message || 'Email verification failed.' })
  }
})

// 3. RESEND EMAIL VERIFICATION
router.post('/resend-email-otp', otpLimiter, async (req, res) => {
  try {
    const { userId, email } = req.body
    let user = userId ? findUserById(userId) : findUserByEmail(email)
    if (!user) return res.status(404).json({ error: 'User not found.' })

    if (user.email_verified) {
      return res.status(400).json({ error: 'Email is already verified.' })
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

    res.json({ success: true, message: 'New email verification code sent.', maskedEmail: maskEmail(user.email) })
  } catch (err) {
    res.status(400).json({ error: err.message || 'Could not resend email code.' })
  }
})

// 4. VERIFY PHONE OTP
router.post('/verify-phone', otpLimiter, (req, res) => {
  try {
    const { userId, phone, code } = req.body
    let targetUserId = userId

    if (!targetUserId && phone) {
      const user = findUserByIdentifier(phone)
      if (user) targetUserId = user.id
    }

    if (!targetUserId || !code) {
      return res.status(400).json({ error: 'User identifier and OTP are required.' })
    }

    const result = verifyCode({ userId: targetUserId, purpose: 'phone_verify', code: String(code).trim() })
    res.json({ success: true, message: 'Phone number successfully verified.', phoneVerified: true })
  } catch (err) {
    res.status(400).json({ error: err.message || 'Phone OTP verification failed.' })
  }
})

// 5. RESEND PHONE OTP
router.post('/resend-phone-otp', otpLimiter, async (req, res) => {
  try {
    const { userId, phone } = req.body
    let user = userId ? findUserById(userId) : findUserByIdentifier(phone)
    if (!user) return res.status(404).json({ error: 'User not found.' })

    if (user.phone_verified) {
      return res.status(400).json({ error: 'Phone number is already verified.' })
    }

    const ver = createVerification({
      userId: user.id,
      purpose: 'phone_verify',
      destination: user.phone,
      isNumeric: true,
    })
    await sendPhoneOtp(user.phone, ver.rawCode, 'verification')

    res.json({ success: true, message: 'New phone OTP sent.', maskedPhone: maskPhone(user.phone) })
  } catch (err) {
    res.status(400).json({ error: err.message || 'Could not resend phone OTP.' })
  }
})

// 6. LOGIN (Step 1: Check Password -> Trigger 2FA)
router.post('/login', authLimiter, async (req, res) => {
  try {
    const { identifier, password } = req.body
    if (!identifier || !password) {
      return res.status(400).json({ error: 'Email/Phone and password are required.' })
    }

    const user = findUserByIdentifier(identifier)
    if (!user) {
      return res.status(401).json({ error: 'No account found with this email address or phone number.' })
    }

    const passwordMatches = bcrypt.compareSync(password, user.password_hash)
    if (!passwordMatches) {
      return res.status(401).json({ error: 'Incorrect password. Please try again.' })
    }

    // Two-Step Verification Check
    if (user.two_factor_enabled) {
      // Default: send 2FA OTP to email (or phone if preferred)
      const ver = createVerification({
        userId: user.id,
        purpose: 'login_2fa',
        destination: user.email,
        isNumeric: true,
      })

      await send2FAEmail(user.email, user.name, ver.rawCode)

      return res.json({
        require2FA: true,
        userId: user.id,
        maskedEmail: maskEmail(user.email),
        maskedPhone: maskPhone(user.phone),
        channel: 'email',
        message: 'Security code sent to your registered email.',
      })
    }

    // Direct Login if 2FA is disabled (e.g. Admin direct or testing)
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

// 7. SWITCH / REQUEST 2FA CHANNEL (Email vs Phone)
router.post('/send-2fa-otp', otpLimiter, async (req, res) => {
  try {
    const { userId, channel } = req.body // channel = 'email' | 'phone'
    const user = findUserById(userId)
    if (!user) return res.status(404).json({ error: 'User not found.' })

    const destination = channel === 'phone' ? user.phone : user.email
    const ver = createVerification({
      userId: user.id,
      purpose: 'login_2fa',
      destination,
      isNumeric: true,
    })

    if (channel === 'phone') {
      await sendPhoneOtp(user.phone, ver.rawCode, '2fa')
    } else {
      await send2FAEmail(user.email, user.name, ver.rawCode)
    }

    res.json({
      success: true,
      channel,
      destination: channel === 'phone' ? maskPhone(user.phone) : maskEmail(user.email),
      message: `Verification code sent to ${channel === 'phone' ? maskPhone(user.phone) : maskEmail(user.email)}`,
    })
  } catch (err) {
    res.status(400).json({ error: err.message || 'Could not send 2FA code.' })
  }
})

// 8. VERIFY 2FA & ESTABLISH SESSION
router.post('/verify-2fa', otpLimiter, (req, res) => {
  try {
    const { userId, code } = req.body
    if (!userId || !code) {
      return res.status(400).json({ error: 'User ID and security code are required.' })
    }

    const { verified, user } = verifyCode({ userId, purpose: 'login_2fa', code: String(code).trim() })
    if (!verified || !user) {
      return res.status(400).json({ error: 'Invalid or expired 2FA code.' })
    }

    const now = new Date().toISOString()
    db.prepare('UPDATE users SET last_login = ?, updated_at = ? WHERE id = ?').run(now, now, user.id)

    const token = generateSessionToken(user)
    setSessionCookie(res, token)

    const { password_hash, ...safeUser } = user
    res.json({ success: true, user: safeUser, token })
  } catch (err) {
    res.status(400).json({ error: err.message || '2FA verification failed.' })
  }
})

// 9. FORGOT PASSWORD
router.post('/forgot-password', authLimiter, async (req, res) => {
  try {
    const { email } = req.body
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ error: 'Please enter a valid registered email address.' })
    }

    const user = findUserByEmail(email)
    if (!user) {
      // Return success without revealing user existence (Security Best Practice)
      return res.json({ success: true, message: 'If an account exists with this email, password reset instructions have been sent.' })
    }

    const ver = createVerification({
      userId: user.id,
      purpose: 'password_reset',
      destination: user.email,
      isNumeric: false,
    })

    const appUrl = process.env.APP_URL || `${req.protocol}://${req.get('host')}`
    const resetLink = `${appUrl}/reset-password?token=${ver.rawCode}&email=${encodeURIComponent(user.email)}`

    await sendPasswordResetEmail(user.email, user.name, resetLink)
    res.json({ success: true, message: 'If an account exists with this email, password reset instructions have been sent.' })
  } catch (err) {
    res.status(500).json({ error: err.message || 'Could not process password reset request.' })
  }
})

// 10. RESET PASSWORD
router.post('/reset-password', authLimiter, (req, res) => {
  try {
    const { token, email, newPassword } = req.body
    if (!token || !email || !newPassword) {
      return res.status(400).json({ error: 'Token, email, and new password are required.' })
    }

    if (!isStrongPassword(newPassword)) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long and include an uppercase letter, lowercase letter, a number, and a special character.' })
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

// 11. CURRENT USER (/api/auth/me)
router.get('/me', authMiddleware, (req, res) => {
  res.json({ success: true, user: req.user })
})

// 12. LOGOUT
router.post('/logout', (req, res) => {
  clearSessionCookie(res)
  res.json({ success: true, message: 'Successfully logged out.' })
})

export default router
