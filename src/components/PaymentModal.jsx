import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { formatPrice } from '../data/siteData'

export default function PaymentModal({ course, batch, onClose }) {
  const { currency } = useApp()
  const [step, setStep] = useState(1) // 1: Billing Info, 2: Payment Method, 3: Processing, 4: Success Invoice
  const [method, setMethod] = useState('card') // 'card', 'upi', 'netbanking', 'razorpay'

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    cardNumber: '4532 •••• •••• 8912',
    cardExp: '12/28',
    cardCvv: '849',
    cardName: '',
    upiId: '',
    bank: 'HDFC Bank'
  })

  const [orderId, setOrderId] = useState('')
  const [txnTime, setTxnTime] = useState('')

  // Calculate pricing
  const basePrice = course?.price || 499
  const discount = Math.round(basePrice * 0.15)
  const finalPrice = basePrice - discount

  const handleNextStep = (e) => {
    e.preventDefault()
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.phone) {
        alert('Please fill in your Name, Email, and Phone Number.')
        return
      }
      setStep(2)
    } else if (step === 2) {
      setStep(3)
      // Simulate SSL Payment Gateway processing
      setTimeout(() => {
        const generatedId = `EZY-${Math.floor(100000 + Math.random() * 900000)}`
        setOrderId(generatedId)
        setTxnTime(new Date().toLocaleString())
        setStep(4)
      }, 2000)
    }
  }

  const handleDownloadInvoice = () => {
    alert(`Downloading Official Payment Receipt for Order ${orderId} (${formatPrice(finalPrice, currency)})`)
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(8px)',
      zIndex: 3000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      overflowY: 'auto'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        maxWidth: '650px',
        width: '100%',
        position: 'relative',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        border: '1px solid #e2e8f0',
        overflow: 'hidden'
      }}>
        {/* Top Header Bar */}
        <div style={{
          background: 'linear-gradient(135deg, #0f2b5c 0%, #1e3a8a 100%)',
          color: '#ffffff',
          padding: '1.25rem 1.75rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.4rem' }}>🔒</span>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                Ezycertify Secure Checkout
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#93c5fd', margin: 0 }}>
                256-Bit SSL Encrypted Payment Gateway
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              color: '#ffffff',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ✕
          </button>
        </div>

        {/* Modal Content Body */}
        <div style={{ padding: '1.75rem' }}>
          
          {/* Order Summary Box */}
          <div style={{
            background: '#f8fafc',
            borderRadius: '12px',
            padding: '1.25rem',
            border: '1px solid #e2e8f0',
            marginBottom: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0074e4', background: '#eff6ff', padding: '0.2rem 0.6rem', borderRadius: '12px', textTransform: 'uppercase' }}>
                {course?.badge || 'Masterclass'}
              </span>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: '0.35rem 0 0.2rem' }}>
                {course?.title || 'Certification Program'}
              </h4>
              <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0 }}>
                Batch: {batch || 'Upcoming Live Virtual Cohort'}
              </p>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                {formatPrice(basePrice, currency)}
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 850, color: '#16a34a' }}>
                {formatPrice(finalPrice, currency)}
              </div>
              <span style={{ fontSize: '0.75rem', color: '#15803d', fontWeight: 700 }}>
                Includes 15% Early Bird Discount
              </span>
            </div>
          </div>

          {/* Step 1: Billing & Student Info */}
          {step === 1 && (
            <form onSubmit={handleNextStep}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1e293b', marginBottom: '1rem' }}>
                Step 1 of 2: Student & Billing Information
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="rahul@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>
                    City / Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Pune, India"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '0.9rem',
                  borderRadius: '8px',
                  background: '#0074e4',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '1rem',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0, 116, 228, 0.25)'
                }}
              >
                Proceed to Payment Options ➔
              </button>
            </form>
          )}

          {/* Step 2: Payment Method Selection */}
          {step === 2 && (
            <form onSubmit={handleNextStep}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1e293b', marginBottom: '1rem' }}>
                Step 2 of 2: Select Preferred Payment Gateway Method
              </h4>

              {/* Method Selector Tabs */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '1.25rem' }}>
                {[
                  { id: 'card', label: '💳 Cards', desc: 'Credit / Debit' },
                  { id: 'upi', label: '📱 UPI / QR', desc: 'GPay / PhonePe' },
                  { id: 'netbanking', label: '🏛️ NetBanking', desc: 'All Banks' },
                  { id: 'razorpay', label: '⚡ Razorpay', desc: 'Direct Portal' }
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMethod(m.id)}
                    style={{
                      padding: '0.75rem 0.5rem',
                      borderRadius: '8px',
                      border: method === m.id ? '2px solid #0074e4' : '1px solid #cbd5e1',
                      background: method === m.id ? '#eff6ff' : '#ffffff',
                      color: method === m.id ? '#0f2b5c' : '#475569',
                      fontWeight: method === m.id ? 800 : 600,
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '0.85rem' }}>{m.label}</div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{m.desc}</div>
                  </button>
                ))}
              </div>

              {/* Card Inputs */}
              {method === 'card' && (
                <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.3rem' }}>
                      Cardholder Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Name on card"
                      value={formData.cardName || formData.name}
                      onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                      style={{ width: '100%', padding: '0.7rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                    />
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.3rem' }}>
                      Card Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="4532 0000 0000 8912"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      style={{ width: '100%', padding: '0.7rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.3rem' }}>
                        Expiry (MM/YY) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="12/28"
                        value={formData.cardExp}
                        onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                        style={{ width: '100%', padding: '0.7rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.3rem' }}>
                        CVV Code *
                      </label>
                      <input
                        type="password"
                        required
                        maxLength="4"
                        placeholder="•••"
                        value={formData.cardCvv}
                        onChange={(e) => setFormData({ ...formData, cardCvv: e.target.value })}
                        style={{ width: '100%', padding: '0.7rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* UPI Inputs */}
              {method === 'upi' && (
                <div style={{ background: '#f0fdf4', padding: '1.25rem', borderRadius: '10px', border: '1px solid #bbf7d0', marginBottom: '1.5rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#166534', marginBottom: '0.75rem' }}>
                    Scan QR Code or Enter VPA / UPI ID
                  </div>
                  <div style={{ background: '#ffffff', width: '120px', height: '120px', margin: '0 auto 1rem', padding: '8px', borderRadius: '8px', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* Simulated QR Code */}
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '2.5rem' }}>📱</div>
                      <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#0f2b5c' }}>ezycertify@upi</div>
                    </div>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter UPI ID (e.g. mobile@upi, name@okicici)"
                    value={formData.upiId}
                    onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #86efac', fontSize: '0.88rem', textTransform: 'lowercase' }}
                  />
                </div>
              )}

              {/* NetBanking Selection */}
              {method === 'netbanking' && (
                <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.5rem' }}>
                    Select Your Bank:
                  </label>
                  <select
                    value={formData.bank}
                    onChange={(e) => setFormData({ ...formData, bank: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                  >
                    <option value="HDFC Bank">HDFC Bank</option>
                    <option value="ICICI Bank">ICICI Bank</option>
                    <option value="State Bank of India">State Bank of India (SBI)</option>
                    <option value="Axis Bank">Axis Bank</option>
                    <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                    <option value="Other Corporate Banks">Other Corporate Banks</option>
                  </select>
                </div>
              )}

              {/* Razorpay Option */}
              {method === 'razorpay' && (
                <div style={{ background: '#eff6ff', padding: '1.25rem', borderRadius: '10px', border: '1px solid #bfdbfe', marginBottom: '1.5rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e40af', marginBottom: '0.5rem' }}>
                    Razorpay Direct Gateway
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#3b82f6', margin: 0 }}>
                    You will be securely redirected to Razorpay checkout portal for Cards, Netbanking, Wallets, & International payments.
                  </p>
                </div>
              )}

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={{
                    padding: '0.85rem 1.25rem',
                    borderRadius: '8px',
                    background: '#e2e8f0',
                    color: '#475569',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '0.85rem',
                    borderRadius: '8px',
                    background: '#16a34a',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '1rem',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(22, 163, 74, 0.25)'
                  }}
                >
                  Pay {formatPrice(finalPrice, currency)} Now 🔒
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Payment Processing Animation */}
          {step === 3 && (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                border: '4px solid #cbd5e1',
                borderTopColor: '#0074e4',
                borderRadius: '50%',
                margin: '0 auto 1.5rem',
                animation: 'spin 1s linear infinite'
              }} />
              <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                Processing Payment...
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#64748b' }}>
                Please do not refresh or close this window.<br />
                Encrypting credentials via 256-bit SSL gateway.
              </p>
            </div>
          )}

          {/* Step 4: Instant Success Receipt / Invoice */}
          {step === 4 && (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: '#dcfce7',
                color: '#16a34a',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                margin: '0 auto 1rem'
              }}>
                ✓
              </div>

              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#15803d', background: '#f0fdf4', padding: '0.25rem 0.75rem', borderRadius: '20px', border: '1px solid #bbf7d0' }}>
                TRANSACTION SUCCESSFUL & ENROLLED
              </span>

              <h3 style={{ fontSize: '1.6rem', fontWeight: 850, color: '#0f172a', margin: '0.75rem 0 0.25rem' }}>
                Welcome to Ezycertify!
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1.5rem' }}>
                Payment of <strong>{formatPrice(finalPrice, currency)}</strong> confirmed. Your seat in <strong>{course?.shortTitle || 'Course'}</strong> is locked!
              </p>

              {/* Transaction Receipt Box */}
              <div style={{
                background: '#f8fafc',
                borderRadius: '12px',
                padding: '1.25rem',
                border: '1px solid #e2e8f0',
                textAlign: 'left',
                fontSize: '0.88rem',
                color: '#334155',
                marginBottom: '1.5rem',
                lineHeight: 1.8
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.4rem', marginBottom: '0.4rem' }}>
                  <span>Order Reference ID:</span>
                  <strong style={{ color: '#0074e4' }}>{orderId}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.4rem', marginBottom: '0.4rem' }}>
                  <span>Student Name:</span>
                  <strong>{formData.name}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.4rem', marginBottom: '0.4rem' }}>
                  <span>Student Email:</span>
                  <strong>{formData.email}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Payment Date & Time:</span>
                  <strong>{txnTime}</strong>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={handleDownloadInvoice}
                  style={{
                    flex: 1,
                    padding: '0.85rem',
                    borderRadius: '8px',
                    background: '#0074e4',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  📄 Download Fee Receipt
                </button>
                <button
                  onClick={onClose}
                  style={{
                    padding: '0.85rem 1.5rem',
                    borderRadius: '8px',
                    background: '#0f172a',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
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
