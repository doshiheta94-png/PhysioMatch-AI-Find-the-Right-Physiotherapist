import React from 'react';
import { Physiotherapist } from '../types';
import { X, ShieldCheck, Award, MapPin, Phone, Globe, CheckCircle2, BookOpen, Clock, Calendar } from 'lucide-react';

interface PractitionerModalProps {
  therapist: Physiotherapist;
  onClose: () => void;
  onBook: (therapist: Physiotherapist) => void;
}

export const PractitionerModal: React.FC<PractitionerModalProps> = ({
  therapist,
  onClose,
  onBook,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 md:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[92vh] flex flex-col my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-teal-800">
              Verified Clinical Profile
            </span>
            <h3 className="text-lg font-bold text-slate-900">{therapist.name}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-6">
          {/* Hero Profile Lockup */}
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <img
              src={therapist.avatarUrl}
              alt={therapist.name}
              referrerPolicy="no-referrer"
              className="w-24 h-24 rounded-2xl object-cover object-top border border-slate-200 shadow-xs shrink-0 bg-slate-100"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-xl font-bold text-slate-900">{therapist.name}</h4>
                {therapist.isFounder && (
                  <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                    Founder & Academic Director
                  </span>
                )}
              </div>

              <p className="text-xs font-semibold text-teal-800 mt-0.5">
                {therapist.title}
              </p>

              {/* Affiliation / Institution */}
              {therapist.affiliation && (
                <p className="text-xs text-slate-700 font-medium mt-1 leading-snug">
                  {therapist.affiliation}
                </p>
              )}

              {/* Verification & License */}
              <div className="flex items-center gap-2 text-xs text-slate-600 mt-2 flex-wrap">
                <div className="flex items-center gap-1 font-medium text-teal-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                  <span>Verified License #{therapist.registrationNumber}</span>
                </div>
                <span aria-hidden="true">·</span>
                <span>{therapist.verifiedBoard}</span>
              </div>

              {/* Contact info if available */}
              {(therapist.universityWebsite || therapist.contactMobile) && (
                <div className="flex items-center gap-3 text-xs text-slate-600 mt-2 flex-wrap">
                  {therapist.universityWebsite && (
                    <a
                      href={therapist.universityWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-700 hover:underline flex items-center gap-1"
                    >
                      <Globe className="w-3 h-3" />
                      <span>{therapist.universityWebsite.replace('https://', '')}</span>
                    </a>
                  )}
                  {therapist.contactMobile && (
                    <span className="flex items-center gap-1 text-slate-700 font-medium">
                      <Phone className="w-3 h-3 text-slate-400" />
                      <span>Mo: {therapist.contactMobile}</span>
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Biography */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Clinical Background
            </h5>
            <p className="text-xs text-slate-700 leading-relaxed">
              {therapist.bio}
            </p>
          </div>

          {/* Treatment Philosophy */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <h5 className="text-xs font-bold uppercase tracking-wider text-teal-900 mb-1">
              Treatment Philosophy & Methodology
            </h5>
            <p className="text-xs text-slate-700 leading-relaxed italic">
              "{therapist.treatmentPhilosophy}"
            </p>
          </div>

          {/* Specializations & Techniques */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Primary Clinical Specializations
              </h5>
              <ul className="space-y-1.5">
                {therapist.specializations.map((spec, i) => (
                  <li key={i} className="text-xs text-slate-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Evidence-Based Techniques
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {therapist.clinicalTechniques.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Clinical Outcome Metrics */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Verified Clinical Recovery Metrics
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {therapist.clinicalOutcomes.map((metric, i) => (
                <div key={i} className="p-3 rounded-xl bg-teal-50/70 border border-teal-200">
                  <div className="text-xs font-bold text-teal-950">{metric.metric}</div>
                  <div className="text-xs text-teal-800 font-mono font-medium mt-0.5">{metric.value}</div>
                  <div className="text-[10px] text-slate-500 mt-1">{metric.source}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Published Research */}
          <div className="space-y-3">
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-slate-500" />
                <span>Verified Academic Credentials</span>
              </h5>
              <ul className="space-y-1 text-xs text-slate-700">
                {therapist.verifiedEducation.map((edu, i) => (
                  <li key={i}>• {edu}</li>
                ))}
              </ul>
            </div>

            {therapist.publishedResearch && (
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                  <span>Selected Research Publications</span>
                </h5>
                <ul className="space-y-1 text-xs text-slate-700">
                  {therapist.publishedResearch.map((res, i) => (
                    <li key={i} className="italic text-slate-600">• "{res}"</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Clinic Location & Pricing Details */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-slate-900">{therapist.clinicName}</div>
              <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>{therapist.clinicAddress}</span>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-sm font-bold font-mono text-slate-900 tabular-nums">
                ₹800 Total (₹400 Booking Deposit + ₹400 Post-Rehab)
              </div>
              <div className="text-[11px] text-teal-800 font-semibold">
                Home Visit · Telerehab Video · GPay: 9737555022
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            Close Profile
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onBook(therapist);
            }}
            className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-teal-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Schedule Consultation</span>
          </button>
        </div>
      </div>
    </div>
  );
};
