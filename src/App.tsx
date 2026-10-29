import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  AnatomicalZone,
  BodyView,
  TriageProfile,
  Physiotherapist,
  Booking,
} from './types';
import { PHYSIOTHERAPISTS, calculateMatchScore } from './data/physiotherapists';
import { BodyMap, ZONES } from './components/BodyMap';
import { TriageForm } from './components/TriageForm';
import { PractitionerCard } from './components/PractitionerCard';
import { PractitionerModal } from './components/PractitionerModal';
import { BookingModal } from './components/BookingModal';
import { FounderSection } from './components/FounderSection';
import { ConsultationsView } from './components/ConsultationsView';
import { Navbar, MainNavTab } from './components/Navbar';
import { MyHealthJourney } from './components/MyHealthJourney';
import { Postural5DAnalysis } from './components/Postural5DAnalysis';
import { TriageProgressBar } from './components/TriageProgressBar';
import { AnimatedCounter } from './components/AnimatedCounter';
import { TestimonialSlider } from './components/TestimonialSlider';
import { FacilityCarousel } from './components/FacilityCarousel';
import { ClinicalAccordion } from './components/ClinicalAccordion';
import { FloatingActionButton } from './components/FloatingActionButton';
import { Logo } from './components/Logo';
import { Spine3DSimulator } from './components/Spine3DSimulator';
import {
  ShieldCheck,
  Calendar,
  Globe,
  Phone,
  CheckCircle2,
  Sparkles,
  MapPin,
  Clock,
  Layers,
  Activity,
  Video,
} from 'lucide-react';

type CurrencyCode = 'USD' | 'INR' | 'GBP' | 'EUR';

const CURRENCIES: Record<CurrencyCode, { symbol: string; initial: number; followup: number; label: string }> = {
  USD: { symbol: '$', initial: 75, followup: 50, label: 'USD ($)' },
  INR: { symbol: '₹', initial: 1500, followup: 1000, label: 'INR (₹)' },
  GBP: { symbol: '£', initial: 60, followup: 40, label: 'GBP (£)' },
  EUR: { symbol: '€', initial: 70, followup: 45, label: 'EUR (€)' },
};

export default function App() {
  const triageRef = useRef<HTMLDivElement>(null);
  const founderRef = useRef<HTMLDivElement>(null);

  // Active Main Navigation Tab
  const [activeTab, setActiveTab] = useState<MainNavTab>('match');

  // International Currency Selector
  const [currency, setCurrency] = useState<CurrencyCode>('USD');

  // Body View (Anterior vs Posterior)
  const [bodyView, setBodyView] = useState<BodyView>('anterior');

  // Triage Profile State
  const [triage, setTriage] = useState<TriageProfile>(() => {
    const saved = localStorage.getItem('physiomatch_triage');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return {
      anatomicalZone: 'lumbar',
      subRegion: 'Lower Back & Sciatica',
      painLevel: 6,
      painType: ['Deep Aching', 'Radiating / Shooting'],
      duration: '2-6 weeks',
      isPostOp: false,
      postOpDetails: '',
      radiatingNumbness: true,
      dailyImpact: 'Difficulty sitting at work and morning stiffness',
      aggravatingFactors: 'Prolonged sitting >30 mins, forward bending',
      relievingFactors: 'Walking, gentle extension, heat pack',
      previousTreatments: ['Oral Medication / NSAIDs'],
      targetGoals: 'Sit without radicular leg pain, resume weekend sports',
      patientName: '',
      patientEmail: '',
      patientPhone: '',
    };
  });

  // Modals State
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);

  // Bookings list state
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('physiomatch_bookings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  // Loading animation state when switching zones
  const [isRecalculating, setIsRecalculating] = useState<boolean>(false);

  // Persist triage
  useEffect(() => {
    localStorage.setItem('physiomatch_triage', JSON.stringify(triage));
  }, [triage]);

  // Persist bookings
  useEffect(() => {
    localStorage.setItem('physiomatch_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Dr. Heta Doshi is the exclusive specialist
  const doctor = useMemo(() => {
    const base = PHYSIOTHERAPISTS[0];
    const curr = CURRENCIES[currency];
    return {
      ...base,
      currency: curr.symbol,
      feeInitial: curr.initial,
      feeFollowup: curr.followup,
    };
  }, [currency]);

  // Match score for Dr. Heta Doshi based on current triage selections
  const matchScore = useMemo(() => {
    return calculateMatchScore(doctor, triage);
  }, [doctor, triage]);

  // Update triage zone
  const handleSelectZone = (zone: AnatomicalZone) => {
    setIsRecalculating(true);
    setTriage((prev) => ({
      ...prev,
      anatomicalZone: zone,
      subRegion: ZONES[zone].name,
    }));
    setTimeout(() => setIsRecalculating(false), 200);
  };

  const handleBookingConfirmed = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const scrollToTriage = () => {
    triageRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFounder = () => {
    founderRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col selection:bg-teal-500/20 selection:text-teal-900">
      {/* 4-Color Palette: Navy (#0F172A), Teal (#0D9488), White (#FFFFFF/#F8FAFC), Slate (#64748B/#E2E8F0) */}

      {/* Top International Region & Currency Ribbon */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1.5 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-teal-400 font-semibold">
              <Globe className="w-3 h-3" />
              <span>Global Clinical Care:</span>
            </span>
            <span>In-Clinic (Vadodara, Gujarat) & Worldwide Telehealth Consultations</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 hidden sm:inline">Currency:</span>
            <div className="flex items-center gap-1 bg-slate-800 p-0.5 rounded-md">
              {(Object.keys(CURRENCIES) as CurrencyCode[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCurrency(c)}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
                    currency === c
                      ? 'bg-teal-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky 3-Zone Navigation Header */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onScrollToTriage={scrollToTriage}
        onScrollToFounder={scrollToFounder}
        onSelectSpecialtyZone={handleSelectZone}
        bookingCount={bookings.length}
        onBookFounder={() => setIsBookingModalOpen(true)}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-12">
        {activeTab === 'journey' ? (
          /* Secure 'My Health Journey' Patient Dashboard (Recharts recovery trajectory, assigned HEP & past consultations) */
          <MyHealthJourney
            bookings={bookings}
            onBookNew={() => setIsBookingModalOpen(true)}
          />
        ) : activeTab === 'posture5d' ? (
          /* 5D Postural Video Kinematics & Interactive Guide Video Suite */
          <Postural5DAnalysis />
        ) : (
          /* Primary Clinical Triage & Consultation Experience */
          <>
            {/* Hero Section */}
            <section className="space-y-6">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1 rounded-md mb-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                  <span>Academic Clinical Practice · Musculoskeletal & Sports Biomechanics</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Evidence-Informed Physiotherapy with Dr. Heta Doshi (PT)
                </h1>
                <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
                  Led by Assistant Professor Dr. Heta Doshi (Ph.D. Scholar, M.P.Th. Musculoskeletal & Sports). Map your pain on our interactive anatomical body map to receive a tailored clinical protocol, evidence-informed rationale, and direct consultation booking.
                </p>
              </div>

              {/* 4 Quantitative Global Healthcare Metrics (Strict 4-Color Discipline) */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
                  <div className="text-2xl font-extrabold text-teal-800">
                    <AnimatedCounter end={98} suffix="%" />
                  </div>
                  <div className="text-xs font-bold text-slate-900 mt-1">Condition Match Accuracy</div>
                  <div className="text-[11px] text-slate-500">M.P.Th. biomechanical protocol</div>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
                  <div className="text-2xl font-extrabold text-slate-900">
                    <AnimatedCounter end={100} suffix="%" />
                  </div>
                  <div className="text-xs font-bold text-slate-900 mt-1">GSCPT & IAP Verified</div>
                  <div className="text-[11px] text-slate-500">Council registration #GSCPT-MS-9284</div>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
                  <div className="text-2xl font-extrabold text-teal-800">
                    <AnimatedCounter end={6.8} prefix="-" decimals={1} />
                  </div>
                  <div className="text-xs font-bold text-slate-900 mt-1">Average VAS Pain Reduction</div>
                  <div className="text-[11px] text-slate-500">Documented within 4-6 weeks</div>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
                  <div className="text-2xl font-extrabold text-slate-900">
                    <AnimatedCounter end={12} suffix="+" />
                  </div>
                  <div className="text-xs font-bold text-slate-900 mt-1">Years Clinical & Academic Exp</div>
                  <div className="text-[11px] text-slate-500">Assistant Professor & Researcher</div>
                </div>
              </div>
            </section>

            {/* Founder Leadership Section (Featuring Dr. Heta Doshi Authentic Portrait) */}
            <div ref={founderRef} className="scroll-mt-20">
              <FounderSection
                founder={doctor}
                currencySymbol={CURRENCIES[currency].symbol}
                initialFee={CURRENCIES[currency].initial}
                onViewProfile={() => setIsProfileModalOpen(true)}
                onBook={() => setIsBookingModalOpen(true)}
              />
            </div>

            {/* Step 1: Interactive Anatomical Body Map & Triage Checklist */}
            <section ref={triageRef} className="space-y-4 scroll-mt-20">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                    Step 1 of 2: Condition Triage
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Anatomical Pain Mapping & Symptom Profile
                  </h2>
                </div>
                <div className="text-xs text-slate-500">
                  Select your exact pain area to view Dr. Heta Doshi's matched protocol
                </div>
              </div>

              {/* Triage Progress Indicator */}
              <TriageProgressBar triage={triage} />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Body Map (Interactive SVG with Front/Back View) */}
                <div className="lg:col-span-6">
                  <BodyMap
                    selectedZone={triage.anatomicalZone}
                    onSelectZone={handleSelectZone}
                    view={bodyView}
                    onToggleView={() =>
                      setBodyView((v) => (v === 'anterior' ? 'posterior' : 'anterior'))
                    }
                  />
                </div>

                {/* Clinical Triage Form */}
                <div className="lg:col-span-6">
                  <TriageForm
                    triage={triage}
                    onChange={(updated) => {
                      setIsRecalculating(true);
                      setTriage((prev) => ({ ...prev, ...updated }));
                      setTimeout(() => setIsRecalculating(false), 200);
                    }}
                    onReset={() =>
                      setTriage((prev) => ({
                        ...prev,
                        painLevel: 5,
                        painType: ['Deep Aching'],
                        duration: '2-6 weeks',
                        radiatingNumbness: false,
                        isPostOp: false,
                      }))
                    }
                  />
                </div>
              </div>
            </section>

            {/* Interactive 3D Spine Biomechanics & Posture Balance Challenge Game (Three.js) */}
            <section className="space-y-4">
              <Spine3DSimulator />
            </section>

            {/* Step 2: Dr. Heta Doshi Clinical Match Result */}
            <section className="space-y-6 pt-4 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                    Step 2 of 2: Matched Specialist
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Specialist Clinical Fit for {ZONES[triage.anatomicalZone].name}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Tailored protocol for your {triage.painLevel}/10 pain and {triage.duration} chronicity
                  </p>
                </div>
              </div>

              {/* Specialist Card for Dr. Heta Doshi */}
              {isRecalculating ? (
                <div className="bg-white rounded-3xl border border-slate-200 p-8 animate-pulse space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-slate-200 rounded-2xl"></div>
                    <div className="space-y-2 flex-1">
                      <div className="w-1/3 h-6 bg-slate-200 rounded"></div>
                      <div className="w-1/2 h-4 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                  <div className="w-full h-24 bg-slate-100 rounded-2xl"></div>
                </div>
              ) : (
                <PractitionerCard
                  therapist={doctor}
                  match={matchScore}
                  onViewProfile={() => setIsProfileModalOpen(true)}
                  onBook={() => setIsBookingModalOpen(true)}
                />
              )}
            </section>

            {/* Testimonials Slider (Verified Patient Outcomes with Dr. Heta Doshi) */}
            <TestimonialSlider />

            {/* Advanced Musculoskeletal Biomechanics & Clinical Facilities Carousel */}
            <FacilityCarousel />

            {/* Clinical FAQ & Medical Red Flags Accordion */}
            <ClinicalAccordion />
          </>
        )}
      </main>

      {/* Floating Action Button for Quick Jumps */}
      <FloatingActionButton
        onScrollToTriage={scrollToTriage}
        onOpenCompare={() => setIsProfileModalOpen(true)}
        onBookFounder={() => setIsBookingModalOpen(true)}
        compareCount={0}
      />

      {/* Dr. Heta Doshi Full Clinical Profile Modal */}
      {isProfileModalOpen && (
        <PractitionerModal
          therapist={doctor}
          onClose={() => setIsProfileModalOpen(false)}
          onBook={() => {
            setIsProfileModalOpen(false);
            setIsBookingModalOpen(true);
          }}
        />
      )}

      {/* Consultation Booking & AI Pre-Visit Clinical SOAP Note Generator Modal */}
      {isBookingModalOpen && (
        <BookingModal
          therapist={doctor}
          triage={triage}
          onClose={() => setIsBookingModalOpen(false)}
          onBookingConfirmed={handleBookingConfirmed}
        />
      )}

      {/* Global Clinical Footer */}
      <footer className="mt-16 bg-white border-t border-slate-200 py-10 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <Logo size="sm" />
              <p className="text-slate-500 mt-2 max-w-md">
                Official clinical platform of Dr. Heta Doshi (PT), Assistant Professor in Musculoskeletal & Sports Physiotherapy, Ph.D. Scholar (GSCPT & IAP Verified).
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 text-slate-600">
              <div>
                <div className="font-bold text-slate-900">Clinical Practice Location</div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Vadodara, Gujarat, India & Worldwide Telehealth Consultations
                </div>
              </div>

              <div>
                <div className="font-bold text-slate-900">Direct Contact & Booking</div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  <a href="tel:9737555022" className="hover:text-teal-700 underline font-semibold text-slate-800">
                    Mobile: +91 9737555022
                  </a>
                  {' '}· In-Clinic & Telehealth
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
            <span>© {new Date().getFullYear()} Dr. Heta Doshi (PT). All rights reserved.</span>
            <span>Evidence-Informed Musculoskeletal & Sports Rehabilitation</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
