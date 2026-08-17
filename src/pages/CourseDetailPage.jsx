import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { getCourseBySlug, formatPrice, PHONE_NUMBER, WHATSAPP_LINK } from '../data/siteData'
import PaymentModal from '../components/PaymentModal'

export default function CourseDetailPage() {
  const { slug } = useParams()
  const { currency, currencySymbol } = useApp()
  const course = getCourseBySlug(slug)

  const [showModal, setShowModal] = useState(false)
  const [enrolled, setEnrolled] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', batch: '' })

  if (!course) {
    return (
      <div style={{ paddingTop: 'calc(var(--header-h) + 4rem)', paddingBottom: '4rem', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--navy)' }}>404</h1>
          <p style={{ color: 'var(--gray-600)', marginTop: '0.5rem' }}>Course not found.</p>
          <Link to="/courses" className="btn btn-blue" style={{ marginTop: '1.5rem' }}>
            Browse All Courses
          </Link>
        </div>
      </div>
    )
  }

  const handleEnrollSubmit = (e) => {
    e.preventDefault()
    setEnrolled(true)
    setTimeout(() => {
      setEnrolled(false)
      setShowModal(false)
      setFormData({ name: '', email: '', phone: '', batch: '' })
    }, 2500)
  }

  const whatsappMsg = `Hi Ezycertify, I want to inquire about enrolling in ${course.title}. Please share batch details and fee structure.`

  return (
    <div style={{ paddingTop: 'calc(var(--header-h) + 2rem)', paddingBottom: '5rem' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ marginBottom: '1.5rem', fontSize: '0.875rem', color: 'var(--gray-600)' }}>
          <Link to="/" style={{ color: 'var(--blue)', fontWeight: 600 }}>Home</Link> /{' '}
          <Link to="/courses" style={{ color: 'var(--blue)', fontWeight: 600 }}>Courses</Link> /{' '}
          <span style={{ color: 'var(--gray-800)' }}>{course.shortTitle}</span>
        </div>

        {/* Hero Header Card */}
        <div style={{
          background: 'linear-gradient(135deg, var(--navy-dark) 0%, var(--navy) 100%)',
          color: 'var(--white)',
          borderRadius: 'var(--radius-lg)',
          padding: '3rem 2.5rem',
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr',
          gap: '2.5rem',
          alignItems: 'center',
          boxShadow: 'var(--shadow-lg)',
          marginBottom: '3rem'
        }}>
          <div>
            <span style={{
              display: 'inline-block',
              background: 'rgba(0, 116, 228, 0.2)',
              border: '1px solid rgba(0, 116, 228, 0.4)',
              color: '#60a5fa',
              padding: '0.35rem 0.9rem',
              borderRadius: '50px',
              fontSize: '0.8rem',
              fontWeight: 700,
              marginBottom: '1rem'
            }}>
              {course.badge}
            </span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '1rem' }}>
              {course.title}
            </h1>
            <p style={{ fontSize: '1rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              {course.description}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.75rem', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.9)' }}>
              <div><strong>Duration:</strong> {course.duration}</div>
              <div><strong>Rating:</strong> {course.rating} / 5.0</div>
              <div><strong>Alumni:</strong> {course.students}+ Certified</div>
            </div>
          </div>

          <div style={{
            background: 'var(--white)',
            color: 'var(--navy)',
            borderRadius: 'var(--radius)',
            padding: '2rem',
            boxShadow: 'var(--shadow-md)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--gray-600)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
              Course Fee
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--blue)', margin: '0.5rem 0' }}>
              {formatPrice(course.priceUSD, currency, currencySymbol)}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--gray-600)', marginBottom: '1.5rem' }}>Includes Exam Prep & Lifetime Support</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button className="btn btn-red" onClick={() => setShowModal(true)}>
                Enroll Now
              </button>
              <a
                href={`${WHATSAPP_LINK}?text=${encodeURIComponent(whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-navy"
              >
                Inquire on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Highlights & Skills Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <div style={{ background: 'var(--white)', padding: '2.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--gray-200)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '1.5rem' }}>
              Course Highlights
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {course.highlights.map((h, i) => (
                <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--red)', fontWeight: 800 }}>✓</span>
                  <span style={{ fontSize: '0.95rem', color: 'var(--gray-700)', lineHeight: 1.5 }}>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ background: 'var(--white)', padding: '2.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--gray-200)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '1.5rem' }}>
              Key Skills Gained
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {course.skills.map((s, i) => (
                <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--blue)', fontWeight: 800 }}>✓</span>
                  <span style={{ fontSize: '0.95rem', color: 'var(--gray-700)', lineHeight: 1.5 }}>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Upcoming Batches Table */}
        <div style={{ background: 'var(--white)', padding: '2.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--gray-200)', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '1.5rem' }}>
            Upcoming Training Batches
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--gray-200)', background: 'var(--gray-50)' }}>
                  <th style={{ padding: '1rem' }}>Date</th>
                  <th style={{ padding: '1rem' }}>Timing</th>
                  <th style={{ padding: '1rem' }}>Format</th>
                  <th style={{ padding: '1rem', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {course.upcoming.map((batch, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--gray-100)' }}>
                    <td style={{ padding: '1rem', fontWeight: 700 }}>{batch.date}</td>
                    <td style={{ padding: '1rem', color: 'var(--gray-600)' }}>{batch.time}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ background: 'var(--blue-light)', color: 'var(--blue)', padding: '0.25rem 0.6rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600 }}>
                        {batch.mode}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <button
                        className="btn btn-red btn-sm"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, batch: `${batch.date} (${batch.time})` }))
                          setShowModal(true)
                        }}
                      >
                        Book Seat
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Secure Payment Modal */}
      {showModal && (
        <PaymentModal
          course={course}
          batch={formData.batch}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}
