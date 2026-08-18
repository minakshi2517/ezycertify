import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { api } from '../lib/api'

export default function MyCoursesPage() {
  const { user, loadingAuth } = useApp()
  const navigate = useNavigate()

  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!loadingAuth && !user) {
      navigate('/login', { state: { from: { pathname: '/my-courses' } } })
      return
    }

    if (user) {
      fetchEnrollments()
    }
  }, [user, loadingAuth, navigate])

  const fetchEnrollments = async () => {
    try {
      setLoading(true)
      const res = await api.courses.getMyEnrollments()
      setEnrollments(res.enrollments || [])
    } catch (err) {
      setError(err.message || 'Could not load your course enrollments.')
    } finally {
      setLoading(false)
    }
  }

  const handlePrintReceipt = (e) => {
    const paidAt = e.purchased_at ? new Date(e.purchased_at).toLocaleString() : new Date().toLocaleString()
    const html = `<!DOCTYPE html>
<html>
<head>
  <title>Ezycertify Receipt ${e.id}</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 32px; color: #0f172a; }
    h1 { color: #0f2b5c; margin-bottom: 4px; }
    .muted { color: #64748b; }
    table { width: 100%; border-collapse: collapse; margin-top: 24px; }
    td { padding: 10px 0; border-bottom: 1px solid #e2e8f0; }
    .ok { color: #15803d; font-weight: 700; }
  </style>
</head>
<body>
  <h1>Ezycertify</h1>
  <p class="muted">Official Fee Receipt & Student Enrollment Voucher</p>
  <p class="ok">PAYMENT STATUS: PAID & ENROLLED</p>
  <table>
    <tr><td>Receipt ID</td><td><strong>${e.id}</strong></td></tr>
    <tr><td>Payment ID</td><td>${e.payment_id || 'RZP-VERIFIED'}</td></tr>
    <tr><td>Order ID</td><td>${e.order_id || 'N/A'}</td></tr>
    <tr><td>Course</td><td><strong>${e.course_title || e.course_id}</strong></td></tr>
    <tr><td>Batch</td><td>${e.batch || 'Live Virtual Cohort'}</td></tr>
    <tr><td>Student Name</td><td>${e.student_name || user?.name}</td></tr>
    <tr><td>Student Email</td><td>${e.student_email || user?.email}</td></tr>
    <tr><td>Amount Paid</td><td><strong>${e.currency} ${e.amount}</strong></td></tr>
    <tr><td>Purchase Date</td><td>${paidAt}</td></tr>
    <tr><td>Access Status</td><td class="ok">Granted & Verified</td></tr>
  </table>
  <p class="muted" style="margin-top:24px">Processed securely via Razorpay. Ezycertify does not store card or UPI credentials.</p>
  <script>window.onload = function () { window.print(); }</script>
</body>
</html>`
    const win = window.open('', '_blank')
    if (win) {
      win.document.write(html)
      win.document.close()
    }
  }

  if (loadingAuth || (loading && !enrollments.length)) {
    return (
      <div style={{ paddingTop: 'calc(var(--header-h) + 4rem)', textAlign: 'center', minHeight: '60vh' }}>
        <div className="pay-spinner" style={{ margin: '0 auto 1.5rem' }} />
        <h2 style={{ fontSize: '1.25rem', color: 'var(--navy)' }}>Loading your dashboard...</h2>
      </div>
    )
  }

  return (
    <div style={{ paddingTop: 'calc(var(--header-h) + 2rem)', paddingBottom: '5rem', minHeight: '100vh', background: '#f8fafc' }}>
      <div className="container">
        {/* User Profile Header Card */}
        <div
          style={{
            background: 'linear-gradient(135deg, #0f2b5c 0%, #1e3a8a 100%)',
            color: '#ffffff',
            padding: '2.5rem',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(15, 43, 92, 0.15)',
            marginBottom: '3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div
              style={{
                width: '68px',
                height: '68px',
                borderRadius: '50%',
                background: '#0074e4',
                color: '#ffffff',
                fontSize: '1.8rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '3px solid rgba(255,255,255,0.3)',
              }}
            >
              {user?.name?.[0]?.toUpperCase() || 'S'}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 850, margin: 0 }}>{user?.name}</h1>
                <span style={{ background: '#22c55e', color: '#fff', fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '20px' }}>
                  Active Student
                </span>
                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    style={{ background: '#f59e0b', color: '#000', fontSize: '0.75rem', fontWeight: 800, padding: '0.2rem 0.6rem', borderRadius: '20px', textDecoration: 'none' }}
                  >
                    Admin Portal ➔
                  </Link>
                )}
              </div>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem', margin: '0.35rem 0 0' }}>
                {user?.email} · {user?.phone}
              </p>
            </div>
          </div>

          <Link to="/courses" className="btn btn-red">
            + Explore More Courses
          </Link>
        </div>

        {/* Section Heading */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>
              My Enrolled Certification Programs
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.88rem', margin: '0.25rem 0 0' }}>
              Access your active cohorts, curriculum, and official receipts.
            </p>
          </div>
          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0074e4' }}>
            {enrollments.length} Programs Enrolled
          </span>
        </div>

        {error && (
          <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
            {error}
          </div>
        )}

        {/* Enrollments Grid */}
        {enrollments.length === 0 ? (
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '4rem 2rem',
              textAlign: 'center',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎓</div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              No Active Enrollments Yet
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto 1.75rem' }}>
              You haven't enrolled in any certification programs yet. Browse our accredited catalog of PMP, Scrum, SAFe, and Cloud certifications.
            </p>
            <Link to="/courses" className="btn btn-blue">
              Browse Certification Catalog
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
            {enrollments.map((en) => (
              <div
                key={en.id}
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  padding: '1.75rem',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <span
                      style={{
                        background: 'rgba(0, 116, 228, 0.1)',
                        color: '#0074e4',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                      }}
                    >
                      {en.course_badge || 'Accredited'}
                    </span>
                    <span style={{ color: '#16a34a', fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a', display: 'inline-block' }} />
                      {en.access_status === 'granted' ? 'Access Active' : 'Access Suspended'}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                    {en.course_title || en.course_id}
                  </h3>

                  <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px', fontSize: '0.82rem', color: '#475569', marginBottom: '1.25rem' }}>
                    <div><strong>Batch:</strong> {en.batch || 'Upcoming Cohort'}</div>
                    <div style={{ marginTop: '0.25rem' }}><strong>Receipt ID:</strong> {en.id}</div>
                    <div style={{ marginTop: '0.25rem' }}><strong>Enrolled On:</strong> {new Date(en.purchased_at).toLocaleDateString()}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => handlePrintReceipt(en)}
                    className="btn btn-outline-navy btn-sm"
                    style={{ flex: 1 }}
                  >
                    📄 Fee Receipt
                  </button>
                  {en.course_slug ? (
                    <Link
                      to={`/courses/${en.course_slug}`}
                      className="btn btn-blue btn-sm"
                      style={{ flex: 1, textAlign: 'center' }}
                    >
                      Course Portal →
                    </Link>
                  ) : (
                    <Link
                      to="/verify"
                      className="btn btn-blue btn-sm"
                      style={{ flex: 1, textAlign: 'center' }}
                    >
                      Verify Badge →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
