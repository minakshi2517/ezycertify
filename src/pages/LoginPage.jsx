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
  const [maskedPhone, setMaskedPhone] = useState('')
  const [channel, setChannel] = useState('email') // 'email' | 'phone'
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
        setMaskedPhone(res.maskedPhone)
        setChannel(res.channel || 'email')
        if (res.devCode) setDemo2FaCode(res.devCode)
        setStep(2)
        setCooldown(60)
        setSuccessMsg(res.message || 'Please enter the security verification code.')
      } else if (res.user) {
        setUser(res.user)
        const from = location.state?.from?.pathname || '/'
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
        const from = location.state?.from?.pathname || '/'
        navigate(from, { replace: true })
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSwitchChannel = async (newChannel) => {
    if (loading) return
    setError('')
    setSuccessMsg('')
    setLoading(true)
    try {
      const res = await api.auth.send2FAOtp({ userId, channel: newChannel })
      setChannel(newChannel)
      setCooldown(60)
      setOtp(['', '', '', '', '', ''])
      setSuccessMsg(res.message)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleResend2FA = async () => {
    if (cooldown > 0 || loading) return
    await handleSwitchChannel(channel)
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
        position: 'relative',
      }}
    >
      <div
        style={{
          background: 'var(--white)',
          borderRadius: 'var(--radius-lg)',
          padding: '3rem 2.5rem 2.5rem',
          maxWidth: '460px',
          width: '100%',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--gray-200)',
          position: 'relative',
        }}
      >
        {/* Top Right Close Button */}
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
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Brand Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/logo.png" alt="Ezycertify" style={{ height: '55px', width: 'auto', mixBlendMode: 'multiply' }} />
          </Link>
          <div style={{ height: '35px', width: '1px', background: 'var(--gray-300)' }} />
          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--gray-600)', lineHeight: 1.2 }}>
            Learning<br />Platform
          </div>
        </div>

        {error && (
          <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1.25rem', border: '1px solid #fca5a5' }}>
            {error}
          </div>
        )}

        {successMsg && (
          <div style={{ background: '#dcfce7', color: '#15803d', padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1.25rem', border: '1px solid #86efac' }}>
            {successMsg}
          </div>
        )}

        {step === 1 ? (
          <>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.35rem' }}>
                Welcome back!
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#64748b' }}>
                Log in with your Email Address or Phone Number
              </p>
            </div>

            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.35rem', display: 'block' }}>
                  Email Address or Phone Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. alex@example.com or +91 98765 43210"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  style={{
                    width: '100%',
                    borderRadius: '8px',
                    padding: '0.85rem 1rem',
                    fontSize: '0.95rem',
                    border: '1px solid #cbd5e1',
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.35rem', display: 'block' }}>
                  Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    borderRadius: '8px',
                    padding: '0.85rem 1rem',
                    fontSize: '0.95rem',
                    border: '1px solid #cbd5e1',
                  }}
                />
              </div>

              {/* Options Row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#475569', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    style={{ width: '16px', height: '16px', accentColor: '#0074e4' }}
                  />
                  Remember Me
                </label>
                <Link to="/forgot-password" style={{ color: '#0074e4', fontWeight: 600, textDecoration: 'underline' }}>
                  Forgot Password?
                </Link>
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
                  boxShadow: '0 4px 14px rgba(0, 116, 228, 0.25)',
                }}
              >
                {loading ? 'Verifying Credentials...' : 'Continue to Sign In ➔'}
              </button>
            </form>
          </>
        ) : (
          /* Step 2: Two-Step 2FA Screen */
          <div>
            <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🛡️</div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.35rem' }}>
                Verify It's You
              </h2>
              <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5 }}>
                Enter the 6-digit security code sent to<br />
                <strong style={{ color: '#0074e4' }}>
                  {channel === 'email' ? maskedEmail : maskedPhone}
                </strong>
              </p>
            </div>

            {/* 2FA Method Selector */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', background: '#f1f5f9', padding: '4px', borderRadius: '10px' }}>
              <button
                type="button"
                onClick={() => handleSwitchChannel('email')}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  background: channel === 'email' ? '#ffffff' : 'transparent',
                  color: channel === 'email' ? '#0f2b5c' : '#64748b',
                  boxShadow: channel === 'email' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                }}
              >
                ✉️ Email Code
              </button>
              <button
                type="button"
                onClick={() => handleSwitchChannel('phone')}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  background: channel === 'phone' ? '#ffffff' : 'transparent',
                  color: channel === 'phone' ? '#0f2b5c' : '#64748b',
                  boxShadow: channel === 'phone' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                }}
              >
                📱 Phone OTP
              </button>
            </div>

            {demo2FaCode && (
              <div style={{
                background: '#eff6ff',
                border: '1px dashed #3b82f6',
                borderRadius: '8px',
                padding: '10px 14px',
                marginBottom: '1.25rem',
                textAlign: 'center',
                fontSize: '0.84rem',
                color: '#1e40af',
              }}>
                <div>💡 <strong>Security Code:</strong> <strong style={{ fontSize: '1.2rem', color: '#0074e4', letterSpacing: '3px', marginLeft: '6px' }}>{demo2FaCode}</strong></div>
                <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '2px' }}>
                  (Enter this 6-digit code below to complete 2FA sign in)
                </div>
              </div>
            )}

            <form onSubmit={handleVerify2FA}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.75rem' }}>
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
                  fontSize: '1rem',
                  fontWeight: 700,
                  background: '#16a34a',
                  color: '#ffffff',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 14px rgba(22, 163, 74, 0.25)',
                  marginBottom: '1rem',
                }}
              >
                {loading ? 'Verifying 2FA...' : 'Verify & Sign In ➔'}
              </button>
            </form>

            <div style={{ textAlign: 'center', fontSize: '0.85rem', color: '#64748b' }}>
              Didn't receive the code?{' '}
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
                {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend Code'}
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
        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
          <div>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: '#0074e4', fontWeight: 700, textDecoration: 'underline' }}>
              Sign Up
            </Link>
          </div>
          <Link to="/" style={{ color: 'var(--gray-600)', fontWeight: 600, fontSize: '0.85rem', textDecoration: 'none' }}>
            ← Back to Home Page
          </Link>
        </div>
      </div>
    </div>
  )
}
