import React from 'react';
import { QrCode, Eye, MapPin, Clock, Calendar, CheckCircle2, AlertTriangle, ArrowRight, Camera, Edit3 } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function ProductCard({ product, onOpenQR, onViewDetails, onVerifyDirect, onEditProduct }) {
  return (
    <div className="group relative rounded-3xl glass-panel glass-panel-hover overflow-hidden shadow-xl flex flex-col justify-between">
      {/* Product Image with status overlay */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-950">
        <img
          src={product.image}
          alt={product.productName}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

        <div className="absolute top-3 left-3 z-10">
          <StatusBadge status={product.status} size="sm" />
        </div>

        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-20">
          {onEditProduct && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEditProduct(product);
              }}
              className="p-1.5 rounded-xl bg-slate-900/90 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-slate-700/80 shadow-md transition cursor-pointer"
              title="Change Craft Photo & Edit"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          )}
          <span className="font-mono text-[11px] font-bold bg-slate-950/90 backdrop-blur-md text-amber-300 px-2.5 py-1 rounded-xl border border-slate-700/80 shadow-md">
            {product.productId}
          </span>
        </div>

        {/* Hover quick details overlay button */}
        <button
          onClick={() => onViewDetails(product)}
          className="absolute inset-0 flex items-center justify-center bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]"
        >
          <span className="py-1.5 px-3 rounded-full bg-slate-900/90 text-amber-300 text-xs font-bold border border-amber-500/40 shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <Eye className="w-3.5 h-3.5" />
            Inspect Dossier
          </span>
        </button>

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300 z-10">
          <span className="font-semibold text-white drop-shadow truncate">{product.craftType}</span>
          <span className="text-[11px] bg-slate-900/90 px-2.5 py-0.5 rounded-full text-amber-300 font-mono border border-slate-800">
            {product.scansCount || 0} scans
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
            {product.productName}
          </h4>
          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-3.5 pt-3 border-t border-slate-800/80 space-y-1.5 text-[11px] text-slate-400">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Artisan:</span>
              <strong className="text-slate-200 font-semibold">{product.artisanName}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium flex items-center gap-1">
                <MapPin className="w-3 h-3 text-rose-400" /> Origin:
              </span>
              <span className="text-slate-300 truncate max-w-[160px]">{product.origin}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-400" /> Production:
              </span>
              <span className="text-amber-300 font-medium">{product.productionTime || "14-21 Days"}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2">
          {onEditProduct && (
            <button
              onClick={() => onEditProduct(product)}
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-amber-400 text-xs font-semibold transition border border-slate-700 cursor-pointer"
              title="Change Picture & Edit Craft"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={() => onOpenQR(product)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 text-xs font-semibold transition border border-slate-700/70 hover:border-amber-500/40 cursor-pointer"
          >
            <QrCode className="w-3.5 h-3.5 text-amber-400" />
            <span>QR Label</span>
          </button>
          <button
            onClick={() => onVerifyDirect(product.productId)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-gradient-to-r from-rose-800 to-amber-700 hover:brightness-110 text-white text-xs font-semibold transition shadow hover:shadow-rose-950/60 cursor-pointer"
          >
            <span>Verify</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
