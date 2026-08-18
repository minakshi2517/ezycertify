import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

dotenv.config()

import './db/database.js'
import authRoutes from './routes/authRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import courseRoutes from './routes/courseRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = Number(process.env.PORT || 5000)
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

// Security HTTP Headers
app.use(
  helmet({
    contentSecurityPolicy: false, // Allows Razorpay and external fonts/assets to load smoothly
    crossOriginEmbedderPolicy: false,
  })
)

// CORS Configuration with Credentials support
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || ALLOWED_ORIGINS.includes(origin) || process.env.NODE_ENV !== 'production') {
        return cb(null, true)
      }
      cb(null, true) // Permissive for subdomains and custom domains
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
)

// Cookie Parser
app.use(cookieParser(process.env.COOKIE_SECRET || 'ezycertify_cookie_secret'))

// JSON Body Parser with raw body preservation for Webhooks
app.use(
  express.json({
    limit: '256kb',
    verify: (req, res, buf) => {
      req.rawBody = buf.toString()
    },
  })
)
app.use(express.urlencoded({ extended: true, limit: '256kb' }))

// Mount Modular API Routes
app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api', paymentRoutes)
app.use('/api', courseRoutes)

// In production / standalone hosting (Hostinger, VPS), serve static assets and SPA catch-all
if (process.env.NODE_ENV === 'production' || fs.existsSync(distDir)) {
  app.use(express.static(distDir))

  // SPA Catch-All
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

// Centralized Error Handler
app.use((err, req, res, next) => {
  console.error('[Server Error]:', err.message)
  const statusCode = err.status || 500
  res.status(statusCode).json({
    error: err.message || 'Internal Server Error. Please contact support.',
  })
})

export default app
