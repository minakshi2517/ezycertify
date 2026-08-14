import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { partnerLogos } from '../data/siteData'

export default function Partners() {
  const { tr } = useApp()

  const handleImageError = (e, partnerName) => {
    e.target.onerror = null
    const lowerName = partnerName.toLowerCase()
    if (lowerName.includes('pmi')) e.target.src = '/partners/pmi.svg'
    else if (lowerName.includes('scrum')) e.target.src = '/partners/scrum-alliance.svg'
    else if (lowerName.includes('scaled') || lowerName.includes('safe')) e.target.src = '/partners/scaled-agile.svg'
    else if (lowerName.includes('peoplecert') || lowerName.includes('axelos') || lowerName.includes('itil')) e.target.src = '/partners/itil.svg'
    else if (lowerName.includes('aws')) e.target.src = '/partners/aws.svg'
    else if (lowerName.includes('microsoft')) e.target.src = '/partners/microsoft.svg'
    else if (lowerName.includes('isaca')) e.target.src = '/partners/isaca.svg'
    else if (lowerName.includes('devops')) e.target.src = '/partners/devops.svg'
    else e.target.src = '/partners/pmi.svg'
  }

  return (
    <section className="partners-section">
      <div className="container" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-0.01em' }}>
          {tr("World's Leading Certification Providers")}
        </h2>
      </div>

      <div className="marquee-container">
        <div className="marquee-content">
          {partnerLogos.map((partner, i) => (
            <Link
              to={`/partners/${partner.id || partner.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              key={`${partner.name}-${i}`}
              className="partner-logo-item"
              title={`View ${partner.name} accredited certification courses`}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                onError={(e) => handleImageError(e, partner.name)}
              />
            </Link>
          ))}
        </div>
        <div className="marquee-content" aria-hidden="true">
          {partnerLogos.map((partner, i) => (
            <Link
              to={`/partners/${partner.id || partner.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              key={`dupe-${partner.name}-${i}`}
              className="partner-logo-item"
              title={`View ${partner.name} accredited certification courses`}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                onError={(e) => handleImageError(e, partner.name)}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
