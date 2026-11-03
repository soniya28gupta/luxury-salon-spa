import { 
  SpaService, 
  MasterStylist, 
  GoogleReview, 
  Appointment, 
  Branch, 
  ComboPackage, 
  MembershipTier, 
  PromotionalOffer, 
  AcademyCourse,
  ConsultationBooking,
  HomeServiceBooking,
  CustomerProfile,
  ClientMembership
} from '../types';

export const BRANCHES: Branch[] = [
  {
    id: 'BR-01',
    name: 'The Penthouse Sanctuary (Flagship)',
    tagline: 'High-Fashion & Dermal Couture',
    address: 'Level 14, 28 Crescent Road, High Street',
    city: 'Mumbai',
    pinCode: '400001',
    phone: '+91 22 4890 1200',
    serviceRadiusKm: 15, // Configurable from Admin
    openingHours: '09:00 AM – 09:30 PM (Daily)',
    coordinates: { lat: 18.9220, lng: 72.8347 }
  },
  {
    id: 'BR-02',
    name: 'Bandra Waterfront Suite',
    tagline: 'Balinese Hydrotherapy & Coiffure',
    address: 'Carter Road Promenade, Bandra West',
    city: 'Mumbai',
    pinCode: '400050',
    phone: '+91 22 4890 1250',
    serviceRadiusKm: 15,
    openingHours: '09:30 AM – 09:00 PM (Daily)',
    coordinates: { lat: 19.0657, lng: 72.8270 }
  },
  {
    id: 'BR-03',
    name: 'Indiranagar Royal Pavilion',
    tagline: 'Holistic Ayurveda & Dermal Spa',
    address: '100 Feet Road, HAL 2nd Stage, Indiranagar',
    city: 'Bengaluru',
    pinCode: '560038',
    phone: '+91 80 4120 7700',
    serviceRadiusKm: 15,
    openingHours: '09:00 AM – 09:00 PM (Daily)',
    coordinates: { lat: 12.9784, lng: 77.6408 }
  }
];

export const SPA_SERVICES: SpaService[] = [
  // Original Signature Rituals preserved exactly
  {
    id: 'SRV-001',
    name: '24K Gold Cellular Renewal Facial',
    category: 'Facial Couture',
    durationMinutes: 90,
    price: 8500,
    description: 'An opulent cellular revitalizing ritual using sheets of genuine 24-karat gold leaf, hyaluronic ultrasound infusion, and bio-placenta botanical peptides to restore youthfulness and ethereal luminosity.',
    benefits: ['Stimulates collagen production', 'Deeply hydrates and plumps skin', 'Instant red-carpet glow', 'Reduces fine lines'],
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop&q=80',
    highlights: 'Signature Red-Carpet Treatment',
    homeServiceEligible: true,
    consultationRequired: false,
    membershipDiscountEligible: true,
    offerEligible: true,
    assignedStylistIds: ['STY-002', 'STY-004']
  },
  {
    id: 'SRV-002',
    name: 'Haute Balayage Couture & Caviar Hair Ritual',
    category: 'Haute Coiffure',
    durationMinutes: 120,
    price: 9800,
    description: 'Hand-painted Parisian balayage customized to your facial architecture and skin undertones, followed by a deeply restorative Kérastase Chronologiste caviar bead reconstructive hair mask.',
    benefits: ['Bespoke multidimensional color', 'Intense cuticle repair & glass shine', 'Precision master haircut & blowdry'],
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=80',
    highlights: 'Master Stylist Exclusive',
    homeServiceEligible: false,
    consultationRequired: true,
    membershipDiscountEligible: false,
    offerEligible: true,
    assignedStylistIds: ['STY-001']
  },
  {
    id: 'SRV-003',
    name: 'Royal Moroccan Hammam & Cedar Steam',
    category: 'Hammam & Hydrotherapy',
    durationMinutes: 75,
    price: 6500,
    description: 'Ancient purification on a heated marble slab with organic eucalyptus Savon Noir, traditional Kessa glove exfoliation, rhassoul volcanic clay body cocoon, and fragrant cedar steam.',
    benefits: ['Complete full-body detoxification', 'Velvety skin texture', 'Relieves tension & stress', 'Improves circulation'],
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&auto=format&fit=crop&q=80',
    highlights: 'Heated Marble Sanctuary',
    homeServiceEligible: false,
    consultationRequired: false,
    membershipDiscountEligible: true, // Eligible for 50% Member Benefit
    offerEligible: true,
    assignedStylistIds: ['STY-003']
  },
  {
    id: 'SRV-004',
    name: 'Chakra Balancing Warm Volcanic Stone Ritual',
    category: 'Chakra Massages',
    durationMinutes: 90,
    price: 5900,
    description: 'Sublime heated basalt stones arranged along energetic meridians with warm cold-pressed organic sesame, sacred frankincense, and lavender essence, harmonizing body and spirit.',
    benefits: ['Dissolves deep chronic muscle tension', 'Chakra energy re-alignment', 'Profound relaxation & sleep quality'],
    imageUrl: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&auto=format&fit=crop&q=80',
    highlights: 'Holistic Bodywork',
    homeServiceEligible: true,
    consultationRequired: false,
    membershipDiscountEligible: true, // Eligible for 50% Member Benefit
    offerEligible: true,
    assignedStylistIds: ['STY-003']
  },
  {
    id: 'SRV-005',
    name: 'Sovereign Bridal Empress Suite Experience',
    category: 'Bridal Suites',
    durationMinutes: 240,
    price: 24000,
    description: 'Private penthouse VIP suite reservation with personalized gold facial, silk body wrap, bridal hair couture trial, airbrush makeup, sensory foot spa, and Dom Pérignon champagne service.',
    benefits: ['Private luxury penthouse suite access', 'Dedicated two-therapist team', 'Full couture prep & photography readiness'],
    imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&auto=format&fit=crop&q=80',
    highlights: 'Private Penthouse VIP',
    homeServiceEligible: false,
    consultationRequired: true,
    membershipDiscountEligible: false,
    offerEligible: false,
    assignedStylistIds: ['STY-001', 'STY-004']
  },
  {
    id: 'SRV-006',
    name: 'Gentleman’s Royal Barber & Executive Beard Sculpt',
    category: 'Haute Coiffure',
    durationMinutes: 60,
    price: 3200,
    description: 'Hot towel infused with sandalwood oil, straight-razor precision shave, organic beard conditioning mask, charcoal pore cleanse, and neck & shoulder acupressure.',
    benefits: ['Flawless precision fade & beard contour', 'Ingrown prevention', 'Executive refreshed appearance'],
    imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80',
    highlights: 'Gentleman Elite',
    homeServiceEligible: true,
    consultationRequired: false,
    membershipDiscountEligible: true, // Eligible for 50% Member Benefit
    offerEligible: true,
    assignedStylistIds: ['STY-001']
  },

  // Expanded Complete Unisex Catalogue
  {
    id: 'SRV-007',
    name: 'Keratin Protein Reconstruction & Silk Finish',
    category: 'Hair',
    durationMinutes: 120,
    price: 6800,
    description: 'Infusion of bio-identical amino acids and liquid keratin into damaged porous hair shafts, eliminating frizzy texture and infusing diamond mirror shine for up to 16 weeks.',
    benefits: ['Zero frizz in humid weather', 'Restores heat & chemical damage', 'Silky, fluid movement'],
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
    highlights: 'Anti-Frizz Master Treatment',
    homeServiceEligible: false,
    consultationRequired: true,
    membershipDiscountEligible: true,
    offerEligible: true,
    assignedStylistIds: ['STY-001']
  },
  {
    id: 'SRV-008',
    name: 'Precision Director Haircut & Scalp Detox',
    category: 'Hair',
    durationMinutes: 45,
    price: 1800,
    description: 'Custom anatomical consultation, clarifying tea tree scalp scrub wash, master scissor sculpt, and blowout styling with luxury French finishing elixir.',
    benefits: ['Tailored to face structure', 'Exfoliates micro-buildup', 'Effortless everyday styling'],
    imageUrl: 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=800&auto=format&fit=crop&q=80',
    highlights: 'Artisanal Scissor Sculpt',
    homeServiceEligible: true,
    consultationRequired: false,
    membershipDiscountEligible: true, // 50% Member Benefit
    offerEligible: true,
    assignedStylistIds: ['STY-001']
  },
  {
    id: 'SRV-009',
    name: 'Hydra-Infusion Botanical Oxygen Facial',
    category: 'Skin',
    durationMinutes: 60,
    price: 4500,
    description: 'Three-stage spiral vacuum dermal infusion with pressurized medical-grade oxygen, peptide cocktail, and soothing botanical chamomile freeze-mask.',
    benefits: ['Painless extraction of blackheads', 'Intense dewy hydration', 'Immediate pore refinement'],
    imageUrl: 'https://images.unsplash.com/photo-1512290900672-1f023330f452?w=800&auto=format&fit=crop&q=80',
    highlights: 'Glass-Skin Dermacology',
    homeServiceEligible: true,
    consultationRequired: false,
    membershipDiscountEligible: true,
    offerEligible: true,
    assignedStylistIds: ['STY-002']
  },
  {
    id: 'SRV-010',
    name: 'Signature Aromatherapy Swedish Relaxation Spa',
    category: 'Spa',
    durationMinutes: 60,
    price: 3800,
    description: 'Long rhythmic effleurage strokes with warm sweet almond, French neroli, and patchouli essential oils easing nervous system tension.',
    benefits: ['Deep somatic tranquility', 'Lymphatic fluid drainage', 'Stress reduction'],
    imageUrl: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&auto=format&fit=crop&q=80',
    highlights: 'Serenity Elixir',
    homeServiceEligible: true,
    consultationRequired: false,
    membershipDiscountEligible: true, // 50% Member Benefit
    offerEligible: true,
    assignedStylistIds: ['STY-003']
  },
  {
    id: 'SRV-011',
    name: 'Organic Silk Body Waxing (Full Arms & Legs)',
    category: 'Grooming',
    durationMinutes: 45,
    price: 2400,
    description: 'Low-temperature organic beeswax and chamomile rosin wax that grips the finest hair without skin tugging, completed with soothing aloe-rose hydrator.',
    benefits: ['Ultra-smooth finish for weeks', 'Hypoallergenic & gentle', 'Reduces ingrown growth'],
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=80',
    highlights: 'Silken Smooth Formulation',
    homeServiceEligible: true,
    consultationRequired: false,
    membershipDiscountEligible: true, // 50% Member Benefit
    offerEligible: true,
    assignedStylistIds: ['STY-004']
  },
  {
    id: 'SRV-012',
    name: 'Russian Gel Couture Manicure & Paraffin Dip',
    category: 'Nails',
    durationMinutes: 60,
    price: 2600,
    description: 'Dry hardware diamond-bit cuticle refinement, keratin nail nourishment, heated peach paraffin hand bath, and 4-week non-chip gel polish.',
    benefits: ['Flawless close-to-cuticle application', 'Intensely softened hand skin', 'High-gloss durable finish'],
    imageUrl: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=800&auto=format&fit=crop&q=80',
    highlights: 'Couture Nail Artistry',
    homeServiceEligible: true,
    consultationRequired: false,
    membershipDiscountEligible: true,
    offerEligible: true,
    assignedStylistIds: ['STY-004']
  }
];

export const MASTER_STYLISTS: MasterStylist[] = [
  {
    id: 'STY-001',
    name: 'Laurent Mercier',
    role: 'Creative Hair Director (Paris / Milan)',
    experienceYears: 16,
    rating: 4.98,
    reviewsCount: 342,
    bio: 'Trained at the prestigious L’Oréal Académie in Paris. Laurent creates effortless Parisian silhouettes, master balayage, and haute couture transformations for international runways.',
    specialties: ['Haute Balayage', 'Precision Cut', 'Caviar Hair Rejuvenation', 'Keratin Reconstruct'],
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    availableDays: ['Mon', 'Tue', 'Thu', 'Fri', 'Sat'],
    branchId: 'BR-01',
    commissionRate: 0.18,
    workingHours: [
      { dayOfWeek: 'Mon', startTime: '10:00', endTime: '19:00', breaks: [{ start: '13:30', end: '14:30', title: 'Lunch & Formulation' }] },
      { dayOfWeek: 'Tue', startTime: '10:00', endTime: '19:00', breaks: [{ start: '13:30', end: '14:30', title: 'Lunch' }] },
      { dayOfWeek: 'Thu', startTime: '10:00', endTime: '19:00', breaks: [{ start: '13:30', end: '14:30', title: 'Lunch' }] },
      { dayOfWeek: 'Fri', startTime: '10:00', endTime: '20:00', breaks: [{ start: '14:00', end: '15:00', title: 'Lunch' }] },
      { dayOfWeek: 'Sat', startTime: '09:30', endTime: '19:30', breaks: [{ start: '13:30', end: '14:30', title: 'Lunch' }] }
    ],
    leaveDates: ['2026-11-15']
  },
  {
    id: 'STY-002',
    name: 'Dr. Elena Rostova',
    role: 'Lead Dermal Biochemist & Aesthetician',
    experienceYears: 14,
    rating: 5.0,
    reviewsCount: 418,
    bio: 'Specialist in non-invasive cellular dermal therapy, lymphatic drainage, and 24K gold nano-particle infusion with 14 years of clinical luxury spa practice.',
    specialties: ['24K Gold Cellular Renewal', 'Hydro-Peptide Therapy', 'Contour Sculpting', 'Skin Consultations'],
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    availableDays: ['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    branchId: 'BR-01',
    commissionRate: 0.20,
    workingHours: [
      { dayOfWeek: 'Tue', startTime: '10:00', endTime: '18:30', breaks: [{ start: '13:00', end: '14:00', title: 'Clinical Prep' }] },
      { dayOfWeek: 'Wed', startTime: '10:00', endTime: '18:30', breaks: [{ start: '13:00', end: '14:00', title: 'Lunch' }] },
      { dayOfWeek: 'Thu', startTime: '10:00', endTime: '18:30', breaks: [{ start: '13:00', end: '14:00', title: 'Lunch' }] },
      { dayOfWeek: 'Fri', startTime: '10:00', endTime: '18:30', breaks: [{ start: '13:00', end: '14:00', title: 'Lunch' }] },
      { dayOfWeek: 'Sat', startTime: '10:00', endTime: '19:00', breaks: [{ start: '13:30', end: '14:30', title: 'Lunch' }] },
      { dayOfWeek: 'Sun', startTime: '11:00', endTime: '17:00', breaks: [{ start: '13:30', end: '14:00', title: 'Break' }] }
    ]
  },
  {
    id: 'STY-003',
    name: 'Somsri Phan',
    role: 'Grand Master of Balinese & Thai Bodywork',
    experienceYears: 20,
    rating: 4.95,
    reviewsCount: 295,
    bio: 'Hailing from Chiang Mai, Somsri brings two decades of traditional temple bodywork and deep tissue heated stone arts that alleviate deep-seated somatic fatigue.',
    specialties: ['Volcanic Hot Stone', 'Royal Hammam Scrub', 'Herbal Poultice Massage', 'Swedish Aromatherapy'],
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    availableDays: ['Mon', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    branchId: 'BR-02',
    commissionRate: 0.16,
    workingHours: [
      { dayOfWeek: 'Mon', startTime: '09:30', endTime: '18:30', breaks: [{ start: '13:00', end: '14:00', title: 'Lunch' }] },
      { dayOfWeek: 'Wed', startTime: '09:30', endTime: '18:30', breaks: [{ start: '13:00', end: '14:00', title: 'Lunch' }] },
      { dayOfWeek: 'Thu', startTime: '09:30', endTime: '18:30', breaks: [{ start: '13:00', end: '14:00', title: 'Lunch' }] },
      { dayOfWeek: 'Fri', startTime: '09:30', endTime: '19:00', breaks: [{ start: '13:00', end: '14:00', title: 'Lunch' }] },
      { dayOfWeek: 'Sat', startTime: '09:30', endTime: '19:00', breaks: [{ start: '13:00', end: '14:00', title: 'Lunch' }] },
      { dayOfWeek: 'Sun', startTime: '10:00', endTime: '18:00', breaks: [{ start: '13:00', end: '14:00', title: 'Lunch' }] }
    ]
  },
  {
    id: 'STY-004',
    name: 'Ananya Deshmukh',
    role: 'Celebrity Makeup & Bridal Stylist',
    experienceYears: 11,
    rating: 4.97,
    reviewsCount: 380,
    bio: 'Vogue India featured bridal artist known for illuminating skins, delicate airbrush blending, and bespoke royal Indian wedding styling.',
    specialties: ['Bridal Empress Suite', 'Red Carpet Glamour', 'Skin Prep Rituals', 'Russian Gel Nails'],
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    availableDays: ['Thu', 'Fri', 'Sat', 'Sun'],
    branchId: 'BR-01',
    commissionRate: 0.20,
    workingHours: [
      { dayOfWeek: 'Thu', startTime: '10:00', endTime: '19:00', breaks: [{ start: '13:30', end: '14:30', title: 'Lunch' }] },
      { dayOfWeek: 'Fri', startTime: '10:00', endTime: '20:00', breaks: [{ start: '14:00', end: '15:00', title: 'Lunch' }] },
      { dayOfWeek: 'Sat', startTime: '09:00', endTime: '20:00', breaks: [{ start: '13:30', end: '14:30', title: 'Lunch' }] },
      { dayOfWeek: 'Sun', startTime: '09:00', endTime: '19:00', breaks: [{ start: '13:30', end: '14:30', title: 'Lunch' }] }
    ]
  }
];

export const COMBO_PACKAGES: ComboPackage[] = [
  {
    id: 'CMB-01',
    name: 'Elysian Glow Signature Combo',
    tagline: 'Hydra-Infusion Facial + Swedish Body Serenity',
    description: 'Indulge in 60 minutes of deep hydra-infusion dermal vacuum cleansing followed by 60 minutes of tension-melting Swedish aromatic body massage.',
    includedServiceIds: ['SRV-009', 'SRV-010'],
    originalPrice: 8300,
    offerPrice: 6600,
    savings: 1700,
    totalDurationMinutes: 120,
    badge: 'Most Popular',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=80',
    active: true
  },
  {
    id: 'CMB-02',
    name: 'Haute Hair Restoration Combo',
    tagline: 'Keratin Reconstruction + Precision Director Cut',
    description: 'Transform stressed or unruly tresses with deep amino keratin peptide fusion, followed by an architectural scissor sculpting session and blowout.',
    includedServiceIds: ['SRV-007', 'SRV-008'],
    originalPrice: 8600,
    offerPrice: 6900,
    savings: 1700,
    totalDurationMinutes: 165,
    badge: 'Best Value',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
    active: true
  },
  {
    id: 'CMB-03',
    name: 'Gentleman’s Executive Grooming Combo',
    tagline: 'Royal Beard Sculpt + Clarifying Scalp Detox',
    description: 'Hot towel sandalwood shave, organic beard mask, neck acupressure, combined with an exfoliating scalp detox and clean executive scissor fade.',
    includedServiceIds: ['SRV-006', 'SRV-008'],
    originalPrice: 5000,
    offerPrice: 3950,
    savings: 1050,
    totalDurationMinutes: 105,
    badge: 'Gentleman Choice',
    imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80',
    active: true
  },
  {
    id: 'CMB-04',
    name: 'Royal Empress Bridal Couture Package',
    tagline: '24K Gold Facial + Bridal Suite + Russian Gel Nails',
    description: 'The ultimate royal couture preparation: full 24K gold cellular renewal, private VIP suite makeup and hair styling trial, and bespoke gel nail manicure.',
    includedServiceIds: ['SRV-001', 'SRV-005', 'SRV-012'],
    originalPrice: 35100,
    offerPrice: 28900,
    savings: 6200,
    totalDurationMinutes: 390,
    badge: 'VIP Exclusive',
    imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&auto=format&fit=crop&q=80',
    active: true
  }
];

export const PROMOTIONAL_OFFERS: PromotionalOffer[] = [
  {
    id: 'OFF-01',
    code: 'FIRSTGLOW',
    title: 'First Sanctuary Visit Welcome Perk',
    description: 'Enjoy ₹1,000 instant savings on any ritual booking above ₹3,500.',
    discountType: 'fixed',
    discountValue: 1000,
    minSpend: 3500,
    validFrom: '2026-01-01',
    validTo: '2026-12-31',
    usageLimit: 500,
    timesUsed: 142,
    memberOnly: false,
    active: true
  },
  {
    id: 'OFF-02',
    code: 'WEEKDAY20',
    title: 'Midweek Elysian Serenity',
    description: '20% off all Spa and Facial rituals scheduled on Tuesdays, Wednesdays, and Thursdays.',
    discountType: 'percentage',
    discountValue: 20,
    minSpend: 4000,
    maxDiscount: 2000,
    validFrom: '2026-01-01',
    validTo: '2026-12-31',
    usageLimit: 300,
    timesUsed: 89,
    memberOnly: false,
    active: true
  },
  {
    id: 'OFF-03',
    code: 'FESTIVE15',
    title: 'Seasonal Haute Celebration',
    description: '15% celebration discount on all Coiffure Balayage and Bridal Couture bookings.',
    discountType: 'percentage',
    discountValue: 15,
    minSpend: 6000,
    maxDiscount: 3500,
    validFrom: '2026-10-01',
    validTo: '2026-12-15',
    usageLimit: 200,
    timesUsed: 64,
    memberOnly: false,
    active: true
  },
  {
    id: 'OFF-04',
    code: 'MEMBERVIP',
    title: 'Exclusive Member Indulgence',
    description: 'Additional ₹1,500 benefit on high-tier luxury packages for active Sanctuary Passholders.',
    discountType: 'fixed',
    discountValue: 1500,
    minSpend: 8000,
    validFrom: '2026-01-01',
    validTo: '2026-12-31',
    usageLimit: 1000,
    timesUsed: 42,
    memberOnly: true,
    active: true
  }
];

export const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: 'TIER-SILVER',
    name: 'Silver Sanctuary Privilege',
    tagline: 'Essential Luxury Wellness',
    annualFee: 14999,
    discountPercentage: 25,
    eligibleServiceIds: ['SRV-008', 'SRV-010', 'SRV-011'], // Explicitly controlled
    perks: [
      '25% OFF on Scissor Sculpt & Swedish Aromatherapy',
      'Complimentary Scalp Detox wash on every visit',
      'Priority waitlist clearance within 4 hours',
      'Digital Sanctuary Card & QR check-in'
    ],
    validityMonths: 12,
    usageLimitPerMonth: 4,
    priorityBooking: true,
    cardColor: 'from-[#8a9ba8] via-[#cfd9df] to-[#6f8291]'
  },
  {
    id: 'TIER-GOLD',
    name: 'Gold Royale Sovereign',
    tagline: '50% Off Selected Body Wax, Spa & Haircut',
    annualFee: 29999,
    discountPercentage: 50,
    // Strict Admin rule: 50% discount applies specifically to selected Body Wax, Spa, and Haircut
    eligibleServiceIds: ['SRV-003', 'SRV-004', 'SRV-006', 'SRV-008', 'SRV-010', 'SRV-011'],
    perks: [
      '50% OFF on Selected Body Waxing, Hammam, Volcanic Spa & Precision Haircuts',
      '1 Free 24K Gold Cellular Renewal Facial per year (Value ₹8,500)',
      'Free Home-Service Concierge dispatch within 15 km',
      'Dom Pérignon Lounge & Valet VIP reservation'
    ],
    validityMonths: 12,
    usageLimitPerMonth: 8,
    priorityBooking: true,
    cardColor: 'from-[#d4af37] via-[#f3e5ab] to-[#aa820a]'
  },
  {
    id: 'TIER-PLATINUM',
    name: 'Sovereign Penthouse Patron',
    tagline: 'Unlimited Bespoke Haute Concierge',
    annualFee: 59999,
    discountPercentage: 50,
    eligibleServiceIds: ['SRV-001', 'SRV-003', 'SRV-004', 'SRV-006', 'SRV-007', 'SRV-008', 'SRV-009', 'SRV-010', 'SRV-011', 'SRV-012'],
    perks: [
      '50% OFF across all signature Spa, Grooming, Haircut and Dermal treatments',
      'Private Penthouse Suite complimentary 2-hour reservation',
      'Dedicated personal Master Curator pairing on-demand',
      'VIP passes for all masterclasses at Aura Academy'
    ],
    validityMonths: 12,
    usageLimitPerMonth: 16,
    priorityBooking: true,
    cardColor: 'from-[#1c1c24] via-[#3a3a46] to-[#0a0a0c]'
  }
];

export const ACADEMY_COURSES: AcademyCourse[] = [
  {
    id: 'ACAD-01',
    title: 'Parisian Balayage & French Coloristry Diploma',
    level: 'Advanced Diploma',
    duration: '8 Weeks (Full Time)',
    fee: 125000,
    syllabusSummary: [
      'Facial architecture and dimensional undertone profiling',
      'French freehand balayage, foliage, and air-touch techniques',
      'Advanced formulation chemistry and gray coverage couture',
      'Runway blowouts, editorial finishing, and digital portfolio creation'
    ],
    trainerName: 'Laurent Mercier',
    trainerRole: 'Creative Hair Director (Paris trained)',
    batchDates: ['Nov 18, 2026', 'Jan 12, 2027', 'Mar 05, 2027'],
    certificationDetails: 'CIDESCO & Aura Haute Coiffure International Certified Diploma',
    seatsRemaining: 4,
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=80',
    active: true
  },
  {
    id: 'ACAD-02',
    title: 'Clinical Dermal Biochemistry & Cellular Aesthetics',
    level: 'Masterclass Certificate',
    duration: '6 Weeks (Intensive)',
    fee: 95000,
    syllabusSummary: [
      'Cellular skin pathology and lipid barrier restoration',
      'Micro-needling, ultrasound infusion & botanical peptide formulation',
      '24-Karat gold nano-leaf application protocols',
      'Client consultation diagnostics & hygienic clinical sanitation'
    ],
    trainerName: 'Dr. Elena Rostova',
    trainerRole: 'Lead Dermal Biochemist',
    batchDates: ['Dec 01, 2026', 'Feb 15, 2027'],
    certificationDetails: 'Aura Sanctuary Dermal Institute Clinical Master Certification',
    seatsRemaining: 6,
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop&q=80',
    active: true
  },
  {
    id: 'ACAD-03',
    title: 'Balinese Temple Bodywork & Moroccan Hammam Arts',
    level: 'Foundation',
    duration: '4 Weeks (Practical Hands-On)',
    fee: 65000,
    syllabusSummary: [
      'Energy meridians, acupressure points, and somatic relaxation',
      'Traditional heated volcanic basalt stone arrangement',
      'Authentic heated marble Hammam eucalyptus scrubbing techniques',
      'Aromatherapy custom blending and therapist ergonomics'
    ],
    trainerName: 'Somsri Phan',
    trainerRole: 'Grand Master of Balinese Arts',
    batchDates: ['Nov 25, 2026', 'Jan 20, 2027'],
    certificationDetails: 'International Holistic Wellness Guild Professional Accreditation',
    seatsRemaining: 5,
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&auto=format&fit=crop&q=80',
    active: true
  },
  {
    id: 'ACAD-04',
    title: 'High-Fashion Bridal Airbrush & Couture Makeup Artistry',
    level: 'Advanced Diploma',
    duration: '6 Weeks (Weekend Masterclass)',
    fee: 85000,
    syllabusSummary: [
      'High-definition airbrush base architecture and contouring',
      'Royal Indian wedding, Western red-carpet & editorial camera looks',
      'Long-wear waterproof sealants and jewelry placement aesthetics',
      'Client psychology, bridal trials, and pricing contracts'
    ],
    trainerName: 'Ananya Deshmukh',
    trainerRole: 'Celebrity Bridal Stylist (Vogue Featured)',
    batchDates: ['Dec 05, 2026', 'Feb 06, 2027'],
    certificationDetails: 'Celebrity Makeup Guild & Aura Bridal Haute Couture Diploma',
    seatsRemaining: 3,
    imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&auto=format&fit=crop&q=80',
    active: true
  }
];

export const INITIAL_CONSULTATIONS: ConsultationBooking[] = [
  {
    id: 'CNS-201',
    code: 'CNS-7410',
    type: 'Hair & Scalp Consultation',
    mode: 'Online Video Consultation',
    clientName: 'Priya Sharma',
    clientPhone: '+91 98111 22334',
    clientEmail: 'priya.s@outlook.com',
    concerns: 'Severe hair breakage post bleaching, thinning near frontal crown area.',
    notes: 'Uploaded photos of scalp. Needs customized peptide recovery routine.',
    photoUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&auto=format&fit=crop&q=80',
    stylist: MASTER_STYLISTS[0],
    branch: BRANCHES[0],
    date: '2026-11-05',
    timeSlot: '04:00 PM',
    fee: 1500,
    status: 'Scheduled',
    treatmentCreditAdjusted: true, // Fee adjustable against treatment
    recommendations: 'Recommended 3 sessions of Caviar Reconstruction before re-coloring.',
    followUpDate: '2026-11-20',
    createdAt: '2026-11-02 14:15'
  },
  {
    id: 'CNS-202',
    code: 'CNS-8521',
    type: 'Skin & Facial Consultation',
    mode: 'In-Salon Consultation',
    clientName: 'Devika Singhal',
    clientPhone: '+91 98450 67890',
    clientEmail: 'devika.singhal@gmail.com',
    concerns: 'Hormonal breakout pigmentation around jawline, hyper-sensitivity to retinol.',
    notes: 'Skin analysis completed with dermal scanner. Prescribed gold ultrasound peptide infusion.',
    stylist: MASTER_STYLISTS[1],
    branch: BRANCHES[0],
    date: '2026-11-04',
    timeSlot: '11:30 AM',
    fee: 1800,
    status: 'Completed',
    treatmentCreditAdjusted: true,
    recommendations: 'Begin with Hydra-Infusion Botanical followed by 24K Gold Cellular Renewal.',
    followUpDate: '2026-11-18',
    createdAt: '2026-11-01 10:30'
  }
];

export const INITIAL_HOME_SERVICES: HomeServiceBooking[] = [
  {
    id: 'HMS-301',
    code: 'AURA-HOME-9102',
    clientName: 'Kavita Chawla',
    clientPhone: '+91 98201 98765',
    clientEmail: 'kavita.c@corp.com',
    address: 'Villa 12, Palm Beach Enclave, Worli Sea Face',
    pinCode: '400018',
    calculatedDistanceKm: 6.8, // Within 15 km radius
    branch: BRANCHES[0],
    service: SPA_SERVICES[0], // 24K Gold Facial
    stylist: MASTER_STYLISTS[1],
    date: '2026-11-04',
    timeSlot: '02:30 PM',
    paymentStatus: 'Paid Online',
    dispatchStatus: 'On the Way',
    travelNotes: 'Security gate pass generated under Aura Concierge. Est. travel: 22 mins.',
    totalPrice: 8500,
    createdAt: '2026-11-02 18:40'
  },
  {
    id: 'HMS-302',
    code: 'AURA-HOME-8219',
    clientName: 'Vikramaditya Rao',
    clientPhone: '+91 99876 54321',
    clientEmail: 'v.rao@equitypartners.in',
    address: 'Penthouse B, Silver Oaks, Pali Hill, Bandra West',
    pinCode: '400050',
    calculatedDistanceKm: 4.2,
    branch: BRANCHES[1],
    service: SPA_SERVICES[5], // Gentleman's Royal Barber
    stylist: MASTER_STYLISTS[0],
    date: '2026-11-05',
    timeSlot: '10:00 AM',
    paymentStatus: 'Paid Online',
    dispatchStatus: 'Assigned',
    travelNotes: 'Specialist kit packed with organic sandalwood balm and steamer.',
    totalPrice: 3200,
    createdAt: '2026-11-03 09:15'
  }
];

export const INITIAL_MEMBERSHIPS: ClientMembership[] = [
  {
    id: 'MEM-001',
    memberCode: 'AURA-GOLD-7842',
    tierId: 'TIER-GOLD',
    tierName: 'Gold Royale Sovereign',
    clientName: 'Natasha Singhania',
    clientPhone: '+91 98200 12345',
    clientEmail: 'natasha.s@luxury.com',
    startDate: '2026-03-01',
    expiryDate: '2027-02-28',
    qrCodeValue: 'AURA:MEM:GOLD:7842:NATASHA-SINGHANIA',
    totalSavings: 18500,
    active: true
  },
  {
    id: 'MEM-002',
    memberCode: 'AURA-PLAT-1093',
    tierId: 'TIER-PLATINUM',
    tierName: 'Sovereign Penthouse Patron',
    clientName: 'Arjun Singhania',
    clientPhone: '+91 99300 54321',
    clientEmail: 'arjun.s@capital.com',
    startDate: '2026-01-15',
    expiryDate: '2027-01-14',
    qrCodeValue: 'AURA:MEM:PLAT:1093:ARJUN-SINGHANIA',
    totalSavings: 42000,
    active: true
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'APT-1001',
    confirmationCode: 'AURA-7821',
    clientName: 'Sunita Kapoor',
    clientPhone: '+91 98200 12345',
    clientEmail: 'sunita.k@domain.com',
    service: SPA_SERVICES[0],
    stylist: MASTER_STYLISTS[1],
    branch: BRANCHES[0],
    date: '2026-11-04',
    timeSlot: '11:00 AM',
    durationMinutes: 90,
    totalPrice: 8500,
    depositAmount: 2000,
    paymentOption: 'Booking Deposit',
    paymentStatus: 'Deposit Paid',
    status: 'Confirmed',
    notes: 'Requested organic rosehip finishing serum.',
    bookingSource: 'AI Concierge',
    createdAt: '2026-11-02 18:20'
  },
  {
    id: 'APT-1002',
    confirmationCode: 'AURA-8904',
    clientName: 'Arjun Singhania',
    clientPhone: '+91 99300 54321',
    clientEmail: 'arjun.s@capital.com',
    service: SPA_SERVICES[3],
    stylist: MASTER_STYLISTS[2],
    branch: BRANCHES[1],
    date: '2026-11-04',
    timeSlot: '03:30 PM',
    durationMinutes: 90,
    totalPrice: 2950, // 50% Member Benefit applied (regular 5900)
    membershipDiscountApplied: 2950,
    depositAmount: 2950,
    paymentOption: 'Full Payment',
    paymentStatus: 'Paid',
    status: 'Confirmed',
    notes: 'Severe upper neck stiffness from long-haul flights.',
    bookingSource: 'Reserve with Google',
    createdAt: '2026-11-02 19:10'
  }
];

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: 'REV-001',
    author: 'Natasha Singhania',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    timeAgo: '2 days ago',
    content: 'Booked through Google Search seamlessly. Laurent is an absolute artist with balayage! The complimentary champagne and lavender towels in the lounge felt like a 7-star resort in Monaco.',
    verifiedBooking: true,
    serviceReviewed: 'Haute Balayage Couture & Caviar Hair Ritual'
  },
  {
    id: 'REV-002',
    author: 'Rohit K. Mehra',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    timeAgo: '1 week ago',
    content: 'The AI Booking Agent recommended the Chakra Stone Ritual when I mentioned my shoulder stiffness. Somsri worked miracles. Truly unparalleled serenity in the city.',
    verifiedBooking: true,
    serviceReviewed: 'Chakra Balancing Warm Volcanic Stone Ritual'
  },
  {
    id: 'REV-003',
    author: 'Mira Chandrasekhar',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    timeAgo: '2 weeks ago',
    content: 'The 24K Gold Cellular Facial with Dr. Elena left my skin so radiant that my makeup artist didn’t need foundation for my reception. Worth every single rupee.',
    verifiedBooking: true,
    serviceReviewed: '24K Gold Cellular Renewal Facial'
  }
];

export const INITIAL_CUSTOMERS: CustomerProfile[] = [
  {
    id: 'CUST-01',
    name: 'Natasha Singhania',
    phone: '+91 98200 12345',
    email: 'natasha.s@luxury.com',
    membershipId: 'MEM-001',
    totalVisits: 14,
    totalSpend: 112500,
    preferredStylistId: 'STY-001',
    preferredBranchId: 'BR-01',
    lastVisitDate: '2026-10-28',
    consultationNotesHistory: ['Skin responds exceptionally well to 24K gold ultrasound', 'Pre-color balayage glossing required'],
    savedServiceIds: ['SRV-001', 'SRV-002']
  },
  {
    id: 'CUST-02',
    name: 'Arjun Singhania',
    phone: '+91 99300 54321',
    email: 'arjun.s@capital.com',
    membershipId: 'MEM-002',
    totalVisits: 9,
    totalSpend: 78000,
    preferredStylistId: 'STY-003',
    preferredBranchId: 'BR-01',
    lastVisitDate: '2026-10-24',
    consultationNotesHistory: ['Frequent upper cervical muscle knotting', 'Prefers extra eucalyptus in Hammam'],
    savedServiceIds: ['SRV-004', 'SRV-006']
  },
  {
    id: 'CUST-03',
    name: 'Sunita Kapoor',
    phone: '+91 98200 12345',
    email: 'sunita.k@domain.com',
    totalVisits: 4,
    totalSpend: 34000,
    preferredStylistId: 'STY-002',
    preferredBranchId: 'BR-01',
    lastVisitDate: '2026-10-15',
    consultationNotesHistory: ['Organic rosehip finishing oil required'],
    savedServiceIds: ['SRV-001']
  }
];
