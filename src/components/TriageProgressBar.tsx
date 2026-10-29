import React from 'react';
import { TriageProfile } from '../types';
import { Check, Activity } from 'lucide-react';

interface TriageProgressBarProps {
  triage: TriageProfile;
}

export const TriageProgressBar: React.FC<TriageProgressBarProps> = ({ triage }) => {
  // Compute progress percentage
  let progress = 25; // zone is selected by default
  if (triage.painLevel > 0) progress += 25;
  if (triage.painType.length > 0 && triage.duration) progress += 25;
  if (triage.targetGoals || triage.aggravatingFactors) progress += 25;

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs space-y-2">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-teal-600" />
          <span className="font-bold text-slate-800">Clinical Profile Completeness</span>
        </div>
        <span className="font-mono font-bold text-teal-800 tabular-nums">
          {progress}% Complete
        </span>
      </div>

      {/* Progress Track */}
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-teal-600 to-emerald-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="grid grid-cols-4 text-[10px] text-slate-500 pt-1">
        <span className="flex items-center gap-1 font-medium text-teal-800">
          <Check className="w-2.5 h-2.5" /> Zone Mapped
        </span>
        <span className={triage.painLevel > 0 ? 'text-teal-800 font-medium' : 'text-slate-400'}>
          VAS Severity
        </span>
        <span className={triage.painType.length > 0 ? 'text-teal-800 font-medium' : 'text-slate-400'}>
          Symptom Type
        </span>
        <span className={progress >= 100 ? 'text-teal-800 font-medium' : 'text-slate-400'}>
          Goals Aligned
        </span>
      </div>
    </div>
  );
};
