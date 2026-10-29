import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, CheckCircle2 } from 'lucide-react';

interface Testimonial {
  id: string;
  patientName: string;
  condition: string;
  specialist: string;
  technique: string;
  outcomeMetric: string;
  quote: string;
  duration: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    patientName: 'Rohan Mehta',
    condition: 'Chronic Lumbar Radiculopathy (L4-L5 Disc Extrusion)',
    specialist: 'Dr. Heta Doshi (PT) · Parul University',
    technique: 'Mulligan Mobilization with Movement & Progressive Biomechanical Loading',
    outcomeMetric: 'VAS 8/10 down to 0/10 · Avoided spinal surgery',
    quote: 'I had visited three general clinics without relief. Dr. Heta Doshi identified the exact directional movement bias in my lower spine within 20 minutes. Her academic and sports rehab approach allowed me to return to running within 7 weeks.',
    duration: '7 Weeks Rehabilitation',
  },
  {
    id: '2',
    patientName: 'Pooja Varma',
    condition: 'Subacromial Impingement & Rotator Cuff Tendinopathy',
    specialist: 'Dr. Heta Doshi (PT) · Parul University',
    technique: 'Mulligan MWM Shoulder Glide & Kinetic Chain Loading',
    outcomeMetric: '100% Pain-Free Overhead Reaching',
    quote: 'Dr. Heta Doshi is truly a master of shoulder biomechanics. She did not just give me generic exercises; she used hands-on mobilization with movement so my shoulder moved smoothly on day one.',
    duration: '5 Weeks Program',
  },
  {
    id: '3',
    patientName: 'Kunal Shah',
    condition: 'Post-Surgical ACL Reconstruction & Patellofemoral Pain',
    specialist: 'Dr. Heta Doshi (PT) · Parul University',
    technique: 'Biomechanical Video Gait Analysis & Progressive Quadriceps Loading',
    outcomeMetric: '95% Limb Symmetry Index Achieved',
    quote: 'Under Dr. Heta Doshi’s supervision at Parul Institute of Physiotherapy & Research, my return-to-sport testing was tested with video analytics. I was able to play cricket again with zero swelling.',
    duration: '8 Weeks Sports Protocol',
  },
  {
    id: '4',
    patientName: 'Aarti Desai',
    condition: 'Cervical Spondylosis & Postural Neck Spasms',
    specialist: 'Dr. Heta Doshi (PT) · Parul University',
    technique: 'Maitland Cervical Segmental Mobilization & Deep Flexor Retraining',
    outcomeMetric: 'Headache & Neck Pain Frequency: -88%',
    quote: 'Working long hours at a computer gave me severe neck headaches. Dr. Heta explained the spinal kinematics simply and relieved my pain with precision manual therapy.',
    duration: '4 Weeks Treatment',
  },
];

export const TestimonialSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((curr) => (curr === 0 ? TESTIMONIALS.length - 1 : curr - 1));
  };

  const next = () => {
    setCurrentIndex((curr) => (curr === TESTIMONIALS.length - 1 ? 0 : curr + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-100 gap-2">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-teal-800">
            Clinical Recovery Proof
          </span>
          <h3 className="text-lg md:text-xl font-bold text-slate-900 mt-0.5">
            Verified Patient Recovery Milestones with Dr. Heta Doshi
          </h3>
        </div>

        {/* Carousel Arrows */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prev}
            className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono font-medium text-slate-400">
            {currentIndex + 1} / {TESTIMONIALS.length}
          </span>
          <button
            type="button"
            onClick={next}
            className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left Side: Testimonial Quote */}
        <div className="md:col-span-7 space-y-4">
          <Quote className="w-8 h-8 text-teal-200" />
          <p className="text-sm md:text-base text-slate-800 italic leading-relaxed">
            "{current.quote}"
          </p>
          <div className="pt-2">
            <div className="font-bold text-slate-900 text-sm">{current.patientName}</div>
            <div className="text-xs text-slate-500 font-medium">{current.condition}</div>
          </div>
        </div>

        {/* Right Side: Clinical Mechanism & Outcome Metric */}
        <div className="md:col-span-5 bg-teal-50/60 rounded-xl p-4 md:p-5 border border-teal-100 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-teal-900 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
            <span>Verified Clinical Outcome</span>
          </div>

          <div>
            <div className="text-[11px] text-slate-500 uppercase font-semibold">Treating Specialist</div>
            <div className="text-xs font-bold text-slate-800 mt-0.5">{current.specialist}</div>
          </div>

          <div>
            <div className="text-[11px] text-slate-500 uppercase font-semibold">Technique Applied</div>
            <div className="text-xs text-slate-700 mt-0.5 font-medium">{current.technique}</div>
          </div>

          <div className="pt-2 border-t border-teal-200/80 flex items-center justify-between text-xs">
            <span className="font-bold text-teal-950 font-mono">{current.outcomeMetric}</span>
            <span className="text-[11px] text-teal-700 font-medium">{current.duration}</span>
          </div>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex items-center justify-center gap-1.5 mt-6">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrentIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              currentIndex === i ? 'w-6 bg-teal-700' : 'w-1.5 bg-slate-200 hover:bg-slate-300'
            }`}
            aria-label={`Jump to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
