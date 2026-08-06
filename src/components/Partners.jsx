import { partnerLogos } from '../data/siteData'

export default function Partners() {
  const handleImageError = (e, partnerName) => {
    e.target.onerror = null
    const lowerName = partnerName.toLowerCase()
    if (lowerName.includes('pmi')) e.target.src = '/partners/pmi.png'
    else if (lowerName.includes('scrum')) e.target.src = '/partners/scrum.png'
    else if (lowerName.includes('scaled') || lowerName.includes('safe')) e.target.src = '/partners/safe.png'
    else if (lowerName.includes('peoplecert')) e.target.src = '/partners/peoplecert.png'
    else if (lowerName.includes('aws')) e.target.src = '/partners/aws.png'
    else if (lowerName.includes('microsoft')) e.target.src = '/partners/microsoft.png'
    else if (lowerName.includes('icagile')) e.target.src = '/partners/icagile.png'
    else if (lowerName.includes('itil')) e.target.src = '/partners/itil.png'
  }

  return (
    <section className="partners-section">
      <div className="container" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--navy)' }}>
          Partnering with the World's Leading Certification Providers
        </h2>
      </div>

      <div className="marquee-container">
        <div className="marquee-content">
          {partnerLogos.map((partner, i) => (
            <div key={`${partner.name}-${i}`} className="partner-logo-item">
              <img
                src={partner.logo}
                alt={partner.name}
                title={partner.badgeText}
                onError={(e) => handleImageError(e, partner.name)}
              />
            </div>
          ))}
        </div>
        <div className="marquee-content" aria-hidden="true">
          {partnerLogos.map((partner, i) => (
            <div key={`dupe-${partner.name}-${i}`} className="partner-logo-item">
              <img
                src={partner.logo}
                alt={partner.name}
                title={partner.badgeText}
                onError={(e) => handleImageError(e, partner.name)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
