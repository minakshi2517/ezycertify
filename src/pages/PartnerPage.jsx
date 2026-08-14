import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { partnerLogos, courses } from '../data/siteData'
import { CourseCard } from '../components/CoursesSection'
import { useApp } from '../context/AppContext'

export default function PartnerPage() {
  const { providerId } = useParams()
  const { tr } = useApp()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('popular')

  // Find partner details
  const partner = useMemo(() => {
    return partnerLogos.find(
      (p) => p.id === providerId || p.name.toLowerCase().replace(/[^a-z0-9]/g, '-').includes(providerId)
    ) || {
      id: providerId,
      name: providerId ? providerId.toUpperCase() : 'Certification Provider',
      badgeText: 'Accredited Education Academy',
      desc: 'Explore top accredited certification masterclasses and training cohorts.',
      logo: '/partners/pmi.svg',
    }
  }, [providerId])

  // Filter courses for this provider
  const providerCourses = useMemo(() => {
    let result = courses.filter((c) => {
      if (!providerId) return true
      const pId = providerId.toLowerCase()
      const cProv = (c.providerId || '').toLowerCase()
      const cBadge = (c.badge || '').toLowerCase()
      const cTitle = (c.title || '').toLowerCase()

      if (pId === 'microsoft') return cProv === 'microsoft' || cBadge.includes('microsoft') || cTitle.includes('azure') || cTitle.includes('microsoft') || cTitle.includes('power bi')
      if (pId === 'aws') return cProv === 'aws' || cBadge.includes('aws') || cTitle.includes('aws') || cTitle.includes('amazon')
      if (pId === 'pmi') return cProv === 'pmi' || cBadge.includes('pmi') || cTitle.includes('pmp') || cTitle.includes('pgmp') || cTitle.includes('capm')
      if (pId === 'scrum-alliance') return cProv === 'scrum-alliance' || cBadge.includes('scrum') || cTitle.includes('csm') || cTitle.includes('cspo')
      if (pId === 'scaled-agile') return cProv === 'scaled-agile' || cBadge.includes('safe') || cTitle.includes('safe')
      if (pId === 'axelos' || pId === 'peoplecert') return cProv === 'axelos' || cBadge.includes('itil') || cTitle.includes('itil') || cTitle.includes('prince2')
      if (pId === 'isaca') return cProv === 'isaca' || cTitle.includes('cisa') || cTitle.includes('cism')
      if (pId === 'devops') return cProv === 'devops' || cTitle.includes('devops') || cTitle.includes('sre')
      return cProv === pId || cBadge.includes(pId)
    })

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.shortTitle.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.badge.toLowerCase().includes(q)
      )
    }

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter((c) => c.category === selectedCategory)
    }

    // Sorting
    if (sortBy === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating)
    } else if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => a.priceUSD - b.priceUSD)
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => b.priceUSD - a.priceUSD)
    }

    return result
  }, [providerId, searchQuery, selectedCategory, sortBy])

  return (
    <div className="page-wrapper" style={{ paddingTop: 'calc(var(--header-h) + 1.5rem)', background: '#f8fafc', minHeight: '100vh' }}>
      
      {/* Executive Hero Header Section */}
      <section style={{ position: 'relative', background: 'linear-gradient(135deg, #0b1329 0%, #1e293b 100%)', color: '#ffffff', padding: '3.75rem 0', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.05, backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          {/* Breadcrumb Navigation */}
          <nav aria-label="breadcrumb" style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', color: '#94a3b8' }}>
              <Link to="/" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: 500 }}>Home</Link>
              <span style={{ color: '#475569' }}>›</span>
              <Link to="/courses" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: 500 }}>Providers</Link>
              <span style={{ color: '#475569' }}>›</span>
              <span style={{ color: '#60a5fa', fontWeight: 700 }}>{partner.name}</span>
            </div>
          </nav>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '2.5rem' }}>
            <div style={{ flex: '1 1 580px', maxWidth: '780px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.35rem 0.9rem', background: 'rgba(59, 130, 246, 0.15)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '30px', fontSize: '0.8rem', fontWeight: 800, color: '#60a5fa', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <span>🏆</span>
                <span>{partner.badgeText || 'Accredited Certification Provider'}</span>
              </div>

              <h1 style={{ fontSize: 'clamp(2.1rem, 3.8vw, 3rem)', fontWeight: 850, color: '#ffffff', lineHeight: 1.15, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                {partner.name} Certification Masterclasses
              </h1>

              <p style={{ fontSize: '1.08rem', color: '#cbd5e1', lineHeight: 1.65, marginBottom: '1.75rem', maxWidth: '720px' }}>
                {partner.desc || `Accelerate your career with globally accredited ${partner.name} certification programs. Master official Exam Content Outlines with live expert-led virtual cohorts and 100% exam application approval mentorship.`}
              </p>

              {/* Provider Quick Stats Badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', pt: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', padding: '0.5rem 1rem', borderRadius: '10px' }}>
                  <span style={{ fontSize: '1.1rem' }}>🎓</span>
                  <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f8fafc' }}>Accredited Curriculum</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', padding: '0.5rem 1rem', borderRadius: '10px' }}>
                  <span style={{ fontSize: '1.1rem' }}>⭐</span>
                  <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f8fafc' }}>99.2% Pass Rate</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', padding: '0.5rem 1rem', borderRadius: '10px' }}>
                  <span style={{ fontSize: '1.1rem' }}>🛡️</span>
                  <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f8fafc' }}>100% Approval Mentorship</span>
                </div>
              </div>
            </div>

            {/* Provider Logo Glass Card */}
            <div style={{ flex: '0 0 auto', background: '#ffffff', padding: '2rem', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', border: '2px solid rgba(255,255,255,0.8)', textAlign: 'center', minWidth: '220px', maxWidth: '280px' }}>
              <img
                src={partner.logo}
                alt={partner.name}
                style={{ height: '56px', width: 'auto', maxWidth: '100%', objectFit: 'contain', margin: '0 auto 1rem' }}
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = '/partners/pmi.svg'
                }}
              />
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                ACCREDITED ACADEMY
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.25rem' }}>
                Official Certification Partner
              </div>
            </div>
          </div>

          {/* Provider Switcher Pills Bar */}
          <div style={{ marginTop: '3rem', paddingTop: '1.75rem', borderTop: '1px solid rgba(255,255,255,0.12)' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.85rem' }}>
              EXPLORE CERTIFICATION PROVIDERS:
            </div>
            <div style={{ display: 'flex', gap: '0.65rem', overflowX: 'auto', paddingBottom: '0.5rem', scrollbarWidth: 'thin' }}>
              {partnerLogos.map((p) => {
                const isActive = p.id === providerId || partner.id === p.id
                return (
                  <Link
                    key={p.id}
                    to={`/partners/${p.id}`}
                    style={{
                      padding: '0.45rem 1.1rem',
                      borderRadius: '30px',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      background: isActive ? '#0074e4' : 'rgba(255, 255, 255, 0.08)',
                      color: isActive ? '#ffffff' : '#cbd5e1',
                      border: isActive ? '1px solid #60a5fa' : '1px solid rgba(255, 255, 255, 0.12)',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: isActive ? '0 4px 14px rgba(0, 116, 228, 0.4)' : 'none',
                    }}
                  >
                    {p.name.split(' ')[0]}
                  </Link>
                )
              })}
            </div>
          </div>

        </div>
      </section>

      {/* Main Search & Interactive Filters Section */}
      <section style={{ padding: '3rem 0 5rem' }}>
        <div className="container">
          
          {/* Controls Bar Container */}
          <div style={{ background: '#ffffff', padding: '1.75rem 2rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 6px 24px rgba(15, 23, 42, 0.05)', marginBottom: '2.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', alignItems: 'end' }}>
              
              {/* Mandatory Search Bar */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
                  🔍 SEARCH {partner.name.toUpperCase()} COURSES:
                </label>
                <div style={{ display: 'flex', alignItems: 'center', background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '10px', padding: '0.65rem 1rem', transition: 'border-color 0.2s ease' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0074e4" strokeWidth="2.4" style={{ marginRight: '0.65rem' }}>
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    placeholder={`Search ${partner.name} courses, e.g. PMP, CSM...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ border: 'none', background: 'transparent', width: '100%', fontSize: '0.92rem', outline: 'none', color: '#0f172a', fontWeight: 500 }}
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1rem', padding: '0 0.25rem' }}>✕</button>
                  )}
                </div>
              </div>

              {/* Category Filter Dropdown */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
                  🎯 FILTER BY CATEGORY:
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{ width: '100%', padding: '0.68rem 1rem', background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '10px', fontSize: '0.9rem', fontWeight: 600, color: '#0f172a', outline: 'none', cursor: 'pointer' }}
                >
                  <option value="All">All Categories ({providerCourses.length})</option>
                  <option value="Project Management">Project Management</option>
                  <option value="Agile & Scrum">Agile & Scrum</option>
                  <option value="Scaled Agile (SAFe)">Scaled Agile (SAFe)</option>
                  <option value="Business Analysis">Business Analysis</option>
                  <option value="Cloud & ITIL">Cloud & ITIL</option>
                </select>
              </div>

              {/* Sort Dropdown */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
                  📊 SORT COURSES:
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{ width: '100%', padding: '0.68rem 1rem', background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '10px', fontSize: '0.9rem', fontWeight: 600, color: '#0f172a', outline: 'none', cursor: 'pointer' }}
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated (5.0 ★)</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

            </div>
          </div>

          {/* Results Counter Header */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 850, color: '#0f172a', letterSpacing: '-0.01em' }}>
                Top {partner.name} Certification Programs
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.92rem', marginTop: '0.2rem' }}>
                Showing {providerCourses.length} accredited live virtual courses
              </p>
            </div>
            
            {searchQuery && (
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.4rem 0.9rem', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 700, color: '#334155', cursor: 'pointer' }}
              >
                Clear Search Filter ✕
              </button>
            )}
          </div>

          {/* Provider Courses Grid */}
          {providerCourses.length > 0 ? (
            <div className="courses-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))', gap: '2rem' }}>
              {providerCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '4rem 2rem', textAlign: 'center', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔎</div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                No courses match "{searchQuery}"
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', maxWidth: '480px', margin: '0 auto 1.75rem', lineHeight: 1.6 }}>
                We couldn't find any {partner.name} certifications matching your search query. Try broadening your keywords or reset filters.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="btn btn-blue"
              >
                Reset Search Filters
              </button>
            </div>
          )}

          {/* Executive Why Choose Partner Section */}
          <div style={{ marginTop: '5rem', background: '#ffffff', borderRadius: '20px', padding: '3rem 2.5rem', border: '1px solid #e2e8f0', boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}>
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
              <span className="section-label">EXECUTIVE TRAINING GUARANTEE</span>
              <h2 style={{ fontSize: '1.85rem', fontWeight: 850, color: '#0f172a', marginBottom: '0.75rem' }}>
                Why Pursue {partner.name} Certifications with Ezycertify?
              </h2>
              <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.6 }}>
                Our masterclass cohorts combine accredited curriculum, live virtual interaction, and exam application approval support for first-attempt success.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
              <div style={{ background: '#f8fafc', padding: '1.75rem', borderRadius: '14px', border: '1px solid #f1f5f9' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(0, 116, 228, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.25rem' }}>
                  👨‍🏫
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                  Live Expert Cohorts
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.6 }}>
                  Learn from accredited instructors with 15+ years of industry experience and hands-on project delivery.
                </p>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.75rem', borderRadius: '14px', border: '1px solid #f1f5f9' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.25rem' }}>
                  📝
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                  2,500+ Practice Bank
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.6 }}>
                  Master full-length mock exams aligned with the latest Exam Content Outlines (ECO) and question formats.
                </p>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.75rem', borderRadius: '14px', border: '1px solid #f1f5f9' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.25rem' }}>
                  🛡️
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                  100% Application Mentorship
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.6 }}>
                  Our specialized team reviews your application experience documentation for guaranteed approval.
                </p>
              </div>

              <div style={{ background: '#f8fafc', padding: '1.75rem', borderRadius: '14px', border: '1px solid #f1f5f9' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.25rem' }}>
                  📜
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                  SEU & PDU Credits
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.6 }}>
                  Earn official contact hours required for exam eligibility and CCR cycle maintenance.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  )
}
