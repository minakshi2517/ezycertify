import { useState, useEffect } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { api } from '../lib/api'

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const tokenParam = searchParams.get('token') || ''
  const emailParam = searchParams.get('email') || ''

  const [email, setEmail] = useState(emailParam)
  const [code, setCode] = useState(tokenParam)
  const [status, setStatus] = useState(tokenParam ? 'verifying' : 'idle') // 'idle' | 'verifying' | 'success' | 'error'
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (tokenParam && emailParam) {
      verifyDirectly(emailParam, tokenParam)
    }
  }, [tokenParam, emailParam])

  const verifyDirectly = async (targetEmail, targetCode) => {
    setStatus('verifying')
    setMessage('')
    try {
      await api.auth.verifyEmail({ email: targetEmail, code: targetCode })
      setStatus('success')
      setMessage('Your email has been verified successfully!')
    } catch (err) {
      setStatus('error')
      setMessage(err.message || 'Email verification failed or token has expired.')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    verifyDirectly(email, code)
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'calc(var(--header-h) + 2rem) 1rem 3rem',
        background: 'var(--gray-50)',
      }}
    >
      <div
        style={{
          background: 'var(--white)',
          borderRadius: 'var(--radius-lg)',
          padding: '3rem 2.5rem',
          maxWidth: '460px',
          width: '100%',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--gray-200)',
          textAlign: 'center',
        }}
      >
        <Link to="/" style={{ display: 'inline-block', marginBottom: '1.5rem' }}>
          <img src="/logo.png" alt="Ezycertify" style={{ height: '50px', width: 'auto', mixBlendMode: 'multiply' }} />
        </Link>

        {status === 'verifying' && (
          <div>
            <div className="pay-spinner" style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy)' }}>Verifying Email...</h2>
            <p style={{ color: 'var(--gray-600)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Please wait while we confirm your email token.</p>
          </div>
        )}

        {status === 'success' && (
          <div>
            <div style={{ fontSize: '3rem', color: '#16a34a', marginBottom: '0.75rem' }}>✓</div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#15803d', marginBottom: '0.5rem' }}>Email Verified!</h2>
            <p style={{ color: '#475569', fontSize: '0.92rem', marginBottom: '2rem' }}>{message}</p>
            <Link to="/login" className="btn btn-blue" style={{ width: '100%', padding: '0.85rem' }}>
              Proceed to Log In ➔
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div>
            <div style={{ fontSize: '3rem', color: '#dc2626', marginBottom: '0.75rem' }}>⚠️</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#b91c1c', marginBottom: '0.5rem' }}>Verification Failed</h2>
            <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{message}</p>
            <button
              onClick={() => setStatus('idle')}
              className="btn btn-outline-navy"
              style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem' }}
            >
              Enter Code Manually
            </button>
            <Link to="/signup" style={{ color: '#0074e4', fontSize: '0.85rem', fontWeight: 600 }}>
              Return to Sign Up
            </Link>
          </div>
        )}

        {status === 'idle' && (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.5rem' }}>Verify Your Email</h2>
            <p style={{ color: 'var(--gray-600)', fontSize: '0.88rem', marginBottom: '1.75rem' }}>
              Enter your registered email address and the 6-digit verification code.
            </p>

            <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy)', display: 'block', marginBottom: '0.3rem' }}>
                  Registered Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.92rem', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy)', display: 'block', marginBottom: '0.3rem' }}>
                  6-Digit Verification Code *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 849201"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  style={{ width: '100%', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '1.1rem', fontWeight: 700, letterSpacing: '4px', textAlign: 'center', border: '1px solid #cbd5e1' }}
                />
              </div>

              <button type="submit" className="btn btn-blue" style={{ width: '100%', padding: '0.85rem', fontWeight: 700 }}>
                Confirm Email ➔
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
