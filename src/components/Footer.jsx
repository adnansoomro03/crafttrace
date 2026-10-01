import React from 'react';
import { ShieldCheck, Heart, Sparkles, RefreshCw, QrCode } from 'lucide-react';
import { resetDemoData } from '../services/storageService';

export default function Footer({ setCurrentTab, onResetData }) {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        
        {/* Brand Col */}
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-800 to-amber-700 flex items-center justify-center text-white font-serif font-black text-xs">
              CT
            </div>
            <span className="font-serif text-lg font-bold text-white tracking-wider">CRAFTTRACE</span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">
            "Scan the craft. Know the story. Trust the origin."
          </p>
          <p className="text-[11px] text-slate-500 leading-normal">
            Preserving 4,500 years of Indus craftsmanship against machine counterfeiting through accessible digital provenance.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">Stakeholder Views</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => setCurrentTab('artisan-dashboard')} className="hover:text-amber-300 transition">
                Artisan Registry & Registration
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab('middleman-dashboard')} className="hover:text-amber-300 transition">
                Middleman & Logistics Bridge
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab('exporter-dashboard')} className="hover:text-amber-300 transition">
                Exporter Verification Portal
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab('admin-dashboard')} className="hover:text-amber-300 transition">
                Sindh Craft Authority Admin
              </button>
            </li>
          </ul>
        </div>

        {/* Verification & Stories */}
        <div>
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">Public Exploration</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => setCurrentTab('verify')} className="hover:text-rose-300 transition flex items-center gap-1">
                <span>Public Verification (No App Required)</span>
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab('craft-stories')} className="hover:text-rose-300 transition">
                Ajrak & Ralli Cultural Heritage Stories
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab('how-it-works')} className="hover:text-rose-300 transition">
                Why QR is Provenance, Not Physical Proof
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab('pitch-guide')} className="text-amber-400 font-bold hover:underline transition">
                IET TechFest 2026 Presentation Pitch & Q&A
              </button>
            </li>
          </ul>
        </div>

        {/* Real-World Logic & Reset */}
        <div className="space-y-3">
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-1">Hackathon Controls</h4>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            CraftTrace uses persistent browser memory. You can reset demo products and anomaly records anytime before rehearsal:
          </p>
          <button
            onClick={() => {
              if (window.confirm("Reset all products and demo scan logs back to initial state?")) {
                resetDemoData();
                if (onResetData) onResetData();
                window.location.reload();
              }
            }}
            className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700 transition"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
            Reset Initial Demo Data
          </button>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
        <div>
          CraftTrace • IET TechFest Hackathon 2026 Submission • Built for Artisans of Sindh
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Digital Provenance System
          </span>
          <span>•</span>
          <span>Zero-Paperwork Accessible Flow</span>
        </div>
      </div>
    </footer>
  );
}
