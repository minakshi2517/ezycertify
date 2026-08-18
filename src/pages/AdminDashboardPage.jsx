import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { api } from '../lib/api'

export default function AdminDashboardPage() {
  const { user, loadingAuth } = useApp()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState('overview') // 'overview' | 'users' | 'courses' | 'payments' | 'enrollments'
  const [stats, setStats] = useState(null)
  const [usersList, setUsersList] = useState([])
  const [coursesList, setCoursesList] = useState([])
  const [paymentsList, setPaymentsList] = useState([])
  const [enrollmentsList, setEnrollmentsList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionSuccess, setActionSuccess] = useState('')

  useEffect(() => {
    if (!loadingAuth && (!user || user.role !== 'admin')) {
      navigate('/login', { state: { from: { pathname: '/admin' } } })
      return
    }

    if (user && user.role === 'admin') {
      loadAllAdminData()
    }
  }, [user, loadingAuth, navigate])

  const loadAllAdminData = async () => {
    setLoading(true)
    setError('')
    try {
      const [ovRes, uRes, cRes, pRes, eRes] = await Promise.all([
        api.admin.getOverview(),
        api.admin.getUsers(),
        api.admin.getCourses(),
        api.admin.getPayments(),
        api.admin.getEnrollments(),
      ])

      setStats(ovRes.stats)
      setUsersList(uRes.users || [])
      setCoursesList(cRes.courses || [])
      setPaymentsList(pRes.payments || [])
      setEnrollmentsList(eRes.enrollments || [])
    } catch (err) {
      setError(err.message || 'Could not load administrator data.')
    } finally {
      setLoading(false)
    }
  }

  const handleToggleAccess = async (enrollmentId, currentStatus) => {
    const newStatus = currentStatus === 'granted' ? 'revoked' : 'granted'
    setActionSuccess('')
    try {
      await api.admin.updateAccess(enrollmentId, newStatus)
      setEnrollmentsList((prev) =>
        prev.map((item) => (item.id === enrollmentId ? { ...item, access_status: newStatus } : item))
      )
      setActionSuccess(`Enrollment ${enrollmentId} access status updated to ${newStatus}.`)
    } catch (err) {
      setError(err.message || 'Failed to update access status.')
    }
  }

  if (loadingAuth || (loading && !stats)) {
    return (
      <div style={{ paddingTop: 'calc(var(--header-h) + 4rem)', textAlign: 'center', minHeight: '60vh' }}>
        <div className="pay-spinner" style={{ margin: '0 auto 1.5rem' }} />
        <h2 style={{ fontSize: '1.25rem', color: 'var(--navy)' }}>Loading Administrator Portal...</h2>
      </div>
    )
  }

  return (
    <div style={{ paddingTop: 'calc(var(--header-h) + 1.5rem)', paddingBottom: '5rem', minHeight: '100vh', background: '#f8fafc' }}>
      <div className="container">
        
        {/* Top Header Bar */}
        <div
          style={{
            background: 'linear-gradient(135deg, #0b1329 0%, #1e293b 100%)',
            color: '#ffffff',
            padding: '2rem 2.5rem',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(15, 23, 42, 0.15)',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem' }}>
              <span style={{ background: '#ef4444', color: '#fff', fontSize: '0.75rem', fontWeight: 800, padding: '0.2rem 0.6rem', borderRadius: '20px' }}>
                ADMIN CONTROL CENTER
              </span>
              <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Ezycertify Operations</span>
            </div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 850, margin: 0 }}>Executive Administrator Dashboard</h1>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={loadAllAdminData} className="btn btn-outline-navy btn-sm" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
              🔄 Refresh Data
            </button>
            <Link to="/my-courses" className="btn btn-blue btn-sm">
              My Student View
            </Link>
          </div>
        </div>

        {error && (
          <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
            {error}
          </div>
        )}

        {actionSuccess && (
          <div style={{ background: '#dcfce7', color: '#15803d', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
            {actionSuccess}
          </div>
        )}

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap', background: '#ffffff', padding: '0.5rem', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          {[
            { id: 'overview', label: '📊 System Overview' },
            { id: 'users', label: `👥 Users (${usersList.length})` },
            { id: 'courses', label: `🎓 Courses (${coursesList.length})` },
            { id: 'payments', label: `💳 Payments (${paymentsList.length})` },
            { id: 'enrollments', label: `📑 Enrollments (${enrollmentsList.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.65rem 1.25rem',
                borderRadius: '10px',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                background: activeTab === tab.id ? '#0f2b5c' : 'transparent',
                color: activeTab === tab.id ? '#ffffff' : '#475569',
                transition: 'all 0.2s ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW METRICS */}
        {activeTab === 'overview' && stats && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
              
              {/* Users Stat */}
              <div style={{ background: '#ffffff', padding: '1.75rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                <div style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>Total Registered Users</div>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--navy)', margin: '0.5rem 0' }}>{stats.users.total}</div>
                <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.8rem' }}>
                  <span style={{ color: '#16a34a', fontWeight: 700 }}>✓ {stats.users.verified} Verified</span>
                  <span style={{ color: '#eab308', fontWeight: 700 }}>⏳ {stats.users.unverified} Pending</span>
                </div>
              </div>

              {/* Courses Stat */}
              <div style={{ background: '#ffffff', padding: '1.75rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                <div style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>Accredited Catalog</div>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0074e4', margin: '0.5rem 0' }}>{stats.courses.total}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Active Certification Programs</div>
              </div>

              {/* Revenue Stat */}
              <div style={{ background: '#ffffff', padding: '1.75rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                <div style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>Gross Processed Revenue</div>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#16a34a', margin: '0.5rem 0' }}>
                  ₹{(stats.payments.totalRevenue || 0).toLocaleString('en-IN')}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 700 }}>
                  {stats.payments.captured} Successful Transactions
                </div>
              </div>

              {/* Enrollments Stat */}
              <div style={{ background: '#ffffff', padding: '1.75rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                <div style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>Active Student Enrollments</div>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--red)', margin: '0.5rem 0' }}>{stats.enrollments.total}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Learners with Granted Access</div>
              </div>

            </div>

            {/* Quick Summary Tables Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2rem' }}>
              {/* Recent Enrollments */}
              <div style={{ background: '#ffffff', padding: '1.75rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '1rem' }}>
                  Recent Student Enrollments
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {enrollmentsList.slice(0, 5).map((en) => (
                    <div key={en.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: '#f8fafc', borderRadius: '8px' }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>{en.student_name}</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{en.course_title || en.course_id}</div>
                      </div>
                      <span style={{ background: '#dcfce7', color: '#15803d', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.6rem', borderRadius: '20px' }}>
                        {en.access_status === 'granted' ? 'Paid & Active' : 'Revoked'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Payments */}
              <div style={{ background: '#ffffff', padding: '1.75rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '1rem' }}>
                  Recent Payment Transactions
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {paymentsList.slice(0, 5).map((p) => (
                    <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: '#f8fafc', borderRadius: '8px' }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>{p.currency} {p.amount}</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{p.razorpay_order_id}</div>
                      </div>
                      <span
                        style={{
                          background: p.status === 'captured' ? '#dcfce7' : '#fee2e2',
                          color: p.status === 'captured' ? '#15803d' : '#b91c1c',
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          padding: '0.25rem 0.6rem',
                          borderRadius: '20px',
                          textTransform: 'uppercase',
                        }}
                      >
                        {p.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: USERS TABLE */}
        {activeTab === 'users' && (
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>Registered User Directory</h3>
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{usersList.length} Total Users</span>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                    <th style={{ padding: '1rem' }}>User</th>
                    <th style={{ padding: '1rem' }}>Phone</th>
                    <th style={{ padding: '1rem' }}>Email Status</th>
                    <th style={{ padding: '1rem' }}>Phone Status</th>
                    <th style={{ padding: '1rem' }}>Role</th>
                    <th style={{ padding: '1rem' }}>Registered Date</th>
                    <th style={{ padding: '1rem' }}>Last Login</th>
                  </tr>
                </thead>
                <tbody>
                  {usersList.map((u) => (
                    <tr key={u.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>{u.name}</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{u.email}</div>
                      </td>
                      <td style={{ padding: '1rem', color: '#475569' }}>{u.phone}</td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ color: u.email_verified ? '#16a34a' : '#eab308', fontWeight: 700 }}>
                          {u.email_verified ? '✓ Verified' : '⏳ Pending'}
                        </span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ color: u.phone_verified ? '#16a34a' : '#eab308', fontWeight: 700 }}>
                          {u.phone_verified ? '✓ Verified' : '⏳ Pending'}
                        </span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ background: u.role === 'admin' ? '#fee2e2' : '#f1f5f9', color: u.role === 'admin' ? '#b91c1c' : '#334155', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase' }}>
                          {u.role}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', color: '#64748b' }}>{new Date(u.created_at).toLocaleDateString()}</td>
                      <td style={{ padding: '1rem', color: '#64748b' }}>{u.last_login ? new Date(u.last_login).toLocaleString() : 'Never'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: COURSES TABLE */}
        {activeTab === 'courses' && (
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>Courses Roster & Enrollment Count</h3>
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{coursesList.length} Courses Catalogued</span>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                    <th style={{ padding: '1rem' }}>Course Title</th>
                    <th style={{ padding: '1rem' }}>Provider</th>
                    <th style={{ padding: '1rem' }}>Category</th>
                    <th style={{ padding: '1rem' }}>Price (USD)</th>
                    <th style={{ padding: '1rem' }}>Status</th>
                    <th style={{ padding: '1rem', textAlign: 'right' }}>Enrolled Students</th>
                  </tr>
                </thead>
                <tbody>
                  {coursesList.map((c) => (
                    <tr key={c.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>{c.title}</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>ID: {c.id}</div>
                      </td>
                      <td style={{ padding: '1rem', textTransform: 'uppercase', fontWeight: 700, color: '#0074e4' }}>{c.provider_id}</td>
                      <td style={{ padding: '1rem', color: '#475569' }}>{c.category}</td>
                      <td style={{ padding: '1rem', fontWeight: 700 }}>${c.price_usd}</td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ background: '#dcfce7', color: '#15803d', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 700, fontSize: '0.75rem' }}>
                          Active
                        </span>
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 800, color: 'var(--navy)' }}>
                        {c.enrolled_students} Students
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: PAYMENTS TABLE */}
        {activeTab === 'payments' && (
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>Payment Transactions Ledger</h3>
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{paymentsList.length} Records</span>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                    <th style={{ padding: '1rem' }}>Date/Time</th>
                    <th style={{ padding: '1rem' }}>User / Buyer</th>
                    <th style={{ padding: '1rem' }}>Course</th>
                    <th style={{ padding: '1rem' }}>Amount</th>
                    <th style={{ padding: '1rem' }}>Razorpay Order ID</th>
                    <th style={{ padding: '1rem' }}>Payment ID</th>
                    <th style={{ padding: '1rem' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentsList.map((p) => (
                    <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '1rem', color: '#64748b' }}>{new Date(p.created_at).toLocaleString()}</td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>{p.user_name || 'Guest Student'}</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{p.user_email || 'Direct Checkout'}</div>
                      </td>
                      <td style={{ padding: '1rem', color: '#475569' }}>{p.course_title || p.course_id}</td>
                      <td style={{ padding: '1rem', fontWeight: 800, color: '#0f172a' }}>{p.currency} {p.amount}</td>
                      <td style={{ padding: '1rem', fontSize: '0.8rem', fontFamily: 'monospace', color: '#0074e4' }}>{p.razorpay_order_id}</td>
                      <td style={{ padding: '1rem', fontSize: '0.8rem', fontFamily: 'monospace', color: '#64748b' }}>{p.razorpay_payment_id || 'Pending'}</td>
                      <td style={{ padding: '1rem' }}>
                        <span
                          style={{
                            background: p.status === 'captured' ? '#dcfce7' : p.status === 'failed' ? '#fee2e2' : '#fef3c7',
                            color: p.status === 'captured' ? '#15803d' : p.status === 'failed' ? '#b91c1c' : '#b45309',
                            padding: '0.25rem 0.6rem',
                            borderRadius: '20px',
                            fontWeight: 800,
                            fontSize: '0.75rem',
                            textTransform: 'uppercase',
                          }}
                        >
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: ENROLLMENTS TABLE */}
        {activeTab === 'enrollments' && (
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>Enrollment & Course Access Management</h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0.25rem 0 0' }}>Mapping: User → Course → Payment Status → Access Status</p>
              </div>
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{enrollmentsList.length} Total Records</span>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                    <th style={{ padding: '1rem' }}>Student / User</th>
                    <th style={{ padding: '1rem' }}>Enrolled Course</th>
                    <th style={{ padding: '1rem' }}>Receipt / Order ID</th>
                    <th style={{ padding: '1rem' }}>Payment Status</th>
                    <th style={{ padding: '1rem' }}>Access Status</th>
                    <th style={{ padding: '1rem', textAlign: 'right' }}>Access Control</th>
                  </tr>
                </thead>
                <tbody>
                  {enrollmentsList.map((e) => (
                    <tr key={e.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>{e.student_name}</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{e.student_email} · {e.student_phone}</div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: 700, color: '#0074e4' }}>{e.course_title || e.course_id}</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Batch: {e.batch}</div>
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.8rem', fontFamily: 'monospace', color: '#475569' }}>
                        <div>{e.id}</div>
                        <div style={{ color: '#94a3b8' }}>{e.order_id}</div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ background: '#dcfce7', color: '#15803d', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase' }}>
                          {e.payment_status}
                        </span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span
                          style={{
                            background: e.access_status === 'granted' ? '#dcfce7' : '#fee2e2',
                            color: e.access_status === 'granted' ? '#15803d' : '#b91c1c',
                            padding: '0.25rem 0.6rem',
                            borderRadius: '20px',
                            fontWeight: 800,
                            fontSize: '0.75rem',
                          }}
                        >
                          {e.access_status === 'granted' ? '✓ Access Granted' : '✕ Revoked'}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <button
                          onClick={() => handleToggleAccess(e.id, e.access_status)}
                          style={{
                            padding: '0.35rem 0.75rem',
                            borderRadius: '6px',
                            border: '1px solid #cbd5e1',
                            background: e.access_status === 'granted' ? '#fee2e2' : '#dcfce7',
                            color: e.access_status === 'granted' ? '#b91c1c' : '#15803d',
                            fontWeight: 700,
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                          }}
                        >
                          {e.access_status === 'granted' ? 'Revoke Access' : 'Grant Access'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
