import React, { useState } from 'react';
import {
  Booking,
  HomeExercise,
  RecoveryProgressPoint,
} from '../types';
import {
  DEFAULT_ASSIGNED_EXERCISES,
  SAMPLE_RECOVERY_PROGRESS,
} from '../data/physiotherapists';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  Activity,
  Flame,
  FileText,
  Printer,
  Copy,
  Check,
  Award,
  Lock,
  Eye,
  EyeOff,
  TrendingDown,
  Dumbbell,
  PlayCircle,
  HelpCircle,
  ChevronRight,
  ArrowUpRight,
} from 'lucide-react';

interface MyHealthJourneyProps {
  bookings: Booking[];
  onBookNew: () => void;
}

export const MyHealthJourney: React.FC<MyHealthJourneyProps> = ({
  bookings,
  onBookNew,
}) => {
  // Active Journey Sub-Tab
  const [activeSubTab, setActiveSubTab] = useState<'recovery-charts' | 'assigned-hep' | 'consultation-history'>('recovery-charts');

  // Chart Metric View
  const [chartMetric, setChartMetric] = useState<'pain' | 'mobility' | 'adherence'>('pain');

  // Privacy Mode Toggle (masks patient identifying info for public view)
  const [isPrivacyMasked, setIsPrivacyMasked] = useState<boolean>(false);

  // Home Exercise Programs State
  const [exercises, setExercises] = useState<HomeExercise[]>(() => {
    const saved = localStorage.getItem('physiomatch_hep');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return DEFAULT_ASSIGNED_EXERCISES;
  });

  // Copied state for clinical note
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleExerciseDone = (id: string) => {
    setExercises((prev) => {
      const updated = prev.map((ex) =>
        ex.id === id ? { ...ex, completedToday: !ex.completedToday } : ex
      );
      localStorage.setItem('physiomatch_hep', JSON.stringify(updated));
      return updated;
    });
  };

  const copyNote = (id: string, text?: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const completedTodayCount = exercises.filter((ex) => ex.completedToday).length;
  const adherencePercent = Math.round((completedTodayCount / exercises.length) * 100);

  // Custom Recharts Tooltip styled in the 4-color palette
  const CustomChartTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white p-3 rounded-xl border border-slate-800 shadow-xl text-xs space-y-1">
          <div className="font-bold text-teal-400">{label}</div>
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex justify-between gap-4 font-mono text-[11px]">
              <span className="text-slate-300">{entry.name}:</span>
              <span className="font-bold text-white tabular-nums">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* 1. Secure Patient Header Card */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-400 bg-teal-950/80 border border-teal-800/80 px-3 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Secure Patient Clinical Portal · 256-Bit Encrypted</span>
            </span>

            <button
              type="button"
              onClick={() => setIsPrivacyMasked(!isPrivacyMasked)}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-white bg-slate-800/80 px-2.5 py-1 rounded-full transition-colors border border-slate-700"
            >
              {isPrivacyMasked ? <Eye className="w-3 h-3 text-teal-400" /> : <EyeOff className="w-3 h-3" />}
              <span>{isPrivacyMasked ? 'Privacy Mask: ON' : 'Privacy Mask: OFF'}</span>
            </button>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            My Health Journey & Recovery Trajectory
          </h2>

          <div className="flex items-center gap-2 text-xs text-slate-300 flex-wrap pt-1">
            <span>Patient: <strong>{isPrivacyMasked ? 'Patient •••••' : (bookings[0]?.patientName || 'Registered Patient')}</strong></span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Ref ID: <strong className="font-mono text-teal-400">#PT-2026-9284</strong></span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Attending Specialist: <strong>Dr. Heta Doshi (PT)</strong></span>
          </div>
        </div>

        {/* Adherence & Recovery Metric Badges */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="p-3.5 bg-slate-800/90 rounded-2xl border border-slate-700/80 text-center min-w-[100px]">
            <div className="flex items-center justify-center gap-1 text-teal-400 text-lg font-extrabold font-mono tabular-nums">
              <Flame className="w-4 h-4 fill-teal-400" />
              <span>14 Days</span>
            </div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
              Active Streak
            </div>
          </div>

          <div className="p-3.5 bg-slate-800/90 rounded-2xl border border-slate-700/80 text-center min-w-[100px]">
            <div className="text-lg font-extrabold font-mono text-white tabular-nums">
              {adherencePercent}%
            </div>
            <div className="text-[10px] text-teal-400 font-semibold uppercase tracking-wider mt-0.5">
              Today's HEP
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Portal Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveSubTab('recovery-charts')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
            activeSubTab === 'recovery-charts'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Activity className="w-3.5 h-3.5 text-teal-500" />
          <span>Recovery Progress Charts</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('assigned-hep')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
            activeSubTab === 'assigned-hep'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Dumbbell className="w-3.5 h-3.5 text-teal-500" />
          <span>Home Exercise Programs ({completedTodayCount}/{exercises.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('consultation-history')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
            activeSubTab === 'consultation-history'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-teal-500" />
          <span>Consultation History & SOAP ({bookings.length})</span>
        </button>
      </div>

      {/* 3. SUB-TAB 1: Recovery Progress Charts with Recharts */}
      {activeSubTab === 'recovery-charts' && (
        <div className="space-y-6">
          {/* Chart Header & Metric Selectors */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-teal-800">
                  Biomechanical Recovery Analytics
                </span>
                <h3 className="text-lg md:text-xl font-bold text-slate-900 mt-0.5">
                  5-Week Clinical Recovery Trajectory
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Visualizing clinical milestones supervised by Dr. Heta Doshi (PT)
                </p>
              </div>

              {/* Segmented Metric Switcher */}
              <div className="flex items-center p-1 bg-slate-100 rounded-xl text-xs font-semibold self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setChartMetric('pain')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    chartMetric === 'pain'
                      ? 'bg-white text-slate-900 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  VAS Pain Reduction
                </button>
                <button
                  type="button"
                  onClick={() => setChartMetric('mobility')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    chartMetric === 'mobility'
                      ? 'bg-white text-slate-900 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Functional Mobility (%)
                </button>
                <button
                  type="button"
                  onClick={() => setChartMetric('adherence')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    chartMetric === 'adherence'
                      ? 'bg-white text-slate-900 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  HEP Adherence (%)
                </button>
              </div>
            </div>

            {/* Recharts Container */}
            <div className="w-full h-72 md:h-80 select-none pt-2">
              <ResponsiveContainer width="100%" height="100%">
                {chartMetric === 'pain' ? (
                  /* VAS Pain Reduction Area Chart */
                  <AreaChart data={SAMPLE_RECOVERY_PROGRESS} margin={{ top: 10, right: 20, left: -15, bottom: 0 }}>
                    <defs>
                      <linearGradient id="painGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0D9488" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#0D9488" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                    <XAxis dataKey="week" stroke="#64748B" fontSize={11} tickLine={false} />
                    <YAxis stroke="#64748B" fontSize={11} domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]} tickLine={false} unit="/10" />
                    <Tooltip content={<CustomChartTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="vasPainScore"
                      name="VAS Pain Score"
                      stroke="#0D9488"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#painGradient)"
                    />
                  </AreaChart>
                ) : chartMetric === 'mobility' ? (
                  /* Functional Mobility Range Chart */
                  <AreaChart data={SAMPLE_RECOVERY_PROGRESS} margin={{ top: 10, right: 20, left: -15, bottom: 0 }}>
                    <defs>
                      <linearGradient id="mobilityGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0F172A" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#0F172A" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                    <XAxis dataKey="week" stroke="#64748B" fontSize={11} tickLine={false} />
                    <YAxis stroke="#64748B" fontSize={11} domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} tickLine={false} unit="%" />
                    <Tooltip content={<CustomChartTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="functionalMobility"
                      name="Functional Range of Motion"
                      stroke="#0F172A"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#mobilityGradient)"
                    />
                  </AreaChart>
                ) : (
                  /* Exercise Adherence Bar Chart */
                  <BarChart data={SAMPLE_RECOVERY_PROGRESS} margin={{ top: 10, right: 20, left: -15, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                    <XAxis dataKey="week" stroke="#64748B" fontSize={11} tickLine={false} />
                    <YAxis stroke="#64748B" fontSize={11} domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} tickLine={false} unit="%" />
                    <Tooltip content={<CustomChartTooltip />} />
                    <Bar
                      dataKey="exerciseAdherence"
                      name="HEP Compliance Rate (%)"
                      fill="#0D9488"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>

            {/* 3 Metric Cards Under Chart */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100">
              <div className="p-4 bg-teal-50/60 rounded-2xl border border-teal-200/80">
                <div className="flex items-center justify-between text-xs font-bold text-teal-900">
                  <span>Pain Score Trajectory</span>
                  <TrendingDown className="w-4 h-4 text-teal-600" />
                </div>
                <div className="text-2xl font-extrabold text-teal-950 font-mono tabular-nums mt-1">
                  8.2 → 1.4 <span className="text-xs font-normal text-teal-800">(-83%)</span>
                </div>
                <div className="text-[11px] text-teal-800 mt-0.5">
                  Significant radicular pain centralization
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                  <span>Functional ROM</span>
                  <Activity className="w-4 h-4 text-slate-700" />
                </div>
                <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums mt-1">
                  38% → 94% <span className="text-xs font-normal text-teal-700">(+56%)</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Restored pain-free lumbar extension
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                  <span>Exercise Compliance</span>
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                </div>
                <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums mt-1">
                  92.4% <span className="text-xs font-normal text-teal-700">Adherent</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  14 consecutive days of assigned HEP
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. SUB-TAB 2: Assigned Home Exercise Programs (HEP) */}
      {activeSubTab === 'assigned-hep' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                Prescribed Home Exercise Program (HEP)
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                Targeted Rehabilitation Exercises ({completedTodayCount}/{exercises.length} Completed Today)
              </h3>
            </div>
            <div className="text-xs text-slate-500">
              Prescribed by Dr. Heta Doshi (PT) · Update daily
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {exercises.map((exercise) => (
              <div
                key={exercise.id}
                className={`bg-white rounded-3xl border transition-all p-5 md:p-6 shadow-xs flex flex-col justify-between ${
                  exercise.completedToday
                    ? 'border-teal-500/80 ring-2 ring-teal-500/10'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="space-y-3">
                  {/* Category & Status Header */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 border border-teal-200/80 px-2.5 py-0.5 rounded-md">
                      {exercise.category} · {exercise.frequency}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleExerciseDone(exercise.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                        exercise.completedToday
                          ? 'bg-teal-700 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{exercise.completedToday ? 'Completed Today' : 'Mark Done'}</span>
                    </button>
                  </div>

                  {/* Title & Target Area */}
                  <div>
                    <h4 className="text-base font-bold text-slate-900">{exercise.title}</h4>
                    <p className="text-xs text-teal-800 font-medium mt-0.5">{exercise.targetArea}</p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {exercise.description}
                  </p>

                  {/* Sets, Reps & Hold Strip */}
                  <div className="grid grid-cols-3 gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-center text-xs">
                    <div>
                      <div className="text-slate-400 text-[10px] uppercase font-bold">Sets</div>
                      <div className="font-mono font-bold text-slate-800">{exercise.sets}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[10px] uppercase font-bold">Reps</div>
                      <div className="font-mono font-bold text-slate-800">{exercise.reps}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[10px] uppercase font-bold">Hold</div>
                      <div className="font-mono font-bold text-slate-800">
                        {exercise.holdSeconds > 0 ? `${exercise.holdSeconds}s` : 'Dynamic'}
                      </div>
                    </div>
                  </div>

                  {/* Step-by-Step Instructions */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Step-by-Step Technique
                    </div>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {exercise.techniqueBullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-teal-700 font-bold shrink-0">{idx + 1}.</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span>Prescription: Dr. Heta Doshi (PT)</span>
                  <span className="font-mono">{exercise.completedToday ? '✓ Done today' : '○ Pending today'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. SUB-TAB 3: Past Consultation History & SOAP Notes */}
      {activeSubTab === 'consultation-history' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                Medical Records & Clinical Encounters
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                Past Consultation History ({bookings.length})
              </h3>
            </div>
            <button
              type="button"
              onClick={onBookNew}
              className="px-4 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-colors self-start sm:self-auto shadow-xs"
            >
              Book Follow-up Assessment
            </button>
          </div>

          {bookings.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto space-y-4">
              <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <Calendar className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900">No Past Consultations Stored</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                When you schedule and complete a clinical consultation with Dr. Heta Doshi, your appointment records, SOAP intake notes, and treatment summaries will appear here automatically.
              </p>
              <button
                type="button"
                onClick={onBookNew}
                className="px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-teal-700 rounded-xl transition-colors"
              >
                Schedule Initial Clinical Assessment
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-slate-900">
                          {booking.therapistName}
                        </h4>
                        <span className="text-xs font-mono font-bold text-slate-500">
                          Ref #{booking.id}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {booking.clinicName} · {booking.consultationType}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {booking.status}
                      </span>
                      <button
                        type="button"
                        onClick={() => window.print()}
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
                        title="Print record"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Date & Time</span>
                      <span className="font-bold text-slate-800">{booking.appointmentDate} at {booking.appointmentTime}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Anatomical Focus</span>
                      <span className="font-bold text-teal-800 capitalize">{booking.anatomicalZone} (VAS: {booking.painLevel}/10)</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Care Delivery</span>
                      <span className="font-bold text-slate-800">{booking.consultationType}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Patient Name</span>
                      <span className="font-bold text-slate-800">{isPrivacyMasked ? 'Patient •••••' : booking.patientName}</span>
                    </div>
                  </div>

                  {booking.intakeSummary && (
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/90 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-teal-700" />
                          <span>Pre-Visit Clinical SOAP Briefing File</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => copyNote(booking.id, booking.intakeSummary)}
                          className="text-xs font-semibold text-teal-800 hover:text-teal-950 flex items-center gap-1"
                        >
                          {copiedId === booking.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedId === booking.id ? 'Copied' : 'Copy File'}</span>
                        </button>
                      </div>
                      <div className="text-xs font-mono text-slate-700 whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto pt-1">
                        {booking.intakeSummary}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
