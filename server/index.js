import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '..', '.env') })
dotenv.config()

import { db } from './db/database.js'
import { getSmtpConfig } from './services/smtpConfig.js'
import authRoutes from './routes/authRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import courseRoutes from './routes/courseRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

const distDir = path.join(__dirname, '..', 'dist')

const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:4173',
  'https://ezycertify.com',
  'https://www.ezycertify.com',
  'https://ezycertify.vercel.app',
]

const app = express()
app.set('trust proxy', 1)

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
)

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || ALLOWED_ORIGINS.includes(origin) || process.env.NODE_ENV !== 'production') {
        return cb(null, true)
      }
      cb(null, true)
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
)

app.use(cookieParser(process.env.COOKIE_SECRET || 'ezycertify_cookie_secret'))
app.use(
  express.json({
    limit: '256kb',
    verify: (req, res, buf) => {
      req.rawBody = buf.toString()
    },
  })
)
app.use(express.urlencoded({ extended: true, limit: '256kb' }))

app.get('/api/health', (req, res) => {
  const smtp = getSmtpConfig()
  res.json({
    ok: true,
    service: 'ezycertify',
    smtp: smtp.ready,
    smtpMissing: smtp.missing,
    smtpPlaceholderPassword: smtp.placeholder,
    courses: (db.tables.courses || []).length,
    users: (db.tables.users || []).length,
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api', paymentRoutes)
app.use('/api', courseRoutes)

if (process.env.NODE_ENV === 'production' || fs.existsSync(distDir)) {
  app.use(express.static(distDir))
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next()
    const indexPath = path.join(distDir, 'index.html')
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath)
    } else {
      next()
    }
  })
}

app.use((err, req, res, next) => {
  console.error('[Server Error]:', err.message)
  const statusCode = err.status || 500
  res.status(statusCode).json({
    error: err.message || 'Internal Server Error. Please contact support.',
  })
})

export default app
