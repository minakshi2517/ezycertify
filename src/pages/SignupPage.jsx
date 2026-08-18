import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../lib/api'

export default function SignupPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [step, setStep] = useState(1) // 1: Info, 2: Verification
  const [userId, setUserId] = useState('')
  const [maskedEmail, setMaskedEmail] = useState('')
  const [maskedPhone, setMaskedPhone] = useState('')

  const [activeTab, setActiveTab] = useState('email') // 'email' | 'phone'
  const [emailOtp, setEmailOtp] = useState(['', '', '', '', '', ''])
  const [phoneOtp, setPhoneOtp] = useState(['', '', '', '', '', ''])
  const [emailVerified, setEmailVerified] = useState(false)
  const [phoneVerified, setPhoneVerified] = useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [cooldown, setCooldown] = useState(0)

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
      setMaskedPhone(res.maskedPhone)
      setStep(2)
      setCooldown(60)
      setSuccessMsg('Account registered! We sent verification codes to your email and phone.')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleOtpInput = (val, idx, type) => {
    if (!/^\d*$/.test(val)) return
    if (type === 'email') {
      const copy = [...emailOtp]
      copy[idx] = val.slice(-1)
      setEmailOtp(copy)
      if (val && idx < 5) {
        document.getElementById(`signup-email-otp-${idx + 1}`)?.focus()
      }
    } else {
      const copy = [...phoneOtp]
      copy[idx] = val.slice(-1)
      setPhoneOtp(copy)
      if (val && idx < 5) {
        document.getElementById(`signup-phone-otp-${idx + 1}`)?.focus()
      }
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
      await api.auth.verifyEmail({ userId, email, code })
      setEmailVerified(true)
      setSuccessMsg('Email verified successfully! Now verify your phone number.')
      setActiveTab('phone')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyPhone = async (e) => {
    e.preventDefault()
    setError('')
    setSuccessMsg('')
    const code = phoneOtp.join('')
    if (code.length < 6) {
      setError('Please enter the full 6-digit phone OTP.')
      return
    }

    setLoading(true)
    try {
      await api.auth.verifyPhone({ userId, phone, code })
      setPhoneVerified(true)
      setSuccessMsg('Phone verified successfully! Your account is now fully active.')
      setTimeout(() => navigate('/login'), 1500)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleResendEmail = async () => {
    if (cooldown > 0) return
    setError('')
    try {
      await api.auth.resendEmailOtp({ userId, email })
      setCooldown(60)
      setSuccessMsg('New verification code sent to your email.')
    } catch (err) {
      setError(err.message)
    }
  }

  const handleResendPhone = async () => {
    if (cooldown > 0) return
    setError('')
    try {
      await api.auth.resendPhoneOtp({ userId, phone })
      setCooldown(60)
      setSuccessMsg('New OTP sent to your phone.')
    } catch (err) {
      setError(err.message)
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
        position: 'relative',
      }}
    >
      <div
        style={{
          background: 'var(--white)',
          borderRadius: 'var(--radius-lg)',
          padding: '3rem 2.5rem 2.5rem',
          maxWidth: '480px',
          width: '100%',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--gray-200)',
          position: 'relative',
        }}
      >
        {/* Close Button */}
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
            <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.35rem' }}>
                Create Account
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
                Register for accredited certification training
              </p>
            </div>

            <form onSubmit={handleSignup}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.3rem', display: 'block' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: '100%', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.92rem', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.3rem', display: 'block' }}>
                  Email Address *
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

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.3rem', display: 'block' }}>
                  Phone Number (with Country Code) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ width: '100%', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.92rem', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.3rem', display: 'block' }}>
                  Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Choose a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: '100%', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.92rem', border: '1px solid #cbd5e1' }}
                />
                {/* Password strength checklist */}
                {password && (
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
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.3rem', display: 'block' }}>
                  Confirm Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{ width: '100%', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.92rem', border: '1px solid #cbd5e1' }}
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
                  boxShadow: '0 4px 14px rgba(0, 116, 228, 0.25)',
                }}
              >
                {loading ? 'Registering Account...' : 'Continue to Verification ➔'}
              </button>
            </form>
          </>
        ) : (
          /* Step 2: Verification Hub */
          <div>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '2.2rem', marginBottom: '0.25rem' }}>🔐</div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1e293b' }}>
                Account Verification
              </h2>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem' }}>
                Confirm both your email and mobile phone to activate your account.
              </p>
            </div>

            {/* Verification Channel Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', background: '#f1f5f9', padding: '4px', borderRadius: '10px' }}>
              <button
                onClick={() => setActiveTab('email')}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  background: activeTab === 'email' ? '#ffffff' : 'transparent',
                  color: activeTab === 'email' ? '#0f2b5c' : '#64748b',
                  boxShadow: activeTab === 'email' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                }}
              >
                ✉️ Email {emailVerified ? '✓' : ''}
              </button>
              <button
                onClick={() => setActiveTab('phone')}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  background: activeTab === 'phone' ? '#ffffff' : 'transparent',
                  color: activeTab === 'phone' ? '#0f2b5c' : '#64748b',
                  boxShadow: activeTab === 'phone' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                }}
              >
                📱 Phone {phoneVerified ? '✓' : ''}
              </button>
            </div>

            {activeTab === 'email' ? (
              <form onSubmit={handleVerifyEmail}>
                <p style={{ fontSize: '0.88rem', color: '#475569', textAlign: 'center', marginBottom: '1.25rem' }}>
                  Enter the 6-digit code sent to <br />
                  <strong style={{ color: '#0074e4' }}>{maskedEmail}</strong>
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {emailOtp.map((digit, i) => (
                    <input
                      key={i}
                      id={`signup-email-otp-${i}`}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpInput(e.target.value, i, 'email')}
                      style={{
                        width: '44px',
                        height: '50px',
                        textAlign: 'center',
                        fontSize: '1.3rem',
                        fontWeight: 800,
                        borderRadius: '8px',
                        border: '2px solid #0074e4',
                        background: '#f0f7ff',
                      }}
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={loading || emailVerified}
                  style={{
                    width: '100%',
                    padding: '0.85rem',
                    fontSize: '1rem',
                    fontWeight: 700,
                    background: emailVerified ? '#16a34a' : '#0074e4',
                    color: '#ffffff',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: emailVerified ? 'default' : 'pointer',
                    marginBottom: '1rem',
                  }}
                >
                  {emailVerified ? 'Email Verified ✓' : 'Verify Email ➔'}
                </button>

                <div style={{ textAlign: 'center', fontSize: '0.85rem', color: '#64748b' }}>
                  Didn't receive email?{' '}
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
            ) : (
              <form onSubmit={handleVerifyPhone}>
                <p style={{ fontSize: '0.88rem', color: '#475569', textAlign: 'center', marginBottom: '1.25rem' }}>
                  Enter the 6-digit OTP sent to <br />
                  <strong style={{ color: '#0074e4' }}>{maskedPhone}</strong>
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {phoneOtp.map((digit, i) => (
                    <input
                      key={i}
                      id={`signup-phone-otp-${i}`}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpInput(e.target.value, i, 'phone')}
                      style={{
                        width: '44px',
                        height: '50px',
                        textAlign: 'center',
                        fontSize: '1.3rem',
                        fontWeight: 800,
                        borderRadius: '8px',
                        border: '2px solid #16a34a',
                        background: '#f0fdf4',
                      }}
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={loading || phoneVerified}
                  style={{
                    width: '100%',
                    padding: '0.85rem',
                    fontSize: '1rem',
                    fontWeight: 700,
                    background: phoneVerified ? '#16a34a' : '#16a34a',
                    color: '#ffffff',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: phoneVerified ? 'default' : 'pointer',
                    marginBottom: '1rem',
                  }}
                >
                  {phoneVerified ? 'Phone Verified ✓' : 'Verify Phone & Complete ➔'}
                </button>

                <div style={{ textAlign: 'center', fontSize: '0.85rem', color: '#64748b' }}>
                  Didn't receive SMS?{' '}
                  <button
                    type="button"
                    onClick={handleResendPhone}
                    disabled={cooldown > 0}
                    style={{ background: 'none', border: 'none', color: cooldown > 0 ? '#94a3b8' : '#0074e4', fontWeight: 700, cursor: cooldown > 0 ? 'default' : 'pointer', textDecoration: 'underline' }}
                  >
                    {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend OTP'}
                  </button>
                </div>
              </form>
            )}
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
          <Link to="/" style={{ color: 'var(--gray-600)', fontWeight: 600, fontSize: '0.85rem', textDecoration: 'none' }}>
            ← Back to Home Page
          </Link>
        </div>
      </div>
    </div>
  )
}
