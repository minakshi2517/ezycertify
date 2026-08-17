import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { courses, courseCategories, partnerLogos } from '../data/siteData'
import { CourseCard } from '../components/CoursesSection'
import { useApp } from '../context/AppContext'
import PaymentModal from '../components/PaymentModal'

export default function CoursesPage() {
  const { tr } = useApp()
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('popular')
  const [selectedCourse, setSelectedCourse] = useState(null)

  const filtered = useMemo(() => {
    let result = courses.filter((course) => {
      const matchesCategory = activeCategory === 'All' || course.category === activeCategory
      const q = searchTerm.toLowerCase().trim()
      const matchesSearch =
        !q ||
        course.title.toLowerCase().includes(q) ||
        course.shortTitle.toLowerCase().includes(q) ||
        course.description.toLowerCase().includes(q) ||
        course.badge.toLowerCase().includes(q)
      return matchesCategory && matchesSearch
    })

    if (sortBy === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating)
    }

    return result
  }, [activeCategory, searchTerm, sortBy])

  return (
    <div className="page-wrapper" style={{ paddingTop: 'calc(var(--header-h) + 1rem)', background: '#f8fafc', minHeight: '100vh', paddingBottom: '5rem' }}>
      
      {/* Premium Executive Hero Banner */}
      <section style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #0b1329 0%, #0f172a 50%, #1e293b 100%)',
        color: '#ffffff',
        padding: '4rem 0 4.5rem',
        overflow: 'hidden',
        boxShadow: '0 20px 50px rgba(15, 23, 42, 0.15)'
      }}>
        {/* Luminous Glow Orbs */}
        <div style={{
          position: 'absolute',
          top: '-150px',
          right: '-100px',
          width: '550px',
          height: '550px',
          background: 'radial-gradient(circle, rgba(0, 116, 228, 0.28) 0%, rgba(15, 23, 42, 0) 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-150px',
          left: '-100px',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(229, 26, 36, 0.18) 0%, rgba(15, 23, 42, 0) 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', color: '#94a3b8' }}>
              <Link to="/" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: 500 }}>Home</Link>
              <span style={{ color: '#475569' }}>›</span>
              <span style={{ color: '#60a5fa', fontWeight: 700 }}>Providers & Certification Programs</span>
            </div>
          </nav>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'center' }}>
            {/* Left Content Column */}
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.4rem 1.1rem',
                background: 'rgba(59, 130, 246, 0.15)',
                border: '1px solid rgba(96, 165, 250, 0.35)',
                borderRadius: '30px',
                fontSize: '0.82rem',
                fontWeight: 800,
                color: '#60a5fa',
                marginBottom: '1.35rem',
                textTransform: 'uppercase',
                letterSpacing: '0.06em'
              }}>
                <span style={{ fontSize: '1rem' }}>🌐</span>
                <span>GLOBAL ACCREDITED CATALOG</span>
              </div>

              <h1 style={{
                fontSize: 'clamp(2.3rem, 4.5vw, 3.4rem)',
                fontWeight: 850,
                color: '#ffffff',
                lineHeight: 1.15,
                marginBottom: '1.25rem',
                letterSpacing: '-0.02em'
              }}>
                Advance Your Career with <br className="nav-desktop" />
                <span style={{
                  background: 'linear-gradient(135deg, #60a5fa 0%, #38bdf8 50%, #93c5fd 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Globally Recognized Certifications
                </span>
              </h1>

              <p style={{
                fontSize: '1.12rem',
                color: '#cbd5e1',
                lineHeight: 1.7,
                marginBottom: '2.25rem',
                maxWidth: '680px'
              }}>
                Master PMP®, Scrum Alliance CSM®, SAFe® 6.0, AWS, Microsoft, and ITIL® with live expert-led virtual cohorts, 2,500+ practice question banks, and 100% exam application approval mentorship.
              </p>

              {/* Stat Highlights Bar */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.07)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  padding: '0.7rem 1.25rem',
                  borderRadius: '12px'
                }}>
                  <div style={{ fontSize: '1.4rem' }}>🎓</div>
                  <div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 850, color: '#ffffff', lineHeight: 1.1 }}>64+</div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>Accredited Masterclasses</div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.07)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  padding: '0.7rem 1.25rem',
                  borderRadius: '12px'
                }}>
                  <div style={{ fontSize: '1.4rem' }}>🏛️</div>
                  <div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 850, color: '#ffffff', lineHeight: 1.1 }}>8</div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>Global Bodies (PMI, SAFe)</div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.07)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  padding: '0.7rem 1.25rem',
                  borderRadius: '12px'
                }}>
                  <div style={{ fontSize: '1.4rem' }}>⭐</div>
                  <div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 850, color: '#ffffff', lineHeight: 1.1 }}>100%</div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>Application Approval</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual Card Showcase */}
            <div className="nav-desktop" style={{ position: 'relative' }}>
              <div style={{
                background: 'rgba(30, 41, 59, 0.75)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '24px',
                padding: '2rem',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#60a5fa', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    OFFICIAL AUTHORIZED PROVIDERS
                  </span>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#22c55e', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} /> Live Batches Open
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                  {partnerLogos.slice(0, 4).map((p) => (
                    <Link
                      key={p.id}
                      to={`/partners/${p.id}`}
                      style={{
                        background: '#ffffff',
                        padding: '0.85rem 1rem',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        textDecoration: 'none',
                        transition: 'transform 0.2s ease',
                      }}
                    >
                      <img src={p.logo} alt={p.name} style={{ height: '24px', width: 'auto', objectFit: 'contain' }} />
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>{p.name.split(' ')[0]}</div>
                    </Link>
                  ))}
                </div>

                <div style={{
                  background: 'rgba(15, 23, 42, 0.6)',
                  borderRadius: '12px',
                  padding: '1rem',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff' }}>First-Attempt Exam Pass Support</div>
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Live Mentorship + 2500+ Practice Exam Questions</div>
                  </div>
                  <Link to="/contact" className="btn btn-red btn-sm">
                    Inquire
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Provider Brand Logos Showcase Strip */}
      <section style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '1.75rem 0' }}>
        <div className="container">
          <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1.25rem', textAlign: 'center' }}>
            ACCREDITED CERTIFICATION PROVIDERS:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '1.25rem' }}>
            {partnerLogos.map((partner) => (
              <Link
                key={partner.id}
                to={`/partners/${partner.id}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.55rem 1.2rem',
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '30px',
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
                  transition: 'all 0.2s ease',
                }}
                className="provider-strip-pill"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  style={{ height: '24px', width: 'auto', objectFit: 'contain' }}
                  onError={(e) => { e.target.onerror = null; e.target.src = '/partners/pmi.svg'; }}
                />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>{partner.name.split(' ')[0]}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Search & Multi-Filter Controls */}
      <section style={{ marginTop: '3rem' }}>
        <div className="container">
          
          <div style={{ background: '#ffffff', padding: '2rem 2.25rem', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 8px 30px rgba(15, 23, 42, 0.06)', marginBottom: '2.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1.5rem', alignItems: 'center', marginBottom: '1.75rem' }}>
              
              {/* Mandatory Search Input */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
                  🔍 SEARCH CERTIFICATIONS:
                </label>
                <div style={{ display: 'flex', alignItems: 'center', background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '10px', padding: '0.7rem 1.1rem' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0074e4" strokeWidth="2.4" style={{ marginRight: '0.65rem' }}>
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search by course name e.g. PMP, CSM, SAFe, AZ-305..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ border: 'none', background: 'transparent', width: '100%', fontSize: '0.92rem', outline: 'none', color: '#0f172a', fontWeight: 600 }}
                  />
                  {searchTerm && (
                    <button onClick={() => setSearchTerm('')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1rem' }}>✕</button>
                  )}
                </div>
              </div>

              {/* Sort Filter Dropdown */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
                  📊 SORT COURSES BY:
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{ width: '100%', padding: '0.72rem 1rem', background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '10px', fontSize: '0.9rem', fontWeight: 600, color: '#0f172a', outline: 'none', cursor: 'pointer' }}
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated (5.0 ★)</option>
                </select>
              </div>

            </div>

            {/* Category Filter Pills */}
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.75rem' }}>
                🎯 FILTER BY DOMAIN CATEGORY:
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
                {courseCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      padding: '0.5rem 1.25rem',
                      borderRadius: '25px',
                      fontSize: '0.86rem',
                      fontWeight: 700,
                      background: activeCategory === cat ? '#0f2b5c' : '#f1f5f9',
                      color: activeCategory === cat ? '#ffffff' : '#334155',
                      border: activeCategory === cat ? '1px solid #0f2b5c' : '1px solid #cbd5e1',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: activeCategory === cat ? '0 4px 12px rgba(15, 43, 92, 0.25)' : 'none',
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Results Count Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 850, color: '#0f172a' }}>
              Showing {filtered.length} Certification Masterclasses
            </h2>
            {searchTerm && (
              <button
                onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                style={{ background: '#e2e8f0', border: 'none', padding: '0.45rem 1rem', borderRadius: '20px', fontSize: '0.84rem', fontWeight: 700, color: '#334155', cursor: 'pointer' }}
              >
                Clear Search ✕
              </button>
            )}
          </div>

          {/* Courses Grid */}
          {filtered.length === 0 ? (
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '4rem 2rem', textAlign: 'center', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔎</div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                No courses match "{searchTerm}"
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', maxWidth: '480px', margin: '0 auto 1.75rem' }}>
                Try searching for PMP, CSM, SAFe, or AWS, or click below to reset your active filters.
              </p>
              <button
                onClick={() => { setActiveCategory('All'); setSearchTerm(''); }}
                className="btn btn-blue"
              >
                Reset Search & Category Filters
              </button>
            </div>
          ) : (
            <div className="courses-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))', gap: '2rem' }}>
              {filtered.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onEnroll={(c) => setSelectedCourse(c)}
                />
              ))}
            </div>
          )}

          {/* Secure Payment Modal */}
          {selectedCourse && (
            <PaymentModal
              course={selectedCourse}
              batch="Upcoming Weekend Live Virtual Cohort"
              onClose={() => setSelectedCourse(null)}
            />
          )}

        </div>
      </section>

    </div>
  )
}
