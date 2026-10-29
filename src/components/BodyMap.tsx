import React from 'react';
import { AnatomicalZone, BodyView } from '../types';
import { RotateCw, Check } from 'lucide-react';

interface BodyMapProps {
  selectedZone: AnatomicalZone;
  onSelectZone: (zone: AnatomicalZone) => void;
  view: BodyView;
  onToggleView: () => void;
}

interface ZoneInfo {
  id: AnatomicalZone;
  name: string;
  clinicalName: string;
  commonComplaints: string;
  side: 'front' | 'back' | 'both';
}

export const ZONES: Record<AnatomicalZone, ZoneInfo> = {
  cervical: {
    id: 'cervical',
    name: 'Neck & Upper Spine',
    clinicalName: 'Cervical Spine (C1-C7)',
    commonComplaints: 'Stiff neck, pinched nerve, cervicogenic headache, whiplash',
    side: 'both',
  },
  shoulder: {
    id: 'shoulder',
    name: 'Shoulders & Rotator Cuff',
    clinicalName: 'Glenohumeral & Scapular Complex',
    commonComplaints: 'Rotator cuff impingement, frozen shoulder, labrum tear, bursitis',
    side: 'both',
  },
  thoracic: {
    id: 'thoracic',
    name: 'Mid-Back & Rib Cage',
    clinicalName: 'Thoracic Spine & Costovertebral Joints',
    commonComplaints: 'Rib sprain, postural tightness, scapular pain, thoracic outlet',
    side: 'both',
  },
  lumbar: {
    id: 'lumbar',
    name: 'Lower Back & Sciatica',
    clinicalName: 'Lumbar Spine (L1-L5) & Sacrum',
    commonComplaints: 'Disc bulge/herniation, sciatica, facet joint lock, acute spasm',
    side: 'both',
  },
  elbow: {
    id: 'elbow',
    name: 'Elbow, Forearm & Wrist',
    clinicalName: 'Upper Extremity Distal Kinetic Chain',
    commonComplaints: 'Tennis/golfer elbow, carpal tunnel, wrist tendonitis, RSI',
    side: 'both',
  },
  hip: {
    id: 'hip',
    name: 'Hip, Groin & Pelvis',
    clinicalName: 'Coxofemoral Joint & Pelvic Girdle',
    commonComplaints: 'SI joint dysfunction, bursitis, labral tear, groin pull, piriformis',
    side: 'both',
  },
  knee: {
    id: 'knee',
    name: 'Knee & Patella',
    clinicalName: 'Tibiofemoral & Patellofemoral Complex',
    commonComplaints: 'Meniscus tear, ACL/MCL sprain, runner’s knee, post-op replacement',
    side: 'both',
  },
  ankle: {
    id: 'ankle',
    name: 'Ankle, Achilles & Foot',
    clinicalName: 'Talocrural, Subtalar & Plantar Complex',
    commonComplaints: 'Plantar fasciitis, ankle sprain, Achilles tendonitis, flat feet',
    side: 'both',
  },
};

export const BodyMap: React.FC<BodyMapProps> = ({
  selectedZone,
  onSelectZone,
  view,
  onToggleView,
}) => {
  const isSelected = (zone: AnatomicalZone) => selectedZone === zone;

  const getRegionClass = (zone: AnatomicalZone) => {
    const active = isSelected(zone);
    return `cursor-pointer transition-all duration-200 ${
      active
        ? 'fill-teal-600 stroke-teal-800 stroke-2 drop-shadow-md'
        : 'fill-slate-200 hover:fill-teal-200 stroke-slate-300 hover:stroke-teal-400 stroke-1'
    }`;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 md:p-6 flex flex-col justify-between">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <span className="text-xs uppercase font-semibold tracking-wider text-teal-700">
            Interactive Anatomical Map
          </span>
          <h3 className="text-base font-bold text-slate-900 mt-0.5">
            Select Primary Pain Zone
          </h3>
        </div>

        {/* View Toggle */}
        <button
          type="button"
          onClick={onToggleView}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
          title="Switch between front and back view"
        >
          <RotateCw className="w-3.5 h-3.5 text-teal-600" />
          <span>{view === 'anterior' ? 'View Back' : 'View Front'}</span>
        </button>
      </div>

      {/* SVG Canvas & Quick Zone Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-4">
        {/* Anatomical Human Figure SVG */}
        <div className="md:col-span-6 flex flex-col items-center justify-center relative min-h-[360px] bg-slate-50/70 rounded-xl p-3 border border-slate-100">
          <div className="absolute top-2 left-2 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            {view === 'anterior' ? 'Anterior (Front)' : 'Posterior (Back)'}
          </div>

          <svg
            viewBox="0 0 240 440"
            className="w-full max-w-[210px] h-[350px] select-none"
            aria-label="Interactive Human Body Anatomy Map"
          >
            {/* Ambient Body Silhouette Backdrop */}
            <g opacity="0.15" fill="#64748B">
              <circle cx="120" cy="38" r="24" />
              <path d="M96 64 C96 64, 76 80, 52 140 C44 160, 36 210, 32 245 C30 255, 34 260, 42 258 C50 255, 62 215, 66 195 L72 170 L72 260 C72 275, 82 330, 84 390 L80 430 L108 430 L112 360 L118 275 L122 275 L128 360 L132 430 L160 430 L156 390 C158 330, 168 275, 168 260 L168 170 L174 195 C178 215, 190 255, 198 258 C206 260, 210 255, 208 245 C204 210, 196 160, 188 140 C164 80, 144 64, 144 64 Z" />
            </g>

            {/* HEAD & CRANIAL BASE */}
            <circle
              cx="120"
              cy="36"
              r="22"
              className={getRegionClass('cervical')}
              onClick={() => onSelectZone('cervical')}
            />

            {/* CERVICAL SPINE / NECK */}
            <path
              d="M106 58 L134 58 L142 82 L98 82 Z"
              className={getRegionClass('cervical')}
              onClick={() => onSelectZone('cervical')}
            />

            {/* SHOULDERS */}
            {/* Left Shoulder */}
            <path
              d="M72 84 C60 90, 50 102, 46 122 C44 134, 54 138, 62 134 C72 128, 80 114, 86 100 Z"
              className={getRegionClass('shoulder')}
              onClick={() => onSelectZone('shoulder')}
            />
            {/* Right Shoulder */}
            <path
              d="M168 84 C180 90, 190 102, 194 122 C196 134, 186 138, 178 134 C168 128, 160 114, 154 100 Z"
              className={getRegionClass('shoulder')}
              onClick={() => onSelectZone('shoulder')}
            />

            {/* THORACIC SPINE & CHEST / UPPER BACK */}
            <path
              d="M96 84 L144 84 L148 140 L92 140 Z"
              className={getRegionClass('thoracic')}
              onClick={() => onSelectZone('thoracic')}
            />

            {/* LUMBAR SPINE / LOWER BACK & CORE */}
            <path
              d="M92 142 L148 142 L150 184 L90 184 Z"
              className={getRegionClass('lumbar')}
              onClick={() => onSelectZone('lumbar')}
            />

            {/* ELBOWS & FOREARMS */}
            {/* Left Arm / Elbow */}
            <path
              d="M44 138 C38 160, 32 195, 26 225 C24 235, 36 238, 42 228 C48 200, 56 166, 60 142 Z"
              className={getRegionClass('elbow')}
              onClick={() => onSelectZone('elbow')}
            />
            {/* Right Arm / Elbow */}
            <path
              d="M196 138 C202 160, 208 195, 214 225 C216 235, 204 238, 198 228 C192 200, 184 166, 180 142 Z"
              className={getRegionClass('elbow')}
              onClick={() => onSelectZone('elbow')}
            />

            {/* HIPS, PELVIS & SACRUM */}
            <path
              d="M86 186 L154 186 L160 232 L120 250 L80 232 Z"
              className={getRegionClass('hip')}
              onClick={() => onSelectZone('hip')}
            />

            {/* THIGHS & KNEES */}
            {/* Left Knee Area */}
            <path
              d="M80 238 L114 248 L110 326 C110 334, 78 334, 78 326 Z"
              className={getRegionClass('knee')}
              onClick={() => onSelectZone('knee')}
            />
            {/* Right Knee Area */}
            <path
              d="M160 238 L126 248 L130 326 C130 334, 162 334, 162 326 Z"
              className={getRegionClass('knee')}
              onClick={() => onSelectZone('knee')}
            />

            {/* ANKLES & FEET */}
            {/* Left Shin/Ankle */}
            <path
              d="M78 334 L110 334 L106 415 L70 415 Z"
              className={getRegionClass('ankle')}
              onClick={() => onSelectZone('ankle')}
            />
            {/* Right Shin/Ankle */}
            <path
              d="M130 334 L162 334 L170 415 L134 415 Z"
              className={getRegionClass('ankle')}
              onClick={() => onSelectZone('ankle')}
            />

            {/* Interactive Pulse Rings for Selected Zone */}
            {selectedZone === 'cervical' && (
              <circle cx="120" cy="65" r="16" fill="none" stroke="#0D9488" strokeWidth="2.5" className="animate-ping opacity-75" />
            )}
            {selectedZone === 'lumbar' && (
              <circle cx="120" cy="162" r="18" fill="none" stroke="#0D9488" strokeWidth="2.5" className="animate-ping opacity-75" />
            )}
            {selectedZone === 'shoulder' && (
              <circle cx="60" cy="110" r="14" fill="none" stroke="#0D9488" strokeWidth="2.5" className="animate-ping opacity-75" />
            )}
            {selectedZone === 'knee' && (
              <circle cx="94" cy="305" r="14" fill="none" stroke="#0D9488" strokeWidth="2.5" className="animate-ping opacity-75" />
            )}
            {selectedZone === 'hip' && (
              <circle cx="120" cy="215" r="16" fill="none" stroke="#0D9488" strokeWidth="2.5" className="animate-ping opacity-75" />
            )}
            {selectedZone === 'ankle' && (
              <circle cx="92" cy="390" r="14" fill="none" stroke="#0D9488" strokeWidth="2.5" className="animate-ping opacity-75" />
            )}
            {selectedZone === 'elbow' && (
              <circle cx="38" cy="180" r="14" fill="none" stroke="#0D9488" strokeWidth="2.5" className="animate-ping opacity-75" />
            )}
            {selectedZone === 'thoracic' && (
              <circle cx="120" cy="112" r="16" fill="none" stroke="#0D9488" strokeWidth="2.5" className="animate-ping opacity-75" />
            )}
          </svg>

          <span className="text-[11px] text-slate-500 mt-2 text-center">
            Click directly on any body area or use the quick tags
          </span>
        </div>

        {/* Selected Zone Clinical Card & Quick Grid */}
        <div className="md:col-span-6 flex flex-col justify-between h-full space-y-4">
          <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200/80">
            <div className="flex items-center gap-2 text-teal-800 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-teal-600"></span>
              <span>Currently Focused Zone</span>
            </div>
            <h4 className="text-lg font-bold text-slate-900 mt-1">
              {ZONES[selectedZone].name}
            </h4>
            <p className="text-xs font-mono text-teal-900 mt-0.5">
              {ZONES[selectedZone].clinicalName}
            </p>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              <strong className="text-slate-800">Common indicators:</strong> {ZONES[selectedZone].commonComplaints}
            </p>
            <div className="mt-2.5 pt-2 border-t border-teal-200/60 flex items-center justify-between text-[11px]">
              <span className="text-teal-800 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                <span>3D & 5D Kinematic Model Active Below</span>
              </span>
              <span className="text-teal-900 font-mono text-[10px] bg-teal-100 px-1.5 py-0.5 rounded">
                8/8 Modeled
              </span>
            </div>
          </div>

          {/* Quick Select Buttons Grid */}
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              All Anatomical Regions
            </span>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(ZONES) as AnatomicalZone[]).map((zoneKey) => {
                const zone = ZONES[zoneKey];
                const active = selectedZone === zoneKey;
                return (
                  <button
                    key={zoneKey}
                    type="button"
                    onClick={() => onSelectZone(zoneKey)}
                    className={`flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg text-left transition-all border ${
                      active
                        ? 'bg-teal-700 text-white border-teal-700 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-teal-400 hover:bg-slate-50'
                    }`}
                  >
                    <span className="truncate">{zone.name}</span>
                    {active && <Check className="w-3.5 h-3.5 shrink-0 ml-1 text-teal-200" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
