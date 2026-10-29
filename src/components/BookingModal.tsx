import React, { useState } from 'react';
import { Physiotherapist, TriageProfile, Booking } from '../types';
import { X, Calendar, Clock, MapPin, Sparkles, Copy, Check, ShieldCheck, FileText, ChevronRight } from 'lucide-react';

interface BookingModalProps {
  therapist: Physiotherapist;
  triage: TriageProfile;
  onClose: () => void;
  onBookingConfirmed: (booking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  therapist,
  triage,
  onClose,
  onBookingConfirmed,
}) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    therapist.availableSlots[0]?.date || ''
  );
  const [selectedTime, setSelectedTime] = useState<string>(
    therapist.availableSlots[0]?.times[0] || ''
  );
  const [consultationType, setConsultationType] = useState<'In-Clinic' | 'Telehealth'>(
    therapist.consultationTypes[0] || 'In-Clinic'
  );

  const [patientName, setPatientName] = useState(triage.patientName || '');
  const [patientEmail, setPatientEmail] = useState(triage.patientEmail || '');
  const [patientPhone, setPatientPhone] = useState(triage.patientPhone || '');

  // Pre-visit AI Intake Note state
  const [intakeNote, setIntakeNote] = useState<string>('');
  const [isGeneratingNote, setIsGeneratingNote] = useState<boolean>(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  const currentSlot = therapist.availableSlots.find((s) => s.date === selectedDate);

  const handleGenerateIntakeNote = async () => {
    setIsGeneratingNote(true);
    setGenerationError(null);

    try {
      const res = await fetch('/api/intake-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientName: patientName || 'Patient',
          anatomicalZone: triage.anatomicalZone,
          subRegion: triage.subRegion,
          painLevel: triage.painLevel,
          painType: triage.painType,
          duration: triage.duration,
          isPostOp: triage.isPostOp,
          postOpDetails: triage.postOpDetails,
          radiatingNumbness: triage.radiatingNumbness,
          dailyImpact: triage.dailyImpact,
          aggravatingFactors: triage.aggravatingFactors,
          relievingFactors: triage.relievingFactors,
          previousTreatments: triage.previousTreatments,
          targetGoals: triage.targetGoals,
          practitionerName: therapist.name,
          practitionerSpecialty: therapist.specializations[0],
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate pre-visit briefing');
      }

      const data = await res.json();
      setIntakeNote(data.summary || '');
    } catch (err: any) {
      console.error(err);
      setGenerationError('Could not connect to clinical briefing service. You can still confirm your consultation.');
    } finally {
      setIsGeneratingNote(false);
    }
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) {
      alert('Please enter your name for clinical booking.');
      return;
    }
    if (!selectedDate || !selectedTime) {
      alert('Please pick a consultation date and time slot.');
      return;
    }

    const newBooking: Booking = {
      id: `BK-${Date.now().toString().slice(-6)}`,
      therapistId: therapist.id,
      therapistName: therapist.name,
      therapistAvatar: therapist.avatarUrl,
      clinicName: therapist.clinicName,
      appointmentDate: selectedDate,
      appointmentTime: selectedTime,
      consultationType,
      patientName: patientName.trim(),
      patientEmail: patientEmail.trim(),
      patientPhone: patientPhone.trim(),
      anatomicalZone: triage.anatomicalZone,
      painLevel: triage.painLevel,
      status: 'Confirmed',
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      intakeSummary: intakeNote || undefined,
    };

    setConfirmedBooking(newBooking);
    onBookingConfirmed(newBooking);
  };

  const copyToClipboard = () => {
    if (!intakeNote) return;
    navigator.clipboard.writeText(intakeNote);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 md:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[92vh] flex flex-col my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-teal-800">
              Interactive Consultation Booking
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              Schedule Assessment with {therapist.name}
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

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 md:p-6">
          {confirmedBooking ? (
            /* Confirmation Screen */
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-xs">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-slate-900">
                  Consultation Confirmed!
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Reference ID: <span className="font-mono font-bold text-slate-800">{confirmedBooking.id}</span>
                </p>
              </div>

              <div className="max-w-md mx-auto p-4 bg-slate-50 rounded-xl border border-slate-200 text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Practitioner:</span>
                  <span className="font-semibold text-slate-900">{therapist.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Date & Time:</span>
                  <span className="font-semibold text-slate-900">
                    {confirmedBooking.appointmentDate} at {confirmedBooking.appointmentTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Format:</span>
                  <span className="font-semibold text-teal-800">{confirmedBooking.consultationType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Clinic / Location:</span>
                  <span className="font-semibold text-slate-900 truncate max-w-[220px]">
                    {therapist.clinicName}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200">
                  <span className="text-slate-500">Initial Assessment Fee:</span>
                  <span className="font-mono font-bold text-slate-900">
                    {therapist.currency}{therapist.feeInitial}
                  </span>
                </div>
              </div>

              {intakeNote && (
                <div className="max-w-md mx-auto text-left p-4 bg-teal-50/60 rounded-xl border border-teal-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-teal-900 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-teal-700" />
                      Pre-Visit Clinical Note Attached
                    </span>
                    <button
                      type="button"
                      onClick={copyToClipboard}
                      className="text-xs font-semibold text-teal-800 hover:text-teal-950 flex items-center gap-1"
                    >
                      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? 'Copied' : 'Copy Note'}</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-3">
                    {intakeNote}
                  </p>
                </div>
              )}

              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
              >
                Close & Return to Dashboard
              </button>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleConfirm} className="space-y-6">
              {/* Specialist Snapshot */}
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <img
                  src={therapist.avatarUrl}
                  alt={therapist.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-slate-900 truncate">
                    {therapist.name}
                  </div>
                  <div className="text-xs text-slate-500 truncate">
                    {therapist.title} · {therapist.clinicName}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-slate-900">
                    {therapist.currency}{therapist.feeInitial}
                  </div>
                  <div className="text-[11px] text-slate-400">60 min</div>
                </div>
              </div>

              {/* Consultation Format */}
              <div>
                <label className="text-xs font-semibold text-slate-800 uppercase tracking-wider block mb-2">
                  Care Delivery Format
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {therapist.consultationTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setConsultationType(type)}
                      className={`p-3 text-left rounded-xl border transition-all text-xs font-semibold ${
                        consultationType === type
                          ? 'border-teal-600 bg-teal-50/70 text-teal-900 shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{type}</span>
                        {consultationType === type && <Check className="w-3.5 h-3.5 text-teal-600" />}
                      </div>
                      <div className="text-[11px] font-normal text-slate-500 mt-0.5">
                        {type === 'In-Clinic'
                          ? therapist.clinicAddress
                          : 'High-definition secure video session'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time Selection */}
              <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-800 uppercase tracking-wider block">
                  Select Consultation Slot
                </label>

                {/* Dates Row */}
                <div className="grid grid-cols-3 gap-2">
                  {therapist.availableSlots.map((slot) => (
                    <button
                      key={slot.date}
                      type="button"
                      onClick={() => {
                        setSelectedDate(slot.date);
                        setSelectedTime(slot.times[0] || '');
                      }}
                      className={`p-2.5 text-center rounded-xl border transition-all ${
                        selectedDate === slot.date
                          ? 'border-teal-600 bg-teal-50 text-teal-900 font-bold'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-xs font-semibold">{slot.dayLabel}</div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5">{slot.date}</div>
                    </button>
                  ))}
                </div>

                {/* Times Row */}
                {currentSlot && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {currentSlot.times.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all font-mono tabular-nums ${
                          selectedTime === time
                            ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Patient Contact Info */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <label className="text-xs font-semibold text-slate-800 uppercase tracking-wider block">
                  Patient Contact Information
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-500 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500 block mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. john@example.com"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500 block mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      placeholder="e.g. +1 (555) 019-2834"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </div>

              {/* Pre-Visit AI Intake Note Generator (Key Feature) */}
              <div className="p-4 bg-teal-50/50 rounded-xl border border-teal-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-teal-700" />
                    <span className="text-xs font-bold text-slate-900">
                      Pre-Visit Clinical Intake Briefing (SOAP Format)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleGenerateIntakeNote}
                    disabled={isGeneratingNote}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isGeneratingNote ? 'Generating...' : intakeNote ? 'Regenerate Note' : 'Generate Pre-Visit Note'}</span>
                  </button>
                </div>

                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Transforms your body map selections and symptom severity into an evidence-informed clinical briefing for {therapist.name} before you arrive.
                </p>

                {generationError && (
                  <div className="text-xs text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-200">
                    {generationError}
                  </div>
                )}

                {intakeNote && (
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Clinical Intake Preview</span>
                      <button
                        type="button"
                        onClick={copyToClipboard}
                        className="text-teal-800 hover:text-teal-950 font-semibold flex items-center gap-1"
                      >
                        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        <span>{copied ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <textarea
                      rows={6}
                      value={intakeNote}
                      onChange={(e) => setIntakeNote(e.target.value)}
                      className="w-full text-xs font-mono p-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 leading-relaxed"
                    />
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-teal-700 rounded-lg transition-colors shadow-xs"
                >
                  Confirm Appointment ({therapist.currency}{therapist.feeInitial})
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
