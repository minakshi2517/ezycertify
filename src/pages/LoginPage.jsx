import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function LoginPage() {
  const { signIn } = useApp()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email && password) {
      signIn(email, password)
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
        maxWidth: '450px',
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
            Student & Learner Login
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
            Access your personalized learning portal & practice mock exams
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              className="form-input"
              required
              placeholder="you@example.com"
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
            Login to Dashboard
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--gray-600)' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: 'var(--blue)', fontWeight: 700 }}>
            Sign Up Now
          </Link>
        </div>
      </div>
    </div>
  )
}
