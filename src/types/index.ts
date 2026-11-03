export type ServiceCategory = 
  | 'Haute Coiffure' 
  | 'Facial Couture' 
  | 'Hammam & Hydrotherapy' 
  | 'Chakra Massages' 
  | 'Bridal Suites'
  | 'Hair'
  | 'Skin'
  | 'Spa'
  | 'Grooming'
  | 'Nails'
  | 'Makeup & Bridal';

export interface SpaService {
  id: string;
  name: string;
  category: ServiceCategory;
  durationMinutes: number;
  price: number;
  description: string;
  benefits: string[];
  imageUrl: string;
  highlights: string;
  homeServiceEligible?: boolean;
  consultationRequired?: boolean;
  membershipDiscountEligible?: boolean;
  offerEligible?: boolean;
  assignedStylistIds?: string[];
}

export interface Branch {
  id: string;
  name: string;
  tagline: string;
  address: string;
  city: string;
  pinCode: string;
  phone: string;
  serviceRadiusKm: number; // Configurable from Admin
  openingHours: string;
  coordinates: { lat: number; lng: number };
}

export interface StylistWorkingHours {
  dayOfWeek: string; // 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'
  startTime: string; // '09:00'
  endTime: string;   // '20:00'
  breaks: { start: string; end: string; title: string }[];
  isOffDay?: boolean;
}

export interface MasterStylist {
  id: string;
  name: string;
  role: string;
  experienceYears: number;
  rating: number;
  reviewsCount: number;
  bio: string;
  specialties: string[];
  avatarUrl: string;
  availableDays: string[];
  branchId: string;
  workingHours?: StylistWorkingHours[];
  leaveDates?: string[];
  commissionRate?: number; // e.g. 15%
}

export type AppointmentStatus = 'Confirmed' | 'In-Service' | 'Completed' | 'Cancelled' | 'Waitlisted';

export interface Appointment {
  id: string;
  confirmationCode: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  service: SpaService;
  stylist: MasterStylist;
  branch: Branch;
  date: string;
  timeSlot: string;
  durationMinutes: number;
  totalPrice: number;
  depositAmount: number;
  paymentOption: 'Full Payment' | 'Booking Deposit';
  paymentStatus: 'Paid' | 'Deposit Paid' | 'Pending at Salon';
  status: AppointmentStatus;
  notes?: string;
  bookingSource: 'AI Concierge' | 'Website Direct' | 'Reserve with Google' | 'Admin Portal';
  createdAt: string;
  membershipDiscountApplied?: number;
  couponDiscountApplied?: number;
  consultationCreditApplied?: number;
  isHomeService?: boolean;
}

export interface GoogleReview {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  timeAgo: string;
  content: string;
  verifiedBooking: boolean;
  serviceReviewed: string;
}

export type ConsultationType = 'Hair & Scalp Consultation' | 'Skin & Facial Consultation';
export type ConsultationMode = 'Online Video Consultation' | 'In-Salon Consultation';
export type ConsultationStatus = 'Scheduled' | 'Completed' | 'Cancelled';

export interface ConsultationBooking {
  id: string;
  code: string;
  type: ConsultationType;
  mode: ConsultationMode;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  concerns: string;
  notes?: string;
  photoUrl?: string;
  stylist: MasterStylist;
  branch: Branch;
  date: string;
  timeSlot: string;
  fee: number;
  status: ConsultationStatus;
  recommendations?: string;
  followUpDate?: string;
  treatmentCreditAdjusted?: boolean;
  createdAt: string;
}

export type HomeServiceStatus = 'Assigned' | 'On the Way' | 'Arrived' | 'Service Started' | 'Completed';

export interface HomeServiceBooking {
  id: string;
  code: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  address: string;
  pinCode: string;
  calculatedDistanceKm: number;
  branch: Branch;
  service: SpaService;
  stylist: MasterStylist;
  date: string;
  timeSlot: string;
  paymentStatus: 'Paid Online' | 'Pay on Completion';
  dispatchStatus: HomeServiceStatus;
  travelNotes?: string;
  totalPrice: number;
  createdAt: string;
}

export interface PromotionalOffer {
  id: string;
  code: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minSpend: number;
  maxDiscount?: number;
  applicableCategory?: string;
  applicableServiceId?: string;
  validFrom: string;
  validTo: string;
  usageLimit: number;
  timesUsed: number;
  memberOnly: boolean;
  active: boolean;
}

export interface ComboPackage {
  id: string;
  name: string;
  tagline: string;
  description: string;
  includedServiceIds: string[];
  originalPrice: number;
  offerPrice: number;
  savings: number;
  totalDurationMinutes: number;
  badge: string;
  imageUrl: string;
  active: boolean;
}

export interface MembershipTier {
  id: string;
  name: string;
  tagline: string;
  annualFee: number;
  discountPercentage: number;
  eligibleServiceIds: string[]; // Specific services only, e.g. select Waxing, Spa, Haircut. Admin configurable!
  perks: string[];
  validityMonths: number;
  usageLimitPerMonth: number;
  priorityBooking: boolean;
  cardColor: string;
}

export interface ClientMembership {
  id: string;
  memberCode: string;
  tierId: string;
  tierName: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  startDate: string;
  expiryDate: string;
  qrCodeValue: string;
  totalSavings: number;
  active: boolean;
}

export interface AcademyCourse {
  id: string;
  title: string;
  level: 'Foundation' | 'Advanced Diploma' | 'Masterclass Certificate';
  duration: string;
  fee: number;
  syllabusSummary: string[];
  trainerName: string;
  trainerRole: string;
  batchDates: string[];
  certificationDetails: string;
  imageUrl: string;
  seatsRemaining: number;
  active: boolean;
}

export interface AcademyApplication {
  id: string;
  code: string;
  courseId: string;
  courseTitle: string;
  applicantName: string;
  applicantPhone: string;
  applicantEmail: string;
  selectedBatch: string;
  backgroundExperience: string;
  notes?: string;
  status: 'Pending Review' | 'Interview Scheduled' | 'Admission Granted' | 'Waitlisted';
  appliedAt: string;
}

export type AdminRole = 
  | 'Owner/Admin' 
  | 'Manager' 
  | 'Reception' 
  | 'Stylist' 
  | 'Home-Service Staff' 
  | 'Academy Staff';

export interface AuditLog {
  id: string;
  timestamp: string;
  role: AdminRole;
  actorName: string;
  action: string;
  details: string;
}

export interface CustomerProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  membershipId?: string;
  totalVisits: number;
  totalSpend: number;
  preferredStylistId?: string;
  preferredBranchId?: string;
  lastVisitDate?: string;
  consultationNotesHistory?: string[];
  savedServiceIds?: string[];
}
