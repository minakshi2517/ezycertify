export const WHATSAPP_NUMBER = '919769110888'
export const PHONE_NUMBER = '+91 97691 10888'
export const ADDRESS_TEXT = '5th Floor, 504, Shagun Arcade, near Apna Sweets, PU 4, Near Vijay Nagar Square, Vijay Nagar, Scheme No.54, Ratna Lok Colony, Indore, Madhya Pradesh 452010'
export const EMAIL_ADDRESS = 'info@ezycertify.com'

export const languages = [
  { code: 'en-US', label: 'English (US)', flag: '🇺🇸', currency: 'USD', symbol: '$', locale: 'en-US' },
  { code: 'en-GB', label: 'English (UK)', flag: '🇬🇧', currency: 'GBP', symbol: '£', locale: 'en-GB' },
  { code: 'en-IN', label: 'English (India)', flag: '🇮🇳', currency: 'INR', symbol: '₹', locale: 'hi-IN' },
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
  { name: 'PMI Premier Authorized Partner', id: 'pmi', text: 'PMI® Premier ATP' },
  { name: 'Scrum Alliance REP', id: 'scrum-alliance', text: 'Scrum Alliance®' },
  { name: 'Scaled Agile Silver Partner', id: 'scaled-agile', text: 'SAFe® 6.0 Partner' },
  { name: 'PeopleCert ITIL Partner', id: 'peoplecert', text: 'PeopleCert® ITIL®' },
  { name: 'AWS Training Partner', id: 'aws', text: 'AWS Cloud Partner' },
]

export const globalFortuneCompanies = [
  'Microsoft', 'Amazon Web Services', 'Deloitte', 'IBM', 'Accenture', 'Capgemini', 'TCS', 'Infosys', 'Cognizant', 'Wipro'
]

export const globalTimezones = [
  { code: 'US-EST', label: 'US East (EST / UTC-5)', region: 'North America' },
  { code: 'US-PST', label: 'US Pacific (PST / UTC-8)', region: 'North America' },
  { code: 'UK-GMT', label: 'UK & Europe (GMT / BST)', region: 'Europe' },
  { code: 'UAE-GST', label: 'Middle East (GST / UTC+4)', region: 'Middle East' },
  { code: 'IN-IST', label: 'India & South Asia (IST / UTC+5:30)', region: 'Asia' },
  { code: 'AUS-AEST', label: 'Australia & NZ (AEST / UTC+10)', region: 'Asia-Pacific' },
]

export const courses = [
  {
    id: 'pmp',
    slug: 'pmp-certification',
    title: 'PMP® Certification Training (Project Management Professional)',
    shortTitle: 'PMP® Certification',
    badge: 'Best Seller',
    category: 'Project Management',
    priceUSD: 499,
    rating: 4.9,
    reviewsCount: 1840,
    duration: '35 Contact Hours / PDUs',
    format: 'Live Virtual Classroom & Self-Paced',
    nextBatch: 'Saturday, Aug 15 (Weekend Batch)',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80&auto=format&fit=crop',
    description: 'Master the PMBOK® Guide 7th Edition and Exam Content Outline (ECO). Get 35 contact hours, 1-on-1 application support, and 2500+ realistic practice exam questions.',
    overview: 'The PMP® credential is the gold standard in project management recognized across 200+ countries. Ezycertify’s PMP program is aligned with iZenBridge’s world-class curriculum, combining live virtual sessions by PMI Authorized Trainers with 100% application approval assistance.',
    highlights: [
      '35 Contact Hours Certificate (PMI Requirement)',
      '100% Guaranteed PMP Application Audit Defense',
      '2,500+ Practice Exam Questions with Simulator',
      '8 Full-Length Mock Exams with Performance Analytics',
      'PMBOK® 7th Edition & Process Group Practice Guide',
      '100% Pass Guarantee with Retake Assistance',
    ],
    curriculum: [
      { module: 'Module 1: Creating a High-Performing Team', topics: ['Build a Team', 'Define Team Ground Rules', 'Empower Team Members', 'Train Team Members & Stakeholders'] },
      { module: 'Module 2: Starting & Planning the Project', topics: ['Determine Project Methodology', 'Plan & Manage Scope, Budget & Schedule', 'Manage Quality of Deliverables', 'Integrate Project Activities'] },
      { module: 'Module 3: Doing the Work (Executing)', topics: ['Assess & Manage Risks', 'Engage Stakeholders', 'Create Project Artifacts', 'Manage Project Changes & Issues'] },
      { module: 'Module 4: Keeping the Team on Track', topics: ['Lead a Team', 'Support Team Performance', 'Address & Remove Impediments', 'Manage Conflict'] },
      { module: 'Module 5: Business Environment', topics: ['Plan & Manage Project Compliance', 'Evaluate Project Benefits & Value', 'Address External Business Changes'] },
    ],
  },
  {
    id: 'csm',
    slug: 'csm-certification',
    title: 'Certified ScrumMaster® (CSM) Training',
    shortTitle: 'Certified ScrumMaster® (CSM)',
    badge: 'Popular',
    category: 'Agile & Scrum',
    priceUSD: 399,
    rating: 4.9,
    reviewsCount: 1420,
    duration: '16 Hours (2-Day Live Workshop)',
    format: 'Live Virtual Workshop by CST®',
    nextBatch: 'Sunday, Aug 16 (Live Virtual)',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80&auto=format&fit=crop',
    description: 'Earn your official CSM® credential from Scrum Alliance®. Taught directly by Certified Scrum Trainers (CST®) with 2-year Scrum Alliance membership.',
    overview: 'Become a highly effective Scrum Master. Learn Scrum values, artifact transparency, sprint planning, retrospective facilitation, and how to resolve team impediments.',
    highlights: [
      'Official Scrum Alliance® CSM® Certification',
      'Taught live by Certified Scrum Trainer (CST®)',
      'Includes Scrum Alliance® 2-Year Membership & Exam Fee',
      '16 SEUs / PDUs towards PMI credential maintenance',
      'Interactive Case Studies & Real-World Simulations',
    ],
    curriculum: [
      { module: 'Module 1: Scrum Foundations & Agile Manifesto', topics: ['Agile Values & Principles', 'Scrum Framework Overview', 'Empirical Process Control'] },
      { module: 'Module 2: Scrum Roles & Responsibilities', topics: ['The Scrum Master Role', 'The Product Owner Role', 'The Developers Role'] },
      { module: 'Module 3: Scrum Events & Artifacts', topics: ['Sprint Planning & Daily Scrum', 'Sprint Review & Retrospective', 'Product & Sprint Backlog'] },
      { module: 'Module 4: Coaching & Facilitation', topics: ['Removing Blockers', 'Servant Leadership', 'Passing the CSM® Exam'] },
    ],
  },
  {
    id: 'safe-agilist',
    slug: 'leading-safe-certification',
    title: 'Leading SAFe® 6.0 Certification (SAFe® Agilist)',
    shortTitle: 'Leading SAFe® 6.0',
    badge: 'Enterprise',
    category: 'Scaled Agile (SAFe)',
    priceUSD: 549,
    rating: 4.8,
    reviewsCount: 980,
    duration: '16 Hours (2-Day Live Workshop)',
    format: 'Live Virtual Workshop by SPC®',
    nextBatch: 'Saturday, Aug 22 (Weekend)',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80&auto=format&fit=crop',
    description: 'Lead enterprise Agile transformations with SAFe® 6.0. Learn to align teams, run Program Increment (PI) planning, and execute Agile Release Trains (ARTs).',
    overview: 'Leading SAFe® 6.0 prepares leaders to scale Agile across large enterprise organizations. Gain the knowledge to drive Lean-Agile mindset, execute PI planning, and coordinate value streams.',
    highlights: [
      'Official Scaled Agile SAFe® 6.0 Agilist Certification',
      'Includes 1-Year Scaled Agile Community Membership',
      'Taught by SAFe® Practice Consultant (SPC®)',
      '16 PDUs / SEUs for credential renewal',
      'Hands-on PI Planning Simulation',
    ],
    curriculum: [
      { module: 'Module 1: Thriving in the Digital Age', topics: ['Business Agility', 'SAFe Core Competencies', 'Lean-Agile Leadership'] },
      { module: 'Module 2: Becoming a Lean-Agile Leader', topics: ['SAFe House of Lean', 'Agile Manifesto at Scale', 'Core Values'] },
      { module: 'Module 3: Establishing Team & Technical Agility', topics: ['Agile Release Trains (ARTs)', 'Cross-Functional Teams', 'Design Thinking'] },
      { module: 'Module 4: Experiencing Program Increment (PI) Planning', topics: ['PI Planning Preparation', 'Simulating PI Planning', 'Finalizing Plans'] },
    ],
  },
  {
    id: 'cspo',
    slug: 'cspo-certification',
    title: 'Certified Scrum Product Owner® (CSPO) Training',
    shortTitle: 'Certified Scrum Product Owner® (CSPO)',
    badge: 'High Demand',
    category: 'Agile & Scrum',
    priceUSD: 449,
    rating: 4.9,
    reviewsCount: 860,
    duration: '16 Hours (2-Day Workshop)',
    format: 'Live Virtual Workshop by CST®',
    nextBatch: 'Saturday, Aug 29 (Weekend)',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80&auto=format&fit=crop',
    description: 'Drive maximum product value with CSPO® certification from Scrum Alliance®. Learn backlog prioritization, stakeholder alignment, and product visioning.',
    overview: 'Master the Product Owner role. Learn customer discovery, user story mapping, release planning, and how to maximize Return on Investment (ROI) for Agile products.',
    highlights: [
      'Official Scrum Alliance® CSPO® Credential',
      'No Exam Required (Earned via Active Workshop Participation)',
      'Taught by Certified Scrum Trainer (CST®)',
      '2-Year Scrum Alliance® Membership Included',
      '16 SEUs / PDUs Accredited',
    ],
    curriculum: [
      { module: 'Module 1: Product Owner Fundamentals', topics: ['PO Mindset', 'Product Vision & Strategy', 'Value Driven Development'] },
      { module: 'Module 2: Managing Stakeholders & Customers', topics: ['User Persona Creation', 'Customer Discovery', 'Managing Expectations'] },
      { module: 'Module 3: Product Backlog Management', topics: ['User Story Mapping', 'Backlog Refinement', 'Prioritization Frameworks (WSJF, MoSCoW)'] },
    ],
  },
  {
    id: 'pmi-acp',
    slug: 'pmi-acp-certification',
    title: 'PMI-ACP® Certification Training (Agile Certified Practitioner)',
    shortTitle: 'PMI-ACP® Agile Practitioner',
    badge: 'Trending',
    category: 'Project Management',
    priceUSD: 429,
    rating: 4.8,
    reviewsCount: 740,
    duration: '21 Contact Hours / PDUs',
    format: 'Live Virtual & Self-Paced',
    nextBatch: 'Saturday, Sep 05 (Weekend)',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80&auto=format&fit=crop',
    description: 'Cover Scrum, Kanban, Lean, XP, and FDD in one master PMI-ACP® certification. Includes 21 contact hours and 1500+ practice questions.',
    overview: 'The PMI-ACP® validates your expertise across all major Agile frameworks. Learn adaptive planning, value-driven delivery, team performance, and continuous improvement.',
    highlights: [
      '21 Contact Hours Certificate (PMI Required)',
      'Covers Scrum, Kanban, XP, Lean & SAFe',
      '1,500+ Realistic Practice Questions',
      '1-on-1 Application Draft Assistance',
    ],
    curriculum: [
      { module: 'Domain 1: Agile Principles & Mindset', topics: ['Manifesto & Principles', 'Leadership Styles', 'Psychological Safety'] },
      { module: 'Domain 2: Value-Driven Delivery', topics: ['Minimum Viable Product (MVP)', 'Kano Model', 'Earned Value in Agile'] },
      { module: 'Domain 3: Stakeholder Engagement', topics: ['Information Radiators', 'Collaborative Games', 'Active Listening'] },
    ],
  },
  {
    id: 'pmi-pba',
    slug: 'pmi-pba-certification',
    title: 'PMI-PBA® Certification (Professional in Business Analysis)',
    shortTitle: 'PMI-PBA® Business Analysis',
    badge: 'Specialized',
    category: 'Business Analysis',
    priceUSD: 499,
    rating: 4.8,
    reviewsCount: 610,
    duration: '35 Contact Hours / PDUs',
    format: 'Live Virtual Classroom',
    nextBatch: 'Sunday, Sep 06 (Weekend)',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop',
    description: 'Master business analysis, requirements elicitation, and stakeholder management. Aligned with PMI-PBA® handbook and PMBOK® Guide.',
    overview: 'PMI-PBA® is the gold standard credential for Business Analysts, Product Managers, and Systems Analysts who define requirements and drive project value.',
    highlights: [
      '35 Contact Hours Certificate',
      'Covers Needs Assessment, Planning, Analysis, Traceability & Evaluation',
      'Application Draft Review & Audit Support',
    ],
    curriculum: [
      { module: 'Domain 1: Needs Assessment', topics: ['Identify Problem/Opportunity', 'Develop Business Case', 'Assess Capability Gaps'] },
      { module: 'Domain 2: Business Analysis Planning', topics: ['Conduct Stakeholder Analysis', 'Establish Traceability Matrix', 'Plan Requirements Elicitation'] },
    ],
  },
  {
    id: 'pgmp',
    slug: 'pgmp-certification',
    title: 'PgMP® Certification Training (Program Management Professional)',
    shortTitle: 'PgMP® Program Management',
    badge: 'Executive',
    category: 'Project Management',
    priceUSD: 899,
    rating: 4.9,
    reviewsCount: 420,
    duration: '24 Contact Hours / PDUs',
    format: 'Live Virtual Masterclass',
    nextBatch: 'Saturday, Sep 12 (Weekend)',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80&auto=format&fit=crop',
    description: 'For senior project leaders & directors. Learn multi-project program strategy, benefit realization, and governance.',
    overview: 'PgMP® is PMI’s elite certification for executives overseeing complex multi-project strategic programs.',
    highlights: [
      'Mastery of Program Life Cycle & Strategic Alignment',
      'Panel Review Application Essay Coaching Included',
      '1-on-1 Mentorship with Certified PgMP® Practitioners',
    ],
    curriculum: [
      { module: 'Domain 1: Program Strategic Alignment', topics: ['Program Roadmap', 'Business Case', 'Organizational Strategy'] },
    ],
  },
  {
    id: 'itil4',
    slug: 'itil-4-foundation',
    title: 'ITIL® 4 Foundation Certification Training',
    shortTitle: 'ITIL® 4 Foundation',
    badge: 'IT Standard',
    category: 'IT Service Management',
    priceUSD: 349,
    rating: 4.7,
    reviewsCount: 1150,
    duration: '16 Hours (Live Virtual)',
    format: 'Live Virtual & Exam Voucher',
    nextBatch: 'Saturday, Sep 19 (Weekend)',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80&auto=format&fit=crop',
    description: 'Master IT Service Management (ITSM), Service Value System (SVS), and 34 ITIL practices. Includes official PeopleCert® exam voucher.',
    overview: 'ITIL® 4 Foundation introduces the modern IT Service Management framework for digital operating models.',
    highlights: [
      'Official PeopleCert® Exam Voucher Included',
      'Covers 4 Dimensions of Service Management',
      '16 PDUs / CPEs accredited',
    ],
    curriculum: [
      { module: 'Module 1: Service Management Key Concepts', topics: ['Value Co-Creation', 'Service Relationships', 'Four Dimensions'] },
    ],
  },
  {
    id: 'aws-sa',
    slug: 'aws-solutions-architect',
    title: 'AWS Certified Solutions Architect – Associate (SAA-C03)',
    shortTitle: 'AWS Solutions Architect',
    badge: 'Cloud Leader',
    category: 'Cloud Computing',
    priceUSD: 399,
    rating: 4.9,
    reviewsCount: 1680,
    duration: '36 Hours Live Training',
    format: 'Live Virtual Labs & Theory',
    nextBatch: 'Sunday, Sep 20 (Weekend)',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80&auto=format&fit=crop',
    description: 'Design resilient, high-performing, secure, and cost-optimized architectures on AWS Cloud. Includes 50+ hands-on AWS console labs.',
    overview: 'Pass your AWS SAA-C03 exam on first try. Learn EC2, S3, VPC, IAM, RDS, Serverless Lambda, and microservices architecture.',
    highlights: [
      '50+ Hands-on AWS Console Lab Exercises',
      '3 Full-Length AWS Practice Simulator Exams',
      'Architecture Case Studies & Migration Blueprints',
    ],
    curriculum: [
      { module: 'Module 1: Designing Resilient Architectures', topics: ['Multi-AZ Deployments', 'Auto Scaling & Load Balancing', 'Decoupled Architectures'] },
    ],
  },
]

export const jobListings = [
  {
    id: 'pmp-instructor',
    title: 'Senior PMP® & Project Management Trainer',
    department: 'Training & Delivery',
    location: 'Remote / Virtual',
    type: 'Part-Time / Full-Time',
    experience: 'Active PMP® holder with 10+ yrs PM experience & 3+ yrs corporate training',
    description: 'Deliver engaging live virtual PMP® exam prep cohorts, mentor candidates on PMBOK® 7th Ed, and conduct Q&A bootcamps.',
  },
  {
    id: 'agile-coach',
    title: 'Certified Scrum Trainer (CST®) / SAFe® SPC Consultant',
    department: 'Training & Delivery',
    location: 'Remote / Virtual',
    type: 'Cohort-Based Contract',
    experience: 'Official CST® or SAFe® SPC 6.0 credential holder with enterprise workshop experience',
    description: 'Facilitate 2-day live CSM®, CSPO®, or Leading SAFe® 6.0 certification workshops for global enterprise participants.',
  },
  {
    id: 'academic-advisor',
    title: 'Senior Academic & PMP Counselor',
    department: 'Student Success',
    location: 'Hybrid (Indore / Remote)',
    type: 'Full-Time',
    experience: '2+ yrs experience in EdTech counseling, candidate application review, or sales enablement',
    description: 'Guide prospective candidates in selecting the right certification pathway, review PMP eligibility profiles, and assist with batch registrations.',
  },
]

export const enterpriseServices = [
  {
    title: 'Custom Corporate Cohorts',
    desc: 'Private weekend or weekday training cohorts tailored to your company’s internal project methodologies and tools.',
    icon: '🏢'
  },
  {
    title: 'Bulk Seat Licensing & Volume Discounts',
    desc: 'Save up to 35% on multi-seat enrollments across PMP®, Scrum, SAFe®, and Cloud architecture courses.',
    icon: '🎟️'
  },
  {
    title: 'Enterprise Analytics Dashboard',
    desc: 'Track employee attendance, mock exam scores, pass rates, and PDU certifications in real-time.',
    icon: '📊'
  },
  {
    title: '1-on-1 Executive Application Mentorship',
    desc: 'Direct white-glove assistance for senior managers writing PMI PMP®/PgMP® project experience descriptions.',
    icon: '👔'
  }
]

export const careerPathQuizQuestions = [
  {
    id: 1,
    question: 'What is your current or target career role?',
    options: [
      { label: 'Project Manager / Team Lead', path: 'pmp' },
      { label: 'Scrum Master / Agile Developer', path: 'csm' },
      { label: 'Enterprise Agile Leader / Director', path: 'safe-agilist' },
      { label: 'Product Manager / Business Analyst', path: 'cspo' },
    ]
  },
  {
    id: 2,
    question: 'What is your primary goal for taking certification?',
    options: [
      { label: 'Earn global gold-standard credential for career growth', path: 'pmp' },
      { label: 'Master Agile/Scrum team facilitation skills', path: 'csm' },
      { label: 'Scale Agile across large multi-team enterprises', path: 'safe-agilist' },
      { label: 'Improve requirements elicitation & product ROI', path: 'cspo' },
    ]
  }
]

export const pmpSampleQuiz = [
  {
    id: 1,
    question: 'During a project sprint, a key stakeholder requests a significant scope change directly to a developer. What should the project manager or Scrum Master instruct the developer to do?',
    options: [
      'Implement the change immediately to keep the stakeholder happy.',
      'Refuse to talk to the stakeholder and escalate to the project sponsor.',
      'Direct the stakeholder to discuss the request with the Product Owner for backlog evaluation.',
      'Document the change in the issue log and proceed with current sprint tasks.'
    ],
    correctAnswer: 2,
    explanation: 'In Agile and Scrum frameworks, scope changes and feature requests must be evaluated and prioritized by the Product Owner before being added to the Product Backlog.'
  },
  {
    id: 2,
    question: 'A project team is distributed across three continents. Which artifact or practice best ensures transparent status visibility and impediment tracking?',
    options: [
      'Sending weekly individual status emails to the project manager.',
      'Using a shared digital Kanban / Information Radiator updated during Daily Standups.',
      'Holding a 3-hour weekly status meeting with all team members.',
      'Creating a static Gantt chart updated once a month.'
    ],
    correctAnswer: 1,
    explanation: 'Information Radiators (like digital Kanban boards) visible to all team members ensure real-time transparency and continuous impediment tracking across distributed teams.'
  },
  {
    id: 3,
    question: 'A high-priority risk identified in the Risk Register occurs during project execution. What is the VERY FIRST action the project manager should take?',
    options: [
      'Call an emergency meeting with all project sponsors.',
      'Execute the pre-approved Risk Response Plan documented in the Risk Register.',
      'Request an immediate increase to the management contingency reserve.',
      'Update the project schedule to add a 2-week buffer.'
    ],
    correctAnswer: 1,
    explanation: 'When an identified risk occurs, the project manager should immediately execute the planned and pre-approved risk response strategy documented in the Risk Register.'
  }
]

export const courseCategories = [
  'All',
  'Project Management',
  'Agile & Scrum',
  'Scaled Agile (SAFe)',
  'Business Analysis',
  'IT Service Management',
  'Cloud Computing'
]

export const testimonials = [
  {
    name: 'Aditya Patel',
    role: 'PMP® Certified • Senior Project Manager at Deloitte',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80&auto=format&fit=crop',
    text: 'Ezycertify made my PMP journey completely stress-free. The iZenBridge-aligned mock exam simulator and 1-on-1 application review ensured my application got approved without an audit and I cleared the exam with Above Target in all 3 domains!'
  },
  {
    name: 'Neha Sharma',
    role: 'CSM® Certified • Agile Delivery Lead at Accenture',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80&auto=format&fit=crop',
    text: 'The Scrum Alliance CSM workshop with Certified Scrum Trainer was phenomenal. Interactive simulations, real-life sprint planning exercises, and clear conceptual clarity.'
  },
  {
    name: 'Naveen Sahani',
    role: 'SAFe® 6.0 Agilist • Enterprise Architect at Capgemini',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&auto=format&fit=crop',
    text: 'Leading SAFe 6.0 training at Ezycertify gave me the exact tools to run Program Increment (PI) planning for a 120-person engineering team. Passed the SAFe Agilist exam on first try!'
  }
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
