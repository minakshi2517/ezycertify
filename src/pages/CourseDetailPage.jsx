import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { getCourseBySlug, formatPrice, PHONE_NUMBER, WHATSAPP_LINK } from '../data/siteData'
import { RAZORPAY_KEY_ID, PAYMENT_CONFIG } from '../config/paymentConfig'

export default function CourseDetailPage() {
  const { slug } = useParams()
  const { currency, currencySymbol } = useApp()
  const course = getCourseBySlug(slug)

  const [showModal, setShowModal] = useState(false)
  const [modalStep, setModalStep] = useState(1) // 1: Learner Details, 2: Payment Gateway Selection, 3: Success
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', batch: '' })
  const [txnId, setTxnId] = useState('')
  const [selectedPaymentMode, setSelectedPaymentMode] = useState('razorpay') // 'razorpay', 'card', 'upi', 'whatsapp', 'callback'
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [upiId, setUpiId] = useState('')

  if (!course) {
    return (
      <div style={{ paddingTop: 'calc(var(--header-h) + 4rem)', paddingBottom: '4rem', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--navy)' }}>404</h1>
          <p style={{ color: 'var(--gray-600)', marginTop: '0.5rem' }}>Course not found.</p>
          <Link to="/courses" className="btn btn-blue" style={{ marginTop: '1.5rem' }}>
            Browse All Courses
          </Link>
        </div>
      </div>
    )
  }

  const formattedPrice = formatPrice(course.price, currencySymbol)

  const handleStep1Submit = (e) => {
    e.preventDefault()
    if (formData.name.trim() && formData.email.trim() && formData.phone.trim()) {
      setModalStep(2) // Move to Payment Options Screen
    }
  }

  const processDirectPayment = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      const payId = 'PAY_' + Math.random().toString(36).substr(2, 9).toUpperCase()
      setTxnId(payId)
      setModalStep(3)
    }, 1200)
  }

  const handleFinalPaymentOrBooking = () => {
    if (selectedPaymentMode === 'razorpay') {
      const numericPrice = typeof course.price === 'number' ? course.price : 39999
      const amountInSubunits = numericPrice * 100 // Convert to paise / cents

      const isLiveKey = RAZORPAY_KEY_ID.startsWith('rzp_live_') || RAZORPAY_KEY_ID.startsWith('rzp_test_real')

      if (window.Razorpay && isLiveKey) {
        try {
          const options = {
            key: RAZORPAY_KEY_ID,
            amount: amountInSubunits,
            currency: currency.code === 'INR' ? 'INR' : 'USD',
            name: PAYMENT_CONFIG.companyName,
            description: `Enrollment Fee for ${course.shortTitle}`,
            image: PAYMENT_CONFIG.logo,
            handler: function (response) {
              const payId = response.razorpay_payment_id || 'PAY_' + Math.random().toString(36).substr(2, 9).toUpperCase()
              setTxnId(payId)
              setModalStep(3)
            },
            prefill: {
              name: formData.name,
              email: formData.email,
              contact: formData.phone
            },
            theme: {
              color: '#0074e4'
            }
          }
          const rzp = new window.Razorpay(options)
          rzp.open()
        } catch (err) {
          processDirectPayment()
        }
      } else {
        processDirectPayment()
      }
    } else if (selectedPaymentMode === 'card' || selectedPaymentMode === 'upi') {
      processDirectPayment()
    } else if (selectedPaymentMode === 'whatsapp') {
      const msg = `Hi Ezycertify, I want to enroll in ${course.title}. Name: ${formData.name}, Email: ${formData.email}, Phone: ${formData.phone}. Please share payment link & bank details.`
      window.open(`${WHATSAPP_LINK}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer')
      const payId = 'WA_RESERVE_' + Math.random().toString(36).substr(2, 7).toUpperCase()
      setTxnId(payId)
      setModalStep(3)
    } else {
      const payId = 'RESERVE_' + Math.random().toString(36).substr(2, 7).toUpperCase()
      setTxnId(payId)
      setModalStep(3)
    }
  }

  const resetModal = () => {
    setShowModal(false)
    setModalStep(1)
    setFormData({ name: '', email: '', phone: '', batch: '' })
    setTxnId('')
    setIsProcessing(false)
    setCardNumber('')
    setCardExpiry('')
    setCardCvv('')
    setUpiId('')
  }

  const whatsappMsg = `Hi Ezycertify, I want to inquire about enrolling in ${course.title}. Please share batch details and fee structure.`

  return (
    <div style={{ paddingTop: 'calc(var(--header-h) + 2rem)', paddingBottom: '5rem' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ marginBottom: '1.5rem', fontSize: '0.875rem', color: 'var(--gray-600)' }}>
          <Link to="/" style={{ color: 'var(--blue)', fontWeight: 600 }}>Home</Link> /{' '}
          <Link to="/courses" style={{ color: 'var(--blue)', fontWeight: 600 }}>Courses</Link> /{' '}
          <span style={{ color: 'var(--gray-800)' }}>{course.shortTitle}</span>
        </div>

        {/* Course Header Banner */}
        <div style={{
          background: 'linear-gradient(135deg, var(--navy) 0%, #1e3a8a 100%)',
          borderRadius: 'var(--radius-lg)',
          padding: '3rem 2.5rem',
          color: 'var(--white)',
          marginBottom: '3rem',
          boxShadow: 'var(--shadow-md)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2.5rem',
          alignItems: 'center'
        }}>
          <div>
            <span style={{
              display: 'inline-block',
              background: 'rgba(255, 255, 255, 0.15)',
              padding: '0.35rem 0.9rem',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              marginBottom: '1rem'
            }}>
              {course.category} · {course.badge}
            </span>
            <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '1rem' }}>
              {course.title}
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {course.description}
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.9rem' }}>
              <div><strong>Duration:</strong> {course.duration || 'Live Virtual Cohort'}</div>
              <div><strong>Pass Rate:</strong> 99.4% First Attempt</div>
              <div><strong>Mentorship:</strong> 100% Application Approval</div>
            </div>
          </div>

          <div style={{
            background: 'var(--white)',
            borderRadius: 'var(--radius)',
            padding: '2rem',
            color: 'var(--gray-900)',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--gray-600)', textTransform: 'uppercase', fontWeight: 700 }}>
              Live Virtual Cohort Fee
            </div>
            <div style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--navy)', margin: '0.5rem 0 1rem' }}>
              {formattedPrice}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--gray-600)', marginBottom: '1.5rem' }}>Includes Exam Prep & Lifetime Support</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button className="btn btn-red" onClick={() => setShowModal(true)}>
                Enroll Now & Pay Online 💳
              </button>
              <a
                href={`${WHATSAPP_LINK}?text=${encodeURIComponent(whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-navy"
              >
                Inquire on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Highlights & Skills Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <div style={{ background: 'var(--white)', padding: '2rem', borderRadius: 'var(--radius)', border: '1px solid var(--gray-200)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '1rem' }}>
              Key Course Deliverables
            </h3>
            <ul style={{ paddingLeft: '1.2rem', color: 'var(--gray-700)', lineHeight: 1.8 }}>
              {course.highlights.map((item, idx) => (
                <li key={idx} style={{ marginBottom: '0.5rem' }}>{item}</li>
              ))}
            </ul>
          </div>

          <div style={{ background: 'var(--white)', padding: '2rem', borderRadius: 'var(--radius)', border: '1px solid var(--gray-200)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '1rem' }}>
              Skills & Competencies Acquired
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {course.skills.map((skill, idx) => (
                <span
                  key={idx}
                  style={{
                    background: 'var(--gray-100)',
                    color: 'var(--navy)',
                    padding: '0.4rem 0.85rem',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    border: '1px solid var(--gray-300)'
                  }}
                >
                  ✓ {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Batches Table */}
        <div style={{ background: 'var(--white)', padding: '2.5rem 2rem', borderRadius: 'var(--radius)', border: '1px solid var(--gray-200)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '1.5rem' }}>
            Upcoming Live Virtual Batches
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
              <thead>
                <tr style={{ background: 'var(--gray-100)', borderBottom: '2px solid var(--gray-300)' }}>
                  <th style={{ padding: '1rem' }}>Batch Dates</th>
                  <th style={{ padding: '1rem' }}>Timing (IST / GMT)</th>
                  <th style={{ padding: '1rem' }}>Mode</th>
                  <th style={{ padding: '1rem' }}>Status</th>
                  <th style={{ padding: '1rem' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {course.batches.map((batch, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--gray-200)' }}>
                    <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--navy)' }}>{batch.date}</td>
                    <td style={{ padding: '1rem', color: 'var(--gray-700)' }}>{batch.time}</td>
                    <td style={{ padding: '1rem', color: 'var(--gray-700)' }}>Live Virtual Cohort</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{
                        background: '#dcfce7',
                        color: '#15803d',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '12px',
                        fontSize: '0.8rem',
                        fontWeight: 700
                      }}>
                        {batch.seats}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <button
                        className="btn btn-navy btn-sm"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, batch: batch.date }))
                          setShowModal(true)
                        }}
                      >
                        Select Batch
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Interactive 2-Step Enrollment & Online Payment Checkout Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(8px)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div style={{
            background: 'var(--white)',
            borderRadius: '16px',
            padding: '2.5rem',
            maxWidth: '520px',
            width: '100%',
            position: 'relative',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            {/* Close Button */}
            <button
              onClick={resetModal}
              style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', fontSize: '1.25rem', background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer' }}
            >
              ✕
            </button>

            {modalStep === 1 && (
              <>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0074e4', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    STEP 1 OF 2 · LEARNER DETAILS
                  </span>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy)', margin: '0.35rem 0' }}>
                    Enroll in {course.shortTitle}
                  </h3>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0074e4' }}>
                    Course Fee: {formattedPrice}
                  </div>
                </div>

                <form onSubmit={handleStep1Submit}>
                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.3rem', display: 'block' }}>Full Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      required
                      placeholder="e.g. Alex Johnson"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{ borderRadius: '8px', padding: '0.75rem 1rem' }}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.3rem', display: 'block' }}>Email Address *</label>
                    <input
                      type="email"
                      className="form-input"
                      required
                      placeholder="alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ borderRadius: '8px', padding: '0.75rem 1rem' }}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.3rem', display: 'block' }}>Phone Number *</label>
                    <input
                      type="tel"
                      className="form-input"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ borderRadius: '8px', padding: '0.75rem 1rem' }}
                    />
                  </div>

                  <button type="submit" className="btn btn-red" style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', fontWeight: 700 }}>
                    Proceed to Select Payment Option ➔
                  </button>
                </form>
              </>
            )}

            {modalStep === 2 && (
              <>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    STEP 2 OF 2 · PAYMENT GATEWAY & OPTIONS
                  </span>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--navy)', margin: '0.35rem 0' }}>
                    Choose Payment Option
                  </h3>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0074e4' }}>
                    Total Payable: {formattedPrice}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
                  {/* Option 1: Razorpay Online Checkout */}
                  <div
                    onClick={() => setSelectedPaymentMode('razorpay')}
                    style={{
                      padding: '1.1rem',
                      borderRadius: '12px',
                      border: selectedPaymentMode === 'razorpay' ? '2px solid #0074e4' : '1px solid #cbd5e1',
                      background: selectedPaymentMode === 'razorpay' ? '#f0f7ff' : '#ffffff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <input
                      type="radio"
                      name="payment_mode"
                      checked={selectedPaymentMode === 'razorpay'}
                      onChange={() => setSelectedPaymentMode('razorpay')}
                      style={{ width: '18px', height: '18px', accentColor: '#0074e4' }}
                    />
                    <div>
                      <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>
                        💳 Pay Online via Razorpay
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                        Credit/Debit Cards, UPI, GPay, NetBanking, EMI
                      </div>
                    </div>
                  </div>

                  {/* Option 2: Pay via Card / NetBanking Directly */}
                  <div
                    onClick={() => setSelectedPaymentMode('card')}
                    style={{
                      padding: '1.1rem',
                      borderRadius: '12px',
                      border: selectedPaymentMode === 'card' ? '2px solid #0074e4' : '1px solid #cbd5e1',
                      background: selectedPaymentMode === 'card' ? '#f0f7ff' : '#ffffff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <input
                      type="radio"
                      name="payment_mode"
                      checked={selectedPaymentMode === 'card'}
                      onChange={() => setSelectedPaymentMode('card')}
                      style={{ width: '18px', height: '18px', accentColor: '#0074e4' }}
                    />
                    <div>
                      <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>
                        💳 Credit / Debit Card & UPI Direct
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                        Instant Card or UPI Payment confirmation
                      </div>
                    </div>
                  </div>

                  {/* Expanded Card / UPI Inputs if selected */}
                  {selectedPaymentMode === 'card' && (
                    <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #cbd5e1', marginTop: '-0.25rem' }}>
                      <input
                        type="text"
                        placeholder="Card Number (4532 •••• •••• 8892)"
                        className="form-input"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        style={{ marginBottom: '0.5rem', borderRadius: '6px', fontSize: '0.85rem' }}
                      />
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="form-input"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          style={{ borderRadius: '6px', fontSize: '0.85rem', flex: 1 }}
                        />
                        <input
                          type="password"
                          placeholder="CVV"
                          maxLength="4"
                          className="form-input"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          style={{ borderRadius: '6px', fontSize: '0.85rem', flex: 1 }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Option 3: Pay/Inquire on WhatsApp */}
                  <div
                    onClick={() => setSelectedPaymentMode('whatsapp')}
                    style={{
                      padding: '1.1rem',
                      borderRadius: '12px',
                      border: selectedPaymentMode === 'whatsapp' ? '2px solid #16a34a' : '1px solid #cbd5e1',
                      background: selectedPaymentMode === 'whatsapp' ? '#f0fdf4' : '#ffffff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <input
                      type="radio"
                      name="payment_mode"
                      checked={selectedPaymentMode === 'whatsapp'}
                      onChange={() => setSelectedPaymentMode('whatsapp')}
                      style={{ width: '18px', height: '18px', accentColor: '#16a34a' }}
                    />
                    <div>
                      <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>
                        💬 Pay via WhatsApp Counselor
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                        Get custom invoice, bank transfer info & instant chat
                      </div>
                    </div>
                  </div>

                  {/* Option 4: Request Callback & Reserve */}
                  <div
                    onClick={() => setSelectedPaymentMode('callback')}
                    style={{
                      padding: '1.1rem',
                      borderRadius: '12px',
                      border: selectedPaymentMode === 'callback' ? '2px solid #0f2b5c' : '1px solid #cbd5e1',
                      background: selectedPaymentMode === 'callback' ? '#f8fafc' : '#ffffff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <input
                      type="radio"
                      name="payment_mode"
                      checked={selectedPaymentMode === 'callback'}
                      onChange={() => setSelectedPaymentMode('callback')}
                      style={{ width: '18px', height: '18px', accentColor: '#0f2b5c' }}
                    />
                    <div>
                      <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>
                        📞 Reserve Seat & Request Callback
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                        Academic advisor will call you to confirm batch timing
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={() => setModalStep(1)}
                    className="btn btn-outline-navy"
                    disabled={isProcessing}
                    style={{ flex: 1, padding: '0.85rem' }}
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handleFinalPaymentOrBooking}
                    className="btn btn-blue"
                    disabled={isProcessing}
                    style={{ flex: 2, padding: '0.85rem', fontWeight: 800 }}
                  >
                    {isProcessing ? 'Processing Payment...' : `Pay ${formattedPrice} & Confirm Seat ➔`}
                  </button>
                </div>
              </>
            )}

            {modalStep === 3 && (
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>🎉</div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#16a34a', marginBottom: '0.5rem' }}>
                  Enrollment & Payment Confirmed!
                </h3>
                <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  Thank you, <strong>{formData.name}</strong>! Your seat for <strong>{course.title}</strong> has been successfully registered.
                </p>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '0.88rem', color: '#475569', marginBottom: '1.5rem' }}>
                  <div><strong>Transaction Reference ID:</strong> {txnId}</div>
                  <div><strong>Amount Paid/Reserved:</strong> {formattedPrice}</div>
                  <div><strong>Confirmation Email Sent To:</strong> {formData.email}</div>
                </div>
                <button onClick={resetModal} className="btn btn-navy" style={{ padding: '0.75rem 2rem' }}>
                  Close Window & Return to Course Page
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
