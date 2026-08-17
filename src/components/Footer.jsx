import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { PHONE_NUMBER, ADDRESS_TEXT, EMAIL_ADDRESS, WHATSAPP_LINK, INSTAGRAM_LINK, LINKEDIN_LINK } from '../data/siteData'

export default function Footer() {
  const { t } = useApp()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" style={{ display: 'inline-block', marginBottom: '1rem' }}>
              <img
                src="/logo.png"
                alt="Ezycertify - Making Certification Easy"
                style={{ height: '55px', width: 'auto', background: '#fff', padding: '6px 12px', borderRadius: '8px' }}
              />
            </Link>
            <p className="footer-desc">
              {t.footer?.desc || 'Ezycertify is a globally accredited professional certification training academy delivering live virtual cohorts with 100% exam application approval mentorship.'}
            </p>

            <div className="social-icons">
              <a
                href={INSTAGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                style={{ background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}
                aria-label="Instagram"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href={LINKEDIN_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                style={{ background: '#0A66C2' }}
                aria-label="LinkedIn"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                style={{ background: '#25D366' }}
                aria-label="WhatsApp"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.146 4.186 4.29-1.127z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h4>{t.footer?.certifications || 'Popular Certifications'}</h4>
            <ul>
              <li><Link to="/courses/pmp-certification-training">PMP® Certification</Link></li>
              <li><Link to="/courses/certified-scrum-master-csm">Certified ScrumMaster® (CSM)</Link></li>
              <li><Link to="/courses/leading-safe-60-certification">Leading SAFe® 6.0</Link></li>
              <li><Link to="/courses/pmi-acp-agile-certified-practitioner">PMI-ACP® Agile</Link></li>
              <li><Link to="/courses/pmi-pba-business-analysis-certification">PMI-PBA® Business Analysis</Link></li>
              <li><Link to="/courses/itil-4-foundation-certification">ITIL® 4 Foundation</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>{t.footer?.quickLinks || 'Quick Links'}</h4>
            <ul>
              <li><Link to="/courses">{t.nav?.courses || 'All Courses'}</Link></li>
              <li><Link to="/career">{t.nav?.career || 'Career'}</Link></li>
              <li><Link to="/about">{t.nav?.about || 'About'}</Link></li>
              <li><Link to="/contact">{t.nav?.contact || 'Contact Support'}</Link></li>
              <li><Link to="/login">{t.nav?.signIn || 'Student Portal'}</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Contact Info</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.75)' }}>
              <div>
                <strong style={{ color: '#60a5fa', display: 'block', marginBottom: '0.2rem' }}>Corporate Office</strong>
                <span>{ADDRESS_TEXT}</span>
              </div>
              <div>
                <strong style={{ color: '#60a5fa', display: 'block', marginBottom: '0.2rem' }}>Phone Support</strong>
                <a href={`tel:${PHONE_NUMBER.replace(/[^0-9+]/g, '')}`} style={{ color: '#ffffff', textDecoration: 'underline', fontWeight: 600 }}>
                  {PHONE_NUMBER}
                </a>
              </div>
              <div>
                <strong style={{ color: '#60a5fa', display: 'block', marginBottom: '0.2rem' }}>Email Inquiries</strong>
                <a href={`mailto:${EMAIL_ADDRESS}`} style={{ color: '#ffffff', textDecoration: 'underline', fontWeight: 600 }}>
                  {EMAIL_ADDRESS}
                </a>
              </div>
              <div>
                <strong style={{ color: '#60a5fa', display: 'block', marginBottom: '0.2rem' }}>Working Hours</strong>
                <span>Monday – Saturday (9:00 AM – 7:00 PM IST)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom" style={{ flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between' }}>
          <span>© {new Date().getFullYear()} Ezycertify. {t.footer?.rights || 'All Rights Reserved.'}</span>
          <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.82rem' }}>
            <Link to="/privacy" style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none' }}>
              Privacy & Data Protection Policy
            </Link>
            <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>·</span>
            <Link to="/terms" style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none' }}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
