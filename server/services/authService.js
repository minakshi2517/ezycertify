import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import { db } from '../db/database.js'

// Email RFC 5322 standard check
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false
  const trimmed = email.trim()
  if (trimmed.length > 254 || trimmed.length < 5) return false
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/
  if (!emailRegex.test(trimmed)) return false

  const parts = trimmed.split('@')
  if (parts.length !== 2) return false
  const [local, domain] = parts
  if (local.length > 64) return false
  if (!domain.includes('.')) return false
  const tld = domain.split('.').pop()
  if (!tld || tld.length < 2) return false
  return true
}

// E.164 / International & standard mobile phone validation
export function sanitizePhone(phone) {
  if (!phone || typeof phone !== 'string') return ''
  const cleaned = phone.replace(/[\s\-()]/g, '')
  if (cleaned.startsWith('0')) {
    return `+91${cleaned.slice(1)}`
  }
  if (!cleaned.startsWith('+') && cleaned.length === 10) {
    return `+91${cleaned}`
  }
  return cleaned
}

export function isValidPhone(phone) {
  const sanitized = sanitizePhone(phone)
  const phoneRegex = /^\+?[1-9]\d{7,14}$/
  return phoneRegex.test(sanitized)
}

// Strong password policy
export function isStrongPassword(password) {
  if (!password || typeof password !== 'string') return false
  if (password.length < 8) return false
  const hasUpper = /[A-Z]/.test(password)
  const hasLower = /[a-z]/.test(password)
  const hasDigit = /\d/.test(password)
  const hasSpecial = /[^A-Za-z0-9]/.test(password)
  return hasUpper && hasLower && hasDigit && hasSpecial
}

export function hashString(str) {
  return crypto.createHash('sha256').update(String(str).trim()).digest('hex')
}

export function generateOtp() {
  return String(crypto.randomInt(100000, 999999))
}

export function generateToken() {
  return crypto.randomBytes(32).toString('hex')
}

export function maskEmail(email) {
  if (!email || !email.includes('@')) return email
  const [user, domain] = email.split('@')
  if (user.length <= 2) {
    return `${user[0]}*@${domain}`
  }
  const maskedUser = `${user[0]}${'*'.repeat(Math.max(1, user.length - 2))}${user[user.length - 1]}`
  return `${maskedUser}@${domain}`
}

export function maskPhone(phone) {
  if (!phone) return phone
  const clean = sanitizePhone(phone)
  if (clean.length <= 6) return '******'
  const prefix = clean.slice(0, 3)
  const suffix = clean.slice(-4)
  const middle = '*'.repeat(clean.length - 7)
  return `${prefix} ${middle}${suffix}`
}

// Find user by email or phone
export function findUserByEmail(email) {
  if (!email) return null
  return db.prepare('SELECT * FROM users WHERE email = ?').get(email.toLowerCase().trim())
}

export function findUserByPhone(phone) {
  if (!phone) return null
  const sanitized = sanitizePhone(phone)
  return db.prepare('SELECT * FROM users WHERE phone = ?').get(sanitized)
}

export function findUserById(id) {
  if (!id) return null
  return db.prepare('SELECT * FROM users WHERE id = ?').get(id)
}

export function findUserByIdentifier(identifier) {
  if (!identifier) return null
  const clean = String(identifier).trim()
  if (clean.includes('@')) {
    return findUserByEmail(clean)
  }
  return findUserByPhone(clean)
}

// Create new user (pending verification)
export function createUser({ name, email, phone, password }) {
  const cleanEmail = email.toLowerCase().trim()
  const cleanPhone = sanitizePhone(phone)
  const cleanName = String(name || '').trim()

  if (!isValidEmail(cleanEmail)) {
    throw new Error('Please enter a valid email address.')
  }
  if (!isValidPhone(cleanPhone)) {
    throw new Error('Please enter a valid phone number.')
  }
  if (!isStrongPassword(password)) {
    throw new Error('Password must be at least 8 characters long and include an uppercase letter, lowercase letter, a number, and a special character.')
  }

  // Duplicate checks
  if (findUserByEmail(cleanEmail)) {
    throw new Error('An account already exists with this email address. Please log in.')
  }
  if (findUserByPhone(cleanPhone)) {
    throw new Error('An account already exists with this phone number. Please log in.')
  }

  const salt = bcrypt.genSaltSync(12)
  const passwordHash = bcrypt.hashSync(password, salt)
  const userId = `user_${crypto.randomBytes(8).toString('hex')}`
  const now = new Date().toISOString()

  db.prepare(`
    INSERT INTO users (id, name, email, phone, password_hash, email_verified, phone_verified, two_factor_enabled, role, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, 0, 0, 1, 'student', ?, ?)
  `).run(userId, cleanName, cleanEmail, cleanPhone, passwordHash, now, now)

  return findUserById(userId)
}

// Create Verification Record with rate limiting & cooldown
export function createVerification({ userId, purpose, destination, metadata = null, isNumeric = true }) {
  const user = findUserById(userId)
  if (!user) throw new Error('User not found.')

  const now = new Date()
  const rawCode = isNumeric ? generateOtp() : generateToken()
  const tokenHash = hashString(rawCode)

  // Check cooldown for active verification
  const existing = db.prepare(`
    SELECT * FROM verifications
    WHERE user_id = ? AND purpose = ? AND used_at IS NULL
    ORDER BY created_at DESC LIMIT 1
  `).get(userId, purpose)

  if (existing && existing.resend_available_at && new Date(existing.resend_available_at) > now) {
    const secondsLeft = Math.ceil((new Date(existing.resend_available_at) - now) / 1000)
    throw new Error(`Please wait ${secondsLeft} seconds before requesting a new code.`)
  }

  // Expiration (10 mins for OTP, 1 hour for reset token)
  const expiresAt = new Date(now.getTime() + (isNumeric ? 10 : 60) * 60 * 1000).toISOString()
  const resendAt = new Date(now.getTime() + 60 * 1000).toISOString() // 60s cooldown
  const verificationId = `ver_${crypto.randomBytes(8).toString('hex')}`

  db.prepare(`
    INSERT INTO verifications (id, user_id, purpose, token_hash, destination, attempts, max_attempts, expires_at, resend_available_at, metadata, created_at)
    VALUES (?, ?, ?, ?, ?, 0, 5, ?, ?, ?, ?)
  `).run(
    verificationId,
    userId,
    purpose,
    tokenHash,
    destination,
    expiresAt,
    resendAt,
    metadata ? JSON.stringify(metadata) : null,
    now.toISOString()
  )

  return { rawCode, verificationId, expiresAt, destination }
}

// Verify Code/Token
export function verifyCode({ userId, purpose, code }) {
  if (!userId || !purpose || !code) {
    throw new Error('Missing verification parameters.')
  }

  const tokenHash = hashString(code)
  const record = db.prepare(`
    SELECT * FROM verifications
    WHERE user_id = ? AND purpose = ? AND used_at IS NULL
    ORDER BY created_at DESC LIMIT 1
  `).get(userId, purpose)

  if (!record) {
    throw new Error('No pending verification found or code has already been used.')
  }

  const now = new Date()
  if (new Date(record.expires_at) < now) {
    throw new Error('Verification code has expired. Please request a new one.')
  }

  if (record.attempts >= record.max_attempts) {
    throw new Error('Too many failed attempts. This code is locked. Please request a new one.')
  }

  if (record.token_hash !== tokenHash) {
    db.prepare('UPDATE verifications SET attempts = attempts + 1 WHERE id = ?').run(record.id)
    const remaining = record.max_attempts - (record.attempts + 1)
    throw new Error(`Invalid verification code. ${remaining} attempt(s) remaining.`)
  }

  // Mark as used atomically
  db.prepare('UPDATE verifications SET used_at = ? WHERE id = ?').run(now.toISOString(), record.id)

  // Update user state based on purpose
  if (purpose === 'email_verify') {
    db.prepare('UPDATE users SET email_verified = 1, updated_at = ? WHERE id = ?').run(now.toISOString(), userId)
  } else if (purpose === 'phone_verify') {
    db.prepare('UPDATE users SET phone_verified = 1, updated_at = ? WHERE id = ?').run(now.toISOString(), userId)
  }

  return { verified: true, user: findUserById(userId) }
}
