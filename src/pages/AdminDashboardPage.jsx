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

  // Add Course Modal State
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false)
  const [addingCourse, setAddingCourse] = useState(false)
  const [newCourse, setNewCourse] = useState({
    title: '',
    short_title: '',
    provider_id: 'Ezycertify',
    category: 'Project Management',
    price_usd: '499',
    duration: '35 Hours',
    description: '',
    badge: 'Popular'
  })

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

  const handleCreateCourse = async (e) => {
    e.preventDefault()
    if (!newCourse.title.trim()) {
      alert('Course title is required.')
      return
    }

    setAddingCourse(true)
    setError('')
    setActionSuccess('')
    try {
      const res = await api.admin.createCourse(newCourse)
      if (res.success) {
        setActionSuccess(`Course "${newCourse.title}" created successfully!`)
        setIsAddCourseModalOpen(false)
        setNewCourse({
          title: '',
          short_title: '',
          provider_id: 'Ezycertify',
          category: 'Project Management',
          price_usd: '499',
          duration: '35 Hours',
          description: '',
          badge: 'Popular'
        })
        loadAllAdminData()
      }
    } catch (err) {
      alert(err.message || 'Failed to create course.')
    } finally {
      setAddingCourse(false)
    }
  }

  const handleDeleteCourse = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete course "${title}"?`)) {
      return
    }

    setActionSuccess('')
    try {
      await api.admin.deleteCourse(id)
      setActionSuccess(`Course "${title}" deleted successfully.`)
      setCoursesList((prev) => prev.filter((c) => c.id !== id))
    } catch (err) {
      alert(err.message || 'Failed to delete course.')
    }
  }

  if (loadingAuth || (loading && !stats)) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', border: '4px solid #e2e8f0', borderTopColor: '#0074e4', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }} />
          <p style={{ fontWeight: 700, color: 'var(--navy)' }}>Loading Operations Dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#f8fafc', minHeight: '90vh', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Top Header Card */}
        <div style={{ background: '#0f2b5c', color: '#ffffff', padding: '2rem', borderRadius: '20px', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', boxShadow: '0 10px 25px rgba(15, 43, 92, 0.15)' }}>
          <div>
            <div style={{ display: 'inline-block', background: 'rgba(239, 68, 68, 0.2)', color: '#f87171', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
              Admin Control Center
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 900, margin: 0, letterSpacing: '-0.5px' }}>Executive Administrator Dashboard</h1>
            <p style={{ color: '#94a3b8', margin: '0.35rem 0 0', fontSize: '0.95rem' }}>Full platform governance, payments auditing, course catalog management & role-based access.</p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={loadAllAdminData}
              style={{ background: 'rgba(255,255,255,0.1)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)', padding: '0.6rem 1.2rem', borderRadius: '10px', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              🔄 Refresh Data
            </button>
            <Link
              to="/my-courses"
              style={{ background: '#0074e4', color: '#ffffff', padding: '0.6rem 1.2rem', borderRadius: '10px', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              My Student View
            </Link>
          </div>
        </div>

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #f87171', color: '#991b1b', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem', fontWeight: 600 }}>
            ⚠️ {error}
          </div>
        )}

        {actionSuccess && (
          <div style={{ background: '#f0fdf4', border: '1px solid #4ade80', color: '#166534', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem', fontWeight: 700 }}>
            ✅ {actionSuccess}
          </div>
        )}

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
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
                padding: '0.75rem 1.25rem',
                borderRadius: '10px',
                fontWeight: 800,
                fontSize: '0.9rem',
                border: 'none',
                cursor: 'pointer',
                background: activeTab === tab.id ? '#0f2b5c' : '#ffffff',
                color: activeTab === tab.id ? '#ffffff' : '#64748b',
                boxShadow: activeTab === tab.id ? '0 4px 12px rgba(15, 43, 92, 0.2)' : '0 2px 4px rgba(0,0,0,0.02)',
                border: activeTab === tab.id ? 'none' : '1px solid #e2e8f0',
                transition: 'all 0.2s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW METRICS */}
        {activeTab === 'overview' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
              {/* Users Stat */}
              <div style={{ background: '#ffffff', padding: '1.75rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                <div style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>Total Registered Users</div>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--navy)', margin: '0.5rem 0' }}>{stats.users.total}</div>
                <div style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 700 }}>
                  ✓ {stats.users.verified} Verified &nbsp;•&nbsp; ⏳ {stats.users.unverified} Pending
                </div>
              </div>

              {/* Courses Stat */}
              <div style={{ background: '#ffffff', padding: '1.75rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                <div style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>Accredited Catalog</div>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0074e4', margin: '0.5rem 0' }}>{coursesList.length || stats.courses.total}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Active Certification Programs</div>
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
                <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#dc2626', margin: '0.5rem 0' }}>{stats.enrollments.total}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Learners with Granted Access</div>
              </div>
            </div>

            {/* Quick Summary Tables */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
              <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '1rem' }}>Recent Student Enrollments</h3>
                {enrollmentsList.slice(0, 5).map((e) => (
                  <div key={e.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid #f1f5f9' }}>
                    <div>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>{e.student_name}</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{e.course_title || e.course_id}</div>
                    </div>
                    <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', background: e.access_status === 'granted' ? '#dcfce7' : '#fee2e2', color: e.access_status === 'granted' ? '#15803d' : '#b91c1c', fontWeight: 700 }}>
                      {e.access_status}
                    </span>
                  </div>
                ))}
                {enrollmentsList.length === 0 && <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>No student enrollments yet.</p>}
              </div>

              <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '1rem' }}>Recent Payment Transactions</h3>
                {paymentsList.slice(0, 5).map((p) => (
                  <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid #f1f5f9' }}>
                    <div>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>{p.user_name || 'Guest Buyer'}</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{p.currency} {p.amount} • {p.course_title || p.course_id}</div>
                    </div>
                    <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', background: p.status === 'captured' ? '#dcfce7' : '#fef3c7', color: p.status === 'captured' ? '#15803d' : '#b45309', fontWeight: 700 }}>
                      {p.status}
                    </span>
                  </div>
                ))}
                {paymentsList.length === 0 && <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>No payment records recorded.</p>}
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
                    <th style={{ padding: '1rem' }}>Contact Info</th>
                    <th style={{ padding: '1rem' }}>Verification Status</th>
                    <th style={{ padding: '1rem' }}>Role</th>
                    <th style={{ padding: '1rem' }}>Joined Date</th>
                    <th style={{ padding: '1rem' }}>Last Login</th>
                  </tr>
                </thead>
                <tbody>
                  {usersList.map((u) => (
                    <tr key={u.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>{u.name}</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>ID: {u.id}</div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div>{u.email}</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{u.phone || 'No phone'}</div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                          <span style={{ background: u.email_verified ? '#dcfce7' : '#fee2e2', color: u.email_verified ? '#15803d' : '#b91c1c', padding: '0.15rem 0.4rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
                            {u.email_verified ? '✉ Verified' : '✉ Unverified'}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ background: u.role === 'admin' ? '#fee2e2' : '#eff6ff', color: u.role === 'admin' ? '#b91c1c' : '#1d4ed8', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase' }}>
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

        {/* TAB 3: COURSES TABLE WITH ADD COURSE BUTTON & ACTIONS */}
        {activeTab === 'courses' && (
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--navy)', margin: 0 }}>Courses Roster & Catalog Management</h3>
                <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{coursesList.length} Courses Catalogued</span>
              </div>
              <button
                onClick={() => setIsAddCourseModalOpen(true)}
                style={{
                  background: '#0074e4',
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.65rem 1.35rem',
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 12px rgba(0, 116, 228, 0.25)',
                }}
              >
                ➕ Add New Course
              </button>
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
                    <th style={{ padding: '1rem' }}>Enrolled</th>
                    <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {coursesList.map((c) => (
                    <tr key={c.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>{c.title}</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>ID: {c.id}</div>
                      </td>
                      <td style={{ padding: '1rem', textTransform: 'uppercase', fontWeight: 700, color: '#0074e4' }}>{c.provider_id || c.provider}</td>
                      <td style={{ padding: '1rem', color: '#475569' }}>{c.category}</td>
                      <td style={{ padding: '1rem', fontWeight: 700 }}>${c.price_usd || c.price}</td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ background: '#dcfce7', color: '#15803d', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 700, fontSize: '0.75rem' }}>
                          Active
                        </span>
                      </td>
                      <td style={{ padding: '1rem', fontWeight: 800, color: 'var(--navy)' }}>
                        {c.enrolled_students || 0} Students
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <button
                          onClick={() => handleDeleteCourse(c.id, c.title)}
                          style={{
                            background: '#fee2e2',
                            color: '#b91c1c',
                            border: '1px solid #fca5a5',
                            padding: '0.35rem 0.75rem',
                            borderRadius: '6px',
                            fontWeight: 700,
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                          }}
                        >
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {coursesList.length === 0 && (
                    <tr>
                      <td colSpan="7" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
                        No courses found. Click "+ Add New Course" above to create one!
                      </td>
                    </tr>
                  )}
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
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0.25rem 0 0' }}>Mapping: User ➔ Course ➔ Payment Status ➔ Access Status</p>
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
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{e.student_email} • {e.student_phone}</div>
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

      {/* ADD COURSE MODAL POPUP */}
      {isAddCourseModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div style={{ background: '#ffffff', borderRadius: '20px', maxWidth: '560px', width: '100%', padding: '2rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0f2b5c', margin: 0 }}>➕ Add New Certification Course</h2>
              <button
                onClick={() => setIsAddCourseModalOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#94a3b8' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCourse} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>Course Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Certified Generative AI Practitioner"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.95rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>Category</label>
                  <input
                    type="text"
                    placeholder="e.g. Cloud / AI / Cyber"
                    value={newCourse.category}
                    onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.95rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>Price (USD $)</label>
                  <input
                    type="number"
                    required
                    placeholder="499"
                    value={newCourse.price_usd}
                    onChange={(e) => setNewCourse({ ...newCourse, price_usd: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.95rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>Provider</label>
                  <input
                    type="text"
                    placeholder="e.g. Ezycertify / AWS"
                    value={newCourse.provider_id}
                    onChange={(e) => setNewCourse({ ...newCourse, provider_id: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.95rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 35 Hours"
                    value={newCourse.duration}
                    onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.95rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>Short Description</label>
                <textarea
                  rows="3"
                  placeholder="Comprehensive professional certification training with live projects."
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.95rem', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setIsAddCourseModalOpen(false)}
                  style={{ padding: '0.75rem 1.25rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#ffffff', color: '#475569', fontWeight: 700, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addingCourse}
                  style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', background: '#0074e4', color: '#ffffff', fontWeight: 800, cursor: addingCourse ? 'not-allowed' : 'pointer', boxShadow: '0 4px 12px rgba(0,116,228,0.25)' }}
                >
                  {addingCourse ? 'Saving Course...' : 'Save & Publish Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
