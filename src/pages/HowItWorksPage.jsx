import React from 'react';
import { 
  ShieldCheck, QrCode, Smartphone, Users, CheckCircle2, 
  AlertTriangle, DollarSign, Cpu, ArrowRight, Lightbulb, HeartHandshake
} from 'lucide-react';

export default function HowItWorksPage({ onVerifyDirect }) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 space-y-12 animate-fadeIn">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-2">
          Architecture & Principles
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          How CraftTrace Really Works
        </h1>
        <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
          Demystifying digital provenance for traditional crafts: why a QR code is not magic proof, but an accessible, tamper-monitored gateway to registered human craftsmanship.
        </p>
      </div>

      {/* CORE 4-STEP WORKFLOW */}
      <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        <h2 className="font-serif text-xl font-bold text-white text-center">
          The 4-Step Provenance Lifecycle
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
            <span className="font-mono text-xs font-bold text-amber-400 block mb-2">STEP 01</span>
            <h3 className="text-sm font-bold text-white mb-1">Artisan Registers Craft</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Master artisan or partner middleman uploads craft name, technique, production time, and workshop proof photos.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
            <span className="font-mono text-xs font-bold text-rose-400 block mb-2">STEP 02</span>
            <h3 className="text-sm font-bold text-white mb-1">Digital Identity Issued</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              System generates a unique alphanumeric Product ID (e.g. <code className="text-amber-300">AJ-2026-00125</code>) and stores the provenance dossier.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
            <span className="font-mono text-xs font-bold text-blue-400 block mb-2">STEP 03</span>
            <h3 className="text-sm font-bold text-white mb-1">QR Label Attached</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              A low-cost printed QR sticker or woven cloth tag is hand-stitched into the craft border. Cost: less than PKR 5.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
            <span className="font-mono text-xs font-bold text-emerald-400 block mb-2">STEP 04</span>
            <h3 className="text-sm font-bold text-white mb-1">Buyer Scans & Verifies</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Buyer scans with standard phone camera. Web page loads immediately. Scan location is recorded to monitor fraud.
            </p>
          </div>
        </div>

        {/* Big Callout Box */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-950 to-slate-950 border border-amber-600/30 text-center">
          <p className="font-serif text-sm md:text-base font-bold text-amber-200">
            "The QR code is NOT the proof itself. It is the digital gateway to the product's registered provenance, artisan identity, and scan activity monitoring."
          </p>
        </div>
      </div>

      {/* WHY NOT SIMPLE QR GENERATOR & REAL-WORLD LOGIC */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">How Authenticity is Truly Established</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            CraftTrace does not make naive claims that code alone proves physical matter. Genuine trust is established through:
          </p>
          <ul className="space-y-2 text-xs text-slate-400">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span><strong>Registered Artisans:</strong> Only verified guild members or accredited cooperatives can mint genuine craft IDs.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span><strong>Visual Process Proof:</strong> Workshop photos showing mustard oil soaking, mud resist, and hand block alignment.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span><strong>Scan Anomaly Engine:</strong> Flagging suspicious rapid scans across conflicting cities to catch tag photocopiers.</span>
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
            <DollarSign className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">The Affordability Mandate</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Many blockchain or RFID solutions fail in rural Pakistan because they cost more than the artisan's profit margin. CraftTrace is built to be ultra-affordable:
          </p>
          <ul className="space-y-2 text-xs text-slate-400">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span><strong>Cheap Paper/Cloth Tags:</strong> Printed at local village print shops for &lt; PKR 5 ($0.02 USD).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span><strong>Zero Special Hardware:</strong> Runs on any basic Android smartphone over existing web browsers.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span><strong>Assisted Middleman Mode:</strong> If an artisan cannot read or write, their partner middleman handles the registration on their behalf.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* WHY NOT MANDATORY BLOCKCHAIN IN MVP */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
          <Lightbulb className="w-4 h-4" />
          Technical Pragmatism: Why Blockchain Is Not Mandatory in MVP
        </div>
        <h3 className="font-serif text-lg font-bold text-white">
          Real Solutions Meet Artisans Where They Are
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Forcing poor village artisans to pay Ethereum gas fees or manage Web3 cryptographic seed phrases is completely detached from the reality of rural Sindh. CraftTrace uses high-speed relational database architecture with cryptographic SHA-256 digital hashes. In future phases, enterprise export batches can anchor their hashes onto lightweight layer-2 ledgers without burdening rural crafters.
        </p>
      </div>

    </div>
  );
}
