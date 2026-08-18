import jwt from 'jsonwebtoken'
import { findUserById } from './authService.js'

const JWT_SECRET = process.env.JWT_SECRET || 'ezycertify_production_jwt_secret_change_me'
const COOKIE_NAME = 'ezycertify_session'

export function generateSessionToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    },
    JWT_SECRET,
    { expiresIn: process.env.SESSION_EXPIRES_IN || '7d' }
  )
}

export function setSessionCookie(res, token) {
  const isProd = process.env.NODE_ENV === 'production'
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'strict' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/',
  })
}

export function clearSessionCookie(res) {
  const isProd = process.env.NODE_ENV === 'production'
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'strict' : 'lax',
    path: '/',
  })
}

export function extractToken(req) {
  if (req.cookies && req.cookies[COOKIE_NAME]) {
    return req.cookies[COOKIE_NAME]
  }
  const authHeader = req.headers.authorization
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7).trim()
  }
  return null
}

export function authMiddleware(req, res, next) {
  const token = extractToken(req)
  if (!token) {
    return res.status(401).json({ error: 'Authentication required. Please log in.' })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    const user = findUserById(decoded.id)
    if (!user) {
      clearSessionCookie(res)
      return res.status(401).json({ error: 'User session invalid. Please log in again.' })
    }

    // Strip password hash from request user object
    const { password_hash, ...safeUser } = user
    req.user = safeUser
    next()
  } catch (err) {
    clearSessionCookie(res)
    return res.status(401).json({ error: 'Session expired or invalid. Please log in again.' })
  }
}

export function optionalAuthMiddleware(req, res, next) {
  const token = extractToken(req)
  if (!token) {
    req.user = null
    return next()
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    const user = findUserById(decoded.id)
    if (user) {
      const { password_hash, ...safeUser } = user
      req.user = safeUser
    }
  } catch {
    req.user = null
  }
  next()
}

export function adminMiddleware(req, res, next) {
  authMiddleware(req, res, () => {
    if (req.user && req.user.role === 'admin') {
      next()
    } else {
      res.status(403).json({ error: 'Access denied. Administrator privileges required.' })
    }
  })
}
