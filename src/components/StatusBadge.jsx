import React from 'react';
import { CheckCircle2, AlertTriangle, HelpCircle, ShieldAlert } from 'lucide-react';

export default function StatusBadge({ status, size = 'md', showSubtext = false }) {
  const normalized = (status || 'unverified').toLowerCase();

  if (normalized === 'verified') {
    return (
      <div className="inline-flex flex-col items-start">
        <span className={`inline-flex items-center gap-1.5 font-bold tracking-wide rounded-full border border-emerald-500/40 bg-emerald-950/80 text-emerald-400 ${
          size === 'lg' ? 'px-4 py-1.5 text-sm md:text-base glow-verified' : size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-xs md:text-sm glow-verified'
        }`}>
          <CheckCircle2 className={`${size === 'lg' ? 'w-5 h-5' : size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-emerald-400`} />
          VERIFIED HANDMADE CRAFT
        </span>
        {showSubtext && (
          <span className="text-[11px] text-emerald-400/80 mt-1 pl-1">
            Authenticated via Registered Artisan Guild
          </span>
        )}
      </div>
    );
  }

  if (normalized === 'suspicious') {
    return (
      <div className="inline-flex flex-col items-start">
        <span className={`inline-flex items-center gap-1.5 font-bold tracking-wide rounded-full border border-rose-500/60 bg-rose-950/90 text-rose-300 ${
          size === 'lg' ? 'px-4 py-1.5 text-sm md:text-base glow-suspicious' : size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-xs md:text-sm glow-suspicious'
        }`}>
          <AlertTriangle className={`${size === 'lg' ? 'w-5 h-5' : size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-rose-400 animate-pulse`} />
          SUSPICIOUS ACTIVITY DETECTED
        </span>
        {showSubtext && (
          <span className="text-[11px] text-rose-400/90 mt-1 pl-1 font-medium">
            Abnormal scan frequency across multiple locations
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="inline-flex flex-col items-start">
      <span className={`inline-flex items-center gap-1.5 font-bold tracking-wide rounded-full border border-amber-500/40 bg-amber-950/70 text-amber-300 ${
        size === 'lg' ? 'px-4 py-1.5 text-sm md:text-base' : size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-xs md:text-sm'
      }`}>
        <HelpCircle className={`${size === 'lg' ? 'w-5 h-5' : size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-amber-400`} />
        UNVERIFIED PRODUCT
      </span>
      {showSubtext && (
        <span className="text-[11px] text-amber-400/80 mt-1 pl-1">
          Identity pending inspection or not in registry
        </span>
      )}
    </div>
  );
}
