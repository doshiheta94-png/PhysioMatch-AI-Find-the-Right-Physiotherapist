import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, Shield } from 'lucide-react';

interface FacilitySlide {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  clinicalApplication: string;
}

const FACILITIES: FacilitySlide[] = [
  {
    id: '1',
    title: 'Parul University Musculoskeletal Biomechanics Lab',
    category: 'Kinetic & Gait Analysis',
    description: 'High-speed multi-camera video capture with synchronized ground reaction force plates to detect subtle asymmetry during running, jumping, and lifting.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
    clinicalApplication: 'ACL return-to-sport testing, patellofemoral tracking, and running gait retraining.',
  },
  {
    id: '2',
    title: 'Diagnostic Ultrasound & Guided Needling Suite',
    category: 'Tissue Imaging & Intervention',
    description: 'Real-time high-resolution sonography evaluating tendon fibrillar integrity, rotator cuff tears, and guided dry needling precision.',
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    clinicalApplication: 'Calcific tendinopathy, recalcitrant heel spurs, and deep myofascial release.',
  },
  {
    id: '3',
    title: 'Blood Flow Restriction (BFR) & Isokinetic Rehab',
    category: 'Neuromuscular Adaptation',
    description: 'Doppler-calibrated pneumatic cuffs allowing muscle hypertrophy and strength gains using only 20-30% of 1RM, protecting healing ligaments.',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    clinicalApplication: 'Early post-op knee reconstruction, severe osteoarthritis, and rotator cuff repairs.',
  },
  {
    id: '4',
    title: 'Infrared Video Frenzel Vestibular Balance Suite',
    category: 'Neuro-Vestibular Diagnostics',
    description: 'Darkened infrared goggle system that records involuntary micro-nystagmus to differentiate inner ear canalith displacement from central pathology.',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    clinicalApplication: 'BPPV repositioning, post-concussive dizziness, and cervicogenic vertigo.',
  },
];

export const FacilityCarousel: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const prev = () => {
    setActiveIdx((curr) => (curr === 0 ? FACILITIES.length - 1 : curr - 1));
  };

  const next = () => {
    setActiveIdx((curr) => (curr === FACILITIES.length - 1 ? 0 : curr + 1));
  };

  const slide = FACILITIES[activeIdx];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-teal-800">
            Specialized Clinical Technology
          </span>
          <h3 className="text-lg font-bold text-slate-900 mt-0.5">
            Diagnostic & Rehabilitation Equipment
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prev}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono font-medium text-slate-400">
            {activeIdx + 1} / {FACILITIES.length}
          </span>
          <button
            type="button"
            onClick={next}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Visual Media with Scrim */}
        <div className="md:col-span-6 relative rounded-xl overflow-hidden aspect-video border border-slate-200 bg-slate-100">
          <img
            src={slide.imageUrl}
            alt={slide.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-4">
            <span className="text-xs font-semibold text-white bg-slate-900/80 backdrop-blur-xs px-2.5 py-1 rounded-md">
              {slide.category}
            </span>
          </div>
        </div>

        {/* Text Description */}
        <div className="md:col-span-6 space-y-3">
          <h4 className="text-base md:text-lg font-bold text-slate-900 leading-snug">
            {slide.title}
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            {slide.description}
          </p>

          <div className="p-3 bg-teal-50/70 rounded-xl border border-teal-100">
            <div className="text-[11px] font-bold uppercase tracking-wider text-teal-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
              <span>Evidence Clinical Application</span>
            </div>
            <p className="text-xs text-slate-700 mt-1 font-medium">
              {slide.clinicalApplication}
            </p>
          </div>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex items-center justify-center gap-1.5 pt-2">
        {FACILITIES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveIdx(i)}
            className={`h-1.5 rounded-full transition-all ${
              activeIdx === i ? 'w-6 bg-teal-700' : 'w-1.5 bg-slate-200 hover:bg-slate-300'
            }`}
            aria-label={`Jump to equipment slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
