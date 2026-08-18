import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { courses, partnerLogos } from '../data/siteData'
import PaymentModal from './PaymentModal'

export function CourseCard({ course, onEnroll }) {
  const { t, tr } = useApp()

  const handleImageError = (e) => {
    e.target.onerror = null
    if (course.id === 'csm') e.target.src = '/courses/csm.svg'
    else if (course.id === 'safe-agilist') e.target.src = '/courses/safe.svg'
    else if (course.id === 'cspo') e.target.src = '/courses/cspo.svg'
    else if (course.id === 'pmi-acp') e.target.src = '/courses/pmi-acp.svg'
    else if (course.id === 'pmi-pba') e.target.src = '/courses/pmi-pba.svg'
    else if (course.id === 'pgmp') e.target.src = '/courses/pgmp.svg'
    else if (course.id === 'itil4') e.target.src = '/courses/itil.svg'
    else if (course.id === 'aws-sa') e.target.src = '/courses/aws.svg'
    else e.target.src = '/courses/pmp.svg'
  }

  return (
    <div className="course-card">
      <div className="course-card-img">
        <img
          src={course.image}
          alt={course.title}
          loading="lazy"
          onError={handleImageError}
        />
        <span className="course-card-badge">{course.badge}</span>
      </div>
      <div className="course-card-body">
        <h3 className="course-card-title">{tr(course.title) || course.shortTitle}</h3>
        <p className="course-card-desc">{course.description}</p>
        <div className="course-card-meta" style={{ alignItems: 'center' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0074e4', display: 'inline-flex', alignItems: 'center', gap: '0.45rem', background: '#eff6ff', padding: '0.35rem 0.85rem', borderRadius: '20px', border: '1px solid #bfdbfe' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0074e4" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>{course.duration || 'Live Virtual Cohort'}</span>
          </span>
          <Link to={`/courses/${course.slug}`} className="btn btn-blue btn-sm">
            {t.courses?.viewDetails || 'View Details'}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function CoursesSection({ limit = 8 }) {
  const { t } = useApp()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProvider, setSelectedProvider] = useState('all')
  const [selectedCourse, setSelectedCourse] = useState(null)

  const filterTabs = [
    { id: 'all', label: 'All Bodies (64)' },
    ...partnerLogos.map((p) => ({
      id: p.id,
      label: `${p.name} (8)`
    }))
  ]

  const filteredCourses = courses.filter((c) => {
    const matchesProvider = selectedProvider === 'all' || c.providerId === selectedProvider
    const q = searchQuery.toLowerCase().trim()
    const matchesSearch =
      !q ||
      c.title.toLowerCase().includes(q) ||
      c.shortTitle.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.badge.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)

    return matchesProvider && matchesSearch
  })

  // If user hasn't searched or filtered, show initial limit (8 courses)
  const isFiltered = searchQuery.trim() !== '' || selectedProvider !== 'all'
  const displayCourses = isFiltered ? filteredCourses : filteredCourses.slice(0, limit)

  return (
    <section className="section">
      <div className="container">
        <div className="courses-container-box">
          {/* Header Title Row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <span className="section-label">{t.courses?.label || 'GLOBALLY ACCREDITED CURRICULUM'}</span>
              <h2 className="section-title">{t.courses?.title || 'Popular Certification Programs'}</h2>
              <p className="section-lead">
                {t.courses?.lead || 'Accelerate your career with globally accredited training programs across 8 authorized certification bodies.'}
              </p>
            </div>
            <Link to="/courses" className="btn btn-red">
              {t.courses?.viewAll || 'VIEW ALL COURSES'}
            </Link>
          </div>

          {/* Interactive Search & Filter Controls */}
          <div style={{
            background: 'var(--white)',
            padding: '1.5rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--gray-200)',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '2.5rem'
          }}>
            {/* Search Input Field */}
            <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ position: 'absolute', left: '1.1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                className="form-input"
                placeholder="Search 64+ accredited masterclasses (e.g. PMP, CSM, SAFe, Azure, AWS, ITIL, CISM)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  paddingLeft: '3.2rem',
                  paddingRight: searchQuery ? '3rem' : '1.2rem',
                  fontSize: '0.95rem',
                  borderRadius: '30px',
                  border: '1px solid var(--gray-300)',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.03)',
                  height: '48px'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: '#e2e8f0',
                    border: 'none',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    color: '#475569',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter Pills Row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--gray-600)', marginRight: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Filter By Provider:
              </span>
              {filterTabs.map((tab) => {
                const isActive = selectedProvider === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedProvider(tab.id)}
                    style={{
                      padding: '0.45rem 0.95rem',
                      borderRadius: '20px',
                      fontSize: '0.84rem',
                      fontWeight: isActive ? 700 : 600,
                      background: isActive ? 'var(--navy)' : 'var(--gray-100)',
                      color: isActive ? '#ffffff' : 'var(--gray-700)',
                      border: isActive ? '1px solid var(--navy)' : '1px solid var(--gray-200)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: isActive ? '0 4px 12px rgba(15, 43, 92, 0.2)' : 'none'
                    }}
                  >
                    {tab.label}
                  </button>
                )
              })}
            </div>

            {/* Filter Active Indicator */}
            {isFiltered && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--gray-200)' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--navy)' }}>
                  Showing <strong>{filteredCourses.length}</strong> matching accredited masterclasses
                </span>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedProvider('all')
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--red)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Reset Search & Filters ✕
                </button>
              </div>
            )}
          </div>

          {/* Courses Grid */}
          {displayCourses.length > 0 ? (
            <div className="courses-grid">
              {displayCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onEnroll={(c) => setSelectedCourse(c)}
                />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', background: '#f8fafc', borderRadius: '16px', border: '1px border-dashed #cbd5e1' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🔍</div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.5rem' }}>
                No courses match "{searchQuery}"
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--gray-600)', marginBottom: '1.5rem' }}>
                Try searching for PMP, Scrum, SAFe, AWS, Azure, ITIL, or reset filters to see all 64 courses.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedProvider('all')
                }}
                className="btn btn-navy btn-sm"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Bottom View All Link when not filtered */}
          {!isFiltered && (
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <Link to="/courses" className="btn btn-outline-navy" style={{ padding: '0.75rem 2rem', fontWeight: 700 }}>
                Explore All 64 Accredited Certification Programs →
              </Link>
            </div>
          )}

          {/* Payment Modal */}
          {selectedCourse && (
            <PaymentModal
              course={selectedCourse}
              batch="Upcoming Weekend Live Cohort"
              onClose={() => setSelectedCourse(null)}
            />
          )}
        </div>
      </div>
    </section>
  )
}
