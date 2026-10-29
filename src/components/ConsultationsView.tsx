import React, { useState } from 'react';
import { Booking } from '../types';
import { Calendar, Clock, MapPin, CheckCircle2, FileText, Copy, Check, Printer, ChevronRight } from 'lucide-react';

interface ConsultationsViewProps {
  bookings: Booking[];
  onFindMore: () => void;
}

export const ConsultationsView: React.FC<ConsultationsViewProps> = ({
  bookings,
  onFindMore,
}) => {
  const [selectedBookingForNote, setSelectedBookingForNote] = useState<Booking | null>(
    bookings.find((b) => b.intakeSummary) || bookings[0] || null
  );
  const [copied, setCopied] = useState<boolean>(false);

  const copyNote = (text?: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  if (bookings.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 text-center max-w-xl mx-auto space-y-4">
        <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
          <Calendar className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">
          No Consultations Booked Yet
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
          Use the interactive anatomical body map and triage checklist to find a specialist matched to your specific pain condition, then schedule your first consultation.
        </p>
        <button
          type="button"
          onClick={onFindMore}
          className="px-5 py-2.5 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors shadow-xs"
        >
          Find My Matching Physiotherapist
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider">
            Patient Dashboard
          </span>
          <h2 className="text-xl font-bold text-slate-900">
            My Scheduled Clinical Consultations ({bookings.length})
          </h2>
        </div>
        <button
          type="button"
          onClick={onFindMore}
          className="text-xs font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1"
        >
          <span>Find another specialist</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Bookings List */}
        <div className="lg:col-span-6 space-y-3">
          {bookings.map((booking) => {
            const isSelected = selectedBookingForNote?.id === booking.id;
            return (
              <div
                key={booking.id}
                onClick={() => setSelectedBookingForNote(booking)}
                className={`p-4 rounded-xl border transition-all cursor-pointer bg-white ${
                  isSelected
                    ? 'border-teal-600 ring-2 ring-teal-500/10 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={booking.therapistAvatar}
                      alt={booking.therapistName}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {booking.therapistName}
                      </h4>
                      <p className="text-xs text-slate-500">{booking.clinicName}</p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>{booking.status}</span>
                  </span>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center gap-1 font-medium text-slate-800">
                    <Calendar className="w-3.5 h-3.5 text-teal-600" />
                    <span>{booking.appointmentDate} at {booking.appointmentTime}</span>
                  </div>
                  <span className="font-semibold text-teal-800">
                    {booking.consultationType}
                  </span>
                </div>

                {booking.intakeSummary && (
                  <div className="mt-2.5 text-[11px] font-medium text-teal-800 flex items-center gap-1">
                    <FileText className="w-3 h-3 text-teal-600" />
                    <span>Includes Pre-Visit Clinical SOAP Note</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Clinical Note & Appointment Briefing Panel */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-xs space-y-4">
          {selectedBookingForNote ? (
            <>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider">
                    Consultation Briefing
                  </span>
                  <h4 className="text-base font-bold text-slate-900 mt-0.5">
                    Pre-Visit File · Ref #{selectedBookingForNote.id}
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  {selectedBookingForNote.intakeSummary && (
                    <button
                      type="button"
                      onClick={() => copyNote(selectedBookingForNote.intakeSummary)}
                      className="text-xs font-semibold text-slate-700 hover:text-teal-700 flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 transition-colors"
                      title="Copy clinical briefing"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="text-xs font-semibold text-slate-700 hover:text-teal-700 flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 transition-colors"
                    title="Print clinical summary"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print</span>
                  </button>
                </div>
              </div>

              {/* Patient and Appointment Quick Meta */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-400 block text-[11px]">Patient Name</span>
                  <span className="font-semibold text-slate-800">{selectedBookingForNote.patientName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Anatomical Focus</span>
                  <span className="font-semibold text-slate-800 capitalize">
                    {selectedBookingForNote.anatomicalZone} (VAS: {selectedBookingForNote.painLevel}/10)
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Scheduled With</span>
                  <span className="font-semibold text-slate-800">{selectedBookingForNote.therapistName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Format & Date</span>
                  <span className="font-semibold text-teal-800">
                    {selectedBookingForNote.appointmentDate} ({selectedBookingForNote.consultationType})
                  </span>
                </div>
              </div>

              {/* Pre-Visit Clinical Note Content */}
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-teal-600" />
                  <span>Clinical Intake Note (SOAP Subjective)</span>
                </h5>

                {selectedBookingForNote.intakeSummary ? (
                  <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 whitespace-pre-line leading-relaxed max-h-[350px] overflow-y-auto">
                    {selectedBookingForNote.intakeSummary}
                  </div>
                ) : (
                  <div className="p-6 text-center text-xs text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    No intake note generated during this booking.
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="py-12 text-center text-xs text-slate-400">
              Select a consultation to view appointment details and clinical intake briefing.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
