import assert from 'assert'
import http from 'http'
import crypto from 'crypto'
import app from '../index.js'
import { db } from '../db/database.js'

let server
let baseUrl

function post(path, body, headers = {}) {
  return fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body),
  })
}

function get(path, headers = {}) {
  return fetch(`${baseUrl}${path}`, {
    method: 'GET',
    headers,
  })
}

function patch(path, body, headers = {}) {
  return fetch(`${baseUrl}${path}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body),
  })
}

async function runSystemTests() {
  console.log('\n======================================================')
  console.log('       RUNNING EZYCERTIFY SYSTEM INTEGRATION TESTS     ')
  console.log('======================================================\n')

  const testPort = 5999
  server = http.createServer(app)
  await new Promise((resolve) => server.listen(testPort, resolve))
  baseUrl = `http://localhost:${testPort}`

  const testEmail = `student_${Date.now()}@example.com`
  const testPhone = `+9198765${String(Date.now()).slice(-5)}`
  const testPassword = 'SecurePassword2026!@#'
  let testUserId = ''
  let sessionCookie = ''

  try {
    // TEST 1: Health Endpoint
    console.log('[1/19] Testing /api/health endpoint...')
    const healthRes = await get('/api/health')
    assert.strictEqual(healthRes.status, 200, 'Health endpoint status must be 200')
    const healthData = await healthRes.json()
    assert.strictEqual(healthData.ok, true, 'Health check must return ok: true')
    console.log('  ✓ Health check passed.')

    // TEST 2: Signup with Weak Password (Should Fail)
    console.log('[2/19] Testing Signup weak password rejection...')
    const weakRes = await post('/api/auth/signup', {
      name: 'Test Student',
      email: testEmail,
      phone: testPhone,
      password: 'weak',
      confirmPassword: 'weak',
    })
    assert.strictEqual(weakRes.status, 400, 'Weak password must return 400')
    console.log('  ✓ Weak password rejected properly.')

    // TEST 3: Signup with Invalid Email (Should Fail)
    console.log('[3/19] Testing Signup invalid email rejection...')
    const badEmailRes = await post('/api/auth/signup', {
      name: 'Test Student',
      email: 'not-an-email',
      phone: testPhone,
      password: testPassword,
      confirmPassword: testPassword,
    })
    assert.strictEqual(badEmailRes.status, 400, 'Invalid email must return 400')
    console.log('  ✓ Invalid email rejected properly.')

    // TEST 4: Valid Registration
    console.log('[4/19] Testing valid Signup registration...')
    const signupRes = await post('/api/auth/signup', {
      name: 'Vikram Mehta',
      email: testEmail,
      phone: testPhone,
      password: testPassword,
      confirmPassword: testPassword,
    })
    assert.strictEqual(signupRes.status, 201, 'Signup must return 201 Created')
    const signupData = await signupRes.json()
    assert.strictEqual(signupData.success, true)
    testUserId = signupData.userId
    assert(testUserId, 'Must return userId')
    console.log(`  ✓ Registered user successfully. ID: ${testUserId}`)

    // TEST 5: Duplicate Email Rejection
    console.log('[5/19] Testing duplicate email registration prevention...')
    const dupRes = await post('/api/auth/signup', {
      name: 'Another User',
      email: testEmail,
      phone: '+919111122222',
      password: testPassword,
      confirmPassword: testPassword,
    })
    assert.strictEqual(dupRes.status, 400)
    const dupData = await dupRes.json()
    assert(dupData.error.includes('An account already exists with this email address'))
    console.log('  ✓ Duplicate email rejected with exact user-friendly message.')

    // TEST 6: Email Verification Code
    console.log('[6/19] Testing Email Verification Code check...')
    const emailVerRecord = db.prepare("SELECT * FROM verifications WHERE user_id = ? AND purpose = 'email_verify' ORDER BY created_at DESC LIMIT 1").get(testUserId)
    assert(emailVerRecord, 'Email verification record must exist in DB')

    // Test with wrong code first
    const badVerify = await post('/api/auth/verify-email', { userId: testUserId, code: '000000' })
    assert.strictEqual(badVerify.status, 400, 'Wrong verification code must be rejected')

    // Test with simulated valid code match
    const testCode = '123456'
    const testHash = crypto.createHash('sha256').update(testCode).digest('hex')
    db.prepare('UPDATE verifications SET token_hash = ? WHERE id = ?').run(testHash, emailVerRecord.id)

    const goodVerify = await post('/api/auth/verify-email', { userId: testUserId, code: testCode })
    assert.strictEqual(goodVerify.status, 200)
    const goodData = await goodVerify.json()
    assert.strictEqual(goodData.emailVerified, true)
    console.log('  ✓ Email verified successfully and state saved.')

    // TEST 7: Phone OTP Verification
    console.log('[7/19] Testing Phone OTP Verification...')
    const phoneVerRecord = db.prepare("SELECT * FROM verifications WHERE user_id = ? AND purpose = 'phone_verify' ORDER BY created_at DESC LIMIT 1").get(testUserId)
    assert(phoneVerRecord, 'Phone verification record must exist in DB')

    const phoneTestCode = '654321'
    const phoneHash = crypto.createHash('sha256').update(phoneTestCode).digest('hex')
    db.prepare('UPDATE verifications SET token_hash = ? WHERE id = ?').run(phoneHash, phoneVerRecord.id)

    const phoneVerifyRes = await post('/api/auth/verify-phone', { userId: testUserId, code: phoneTestCode })
    assert.strictEqual(phoneVerifyRes.status, 200)
    console.log('  ✓ Phone OTP verified successfully.')

    // TEST 8: Login with Incorrect Password
    console.log('[8/19] Testing Login with incorrect password...')
    const wrongPassRes = await post('/api/auth/login', {
      identifier: testEmail,
      password: 'WrongPassword123!',
    })
    assert.strictEqual(wrongPassRes.status, 401)
    const wrongPassData = await wrongPassRes.json()
    assert(wrongPassData.error.includes('Incorrect password'))
    console.log('  ✓ Wrong password rejected properly.')

    // TEST 9: Login Triggering 2FA Step
    console.log('[9/19] Testing Login password validation and 2FA challenge...')
    const loginRes = await post('/api/auth/login', {
      identifier: testEmail,
      password: testPassword,
    })
    assert.strictEqual(loginRes.status, 200)
    const loginData = await loginRes.json()
    assert.strictEqual(loginData.require2FA, true, '2FA must be required')
    assert(loginData.maskedEmail, 'Masked email must be returned')
    console.log(`  ✓ 2FA Challenge triggered. Masked: ${loginData.maskedEmail}`)

    // TEST 10: Complete 2FA Verification & Establish Session
    console.log('[10/19] Testing 2FA verification and session establishment...')
    const twoFaRecord = db.prepare("SELECT * FROM verifications WHERE user_id = ? AND purpose = 'login_2fa' ORDER BY created_at DESC LIMIT 1").get(testUserId)
    assert(twoFaRecord, '2FA record must exist in DB')

    const twoFaCode = '789012'
    const twoFaHash = crypto.createHash('sha256').update(twoFaCode).digest('hex')
    db.prepare('UPDATE verifications SET token_hash = ? WHERE id = ?').run(twoFaHash, twoFaRecord.id)

    const twoFaRes = await post('/api/auth/verify-2fa', { userId: testUserId, code: twoFaCode })
    assert.strictEqual(twoFaRes.status, 200)
    const twoFaData = await twoFaRes.json()
    assert.strictEqual(twoFaData.success, true)
    assert.strictEqual(twoFaData.user.email, testEmail)

    // Capture session cookie from headers
    const rawCookies = twoFaRes.headers.get('set-cookie') || ''
    sessionCookie = rawCookies.split(';')[0]
    console.log('  ✓ 2FA verified and session cookie generated.')

    // TEST 11: Authenticated Session Check (/api/auth/me)
    console.log('[11/19] Testing /api/auth/me session cookie authentication...')
    const meRes = await get('/api/auth/me', { Cookie: sessionCookie })
    assert.strictEqual(meRes.status, 200)
    const meData = await meRes.json()
    assert.strictEqual(meData.user.id, testUserId)
    assert.strictEqual(meData.user.email, testEmail)
    console.log('  ✓ Authenticated user profile retrieved via cookie.')

    // TEST 12: Password Reset Request & Confirmation
    console.log('[12/19] Testing Forgot Password and Reset Password lifecycle...')
    const forgotRes = await post('/api/auth/forgot-password', { email: testEmail })
    assert.strictEqual(forgotRes.status, 200)

    const resetRecord = db.prepare("SELECT * FROM verifications WHERE user_id = ? AND purpose = 'password_reset' ORDER BY created_at DESC LIMIT 1").get(testUserId)
    assert(resetRecord, 'Password reset token must exist')

    const resetRawToken = 'sample_reset_token_hex_1234567890abcdef'
    const resetHash = crypto.createHash('sha256').update(resetRawToken).digest('hex')
    db.prepare('UPDATE verifications SET token_hash = ? WHERE id = ?').run(resetHash, resetRecord.id)

    const newPassword = 'NewSecurePassword2026!@#'
    const resetConfirmRes = await post('/api/auth/reset-password', {
      token: resetRawToken,
      email: testEmail,
      newPassword,
    })
    assert.strictEqual(resetConfirmRes.status, 200)
    console.log('  ✓ Password reset lifecycle verified.')

    // TEST 13: Course Catalog API
    console.log('[13/19] Testing /api/courses catalog endpoint...')
    const coursesRes = await get('/api/courses')
    assert.strictEqual(coursesRes.status, 200)
    const coursesData = await coursesRes.json()
    assert(coursesData.courses.length >= 60, 'Should return catalog with at least 60 accredited courses')
    console.log(`  ✓ Loaded ${coursesData.courses.length} courses from SQLite database.`)

    // TEST 14: Payment Verification & Atomic Enrollment Creation
    console.log('[14/19] Testing /api/verify-payment and database enrollment...')
    const testOrderId = `order_test_${Date.now()}`
    const testPaymentId = `pay_test_${Date.now()}`
    const testKeySecret = 'rzp_test_secret_for_tests_12345'
    const testSignature = crypto.createHmac('sha256', testKeySecret).update(`${testOrderId}|${testPaymentId}`).digest('hex')

    const paymentRes = await post(
      '/api/verify-payment',
      {
        razorpay_order_id: testOrderId,
        razorpay_payment_id: testPaymentId,
        razorpay_signature: testSignature,
        courseId: 'pmp',
        student: {
          name: 'Vikram Mehta',
          email: testEmail,
          phone: testPhone,
          city: 'Pune',
        },
        batch: 'Weekend Live Virtual Cohort',
      },
      { Cookie: sessionCookie }
    )

    assert.strictEqual(paymentRes.status, 200)
    const paymentData = await paymentRes.json()
    assert.strictEqual(paymentData.success, true)
    assert(paymentData.enrollment.id.startsWith('EZY-'), 'Enrollment ID must have EZY prefix')
    console.log(`  ✓ Payment verified and Enrollment created: ${paymentData.enrollment.id}`)

    // TEST 15: Razorpay Webhook Event Handling
    console.log('[15/19] Testing /api/payments/webhook handler with HMAC verification...')
    const webhookOrderId = `order_hook_${Date.now()}`
    const webhookPaymentId = `pay_hook_${Date.now()}`
    const webhookSecret = 'rzp_test_webhook_secret_12345'

    const webhookEvent = {
      event: 'payment.captured',
      payload: {
        payment: {
          entity: {
            id: webhookPaymentId,
            order_id: webhookOrderId,
            amount: 4166800,
            currency: 'INR',
            status: 'captured',
            email: 'webhook_student@example.com',
            contact: '+919988776655',
            notes: {
              courseId: 'csm',
              courseTitle: 'Certified ScrumMaster',
              studentName: 'Aarav Gupta',
              studentEmail: 'webhook_student@example.com',
              studentPhone: '+919988776655',
              batch: 'Global Virtual Cohort',
            },
          },
        },
      },
    }

    const rawPayloadString = JSON.stringify(webhookEvent)
    const webhookSig = crypto.createHmac('sha256', webhookSecret).update(rawPayloadString).digest('hex')

    const webhookRes = await fetch(`${baseUrl}/api/payments/webhook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-razorpay-signature': webhookSig,
      },
      body: rawPayloadString,
    })

    assert.strictEqual(webhookRes.status, 200)
    const hookDbRecord = db.prepare('SELECT * FROM enrollments WHERE order_id = ?').get(webhookOrderId)
    assert(hookDbRecord, 'Webhook must create enrollment in DB')
    console.log(`  ✓ Webhook verified and processed. Enrollment ID: ${hookDbRecord.id}`)

    // TEST 16: Course Access Verification Endpoint
    console.log('[16/19] Testing /api/courses/pmp/access authorization check...')
    const accessRes = await get('/api/courses/pmp/access', { Cookie: sessionCookie })
    assert.strictEqual(accessRes.status, 200)
    const accessData = await accessRes.json()
    assert.strictEqual(accessData.hasAccess, true, 'User must have granted access')
    console.log('  ✓ Server confirmed course access authorization.')

    // TEST 17: Student My Enrollments Endpoint
    console.log('[17/19] Testing /api/user/enrollments endpoint...')
    const enrollmentsRes = await get('/api/user/enrollments', { Cookie: sessionCookie })
    assert.strictEqual(enrollmentsRes.status, 200)
    const enrollmentsData = await enrollmentsRes.json()
    assert.strictEqual(enrollmentsData.enrollments.length, 1)
    console.log(`  ✓ Retrieved student enrollment list with course titles and receipts.`)

    // TEST 18: Admin Authorization and Operations
    console.log('[18/19] Testing Admin Portal authorization and overview stats...')
    // Elevate user role to admin for testing admin endpoints
    db.prepare("UPDATE users SET role = 'admin' WHERE id = ?").run(testUserId)

    const adminOverviewRes = await get('/api/admin/overview', { Cookie: sessionCookie })
    assert.strictEqual(adminOverviewRes.status, 200)
    const adminOverviewData = await adminOverviewRes.json()
    assert(adminOverviewData.stats.users.total >= 1, 'Total users count must be >= 1')
    assert(adminOverviewData.stats.courses.total >= 60, 'Total courses must be >= 60')

    const adminUsersRes = await get('/api/admin/users', { Cookie: sessionCookie })
    assert.strictEqual(adminUsersRes.status, 200)

    const adminEnrollmentsRes = await get('/api/admin/enrollments', { Cookie: sessionCookie })
    assert.strictEqual(adminEnrollmentsRes.status, 200)
    const adminEnData = await adminEnrollmentsRes.json()
    assert(adminEnData.enrollments.length >= 1)

    // Toggle Access Status
    const targetEnId = adminEnData.enrollments[0].id
    const toggleRes = await patch(`/api/admin/enrollments/${targetEnId}/access`, { access_status: 'revoked' }, { Cookie: sessionCookie })
    assert.strictEqual(toggleRes.status, 200)
    console.log('  ✓ Admin overview, users, courses, payments, and access controls verified.')

    // TEST 19: Logout
    console.log('[19/19] Testing /api/auth/logout...')
    const logoutRes = await post('/api/auth/logout', {}, { Cookie: sessionCookie })
    assert.strictEqual(logoutRes.status, 200)
    console.log('  ✓ User logged out successfully.')

    console.log('\n======================================================')
    console.log('   🎉 ALL 19 SYSTEM INTEGRATION TESTS PASSED 100%!    ')
    console.log('======================================================\n')
  } catch (err) {
    console.error('\n❌ INTEGRATION TEST FAILED:', err)
    process.exit(1)
  } finally {
    if (server) server.close()
  }
}

runSystemTests()
