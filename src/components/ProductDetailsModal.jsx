import React from 'react';
import { X, MapPin, Calendar, Clock, Sparkles, Award, ShieldCheck, CheckCircle2, History, QrCode, Camera } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function ProductDetailsModal({ product, isOpen, onClose, onOpenQR, onEditProduct }) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-800 to-amber-700 flex items-center justify-center text-white font-bold shadow">
              CT
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">{product.productName}</h3>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                  {product.productId}
                </span>
              </div>
              <p className="text-xs text-slate-400">Provenance Dossier & Craftsmanship Record</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="mt-6 space-y-6">
          
          {/* Main Visual and Key Specs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
              <img
                src={product.image}
                alt={product.productName}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between">
                <StatusBadge status={product.status} size="sm" showSubtext />
                <div className="flex items-center gap-2">
                  {onEditProduct && (
                    <button
                      onClick={() => {
                        onClose();
                        onEditProduct(product);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold transition cursor-pointer border border-slate-700"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      Edit Photo
                    </button>
                  )}
                  <button
                    onClick={() => {
                      onClose();
                      onOpenQR(product);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition cursor-pointer"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    QR Tag
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Artisan & Origin</span>
                <p className="text-sm font-bold text-white mt-0.5">{product.artisanName}</p>
                <div className="flex items-center gap-1 text-slate-300 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span>{product.origin}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Craft Technique & Materials</span>
                <p className="text-xs font-semibold text-amber-300 mt-0.5">{product.technique}</p>
                <p className="text-[11px] text-slate-300 mt-1">{product.materials || "Natural vegetable indigo, organic handloom cotton"}</p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Production Time</span>
                  <div className="flex items-center gap-1 text-slate-200 font-semibold mt-0.5">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>{product.productionTime || "21 Days"}</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Creation Period</span>
                  <div className="flex items-center gap-1 text-slate-200 font-semibold mt-0.5">
                    <Calendar className="w-3 h-3 text-emerald-400" />
                    <span>{product.productionDate || "September 2026"}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 block">Estimated Artisan Value</span>
                  <span className="text-xs font-bold text-emerald-400">{product.priceEstimate || "PKR 14,500"}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block">Verification Authority</span>
                  <span className="text-[11px] font-semibold text-slate-300">{product.verifiedBy || "Sindh Craft Guild"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Craft Story */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-950/30 to-amber-950/20 border border-rose-900/30">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              The Craft & Generational Story
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {product.craftStory}
            </p>
          </div>

          {/* Photographic Evidence of Making Process */}
          {product.processImages && product.processImages.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
                Photographic Process & Workshop Proof
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {product.processImages.map((imgUrl, i) => (
                  <div key={i} className="h-24 rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                    <img src={imgUrl} alt={`Process ${i+1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Provenance Timeline */}
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 mb-3">
              <History className="w-3.5 h-3.5 text-slate-400" />
              Chain of Custody & Scan History
            </h4>
            <div className="space-y-2">
              {(product.timeline || []).map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-800/40 border border-slate-800 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-200">{step.step}</span>
                      <span className="text-[11px] font-mono text-slate-400">{step.date}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
