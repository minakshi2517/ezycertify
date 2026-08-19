import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { api } from '../lib/api'

export default function SignupPage() {
  const { setUser } = useApp()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [step, setStep] = useState(1) // 1: Info, 2: Email Verification
  const [userId, setUserId] = useState('')
  const [maskedEmail, setMaskedEmail] = useState('')
  const [emailOtp, setEmailOtp] = useState(['', '', '', '', '', ''])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [cooldown, setCooldown] = useState(0)
  const [demoEmailCode, setDemoEmailCode] = useState('')

  useEffect(() => {
    let timer
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [cooldown])

  // Password criteria checks
  const passLength = password.length >= 8
  const passUpper = /[A-Z]/.test(password)
  const passLower = /[a-z]/.test(password)
  const passNumber = /\d/.test(password)
  const passSpecial = /[^A-Za-z0-9]/.test(password)
  const isPassValid = passLength && passUpper && passLower && passNumber && passSpecial

  const handleSignup = async (e) => {
    e.preventDefault()
    setError('')
    setSuccessMsg('')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (!isPassValid) {
      setError('Password must meet all security requirements.')
      return
    }

    setLoading(true)
    try {
      const res = await api.auth.signup({
        name,
        email,
        phone,
        password,
        confirmPassword,
      })

      setUserId(res.userId)
      setMaskedEmail(res.maskedEmail)
      if (res.devCode) setDemoEmailCode(res.devCode)
      setStep(2)
      setCooldown(60)
      setSuccessMsg('Account registered! Enter the 6-digit verification code sent to your email.')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleOtpInput = (val, idx) => {
    if (!/^\d*$/.test(val)) return
    const copy = [...emailOtp]
    copy[idx] = val.slice(-1)
    setEmailOtp(copy)
    if (val && idx < 5) {
      document.getElementById(`signup-email-otp-${idx + 1}`)?.focus()
    }
  }

  const handleVerifyEmail = async (e) => {
    e.preventDefault()
    setError('')
    setSuccessMsg('')
    const code = emailOtp.join('')
    if (code.length < 6) {
      setError('Please enter the full 6-digit email verification code.')
      return
    }

    setLoading(true)
    try {
      const res = await api.auth.verifyEmail({ userId, email, code })
      if (res.user) {
        setUser(res.user)
      }
      setSuccessMsg('Email verified successfully! Logging you in...')
      setTimeout(() => {
        navigate('/', { replace: true })
      }, 1000)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleResendEmail = async () => {
    if (cooldown > 0) return
    setError('')
    setSuccessMsg('')
    try {
      const res = await api.auth.resendEmailOtp({ userId, email })
      setCooldown(60)
      if (res.devCode) setDemoEmailCode(res.devCode)
      setSuccessMsg('A new verification code has been sent to your email.')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', padding: '2rem 1rem' }}>
      <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', maxWidth: '460px', width: '100%', padding: '2.5rem', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
        
        {/* Branding Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '1.8rem' }}>🎯</span>
            <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f2b5c', letterSpacing: '-0.5px' }}>Ezycertify</span>
          </div>
          <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0 }}>
            {step === 1 ? 'Create your learner account' : 'Verify Your Email'}
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
          /* STEP 1: Registration Form */
          <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.95rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.95rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                placeholder="+91 9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.95rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                Password *
              </label>
              <input
                type="password"
                required
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.95rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                Confirm Password *
              </label>
              <input
                type="password"
                required
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.95rem' }}
              />
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
              {loading ? 'Creating Account...' : 'Continue to Verification ➔'}
            </button>
          </form>
        ) : (
          /* STEP 2: Email Verification Only (No Phone Tab / Step) */
          <div>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>✉️</div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f2b5c', margin: '0 0 0.35rem' }}>
                Verify Your Email Address
              </h2>
              <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0 }}>
                Enter the 6-digit code sent to <br />
                <strong style={{ color: '#0074e4' }}>{maskedEmail}</strong>
              </p>
            </div>

            {demoEmailCode && (
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
                <div>🔑 <strong>Verification Code:</strong> <strong style={{ fontSize: '1.2rem', color: '#0074e4', letterSpacing: '3px', marginLeft: '6px' }}>{demoEmailCode}</strong></div>
              </div>
            )}

            <form onSubmit={handleVerifyEmail}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {emailOtp.map((digit, i) => (
                  <input
                    key={i}
                    id={`signup-email-otp-${i}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpInput(e.target.value, i)}
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
                {loading ? 'Verifying...' : 'Verify Email & Complete ➔'}
              </button>

              <div style={{ textAlign: 'center', fontSize: '0.85rem', color: '#64748b' }}>
                Didn't receive the email code?{' '}
                <button
                  type="button"
                  onClick={handleResendEmail}
                  disabled={cooldown > 0}
                  style={{ background: 'none', border: 'none', color: cooldown > 0 ? '#94a3b8' : '#0074e4', fontWeight: 700, cursor: cooldown > 0 ? 'default' : 'pointer', textDecoration: 'underline' }}
                >
                  {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend Code'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Footer Redirect Links */}
        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: '#64748b' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#0074e4', fontWeight: 700, textDecoration: 'underline' }}>
            Log In
          </Link>
        </div>
      </div>
    </div>
  )
}
