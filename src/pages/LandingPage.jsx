import React, { useState } from 'react';
import { 
  ShieldCheck, QrCode, ArrowRight, Sparkles, CheckCircle2, 
  AlertTriangle, Users, Truck, Globe, Award, HeartHandshake, 
  ExternalLink, Layers, Eye, Smartphone, BookOpen, FileText, 
  Clock, MapPin, Zap, ChevronRight, Check
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

export default function LandingPage({ setCurrentTab, onOpenScanModal, onVerifyDirect }) {
  const [activeHeroTab, setActiveHeroTab] = useState('ajrak');
  const [activeFraudTab, setActiveFraudTab] = useState('genuine'); // 'genuine' | 'counterfeit'
  const [activeTitleHover, setActiveTitleHover] = useState(null); // 'scan' | 'story' | 'trust' | null

  const heroCrafts = {
    ajrak: {
      id: 'AJ-2026-00125',
      name: 'Teli Ajrak 16-Step Indigo Handprint',
      craft: 'Sindhi Ajrak',
      artisan: 'Ayesha Bibi',
      location: 'Matiari, Sindh',
      time: '21 Days (16 Stages)',
      status: 'verified',
      image: '/ajrak_shawl.jpg',
      tagline: 'Natural Indigo & Alizarin block-printed on Indus cotton',
      badgeText: '✓ 16 Stages Verified'
    },
    ralli: {
      id: 'RL-2026-00126',
      name: 'Tuk Geometric Hand-Stitched Ralli',
      craft: 'Ralli Quilt',
      artisan: 'Shazia Bibi',
      location: 'Garelo, Larkana',
      time: '38 Days (35,000+ Stitches)',
      status: 'verified',
      image: '/ralli_craft.jpg',
      tagline: 'Traditional ancestral geometry assembled by hand needlework',
      badgeText: '✓ Stitch Density Certified'
    },
    embroidery: {
      id: 'EM-2026-00127',
      name: 'Hurmitch Sheesha Mirrorwork Shawl',
      craft: 'Thar Embroidery',
      artisan: 'Mai Janki',
      location: 'Islamkot, Tharparkar',
      time: '45 Days Handwork',
      status: 'verified',
      image: '/mirrorwork_craft.jpg',
      tagline: 'Convex glass mirrors locked into hand-spun silk lattices',
      badgeText: '✓ Master Artisan Handcraft'
    }
  };

  const selectedCraft = heroCrafts[activeHeroTab];

  return (
    <div className="space-y-24 pb-24 overflow-hidden">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-12 md:pt-20 pb-16 md:pb-24 border-b border-slate-800/80 bg-ajrak-pattern">
        
        {/* Dynamic Multi-layered Ambient Light Blooms */}
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-rose-900/20 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[8000ms]" />
        <div className="absolute top-24 right-1/4 w-[450px] h-[450px] bg-amber-600/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-900/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Hero Text & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Animated Live Pill */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/95 dark:bg-slate-900/90 border border-amber-500/40 text-xs font-semibold shadow-lg shadow-amber-950/10 dark:shadow-amber-950/30 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                <span className="text-amber-800 dark:text-amber-300 font-bold">Sindh Craft Registry 2026</span>
                <span className="text-slate-400 dark:text-slate-600">•</span>
                <span className="text-slate-700 dark:text-slate-300 font-medium">IET TechFest Hackathon</span>
              </div>

              {/* Headline with High Contrast & Interactive Micro-actions */}
              <div className="space-y-3">
                <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.12] select-none text-center lg:text-left flex flex-col gap-1.5 sm:gap-2">
                  
                  {/* Line 1: Scan the craft. */}
                  <div
                    onClick={onOpenScanModal}
                    onMouseEnter={() => setActiveTitleHover('scan')}
                    onMouseLeave={() => setActiveTitleHover(null)}
                    className="group inline-flex flex-wrap items-center justify-center lg:justify-start gap-3 cursor-pointer transition-all duration-300 hover:translate-x-1.5"
                    title="Click to launch instant camera QR scanner"
                  >
                    <span className="hero-title-main group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">
                      Scan the craft.
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-bold bg-amber-500/15 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-500/40 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-amber-500/25">
                      <QrCode className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 group-hover:rotate-12 transition-transform" />
                      <span>Click to Scan</span>
                    </span>
                  </div>

                  {/* Line 2: Know the story. */}
                  <div
                    onClick={() => {
                      const crafts = ['ajrak', 'ralli', 'embroidery'];
                      const next = crafts[(crafts.indexOf(activeHeroTab) + 1) % crafts.length];
                      setActiveHeroTab(next);
                    }}
                    onMouseEnter={() => setActiveTitleHover('story')}
                    onMouseLeave={() => setActiveTitleHover(null)}
                    className="group flex flex-wrap items-center justify-center lg:justify-start gap-3 cursor-pointer transition-all duration-300 hover:translate-x-1.5"
                    title="Click to switch and explore authentic craft stories"
                  >
                    <span className="hero-title-gradient drop-shadow-sm group-hover:brightness-110 transition-all">
                      Know the story.
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-bold bg-rose-500/15 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border border-rose-500/40 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-rose-500/25">
                      <Sparkles className="w-3.5 h-3.5 text-rose-700 dark:text-rose-400 animate-spin-slow" />
                      <span>Switch: {selectedCraft.craft}</span>
                    </span>
                  </div>

                  {/* Line 3: Trust the origin. */}
                  <div
                    onClick={() => setCurrentTab('verify')}
                    onMouseEnter={() => setActiveTitleHover('trust')}
                    onMouseLeave={() => setActiveTitleHover(null)}
                    className="group inline-flex flex-wrap items-center justify-center lg:justify-start gap-3 cursor-pointer transition-all duration-300 hover:translate-x-1.5"
                    title="Click to inspect immutable blockchain verification"
                  >
                    <span className="hero-title-main group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                      Trust the origin.
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-bold bg-emerald-500/15 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-500/40 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-emerald-500/25">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                      <span>Verify Ledger</span>
                    </span>
                  </div>

                </h1>

                {/* Interactive Title Cue */}
                <div className="flex items-center justify-center lg:justify-start gap-2 pt-1 text-xs text-slate-700 dark:text-slate-400 font-medium">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  <span>Interactive Title: Click any line above to test live Scanner, switch Craft, or verify Provenance</span>
                </div>
              </div>

              {/* Subtitle */}
              <p className="max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-slate-700 dark:text-slate-300 font-normal leading-relaxed">
                The digital provenance platform for traditional Sindhi handmade crafts — giving every authentic Ajrak and Ralli an unforgeable digital identity while stopping chemical copies.
              </p>

              {/* Hero Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => setCurrentTab('verify')}
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 py-4 px-8 rounded-2xl bg-gradient-to-r from-rose-800 via-rose-700 to-amber-700 hover:brightness-110 text-white font-bold text-sm sm:text-base shadow-xl shadow-rose-950/40 hover:shadow-rose-900/50 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <ShieldCheck className="w-5 h-5 text-amber-300" />
                  <span>Verify a Craft (No App Required)</span>
                </button>

                <button
                  onClick={onOpenScanModal}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 py-4 px-7 rounded-2xl bg-white dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-200 font-bold text-sm sm:text-base border border-slate-300 dark:border-slate-700 hover:border-amber-500/50 shadow-lg transition-all duration-300 group"
                >
                  <QrCode className="w-4 h-4 text-amber-600 dark:text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Scan QR Code</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-700 dark:text-slate-400 border-t border-slate-300 dark:border-slate-800/80">
                <div className="flex items-center gap-1.5 font-medium">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Zero App Download</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>&lt; PKR 5 Tag Cost</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Automated Anomaly Sentinel</span>
                </div>
              </div>

            </div>

            {/* Right Column: Dynamic Interactive Showcase Card */}
            <div className="lg:col-span-5 relative">
              
              {/* Floating Accent Badge 1 */}
              <div className="absolute -top-6 -left-6 z-20 hidden sm:flex items-center gap-2.5 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-500/40 shadow-xl backdrop-blur-md animate-float-slow">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-[11px] leading-tight">
                  <span className="font-extrabold text-slate-900 dark:text-white block">Tamper Monitored</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-bold">Active Anomaly Guard</span>
                </div>
              </div>

              {/* Floating Accent Badge 2 */}
              <div className="absolute -bottom-6 -right-6 z-20 hidden sm:flex items-center gap-2.5 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-amber-500/40 shadow-xl backdrop-blur-md animate-float-delayed">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <Award className="w-4 h-4" />
                </div>
                <div className="text-[11px] leading-tight">
                  <span className="font-extrabold text-slate-900 dark:text-white block">Master Lineage</span>
                  <span className="text-amber-600 dark:text-amber-300 font-mono text-[10px] font-bold">4th Gen Matiari Guild</span>
                </div>
              </div>

              {/* Main Interactive Card */}
              <div className="relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-2xl overflow-hidden">
                
                {/* Cultural Tab Selector on Card */}
                <div className="flex items-center justify-between gap-1.5 p-1.5 bg-slate-900/90 dark:bg-slate-950/90 rounded-2xl border border-slate-700/60 shadow-inner mb-4">
                  <button
                    onClick={() => setActiveHeroTab('ajrak')}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeHeroTab === 'ajrak' 
                        ? 'bg-rose-800 text-white shadow-md border border-rose-600' 
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    Ajrak
                  </button>
                  <button
                    onClick={() => setActiveHeroTab('ralli')}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeHeroTab === 'ralli' 
                        ? 'bg-amber-600 text-white shadow-md border border-amber-500' 
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    Ralli
                  </button>
                  <button
                    onClick={() => setActiveHeroTab('embroidery')}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeHeroTab === 'embroidery' 
                        ? 'bg-purple-800 text-white shadow-md border border-purple-600' 
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    Mirrorwork
                  </button>
                </div>

                {/* Craft Image with Permanent Dark Vignette for Crisp Contrast */}
                <div className="relative h-64 w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 group shadow-md">
                  <img
                    src={selectedCraft.image}
                    alt={selectedCraft.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center gap-1.5 font-bold text-[11px] px-2.5 py-1 rounded-full bg-emerald-950/95 border border-emerald-500/60 text-emerald-300 shadow-md">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      {selectedCraft.badgeText}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 z-10 font-mono text-[11px] font-bold bg-black/80 backdrop-blur-md text-amber-300 px-2.5 py-1 rounded-xl border border-white/20 shadow">
                    {selectedCraft.id}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-xs">
                    <span className="font-extrabold text-white text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] truncate">
                      {selectedCraft.craft}
                    </span>
                    <span className="text-[11px] bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-amber-300 font-bold border border-white/20 shadow">
                      {selectedCraft.time}
                    </span>
                  </div>
                </div>

                {/* Card Info */}
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white line-clamp-1">{selectedCraft.name}</h3>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed font-medium">
                    {selectedCraft.tagline}
                  </p>

                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                      <span>{selectedCraft.location}</span>
                    </div>
                    <span className="text-slate-500 dark:text-slate-400">Master Artisan: <strong className="text-slate-900 dark:text-white font-bold">{selectedCraft.artisan}</strong></span>
                  </div>

                  {/* One-Click Inspect CTA */}
                  <button
                    onClick={() => {
                      if (onVerifyDirect) onVerifyDirect(selectedCraft.id);
                      else setCurrentTab('verify');
                    }}
                    className="mt-3 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Inspect Live Provenance Record</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= DYNAMIC 4-STEP VISUAL FLOW ================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
            Proven Architecture
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white">
            How The Provenance Chain Operates
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            A frictionless workflow built for rural villages, local market bridges, and international customs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          
          {/* Step 1 */}
          <div className="p-5 rounded-3xl glass-panel glass-panel-hover flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-serif font-black text-lg mb-4 group-hover:scale-110 transition-transform">
                01
              </div>
              <h3 className="text-sm font-bold text-white mb-1.5">Master Craft Created</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Rural artisan finishes 16-step hand block Ajrak or Tuk geometric Ralli in Sindh village.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-amber-400 font-semibold">
              Mustard Oil & Natural Indigo
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-5 rounded-3xl glass-panel glass-panel-hover flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 font-serif font-black text-lg mb-4 group-hover:scale-110 transition-transform">
                02
              </div>
              <h3 className="text-sm font-bold text-white mb-1.5">Digital Identity Minted</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                System mints unique Product ID with workshop proof photos. Printable QR tag generated.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-rose-400 font-semibold">
              Tag Cost: &lt; PKR 5 ($0.02)
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-5 rounded-3xl glass-panel glass-panel-hover flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-serif font-black text-lg mb-4 group-hover:scale-110 transition-transform">
                03
              </div>
              <h3 className="text-sm font-bold text-white mb-1.5">Middleman & Custody</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Middleman provides upfront advance cash to artisan and logs custody transfer to port exporter.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-blue-400 font-semibold">
              Transparent Sourcing Bridge
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-5 rounded-3xl glass-panel glass-panel-hover flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-serif font-black text-lg mb-4 group-hover:scale-110 transition-transform">
                04
              </div>
              <h3 className="text-sm font-bold text-white mb-1.5">Public Verification</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Buyer scans QR with phone camera. Provenance opens with zero app download and telemetry monitoring.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-emerald-400 font-semibold">
              Instant Confetti & Verification
            </div>
          </div>

        </div>

      </section>

      {/* ================= INTERACTIVE ANTI-FRAUD SIMULATOR ================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="p-8 md:p-12 rounded-3xl glass-panel border border-slate-700/80 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-widest flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-rose-400" />
                The Core Technical Innovation
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                What Happens If Someone Photocopies A QR Tag?
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Traditional paper certificates can be duplicated with an ordinary photocopier in 5 seconds. CraftTrace solves this with the <strong>Scan Anomaly Sentinel</strong> that analyzes global scan frequencies.
              </p>

              {/* Simulator Tabs */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setActiveFraudTab('genuine')}
                  className={`py-2 px-4 rounded-xl text-xs font-bold transition-all ${
                    activeFraudTab === 'genuine'
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Scenario A: Genuine Craft
                </button>
                <button
                  onClick={() => setActiveFraudTab('counterfeit')}
                  className={`py-2 px-4 rounded-xl text-xs font-bold transition-all ${
                    activeFraudTab === 'counterfeit'
                      ? 'bg-rose-700 text-white shadow-lg shadow-rose-950/50'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Scenario B: Photocopied Clone
                </button>
              </div>

              <p className="text-[11px] text-slate-400 italic pt-1">
                Toggle between scenarios to see how the system protects buyers in real-time.
              </p>
            </div>

            {/* Right Interactive Simulation Display */}
            <div className="lg:col-span-6">
              
              {activeFraudTab === 'genuine' ? (
                /* Genuine Craft Scenario Card */
                <div className="p-6 rounded-2xl bg-slate-950/90 border border-emerald-500/50 shadow-xl glow-verified space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <span className="font-mono text-xs font-bold text-amber-300">AJ-2026-00125</span>
                      <p className="text-[11px] text-slate-400">Single Physical Ajrak Handcrafted in Matiari</p>
                    </div>
                    <StatusBadge status="verified" size="sm" />
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-slate-300">Matiari Hub (Registration)</span>
                      <span className="text-emerald-400 font-mono text-[11px]">Scan 01 • Passed</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-slate-300">Karachi Port (Exporter Audit)</span>
                      <span className="text-emerald-400 font-mono text-[11px]">Scan 02 • Passed</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-slate-300">London Boutique (Buyer Scan)</span>
                      <span className="text-emerald-400 font-mono text-[11px]">Scan 03 • Final Owner</span>
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Normal scan velocity. Verified authentic provenance maintained.</span>
                  </div>
                </div>
              ) : (
                /* Photocopied Counterfeit Scenario Card */
                <div className="p-6 rounded-2xl bg-slate-950/90 border border-rose-500/70 shadow-2xl glow-suspicious space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <span className="font-mono text-xs font-bold text-rose-300">AJ-2026-00404</span>
                      <p className="text-[11px] text-slate-400">1 Physical Tag Photocopied on 50 Roadside Fakes</p>
                    </div>
                    <StatusBadge status="suspicious" size="sm" />
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-rose-950/40 border border-rose-900/50">
                      <span className="text-rose-200">Khairpur, Dubai, London, Karachi</span>
                      <span className="text-rose-400 font-mono font-bold text-[11px]">47 Scans / 36 Hours</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-rose-950/40 border border-rose-900/50">
                      <span className="text-rose-200">Anomaly Engine Analysis</span>
                      <span className="text-rose-400 font-bold text-[11px]">Conflict: Impossible Velocity</span>
                    </div>
                  </div>

                  <div className="p-3 bg-rose-950/80 rounded-xl border border-rose-600/50 text-xs text-rose-200 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-rose-400">
                      <AlertTriangle className="w-4 h-4" />
                      <span>SUSPICIOUS ACTIVITY TRIGGERED</span>
                    </div>
                    <p className="text-[11px] text-rose-300 leading-relaxed">
                      Provenance clearance quarantined. Everyday buyers are warned that this label was duplicated. Counterfeiter cannot sell under false pretenses.
                    </p>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>

      </section>

      {/* ================= 4 STAKEHOLDER PORTALS ================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
            Inclusive Ecosystem
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white">
            Built for Every Participant in the Craft Chain
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            No friction. No mandatory apps. No excluding honest middlemen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Artisan */}
          <div className="p-6 rounded-3xl glass-panel glass-panel-hover flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">Artisans</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Free basic registration. Generates unique QR labels with zero paperwork. Share generational stories directly with global buyers.
              </p>
            </div>
            <button
              onClick={() => setCurrentTab('artisan-dashboard')}
              className="mt-6 pt-3 border-t border-slate-800 text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center justify-between"
            >
              <span>Artisan Portal</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Middleman */}
          <div className="p-6 rounded-3xl glass-panel glass-panel-hover flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">Middlemen</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Recognized as legitimate partners. Log sourced artisan families, track advance cash support, and transfer verified batches to port.
              </p>
            </div>
            <button
              onClick={() => setCurrentTab('middleman-dashboard')}
              className="mt-6 pt-3 border-t border-slate-800 text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center justify-between"
            >
              <span>Middleman Hub</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Exporter */}
          <div className="p-6 rounded-3xl glass-panel glass-panel-hover flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">Exporters</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Generate official Export Provenance Certificates with QR seals to satisfy European luxury customs and fair-trade auditors.
              </p>
            </div>
            <button
              onClick={() => setCurrentTab('exporter-dashboard')}
              className="mt-6 pt-3 border-t border-slate-800 text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center justify-between"
            >
              <span>Exporter Portal</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Buyer */}
          <div className="p-6 rounded-3xl glass-panel glass-panel-hover flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">Everyday Buyers</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Scan with any standard mobile camera. Instant authentic verification, artisan village story, and reporting tool. Zero app download.
              </p>
            </div>
            <button
              onClick={() => setCurrentTab('verify')}
              className="mt-6 pt-3 border-t border-slate-800 text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center justify-between"
            >
              <span>Public Scanner</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </section>

      {/* ================= FINAL PITCH BANNER ================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-10 md:p-14 rounded-3xl bg-gradient-to-br from-rose-950/80 via-slate-900 to-amber-950/70 border border-amber-600/40 shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-white mb-3">
            Protect 4,500 Years of Indus Civilization
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto mb-8 leading-relaxed">
            Test the complete hackathon presentation flow: register a craft, print its physical tag, scan it live, or review the 3-minute pitch playbook.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setCurrentTab('register-product')}
              className="py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              + Register New Craft
            </button>
            <button
              onClick={() => setCurrentTab('pitch-guide')}
              className="py-3 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs border border-slate-700 transition"
            >
              Open 3-Min Pitch Playbook
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
