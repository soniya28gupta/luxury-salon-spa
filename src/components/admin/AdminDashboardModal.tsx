import React, { useState, useEffect } from 'react';
import { 
  X, LayoutDashboard, Calendar, Users, Scissors, Home, 
  Tag, Crown, GraduationCap, BarChart3, Shield, Clock, 
  CheckCircle2, AlertCircle, Plus, Search, Filter, 
  MapPin, DollarSign, Award, ChevronDown, Check 
} from 'lucide-react';
import { 
  AdminRole, 
  Appointment, 
  CustomerProfile, 
  MasterStylist, 
  SpaService, 
  ConsultationBooking, 
  HomeServiceBooking, 
  PromotionalOffer, 
  ComboPackage, 
  AcademyApplication,
  Branch,
  AuditLog
} from '../../types';
import { salonStore } from '../../services/salonStore';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<
    | 'dashboard'
    | 'appointments'
    | 'customers'
    | 'staff'
    | 'services'
    | 'homeService'
    | 'consultations'
    | 'offers'
    | 'academy'
    | 'reports'
    | 'audit'
  >('dashboard');

  const [currentRole, setCurrentRole] = useState<AdminRole>(salonStore.getActiveRole());
  const [branches, setBranches] = useState<Branch[]>(salonStore.getBranches());
  const [appointments, setAppointments] = useState<Appointment[]>(salonStore.getAppointments());
  const [customers, setCustomers] = useState<CustomerProfile[]>(salonStore.getCustomers());
  const [stylists, setStylists] = useState<MasterStylist[]>(salonStore.getStylists());
  const [services, setServices] = useState<SpaService[]>(salonStore.getServices());
  const [consultations, setConsultations] = useState<ConsultationBooking[]>(salonStore.getConsultations());
  const [homeServices, setHomeServices] = useState<HomeServiceBooking[]>(salonStore.getHomeServices());
  const [offers, setOffers] = useState<PromotionalOffer[]>(salonStore.getOffers());
  const [academyApps, setAcademyApps] = useState<AcademyApplication[]>(salonStore.getAcademyApplications());
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(salonStore.getAuditLogs());

  // Filter states
  const [appointmentBranchFilter, setAppointmentBranchFilter] = useState<string>('All');
  const [appointmentStatusFilter, setAppointmentStatusFilter] = useState<string>('All');
  const [customerSearch, setCustomerSearch] = useState('');

  // Service Edit / Add state
  const [isAddingService, setIsAddingService] = useState(false);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServicePrice, setNewServicePrice] = useState(3000);
  const [newServiceDuration, setNewServiceDuration] = useState(60);
  const [newServiceHomeEligible, setNewServiceHomeEligible] = useState(true);
  const [newServiceMemberEligible, setNewServiceMemberEligible] = useState(true);

  // Home-service radius edit state
  const [editingBranchId, setEditingBranchId] = useState<string>(branches[0]?.id || 'BR-01');
  const [newRadiusInput, setNewRadiusInput] = useState<number>(15);

  useEffect(() => {
    const sync = () => {
      setBranches(salonStore.getBranches());
      setAppointments(salonStore.getAppointments());
      setCustomers(salonStore.getCustomers());
      setStylists(salonStore.getStylists());
      setServices(salonStore.getServices());
      setConsultations(salonStore.getConsultations());
      setHomeServices(salonStore.getHomeServices());
      setOffers(salonStore.getOffers());
      setAcademyApps(salonStore.getAcademyApplications());
      setAuditLogs(salonStore.getAuditLogs());
      setCurrentRole(salonStore.getActiveRole());
    };
    return salonStore.subscribe(sync);
  }, []);

  if (!isOpen) return null;

  const handleRoleChange = (role: AdminRole) => {
    salonStore.setActiveRole(role);
  };

  // KPI Calculations
  const totalRevenue = appointments
    .filter((a) => a.status !== 'Cancelled')
    .reduce((sum, a) => sum + a.totalPrice, 0) +
    homeServices.reduce((sum, h) => sum + h.totalPrice, 0) +
    consultations.reduce((sum, c) => sum + c.fee, 0);

  const todayBookingsCount = appointments.filter((a) => a.status === 'Confirmed').length;
  const activeDispatchesCount = homeServices.filter((h) => h.dispatchStatus !== 'Completed').length;
  const pendingAcademyLeadsCount = academyApps.filter((a) => a.status === 'Pending Review').length;

  const filteredAppointments = appointments.filter((a) => {
    if (appointmentBranchFilter !== 'All' && (a.branch?.id || 'BR-01') !== appointmentBranchFilter) return false;
    if (appointmentStatusFilter !== 'All' && a.status !== appointmentStatusFilter) return false;
    return true;
  });

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
      c.phone.includes(customerSearch) ||
      c.email.toLowerCase().includes(customerSearch.toLowerCase())
  );

  const handleSaveRadius = () => {
    salonStore.updateBranchRadius(editingBranchId, Number(newRadiusInput));
    alert(`Service radius for selected branch successfully updated to ${newRadiusInput} km!`);
  };

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName) return;
    const srv: SpaService = {
      id: `SRV-${Date.now().toString().slice(-3)}`,
      name: newServiceName,
      category: 'Spa',
      durationMinutes: Number(newServiceDuration),
      price: Number(newServicePrice),
      description: 'Bespoke clinical formulation tailored to client silhouette and skin type.',
      benefits: ['Customized formulation', 'Deep relaxation', 'Visible rejuvenation'],
      imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=80',
      highlights: 'New Signature Ritual',
      homeServiceEligible: newServiceHomeEligible,
      membershipDiscountEligible: newServiceMemberEligible,
      offerEligible: true
    };
    salonStore.addService(srv);
    setIsAddingService(false);
    setNewServiceName('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white border border-[#e2d8c3] rounded-3xl max-w-6xl w-full h-[90vh] flex flex-col shadow-2xl text-neutral-900 overflow-hidden my-4">
        {/* Top Header & Role Switcher */}
        <div className="px-6 py-4 border-b border-[#ece7dc] bg-[#faf8f4] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-neutral-950 flex items-center justify-center text-[#d4af37]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg font-bold text-neutral-950">
                  Aura Sanctuary — Central Connected CRM
                </h3>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full">
                  Live DB Synced
                </span>
              </div>
              <p className="text-xs text-neutral-500">
                Single unified operating engine for Front Desk, Specialists & Executive Management.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Role Switcher */}
            <div className="flex items-center gap-1.5 bg-white border border-[#ded5c2] px-3 py-1.5 rounded-full text-xs shadow-xs">
              <span className="text-neutral-500 font-semibold text-[11px]">Role:</span>
              <select
                value={currentRole}
                onChange={(e) => handleRoleChange(e.target.value as AdminRole)}
                className="font-bold text-[#8e6c15] bg-transparent outline-hidden cursor-pointer"
              >
                <option value="Owner/Admin">Owner/Admin (Full Access)</option>
                <option value="Manager">Manager</option>
                <option value="Reception">Reception</option>
                <option value="Stylist">Stylist / Curator</option>
                <option value="Home-Service Staff">Home-Service Staff</option>
                <option value="Academy Staff">Academy Staff</option>
              </select>
            </div>

            <button onClick={onClose} className="p-1.5 text-neutral-400 hover:text-black rounded-full transition">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Workspace Body: Sidebar + Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Navigation Sidebar */}
          <div className="w-56 bg-[#fcfaf6] border-r border-[#ece7dc] p-3 space-y-1 overflow-y-auto text-xs font-semibold">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-2.5 transition ${
                activeTab === 'dashboard' ? 'bg-[#d4af37] text-slate-950 font-bold shadow-xs' : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>KPI Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('appointments')}
              className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-2.5 transition ${
                activeTab === 'appointments' ? 'bg-[#d4af37] text-slate-950 font-bold shadow-xs' : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Bookings ({appointments.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('customers')}
              className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-2.5 transition ${
                activeTab === 'customers' ? 'bg-[#d4af37] text-slate-950 font-bold shadow-xs' : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Customer CRM ({customers.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('staff')}
              className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-2.5 transition ${
                activeTab === 'staff' ? 'bg-[#d4af37] text-slate-950 font-bold shadow-xs' : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <Scissors className="w-4 h-4" />
              <span>Staff & Rosters ({stylists.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-2.5 transition ${
                activeTab === 'services' ? 'bg-[#d4af37] text-slate-950 font-bold shadow-xs' : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Service Catalogue ({services.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('homeService')}
              className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-2.5 transition ${
                activeTab === 'homeService' ? 'bg-[#d4af37] text-slate-950 font-bold shadow-xs' : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home-Service ({homeServices.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('consultations')}
              className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-2.5 transition ${
                activeTab === 'consultations' ? 'bg-[#d4af37] text-slate-950 font-bold shadow-xs' : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Consultation CRM ({consultations.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('offers')}
              className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-2.5 transition ${
                activeTab === 'offers' ? 'bg-[#d4af37] text-slate-950 font-bold shadow-xs' : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <Tag className="w-4 h-4" />
              <span>Offers & Combos</span>
            </button>

            <button
              onClick={() => setActiveTab('academy')}
              className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-2.5 transition ${
                activeTab === 'academy' ? 'bg-[#d4af37] text-slate-950 font-bold shadow-xs' : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Academy Leads ({academyApps.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('reports')}
              className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-2.5 transition ${
                activeTab === 'reports' ? 'bg-[#d4af37] text-slate-950 font-bold shadow-xs' : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Analytics & Revenue</span>
            </button>

            <button
              onClick={() => setActiveTab('audit')}
              className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-2.5 transition ${
                activeTab === 'audit' ? 'bg-[#d4af37] text-slate-950 font-bold shadow-xs' : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Audit Trail</span>
            </button>
          </div>

          {/* Module Content Area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-white">
            {/* MODULE 1: KPI Dashboard */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-xl font-bold text-neutral-950">
                      Operations & Performance Overview
                    </h4>
                    <p className="text-xs text-neutral-500">Live operational stream across all 3 sanctuary branches.</p>
                  </div>
                  <span className="text-xs font-semibold text-[#8e6c15] bg-[#faf6ed] px-3 py-1 rounded-full border border-[#e8ddbe]">
                    Session: {currentRole}
                  </span>
                </div>

                {/* 6 Top Metric Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-[#fcfaf6] border border-[#e8e2d4] rounded-2xl space-y-1">
                    <span className="text-[10px] uppercase font-bold text-neutral-400">Total System Revenue</span>
                    <p className="font-serif text-2xl font-bold text-neutral-950">₹{totalRevenue.toLocaleString()}</p>
                    <span className="text-[10px] text-emerald-700 font-semibold">+18.4% vs last week</span>
                  </div>

                  <div className="p-4 bg-[#fcfaf6] border border-[#e8e2d4] rounded-2xl space-y-1">
                    <span className="text-[10px] uppercase font-bold text-neutral-400">Confirmed Bookings</span>
                    <p className="font-serif text-2xl font-bold text-[#8e6c15]">{todayBookingsCount}</p>
                    <span className="text-[10px] text-neutral-500">92% slot utilization rate</span>
                  </div>

                  <div className="p-4 bg-[#fcfaf6] border border-[#e8e2d4] rounded-2xl space-y-1">
                    <span className="text-[10px] uppercase font-bold text-neutral-400">Active Home Dispatches</span>
                    <p className="font-serif text-2xl font-bold text-blue-700">{activeDispatchesCount}</p>
                    <span className="text-[10px] text-neutral-500">Within 15 km branch radius</span>
                  </div>

                  <div className="p-4 bg-[#fcfaf6] border border-[#e8e2d4] rounded-2xl space-y-1">
                    <span className="text-[10px] uppercase font-bold text-neutral-400">Academy Leads</span>
                    <p className="font-serif text-2xl font-bold text-purple-700">{pendingAcademyLeadsCount}</p>
                    <span className="text-[10px] text-neutral-500">Upcoming cohort admissions</span>
                  </div>
                </div>

                {/* Recent Bookings Feed & Branch Util */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="border border-[#e8e2d4] rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-[#ece7dc] pb-2">
                      <h5 className="font-serif font-bold text-sm text-neutral-950">Recent Appointments</h5>
                      <button onClick={() => setActiveTab('appointments')} className="text-xs text-[#8e6c15] font-semibold hover:underline">
                        View All →
                      </button>
                    </div>
                    <div className="space-y-2 text-xs">
                      {appointments.slice(0, 4).map((a) => (
                        <div key={a.id} className="p-2.5 bg-[#faf8f4] rounded-xl flex items-center justify-between">
                          <div>
                            <span className="font-bold text-neutral-900 block">{a.clientName}</span>
                            <span className="text-neutral-500 text-[10px]">{a.service?.name || 'Sanctuary Ritual'} • {a.timeSlot}</span>
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                            {a.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border border-[#e8e2d4] rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-[#ece7dc] pb-2">
                      <h5 className="font-serif font-bold text-sm text-neutral-950">Branch Network Performance</h5>
                      <span className="text-[10px] text-neutral-400">3 Locations</span>
                    </div>
                    <div className="space-y-3 text-xs">
                      {branches.map((b) => (
                        <div key={b.id} className="p-3 bg-[#faf8f4] rounded-xl space-y-1">
                          <div className="flex justify-between font-bold text-neutral-900">
                            <span>{b.name}</span>
                            <span className="text-[#8e6c15]">{b.serviceRadiusKm} km Radius</span>
                          </div>
                          <p className="text-[11px] text-neutral-500">{b.address}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 2: Appointments Management */}
            {activeTab === 'appointments' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-neutral-950">Appointments & Schedule Planner</h4>
                    <p className="text-xs text-neutral-500">Live booking engine records across all branches.</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={appointmentBranchFilter}
                      onChange={(e) => setAppointmentBranchFilter(e.target.value)}
                      className="bg-[#faf8f4] border border-[#e2d8c3] rounded-xl px-2.5 py-1.5 text-xs font-semibold outline-hidden"
                    >
                      <option value="All">All Branches</option>
                      {branches.map((b) => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                      ))}
                    </select>

                    <select
                      value={appointmentStatusFilter}
                      onChange={(e) => setAppointmentStatusFilter(e.target.value)}
                      className="bg-[#faf8f4] border border-[#e2d8c3] rounded-xl px-2.5 py-1.5 text-xs font-semibold outline-hidden"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div className="border border-[#e8e2d4] rounded-2xl overflow-hidden shadow-xs">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#faf8f4] border-b border-[#ece7dc] text-[10px] uppercase font-bold text-neutral-500">
                      <tr>
                        <th className="p-3">Pass / Code</th>
                        <th className="p-3">Client</th>
                        <th className="p-3">Ritual</th>
                        <th className="p-3">Curator</th>
                        <th className="p-3">Date & Slot</th>
                        <th className="p-3">Total / Paid</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f0ebe0]">
                      {filteredAppointments.map((a) => (
                        <tr key={a.id} className="hover:bg-[#fcfaf6] transition">
                          <td className="p-3 font-mono font-bold text-[#8e6c15]">{a.confirmationCode}</td>
                          <td className="p-3">
                            <span className="font-bold text-neutral-900 block">{a.clientName}</span>
                            <span className="text-[10px] text-neutral-400">{a.clientPhone}</span>
                          </td>
                          <td className="p-3 font-semibold text-neutral-900">{a.service?.name || 'Sanctuary Ritual'}</td>
                          <td className="p-3 text-neutral-700">{a.stylist?.name || 'Master Curator'}</td>
                          <td className="p-3 text-neutral-700 whitespace-nowrap">{a.date} • {a.timeSlot}</td>
                          <td className="p-3 font-semibold text-neutral-900">
                            ₹{a.totalPrice} <span className="text-[10px] text-neutral-400">({a.paymentOption})</span>
                          </td>
                          <td className="p-3">
                            <span
                              className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full ${
                                a.status === 'Confirmed'
                                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                  : a.status === 'Completed'
                                  ? 'bg-blue-50 text-blue-800 border border-blue-200'
                                  : 'bg-red-50 text-red-700 border border-red-200'
                              }`}
                            >
                              {a.status}
                            </span>
                          </td>
                          <td className="p-3 text-right space-x-1 whitespace-nowrap">
                            {a.status === 'Confirmed' && (
                              <>
                                <button
                                  onClick={() => salonStore.updateAppointmentStatus(a.id, 'Completed')}
                                  className="px-2 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded text-[10px] font-bold"
                                >
                                  Complete
                                </button>
                                <button
                                  onClick={() => salonStore.updateAppointmentStatus(a.id, 'Cancelled')}
                                  className="px-2 py-1 bg-red-50 text-red-600 hover:bg-red-100 rounded text-[10px] font-bold"
                                >
                                  Cancel
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* MODULE 3: Customer CRM */}
            {activeTab === 'customers' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-neutral-950">Customer Directory & Lifetime Value CRM</h4>
                    <p className="text-xs text-neutral-500">All registered guests, booking histories and spend metrics.</p>
                  </div>
                  <div className="relative w-64">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-400" />
                    <input
                      type="text"
                      value={customerSearch}
                      onChange={(e) => setCustomerSearch(e.target.value)}
                      placeholder="Search by name, phone or email..."
                      className="w-full bg-[#faf8f4] border border-[#e2d8c3] rounded-xl pl-8 pr-3 py-1.5 text-xs outline-hidden"
                    />
                  </div>
                </div>

                <div className="border border-[#e8e2d4] rounded-2xl overflow-hidden shadow-xs">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#faf8f4] border-b border-[#ece7dc] text-[10px] uppercase font-bold text-neutral-500">
                      <tr>
                        <th className="p-3">Client Name</th>
                        <th className="p-3">Contact</th>
                        <th className="p-3">Total Visits</th>
                        <th className="p-3">Lifetime Spend</th>
                        <th className="p-3">Membership</th>
                        <th className="p-3">Last Visit</th>
                        <th className="p-3">Consultation Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f0ebe0]">
                      {filteredCustomers.map((c) => (
                        <tr key={c.id} className="hover:bg-[#fcfaf6]">
                          <td className="p-3 font-bold text-neutral-950">{c.name}</td>
                          <td className="p-3 text-neutral-600">
                            <div>{c.phone}</div>
                            <div className="text-[10px] text-neutral-400">{c.email}</div>
                          </td>
                          <td className="p-3 text-neutral-900 font-semibold">{c.totalVisits}</td>
                          <td className="p-3 font-serif font-bold text-[#8e6c15]">₹{c.totalSpend.toLocaleString()}</td>
                          <td className="p-3">
                            {c.membershipId ? (
                              <span className="text-[10px] font-bold text-[#8e6c15] bg-[#faf6ed] border border-[#e8ddbe] px-2 py-0.5 rounded-full">
                                {c.membershipId}
                              </span>
                            ) : (
                              <span className="text-[10px] text-neutral-400">Regular</span>
                            )}
                          </td>
                          <td className="p-3 text-neutral-600">{c.lastVisitDate || 'Recent'}</td>
                          <td className="p-3 text-neutral-500 text-[11px] max-w-xs truncate">
                            {c.consultationNotesHistory?.join('; ') || 'No special notes'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* MODULE 4: Staff Management */}
            {activeTab === 'staff' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-neutral-950">Staff Rosters & Specialist Schedules</h4>
                    <p className="text-xs text-neutral-500">Configure master curators, shifts, breaks and commission rates.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {stylists.map((st) => (
                    <div key={st.id} className="p-4 bg-[#faf8f4] border border-[#e8e2d4] rounded-2xl space-y-3 text-xs">
                      <div className="flex items-center gap-3">
                        <img src={st.avatarUrl} alt={st.name} className="w-12 h-12 rounded-full object-cover border border-[#d4af37]" />
                        <div>
                          <h5 className="font-bold text-sm text-neutral-950">{st.name}</h5>
                          <span className="text-[11px] text-[#8e6c15] font-semibold">{st.role}</span>
                          <span className="block text-[10px] text-neutral-500">{st.experienceYears} Years Exp • Rating: ★ {st.rating}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#ece7dc] space-y-1">
                        <div className="flex justify-between text-neutral-600">
                          <span>Commission Rate:</span>
                          <span className="font-bold text-neutral-900">{Math.round((st.commissionRate || 0.15) * 100)}%</span>
                        </div>
                        <div className="flex justify-between text-neutral-600">
                          <span>Working Days:</span>
                          <span className="font-bold text-neutral-900">{st.availableDays.join(', ')}</span>
                        </div>
                        <div className="flex justify-between text-neutral-600">
                          <span>Upcoming Approved Leave:</span>
                          <span className="text-red-700 font-semibold">{st.leaveDates?.join(', ') || 'None scheduled'}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 pt-1">
                        {st.specialties.map((spec) => (
                          <span key={spec} className="text-[9px] bg-white border border-[#ded5c2] px-2 py-0.5 rounded text-neutral-700">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MODULE 5: Service Catalogue Management */}
            {activeTab === 'services' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-neutral-950">Service Catalogue & Pricing Management</h4>
                    <p className="text-xs text-neutral-500">Configure prices, durations, home-service eligibility and membership discount tags.</p>
                  </div>
                  <button
                    onClick={() => setIsAddingService(!isAddingService)}
                    className="py-1.5 px-3 bg-neutral-900 text-white rounded-full text-xs font-bold hover:bg-[#8e6c15] flex items-center gap-1 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{isAddingService ? 'Cancel' : 'Add New Ritual'}</span>
                  </button>
                </div>

                {isAddingService && (
                  <form onSubmit={handleCreateService} className="p-4 bg-[#faf7ef] border border-[#e8deca] rounded-2xl space-y-3 text-xs">
                    <span className="font-bold text-neutral-900 block">Create New Salon Ritual</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-neutral-600 mb-1">Ritual Name</label>
                        <input
                          type="text"
                          required
                          value={newServiceName}
                          onChange={(e) => setNewServiceName(e.target.value)}
                          placeholder="e.g. Diamond Cryo Scalp Ritual"
                          className="w-full bg-white border border-[#ded5c2] rounded-lg px-2.5 py-1.5 outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-neutral-600 mb-1">Price (₹)</label>
                        <input
                          type="number"
                          required
                          value={newServicePrice}
                          onChange={(e) => setNewServicePrice(Number(e.target.value))}
                          className="w-full bg-white border border-[#ded5c2] rounded-lg px-2.5 py-1.5 outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-neutral-600 mb-1">Duration (Mins)</label>
                        <input
                          type="number"
                          required
                          value={newServiceDuration}
                          onChange={(e) => setNewServiceDuration(Number(e.target.value))}
                          className="w-full bg-white border border-[#ded5c2] rounded-lg px-2.5 py-1.5 outline-hidden"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-6 pt-1">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newServiceHomeEligible}
                          onChange={(e) => setNewServiceHomeEligible(e.target.checked)}
                          className="rounded text-[#d4af37]"
                        />
                        <span>Eligible for Salon-at-Home (15 km)</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newServiceMemberEligible}
                          onChange={(e) => setNewServiceMemberEligible(e.target.checked)}
                          className="rounded text-[#d4af37]"
                        />
                        <span>Eligible for Member Benefit Discount</span>
                      </label>
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="py-1.5 px-4 bg-gradient-to-r from-[#d4af37] to-[#c59b27] text-slate-950 font-bold rounded-full"
                      >
                        Save Service
                      </button>
                    </div>
                  </form>
                )}

                <div className="border border-[#e8e2d4] rounded-2xl overflow-hidden shadow-xs">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#faf8f4] border-b border-[#ece7dc] text-[10px] uppercase font-bold text-neutral-500">
                      <tr>
                        <th className="p-3">ID</th>
                        <th className="p-3">Service Name</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Duration</th>
                        <th className="p-3">Price</th>
                        <th className="p-3">At Home Eligible</th>
                        <th className="p-3">Member Benefit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f0ebe0]">
                      {services.map((s) => (
                        <tr key={s.id} className="hover:bg-[#fcfaf6]">
                          <td className="p-3 font-mono text-neutral-400">{s.id}</td>
                          <td className="p-3 font-bold text-neutral-900">{s.name}</td>
                          <td className="p-3 text-neutral-600">{s.category}</td>
                          <td className="p-3 text-neutral-600">{s.durationMinutes} mins</td>
                          <td className="p-3 font-serif font-bold text-[#8e6c15]">₹{s.price.toLocaleString()}</td>
                          <td className="p-3">
                            {s.homeServiceEligible ? (
                              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Yes
                              </span>
                            ) : (
                              <span className="text-neutral-400">In-Salon Only</span>
                            )}
                          </td>
                          <td className="p-3">
                            {s.membershipDiscountEligible ? (
                              <span className="text-[#8e6c15] font-semibold">Eligible (50%)</span>
                            ) : (
                              <span className="text-neutral-400">Standard</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* MODULE 6: Home-Service & Radius Configuration */}
            {activeTab === 'homeService' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-neutral-950">Salon-at-Home Dispatch & Radius Control</h4>
                    <p className="text-xs text-neutral-500">Configure branch-specific radius limits and advance live specialist dispatch stages.</p>
                  </div>
                </div>

                {/* Admin Radius Config Section */}
                <div className="p-4 bg-[#faf7ef] border border-[#e8deca] rounded-2xl space-y-2 text-xs">
                  <span className="font-bold text-neutral-900 block">Configure Branch Service Radius (Not Hard-Coded):</span>
                  <div className="flex flex-wrap items-center gap-3">
                    <select
                      value={editingBranchId}
                      onChange={(e) => setEditingBranchId(e.target.value)}
                      className="bg-white border border-[#ded5c2] rounded-xl px-3 py-1.5 font-semibold text-xs outline-hidden"
                    >
                      {branches.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.name} (Current: {b.serviceRadiusKm} km)
                        </option>
                      ))}
                    </select>

                    <div className="flex items-center gap-1.5">
                      <span className="text-neutral-600">Max Radius (km):</span>
                      <input
                        type="number"
                        min={5}
                        max={50}
                        value={newRadiusInput}
                        onChange={(e) => setNewRadiusInput(Number(e.target.value))}
                        className="w-20 bg-white border border-[#ded5c2] rounded-xl px-2 py-1 text-center font-bold text-xs"
                      />
                    </div>

                    <button
                      onClick={handleSaveRadius}
                      className="py-1.5 px-4 bg-neutral-900 text-white rounded-full font-bold text-xs hover:bg-[#8e6c15]"
                    >
                      Update Branch Radius
                    </button>
                  </div>
                </div>

                {/* Active Dispatches Table */}
                <div className="border border-[#e8e2d4] rounded-2xl overflow-hidden shadow-xs">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#faf8f4] border-b border-[#ece7dc] text-[10px] uppercase font-bold text-neutral-500">
                      <tr>
                        <th className="p-3">Order</th>
                        <th className="p-3">Client</th>
                        <th className="p-3">Address & Radius Distance</th>
                        <th className="p-3">Ritual</th>
                        <th className="p-3">Specialist</th>
                        <th className="p-3">Dispatch Stage</th>
                        <th className="p-3 text-right">Advance Stage</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f0ebe0]">
                      {homeServices.map((h) => (
                        <tr key={h.id} className="hover:bg-[#fcfaf6]">
                          <td className="p-3 font-mono font-bold text-[#8e6c15]">{h.code}</td>
                          <td className="p-3 font-bold text-neutral-900">{h.clientName}</td>
                          <td className="p-3 text-neutral-600">
                            <div>{h.address}</div>
                            <div className="text-[10px] text-[#8e6c15] font-semibold">{h.calculatedDistanceKm} km from {h.branch?.name || 'Sanctuary'}</div>
                          </td>
                          <td className="p-3 text-neutral-900 font-semibold">{h.service?.name || 'Home Ritual'}</td>
                          <td className="p-3 text-neutral-700">{h.stylist?.name || 'Specialist'}</td>
                          <td className="p-3">
                            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#faf6ed] text-[#8e6c15] border border-[#e8ddbe]">
                              {h.dispatchStatus}
                            </span>
                          </td>
                          <td className="p-3 text-right space-x-1 whitespace-nowrap">
                            <select
                              value={h.dispatchStatus}
                              onChange={(e) =>
                                salonStore.updateHomeServiceStatus(h.id, e.target.value as HomeServiceBooking['dispatchStatus'])
                              }
                              className="text-[10px] font-bold bg-[#faf8f4] border border-[#ded5c2] rounded px-2 py-1 outline-hidden"
                            >
                              <option value="Assigned">Assigned</option>
                              <option value="On the Way">On the Way</option>
                              <option value="Arrived">Arrived</option>
                              <option value="Service Started">Service Started</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* MODULE 7: Consultation CRM */}
            {activeTab === 'consultations' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-neutral-950">Hair & Skin Consultation CRM</h4>
                    <p className="text-xs text-neutral-500">Review client photos, diagnosis notes, and 100% credit adjustment status.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {consultations.map((c) => (
                    <div key={c.id} className="p-4 bg-[#faf8f4] border border-[#e8e2d4] rounded-2xl space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-neutral-950">{c.clientName}</span>
                        <span className="font-mono text-[10px] text-[#8e6c15] bg-[#faf6ed] px-2 py-0.5 rounded border border-[#e8ddbe]">
                          {c.code}
                        </span>
                      </div>
                      <p className="text-neutral-500">
                        {c.type} • <strong>{c.mode}</strong> with {c.stylist?.name || 'Specialist'}
                      </p>
                      <div className="p-2.5 bg-white rounded-xl border border-[#ece7dc] space-y-1">
                        <span className="text-[10px] font-bold uppercase text-neutral-400">Client Concern:</span>
                        <p className="text-neutral-700 italic">"{c.concerns}"</p>
                      </div>
                      <div className="flex justify-between items-center text-[11px] pt-1 border-t border-[#ece7dc]">
                        <span className="text-emerald-700 font-bold">Fee: ₹{c.fee} (Adjustable on Treatment)</span>
                        <span className="text-neutral-500">Status: {c.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MODULE 8: Promotional Offers & Combos */}
            {activeTab === 'offers' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-neutral-950">Coupons, Weekday Offers & Combo Packages</h4>
                    <p className="text-xs text-neutral-500">Activate or deactivate promotional campaign codes.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {offers.map((offer) => (
                    <div key={offer.id} className="p-4 bg-[#faf8f4] border border-[#e8e2d4] rounded-2xl space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-xs bg-[#faf6ed] text-[#8e6c15] px-2 py-0.5 rounded border border-[#e8ddbe]">
                          {offer.code}
                        </span>
                        <button
                          onClick={() => salonStore.toggleOffer(offer.id, !offer.active)}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition ${
                            offer.active ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-neutral-200 text-neutral-600 border-neutral-300'
                          }`}
                        >
                          {offer.active ? 'Active' : 'Inactive'}
                        </button>
                      </div>
                      <h5 className="font-bold text-sm text-neutral-900">{offer.title}</h5>
                      <p className="text-neutral-600">{offer.description}</p>
                      <div className="flex justify-between text-[10px] text-neutral-400 pt-1 border-t border-[#ece7dc]">
                        <span>Used: {offer.timesUsed} / {offer.usageLimit}</span>
                        <span>Valid: {offer.validFrom} to {offer.validTo}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MODULE 9: Academy Leads */}
            {activeTab === 'academy' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-neutral-950">Academy Student Admissions & Leads</h4>
                    <p className="text-xs text-neutral-500">Review prospective stylists applying for certified diplomas.</p>
                  </div>
                </div>

                <div className="border border-[#e8e2d4] rounded-2xl overflow-hidden shadow-xs">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#faf8f4] border-b border-[#ece7dc] text-[10px] uppercase font-bold text-neutral-500">
                      <tr>
                        <th className="p-3">Application ID</th>
                        <th className="p-3">Applicant</th>
                        <th className="p-3">Course Applied</th>
                        <th className="p-3">Batch</th>
                        <th className="p-3">Experience</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Update Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f0ebe0]">
                      {academyApps.map((app) => (
                        <tr key={app.id} className="hover:bg-[#fcfaf6]">
                          <td className="p-3 font-mono font-bold text-[#8e6c15]">{app.code}</td>
                          <td className="p-3">
                            <span className="font-bold text-neutral-900 block">{app.applicantName}</span>
                            <span className="text-[10px] text-neutral-400">{app.applicantPhone}</span>
                          </td>
                          <td className="p-3 font-semibold text-neutral-900">{app.courseTitle}</td>
                          <td className="p-3 text-neutral-700">{app.selectedBatch}</td>
                          <td className="p-3 text-neutral-600 max-w-xs truncate">{app.backgroundExperience}</td>
                          <td className="p-3">
                            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                              {app.status}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <select
                              value={app.status}
                              onChange={(e) =>
                                salonStore.updateAcademyApplicationStatus(app.id, e.target.value as AcademyApplication['status'])
                              }
                              className="text-[10px] font-bold bg-[#faf8f4] border border-[#ded5c2] rounded px-2 py-1 outline-hidden"
                            >
                              <option value="Pending Review">Pending</option>
                              <option value="Interview Scheduled">Interview</option>
                              <option value="Admission Granted">Admitted</option>
                              <option value="Waitlisted">Waitlist</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* MODULE 10: Reports & Analytics */}
            {activeTab === 'reports' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-neutral-950">Financial & Resource Analytics</h4>
                    <p className="text-xs text-neutral-500">Cross-channel revenue performance and staff utilization metrics.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-[#faf8f4] border border-[#e8e2d4] rounded-2xl space-y-2 text-xs">
                    <span className="text-[10px] uppercase font-bold text-neutral-400">Total Bookings Recorded</span>
                    <p className="font-serif text-2xl font-bold text-neutral-950">{appointments.length}</p>
                    <p className="text-neutral-500">In-salon reservations across all 3 branches.</p>
                  </div>

                  <div className="p-4 bg-[#faf8f4] border border-[#e8e2d4] rounded-2xl space-y-2 text-xs">
                    <span className="text-[10px] uppercase font-bold text-neutral-400">Home Service Dispatches</span>
                    <p className="font-serif text-2xl font-bold text-[#8e6c15]">{homeServices.length}</p>
                    <p className="text-neutral-500">100% within 15 km branch radius validation.</p>
                  </div>

                  <div className="p-4 bg-[#faf8f4] border border-[#e8e2d4] rounded-2xl space-y-2 text-xs">
                    <span className="text-[10px] uppercase font-bold text-neutral-400">Paid Consultations</span>
                    <p className="font-serif text-2xl font-bold text-emerald-800">{consultations.length}</p>
                    <p className="text-neutral-500">Hair & skin specialist assessments.</p>
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 11: Audit Trail */}
            {activeTab === 'audit' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-neutral-950">Security Audit Logs</h4>
                    <p className="text-xs text-neutral-500">Immutable trace of admin actions, status transitions and bookings.</p>
                  </div>
                </div>

                <div className="border border-[#e8e2d4] rounded-2xl overflow-hidden shadow-xs">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#faf8f4] border-b border-[#ece7dc] text-[10px] uppercase font-bold text-neutral-500">
                      <tr>
                        <th className="p-3">Timestamp</th>
                        <th className="p-3">Actor / Role</th>
                        <th className="p-3">Action</th>
                        <th className="p-3">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f0ebe0]">
                      {auditLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-[#fcfaf6]">
                          <td className="p-3 font-mono text-neutral-400 whitespace-nowrap">{log.timestamp}</td>
                          <td className="p-3">
                            <span className="font-bold text-[#8e6c15]">{log.actorName}</span>
                          </td>
                          <td className="p-3 font-semibold text-neutral-900">{log.action}</td>
                          <td className="p-3 text-neutral-600">{log.details}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

