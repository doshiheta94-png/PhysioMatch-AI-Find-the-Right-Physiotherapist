import React from 'react';
import { Physiotherapist } from '../types';
import { X, Check, ShieldCheck, Award, Calendar, ExternalLink } from 'lucide-react';

interface ComparisonMatrixProps {
  therapists: Physiotherapist[];
  onRemove: (id: string) => void;
  onClose: () => void;
  onBook: (therapist: Physiotherapist) => void;
}

export const ComparisonMatrix: React.FC<ComparisonMatrixProps> = ({
  therapists,
  onRemove,
  onClose,
  onBook,
}) => {
  if (therapists.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 md:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-6xl max-h-[92vh] flex flex-col my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-teal-800">
              Evidence-Informed Clinical Comparison
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              Compare Specialist Credentials & Techniques ({therapists.length}/3)
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Matrix Table */}
        <div className="flex-1 overflow-x-auto overflow-y-auto p-4 md:p-6">
          <table className="w-full border-collapse min-w-[700px] text-left">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="p-3 w-1/4 text-xs uppercase font-bold text-slate-400 tracking-wider">
                  Criteria
                </th>
                {therapists.map((t) => (
                  <th key={t.id} className="p-3 w-1/4 align-top">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={t.avatarUrl}
                          alt={t.name}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                        />
                        <div>
                          <div className="text-sm font-bold text-slate-900 leading-snug">
                            {t.name}
                          </div>
                          <div className="text-xs text-slate-500 font-medium">
                            {t.experienceYears} yrs experience
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemove(t.id)}
                        className="text-slate-400 hover:text-rose-600 transition-colors"
                        title="Remove from comparison"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => onBook(t)}
                      className="mt-3 w-full py-2 px-3 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Consultation</span>
                    </button>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-xs">
              {/* Row 1: Academic & Clinical Designation */}
              <tr className="hover:bg-slate-50/50">
                <td className="p-3 font-semibold text-slate-700 bg-slate-50/40">
                  Clinical Designation
                </td>
                {therapists.map((t) => (
                  <td key={t.id} className="p-3 text-slate-800">
                    <span className="font-medium">{t.title}</span>
                    {t.isFounder && (
                      <div className="text-[11px] text-teal-800 font-semibold mt-1">
                        ★ {t.founderDesignation}
                      </div>
                    )}
                  </td>
                ))}
              </tr>

              {/* Row 2: Verified Board & License */}
              <tr className="hover:bg-slate-50/50">
                <td className="p-3 font-semibold text-slate-700 bg-slate-50/40">
                  Regulatory Verification
                </td>
                {therapists.map((t) => (
                  <td key={t.id} className="p-3 text-slate-800">
                    <div className="flex items-center gap-1.5 text-teal-800 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-teal-600" />
                      <span>{t.registrationNumber}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {t.verifiedBoard}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Row 3: Degrees & Postgraduate Qualifications */}
              <tr className="hover:bg-slate-50/50">
                <td className="p-3 font-semibold text-slate-700 bg-slate-50/40">
                  Verified Degrees & Fellowship
                </td>
                {therapists.map((t) => (
                  <td key={t.id} className="p-3 text-slate-800 space-y-1">
                    {t.qualifications.map((q, i) => (
                      <div key={i} className="flex items-start gap-1">
                        <Check className="w-3 h-3 text-teal-600 mt-0.5 shrink-0" />
                        <span>{q}</span>
                      </div>
                    ))}
                  </td>
                ))}
              </tr>

              {/* Row 4: Primary Specializations */}
              <tr className="hover:bg-slate-50/50">
                <td className="p-3 font-semibold text-slate-700 bg-slate-50/40">
                  Primary Specializations
                </td>
                {therapists.map((t) => (
                  <td key={t.id} className="p-3 text-slate-800">
                    <ul className="space-y-1">
                      {t.specializations.map((spec, i) => (
                        <li key={i} className="text-slate-700">
                          • {spec}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Row 5: Evidence-Based Clinical Techniques */}
              <tr className="hover:bg-slate-50/50">
                <td className="p-3 font-semibold text-slate-700 bg-slate-50/40">
                  Clinical Techniques & Modalities
                </td>
                {therapists.map((t) => (
                  <td key={t.id} className="p-3 text-slate-800">
                    <div className="flex flex-wrap gap-1">
                      {t.clinicalTechniques.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium text-[11px]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Row 6: Documented Clinical Outcomes */}
              <tr className="hover:bg-slate-50/50">
                <td className="p-3 font-semibold text-slate-700 bg-slate-50/40">
                  Documented Outcome Metrics
                </td>
                {therapists.map((t) => (
                  <td key={t.id} className="p-3 text-slate-800 space-y-1.5">
                    {t.clinicalOutcomes.map((metric, i) => (
                      <div key={i} className="p-2 rounded bg-teal-50/60 border border-teal-100 text-[11px]">
                        <div className="font-bold text-teal-950">{metric.metric}</div>
                        <div className="text-slate-600 font-medium">{metric.value}</div>
                        <div className="text-[10px] text-slate-400 italic">Src: {metric.source}</div>
                      </div>
                    ))}
                  </td>
                ))}
              </tr>

              {/* Row 7: Pricing & Duration */}
              <tr className="hover:bg-slate-50/50">
                <td className="p-3 font-semibold text-slate-700 bg-slate-50/40">
                  Fee & Session Duration
                </td>
                {therapists.map((t) => (
                  <td key={t.id} className="p-3 text-slate-800">
                    <div className="font-mono font-bold text-sm text-slate-900 tabular-nums">
                      {t.currency}{t.feeInitial} <span className="text-xs font-normal text-slate-500">initial assessment</span>
                    </div>
                    <div className="text-xs text-slate-600 mt-0.5">
                      {t.currency}{t.feeFollowup} follow-up · {t.sessionDurationMinutes} min duration
                    </div>
                  </td>
                ))}
              </tr>

              {/* Row 8: Formats & Insurance */}
              <tr className="hover:bg-slate-50/50">
                <td className="p-3 font-semibold text-slate-700 bg-slate-50/40">
                  Care Delivery & Insurance
                </td>
                {therapists.map((t) => (
                  <td key={t.id} className="p-3 text-slate-800">
                    <div className="font-medium text-slate-900">
                      {t.consultationTypes.join(' & ')}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      {t.acceptsInsurance ? 'Accepts Direct Insurance Billing' : 'Private Direct Pay'}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Row 9: Earliest Availability */}
              <tr className="hover:bg-slate-50/50">
                <td className="p-3 font-semibold text-slate-700 bg-slate-50/40">
                  Next Available Slot
                </td>
                {therapists.map((t) => {
                  const firstSlot = t.availableSlots[0];
                  return (
                    <td key={t.id} className="p-3 text-slate-800">
                      {firstSlot ? (
                        <div>
                          <div className="font-semibold text-teal-800">
                            {firstSlot.dayLabel} ({firstSlot.date})
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            {firstSlot.times[0]} earliest opening
                          </div>
                        </div>
                      ) : (
                        <span className="text-slate-400">By appointment</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Compare up to 3 practitioners simultaneously.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Close Matrix
          </button>
        </div>
      </div>
    </div>
  );
};
