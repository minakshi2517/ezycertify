import { useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await api.auth.forgotPassword({ email })
      setSubmitted(true)
    } catch (err) {
      setError(err.message || 'Failed to send password reset email.')
    } finally {
      setLoading(false)
    }
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
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link to="/" style={{ display: 'inline-block', marginBottom: '1.25rem' }}>
            <img src="/logo.png" alt="Ezycertify" style={{ height: '50px', width: 'auto', mixBlendMode: 'multiply' }} />
          </Link>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.35rem' }}>
            Reset Password
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#64748b' }}>
            Enter your account email to receive a password reset link.
          </p>
        </div>

        {error && (
          <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1.25rem', border: '1px solid #fca5a5' }}>
            {error}
          </div>
        )}

        {submitted ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📩</div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#15803d', marginBottom: '0.5rem' }}>
              Reset Link Sent
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              If an account is associated with <strong>{email}</strong>, we have sent instructions to reset your password.
            </p>
            <Link to="/login" className="btn btn-blue" style={{ width: '100%', padding: '0.75rem' }}>
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.35rem', display: 'block' }}>
                Account Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', borderRadius: '8px', padding: '0.85rem 1rem', fontSize: '0.95rem', border: '1px solid #cbd5e1' }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.85rem',
                fontSize: '1rem',
                fontWeight: 700,
                background: '#0074e4',
                color: '#ffffff',
                borderRadius: '8px',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Sending link...' : 'Send Password Reset Link ➔'}
            </button>

            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <Link to="/login" style={{ color: '#0074e4', fontSize: '0.88rem', fontWeight: 600 }}>
                ← Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
