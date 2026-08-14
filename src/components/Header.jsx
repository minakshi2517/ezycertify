import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { courses, PHONE_NUMBER } from '../data/siteData'

export default function Header() {
  const { language, setLanguage, languages, currency, user, signOut, t } = useApp()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('pmi')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)

  const dropdownTimeoutRef = useRef(null)
  const searchWrapperRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current)
    setDropdownOpen(true)
  }

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false)
    }, 250)
  }

  const currentLang = languages.find((l) => l.code === language) || languages[0]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setDropdownOpen(false)
    setSearchFocused(false)
  }, [location])

  // Close search dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(e.target)) {
        setSearchFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const providerCategories = [
    { id: 'pmi', label: 'PMI (Project Management)', desc: 'PMP®, PgMP®, CAPM®, PMI-ACP®', logo: '/partners/pmi.svg' },
    { id: 'scrum-alliance', label: 'Scrum Alliance', desc: 'CSM®, CSPO®, CSD®, A-CSM®', logo: '/partners/scrum-alliance.svg' },
    { id: 'scaled-agile', label: 'Scaled Agile (SAFe®)', desc: 'Leading SAFe® 6.0, SSM, POPM', logo: '/partners/scaled-agile.svg' },
    { id: 'microsoft', label: 'Microsoft', desc: 'Azure AZ-305, AZ-104, AZ-400', logo: '/partners/microsoft.svg' },
    { id: 'aws', label: 'AWS (Amazon Web Services)', desc: 'Solutions Architect, DevOps, Security', logo: '/partners/aws.svg' },
    { id: 'axelos', label: 'AXELOS / ITIL® / PRINCE2®', desc: 'ITIL® 4 Foundation, PRINCE2®', logo: '/partners/itil.svg' },
    { id: 'isaca', label: 'ISACA', desc: 'CISA®, CISM®, CRISC®, CGEIT®', logo: '/partners/isaca.svg' },
    { id: 'devops', label: 'DevOps Institute', desc: 'DevOps Leader, SRE, DevSecOps', logo: '/partners/devops.svg' },
  ]

  const activeCategoryCourses = courses.filter((c) => c.providerId === activeTab)
  const activeProvider = providerCategories.find((p) => p.id === activeTab) || providerCategories[0]

  // Live search filtering
  const searchResults = courses.filter((c) => {
    if (!searchQuery.trim()) return true
    const q = searchQuery.toLowerCase().trim()
    return (
      c.title.toLowerCase().includes(q) ||
      c.shortTitle.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.badge.toLowerCase().includes(q)
    )
  }).slice(0, 6)

  const counselorWhatsApp = `Hi Ezycertify, I need counselor guidance to pick the right course.`

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-inner">
          {/* Left Header Group: Logo + All Courses Button + Live Search Bar */}
          <div className="header-left-group">
            <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src="/logo.png"
                alt="Ezycertify - Making Certification Easy"
                className="logo-img-header"
              />
            </Link>

            {/* 'All Courses' Button with Provider Mega Dropdown */}
            <div
              className="dropdown-wrapper nav-desktop"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`kh-all-courses-btn ${dropdownOpen ? 'active' : ''}`}
                onClick={() => navigate('/courses')}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
                <span>All Courses</span>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ transition: 'transform 0.2s ease', transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="nav-mega-dropdown">
                  <div className="nav-mega-layout">
                    {/* Left Sidebar Provider Tabs */}
                    <div className="nav-mega-sidebar">
                      <div className="nav-mega-sidebar-header">Certification Bodies</div>
                      {providerCategories.map((cat) => (
                        <div
                          key={cat.id}
                          className={`nav-mega-cat-tab ${activeTab === cat.id ? 'active' : ''}`}
                          onMouseEnter={() => setActiveTab(cat.id)}
                          onClick={() => navigate(`/partners/${cat.id}`)}
                        >
                          <span className="cat-tab-icon-static">
                            <img src={cat.logo} alt={cat.label} style={{ height: '18px', width: 'auto', objectFit: 'contain' }} />
                          </span>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div className="cat-tab-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{cat.label}</div>
                            <div className="cat-tab-desc" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{cat.desc}</div>
                          </div>
                          <span className="cat-tab-arrow">›</span>
                        </div>
                      ))}
                    </div>

                    {/* Right Main Course Cards Panel */}
                    <div className="nav-mega-panel">
                      <div className="nav-mega-panel-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <img src={activeProvider.logo} alt={activeProvider.label} style={{ height: '24px', width: 'auto', objectFit: 'contain' }} />
                          <h3>{activeProvider.label} Accredited Courses</h3>
                        </div>
                        <Link to={`/partners/${activeProvider.id}`} className="nav-mega-all-link">Provider Page ({activeCategoryCourses.length}) →</Link>
                      </div>

                      <div className="nav-mega-courses-grid">
                        {activeCategoryCourses.map((c) => (
                          <Link key={c.id} to={`/courses/${c.slug}`} className="nav-mega-course-item">
                            <div className="nav-mega-item-top">
                              <span className="nav-mega-item-badge">{c.badge}</span>
                              <span className="nav-mega-item-dur">{c.duration}</span>
                            </div>
                            <div className="nav-mega-item-title">{c.shortTitle}</div>
                            <p className="nav-mega-item-desc">{c.description.slice(0, 70)}...</p>
                          </Link>
                        ))}
                      </div>

                      {/* Bottom Banner inside Mega Menu */}
                      <div className="nav-mega-bottom">
                        <div>
                          <strong>Need guidance selecting your certification path?</strong>
                          <p style={{ fontSize: '0.8rem', color: 'var(--gray-600)' }}>Speak directly with an Ezycertify authorized academic counselor.</p>
                        </div>
                        <a
                          href={`https://wa.me/${PHONE_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(counselorWhatsApp)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-red btn-sm"
                        >
                          Talk to Counselor
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Live Search Input Bar */}
            <div className="kh-search-wrapper nav-desktop" ref={searchWrapperRef}>
              <div className="kh-search-input-box">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="kh-search-icon">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="What do you want to learn today?"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setSearchFocused(true)
                  }}
                  onFocus={() => setSearchFocused(true)}
                  className="kh-search-input"
                />
                {searchQuery && (
                  <button className="kh-search-clear" onClick={() => setSearchQuery('')}>✕</button>
                )}
              </div>

              {/* Autocomplete Search Dropdown */}
              {searchFocused && (
                <div className="kh-search-results-dropdown">
                  {searchResults.length > 0 ? (
                    <div style={{ padding: '0.5rem 0' }}>
                      {searchResults.map((c) => (
                        <Link
                          key={c.id}
                          to={`/courses/${c.slug}`}
                          className="kh-search-result-item"
                          onClick={() => {
                            setSearchFocused(false)
                            setSearchQuery('')
                          }}
                        >
                          <span className="kh-res-badge">{c.badge}</span>
                          <div className="kh-res-title">{c.shortTitle}</div>
                          <span className="kh-res-arrow">→</span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="kh-search-no-results">
                      No matching courses found for "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Navigation Links & Controls */}
          <nav className="nav-desktop">
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
              {t.nav?.home || 'Home'}
            </Link>
            <Link to="/career" className={location.pathname === '/career' ? 'active' : ''}>
              {t.nav?.career || 'Career'}
            </Link>
            <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
              {t.nav?.about || 'About'}
            </Link>
            <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
              {t.nav?.contact || 'Contact'}
            </Link>
          </nav>

          <div className="header-actions">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <select
                className="lang-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                aria-label="Select language"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </select>
              <span className="currency-badge">{currentLang.symbol.trim() || currency}</span>
            </div>

            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy)' }}>Hi, {user.name}</span>
                <button className="btn btn-outline-navy btn-sm" onClick={signOut}>
                  Sign Out
                </button>
              </div>
            ) : (
              <Link to="/login" className="nav-login-btn">
                {t.nav?.signIn || 'Login'}
              </Link>
            )}

            <button
              className="menu-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 43, 92, 0.4)',
            backdropFilter: 'blur(4px)',
            zIndex: 998,
          }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--gray-200)', paddingBottom: '1rem' }}>
          <img src="/logo.png" alt="Ezycertify" style={{ height: '44px', width: 'auto', mixBlendMode: 'multiply' }} />
          <button
            onClick={() => setMobileOpen(false)}
            style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--navy)' }}
          >
            ✕
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div className="kh-search-input-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="kh-search-icon">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search courses e.g. PMP, CSM..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="kh-search-input"
            />
          </div>
          {searchQuery && (
            <div style={{ background: 'var(--gray-50)', borderRadius: '8px', border: '1px solid var(--gray-200)', marginTop: '0.5rem', maxHeight: '200px', overflowY: 'auto' }}>
              {searchResults.map((c) => (
                <Link
                  key={c.id}
                  to={`/courses/${c.slug}`}
                  onClick={() => { setMobileOpen(false); setSearchQuery(''); }}
                  style={{ display: 'block', padding: '0.6rem 0.8rem', borderBottom: '1px solid var(--gray-200)', fontSize: '0.85rem', color: 'var(--navy)', fontWeight: 600 }}
                >
                  {c.shortTitle}
                </Link>
              ))}
            </div>
          )}
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Link to="/" onClick={() => setMobileOpen(false)} style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy)' }}>
            {t.nav?.home || 'Home'}
          </Link>
          <Link to="/courses" onClick={() => setMobileOpen(false)} style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy)' }}>
            {t.nav?.courses || 'All Courses Catalog'}
          </Link>
          <Link to="/career" onClick={() => setMobileOpen(false)} style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy)' }}>
            {t.nav?.career || 'Career Opportunities'}
          </Link>
          <Link to="/about" onClick={() => setMobileOpen(false)} style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy)' }}>
            {t.nav?.about || 'About'}
          </Link>
          <Link to="/contact" onClick={() => setMobileOpen(false)} style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy)' }}>
            {t.nav?.contact || 'Contact Us'}
          </Link>
        </nav>

        <div style={{ marginTop: '2rem', borderTop: '1px solid var(--gray-200)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {user ? (
            <button className="btn btn-outline-navy" onClick={() => { signOut(); setMobileOpen(false); }}>
              Sign Out ({user.name})
            </button>
          ) : (
            <Link to="/login" className="nav-login-btn" style={{ width: '100%', padding: '0.75rem' }} onClick={() => setMobileOpen(false)}>
              {t.nav?.signIn || 'Login to Portal'}
            </Link>
          )}
        </div>
      </div>
    </>
  )
}
