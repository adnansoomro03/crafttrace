import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, AlertTriangle, HelpCircle, CheckCircle2, 
  MapPin, Calendar, Clock, QrCode, Search, Share2, 
  Flag, PhoneCall, Sparkles, History, Eye, ArrowRight, Check
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { getProductById, recordProductScan, getProducts } from '../services/storageService';

export default function PublicVerificationPage({ 
  initialProductId = 'AJ-2026-00125', 
  onViewStory, 
  onOpenScanModal 
}) {
  const [searchId, setSearchId] = useState(initialProductId);
  const [activeProduct, setActiveProduct] = useState(null);
  const [isSearched, setIsSearched] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [reportComment, setReportComment] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  const handleLookup = (idToLookup, triggerConfetti = true) => {
    if (!idToLookup) return;
    const cleanId = idToLookup.trim().toUpperCase();
    setSearchId(cleanId);
    setIsSearched(true);

    const found = getProductById(cleanId);
    
    if (found) {
      // Record scan in provenance history
      const updated = recordProductScan(cleanId, {
        location: "Buyer Mobile Terminal",
        city: "Karachi",
        device: typeof navigator !== 'undefined' && navigator.userAgent.includes('Mobile') ? "Mobile Camera" : "Web Inspector"
      });

      setActiveProduct(updated || found);

      // Trigger celebratory confetti on verified authentic craft!
      if (found.status === 'verified' && triggerConfetti) {
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#c99700', '#15803d', '#8b1e2d']
          });
        } catch {
          // ignore if canvas not supported
        }
      }
    } else {
      setActiveProduct(null);
    }
  };

  // Load product and record verification scan
  useEffect(() => {
    if (initialProductId) {
      handleLookup(initialProductId, false);
    }
  }, [initialProductId]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    setReportSubmitted(true);
    setTimeout(() => {
      setReportModalOpen(false);
      setReportSubmitted(false);
      setReportComment('');
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-8 animate-fadeIn">
      
      {/* Search & Inspector Bar */}
      <div className="p-4 md:p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              CraftTrace Public Authentication
            </h2>
            <p className="text-xs text-slate-400">
              Zero login required. Instant digital provenance check for buyers & collectors.
            </p>
          </div>

          <button
            onClick={onOpenScanModal}
            className="flex items-center gap-2 py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs uppercase tracking-wider border border-slate-700 transition"
          >
            <QrCode className="w-4 h-4" />
            Switch Demo ID
          </button>
        </div>

        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleLookup(searchId);
          }}
          className="flex gap-2"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Enter Craft ID (e.g. AJ-2026-00125)..."
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono font-semibold"
            />
          </div>
          <button
            type="submit"
            className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-rose-800 to-amber-700 hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider shadow transition"
          >
            Verify
          </button>
        </form>

        {/* Quick Demo ID chips */}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 text-[11px]">Quick test presets:</span>
          <button
            type="button"
            onClick={() => handleLookup('AJ-2026-00125')}
            className="px-2.5 py-1 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-400 border border-emerald-800/50 font-mono text-[11px]"
          >
            AJ-2026-00125 (Verified)
          </button>
          <button
            type="button"
            onClick={() => handleLookup('AJ-2026-00404')}
            className="px-2.5 py-1 rounded-lg bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-800/50 font-mono text-[11px]"
          >
            AJ-2026-00404 (Suspicious)
          </button>
          <button
            type="button"
            onClick={() => handleLookup('FAKE-999')}
            className="px-2.5 py-1 rounded-lg bg-amber-950/60 hover:bg-amber-900/60 text-amber-300 border border-amber-800/50 font-mono text-[11px]"
          >
            FAKE-999 (Unverified)
          </button>
        </div>
      </div>

      {/* VERIFICATION RESULT STATE */}
      {activeProduct ? (
        <div className="space-y-6">
          
          {/* Main Verification Dossier Card */}
          <div className={`p-6 md:p-8 rounded-3xl bg-slate-900 border ${
            activeProduct.status === 'verified'
              ? 'border-emerald-500/50 shadow-2xl glow-verified'
              : activeProduct.status === 'suspicious'
              ? 'border-rose-500/60 shadow-2xl glow-suspicious'
              : 'border-amber-500/50'
          }`}>
            
            {/* Top Status Banner */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                  Authenticity Status
                </span>
                <StatusBadge status={activeProduct.status} size="lg" showSubtext />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Copied' : 'Share'}</span>
                </button>
                <button
                  onClick={() => setReportModalOpen(true)}
                  className="flex items-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-400 text-xs font-semibold border border-slate-700 transition"
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>Report</span>
                </button>
              </div>
            </div>

            {/* SUSPICIOUS WARNING BANNER (If suspicious) */}
            {activeProduct.status === 'suspicious' && (
              <div className="mt-6 p-5 rounded-2xl bg-rose-950/80 border border-rose-600/60 text-rose-200 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <AlertTriangle className="w-5 h-5 animate-pulse" />
                  <span>Unusual Scanning Activity Detected</span>
                </div>
                <p className="text-xs leading-relaxed text-rose-200/90 font-medium">
                  {activeProduct.suspiciousReason || 
                    "This product identity is registered, but unusual scanning activity has been detected. The physical QR code or label may have been copied, photographed, or reused on unauthorized copies."
                  }
                </p>
                <p className="text-[11px] text-rose-300/80 italic">
                  Note: This does not definitively prove the physical fabric is fake, but indicates high risk of label duplication. Ask the seller for the original Artisan Guild certification or report this stall.
                </p>
              </div>
            )}

            {/* Interactive Dossier Tabs Bar */}
            <div className="mt-6 flex items-center gap-2 border-b border-slate-800 pb-3">
              <button
                type="button"
                onClick={() => setReportComment(prev => prev)} // keep state reactive
                className="py-1.5 px-3 rounded-xl bg-slate-800 text-amber-300 font-bold text-xs border border-slate-700"
              >
                Provenance Overview
              </button>
              {activeProduct.processImages && activeProduct.processImages.length > 0 && (
                <span className="text-xs text-slate-400 font-semibold px-2">
                  • {activeProduct.processImages.length} Workshop Proof Photos Available
                </span>
              )}
            </div>

            {/* PRODUCT CORE DETAILS GRID */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Product Visual with Zoom & Badge */}
              <div className="md:col-span-1 rounded-3xl overflow-hidden border border-slate-700/80 bg-slate-950 relative group">
                <img
                  src={activeProduct.image}
                  alt={activeProduct.productName}
                  className="w-full h-72 md:h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                
                <div className="absolute bottom-3 left-3 right-3 text-[11px] text-amber-300 font-mono bg-slate-950/90 backdrop-blur-md p-2 rounded-xl border border-slate-800 flex items-center justify-between">
                  <span>Batch: {activeProduct.batchNumber || 'PK-2026-SEP'}</span>
                  <span>{activeProduct.exportGrade || 'Grade-A Museum'}</span>
                </div>
              </div>

              {/* Data Specifications */}
              <div className="md:col-span-2 space-y-4">
                
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold bg-slate-800 text-amber-300 px-3 py-1 rounded-xl border border-slate-700">
                      {activeProduct.productId}
                    </span>
                    <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      Live Verified in Sentinel Registry
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mt-2">
                    {activeProduct.productName}
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800">
                    <span className="text-slate-500 text-[10px] block uppercase font-bold">Craft Classification</span>
                    <strong className="text-white mt-0.5 block">{activeProduct.craftType}</strong>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800">
                    <span className="text-slate-500 text-[10px] block uppercase font-bold">Technique</span>
                    <strong className="text-amber-300 mt-0.5 block truncate">{activeProduct.technique}</strong>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800">
                    <span className="text-slate-500 text-[10px] block uppercase font-bold">Master Artisan</span>
                    <strong className="text-white mt-0.5 block">{activeProduct.artisanName}</strong>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800">
                    <span className="text-slate-500 text-[10px] block uppercase font-bold">Origin</span>
                    <div className="flex items-center gap-1 text-slate-300 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      <span className="truncate">{activeProduct.origin}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800">
                    <span className="text-slate-500 text-[10px] block uppercase font-bold">Created</span>
                    <div className="flex items-center gap-1 text-slate-300 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{activeProduct.productionDate}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800">
                    <span className="text-slate-500 text-[10px] block uppercase font-bold">Total Scans Recorded</span>
                    <div className="flex items-center gap-1 text-slate-300 mt-0.5">
                      <Eye className="w-3.5 h-3.5 text-amber-400" />
                      <span className="font-bold text-white font-mono">{activeProduct.scansCount || 1} Scans</span>
                    </div>
                  </div>
                </div>

                {/* WHY IS THIS PRODUCT VERIFIED / EXPLANATION */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 shadow-inner">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Why Is This Product Verified?
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Registered with Sindh Craft Guild</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Unique Tamper-Monitored ID</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Photographic workshop records on file</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Scan frequency within normal baseline</span>
                    </div>
                  </div>
                </div>

                {/* Process Proof Gallery */}
                {activeProduct.processImages && activeProduct.processImages.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Photographic Process Proof
                    </span>
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {activeProduct.processImages.map((img, i) => (
                        <div key={i} className="w-20 h-16 rounded-xl overflow-hidden border border-slate-800 flex-shrink-0 bg-slate-950">
                          <img src={img} alt={`Process ${i+1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* View Craft Story CTA */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onViewStory(activeProduct.craftType?.toLowerCase() || 'ajrak')}
                    className="flex items-center gap-2 py-3 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>View Craft & Generational Story</span>
                  </button>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Verified by {activeProduct.verifiedBy || "Sindh Craft Guild"}
                  </span>
                </div>

              </div>

            </div>

            {/* SCAN AUDIT LOG */}
            <div className="mt-8 pt-6 border-t border-slate-800">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-3">
                <History className="w-4 h-4 text-slate-400" />
                Recent Scan & Custody Locations
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                {(activeProduct.scans || []).slice(0, 4).map((scan, i) => (
                  <div key={i} className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-200">{scan.city || scan.location}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        scan.result === 'Flagged' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      }`}>
                        {scan.result || 'Verified'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">{scan.timestamp}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      ) : isSearched ? (
        /* UNVERIFIED / UNKNOWN PRODUCT STATE */
        <div className="p-8 md:p-12 rounded-3xl bg-slate-900 border border-amber-500/50 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
            <HelpCircle className="w-8 h-8" />
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-white">
            ⚠ UNVERIFIED PRODUCT
          </h3>

          <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            The Product ID <strong className="font-mono text-amber-300">{searchId}</strong> was not found in the CraftTrace authentic registry.
          </p>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-400 max-w-lg mx-auto text-left space-y-1.5">
            <p className="font-semibold text-slate-200">Recommended Buyer Action:</p>
            <p>• Do not rely on physical handwritten labels or paper certificates alone.</p>
            <p>• Ask the stallholder or seller to present their authorized Guild registration.</p>
            <p>• If this was sold as authentic certified Sindhi handmade craft, report the stall below.</p>
          </div>

          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => setReportModalOpen(true)}
              className="py-2.5 px-6 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition"
            >
              Report Unverified Stall
            </button>
            <button
              onClick={() => handleLookup('AJ-2026-00125')}
              className="py-2.5 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition"
            >
              View Genuine Example
            </button>
          </div>
        </div>
      ) : null}

      {/* REPORT FRAUD MODAL */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Flag className="w-4 h-4 text-rose-400" />
              Report Stall / Counterfeit Activity
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Your anonymous report alerts the Sindh Traditional Handicrafts Guild and port inspectors.
            </p>

            {reportSubmitted ? (
              <div className="p-4 my-4 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-emerald-300 text-xs text-center font-bold">
                ✓ Report logged. Inspectors notified. Thank you for protecting honest artisans!
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="mt-4 space-y-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Stall or Seller Location</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Zainab Market Karachi / Roadside stall..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Observation Details</label>
                  <textarea
                    rows={3}
                    value={reportComment}
                    onChange={(e) => setReportComment(e.target.value)}
                    placeholder="e.g. Machine print with identical tag, chemical dye smell, price PKR 1200..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setReportModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-slate-300 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-rose-700 hover:bg-rose-600 text-xs text-white font-bold"
                  >
                    Submit Report
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
