import React, { useState, useRef } from 'react';
import { TriageProfile, AnatomicalZone } from '../types';
import { ZONES } from './BodyMap';
import { Activity, AlertCircle, Clock, HeartPulse, Mic, MicOff, Sparkles, Loader2, Check } from 'lucide-react';

interface TriageFormProps {
  triage: TriageProfile;
  onChange: (updated: Partial<TriageProfile>) => void;
  onReset: () => void;
}

const PAIN_QUALITIES = [
  'Deep Aching',
  'Sharp / Stabbing',
  'Radiating / Shooting',
  'Morning Stiffness',
  'Burning Sensation',
  'Throbbing with Activity',
  'Joint Clicking / Catching',
];

export const TriageForm: React.FC<TriageFormProps> = ({ triage, onChange }) => {
  // Voice recording state
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcriptionSuccess, setTranscriptionSuccess] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const togglePainQuality = (quality: string) => {
    const exists = triage.painType.includes(quality);
    if (exists) {
      onChange({ painType: triage.painType.filter((q) => q !== quality) });
    } else {
      onChange({ painType: [...triage.painType, quality] });
    }
  };

  const getPainLevelColor = (val: number) => {
    if (val <= 3) return 'text-teal-700 bg-teal-50 border-teal-200';
    if (val <= 6) return 'text-slate-800 bg-slate-100 border-slate-200';
    return 'text-rose-700 bg-rose-50 border-rose-200';
  };

  const getPainDescriptor = (val: number) => {
    if (val <= 2) return 'Mild · Aware of discomfort, no functional restriction';
    if (val <= 4) return 'Moderate · Interferes with intense activities';
    if (val <= 6) return 'Significant · Compromises work, lifting or posture';
    if (val <= 8) return 'Severe · Restricts basic daily living & sleep';
    return 'Incapacitating · Requires immediate clinical intervention';
  };

  // Start microphone recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await handleSendAudioForTranscription(audioBlob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setTranscriptionSuccess(false);
    } catch (err) {
      console.error('Microphone access denied:', err);
      alert('Microphone access is required to dictate your symptoms.');
    }
  };

  // Stop microphone recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Convert audio blob to base64 and send to /api/transcribe-audio (gemini-3.5-transcribe)
  const handleSendAudioForTranscription = async (blob: Blob) => {
    setIsTranscribing(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        const base64Data = (reader.result as string).split(',')[1];

        const response = await fetch('/api/transcribe-audio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            audioData: base64Data,
            mimeType: 'audio/webm',
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.text) {
            onChange({
              dailyImpact: data.text,
              targetGoals: triage.targetGoals || 'Restore functional biomechanical movement without pain',
            });
            setTranscriptionSuccess(true);
            setTimeout(() => setTranscriptionSuccess(false), 3000);
          }
        }
        setIsTranscribing(false);
      };
    } catch (err) {
      console.error('Transcription error:', err);
      setIsTranscribing(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 md:p-6 space-y-6">
      {/* Active Zone Clinical Banner */}
      <div className="flex items-start justify-between pb-4 border-b border-slate-100">
        <div>
          <span className="text-xs font-semibold tracking-wider text-teal-700 uppercase">
            Clinical Symptom Assessment
          </span>
          <h3 className="text-lg font-bold text-slate-900 mt-0.5">
            Describe {ZONES[triage.anatomicalZone].name} Symptoms
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Specific traits allow Dr. Heta Doshi to match evidence-informed joint and sports protocols.
          </p>
        </div>
        <div className="px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200">
          Zone: {triage.anatomicalZone}
        </div>
      </div>

      {/* Voice Dictation (Gemini 3.5 Transcribe integration) */}
      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
            {isRecording ? (
              <Mic className="w-4 h-4 text-rose-600 animate-pulse" />
            ) : isTranscribing ? (
              <Loader2 className="w-4 h-4 text-teal-700 animate-spin" />
            ) : (
              <Mic className="w-4 h-4" />
            )}
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <span>Dictate Symptoms by Voice</span>
              <span className="text-[10px] bg-teal-100 text-teal-800 font-mono px-1.5 py-0.2 rounded font-semibold">
                Gemini 3.5 Transcribe
              </span>
            </div>
            <div className="text-[11px] text-slate-500">
              {isRecording
                ? 'Recording your voice... Click Stop when finished.'
                : isTranscribing
                ? 'Transcribing clinical symptoms with AI...'
                : transcriptionSuccess
                ? 'Transcribed and added to clinical profile!'
                : 'Click mic to speak your pain symptoms out loud'}
            </div>
          </div>
        </div>

        <div>
          {isRecording ? (
            <button
              type="button"
              onClick={stopRecording}
              className="px-3 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors flex items-center gap-1 shadow-xs"
            >
              <MicOff className="w-3.5 h-3.5" />
              <span>Stop</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={startRecording}
              disabled={isTranscribing}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1 shadow-2xs"
            >
              <Mic className="w-3.5 h-3.5 text-teal-600" />
              <span>Record Voice</span>
            </button>
          )}
        </div>
      </div>

      {/* 1. Pain Severity Slider (VAS 1-10) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-teal-600" />
            <span>Pain Severity (Visual Analog Scale 1–10)</span>
          </label>
          <span
            className={`px-2.5 py-0.5 rounded-md text-xs font-mono font-bold border tabular-nums ${getPainLevelColor(
              triage.painLevel
            )}`}
          >
            {triage.painLevel} / 10
          </span>
        </div>

        <input
          type="range"
          min="1"
          max="10"
          step="1"
          value={triage.painLevel}
          onChange={(e) => onChange({ painLevel: parseInt(e.target.value, 10) })}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
        />

        <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
          <span>1 Mild</span>
          <span className="text-center font-medium text-slate-700">
            {getPainDescriptor(triage.painLevel)}
          </span>
          <span>10 Incapacitating</span>
        </div>
      </div>

      {/* 2. Symptom Quality Checklist */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <HeartPulse className="w-3.5 h-3.5 text-teal-600" />
          <span>Sensation & Pain Quality</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {PAIN_QUALITIES.map((quality) => {
            const active = triage.painType.includes(quality);
            return (
              <button
                key={quality}
                type="button"
                onClick={() => togglePainQuality(quality)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all border ${
                  active
                    ? 'bg-teal-700 text-white border-teal-700 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-teal-400 hover:bg-white'
                }`}
              >
                {quality}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Chronicity & Timeframe */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-teal-600" />
          <span>Condition Duration / Chronicity</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { id: '< 2 weeks', label: '< 2 Weeks', subtitle: 'Acute Onset' },
            { id: '2-6 weeks', label: '2–6 Weeks', subtitle: 'Subacute' },
            { id: '6-12 weeks', label: '6–12 Weeks', subtitle: 'Persistent' },
            { id: '> 3 months', label: '> 3 Months', subtitle: 'Chronic' },
          ].map((item) => {
            const active = triage.duration === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  onChange({
                    duration: item.id as TriageProfile['duration'],
                  })
                }
                className={`p-2.5 text-left rounded-xl transition-all border ${
                  active
                    ? 'bg-teal-50 border-teal-600 text-teal-900 shadow-xs font-semibold'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="text-xs font-bold">{item.label}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{item.subtitle}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Clinical Triage Flags (Nerve / Post-Op) */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
          <AlertCircle className="w-4 h-4 text-amber-600" />
          <span>Screening Indicators & Clinical Acuity</span>
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={triage.radiatingNumbness}
            onChange={(e) => onChange({ radiatingNumbness: e.target.checked })}
            className="mt-0.5 w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
          />
          <div>
            <div className="text-xs font-semibold text-slate-900">
              Radiating Symptoms / Pins & Needles
            </div>
            <div className="text-[11px] text-slate-500">
              Pain, tingling, or weakness traveling down into your arms/fingers or buttocks/legs.
            </div>
          </div>
        </label>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={triage.isPostOp}
            onChange={(e) => onChange({ isPostOp: e.target.checked })}
            className="mt-0.5 w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
          />
          <div>
            <div className="text-xs font-semibold text-slate-900">
              Post-Surgical Rehabilitation
            </div>
            <div className="text-[11px] text-slate-500">
              You are recovering from surgery (e.g. arthroscopy, ligament repair, joint replacement, spinal fusion).
            </div>
          </div>
        </label>
      </div>

      {/* 5. Patient Goals & Daily Impact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-slate-800 uppercase tracking-wider block mb-1">
            Functional Daily Impact / Symptoms
          </label>
          <input
            type="text"
            value={triage.dailyImpact}
            onChange={(e) => onChange({ dailyImpact: e.target.value })}
            placeholder="e.g. Difficulty sitting at desk >30 mins, morning stiffness"
            className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-800 uppercase tracking-wider block mb-1">
            Primary Rehabilitation Goal
          </label>
          <input
            type="text"
            value={triage.targetGoals}
            onChange={(e) => onChange({ targetGoals: e.target.value })}
            placeholder="e.g. Return to running 5K without knee pain, sleep comfortably"
            className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>
    </div>
  );
};
