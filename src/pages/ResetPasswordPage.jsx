import { useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { api } from '../lib/api'

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const token = searchParams.get('token') || ''
  const emailParam = searchParams.get('email') || ''

  const [email, setEmail] = useState(emailParam)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const passLength = newPassword.length >= 8
  const passUpper = /[A-Z]/.test(newPassword)
  const passLower = /[a-z]/.test(newPassword)
  const passNumber = /\d/.test(newPassword)
  const passSpecial = /[^A-Za-z0-9]/.test(newPassword)
  const isPassValid = passLength && passUpper && passLower && passNumber && passSpecial

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!token) {
      setError('Password reset token is missing. Please use the link sent to your email.')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (!isPassValid) {
      setError('Password must meet all security requirements.')
      return
    }

    setLoading(true)
    try {
      await api.auth.resetPassword({ token, email, newPassword })
      setSuccess(true)
      setTimeout(() => navigate('/login'), 2000)
    } catch (err) {
      setError(err.message || 'Password reset failed. The token may be expired.')
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
            Set New Password
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#64748b' }}>
            Choose a strong password to secure your account.
          </p>
        </div>

        {error && (
          <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1.25rem', border: '1px solid #fca5a5' }}>
            {error}
          </div>
        )}

        {success ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', color: '#16a34a', marginBottom: '0.75rem' }}>✓</div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#15803d', marginBottom: '0.5rem' }}>
              Password Updated!
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '1.5rem' }}>
              Your password has been changed. Redirecting to login...
            </p>
            <Link to="/login" className="btn btn-blue" style={{ width: '100%', padding: '0.75rem' }}>
              Log In Now ➔
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.35rem', display: 'block' }}>
                Account Email *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', borderRadius: '8px', padding: '0.8rem 1rem', fontSize: '0.92rem', border: '1px solid #cbd5e1' }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.35rem', display: 'block' }}>
                New Password *
              </label>
              <input
                type="password"
                required
                placeholder="Choose new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{ width: '100%', borderRadius: '8px', padding: '0.8rem 1rem', fontSize: '0.92rem', border: '1px solid #cbd5e1' }}
              />
              {newPassword && (
                <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.25rem' }}>
                  <span style={{ color: passLength ? '#16a34a' : '#94a3b8' }}>{passLength ? '✓' : '○'} 8+ Characters</span>
                  <span style={{ color: passUpper ? '#16a34a' : '#94a3b8' }}>{passUpper ? '✓' : '○'} Uppercase letter</span>
                  <span style={{ color: passLower ? '#16a34a' : '#94a3b8' }}>{passLower ? '✓' : '○'} Lowercase letter</span>
                  <span style={{ color: passNumber ? '#16a34a' : '#94a3b8' }}>{passNumber ? '✓' : '○'} Number (0-9)</span>
                  <span style={{ color: passSpecial ? '#16a34a' : '#94a3b8' }}>{passSpecial ? '✓' : '○'} Special character</span>
                </div>
              )}
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.35rem', display: 'block' }}>
                Confirm New Password *
              </label>
              <input
                type="password"
                required
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ width: '100%', borderRadius: '8px', padding: '0.8rem 1rem', fontSize: '0.92rem', border: '1px solid #cbd5e1' }}
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
                background: '#16a34a',
                color: '#ffffff',
                borderRadius: '8px',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Updating Password...' : 'Save New Password ➔'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
