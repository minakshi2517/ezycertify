export const WHATSAPP_NUMBER = '919769110888'
export const PHONE_NUMBER = '+91 97691 10888'
export const ADDRESS_TEXT = '5th Floor, 504, Shagun Arcade, near Apna Sweets, PU 4, Near Vijay Nagar Square, Vijay Nagar, Scheme No.54, Ratna Lok Colony, Indore, Madhya Pradesh 452010'
export const EMAIL_ADDRESS = 'info@ezycertify.com'

export const languages = [
  { code: 'en-US', label: 'English (US)', flag: '🇺🇸', currency: 'USD', symbol: '$', locale: 'en-US' },
  { code: 'en-GB', label: 'English (UK)', flag: '🇬🇧', currency: 'GBP', symbol: '£', locale: 'en-GB' },
  { code: 'en-IN', label: 'English (India)', flag: '🇮🇳', currency: 'INR', symbol: '₹', locale: 'en-IN' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳', currency: 'INR', symbol: '₹', locale: 'hi-IN' },
  { code: 'ar', label: 'العربية', flag: '🇦🇪', currency: 'AED', symbol: 'AED ', locale: 'ar-AE' },
  { code: 'fr', label: 'Français', flag: '🇫🇷', currency: 'EUR', symbol: '€', locale: 'fr-FR' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪', currency: 'EUR', symbol: '€', locale: 'de-DE' },
  { code: 'es', label: 'Español', flag: '🇪🇸', currency: 'EUR', symbol: '€', locale: 'es-ES' },
  { code: 'pt-BR', label: 'Português (Brasil)', flag: '🇧🇷', currency: 'BRL', symbol: 'R$', locale: 'pt-BR' },
]

export const exchangeRates = {
  USD: 1,
  GBP: 0.79,
  EUR: 0.92,
  INR: 83.5,
  AED: 3.67,
  BRL: 4.97,
}

export const whatsappPresets = [
  {
    id: 'fees',
    en: 'I want to know about course fees and payment options.',
    hi: 'मुझे कोर्स की फीस और भुगतान विकल्पों के बारे में जानना है।',
  },
  {
    id: 'choose',
    en: 'I need help choosing the right certification for my career.',
    hi: 'मुझे अपने करियर के लिए सही सर्टिफिकेशन चुनने में मदद चाहिए।',
  },
  {
    id: 'register',
    en: 'I want to register for upcoming training batches.',
    hi: 'मैं आगामी ट्रेनिंग बैच के लिए रजिस्टर करना चाहता/चाहती हूँ।',
  },
  {
    id: 'exam',
    en: 'I have questions about exam preparation and support.',
    hi: 'मुझे परीक्षा की तैयारी और सपोर्ट के बारे में सवाल हैं।',
  },
]

export const partnerLogos = [
  { name: 'PMI (Project Management Institute)', logo: '/partners/pmi.svg', badgeText: 'PMI Authorized Partner' },
  { name: 'Scrum Alliance', logo: '/partners/scrum-alliance.svg', badgeText: 'Registered Education Provider' },
  { name: 'Scaled Agile (SAFe)', logo: '/partners/scaled-agile.svg', badgeText: 'SAFe® Silver Partner' },
  { name: 'PeopleCert / ITIL', logo: '/partners/peoplecert.svg', badgeText: 'Accredited Training Partner' },
  { name: 'AWS (Amazon Web Services)', logo: '/partners/aws.svg', badgeText: 'AWS Cloud Training' },
  { name: 'Microsoft', logo: '/partners/microsoft.svg', badgeText: 'Microsoft Certified Partner' },
  { name: 'ICAgile', logo: '/partners/icagile.svg', badgeText: 'Member Organization' },
  { name: 'ITIL®', logo: '/partners/itil.svg', badgeText: 'ITIL Service Management' },
]

export const testimonials = [
  {
    name: 'Aditya Patel',
    role: 'PMP® Certified Project Manager',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80&auto=format&fit=crop&crop=face',
    text: 'I completed my PMP training with Ezycertify. The iZenBridge-aligned curriculum, 2500+ question bank, and continuous mentor feedback helped me clear the PMP exam on my first attempt with Above Target in all 3 domains!',
    rating: 5,
  },
  {
    name: 'Neha Sharma',
    role: 'Certified ScrumMaster (CSM®)',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80&auto=format&fit=crop&crop=face',
    text: 'The Scrum Alliance CSM course was deeply insightful. The CST trainer facilitated real-life sprint exercises, product backlog prioritization, and mock test breakdown. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Naveen Sahani',
    role: 'SAFe® 6.0 Agilist (SA)',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80&auto=format&fit=crop&crop=face',
    text: 'The SAFe 6.0 Agilist workshop was top notch. Ezycertify gave full access to the SAFe Community Platform, PI Planning simulation, and lifetime doubt support.',
    rating: 5,
  },
  {
    name: 'Mukul Mohane',
    role: 'PMI-PBA® Professional',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80&auto=format&fit=crop&crop=face',
    text: 'Ezycertify made the business analysis framework so easy to grasp. Their application review team guided me step-by-step through the PMI PBA application.',
    rating: 5,
  },
]

export const courseCategories = [
  'All',
  'Project Management',
  'Agile & Scrum',
  'Scaled Agile (SAFe)',
  'Business Analysis',
  'Cloud & ITIL',
]

// High-Resolution Professional Photography URLs for All Courses
export const courses = [
  {
    id: 'pmp',
    slug: 'pmp-certification-training',
    title: 'PMP® Certification Training (Project Management Professional)',
    shortTitle: 'PMP® Certification',
    category: 'Project Management',
    badge: 'PMI Premier ATP',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
    description:
      'iZenBridge curriculum aligned PMP® training based on the latest PMI Exam Content Outline (ECO). Covers People, Process, and Business Environment domains across Predictive, Agile, and Hybrid frameworks.',
    highlights: [
      '35+ Hours of Live Virtual Learning & 35 PDU Certificate',
      '2500+ Practice Exam Questions & 8 Full-Length Mock Exams',
      'Coverage of 3 ECO Domains: People (42%), Process (50%), Business Environment (8%)',
      'Step-by-Step PMP® Application Approval Support & Audit Guidance',
      'Predictive, Agile, and Hybrid project management deep dives',
      'Lifetime Access to Learning Portal, Recorded Videos & PMBOK® 7th Ed. Notes',
    ],
    skills: [
      'Agile & Hybrid Lifecycle Management',
      'Earned Value Management (EVM) & WBS',
      'Risk Management & Contingency Planning',
      'Stakeholder Engagement & Conflict Resolution',
      'Servant Leadership & Team Coaching',
    ],
    duration: '35 Contact Hours',
    rating: 4.9,
    students: 2450,
    priceUSD: 499,
    upcoming: [
      { date: 'Aug 17 - Aug 25, 2026', time: 'Weekend Batch (7:00 PM - 11:00 PM IST)', mode: 'Live Virtual' },
      { date: 'Sep 07 - Sep 15, 2026', time: 'Weekend Batch (10:00 AM - 2:00 PM IST)', mode: 'Live Virtual' },
    ],
  },
  {
    id: 'csm',
    slug: 'certified-scrum-master-csm',
    title: 'Certified ScrumMaster® (CSM) - Scrum Alliance',
    shortTitle: 'CSM® (ScrumMaster)',
    category: 'Agile & Scrum',
    badge: 'Scrum Alliance REP',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    description:
      'Official 16-hour live virtual workshop led by Certified Scrum Trainers (CST®). Learn Scrum values, artifact transparency, sprint ceremonies, and servant leadership.',
    highlights: [
      '2-Day Live Interactive Workshop by CST® Trainer',
      '2-Year Scrum Alliance Membership & 16 SEUs/PDUs',
      'Includes Official CSM Exam Fee with 2 Free Attempts',
      'Simulated Sprint Planning, Backlog Refinement & Retrospectives',
    ],
    skills: ['Scrum Framework & Artifacts', 'Facilitation & Servant Leadership', 'Agile Estimation & Burndown Charts'],
    duration: '16 Hours (2 Days)',
    rating: 4.9,
    students: 1890,
    priceUSD: 399,
    upcoming: [
      { date: 'Aug 24 - Aug 25, 2026', time: 'Weekend (9:00 AM - 5:00 PM IST)', mode: 'Live Virtual' },
      { date: 'Sep 14 - Sep 15, 2026', time: 'Weekend (9:00 AM - 5:00 PM IST)', mode: 'Live Virtual' },
    ],
  },
  {
    id: 'cspo',
    slug: 'certified-scrum-product-owner-cspo',
    title: 'Certified Scrum Product Owner® (CSPO) - Scrum Alliance',
    shortTitle: 'CSPO® (Product Owner)',
    category: 'Agile & Scrum',
    badge: 'Scrum Alliance REP',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
    description:
      'Master Product Backlog prioritization, release planning, value maximization, and stakeholder communication in Scrum environments.',
    highlights: [
      '2-Day Live Workshop by Certified Scrum Trainer (CST®)',
      '2-Year Scrum Alliance Membership & 16 SEUs',
      'Product Backlog Prioritization Techniques (Kano, MoSCoW, WSJF)',
    ],
    skills: ['Product Backlog Refinement', 'User Story Mapping', 'Value Stream Mapping'],
    duration: '16 Hours (2 Days)',
    rating: 4.8,
    students: 1240,
    priceUSD: 449,
    upcoming: [{ date: 'Aug 31 - Sep 01, 2026', time: 'Weekend (9:30 AM - 5:30 PM IST)', mode: 'Live Virtual' }],
  },
  {
    id: 'safe-agilist',
    slug: 'leading-safe-60-certification',
    title: 'Leading SAFe® 6.0 Certification (SAFe Agilist)',
    shortTitle: 'Leading SAFe® 6.0',
    category: 'Scaled Agile (SAFe)',
    badge: 'Scaled Agile Partner',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    description:
      'Learn how to scale Agile across enterprise business units using SAFe® 6.0 framework. Prepare for SAFe® Agilist (SA) certification.',
    highlights: [
      '16 Hours Live Virtual Training by SAFe Practice Consultant (SPC)',
      '1-Year SAFe Community Platform Membership',
      'Includes Official Exam Fee & SAFe 6.0 Agilist Digital Badge',
      'Hands-on Program Increment (PI) Planning Simulation',
    ],
    skills: ['Enterprise Agile Scaling', 'PI Planning & ARTs', 'Lean Portfolio Management'],
    duration: '16 Hours (2 Days)',
    rating: 4.9,
    students: 1420,
    priceUSD: 549,
    upcoming: [{ date: 'Aug 24 - Aug 25, 2026', time: 'Weekend (9:00 AM - 5:00 PM IST)', mode: 'Live Virtual' }],
  },
  {
    id: 'pmi-acp',
    slug: 'pmi-acp-agile-certified-practitioner',
    title: 'PMI-ACP® Certification (Agile Certified Practitioner)',
    shortTitle: 'PMI-ACP® Agile',
    category: 'Agile & Scrum',
    badge: 'PMI Premier ATP',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    description:
      'Comprehensive PMI-ACP® course covering Scrum, Kanban, XP, Lean, TDD, and Crystal. Fulfills 21 contact hours requirement.',
    highlights: [
      '21 Contact Hours Certificate for PMI-ACP® Application',
      '900+ Practice Exam Questions & Full Mock Tests',
      'Deep Dive into 7 PMI-ACP Domains',
    ],
    skills: ['Scrum, Kanban & Lean Execution', 'Agile Metrics & Velocity Tracking', 'Adaptive Planning'],
    duration: '21 Contact Hours',
    rating: 4.8,
    students: 1150,
    priceUSD: 399,
    upcoming: [{ date: 'Sep 07 - Sep 08, 2026', time: 'Weekend (10:00 AM - 5:00 PM IST)', mode: 'Live Virtual' }],
  },
  {
    id: 'pmi-pba',
    slug: 'pmi-pba-business-analysis-certification',
    title: 'PMI-PBA® Certification (Business Analysis Professional)',
    shortTitle: 'PMI-PBA® Business Analysis',
    category: 'Business Analysis',
    badge: 'PMI Authorized',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    description:
      'Master business analysis tools, requirements traceability, needs assessment, and solution evaluation to earn the PMI-PBA® credential.',
    highlights: [
      '35 Contact Hours Certificate for PMI-PBA Application',
      'Coverage of 5 BA Domains (Needs Assessment, Planning, Analysis, Traceability, Evaluation)',
      '1-on-1 Application Form Writing Assistance',
    ],
    skills: ['Requirements Elicitation & Modeling', 'Traceability Matrix & Scope Validation', 'Solution Assessment'],
    duration: '35 Contact Hours',
    rating: 4.7,
    students: 820,
    priceUSD: 499,
    upcoming: [{ date: 'Sep 14 - Sep 22, 2026', time: 'Weekend Batch (7:00 PM - 11:00 PM IST)', mode: 'Live Virtual' }],
  },
  {
    id: 'pgmp',
    slug: 'pgmp-program-management-professional',
    title: 'PgMP® Certification (Program Management Professional)',
    shortTitle: 'PgMP® Program Management',
    category: 'Project Management',
    badge: 'PMI Elite Credential',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    description:
      'Elite credential for senior program managers directing multiple related projects to align with strategic business goals.',
    highlights: [
      'Comprehensive Program Strategy & Governance Coverage',
      'Panel Application Evaluation & Audit Support',
      'Advanced Risk & Benefits Management Framework',
    ],
    skills: ['Program Life Cycle Management', 'Strategic Program Alignment', 'Benefits Realization Management'],
    duration: '30 Contact Hours',
    rating: 4.9,
    students: 610,
    priceUSD: 799,
    upcoming: [{ date: 'Sep 21 - Sep 29, 2026', time: 'Weekend Batch (8:00 PM - 11:00 PM IST)', mode: 'Live Virtual' }],
  },
  {
    id: 'itil4',
    slug: 'itil-4-foundation-certification',
    title: 'ITIL® 4 Foundation Certification',
    shortTitle: 'ITIL® 4 Foundation',
    category: 'Cloud & ITIL',
    badge: 'PeopleCert Accredited',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    description:
      'Understand modern IT service management, Service Value System (SVS), and 34 ITIL management practices.',
    highlights: [
      'Includes Official PeopleCert Exam Voucher & E-Book',
      '16 Hours Live Virtual Training by Accredited ITIL Trainer',
      'Sample Exam Papers & Practice Tests',
    ],
    skills: ['IT Service Management (ITSM)', 'Service Value Chain', 'Continual Improvement Model'],
    duration: '16 Hours',
    rating: 4.8,
    students: 1530,
    priceUSD: 349,
    upcoming: [{ date: 'Sep 07 - Sep 08, 2026', time: 'Weekend (10:00 AM - 4:00 PM IST)', mode: 'Live Virtual' }],
  },
  {
    id: 'aws-sa',
    slug: 'aws-certified-solutions-architect',
    title: 'AWS Certified Solutions Architect - Associate',
    shortTitle: 'AWS Solutions Architect',
    category: 'Cloud & ITIL',
    badge: 'AWS Partner Training',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    description:
      'Architect resilient, high-performing, secure, and cost-optimized infrastructure on Amazon Web Services cloud platform.',
    highlights: [
      '32 Hours Live Hands-on Cloud Virtual Labs',
      'AWS EC2, S3, RDS, VPC, IAM & Serverless Architecture',
      'Full Practice Exams & Exam Voucher Mentorship',
    ],
    skills: ['Cloud Infrastructure Design', 'Security & Compliance', 'Cost Optimization'],
    duration: '32 Hours',
    rating: 4.9,
    students: 1680,
    priceUSD: 449,
    upcoming: [{ date: 'Sep 14 - Sep 22, 2026', time: 'Weekend Batch (7:00 PM - 11:00 PM IST)', mode: 'Live Virtual' }],
  },
]

export const jobListings = [
  {
    id: 'pmp-instructor',
    title: 'PMP® Authorized Lead Instructor',
    department: 'Training & Delivery',
    location: 'Remote / Indore HQ',
    type: 'Full-time / Part-time',
    experience: 'PMP® Certified, 10+ Years Corporate Experience',
    description:
      'Deliver high-energy live virtual PMP training cohorts, mentor candidates through PMP application submission, and conduct exam strategy sessions.',
  },
  {
    id: 'agile-trainer',
    title: 'Certified Scrum Trainer (CST) / Agile Coach',
    department: 'Training & Delivery',
    location: 'Remote',
    type: 'Contract',
    experience: 'CST® or SPC 6.0 Accreditation required',
    description:
      'Facilitate Scrum Alliance CSM/CSPO or SAFe 6.0 Agilist workshops with interactive simulations and real-world sprint activities.',
  },
  {
    id: 'learning-counselor',
    title: 'Senior Academic Counselor / Learner Advisor',
    department: 'Sales & Support',
    location: 'Indore HQ (On-site)',
    type: 'Full-time',
    experience: '2-5 Years EdTech Counseling Experience',
    description:
      'Guide IT professionals and corporate managers in selecting appropriate certification roadmaps based on their career goals.',
  },
]

export const sampleCertificates = [
  {
    id: 'EZ-8849-PMP',
    studentName: 'Aditya Patel',
    courseName: 'PMP® Certification Training (Project Management Professional)',
    issueDate: 'August 02, 2026',
    credentialId: 'EZ-8849-PMP',
    status: 'Verified & Active',
    pdu: '35 Contact Hours',
    instructor: 'Ezycertify Academic Board',
  },
  {
    id: 'EZ-9921-CSM',
    studentName: 'Neha Sharma',
    courseName: 'Certified ScrumMaster® (CSM)',
    issueDate: 'July 18, 2026',
    credentialId: 'EZ-9921-CSM',
    status: 'Verified & Active',
    pdu: '16 SEUs / PDUs',
    instructor: 'Certified Scrum Trainer (CST®)',
  },
  {
    id: 'EZ-7734-SAFE',
    studentName: 'Naveen Sahani',
    courseName: 'Leading SAFe® 6.0 Certification',
    issueDate: 'June 29, 2026',
    credentialId: 'EZ-7734-SAFE',
    status: 'Verified & Active',
    pdu: '16 PDUs',
    instructor: 'SAFe Practice Consultant (SPC)',
  },
]

export function formatPrice(priceUSD, currencyCode = 'USD', symbol = '$') {
  const rate = exchangeRates[currencyCode] || 1
  const converted = Math.round(priceUSD * rate)

  if (currencyCode === 'INR') {
    return `${symbol}${converted.toLocaleString('en-IN')}`
  }
  return `${symbol}${converted.toLocaleString('en-US')}`
}

export function getCourseBySlug(slug) {
  return courses.find((c) => c.slug === slug)
}
