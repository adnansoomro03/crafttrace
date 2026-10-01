import React from 'react';
import { ShieldCheck, Activity, AlertTriangle, Sparkles, CheckCircle2, Globe } from 'lucide-react';

export default function LiveProvenanceTicker({ onVerifyClick }) {
  const events = [
    { type: 'verified', text: 'VERIFIED: AJ-2026-00125 (Teli Ajrak) authenticated in London, UK', time: '2m ago', id: 'AJ-2026-00125' },
    { type: 'registered', text: 'NEW MINT: RL-2026-00126 (Tuk Ralli Quilt) registered in Larkana Guild', time: '14m ago', id: 'RL-2026-00126' },
    { type: 'anomaly', text: 'ANOMALY ALERT: AJ-2026-00404 flagged rapid 5-city scan (Possible Tag Clone)', time: '21m ago', id: 'AJ-2026-00404' },
    { type: 'export', text: 'CUSTOMS CLEARED: Shipment #EXP-881 cleared Karachi Port for UK Luxury Trade', time: '35m ago', id: 'AJ-2026-00125' },
    { type: 'verified', text: 'VERIFIED: EM-2026-00127 (Thar Hurmitch Shawl) scanned by buyer in Karachi', time: '48m ago', id: 'EM-2026-00127' }
  ];

  return (
    <div className="w-full bg-slate-950/80 border-b border-slate-800/80 py-2 overflow-hidden relative backdrop-blur-md z-30">
      <div className="flex items-center">
        
        {/* Static Left Label */}
        <div className="flex items-center gap-2 px-3 sm:px-4 py-0.5 bg-slate-900 border-r border-slate-800 text-[11px] font-bold text-slate-300 z-10 flex-shrink-0 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="hidden sm:inline uppercase tracking-wider text-slate-400 font-mono text-[10px]">
            Live Provenance Sentinel
          </span>
          <span className="sm:hidden text-emerald-400 font-mono text-[10px]">LIVE</span>
        </div>

        {/* Running Marquee Strip */}
        <div className="flex overflow-hidden relative w-full">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-xs text-slate-300">
            {events.concat(events).map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => onVerifyClick && onVerifyClick(item.id)}
                className="flex items-center gap-2 cursor-pointer hover:text-amber-300 transition-colors group flex-shrink-0"
              >
                {item.type === 'verified' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                {item.type === 'anomaly' && <AlertTriangle className="w-3.5 h-3.5 text-rose-400 animate-pulse" />}
                {item.type === 'registered' && <Sparkles className="w-3.5 h-3.5 text-amber-400" />}
                {item.type === 'export' && <Globe className="w-3.5 h-3.5 text-blue-400" />}

                <span className="font-medium group-hover:underline text-[11px] sm:text-xs">
                  {item.text}
                </span>

                <span className="text-[10px] text-slate-500 font-mono bg-slate-900/80 px-1.5 py-0.5 rounded">
                  {item.time}
                </span>

                <span className="text-slate-700 ml-4 font-bold">•</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
