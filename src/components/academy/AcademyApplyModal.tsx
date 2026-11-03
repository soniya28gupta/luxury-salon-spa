import React, { useState } from 'react';
import { X, GraduationCap, Sparkles, CheckCircle2, Calendar, User, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AcademyCourse, AcademyApplication } from '../../types';
import { salonStore } from '../../services/salonStore';

interface AcademyApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCourse: AcademyCourse | null;
}

export const AcademyApplyModal: React.FC<AcademyApplyModalProps> = ({
  isOpen,
  onClose,
  selectedCourse
}) => {
  const [applicantName, setApplicantName] = useState('Rhea Kapoor');
  const [applicantPhone, setApplicantPhone] = useState('+91 98200 88776');
  const [applicantEmail, setApplicantEmail] = useState('rhea.k@designstudio.in');
  const [selectedBatch, setSelectedBatch] = useState<string>(
    selectedCourse?.batchDates[0] || 'Upcoming Batch'
  );
  const [backgroundExperience, setBackgroundExperience] = useState(
    '2 years salon experience in styling and color chemistry.'
  );
  const [notes, setNotes] = useState('Interested in international certification.');
  const [submittedApp, setSubmittedApp] = useState<AcademyApplication | null>(null);

  if (!isOpen || !selectedCourse) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const app: AcademyApplication = {
      id: `APP-${Date.now()}`,
      code: `ACAD-APP-${Math.floor(1000 + Math.random() * 9000)}`,
      courseId: selectedCourse.id,
      courseTitle: selectedCourse.title,
      applicantName,
      applicantPhone,
      applicantEmail,
      selectedBatch,
      backgroundExperience,
      notes,
      status: 'Pending Review',
      appliedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    salonStore.addAcademyApplication(app);
    setSubmittedApp(app);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white border border-[#e2d8c3] rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl text-neutral-900 my-6 relative">
        <div className="flex items-center justify-between pb-4 border-b border-[#ece7dc]">
          <div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#bfa15f]" />
              <h3 className="font-serif text-lg sm:text-xl font-bold text-neutral-950">
                {submittedApp ? 'Application Submitted' : 'Apply for Academy Diploma'}
              </h3>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">{selectedCourse.title}</p>
          </div>
          <button onClick={onClose} className="p-1 text-neutral-400 hover:text-black rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedApp ? (
          <div className="space-y-5 animate-fadeIn">
            <div className="bg-[#fcfaf6] border border-[#e8ddbe] rounded-2xl p-6 text-center space-y-3">
              <span className="inline-block p-3 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                <CheckCircle2 className="w-7 h-7" />
              </span>
              <h4 className="font-serif text-xl font-bold text-neutral-950">
                Application #{submittedApp.code} Received
              </h4>
              <p className="text-xs text-neutral-600 max-w-sm mx-auto">
                Our Academy Dean and admissions coordinator will review your profile for the <strong>{submittedApp.selectedBatch}</strong> cohort within 24 hours.
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#c59b27] text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-md hover:brightness-105"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-3 bg-[#fcfaf6] border border-[#e8e2d4] rounded-2xl text-xs space-y-1">
              <div className="flex justify-between text-neutral-600">
                <span>Course Fee:</span>
                <span className="font-bold text-neutral-900">₹{selectedCourse.fee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Duration:</span>
                <span className="font-bold text-neutral-900">{selectedCourse.duration}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Lead Trainer:</span>
                <span className="font-bold text-[#8e6c15]">{selectedCourse.trainerName}</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Select Batch Date
              </label>
              <select
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="w-full bg-[#fdfbf7] border border-[#e2d8c3] rounded-xl px-3 py-2 text-xs outline-hidden"
              >
                {selectedCourse.batchDates.map((d) => (
                  <option key={d} value={d}>
                    {d} ({selectedCourse.seatsRemaining} seats remaining)
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Applicant Name
                </label>
                <input
                  type="text"
                  required
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="w-full bg-[#fdfbf7] border border-[#e2d8c3] rounded-xl px-3 py-2 text-xs outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  required
                  value={applicantPhone}
                  onChange={(e) => setApplicantPhone(e.target.value)}
                  className="w-full bg-[#fdfbf7] border border-[#e2d8c3] rounded-xl px-3 py-2 text-xs outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={applicantEmail}
                onChange={(e) => setApplicantEmail(e.target.value)}
                className="w-full bg-[#fdfbf7] border border-[#e2d8c3] rounded-xl px-3 py-2 text-xs outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Previous Education / Styling Experience
              </label>
              <textarea
                rows={2}
                value={backgroundExperience}
                onChange={(e) => setBackgroundExperience(e.target.value)}
                placeholder="Mention past training, salons worked with, or beginner status..."
                className="w-full bg-[#fdfbf7] border border-[#e2d8c3] rounded-xl px-3 py-2 text-xs outline-hidden"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#c59b27] text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-md hover:brightness-105 active:scale-95"
            >
              Submit Academy Application
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

