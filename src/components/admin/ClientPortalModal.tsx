import React from 'react';
import { X, Calendar, Clock, User, CheckCircle2, AlertCircle, Trash2, RotateCcw } from 'lucide-react';
import { Appointment } from '../../types';

interface ClientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: Appointment[];
  onCancelAppointment: (id: string) => void;
}

export const ClientPortalModal: React.FC<ClientPortalModalProps> = ({
  isOpen,
  onClose,
  appointments,
  onCancelAppointment
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white border border-[#e2d8c3] rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl text-neutral-900 my-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#ece7dc]">
          <div>
            <h3 className="font-serif text-lg font-bold text-neutral-950">Guest Sanctuary Passes</h3>
            <p className="text-xs text-neutral-500">View and manage your upcoming reservations</p>
          </div>
          <button onClick={onClose} className="p-1 text-neutral-400 hover:text-black rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 max-h-[60vh] overflow-y-auto">
          {appointments.length === 0 ? (
            <p className="text-center text-neutral-400 py-8 text-xs">
              No active reservations found. Use "Book Ritual" or our AI Concierge to reserve.
            </p>
          ) : (
            appointments.map((apt) => (
              <div
                key={apt.id}
                className="bg-[#fcfaf6] border border-[#e8e2d4] hover:border-[#d4af37] rounded-2xl p-4 space-y-2.5 transition shadow-xs"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-sm text-neutral-950">
                        {apt.service?.name || 'Sanctuary Ritual'}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-[#8e6c15] bg-[#faf6ed] px-2 py-0.5 rounded border border-[#e8ddbe]">
                        {apt.confirmationCode}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Master Curator: <strong className="text-neutral-800">{apt.stylist?.name || 'Master Curator'}</strong>
                    </p>
                  </div>
                  <span
                    className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full ${
                      apt.status === 'Confirmed'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-red-50 text-red-600 border border-red-200'
                    }`}
                  >
                    {apt.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-neutral-600 pt-2 border-t border-[#ece7dc]">
                  <div>
                    <span className="block text-[10px] uppercase text-neutral-400 font-semibold">Date & Slot</span>
                    <span className="text-neutral-900 font-medium">{apt.date} • {apt.timeSlot}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-neutral-400 font-semibold">Channel</span>
                    <span className="text-[#8e6c15] font-medium">{apt.bookingSource}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-neutral-400 font-semibold">Guest</span>
                    <span className="text-neutral-900 font-medium">{apt.clientName}</span>
                  </div>
                </div>

                {apt.status === 'Confirmed' && (
                  <div className="flex justify-end pt-2 border-t border-[#ece7dc]">
                    <button
                      onClick={() => onCancelAppointment(apt.id)}
                      className="text-red-600 hover:text-red-700 text-[11px] font-semibold flex items-center gap-1 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Cancel Reservation</span>
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
