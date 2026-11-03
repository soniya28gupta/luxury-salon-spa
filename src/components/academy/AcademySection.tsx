import React, { useState } from 'react';
import { Sparkles, GraduationCap, Clock, Award, Calendar, ArrowRight, UserCheck } from 'lucide-react';
import { AcademyCourse } from '../../types';
import { salonStore } from '../../services/salonStore';
import { AcademyApplyModal } from './AcademyApplyModal';

export const AcademySection: React.FC = () => {
  const courses = salonStore.getAcademyCourses();
  const [selectedCourse, setSelectedCourse] = useState<AcademyCourse | null>(null);

  return (
    <section id="academy" className="py-20 px-4 max-w-7xl mx-auto bg-white">
      <div className="text-center space-y-3 mb-12">
        <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#9e7d23] flex items-center justify-center gap-1.5">
          <GraduationCap className="w-4 h-4 text-[#bfa15f]" />
          Aura International Academy of Haute Coiffure & Aesthetics
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-950">
          Master The Art of Haute Beauty & Dermal Science
        </h2>
        <p className="max-w-xl mx-auto text-xs sm:text-sm text-neutral-600 font-light">
          Certified European diplomas and clinical masterclasses trained directly under our internationally acclaimed master directors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-[#faf8f4] border border-[#e8e2d4] hover:border-[#d4af37] rounded-3xl overflow-hidden shadow-xs hover:shadow-lg transition flex flex-col sm:flex-row group"
          >
            <div className="sm:w-2/5 relative h-56 sm:h-auto overflow-hidden">
              <img
                src={course.imageUrl}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <span className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md text-[#d4af37] text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-[#d4af37]/40">
                {course.level}
              </span>
            </div>

            <div className="sm:w-3/5 p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-lg text-neutral-950 leading-snug">
                  {course.title}
                </h3>
                <p className="text-xs text-[#8e6c15] font-semibold flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-[#bfa15f]" />
                  Trainer: {course.trainerName} ({course.trainerRole})
                </p>

                <div className="pt-2 border-t border-[#ece7dc] space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                    Curriculum Summary:
                  </span>
                  <ul className="space-y-1">
                    {course.syllabusSummary.map((item, idx) => (
                      <li key={idx} className="text-xs text-neutral-600 flex items-start gap-1.5 leading-tight">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-[#ece7dc] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#bfa15f]" />
                    {course.duration}
                  </span>
                  <span className="font-serif font-bold text-base text-neutral-950">
                    ₹{course.fee.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-neutral-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#bfa15f]" /> Next: {course.batchDates[0]}
                  </span>
                  <span className="text-[#8e6c15] font-semibold">
                    {course.seatsRemaining} Seats Remaining
                  </span>
                </div>

                <button
                  onClick={() => setSelectedCourse(course)}
                  className="w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#c59b27] text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-xs hover:brightness-105 active:scale-95 transition flex items-center justify-center gap-1.5"
                >
                  <span>Apply For Diploma</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AcademyApplyModal
        isOpen={!!selectedCourse}
        onClose={() => setSelectedCourse(null)}
        selectedCourse={selectedCourse}
      />
    </section>
  );
};

