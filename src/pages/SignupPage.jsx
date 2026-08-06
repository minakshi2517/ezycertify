import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function SignupPage() {
  const { signIn } = useApp()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name && email && password) {
      signIn(email, password, name)
      navigate('/')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'calc(var(--header-h) + 2rem) 1rem 3rem',
      background: 'linear-gradient(135deg, var(--navy-dark) 0%, var(--navy) 100%)'
    }}>
      <div style={{
        background: 'var(--white)',
        borderRadius: 'var(--radius-lg)',
        padding: '3rem 2.5rem',
        maxWidth: '480px',
        width: '100%',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link to="/" style={{ display: 'inline-block' }}>
            <img
              src="/logo.png"
              alt="Ezycertify"
              style={{ height: '65px', width: 'auto', margin: '0 auto', mixBlendMode: 'multiply' }}
            />
          </Link>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy)', marginTop: '0.75rem' }}>
            Create Student Account
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
            Start your professional certification training today
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              className="form-input"
              required
              placeholder="e.g. Aditya Patel"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              className="form-input"
              required
              placeholder="aditya@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-input"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-red" style={{ width: '100%', marginTop: '1rem' }}>
            Register Now
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--gray-600)' }}>
          Already registered?{' '}
          <Link to="/login" style={{ color: 'var(--blue)', fontWeight: 700 }}>
            Login Here
          </Link>
        </div>
      </div>
    </div>
  )
}
