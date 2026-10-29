import React, { useState } from 'react';
import { Physiotherapist, MatchScoreBreakdown } from '../types';
import { CircularProgress } from './CircularProgress';
import { Tooltip } from './Tooltip';
import { ShieldCheck, MapPin, Award, Calendar, ExternalLink, ChevronDown, CheckCircle2, Sparkles, Phone, Globe } from 'lucide-react';

interface PractitionerCardProps {
  therapist: Physiotherapist;
  match: MatchScoreBreakdown;
  isCompared?: boolean;
  onToggleCompare?: (id: string) => void;
  onViewProfile: (therapist: Physiotherapist) => void;
  onBook: (therapist: Physiotherapist) => void;
}

// Map of common clinical abbreviations to plain-language descriptions
const ACRONYM_EXPLAINERS: Record<string, string> = {
  'CMP': 'Certified Mulligan Practitioner (Joint mobilization with movement)',
  'M.P.Th.': 'Master of Physiotherapy in Musculoskeletal & Sports',
  'Ph.D.': 'Doctor of Philosophy Scholar in Musculoskeletal Physiotherapy',
  'GSCPT': 'Gujarat State Council for Physiotherapy (Statutory licensing council)',
  'IAP': 'Indian Association of Physiotherapists (National professional governing body)',
  'MWM': 'Mobilization with Movement (Painless mechanical glide during active motion)',
};

export const PractitionerCard: React.FC<PractitionerCardProps> = ({
  therapist,
  match,
  onViewProfile,
  onBook,
}) => {
  const [isEvidenceExpanded, setIsEvidenceExpanded] = useState(true);

  const getTooltipForText = (text: string): string => {
    for (const [key, desc] of Object.entries(ACRONYM_EXPLAINERS)) {
      if (text.includes(key)) {
        return `${key}: ${desc}`;
      }
    }
    return 'Verified clinical qualification recognized by professional physiotherapy boards.';
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-md hover:border-teal-500/50 hover:shadow-xl transition-all duration-300 p-6 md:p-8 flex flex-col justify-between relative group">
      <div>
        {/* Match Header Bar with Circular Gauge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-slate-100 gap-3">
          <div className="flex items-center gap-3.5">
            <CircularProgress score={match.overallScore} size={54} strokeWidth={4.5} />
            <div>
              <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <span>Direct Clinical Compatibility</span>
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse"></span>
              </div>
              <div className="text-xs text-teal-800 font-semibold mt-0.5">
                M.P.Th. Musculoskeletal & Sports Protocol
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-900 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full self-start sm:self-auto">
            <Award className="w-3.5 h-3.5 text-teal-700" />
            <span>Assistant Professor · Ph.D. Scholar</span>
          </div>
        </div>

        {/* Practitioner Bio & Portrait */}
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <div className="relative shrink-0 mx-auto sm:mx-0">
            <img
              src={therapist.avatarUrl}
              alt={therapist.name}
              referrerPolicy="no-referrer"
              className="w-24 h-24 md:w-28 md:h-28 rounded-2xl object-cover object-top border-2 border-teal-500/30 shadow-md bg-slate-100 group-hover:scale-[1.02] transition-transform"
            />
            <div
              className="absolute -bottom-1 -right-1 bg-teal-700 text-white rounded-full p-1 shadow-md"
              title="Verified License & Council Board"
            >
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>

          <div className="flex-1 min-w-0 text-center sm:text-left">
            <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                {therapist.name}
              </h3>
            </div>

            <p className="text-xs md:text-sm font-semibold text-teal-800 mt-1">
              {therapist.title}
            </p>

            <p className="text-xs text-slate-600 mt-1 leading-snug">
              {therapist.affiliation}
            </p>

            {/* Unboxed Metadata with Typographic Separators */}
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-slate-500 mt-2 flex-wrap">
              <span>{therapist.experienceYears} yrs clinical & academic exp</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-0.5">
                <MapPin className="w-3 h-3 text-slate-400" />
                {therapist.city}
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-slate-800 font-mono tabular-nums">
                {therapist.currency}{therapist.feeInitial} (₹400 advance + ₹400 post-rehab)
              </span>
            </div>

            {/* Quick Contact & Direct Consultation Line */}
            <div className="flex items-center justify-center sm:justify-start gap-4 text-xs text-slate-600 mt-2.5 flex-wrap">
              <span className="text-teal-800 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                <span>GSCPT & IAP Registered Specialist</span>
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <a
                href={`tel:${therapist.contactMobile}`}
                className="text-slate-700 hover:text-teal-800 flex items-center gap-1 font-medium"
              >
                <Phone className="w-3 h-3 text-teal-600" />
                <span>Mo: {therapist.contactMobile}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Regulatory Verification Line */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-600">
          <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
          <span className="truncate">
            Verified {therapist.verifiedBoard} ({therapist.registrationNumber}) · Advanced Musculoskeletal & Sports Practice
          </span>
        </div>

        {/* Expandable Evidence Accordion Section */}
        <div className="mt-4 rounded-2xl bg-teal-50/60 border border-teal-200/80 overflow-hidden">
          <button
            type="button"
            onClick={() => setIsEvidenceExpanded(!isEvidenceExpanded)}
            className="w-full p-3 flex items-center justify-between text-left text-xs font-bold text-teal-950 hover:bg-teal-100/60 transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-teal-700" />
              <span>Evidence Match Rationale for Selected Condition</span>
            </span>
            <ChevronDown
              className={`w-4 h-4 text-teal-700 transition-transform ${
                isEvidenceExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>

          <div className="px-4 pb-4 text-xs text-slate-700 leading-relaxed border-t border-teal-200/60 pt-2.5 space-y-2">
            <p className="font-medium text-slate-800">{match.rationaleSummary}</p>
            {isEvidenceExpanded && (
              <div className="pt-2 border-t border-teal-200/60 space-y-1.5 text-[11px] text-slate-600">
                <div>
                  <strong className="text-slate-800">Primary Clinical Focus:</strong> {match.specialtyAlignment}
                </div>
                <div>
                  <strong className="text-slate-800">Key Technique Fit:</strong> {match.techniqueRelevance.join(', ')}
                </div>
                {therapist.clinicalOutcomes[0] && (
                  <div className="text-teal-900 font-semibold bg-white/80 p-2 rounded-lg border border-teal-200/70">
                    ★ Documented Milestone: {therapist.clinicalOutcomes[0].metric} ({therapist.clinicalOutcomes[0].value}) — {therapist.clinicalOutcomes[0].source}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Clinical Technique Chips with Tooltip hover */}
        <div className="mt-4 space-y-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Verified Clinical Techniques & Qualifications
          </div>
          <div className="flex flex-wrap gap-1.5">
            {therapist.clinicalTechniques.map((tech) => (
              <Tooltip key={tech} content={getTooltipForText(tech)}>
                <span className="text-xs font-medium text-slate-800 bg-slate-100 hover:bg-teal-50 hover:text-teal-800 px-2.5 py-1 rounded-lg transition-colors border border-slate-200/80">
                  {tech}
                </span>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onViewProfile(therapist)}
          className="text-xs font-semibold text-slate-700 hover:text-teal-800 flex items-center gap-1.5 transition-colors"
        >
          <span>View Academic & Research Profile</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => onBook(therapist)}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-all shadow-md active:scale-95"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Consultation with Dr. Heta Doshi</span>
        </button>
      </div>
    </div>
  );
};
