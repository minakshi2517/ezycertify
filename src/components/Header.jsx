import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { courses, PHONE_NUMBER } from '../data/siteData'

export default function Header() {
  const { language, setLanguage, languages, currency, user, signOut } = useApp()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('Project Management')
  const location = useLocation()
  const navigate = useNavigate()

  const currentLang = languages.find((l) => l.code === language) || languages[0]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setDropdownOpen(false)
  }, [location.pathname])

  const categories = [
    {
      id: 'Project Management',
      label: 'Project Management',
      desc: 'PMP®, PgMP®, CAPM®',
      iconSvg: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
        </svg>
      ),
    },
    {
      id: 'Agile & Scrum',
      label: 'Agile & Scrum',
      desc: 'CSM®, CSPO®, PMI-ACP®',
      iconSvg: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
    },
    {
      id: 'Scaled Agile (SAFe)',
      label: 'Scaled Agile (SAFe)',
      desc: 'Leading SAFe® 6.0, SSM',
      iconSvg: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
    },
    {
      id: 'Business Analysis',
      label: 'BA, Cloud & ITIL',
      desc: 'PMI-PBA®, ITIL® 4, Cloud',
      iconSvg: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        </svg>
      ),
    },
  ]

  const activeCategoryCourses = courses.filter((c) => {
    if (activeTab === 'Business Analysis') {
      return c.category === 'Business Analysis' || c.category === 'Cloud & ITIL'
    }
    return c.category === activeTab
  })

  const counselorWhatsApp = `Hi Ezycertify, I need counselor guidance to pick the right course.`

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-inner">
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img
              src="/logo.png"
              alt="Ezycertify - Making Certification Easy"
              className="logo-img-header"
            />
          </Link>

          <nav className="nav-desktop">
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
              Home
            </Link>

            {/* Clean Professional Courses Mega Dropdown */}
            <div
              className="dropdown-wrapper"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <Link
                to="/courses"
                className={`dropdown-trigger ${location.pathname.startsWith('/courses') ? 'active' : ''}`}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
              >
                Courses
                <svg
                  width="12"
                  height="12"
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
              </Link>

              {dropdownOpen && (
                <div className="izen-mega-dropdown">
                  <div className="izen-mega-layout">
                    {/* Left Sidebar Category Tabs */}
                    <div className="izen-mega-sidebar">
                      <div className="izen-sidebar-header">Category Catalog</div>
                      {categories.map((cat) => (
                        <div
                          key={cat.id}
                          className={`izen-cat-tab ${activeTab === cat.id ? 'active' : ''}`}
                          onMouseEnter={() => setActiveTab(cat.id)}
                        >
                          <span className="cat-tab-icon-static">{cat.iconSvg}</span>
                          <div>
                            <div className="cat-tab-title">{cat.label}</div>
                            <div className="cat-tab-desc">{cat.desc}</div>
                          </div>
                          <span className="cat-tab-arrow">›</span>
                        </div>
                      ))}
                    </div>

                    {/* Right Main Course Cards Panel */}
                    <div className="izen-mega-panel">
                      <div className="izen-panel-header">
                        <h3>{activeTab === 'Business Analysis' ? 'Business Analysis & ITIL' : activeTab} Courses</h3>
                        <Link to="/courses" className="izen-all-link">View All ({courses.length}) →</Link>
                      </div>

                      <div className="izen-courses-grid">
                        {activeCategoryCourses.map((c) => (
                          <Link key={c.id} to={`/courses/${c.slug}`} className="izen-course-item">
                            <div className="izen-item-top">
                              <span className="izen-item-badge">{c.badge}</span>
                              <span className="izen-item-dur">{c.duration}</span>
                            </div>
                            <div className="izen-item-title">{c.shortTitle}</div>
                            <p className="izen-item-desc">{c.description.slice(0, 75)}...</p>
                          </Link>
                        ))}
                      </div>

                      {/* Bottom Banner inside Mega Menu */}
                      <div className="izen-mega-bottom">
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

            <Link to="/enterprise" className={location.pathname === '/enterprise' ? 'active' : ''}>
              Enterprise
            </Link>
            <Link to="/free-practice-test" className={location.pathname === '/free-practice-test' ? 'active' : ''}>
              Free Mock Test
            </Link>
            <Link to="/career" className={location.pathname === '/career' ? 'active' : ''}>
              Career
            </Link>
            <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
              About Us
            </Link>
            <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
              Contact
            </Link>
            <Link to="/verify" className={location.pathname === '/verify' ? 'active' : ''}>
              Verify Cert
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
                    {lang.flag} {lang.label}
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Link to="/login" className="btn btn-outline-navy btn-sm">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-red btn-sm">
                  Sign up
                </Link>
              </div>
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

      <nav className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        <Link to="/">Home</Link>
        <Link to="/courses">All Courses</Link>
        <Link to="/career">Career</Link>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/verify">Verify Certificate</Link>
        {!user && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
            <Link to="/login" className="btn btn-outline-navy" style={{ textAlign: 'center' }}>
              Login
            </Link>
            <Link to="/signup" className="btn btn-red" style={{ textAlign: 'center' }}>
              Sign up
            </Link>
          </div>
        )}
        {user && (
          <button
            onClick={() => {
              signOut()
              navigate('/')
            }}
            className="btn btn-outline-navy"
            style={{ marginTop: '1rem' }}
          >
            Sign Out
          </button>
        )}
      </nav>
    </>
  )
}
