import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Download, Printer, ExternalLink, ShieldCheck, Check, Sparkles } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function QRCodeModal({ product, isOpen, onClose, onOpenPublicPage }) {
  if (!isOpen || !product) return null;

  const verificationUrl = `${window.location.origin}/#verify?id=${product.productId}`;
  const qrRef = useRef(null);

  const handleDownload = () => {
    // Generate high resolution SVG/PNG download
    const svgElement = qrRef.current.querySelector('svg');
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    canvas.width = 1000;
    canvas.height = 1000;

    img.onload = () => {
      // White background for scannability
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 100, 100, 800, 800);
      
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `CraftTrace-QR-${product.productId}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden">
        {/* Subtle decorative motif background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-900/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-900/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-800 to-amber-700 flex items-center justify-center shadow">
              <ShieldCheck className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">Official Provenance Tag</h3>
              <p className="text-xs text-slate-400">CraftTrace Digital Identity Seal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Artisan Label Container */}
        <div className="mt-5 p-5 bg-white text-slate-900 rounded-2xl border-4 border-amber-600/30 shadow-inner flex flex-col items-center print:border-2">
          {/* Header on Physical Tag */}
          <div className="w-full flex items-center justify-between border-b-2 border-slate-200 pb-2 mb-3">
            <span className="font-extrabold tracking-widest text-[11px] text-rose-900 uppercase font-serif">
              CRAFTTRACE™ VERIFIED
            </span>
            <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
              SINDH HERITAGE
            </span>
          </div>

          {/* QR Render */}
          <div ref={qrRef} className="p-3 bg-white rounded-xl shadow-sm border border-slate-200">
            <QRCodeSVG
              value={verificationUrl}
              size={180}
              level="H"
              includeMargin={false}
              fgColor="#16203B"
            />
          </div>

          {/* Tag Metadata */}
          <div className="mt-3 text-center w-full">
            <div className="font-mono font-bold text-sm tracking-widest text-slate-950">
              {product.productId}
            </div>
            <p className="text-xs font-semibold text-slate-700 mt-0.5">{product.productName}</p>
            <div className="mt-1 flex items-center justify-center gap-2 text-[11px] text-slate-500">
              <span>Artisan: <strong>{product.artisanName}</strong></span>
              <span>•</span>
              <span>{product.origin?.split(',')[0]}</span>
            </div>
          </div>

          <div className="mt-3 w-full pt-2 border-t border-dashed border-slate-300 text-center">
            <p className="text-[10px] text-slate-500 font-medium">
              Scan with any mobile camera to inspect complete verified provenance & making records
            </p>
          </div>
        </div>

        {/* Status indicator */}
        <div className="mt-4 flex items-center justify-between text-xs text-slate-300 bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
          <span>Current Status:</span>
          <StatusBadge status={product.status} size="sm" />
        </div>

        {/* Action Buttons */}
        <div className="mt-5 grid grid-cols-2 gap-2.5">
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition border border-slate-700"
          >
            <Download className="w-4 h-4 text-amber-400" />
            Download PNG
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition border border-slate-700"
          >
            <Printer className="w-4 h-4 text-emerald-400" />
            Print Label
          </button>
        </div>

        <button
          onClick={() => {
            onClose();
            onOpenPublicPage(product.productId);
          }}
          className="mt-2.5 w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-rose-800 via-rose-700 to-amber-700 hover:brightness-110 text-white font-semibold text-xs md:text-sm shadow-lg transition"
        >
          <ExternalLink className="w-4 h-4" />
          Open Public Verification Page
        </button>
      </div>
    </div>
  );
}
