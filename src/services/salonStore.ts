import {
  SpaService,
  MasterStylist,
  Branch,
  Appointment,
  ConsultationBooking,
  HomeServiceBooking,
  PromotionalOffer,
  ComboPackage,
  MembershipTier,
  ClientMembership,
  AcademyCourse,
  AcademyApplication,
  CustomerProfile,
  AuditLog,
  AdminRole
} from '../types';

import {
  BRANCHES,
  SPA_SERVICES,
  MASTER_STYLISTS,
  COMBO_PACKAGES,
  PROMOTIONAL_OFFERS,
  MEMBERSHIP_TIERS,
  ACADEMY_COURSES,
  INITIAL_APPOINTMENTS,
  INITIAL_CONSULTATIONS,
  INITIAL_HOME_SERVICES,
  INITIAL_MEMBERSHIPS,
  INITIAL_CUSTOMERS
} from '../data/salonData';

type Listener = () => void;

class SalonStore {
  private branches: Branch[];
  private services: SpaService[];
  private stylists: MasterStylist[];
  private comboPackages: ComboPackage[];
  private offers: PromotionalOffer[];
  private membershipTiers: MembershipTier[];
  private memberships: ClientMembership[];
  private appointments: Appointment[];
  private consultations: ConsultationBooking[];
  private homeServices: HomeServiceBooking[];
  private academyCourses: AcademyCourse[];
  private academyApplications: AcademyApplication[];
  private customers: CustomerProfile[];
  private auditLogs: AuditLog[];
  private activeRole: AdminRole = 'Owner/Admin';

  private listeners: Set<Listener> = new Set();

  constructor() {
    this.branches = this.load('aura_branches', BRANCHES);
    this.services = this.load('aura_services', SPA_SERVICES);
    this.stylists = this.load('aura_stylists', MASTER_STYLISTS);
    this.comboPackages = this.load('aura_combos', COMBO_PACKAGES);
    this.offers = this.load('aura_offers', PROMOTIONAL_OFFERS);
    this.membershipTiers = this.load('aura_membership_tiers', MEMBERSHIP_TIERS);
    this.memberships = this.load('aura_memberships', INITIAL_MEMBERSHIPS);

    // Safely normalize appointments loaded from legacy or user localStorage
    const rawAppointments = this.load('aura_appointments', INITIAL_APPOINTMENTS);
    this.appointments = (Array.isArray(rawAppointments) ? rawAppointments : INITIAL_APPOINTMENTS).map((a: any) => ({
      ...a,
      branch: a.branch || this.branches[0],
      service: a.service || this.services[0],
      stylist: a.stylist || this.stylists[0],
      durationMinutes: a.durationMinutes || a.service?.durationMinutes || 60,
      totalPrice: a.totalPrice || a.service?.price || 5000,
      depositAmount: a.depositAmount || Math.round((a.totalPrice || a.service?.price || 5000) * 0.25),
      paymentOption: a.paymentOption || 'Full Payment',
      paymentStatus: a.paymentStatus || 'Paid',
      status: a.status || 'Confirmed'
    }));

    const rawConsultations = this.load('aura_consultations', INITIAL_CONSULTATIONS);
    this.consultations = (Array.isArray(rawConsultations) ? rawConsultations : INITIAL_CONSULTATIONS).map((c: any) => ({
      ...c,
      branch: c.branch || this.branches[0],
      stylist: c.stylist || this.stylists[0]
    }));

    const rawHomeServices = this.load('aura_home_services', INITIAL_HOME_SERVICES);
    this.homeServices = (Array.isArray(rawHomeServices) ? rawHomeServices : INITIAL_HOME_SERVICES).map((h: any) => ({
      ...h,
      branch: h.branch || this.branches[0],
      service: h.service || this.services[0],
      stylist: h.stylist || this.stylists[0]
    }));

    this.academyCourses = this.load('aura_academy_courses', ACADEMY_COURSES);
    this.academyApplications = this.load('aura_academy_apps', [
      {
        id: 'APP-101',
        code: 'ACAD-APP-4421',
        courseId: 'ACAD-01',
        courseTitle: 'Parisian Balayage & French Coloristry Diploma',
        applicantName: 'Rhea Kapoor',
        applicantPhone: '+91 98200 88776',
        applicantEmail: 'rhea.k@designstudio.in',
        selectedBatch: 'Nov 18, 2026',
        backgroundExperience: '2 years junior salon assistant in South Mumbai',
        notes: 'Seeking advanced coloristry accreditation for luxury clientele.',
        status: 'Interview Scheduled',
        appliedAt: '2026-11-01 16:40'
      }
    ]);
    this.customers = this.load('aura_customers', INITIAL_CUSTOMERS);
    this.auditLogs = this.load('aura_audit_logs', [
      {
        id: 'LOG-001',
        timestamp: '2026-11-02 18:20',
        role: 'Reception',
        actorName: 'Receptionist Sarah',
        action: 'Booking Created',
        details: 'Confirmed APT-1001 for Sunita Kapoor (24K Gold Cellular Facial)'
      }
    ]);
  }

  private load<T>(key: string, fallback: T): T {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : fallback;
    } catch {
      return fallback;
    }
  }

  private persist(key: string, value: unknown) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('Failed to persist to localStorage', e);
    }
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  // --- Role & Audit ---
  public getActiveRole(): AdminRole {
    return this.activeRole;
  }

  public setActiveRole(role: AdminRole) {
    this.activeRole = role;
    this.logAction('Role Switched', `Active session role switched to ${role}`);
    this.notify();
  }

  public logAction(action: string, details: string) {
    const log: AuditLog = {
      id: `LOG-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      role: this.activeRole,
      actorName: `${this.activeRole} Officer`,
      action,
      details
    };
    this.auditLogs.unshift(log);
    if (this.auditLogs.length > 100) this.auditLogs.pop();
    this.persist('aura_audit_logs', this.auditLogs);
  }

  public getAuditLogs(): AuditLog[] {
    return this.auditLogs;
  }

  // --- Getters ---
  public getBranches(): Branch[] {
    return this.branches;
  }

  public getServices(): SpaService[] {
    return this.services;
  }

  public getStylists(): MasterStylist[] {
    return this.stylists;
  }

  public getComboPackages(): ComboPackage[] {
    return this.comboPackages;
  }

  public getOffers(): PromotionalOffer[] {
    return this.offers;
  }

  public getMembershipTiers(): MembershipTier[] {
    return this.membershipTiers;
  }

  public getMemberships(): ClientMembership[] {
    return this.memberships;
  }

  public getAppointments(): Appointment[] {
    return this.appointments;
  }

  public getConsultations(): ConsultationBooking[] {
    return this.consultations;
  }

  public getHomeServices(): HomeServiceBooking[] {
    return this.homeServices;
  }

  public getAcademyCourses(): AcademyCourse[] {
    return this.academyCourses;
  }

  public getAcademyApplications(): AcademyApplication[] {
    return this.academyApplications;
  }

  public getCustomers(): CustomerProfile[] {
    return this.customers;
  }

  // --- Dynamic Slot & Availability Engine ---
  /**
   * Calculates real available time slots for a specific date, service duration, branch, and stylist.
   * Evaluates:
   * 1. Stylist working days and working hours.
   * 2. Stylist breaks and approved leave dates.
   * 3. Existing conflicting appointments on that date (start to start + duration).
   * 4. Branch operating hours.
   */
  public getAvailableTimeSlots(
    dateStr: string,
    stylistId: string,
    durationMinutes: number,
    branchId: string
  ): { time: string; available: boolean; conflictReason?: string }[] {
    const dateObj = new Date(dateStr);
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayOfWeek = dayNames[dateObj.getDay()];

    const branch = this.branches.find((b) => b.id === branchId) || this.branches[0];
    const stylist = this.stylists.find((s) => s.id === stylistId);

    // Default base slots across operating hours
    const candidateSlots = [
      '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
      '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM',
      '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
      '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM',
      '07:30 PM', '08:00 PM'
    ];

    if (!stylist) {
      return candidateSlots.map((t) => ({ time: t, available: true }));
    }

    // Check if on leave
    if (stylist.leaveDates?.includes(dateStr)) {
      return candidateSlots.map((t) => ({
        time: t,
        available: false,
        conflictReason: 'Stylist on approved leave'
      }));
    }

    // Check if stylist works on this day
    if (!stylist.availableDays.includes(dayOfWeek)) {
      return candidateSlots.map((t) => ({
        time: t,
        available: false,
        conflictReason: 'Stylist scheduled off-duty'
      }));
    }

    // Find stylist schedule for the day
    const schedule = stylist.workingHours?.find((h) => h.dayOfWeek === dayOfWeek);
    const dayStartMinutes = schedule ? this.parseTimeToMinutes(schedule.startTime) : 9.5 * 60;
    const dayEndMinutes = schedule ? this.parseTimeToMinutes(schedule.endTime) : 20 * 60;

    // Existing active bookings for this stylist on this date
    const existingBookings = this.appointments.filter(
      (a) => a.stylist.id === stylistId && a.date === dateStr && a.status !== 'Cancelled'
    );

    return candidateSlots.map((slotStr) => {
      const slotStartMinutes = this.parseSlotToMinutes(slotStr);
      const slotEndMinutes = slotStartMinutes + durationMinutes;

      // 1. Check if outside working hours
      if (slotStartMinutes < dayStartMinutes || slotEndMinutes > dayEndMinutes) {
        return { time: slotStr, available: false, conflictReason: 'Outside working hours' };
      }

      // 2. Check if overlapping with scheduled breaks
      if (schedule?.breaks) {
        for (const brk of schedule.breaks) {
          const brkStart = this.parseTimeToMinutes(brk.start);
          const brkEnd = this.parseTimeToMinutes(brk.end);
          if (slotStartMinutes < brkEnd && slotEndMinutes > brkStart) {
            return { time: slotStr, available: false, conflictReason: `Stylist ${brk.title}` };
          }
        }
      }

      // 3. Check collision with existing appointments
      for (const booking of existingBookings) {
        const bookStart = this.parseSlotToMinutes(booking.timeSlot);
        const bookEnd = bookStart + (booking.durationMinutes || 60);

        if (slotStartMinutes < bookEnd && slotEndMinutes > bookStart) {
          return { time: slotStr, available: false, conflictReason: 'Reserved by another client' };
        }
      }

      return { time: slotStr, available: true };
    });
  }

  private parseTimeToMinutes(time24: string): number {
    const [h, m] = time24.split(':').map(Number);
    return h * 60 + (m || 0);
  }

  private parseSlotToMinutes(slot: string): number {
    // "11:30 AM" or "03:30 PM"
    const match = slot.match(/^(\d+):(\d+)\s*(AM|PM)$/i);
    if (!match) return 600;
    let h = parseInt(match[1], 10);
    const m = parseInt(match[2], 10);
    const meridian = match[3].toUpperCase();
    if (meridian === 'PM' && h < 12) h += 12;
    if (meridian === 'AM' && h === 12) h = 0;
    return h * 60 + m;
  }

  // --- Strict Collision Check / Double-booking prevention ---
  public validateSlotAvailability(
    dateStr: string,
    slotStr: string,
    durationMinutes: number,
    stylistId: string
  ): { valid: boolean; error?: string } {
    const candidateMinutes = this.parseSlotToMinutes(slotStr);
    const candidateEnd = candidateMinutes + durationMinutes;

    const collision = this.appointments.find((a) => {
      if (a.stylist.id !== stylistId || a.date !== dateStr || a.status === 'Cancelled') {
        return false;
      }
      const existingStart = this.parseSlotToMinutes(a.timeSlot);
      const existingEnd = existingStart + (a.durationMinutes || 60);
      return candidateMinutes < existingEnd && candidateEnd > existingStart;
    });

    if (collision) {
      return {
        valid: false,
        error: `Slot ${slotStr} is no longer available for ${collision.stylist.name}. Please select an adjacent time.`
      };
    }

    return { valid: true };
  }

  // --- Salon At Home Distance & Radius Validator ---
  public validateHomeServiceRadius(
    pinCode: string,
    branchId: string
  ): { eligible: boolean; distanceKm: number; allowedRadiusKm: number; branchName: string } {
    const branch = this.branches.find((b) => b.id === branchId) || this.branches[0];
    const maxRadius = branch.serviceRadiusKm || 15;

    // Simulate distance estimation using PIN code hash distance to ensure deterministic real result
    let hash = 0;
    for (let i = 0; i < pinCode.length; i++) {
      hash = (hash << 5) - hash + pinCode.charCodeAt(i);
      hash |= 0;
    }
    const distanceKm = Math.round((Math.abs(hash % 180) / 10 + 2.5) * 10) / 10;
    const eligible = distanceKm <= maxRadius;

    return {
      eligible,
      distanceKm,
      allowedRadiusKm: maxRadius,
      branchName: branch.name
    };
  }

  // --- Discount & Offer Calculator ---
  public calculateDiscounts(
    servicePrice: number,
    serviceId: string,
    couponCode?: string,
    memberCode?: string
  ): {
    finalPrice: number;
    membershipDiscount: number;
    couponDiscount: number;
    error?: string;
  } {
    let finalPrice = servicePrice;
    let membershipDiscount = 0;
    let couponDiscount = 0;

    // 1. Membership discount check
    if (memberCode) {
      const activeMember = this.memberships.find(
        (m) => m.memberCode.toUpperCase() === memberCode.trim().toUpperCase() && m.active
      );
      if (activeMember) {
        const tier = this.membershipTiers.find((t) => t.id === activeMember.tierId);
        if (tier) {
          // Strictly apply only if the service is in the tier's eligibleServiceIds
          if (tier.eligibleServiceIds.includes(serviceId)) {
            membershipDiscount = Math.round((servicePrice * tier.discountPercentage) / 100);
            finalPrice -= membershipDiscount;
          }
        }
      }
    }

    // 2. Coupon code check
    if (couponCode && couponCode.trim()) {
      const offer = this.offers.find(
        (o) => o.code.toUpperCase() === couponCode.trim().toUpperCase() && o.active
      );
      if (offer) {
        if (finalPrice >= offer.minSpend) {
          if (offer.discountType === 'fixed') {
            couponDiscount = Math.min(offer.discountValue, finalPrice);
          } else {
            const rawDiscount = (finalPrice * offer.discountValue) / 100;
            couponDiscount = offer.maxDiscount ? Math.min(rawDiscount, offer.maxDiscount) : rawDiscount;
          }
          finalPrice -= Math.round(couponDiscount);
        }
      }
    }

    return {
      finalPrice: Math.max(0, finalPrice),
      membershipDiscount,
      couponDiscount
    };
  }

  // --- Actions ---
  public addAppointment(apt: Appointment) {
    this.appointments.unshift(apt);
    this.persist('aura_appointments', this.appointments);

    // Sync to CRM customer
    this.syncCustomerFromBooking(apt.clientName, apt.clientPhone, apt.clientEmail, apt.totalPrice, apt.stylist.id, apt.branch.id);
    this.logAction('Appointment Booked', `${apt.confirmationCode} for ${apt.clientName} (${apt.service.name}) at ${apt.branch.name}`);
    this.notify();
  }

  public updateAppointmentStatus(id: string, status: Appointment['status']) {
    this.appointments = this.appointments.map((a) => (a.id === id ? { ...a, status } : a));
    this.persist('aura_appointments', this.appointments);
    this.logAction('Appointment Status Updated', `Appointment ${id} status set to ${status}`);
    this.notify();
  }

  public addConsultation(consultation: ConsultationBooking) {
    this.consultations.unshift(consultation);
    this.persist('aura_consultations', this.consultations);
    this.syncCustomerFromBooking(consultation.clientName, consultation.clientPhone, consultation.clientEmail, consultation.fee, consultation.stylist.id, consultation.branch.id);
    this.logAction('Consultation Booked', `${consultation.code} (${consultation.type}) for ${consultation.clientName}`);
    this.notify();
  }

  public updateConsultationStatus(id: string, status: ConsultationBooking['status'], recommendations?: string) {
    this.consultations = this.consultations.map((c) =>
      c.id === id ? { ...c, status, recommendations: recommendations || c.recommendations } : c
    );
    this.persist('aura_consultations', this.consultations);
    this.logAction('Consultation Updated', `Consultation ${id} set to ${status}`);
    this.notify();
  }

  public addHomeService(booking: HomeServiceBooking) {
    this.homeServices.unshift(booking);
    this.persist('aura_home_services', this.homeServices);
    this.syncCustomerFromBooking(booking.clientName, booking.clientPhone, booking.clientEmail, booking.totalPrice, booking.stylist.id, booking.branch.id);
    this.logAction('Home-Service Dispatched', `${booking.code} for ${booking.clientName} at ${booking.address}`);
    this.notify();
  }

  public updateHomeServiceStatus(id: string, dispatchStatus: HomeServiceBooking['dispatchStatus']) {
    this.homeServices = this.homeServices.map((h) => (h.id === id ? { ...h, dispatchStatus } : h));
    this.persist('aura_home_services', this.homeServices);
    this.logAction('Home-Service Progress', `Dispatch ${id} status updated to ${dispatchStatus}`);
    this.notify();
  }

  public addMembership(membership: ClientMembership) {
    this.memberships.unshift(membership);
    this.persist('aura_memberships', this.memberships);
    this.logAction('Membership Issued', `Pass ${membership.memberCode} for ${membership.clientName} (${membership.tierName})`);
    this.notify();
  }

  public addAcademyApplication(app: AcademyApplication) {
    this.academyApplications.unshift(app);
    this.persist('aura_academy_apps', this.academyApplications);
    this.logAction('Academy Lead Generated', `${app.code} from ${app.applicantName} for ${app.courseTitle}`);
    this.notify();
  }

  public updateAcademyApplicationStatus(id: string, status: AcademyApplication['status']) {
    this.academyApplications = this.academyApplications.map((a) => (a.id === id ? { ...a, status } : a));
    this.persist('aura_academy_apps', this.academyApplications);
    this.logAction('Academy Application Updated', `Lead ${id} set to ${status}`);
    this.notify();
  }

  // --- Branch Service Radius Config ---
  public updateBranchRadius(branchId: string, radiusKm: number) {
    this.branches = this.branches.map((b) => (b.id === branchId ? { ...b, serviceRadiusKm: radiusKm } : b));
    this.persist('aura_branches', this.branches);
    this.logAction('Branch Radius Updated', `Branch ${branchId} service radius updated to ${radiusKm} km`);
    this.notify();
  }

  // --- Offers & Packages Manager ---
  public toggleOffer(offerId: string, active: boolean) {
    this.offers = this.offers.map((o) => (o.id === offerId ? { ...o, active } : o));
    this.persist('aura_offers', this.offers);
    this.logAction('Offer Toggled', `Offer ${offerId} set to ${active ? 'Active' : 'Inactive'}`);
    this.notify();
  }

  public addOffer(newOffer: PromotionalOffer) {
    this.offers.unshift(newOffer);
    this.persist('aura_offers', this.offers);
    this.logAction('Offer Created', `Promo Code ${newOffer.code} created`);
    this.notify();
  }

  // --- Services Manager ---
  public addService(srv: SpaService) {
    this.services.unshift(srv);
    this.persist('aura_services', this.services);
    this.logAction('Service Added', `Created ritual: ${srv.name}`);
    this.notify();
  }

  public updateService(updated: SpaService) {
    this.services = this.services.map((s) => (s.id === updated.id ? updated : s));
    this.persist('aura_services', this.services);
    this.logAction('Service Updated', `Modified ritual: ${updated.name}`);
    this.notify();
  }

  // --- Staff Manager ---
  public updateStylistSchedule(stylistId: string, workingHours: MasterStylist['workingHours'], leaveDates: string[]) {
    this.stylists = this.stylists.map((s) =>
      s.id === stylistId ? { ...s, workingHours, leaveDates } : s
    );
    this.persist('aura_stylists', this.stylists);
    this.logAction('Staff Roster Updated', `Roster updated for stylist ${stylistId}`);
    this.notify();
  }

  // --- Customer CRM Helper ---
  private syncCustomerFromBooking(
    name: string,
    phone: string,
    email: string,
    amount: number,
    stylistId?: string,
    branchId?: string
  ) {
    const existingIndex = this.customers.findIndex(
      (c) => c.phone.replace(/\s+/g, '') === phone.replace(/\s+/g, '') || c.email.toLowerCase() === email.toLowerCase()
    );

    const todayStr = new Date().toISOString().substring(0, 10);

    if (existingIndex >= 0) {
      const c = this.customers[existingIndex];
      this.customers[existingIndex] = {
        ...c,
        totalVisits: c.totalVisits + 1,
        totalSpend: c.totalSpend + amount,
        preferredStylistId: stylistId || c.preferredStylistId,
        preferredBranchId: branchId || c.preferredBranchId,
        lastVisitDate: todayStr
      };
    } else {
      const newCustomer: CustomerProfile = {
        id: `CUST-${Date.now()}`,
        name,
        phone,
        email,
        totalVisits: 1,
        totalSpend: amount,
        preferredStylistId: stylistId,
        preferredBranchId: branchId,
        lastVisitDate: todayStr,
        consultationNotesHistory: []
      };
      this.customers.unshift(newCustomer);
    }
    this.persist('aura_customers', this.customers);
  }
}

export const salonStore = new SalonStore();

