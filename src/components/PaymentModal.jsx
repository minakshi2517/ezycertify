import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { formatPrice } from '../data/siteData'
import { loadRazorpay, postJson } from '../lib/razorpayClient'

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  borderRadius: '8px',
  border: '1px solid #cbd5e1',
  fontSize: '0.9rem',
}

export default function PaymentModal({ course, batch, onClose }) {
  const { currency, user } = useApp()
  const displayPrice = formatPrice(course?.priceUSD, 'INR', '₹')

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    city: '',
  })
  const [status, setStatus] = useState('form') // form | paying | success | error
  const [error, setError] = useState('')
  const [enrollment, setEnrollment] = useState(null)

  const handlePay = async (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setError('Please fill in your name, email, and phone number.')
      return
    }

    setError('')
    setStatus('paying')

    try {
      const order = await postJson('/api/create-order', {
        courseId: course.id,
        currency,
        batch: batch || '',
        student: formData,
      })

      const Razorpay = await loadRazorpay()
      let completed = false
      const rzp = new Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: 'Ezycertify',
        description: course.shortTitle || course.title,
        image: `${window.location.origin}/logo.png`,
        order_id: order.orderId,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone.replace(/\s/g, ''),
        },
        notes: {
          courseId: course.id,
          batch: batch || '',
        },
        theme: { color: '#0074e4' },
        modal: {
          ondismiss: () => {
            if (completed) return
            setStatus('form')
            setError('Payment window closed. You can try again when ready.')
          },
        },
        handler: async (response) => {
          completed = true
          try {
            const result = await postJson('/api/verify-payment', {
              ...response,
              courseId: course.id,
              currency,
              batch: batch || '',
              student: formData,
            })
            setEnrollment(result.enrollment)
            setStatus('success')
          } catch (verifyErr) {
            setError(verifyErr.message)
            setStatus('error')
          }
        },
      })

      rzp.on('payment.failed', (resp) => {
        setError(resp?.error?.description || 'Payment failed. Please try another method.')
        setStatus('error')
      })

      rzp.open()
    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }

  const handleDownloadReceipt = () => {
    const paidAt = enrollment?.paidAt ? new Date(enrollment.paidAt).toLocaleString() : new Date().toLocaleString()
    const html = `<!DOCTYPE html>
<html>
<head>
  <title>Ezycertify Receipt ${enrollment?.id || ''}</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 32px; color: #0f172a; }
    h1 { color: #0f2b5c; margin-bottom: 4px; }
    .muted { color: #64748b; }
    table { width: 100%; border-collapse: collapse; margin-top: 24px; }
    td { padding: 10px 0; border-bottom: 1px solid #e2e8f0; }
    .ok { color: #15803d; font-weight: 700; }
  </style>
</head>
<body>
  <h1>Ezycertify</h1>
  <p class="muted">Official Fee Receipt</p>
  <p class="ok">PAYMENT SUCCESSFUL</p>
  <table>
    <tr><td>Receipt ID</td><td><strong>${enrollment?.id || ''}</strong></td></tr>
    <tr><td>Payment ID</td><td>${enrollment?.paymentId || ''}</td></tr>
    <tr><td>Order ID</td><td>${enrollment?.orderId || ''}</td></tr>
    <tr><td>Course</td><td>${course?.title || ''}</td></tr>
    <tr><td>Batch</td><td>${batch || 'Upcoming Live Virtual Cohort'}</td></tr>
    <tr><td>Student</td><td>${formData.name}</td></tr>
    <tr><td>Email</td><td>${formData.email}</td></tr>
    <tr><td>Phone</td><td>${formData.phone}</td></tr>
    <tr><td>Amount Paid</td><td><strong>${displayPrice}</strong></td></tr>
    <tr><td>Date</td><td>${paidAt}</td></tr>
  </table>
  <p class="muted" style="margin-top:24px">Processed securely via Razorpay. Ezycertify does not store card or UPI credentials.</p>
  <script>window.onload = function () { window.print(); }</script>
</body>
</html>`
    const win = window.open('', '_blank')
    if (!win) {
      alert('Please allow pop-ups to download the receipt.')
      return
    }
    win.document.write(html)
    win.document.close()
  }

  return (
    <div className="pay-overlay" onClick={onClose} role="presentation">
      <div className="pay-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="pay-title">
        <div className="pay-header">
          <div>
            <h3 id="pay-title">Ezycertify Secure Checkout</h3>
            <p>Paid via Razorpay · Cards, UPI, Netbanking & Wallets</p>
          </div>
          <button type="button" className="pay-close" onClick={onClose} aria-label="Close checkout">✕</button>
        </div>

        <div className="pay-body">
          <div className="pay-summary">
            <div>
              <span className="pay-badge">{course?.badge || 'Masterclass'}</span>
              <h4>{course?.title || 'Certification Program'}</h4>
              <p>Batch: {batch || 'Upcoming Live Virtual Cohort'}</p>
            </div>
            <div className="pay-price">
              <strong>{displayPrice}</strong>
              <span>Includes exam prep & lifetime support</span>
            </div>
          </div>

          {status === 'form' && (
            <form onSubmit={handlePay}>
              <h4 className="pay-step">Student & billing details</h4>
              {error && <div className="pay-alert">{error}</div>}

              <div className="pay-grid">
                <div>
                  <label htmlFor="pay-name">Full Name *</label>
                  <input
                    id="pay-name"
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label htmlFor="pay-email">Email Address *</label>
                  <input
                    id="pay-email"
                    type="email"
                    required
                    placeholder="rahul@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label htmlFor="pay-phone">Phone Number *</label>
                  <input
                    id="pay-phone"
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label htmlFor="pay-city">City / Location</label>
                  <input
                    id="pay-city"
                    type="text"
                    placeholder="e.g. Pune, India"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    style={inputStyle}
                  />
                </div>
              </div>

              <p className="pay-secure-note">
                You will be redirected to Razorpay Checkout. Card numbers, UPI IDs and bank passwords stay on Razorpay — Ezycertify never stores them.
              </p>

              <button type="submit" className="pay-cta">
                Pay {displayPrice} with Razorpay
              </button>
            </form>
          )}

          {status === 'paying' && (
            <div className="pay-center">
              <div className="pay-spinner" />
              <h3>Opening Razorpay Checkout…</h3>
              <p>Complete the payment in the Razorpay window. Do not refresh this page.</p>
            </div>
          )}

          {status === 'error' && (
            <div className="pay-center">
              <div className="pay-alert">{error}</div>
              <button type="button" className="pay-cta" onClick={() => { setError(''); setStatus('form') }}>
                Try again
              </button>
            </div>
          )}

          {status === 'success' && enrollment && (
            <div className="pay-center">
              <div className="pay-success-icon">✓</div>
              <span className="pay-success-pill">Transaction successful & enrolled</span>
              <h3>Welcome to Ezycertify!</h3>
              <p>
                Payment of <strong>{displayPrice}</strong> confirmed. Your seat in <strong>{course?.shortTitle}</strong> is locked.
              </p>
              <div className="pay-receipt">
                <div><span>Receipt ID</span><strong>{enrollment.id}</strong></div>
                <div><span>Payment ID</span><strong>{enrollment.paymentId}</strong></div>
                <div><span>Student</span><strong>{formData.name}</strong></div>
                <div><span>Email</span><strong>{formData.email}</strong></div>
              </div>
              <div className="pay-actions">
                <button type="button" className="pay-cta" onClick={handleDownloadReceipt}>
                  Download fee receipt
                </button>
                <button type="button" className="pay-done" onClick={onClose}>
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
