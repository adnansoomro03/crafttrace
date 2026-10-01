import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Printer, Download, Award, ShieldCheck, CheckCircle2, Globe, Building2, Calendar } from 'lucide-react';

export default function ExportReportModal({ product, isOpen, onClose }) {
  if (!isOpen || !product) return null;

  const verificationUrl = `${window.location.origin}/#verify?id=${product.productId}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl my-8">
        
        {/* Header Controls */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">Export Provenance Dossier & Certificate</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Page */}
        <div className="mt-5 p-6 md:p-8 bg-amber-50/95 text-slate-900 rounded-2xl border-4 border-amber-900/30 shadow-xl print:m-0 print:border-2 font-serif">
          
          {/* Header Seal */}
          <div className="text-center border-b-2 border-amber-900/20 pb-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-900 text-amber-300 font-bold mb-2">
              CT
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold uppercase tracking-widest text-rose-950">
              Certificate of Digital Cultural Provenance
            </h2>
            <p className="text-xs uppercase tracking-wider text-slate-600 font-sans mt-0.5">
              Sindh Traditional Handicrafts Authentication Consortium & Export Registry
            </p>
          </div>

          {/* Certificate Main Body */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
            
            <div className="md:col-span-2 space-y-3.5 text-xs text-slate-800">
              <div className="p-3 bg-white/80 rounded-xl border border-amber-900/10">
                <span className="text-[10px] font-bold uppercase text-slate-500">Official Product Identifier</span>
                <p className="font-mono text-base font-bold text-rose-950">{product.productId}</p>
                <p className="text-xs font-semibold text-slate-700">{product.productName}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-white/80 rounded-xl border border-amber-900/10">
                  <span className="text-[10px] font-bold uppercase text-slate-500">Master Artisan</span>
                  <p className="font-bold text-slate-900">{product.artisanName}</p>
                  <p className="text-[11px] text-slate-600">{product.artisanVillage}</p>
                </div>
                <div className="p-3 bg-white/80 rounded-xl border border-amber-900/10">
                  <span className="text-[10px] font-bold uppercase text-slate-500">Craft Classification</span>
                  <p className="font-bold text-slate-900">{product.craftType}</p>
                  <p className="text-[11px] text-slate-600">{product.technique?.split(' ')[0]} Handmade</p>
                </div>
              </div>

              <div className="p-3 bg-white/80 rounded-xl border border-amber-900/10">
                <span className="text-[10px] font-bold uppercase text-slate-500">Batch & Export Grade</span>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="font-mono font-bold text-slate-800">{product.batchNumber || 'PK-EXP-2026'}</span>
                  <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded text-[11px]">
                    {product.exportGrade || 'Grade-A Museum Heritage'}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-white/80 rounded-xl border border-amber-900/10">
                <span className="text-[10px] font-bold uppercase text-slate-500">Provenance Attestation</span>
                <p className="text-[11px] text-slate-700 leading-relaxed mt-1">
                  This document certifies that this handicraft was produced manually without industrial mechanical duplication. It contains natural vegetable/mineral pigments or hand needlework certified through physical guild audits.
                </p>
              </div>
            </div>

            {/* QR Verification Seal Column */}
            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-amber-900/15 text-center">
              <span className="text-[10px] font-bold text-rose-950 uppercase tracking-wider mb-2">
                Digital Verification
              </span>
              <QRCodeSVG
                value={verificationUrl}
                size={140}
                level="H"
                includeMargin={false}
                fgColor="#16203B"
              />
              <span className="font-mono text-[10px] text-slate-600 font-bold mt-2">
                Scan for Live Chain
              </span>
              <div className="mt-4 pt-3 border-t border-slate-200 w-full text-[10px] text-slate-500">
                <span>Verified by:</span>
                <p className="font-semibold text-slate-800 text-[11px] mt-0.5">
                  {product.verifiedBy || "Sindh Craft Authority"}
                </p>
              </div>
            </div>
          </div>

          {/* Timeline on Certificate */}
          <div className="mt-6 pt-4 border-t border-amber-900/20 font-sans">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Chain of Custody Timeline
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px]">
              {(product.timeline || []).slice(0, 4).map((item, idx) => (
                <div key={idx} className="p-2 bg-white/60 rounded-lg border border-amber-900/10">
                  <span className="font-bold text-slate-900 block">{item.step}</span>
                  <span className="text-[10px] text-slate-500 block">{item.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Signatures */}
          <div className="mt-6 pt-4 border-t-2 border-dashed border-amber-900/20 flex items-center justify-between text-xs font-sans text-slate-600">
            <div>
              <div className="w-32 border-b border-slate-700 mb-1" />
              <p className="text-[10px]">Artisan / Guild Representative</p>
            </div>
            <div className="text-center">
              <ShieldCheck className="w-8 h-8 text-rose-900 mx-auto opacity-70" />
              <p className="text-[9px] uppercase tracking-widest font-bold text-rose-950 mt-1">Official Registry Seal</p>
            </div>
            <div className="text-right">
              <div className="w-32 border-b border-slate-700 mb-1 ml-auto" />
              <p className="text-[10px]">Authorised Export Verifier</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
