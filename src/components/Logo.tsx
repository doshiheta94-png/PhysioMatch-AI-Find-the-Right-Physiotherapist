import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textMap = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Brand Emblem */}
      <div className="relative shrink-0 overflow-hidden rounded-xl shadow-xs border border-slate-200/90 bg-white p-0.5">
        <img
          src="/assets/images/physiomatch_ai_logo.jpg"
          alt="PhysioMatch AI Logo"
          referrerPolicy="no-referrer"
          className={`${sizeMap[size]} object-cover rounded-lg`}
          onError={(e) => {
            // Elegant fallback if image cannot load
            const target = e.target as HTMLElement;
            target.style.display = 'none';
          }}
        />
      </div>

      {/* Brand Wordmark in Plus Jakarta Sans typography */}
      {showText && (
        <div className="flex flex-col leading-none">
          <div className={`font-extrabold tracking-tight text-slate-900 ${textMap[size]}`}>
            <span>Physio</span>
            <span className="text-teal-700">Match</span>
            <span className="ml-1 text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 border border-teal-200/80 px-1.5 py-0.5 rounded align-middle">
              AI
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
