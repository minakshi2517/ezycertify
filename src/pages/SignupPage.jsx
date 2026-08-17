import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function SignupPage() {
  const { signUp } = useApp()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [step, setStep] = useState(1) // 1: Info, 2: OTP Verification
  const [otp, setOtp] = useState(['2', '5', '1', '7']) // 4-digit OTP

  const handleSendOtp = (e) => {
    e.preventDefault()
    if (name.trim() && identifier.trim() && password) {
      setStep(2)
    }
  }

  const handleVerifyOtp = (e) => {
    e.preventDefault()
    const enteredOtp = otp.join('')
    if (enteredOtp.length === 4) {
      signUp(name, identifier, password)
      navigate('/')
    }
  }

  const handleSocialAuth = (provider) => {
    signUp(`Learner via ${provider}`, `student.${provider.toLowerCase()}@ezycertify.com`, 'password')
    navigate('/')
  }

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    if (value && index < 3) {
      const nextInput = document.getElementById(`signup-otp-input-${index + 1}`)
      if (nextInput) nextInput.focus()
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'calc(var(--header-h) + 2rem) 1rem 3rem',
      background: 'var(--gray-50)',
      position: 'relative'
    }}>
      <div style={{
        background: 'var(--white)',
        borderRadius: 'var(--radius-lg)',
        padding: '3rem 2.5rem 2.5rem',
        maxWidth: '460px',
        width: '100%',
        boxShadow: 'var(--shadow-md)',
        border: '1px solid var(--gray-200)',
        position: 'relative'
      }}>
        {/* Top Right Close Cross Button */}
        <button
          onClick={() => navigate('/')}
          aria-label="Close and return to home"
          title="Return to Home"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: '1px solid #e2e8f0',
            background: '#f8fafc',
            color: '#64748b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            outline: 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#fee2e2'
            e.currentTarget.style.color = '#ef4444'
            e.currentTarget.style.borderColor = '#fca5a5'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#f8fafc'
            e.currentTarget.style.color = '#64748b'
            e.currentTarget.style.borderColor = '#e2e8f0'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Brand Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="/logo.png"
              alt="Ezycertify"
              style={{ height: '55px', width: 'auto', mixBlendMode: 'multiply' }}
            />
          </Link>
          <div style={{ height: '35px', width: '1px', background: 'var(--gray-300)' }} />
          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--gray-600)', lineHeight: 1.2 }}>
            Learning<br />Platform
          </div>
        </div>

        {step === 1 ? (
          <>
            {/* Title & Subtitle */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.35rem' }}>
                Create Free Account
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#64748b' }}>
                Sign up with your Email Address or Phone Number
              </p>
            </div>

            {/* Form Inputs */}
            <form onSubmit={handleSendOtp}>
              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.35rem', display: 'block' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  className="form-input"
                  required
                  placeholder="e.g. Alex Johnson"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    borderRadius: '8px',
                    padding: '0.85rem 1rem',
                    fontSize: '0.95rem',
                    border: '1px solid #cbd5e1',
                    background: '#fff'
                  }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.35rem', display: 'block' }}>
                  Email Address or Phone Number *
                </label>
                <input
                  type="text"
                  className="form-input"
                  required
                  placeholder="e.g. alex@example.com or +91 98765 43210"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  style={{
                    borderRadius: '8px',
                    padding: '0.85rem 1rem',
                    fontSize: '0.95rem',
                    border: '1px solid #cbd5e1',
                    background: '#fff'
                  }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.35rem', display: 'block' }}>
                  Create Password *
                </label>
                <input
                  type="password"
                  className="form-input"
                  required
                  placeholder="Choose a secure password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    borderRadius: '8px',
                    padding: '0.85rem 1rem',
                    fontSize: '0.95rem',
                    border: '1px solid #cbd5e1',
                    background: '#fff'
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn"
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  fontSize: '1rem',
                  fontWeight: 700,
                  background: '#0074e4',
                  color: '#ffffff',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(0, 116, 228, 0.25)'
                }}
              >
                Send Verification Code ➔
              </button>
            </form>

            {/* Divider OR */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              margin: '2rem 0',
              color: '#94a3b8',
              fontSize: '0.8rem',
              fontWeight: 700
            }}>
              <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
              <span style={{ padding: '0 1rem', textTransform: 'uppercase' }}>OR</span>
              <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
            </div>

            {/* Social Authentication */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <button
                onClick={() => handleSocialAuth('Google')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  width: '100%',
                  padding: '0.75rem',
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '25px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: '#334155',
                  cursor: 'pointer'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.14C3.26 21.3 7.31 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.59H1.29C.47 8.22 0 10.06 0 12s.47 3.78 1.29 5.41l3.99-3.14z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.59l3.99 3.14c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                Continue with Google
              </button>

              <button
                onClick={() => handleSocialAuth('LinkedIn')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  width: '100%',
                  padding: '0.75rem',
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '25px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: '#334155',
                  cursor: 'pointer'
                }}
              >
                <svg width="18" height="18" fill="#0A66C2" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                Continue with LinkedIn
              </button>
            </div>
          </>
        ) : (
          /* Step 2: OTP Verification Screen */
          <div>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔐</div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.35rem' }}>
                Verify Mobile/Email Code
              </h2>
              <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5 }}>
                We sent a 4-digit verification code to<br />
                <strong style={{ color: '#0074e4' }}>{identifier}</strong>
              </p>
            </div>

            <form onSubmit={handleVerifyOtp}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`signup-otp-input-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    style={{
                      width: '54px',
                      height: '58px',
                      textAlign: 'center',
                      fontSize: '1.4rem',
                      fontWeight: 800,
                      borderRadius: '10px',
                      border: '2px solid #0074e4',
                      background: '#f0f7ff',
                      color: '#0f2b5c'
                    }}
                  />
                ))}
              </div>

              <button
                type="submit"
                className="btn"
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  fontSize: '1rem',
                  fontWeight: 700,
                  background: '#16a34a',
                  color: '#ffffff',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(22, 163, 74, 0.25)',
                  marginBottom: '1rem'
                }}
              >
                Verify & Create Account ➔
              </button>
            </form>

            <div style={{ textAlign: 'center', fontSize: '0.85rem', color: '#64748b' }}>
              Didn't receive the code?{' '}
              <button
                onClick={() => alert(`Resent 4-digit code to ${identifier}`)}
                style={{ background: 'none', border: 'none', color: '#0074e4', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
              >
                Resend Code
              </button>
              <br />
              <button
                onClick={() => setStep(1)}
                style={{ background: 'none', border: 'none', color: '#64748b', fontWeight: 600, cursor: 'pointer', marginTop: '0.75rem' }}
              >
                ← Change Email or Phone
              </button>
            </div>
          </div>
        )}

        {/* Footer Redirect Links */}
        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
          <div>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#0074e4', fontWeight: 700, textDecoration: 'underline' }}>
              Log In
            </Link>
          </div>

          <Link
            to="/"
            style={{
              color: 'var(--gray-600)',
              fontWeight: 600,
              fontSize: '0.85rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              textDecoration: 'none'
            }}
          >
            ← Back to Home Page
          </Link>
        </div>
      </div>
    </div>
  )
}
