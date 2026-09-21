function parseList(value) {
  if (Array.isArray(value)) return value.filter(Boolean)
  if (typeof value === 'string' && value.trim()) {
    try {
      const parsed = JSON.parse(value)
      if (Array.isArray(parsed)) return parsed.filter(Boolean)
    } catch {
      // plain text, one item per line or comma
    }
    return value
      .split(/\n|,/)
      .map((item) => item.replace(/^[-•]\s*/, '').trim())
      .filter(Boolean)
  }
  return []
}

export function normalizeCourse(raw) {
  if (!raw || !raw.id) return null

  const highlights = parseList(raw.highlights)
  const skills = parseList(raw.skills)
  const upcoming = Array.isArray(raw.upcoming) ? raw.upcoming : parseList(raw.upcoming)

  return {
    id: raw.id,
    slug: raw.slug || String(raw.id),
    title: raw.title || 'Untitled Course',
    shortTitle: raw.shortTitle || raw.short_title || raw.title || 'Course',
    providerId: raw.providerId || raw.provider_id || 'ezycertify',
    category: raw.category || 'Project Management',
    badge: raw.badge || 'Popular',
    image:
      raw.image ||
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    description: raw.description || '',
    highlights: highlights.length ? highlights : ['Live virtual training', 'Exam preparation support'],
    skills: skills.length ? skills : ['Professional Practice'],
    duration: raw.duration || 'Live Virtual',
    rating: Number(raw.rating) || 4.8,
    students: Number(raw.students) || 0,
    priceUSD: raw.priceUSD != null || raw.price_usd != null ? Number(raw.priceUSD ?? raw.price_usd) : undefined,
    priceINR: raw.priceINR != null || raw.price_inr != null ? Number(raw.priceINR ?? raw.price_inr) : undefined,
    priceCurrency: raw.priceCurrency || raw.price_currency || undefined,
    upcoming: upcoming.length && typeof upcoming[0] === 'object' ? upcoming : [],
  }
}

export function mergeCourseCatalog(staticCourses, apiCourses) {
  const byId = new Map()
  for (const course of staticCourses || []) {
    byId.set(course.id, course)
  }
  for (const raw of apiCourses || []) {
    const next = normalizeCourse(raw)
    if (!next) continue
    if (!byId.has(next.id)) {
      byId.set(next.id, next)
    }
  }
  return [...byId.values()]
}
