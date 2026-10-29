import React from 'react';
import { Physiotherapist } from '../types';
import { Award, Globe, Phone, ShieldCheck, MapPin, Calendar, ExternalLink } from 'lucide-react';

interface FounderSectionProps {
  founder: Physiotherapist;
  currencySymbol: string;
  initialFee: number;
  onViewProfile: (therapist: Physiotherapist) => void;
  onBook: (therapist: Physiotherapist) => void;
}

export const FounderSection: React.FC<FounderSectionProps> = ({
  founder,
  currencySymbol,
  initialFee,
  onViewProfile,
  onBook,
}) => {
  return (
    <section className="bg-slate-900 text-white rounded-3xl p-6 md:p-10 border border-slate-800 shadow-xl overflow-hidden relative">
      {/* Subtle clinical gradient glow using the 4-color palette */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Founder Authentic Photo & Designation */}
        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-center gap-6 text-center sm:text-left lg:text-center">
          <div className="relative">
            <img
              src="/assets/aistudio/dr_heta_8644463c.jpg"
              alt="Dr. Heta Doshi (PT)"
              referrerPolicy="no-referrer"
              className="w-36 h-36 md:w-44 md:h-44 rounded-3xl object-cover object-top border-2 border-teal-500/50 shadow-2xl mx-auto bg-slate-800"
            />
            <div
              className="absolute -bottom-2 -right-2 bg-teal-700 text-white rounded-full p-2 shadow-lg border-2 border-slate-900"
              title="Verified Academic & Clinical Specialist"
            >
              <ShieldCheck className="w-5 h-5 text-teal-200" />
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-300 bg-teal-950/80 border border-teal-800/80 px-3 py-1 rounded-full mb-1.5">
              <span>Founder & Clinical Director</span>
            </div>
            <h3 className="text-2xl font-extrabold text-white tracking-tight">
              Dr. Heta Doshi (PT)
            </h3>
            <p className="text-xs text-teal-200 font-semibold mt-1">
              Ph.D. Scholar · M.P.Th. in Musculoskeletal & Sports
            </p>
            <p className="text-xs text-slate-300 mt-1">
              Assistant Professor, Faculty of Physiotherapy
            </p>
          </div>
        </div>

        {/* Academic Affiliation, Credo & Institutional Details */}
        <div className="lg:col-span-8 space-y-4">
          <div>
            <span className="text-[11px] font-bold tracking-wider text-teal-400 uppercase">
              Clinical & Research Leadership
            </span>
            <h4 className="text-xl md:text-2xl font-extrabold text-white mt-0.5 tracking-tight">
              ADVANCED MUSCULOSKELETAL & SPORTS PHYSIOTHERAPY PRACTICE
            </h4>
            <div className="flex items-center gap-2 text-xs text-slate-300 mt-1 flex-wrap">
              <span className="font-semibold text-teal-300">SPECIALIST CLINICAL RESEARCH</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Evidence-Informed Orthopaedic Rehabilitation</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Vadodara, India & Global Telehealth</span>
            </div>
          </div>

          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            "PhysioMatch AI bridges rigorous academic biomechanics with personalized clinical rehabilitation. Rather than leaving patients to generic trial-and-error treatments, we match your exact anatomical pain zone and chronicity with evidence-informed joint mobilization, directional load protocols, and active restoration."
          </p>

          {/* 3 Core Academic Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-xs">
              <div className="text-teal-400 font-bold text-sm">M.P.Th. Specialist</div>
              <div className="text-[11px] text-slate-300 mt-1 leading-snug">
                Musculoskeletal & Sports Kinetic Biomechanics
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-xs">
              <div className="text-teal-400 font-bold text-sm">Ph.D. Doctoral Scholar</div>
              <div className="text-[11px] text-slate-300 mt-1 leading-snug">
                Translational Spine & Sports Clinical Research
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-xs">
              <div className="text-teal-400 font-bold text-sm">Certified Mulligan CMP</div>
              <div className="text-[11px] text-slate-300 mt-1 leading-snug">
                Mobilization with Movement & Maitland Spine
              </div>
            </div>
          </div>

          {/* Contact Details & Direct Booking Action */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-4 text-xs text-slate-300 flex-wrap">
              <div className="flex items-center gap-1.5 font-medium text-teal-300">
                <MapPin className="w-3.5 h-3.5 text-teal-400" />
                <span>Vadodara · Gujarat</span>
              </div>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <a
                href={`tel:${founder.contactMobile}`}
                className="hover:text-teal-300 transition-colors flex items-center gap-1.5 font-medium"
              >
                <Phone className="w-3.5 h-3.5 text-teal-400" />
                <span>Mobile: {founder.contactMobile}</span>
              </a>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => onViewProfile(founder)}
                className="px-4 py-2.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors border border-slate-700"
              >
                Academic Credentials
              </button>
              <button
                type="button"
                onClick={() => onBook(founder)}
                className="px-5 py-2.5 text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 rounded-xl transition-all shadow-md flex items-center gap-1.5 active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                <span>Consult with Dr. Heta Doshi ({currencySymbol}{initialFee})</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
