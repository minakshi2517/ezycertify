import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function CookieBanner() {
  const [accepted, setAccepted] = useState(true)

  useEffect(() => {
    const consent = localStorage.getItem('ezycertify-cookie-consent')
    if (!consent) {
      setAccepted(false)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('ezycertify-cookie-consent', 'accepted')
    setAccepted(true)
  }

  if (accepted) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.25rem',
      left: '1.25rem',
      right: '1.25rem',
      maxWidth: '620px',
      margin: '0 auto',
      background: '#0f172a',
      color: '#ffffff',
      padding: '1.1rem 1.5rem',
      borderRadius: '14px',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.35)',
      border: '1px solid #334155',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1.25rem',
      flexWrap: 'wrap'
    }}>
      <div style={{ flex: 1, minWidth: '260px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', fontWeight: 800, color: '#60a5fa', marginBottom: '0.25rem' }}>
          <span>🔒 Data Protection & Privacy Notice</span>
        </div>
        <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.5, margin: 0 }}>
          We use SSL encryption & cookies to protect your data and deliver certified LMS experiences. Read our{' '}
          <Link to="/privacy-policy" style={{ color: '#60a5fa', textDecoration: 'underline' }}>Privacy Policy</Link>.
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <button
          onClick={handleAccept}
          className="btn btn-blue btn-sm"
          style={{ padding: '0.45rem 1rem', fontSize: '0.82rem', borderRadius: '6px' }}
        >
          Accept & Continue
        </button>
      </div>
    </div>
  )
}
