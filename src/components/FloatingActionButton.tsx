import React, { useState } from 'react';
import { Layers, Activity, Calendar, ArrowUp, Plus, X } from 'lucide-react';

interface FloatingActionButtonProps {
  onScrollToTriage: () => void;
  onOpenCompare: () => void;
  onBookFounder: () => void;
  compareCount: number;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onScrollToTriage,
  onOpenCompare,
  onBookFounder,
  compareCount,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
      {/* Expanded Quick Actions Menu */}
      {isOpen && (
        <div className="flex flex-col items-end gap-2 mb-1 animate-in fade-in slide-in-from-bottom-3 duration-150">
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-lg transition-all"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-slate-500" />
          </button>

          <button
            type="button"
            onClick={() => {
              onBookFounder();
              setIsOpen(false);
            }}
            className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-teal-900 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-xl shadow-lg transition-all"
          >
            <span>Consult Dr. Heta Doshi</span>
            <Calendar className="w-3.5 h-3.5 text-teal-700" />
          </button>

          {compareCount > 0 && (
            <button
              type="button"
              onClick={() => {
                onOpenCompare();
                setIsOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-lg transition-all"
            >
              <span>Compare Matrix ({compareCount})</span>
              <Layers className="w-3.5 h-3.5 text-teal-600" />
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              onScrollToTriage();
              setIsOpen(false);
            }}
            className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-lg transition-all"
          >
            <span>Body Map Triage</span>
            <Activity className="w-3.5 h-3.5 text-teal-600" />
          </button>
        </div>
      )}

      {/* Primary Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-teal-700 hover:bg-teal-800 text-white flex items-center justify-center shadow-xl border-2 border-white transition-transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-teal-500/20"
        title="Quick Navigation & Actions"
        aria-label="Quick Actions Menu"
      >
        {isOpen ? (
          <X className="w-5 h-5 transition-transform rotate-90" />
        ) : (
          <Plus className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};
