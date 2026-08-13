import { Link } from 'react-router-dom'
import { PHONE_NUMBER, ADDRESS_TEXT, EMAIL_ADDRESS } from '../data/siteData'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" style={{ display: 'inline-block', marginBottom: '1rem' }}>
              <img
                src="/logo.png"
                alt="Ezycertify"
                className="logo-img-footer"
              />
            </Link>
            <p>
              Ezycertify empowers professionals worldwide with globally accredited certification training. Aligned with iZenBridge’s world-class curriculum, we deliver result-driven PMP®, Scrum Alliance CSM®, SAFe® 6.0, PMI-ACP®, and ITIL® 4 programs.
            </p>

            <div className="social-icons">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                style={{ background: '#1877F2' }}
                aria-label="Facebook"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/"
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
                href="https://www.linkedin.com/"
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
                href={`https://wa.me/${PHONE_NUMBER.replace(/[^0-9]/g, '')}`}
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
            <h4>Popular Programs</h4>
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
            <h4>Solutions & Resources</h4>
            <ul>
              <li><Link to="/enterprise">Enterprise Training</Link></li>
              <li><Link to="/free-practice-test">Free PMP® Simulator</Link></li>
              <li><Link to="/courses">All Courses</Link></li>
              <li><Link to="/career">Careers</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/verify">Verify Credentials</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Contact & Support</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.75)' }}>
              <div>
                <strong style={{ color: '#60a5fa', display: 'block', marginBottom: '0.2rem' }}>Corporate Office</strong>
                <span>{ADDRESS_TEXT}</span>
              </div>
              <div>
                <strong style={{ color: '#60a5fa', display: 'block', marginBottom: '0.2rem' }}>Phone & WhatsApp</strong>
                <span>{PHONE_NUMBER}</span>
              </div>
              <div>
                <strong style={{ color: '#60a5fa', display: 'block', marginBottom: '0.2rem' }}>Email Inquiries</strong>
                <span>{EMAIL_ADDRESS}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Global Legal Disclaimers */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '1.5rem', marginTop: '2.5rem', fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.5)', lineHeight: 1.6 }}>
          <p>
            "PMI", "PMP", "PMI-ACP", "PMI-PBA", "PgMP", and "PMBOK" are registered marks of the Project Management Institute, Inc. "CSM", "CSPO", and "CST" are registered trademarks of Scrum Alliance®. "SAFe" is a registered trademark of Scaled Agile, Inc. "ITIL" is a registered trademark of AXELOS Limited / PeopleCert. Ezycertify is aligned with iZenBridge’s accredited curriculum.
          </p>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Ezycertify. All Rights Reserved.</span>
          <span>Making Certification Easy</span>
        </div>
      </div>
    </footer>
  )
}
