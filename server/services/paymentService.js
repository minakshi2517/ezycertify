import crypto from 'crypto'
import { db } from '../db/database.js'
import { getCourseById } from '../../src/data/siteData.js'
import { getPayable } from '../../src/lib/pricing.js'
import { sendEnrollmentEmail } from './emailService.js'

export function getRazorpayKeys() {
  const keyId = String(process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID || '').trim()
  const keySecret = String(process.env.RAZORPAY_KEY_SECRET || '').trim()
  const webhookSecret = String(process.env.RAZORPAY_WEBHOOK_SECRET || '').trim()

  // In test mode, allow test execution with predictable test keys
  if (process.env.NODE_ENV === 'test') {
    return {
      keyId: keyId && !keyId.includes('xxxxxxxx') ? keyId : 'rzp_test_integration_key',
      keySecret: keySecret && !keySecret.includes('xxxxxxxx') ? keySecret : 'rzp_test_secret_for_tests_12345',
      webhookSecret: webhookSecret && !webhookSecret.includes('xxxxxxxx') ? webhookSecret : 'rzp_test_webhook_secret_12345',
    }
  }

  if (!keyId || !keySecret || keyId.includes('xxxxxxxx') || keySecret.includes('xxxxxxxx')) {
    // In dev, provide test key fallback if user has not yet entered their custom Razorpay dashboard keys
    if (process.env.NODE_ENV !== 'production') {
      return {
        keyId: 'rzp_test_dev_key_ezy',
        keySecret: 'rzp_test_dev_secret_ezy',
        webhookSecret: 'rzp_test_webhook_secret',
      }
    }
    return null
  }
  return { keyId, keySecret, webhookSecret }
}

export async function createRazorpayOrder({ courseId, student, batch, userId = null }) {
  const keys = getRazorpayKeys()
  if (!keys) {
    throw new Error('Payment gateway is unconfigured. Please add your Razorpay API keys.')
  }

  const course = getCourseById(courseId) || getCourseById('pmp')
  if (!course) {
    throw new Error('Course not found in catalog.')
  }

  const payable = getPayable(course.priceUSD)
  const receipt = `ezy_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`.slice(0, 40)

  // If live keys, call Razorpay API; if test/dev mock keys, generate structured order response
  let orderId = `order_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`
  
  if (keys.keySecret !== 'rzp_test_dev_secret_ezy' && keys.keySecret !== 'rzp_test_secret_for_tests_12345' && !keys.keyId.includes('xxxxxxxx')) {
    try {
      const auth = Buffer.from(`${keys.keyId}:${keys.keySecret}`).toString('base64')
      const payload = {
        amount: payable.amount,
        currency: payable.currency,
        receipt,
        notes: {
          courseId: course.id,
          courseTitle: course.shortTitle || course.title,
          studentName: student.name,
          studentEmail: student.email,
          studentPhone: student.phone,
          studentCity: student.city || '',
          batch: batch || '',
          userId: userId || '',
        },
      }

      const res = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const liveOrder = await res.json()
      if (res.ok && liveOrder.id) {
        orderId = liveOrder.id
      }
    } catch (apiErr) {
      console.warn('[Razorpay API Warning] Gateway API fallback:', apiErr.message)
    }
  }

  // Pre-insert or track payment record in DB
  const now = new Date().toISOString()
  const paymentId = `pay_init_${crypto.randomBytes(6).toString('hex')}`

  try {
    db.prepare(`
      INSERT INTO payments (id, user_id, course_id, razorpay_order_id, amount, currency, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, 'created', ?)
    `).run(paymentId, userId || null, course.id, orderId, payable.major, payable.currency, now)
  } catch (err) {
    console.error('[Payment Order Record Error]:', err.message)
  }

  return {
    orderId,
    amount: payable.amount,
    currency: payable.currency,
    keyId: keys.keyId,
    courseTitle: course.shortTitle || course.title,
  }
}

// Verify Client-Side Signature and Finalize Enrollment
export function verifyAndEnrollPayment({ orderId, paymentId, signature, courseId, student, batch, userId = null }) {
  const keys = getRazorpayKeys()
  if (!keys) {
    throw new Error('Payment gateway not configured.')
  }

  // Verify HMAC-SHA256 signature
  const expected = crypto
    .createHmac('sha256', keys.keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex')

  if (expected !== signature) {
    throw new Error('Payment signature verification failed. Transaction cannot be validated.')
  }

  return finalizeEnrollment({
    orderId,
    paymentId,
    signature,
    courseId,
    student,
    batch,
    userId: userId || null,
    status: 'captured',
  })
}

// Idempotent Enrollment Processor
export function finalizeEnrollment({ orderId, paymentId, signature, courseId, student, batch, userId = null, status = 'captured', rawPayload = null }) {
  const course = getCourseById(courseId) || getCourseById('pmp')
  const validCourseId = course?.id || 'pmp'
  const payable = getPayable(course?.priceUSD || 499)
  const now = new Date().toISOString()

  const cleanPaymentId = String(paymentId || `pay_${Date.now()}`)
  const enrollmentId = `EZY-${cleanPaymentId.replace(/^pay_/, '').slice(-8).toUpperCase()}`

  // Check if already processed (Idempotency)
  const existingEnrollment = db.prepare('SELECT * FROM enrollments WHERE payment_id = ? OR order_id = ?').get(cleanPaymentId, orderId)
  if (existingEnrollment) {
    return existingEnrollment
  }

  // Database Transaction to guarantee atomicity
  const processTransaction = db.transaction(() => {
    // 1. Upsert / Update Payment Record
    const existingPayment = db.prepare('SELECT id FROM payments WHERE razorpay_order_id = ?').get(orderId)
    if (existingPayment) {
      db.prepare(`
        UPDATE payments
        SET razorpay_payment_id = ?, razorpay_signature = ?, status = ?, verified_at = ?, raw_payload = ?
        WHERE razorpay_order_id = ?
      `).run(cleanPaymentId, signature, status, now, rawPayload ? JSON.stringify(rawPayload) : null, orderId)
    } else {
      db.prepare(`
        INSERT INTO payments (id, user_id, course_id, razorpay_order_id, razorpay_payment_id, razorpay_signature, amount, currency, status, raw_payload, created_at, verified_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        cleanPaymentId,
        userId || null,
        validCourseId,
        orderId,
        cleanPaymentId,
        signature,
        payable.major,
        payable.currency,
        status,
        rawPayload ? JSON.stringify(rawPayload) : null,
        now,
        now
      )
    }

    // 2. Create Enrollment Record
    db.prepare(`
      INSERT INTO enrollments (id, user_id, course_id, payment_id, order_id, amount, currency, payment_status, enrollment_status, access_status, batch, student_name, student_email, student_phone, student_city, purchased_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'paid', 'active', 'granted', ?, ?, ?, ?, ?, ?, ?)
    `).run(
      enrollmentId,
      userId || null,
      validCourseId,
      cleanPaymentId,
      orderId,
      payable.major,
      payable.currency,
      batch || 'Upcoming Live Virtual Cohort',
      student.name,
      student.email,
      student.phone,
      student.city || '',
      now,
      now
    )

    return db.prepare('SELECT * FROM enrollments WHERE id = ?').get(enrollmentId)
  })

  const enrollment = processTransaction()

  // Asynchronously send confirmation email
  sendEnrollmentEmail({
    email: student.email,
    name: student.name,
    courseTitle: course?.title || validCourseId,
    batch,
    receiptId: enrollmentId,
    amount: payable.major,
    currency: payable.currency,
  }).catch((err) => console.error('[Enrollment Email Error]:', err.message))

  return enrollment
}

// Verify Webhook Signature
export function verifyWebhookSignature(rawBody, signature) {
  const keys = getRazorpayKeys()
  if (!keys || !keys.webhookSecret) return false

  const expected = crypto
    .createHmac('sha256', keys.webhookSecret)
    .update(rawBody)
    .digest('hex')

  return expected === signature
}
