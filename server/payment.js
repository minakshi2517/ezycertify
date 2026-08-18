import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import { getCourseById } from '../src/data/siteData.js'
import { getPayable } from '../src/lib/pricing.js'

const DATA_DIR = path.join(process.cwd(), 'server', 'data')
const ENROLLMENTS_FILE = path.join(DATA_DIR, 'enrollments.json')

export function getKeys(env = process.env) {
  const keyId = String(env.RAZORPAY_KEY_ID || env.VITE_RAZORPAY_KEY_ID || '').trim()
  const keySecret = String(env.RAZORPAY_KEY_SECRET || '').trim()
  if (!keyId || !keySecret || keyId.includes('xxxxxxxx') || keySecret.includes('xxxxxxxx')) {
    return null
  }
  return { keyId, keySecret }
}

function readEnrollments() {
  try {
    return JSON.parse(fs.readFileSync(ENROLLMENTS_FILE, 'utf8'))
  } catch {
    return []
  }
}

function saveEnrollment(record) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
  const list = readEnrollments()
  list.unshift(record)
  fs.writeFileSync(ENROLLMENTS_FILE, JSON.stringify(list, null, 2))
}

function apiPath(req) {
  const raw = String(req.originalUrl || req.url || '').split('?')[0]
  const idx = raw.indexOf('/api')
  return idx >= 0 ? raw.slice(idx + 4) || '/' : raw
}

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload)
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(body)
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
      resolve(req.body)
      return
    }
    const chunks = []
    req.on('data', (chunk) => chunks.push(chunk))
    req.on('end', () => {
      if (!chunks.length) {
        resolve({})
        return
      }
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')))
      } catch {
        reject(new Error('Invalid JSON body'))
      }
    })
    req.on('error', reject)
  })
}

async function razorpayCreateOrder(keys, payload) {
  const auth = Buffer.from(`${keys.keyId}:${keys.keySecret}`).toString('base64')
  const res = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data?.error?.description || 'Razorpay could not create the order.')
  }
  return data
}

export async function handlePaymentRequest(req, res, env = process.env) {
  const route = apiPath(req)

  if (req.method === 'GET' && (route === '/health' || route === 'health')) {
    sendJson(res, 200, { ok: true, configured: Boolean(getKeys(env)) })
    return true
  }

  if (req.method === 'POST' && (route === '/create-order' || route === 'create-order')) {
    try {
      const keys = getKeys(env)
      if (!keys) {
        sendJson(res, 503, {
          error: 'Payment service is temporarily unavailable. Please contact support.',
        })
        return true
      }

      const body = await readJsonBody(req)
      const name = String(body.student?.name || '').trim()
      const email = String(body.student?.email || '').trim()
      const phone = String(body.student?.phone || '').trim()
      const city = String(body.student?.city || '').trim()
      const batch = String(body.batch || '').trim()

      if (!name || !email || !phone) {
        sendJson(res, 400, { error: 'Name, email and phone are required.' })
        return true
      }

      const course = getCourseById(body.courseId)
      if (!course) {
        sendJson(res, 404, { error: 'Course not found.' })
        return true
      }

      const payable = getPayable(course.priceUSD)
      const order = await razorpayCreateOrder(keys, {
        amount: payable.amount,
        currency: payable.currency,
        receipt: `ezy_${Date.now()}`.slice(0, 40),
        notes: {
          courseId: course.id,
          courseTitle: course.shortTitle,
          studentName: name,
          studentEmail: email,
          studentPhone: phone,
          studentCity: city,
          batch,
        },
      })

      sendJson(res, 200, {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: keys.keyId,
        courseTitle: course.shortTitle,
      })
    } catch (err) {
      console.error('create-order failed:', err)
      sendJson(res, 500, { error: err.message || 'Could not create payment order.' })
    }
    return true
  }

  if (req.method === 'POST' && (route === '/verify-payment' || route === 'verify-payment')) {
    try {
      const keys = getKeys(env)
      if (!keys) {
        sendJson(res, 503, { error: 'Razorpay is not configured.' })
        return true
      }

      const body = await readJsonBody(req)
      const orderId = body.razorpay_order_id
      const paymentId = body.razorpay_payment_id
      const signature = body.razorpay_signature

      if (!orderId || !paymentId || !signature) {
        sendJson(res, 400, { error: 'Missing payment response from Razorpay.' })
        return true
      }

      const expected = crypto
        .createHmac('sha256', keys.keySecret)
        .update(`${orderId}|${paymentId}`)
        .digest('hex')

      if (expected !== signature) {
        sendJson(res, 400, { error: 'Payment signature mismatch. Transaction was not verified.' })
        return true
      }

      const course = getCourseById(body.courseId)
      const payable = getPayable(course?.priceUSD || 0)
      const enrollment = {
        id: `EZY-${String(paymentId).slice(-8).toUpperCase()}`,
        paymentId,
        orderId,
        courseId: course?.id || body.courseId,
        courseTitle: course?.shortTitle || body.courseId,
        amount: payable.major,
        currency: payable.currency,
        student: {
          name: String(body.student?.name || '').trim(),
          email: String(body.student?.email || '').trim(),
          phone: String(body.student?.phone || '').trim(),
          city: String(body.student?.city || '').trim(),
        },
        batch: String(body.batch || ''),
        paidAt: new Date().toISOString(),
      }

      saveEnrollment(enrollment)
      sendJson(res, 200, { success: true, enrollment })
    } catch (err) {
      console.error('verify-payment failed:', err)
      sendJson(res, 500, { error: 'Could not verify payment.' })
    }
    return true
  }

  return false
}
