import { useState } from 'react'
import { testimonials } from '../data/siteData'

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeReview = testimonials[activeIndex] || testimonials[0]

  return (
    <section className="section" style={{ background: 'var(--gray-50)' }}>
      <div className="container">
        <div className="review-section-box">
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label">VERIFIED ALUMNI SUCCESS</span>
            <h2 className="section-title">Trusted by 4,500+ Professionals Worldwide</h2>
            <p className="section-lead" style={{ margin: '0 auto' }}>
              Discover how project managers, Agile coaches, and IT leaders achieved first-attempt certification success with Ezycertify's accredited masterclass curriculum.
            </p>

            {/* Rating Badges Bar */}
           
          </div>

          {/* Spotlight & Stack Layout */}
          <div className="review-spotlight-grid">
            {/* Left: Featured Review Spotlight */}
            <div className="featured-spotlight-card">
              <div className="spotlight-quote-mark">“</div>
              
              <div className="spotlight-header">
                <img src={activeReview.avatar} alt={activeReview.name} className="spotlight-avatar" />
                <div>
                  <h3 className="spotlight-name">{activeReview.name}</h3>
                  <span className="spotlight-role">{activeReview.role}</span>
                  <div className="spotlight-stars">⭐⭐⭐⭐⭐</div>
                </div>
                <span className="verified-badge-chip">✓ Verified Credential</span>
              </div>

              <p className="spotlight-text">
                "{activeReview.text}"
              </p>

              <div className="spotlight-footer">
                <div className="verified-details">
                  <span>🎓 Course Completed: <strong>{activeReview.role}</strong></span>
                  <span>🛡️ Status: <strong>First Attempt Pass (Above Target)</strong></span>
                </div>
              </div>
            </div>

            {/* Right: Selectable Review Cards Stack */}
            <div className="review-cards-stack">
              {testimonials.map((item, idx) => (
                <div
                  key={idx}
                  className={`stack-review-card ${idx === activeIndex ? 'active' : ''}`}
                  onClick={() => setActiveIndex(idx)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img src={item.avatar} alt={item.name} className="stack-avatar" />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h4 className="stack-name">{item.name}</h4>
                        <span className="stack-stars">⭐⭐⭐⭐⭐</span>
                      </div>
                      <span className="stack-role">{item.role}</span>
                      <p className="stack-snippet">"{item.text.slice(0, 85)}..."</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
