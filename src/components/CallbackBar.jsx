import { useState } from 'react'

export default function CallbackBar() {
  const [open, setOpen] = useState(false)
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!phone) return
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setOpen(false)
      setPhone('')
    }, 2500)
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5rem',
      left: '1.5rem',
      zIndex: 999,
      fontFamily: 'var(--font-body)'
    }}>
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: 'var(--navy)',
            color: 'var(--white)',
            border: '1px solid rgba(255,255,255,0.2)',
            padding: '0.7rem 1.25rem',
            borderRadius: '50px',
            boxShadow: 'var(--shadow-md)',
            fontWeight: 700,
            fontSize: '0.875rem',
            cursor: 'pointer',
            transition: 'transform 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.5">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span>Request Call Back in 5 Mins</span>
        </button>
      ) : (
        <div style={{
          background: 'var(--white)',
          padding: '1.25rem 1.5rem',
          borderRadius: 'var(--radius)',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--gray-200)',
          maxWidth: '320px',
          position: 'relative'
        }}>
          <button
            onClick={() => setOpen(false)}
            style={{ position: 'absolute', top: '0.5rem', right: '0.75rem', border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.1rem', color: 'var(--gray-600)' }}
          >
            ✕
          </button>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
              <div style={{ fontWeight: 800, color: '#16a34a', fontSize: '0.95rem' }}>✓ Call Requested!</div>
              <p style={{ fontSize: '0.8rem', color: 'var(--gray-600)', marginTop: '0.2rem' }}>
                An exam advisor will call you at <strong>{phone}</strong> shortly.
              </p>
            </div>
          ) : (
            <>
              <div style={{ fontWeight: 800, color: 'var(--navy)', fontSize: '0.95rem', marginBottom: '0.2rem' }}>
                Talk to PMP Advisor
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--gray-600)', marginBottom: '0.75rem' }}>
                Enter your phone number for instant guidance.
              </p>

              <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="tel"
                  required
                  placeholder="+91 / +1 phone"
                  className="form-input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
                />
                <button type="submit" className="btn btn-red btn-sm" style={{ whiteSpace: 'nowrap' }}>
                  Call Me
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  )
}
