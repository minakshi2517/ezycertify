import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { api } from '../lib/api'

export default function LoginPage() {
  const { setUser } = useApp()
  const navigate = useNavigate()
  const location = useLocation()

  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)

  const [step, setStep] = useState(1) // 1: Credentials, 2: 2FA Verification
  const [userId, setUserId] = useState('')
  const [maskedEmail, setMaskedEmail] = useState('')
  const [channel, setChannel] = useState('email')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [cooldown, setCooldown] = useState(0)
  const [demo2FaCode, setDemo2FaCode] = useState('')

  useEffect(() => {
    let timer
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [cooldown])

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setSuccessMsg('')
    setLoading(true)

    try {
      const res = await api.auth.login({ identifier, password })
      if (res.require2FA) {
        setUserId(res.userId)
        setMaskedEmail(res.maskedEmail)
        setChannel('email')
        if (res.devCode) setDemo2FaCode(res.devCode)
        setStep(2)
        setCooldown(60)
        setSuccessMsg(res.message || 'Please enter the security verification code sent to your email.')
      } else if (res.user) {
        setUser(res.user)
        const from = location.state?.from?.pathname || (res.user.role === 'admin' ? '/admin' : '/')
        navigate(from, { replace: true })
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)
    if (value && index < 5) {
      const nextInput = document.getElementById(`login-2fa-input-${index + 1}`)
      if (nextInput) nextInput.focus()
    }
  }

  const handleVerify2FA = async (e) => {
    e.preventDefault()
    setError('')
    setSuccessMsg('')
    const code = otp.join('')
    if (code.length < 6) {
      setError('Please enter the full 6-digit verification code.')
      return
    }

    setLoading(true)
    try {
      const res = await api.auth.verify2FA({ userId, code })
      if (res.user) {
        setUser(res.user)
        const from = location.state?.from?.pathname || (res.user.role === 'admin' ? '/admin' : '/')
        navigate(from, { replace: true })
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleResend2FA = async () => {
    if (cooldown > 0 || loading) return
    setError('')
    setSuccessMsg('')
    setLoading(true)
    try {
      const res = await api.auth.send2FAOtp({ userId, channel: 'email' })
      setCooldown(60)
      if (res.devCode) setDemo2FaCode(res.devCode)
      setSuccessMsg(res.message || 'A new verification code has been sent to your email.')
    } catch (err) {
      setError(err.message || 'Could not resend verification code.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', padding: '2rem 1rem' }}>
      <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', maxWidth: '440px', width: '100%', padding: '2.5rem', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
        
        {/* Branding Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '1.8rem' }}>🎯</span>
            <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f2b5c', letterSpacing: '-0.5px' }}>Ezycertify</span>
          </div>
          <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0 }}>
            {step === 1 ? 'Sign in to access your courses & certifications' : 'Two-Factor Email Security Check'}
          </p>
        </div>

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #f87171', color: '#991b1b', padding: '0.85rem 1rem', borderRadius: '8px', marginBottom: '1.25rem', fontSize: '0.88rem', fontWeight: 600 }}>
            ⚠️ {error}
          </div>
        )}

        {successMsg && (
          <div style={{ background: '#f0fdf4', border: '1px solid #4ade80', color: '#166534', padding: '0.85rem 1rem', borderRadius: '8px', marginBottom: '1.25rem', fontSize: '0.88rem', fontWeight: 600 }}>
            ✓ {successMsg}
          </div>
        )}

        {step === 1 ? (
          /* Step 1: Email/Identifier & Password */
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.95rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.95rem' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  style={{ accentColor: '#0074e4' }}
                />
                Remember me
              </label>
              <Link to="/forgot-password" style={{ color: '#0074e4', fontWeight: 700, textDecoration: 'none' }}>
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.85rem',
                borderRadius: '8px',
                border: 'none',
                background: '#0074e4',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '1rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 12px rgba(0, 116, 228, 0.25)',
                marginTop: '0.5rem',
              }}
            >
              {loading ? 'Authenticating...' : 'Sign In ➔'}
            </button>
          </form>
        ) : (
          /* Step 2: Email Code Verification */
          <div>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>✉️</div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f2b5c', margin: '0 0 0.35rem' }}>
                Enter Verification Code
              </h2>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
                We sent a 6-digit security code to<br />
                <strong style={{ color: '#0074e4' }}>{maskedEmail}</strong>
              </p>
            </div>

            {demo2FaCode && (
              <div style={{ background: '#eff6ff', border: '1px dashed #3b82f6', borderRadius: '8px', padding: '10px 14px', marginBottom: '1.25rem', textAlign: 'center', fontSize: '0.84rem', color: '#1e40af' }}>
                <div>🔑 <strong>Security Code:</strong> <strong style={{ fontSize: '1.2rem', color: '#0074e4', letterSpacing: '3px', marginLeft: '6px' }}>{demo2FaCode}</strong></div>
              </div>
            )}

            <form onSubmit={handleVerify2FA}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`login-2fa-input-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    style={{
                      width: '46px',
                      height: '52px',
                      textAlign: 'center',
                      fontSize: '1.3rem',
                      fontWeight: 800,
                      borderRadius: '10px',
                      border: '2px solid #0074e4',
                      background: '#f0f7ff',
                      color: '#0f2b5c',
                    }}
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#16a34a',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '1rem',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 12px rgba(22, 163, 74, 0.25)',
                  marginBottom: '1rem',
                }}
              >
                {loading ? 'Verifying Code...' : 'Verify & Sign In ➔'}
              </button>
            </form>

            <div style={{ textAlign: 'center', fontSize: '0.85rem', color: '#64748b' }}>
              Didn't receive the email code?{' '}
              <button
                type="button"
                onClick={handleResend2FA}
                disabled={cooldown > 0 || loading}
                style={{
                  background: 'none',
                  border: 'none',
                  color: cooldown > 0 ? '#94a3b8' : '#0074e4',
                  fontWeight: 700,
                  cursor: cooldown > 0 ? 'default' : 'pointer',
                  textDecoration: 'underline',
                }}
              >
                {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend Email Code'}
              </button>
              <br />
              <button
                type="button"
                onClick={() => setStep(1)}
                style={{ background: 'none', border: 'none', color: '#64748b', fontWeight: 600, cursor: 'pointer', marginTop: '0.75rem' }}
              >
                ← Back to Password Login
              </button>
            </div>
          </div>
        )}

        {/* Footer Redirect Links */}
        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: '#64748b' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: '#0074e4', fontWeight: 700, textDecoration: 'underline' }}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}
