import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { handlePaymentRequest } from './payment.js'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = Number(process.env.PORT || 5000)
const distDir = path.join(__dirname, '..', 'dist')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', async (req, res, next) => {
  const handled = await handlePaymentRequest(req, res, process.env)
  if (!handled) next()
})
app.use(express.static(distDir))
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next()
  res.sendFile(path.join(distDir, 'index.html'), (err) => {
    if (err) next()
  })
})

app.listen(PORT, () => {
  console.log(`Ezycertify payment server running on http://localhost:${PORT}`)
})
