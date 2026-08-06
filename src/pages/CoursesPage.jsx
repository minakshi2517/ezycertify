import { useState } from 'react'
import { courses, courseCategories } from '../data/siteData'
import { CourseCard } from '../components/CoursesSection'

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const filtered = courses.filter((course) => {
    const matchesCategory = activeCategory === 'All' || course.category === activeCategory
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.shortTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div style={{ paddingTop: 'calc(var(--header-h) + 2rem)', paddingBottom: '4rem' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-label">MAKING CERTIFICATION EASY</span>
          <h1 className="section-title">Explore All Certification Programs</h1>
          <p className="section-lead" style={{ margin: '0 auto' }}>
            Elevate your career with globally accredited certifications from PMI, Scrum Alliance, Scaled Agile (SAFe), and PeopleCert.
          </p>

          <div style={{ maxWidth: '500px', margin: '2rem auto 0' }}>
            <input
              type="text"
              placeholder="Search certification, e.g. PMP, CSM, SAFe, ACP..."
              className="form-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                borderRadius: '50px',
                padding: '0.9rem 1.5rem',
                fontSize: '1rem',
                boxShadow: 'var(--shadow-sm)'
              }}
            />
          </div>

          <div className="category-filter" style={{ justifyContent: 'center' }}>
            {courseCategories.map((cat) => (
              <button
                key={cat}
                className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', background: 'var(--white)', borderRadius: 'var(--radius)', border: '1px solid var(--gray-200)' }}>
            <h3>No certification matching your search</h3>
            <p style={{ color: 'var(--gray-600)', marginTop: '0.5rem' }}>Try searching for PMP, CSM, SAFe, or ACP.</p>
            <button
              className="btn btn-blue btn-sm"
              style={{ marginTop: '1.5rem' }}
              onClick={() => {
                setActiveCategory('All')
                setSearchTerm('')
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="courses-grid">
            {filtered.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
