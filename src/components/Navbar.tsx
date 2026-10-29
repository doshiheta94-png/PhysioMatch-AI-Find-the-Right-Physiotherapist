import React, { useState } from 'react';
import {
  ChevronDown,
  Calendar,
  ShieldCheck,
  User,
  Video,
  Activity,
  Sparkles,
  Layers,
  Flame,
  Languages,
} from 'lucide-react';
import { AnatomicalZone } from '../types';
import { Logo } from './Logo';
import { AppLanguage, TRANSLATIONS } from '../data/translations';
import { Play } from 'lucide-react';

export type MainNavTab = 'match' | 'conditions3d' | 'exercises' | 'posture5d' | 'journey' | 'videovault';

interface NavbarProps {
  activeTab: MainNavTab;
  onSelectTab: (tab: MainNavTab) => void;
  onScrollToTriage: () => void;
  onScrollToFounder: () => void;
  onSelectSpecialtyZone?: (zone: AnatomicalZone) => void;
  bookingCount: number;
  onBookFounder: () => void;
  currentLanguage: AppLanguage;
  onLanguageChange: (lang: AppLanguage) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onScrollToTriage,
  onScrollToFounder,
  onSelectSpecialtyZone,
  bookingCount,
  onBookFounder,
  currentLanguage,
  onLanguageChange,
}) => {
  const [isSpecialtiesOpen, setIsSpecialtiesOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const t = TRANSLATIONS[currentLanguage];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Logo */}
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

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 text-xs font-semibold text-slate-600">
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

          {/* 3D & 5D Body Condition Atlas */}
          <button
            type="button"
            onClick={() => onSelectTab('conditions3d')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-1 flex items-center gap-1.5 ${
              activeTab === 'conditions3d'
                ? 'text-teal-800 border-b-2 border-teal-700 font-bold'
                : 'text-slate-600'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-teal-600" />
            <span>{t.bodyAtlas3D5D}</span>
            <span className="px-1.5 py-0.2 rounded-md bg-teal-100 text-teal-800 text-[10px] font-bold">
              3D/5D
            </span>
          </button>

          {/* Musculoskeletal & Sports Exercise Suite with Voice Input & Easy Video */}
          <button
            type="button"
            onClick={() => onSelectTab('exercises')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-1 flex items-center gap-1.5 ${
              activeTab === 'exercises'
                ? 'text-teal-800 border-b-2 border-teal-700 font-bold'
                : 'text-slate-600'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-teal-600" />
            <span>{t.musculoskeletalExercises}</span>
            <span className="px-1.5 py-0.2 rounded-md bg-teal-100 text-teal-800 text-[10px] font-bold">
              Voice + Video
            </span>
          </button>

          {/* 5D Postural Video Analysis & Guide Video */}
          <button
            type="button"
            onClick={() => onSelectTab('posture5d')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-1 flex items-center gap-1.5 ${
              activeTab === 'posture5d'
                ? 'text-teal-800 border-b-2 border-teal-700 font-bold'
                : 'text-slate-600'
            }`}
          >
            <Video className="w-3.5 h-3.5 text-teal-600" />
            <span>{t.posture5D}</span>
            <span className="px-1.5 py-0.2 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">
              5D
            </span>
          </button>

          {/* My Health Journey */}
          <button
            type="button"
            onClick={() => onSelectTab('journey')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-1 flex items-center gap-1.5 ${
              activeTab === 'journey'
                ? 'text-teal-800 border-b-2 border-teal-700 font-bold'
                : 'text-slate-600'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-teal-600" />
            <span>{t.myHealthJourney}</span>
            {bookingCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-slate-900 text-white text-[10px] font-mono">
                {bookingCount}
              </span>
            )}
          </button>

          {/* Dedicated Section: HD Video Vault (₹200 GPay on 9737555022) */}
          <button
            type="button"
            onClick={() => onSelectTab('videovault')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-1 flex items-center gap-1.5 ${
              activeTab === 'videovault'
                ? 'text-teal-800 border-b-2 border-teal-700 font-bold'
                : 'text-slate-600'
            }`}
          >
            <Play className="w-3.5 h-3.5 text-teal-600 fill-teal-600" />
            <span>{t.videoVault}</span>
            <span className="px-1.5 py-0.2 rounded-md bg-teal-100 text-teal-800 text-[10px] font-bold">
              ₹200 GPay
            </span>
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
                      onSelectTab('match');
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
                      onSelectTab('match');
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
                      onSelectTab('match');
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
                      onSelectTab('match');
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
        </nav>

        {/* Zone 3: Language Selector & Primary CTA */}
        <div className="flex items-center gap-3 shrink-0">
          {/* 3-Language Selector: English, Hindi, Gujarati */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                currentLanguage === 'en'
                  ? 'bg-white text-teal-800 shadow-2xs font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="English"
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('hi')}
              className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                currentLanguage === 'hi'
                  ? 'bg-white text-teal-800 shadow-2xs font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="हिन्दी (Hindi)"
            >
              हिन्दी
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('gu')}
              className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                currentLanguage === 'gu'
                  ? 'bg-white text-teal-800 shadow-2xs font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="ગુજરાતી (Gujarati)"
            >
              ગુજરાતી
            </button>
          </div>

          <button
            type="button"
            onClick={onBookFounder}
            className="px-4 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{t.consultDrHeta}</span>
          </button>
        </div>
      </div>

      {/* Mobile Tab Strip */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-100 bg-slate-50 px-1 py-2 text-xs font-semibold text-slate-600 overflow-x-auto">
        <button
          type="button"
          onClick={() => onSelectTab('match')}
          className={`px-2 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
            activeTab === 'match' ? 'bg-white text-teal-800 font-bold shadow-2xs' : 'text-slate-600'
          }`}
        >
          Triage
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('exercises')}
          className={`px-2 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1 ${
            activeTab === 'exercises' ? 'bg-white text-teal-800 font-bold shadow-2xs' : 'text-slate-600'
          }`}
        >
          <Flame className="w-3 h-3 text-teal-600" />
          <span>Exercises</span>
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('conditions3d')}
          className={`px-2 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1 ${
            activeTab === 'conditions3d' ? 'bg-white text-teal-800 font-bold shadow-2xs' : 'text-slate-600'
          }`}
        >
          <Layers className="w-3 h-3 text-teal-600" />
          <span>3D/5D Atlas</span>
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('posture5d')}
          className={`px-2 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1 ${
            activeTab === 'posture5d' ? 'bg-white text-teal-800 font-bold shadow-2xs' : 'text-slate-600'
          }`}
        >
          <Video className="w-3 h-3 text-teal-600" />
          <span>5D Posture</span>
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('journey')}
          className={`px-2 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1 ${
            activeTab === 'journey' ? 'bg-white text-teal-800 font-bold shadow-2xs' : 'text-slate-600'
          }`}
        >
          <Activity className="w-3 h-3 text-teal-600" />
          <span>Journey {bookingCount > 0 && `(${bookingCount})`}</span>
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('videovault')}
          className={`px-2 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1 ${
            activeTab === 'videovault' ? 'bg-white text-teal-800 font-bold shadow-2xs' : 'text-slate-600'
          }`}
        >
          <Play className="w-3 h-3 text-teal-600 fill-teal-600" />
          <span>Videos (₹200)</span>
        </button>
      </div>
    </header>
  );
};
