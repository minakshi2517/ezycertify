import { Link } from 'react-router-dom'
import { PHONE_NUMBER } from '../data/siteData'

export default function Hero() {
  const whatsappCounsel = `Hi Ezycertify, I want to inquire about certification programs and upcoming training batches.`

  return (
    <section className="hero-clean-section">
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div className="hero-clean-content">
          <span className="hero-clean-tag">
            PMI PREMIER ATP & SCRUM ALLIANCE ACCREDITED ACADEMY
          </span>

          <h1 className="hero-clean-title">
            Advance Your Career with Globally Recognized Certifications
          </h1>

          <p className="hero-clean-subtitle">
            Master PMP®, Scrum Alliance CSM®, SAFe® 6.0, and Cloud Architecture with live expert-led virtual cohorts, 2,500+ exam questions, and 100% application approval mentorship.
          </p>

          {/* EXACTLY 2 BUTTONS ONLY as requested by user */}
          <div className="hero-clean-actions">
            <Link to="/courses" className="btn btn-red btn-lg">
              Explore Courses
            </Link>
            <a
              href={`https://wa.me/${PHONE_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappCounsel)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-white btn-lg"
            >
              Speak to Counselor
            </a>
          </div>

          <div className="hero-clean-trust">
            <span>Verified Alumni Success:</span>
            <strong>4,500+ Certified Professionals</strong>
            <span className="dot-sep">•</span>
            <strong>99.2% First-Attempt Pass Rate</strong>
          </div>
        </div>
      </div>
    </section>
  )
}
