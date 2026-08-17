import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { PHONE_NUMBER, WHATSAPP_LINK } from '../data/siteData'

export default function Hero() {
  const { t } = useApp()
  const whatsappCounsel = `Hi Ezycertify, I want to inquire about certification programs and upcoming training batches.`

  return (
    <section className="hero-light-section">
      <div className="hero-light-bg-grid" />
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div className="hero-light-grid">
          {/* Left Content Column */}
          <div className="hero-light-left">
            <div className="hero-light-badge">
              <span style={{ fontSize: '0.9rem', color: '#0074e4' }}>📍</span>
              <span>Accredited Masterclass Certification Academy</span>
            </div>

            <h1 className="hero-light-title">
              Advance Your Ambition into <span className="hero-serif-italic">Achievement</span>
            </h1>

            <p className="hero-light-subtitle">
              {t.hero?.subtitle || 'Master PMP®, Scrum Alliance CSM®, SAFe® 6.0, and PMI-ACP® with live expert-led virtual cohorts, 2,500+ practice questions, and 100% exam application approval mentorship.'}
            </p>

            {/* Exactly 2 Action Buttons */}
            <div className="hero-light-actions">
              <Link to="/courses" className="btn-hero-primary">
                <span>{t.hero?.cta || 'Explore Courses'}</span>
                <span className="btn-arrow-circle">→</span>
              </Link>
              
              <a
                href={`${WHATSAPP_LINK}?text=${encodeURIComponent(whatsappCounsel)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hero-secondary"
              >
                <span>💬</span>
                <span>{t.hero?.ctaSecondary || 'Speak to Counselor'}</span>
              </a>
            </div>

            {/* Bottom Left Stats Bar with Avatar Cluster */}
            <div className="hero-bottom-stats">
              <div className="hero-stat-large">
                <span className="stat-big-num">99.2%</span>
                <span className="stat-small-label">First-Attempt Pass Rate</span>
              </div>

              <div className="hero-avatars-pill">
                <div className="avatar-group">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80" alt="Alumni" className="avatar-img" />
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80" alt="Alumni" className="avatar-img" />
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&auto=format&fit=crop&q=80" alt="Alumni" className="avatar-img" />
                </div>
                <span className="avatars-label"><strong>4,500+</strong> Certified Professionals</span>
              </div>
            </div>
          </div>

          {/* Right Column - Overlapping Double Image Layout (Exact Match to User Image) */}
          <div className="hero-light-right">
            <div className="hero-double-image-wrapper">
              
              {/* Main Big Executive Card */}
              <div className="hero-main-card">
                <img
                  src="/hero-banner.jpg"
                  alt="Ezycertify Professional Executive Certification Academy"
                  className="hero-main-img"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80'
                  }}
                />
              </div>

              {/* Overlapping Smaller Floating Student High-Five Image */}
              <div className="hero-overlap-card">
                <img
                  src="https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?auto=format&fit=crop&w=600&q=80"
                  alt="Certified Alumni Success High-Five"
                  className="hero-overlap-img"
                />
                <div className="overlap-badge-tag">
                  <span>🏆 100% Pass Mentorship</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
