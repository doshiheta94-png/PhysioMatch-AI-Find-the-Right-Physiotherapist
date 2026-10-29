import React, { useState } from 'react';
import { ChevronDown, Calendar, ShieldCheck, User } from 'lucide-react';
import { AnatomicalZone } from '../types';
import { Logo } from './Logo';

interface NavbarProps {
  activeTab: 'match' | 'consultations';
  onSelectTab: (tab: 'match' | 'consultations') => void;
  onScrollToTriage: () => void;
  onScrollToFounder: () => void;
  onSelectSpecialtyZone?: (zone: AnatomicalZone) => void;
  bookingCount: number;
  onBookFounder: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onScrollToTriage,
  onScrollToFounder,
  onSelectSpecialtyZone,
  bookingCount,
  onBookFounder,
}) => {
  const [isSpecialtiesOpen, setIsSpecialtiesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onSelectTab('match');
          }}
          className="whitespace-nowrap shrink-0 transition-opacity hover:opacity-90"
        >
          <Logo size="md" />
        </a>

        {/* Zone 2: 4 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
          <button
            type="button"
            onClick={() => {
              onSelectTab('match');
              onScrollToTriage();
            }}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-1 ${
              activeTab === 'match'
                ? 'text-teal-800 border-b-2 border-teal-700 font-bold'
                : 'text-slate-600'
            }`}
          >
            Clinical Triage
          </button>

          {/* Specialties Dropdown with Hover Effect */}
          <div
            className="relative"
            onMouseEnter={() => setIsSpecialtiesOpen(true)}
            onMouseLeave={() => setIsSpecialtiesOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1 hover:text-slate-900 transition-colors py-1 text-slate-600 focus:outline-none"
            >
              <span>Clinical Specialties</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
            </button>

            {/* Hover Dropdown Menu */}
            {isSpecialtiesOpen && (
              <div className="absolute top-full left-0 w-64 pt-2 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-2 space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectSpecialtyZone?.('lumbar');
                      onScrollToTriage();
                      setIsSpecialtiesOpen(false);
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-50 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-800">Spine & Lumbar Radiculopathy</div>
                      <div className="text-[11px] text-slate-500">Mulligan MWM · Disc mechanics</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectSpecialtyZone?.('shoulder');
                      onScrollToTriage();
                      setIsSpecialtiesOpen(false);
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-50 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-800">Shoulder & Sports Impingement</div>
                      <div className="text-[11px] text-slate-500">Rotator cuff kinetics · Research lead</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectSpecialtyZone?.('knee');
                      onScrollToTriage();
                      setIsSpecialtiesOpen(false);
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-50 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-800">Knee & ACL Sports Rehabilitation</div>
                      <div className="text-[11px] text-slate-500">Biomechanical video gait analysis</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectSpecialtyZone?.('cervical');
                      onScrollToTriage();
                      setIsSpecialtiesOpen(false);
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-50 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-800">Cervical Spine & Posture Spasms</div>
                      <div className="text-[11px] text-slate-500">Maitland mobilization · Nerve relief</div>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              onSelectTab('match');
              onScrollToFounder();
            }}
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-1 text-slate-600 flex items-center gap-1"
          >
            <span>Dr. Heta Doshi (Founder)</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('consultations')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-1 ${
              activeTab === 'consultations'
                ? 'text-teal-800 border-b-2 border-teal-700 font-bold'
                : 'text-slate-600'
            }`}
          >
            My Consultations {bookingCount > 0 && `(${bookingCount})`}
          </button>
        </nav>

        {/* Zone 3: 1 primary CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onBookFounder}
            className="px-4 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Consult Dr. Heta Doshi</span>
          </button>
        </div>
      </div>
    </header>
  );
};
