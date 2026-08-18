import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import {
  getRazorpayKeys,
  createRazorpayOrder,
  verifyAndEnrollPayment,
  verifyWebhookSignature,
  finalizeEnrollment,
} from '../services/paymentService.js'
import { optionalAuthMiddleware } from '../services/sessionService.js'
import { db } from '../db/database.js'

const router = Router()

const paymentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: { error: 'Too many payment requests. Please try again in a few minutes.' },
})

// 1. HEALTH CHECK
router.get('/health', (req, res) => {
  res.json({ ok: true, configured: Boolean(getRazorpayKeys()) })
})

// 2. CREATE ORDER
router.post(['/create-order', '/payments/create-order'], paymentLimiter, optionalAuthMiddleware, async (req, res) => {
  try {
    const { courseId, student, batch } = req.body
    const name = String(student?.name || '').trim()
    const email = String(student?.email || '').trim()
    const phone = String(student?.phone || '').trim()

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Student full name, email, and phone number are required.' })
    }

    const userId = req.user ? req.user.id : null
    const orderData = await createRazorpayOrder({
      courseId,
      student: { ...student, name, email, phone },
      batch,
      userId,
    })

    res.json(orderData)
  } catch (err) {
    console.error('Order creation error:', err.message)
    res.status(500).json({ error: err.message || 'Could not initiate payment order.' })
  }
})

// 3. VERIFY PAYMENT (Client Checkout Callback)
router.post(['/verify-payment', '/payments/verify'], paymentLimiter, optionalAuthMiddleware, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courseId,
      student,
      batch,
    } = req.body

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing required Razorpay payment confirmation fields.' })
    }

    const userId = req.user ? req.user.id : null
    const enrollment = verifyAndEnrollPayment({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
      courseId,
      student: student || {},
      batch,
      userId,
    })

    res.json({ success: true, enrollment })
  } catch (err) {
    console.error('Payment verification error:', err.message)
    res.status(400).json({ error: err.message || 'Payment verification failed.' })
  }
})

// 4. RAZORPAY WEBHOOK HANDLER
router.post('/payments/webhook', async (req, res) => {
  try {
    const signature = req.headers['x-razorpay-signature']
    const rawBody = req.rawBody || JSON.stringify(req.body)

    if (!signature) {
      return res.status(400).json({ error: 'Missing webhook signature.' })
    }

    const isValid = verifyWebhookSignature(rawBody, signature)
    if (!isValid) {
      console.warn('[Webhook Warning] Received webhook with invalid signature.')
      return res.status(400).json({ error: 'Invalid webhook signature.' })
    }

    const event = typeof req.body === 'object' ? req.body : JSON.parse(rawBody)
    const eventType = event.event
    const paymentEntity = event.payload?.payment?.entity
    const orderEntity = event.payload?.order?.entity

    console.log(`[Razorpay Webhook] Event: ${eventType}`)

    if (eventType === 'payment.captured' || eventType === 'order.paid') {
      const orderId = paymentEntity?.order_id || orderEntity?.id
      const paymentId = paymentEntity?.id
      const notes = paymentEntity?.notes || orderEntity?.notes || {}

      if (orderId && paymentId) {
        finalizeEnrollment({
          orderId,
          paymentId,
          signature: 'webhook_verified',
          courseId: notes.courseId,
          student: {
            name: notes.studentName || paymentEntity?.contact,
            email: notes.studentEmail || paymentEntity?.email,
            phone: notes.studentPhone || paymentEntity?.contact,
            city: notes.studentCity || '',
          },
          batch: notes.batch || '',
          userId: notes.userId || null,
          status: 'captured',
          rawPayload: event,
        })
      }
    } else if (eventType === 'payment.failed') {
      const orderId = paymentEntity?.order_id
      const paymentId = paymentEntity?.id
      if (orderId) {
        db.prepare(`
          UPDATE payments
          SET status = 'failed', error_code = ?, error_description = ?, raw_payload = ?
          WHERE razorpay_order_id = ?
        `).run(
          paymentEntity?.error_code || 'PAYMENT_FAILED',
          paymentEntity?.error_description || 'Payment was unsuccessful on gateway',
          JSON.stringify(event),
          orderId
        )
      }
    }

    res.json({ status: 'ok' })
  } catch (err) {
    console.error('[Webhook Error]:', err.message)
    res.status(500).json({ error: 'Webhook processing error.' })
  }
})

export default router
