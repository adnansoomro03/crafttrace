import React, { useState, useEffect, useRef } from 'react';
import { 
  X, QrCode, Search, Sparkles, AlertTriangle, ShieldCheck, 
  HelpCircle, ArrowRight, Camera, CameraOff, Upload, RefreshCw, CheckCircle2
} from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';

export default function ScanSimulatorModal({ isOpen, onClose, onVerifyId }) {
  const [manualId, setManualId] = useState('');
  const [isScanningAnim, setIsScanningAnim] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [scannedResult, setScannedResult] = useState('');

  const html5QrCodeRef = useRef(null);
  const scannerContainerId = "crafttrace-qr-reader";

  // Parse ID from URL or raw text
  const extractProductId = (text) => {
    if (!text) return '';
    const trimmed = text.trim();
    
    // If it contains a URL with ?id=
    if (trimmed.includes('?id=')) {
      const match = trimmed.match(/[?&]id=([^&]+)/);
      if (match && match[1]) {
        return decodeURIComponent(match[1]).trim().toUpperCase();
      }
    }
    // If it's a URL ending with /id or similar
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      const parts = trimmed.split('/');
      const lastPart = parts[parts.length - 1];
      if (lastPart && (lastPart.startsWith('AJ-') || lastPart.startsWith('RL-') || lastPart.startsWith('EM-') || lastPart.startsWith('CT-'))) {
        return lastPart.toUpperCase();
      }
    }
    return trimmed.toUpperCase();
  };

  // Start Real Device Camera
  const startCamera = async () => {
    setCameraError('');
    setScannedResult('');
    
    try {
      if (!html5QrCodeRef.current) {
        html5QrCodeRef.current = new Html5Qrcode(scannerContainerId);
      }

      const qrCodeSuccessCallback = (decodedText) => {
        const prodId = extractProductId(decodedText);
        setScannedResult(prodId);
        stopCamera();
        
        // Short delay for visual confirmation before navigating
        setTimeout(() => {
          onClose();
          onVerifyId(prodId);
        }, 600);
      };

      const config = {
        fps: 15,
        qrbox: { width: 220, height: 220 },
        aspectRatio: 1.0
      };

      await html5QrCodeRef.current.start(
        { facingMode: "environment" },
        config,
        qrCodeSuccessCallback,
        () => {
          // ignore frame errors while seeking QR
        }
      );

      setCameraActive(true);
    } catch (err) {
      console.warn("Failed to open camera:", err);
      setCameraActive(false);
      setCameraError(
        err.message?.includes('Permission') 
          ? "Camera permission was denied. Please allow camera permissions in your browser address bar."
          : "Camera not available or already in use by another application. You can use the presets below or upload an image."
      );
    }
  };

  // Stop Camera cleanly
  const stopCamera = async () => {
    if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
      try {
        await html5QrCodeRef.current.stop();
      } catch (err) {
        console.warn("Error stopping scanner:", err);
      }
    }
    setCameraActive(false);
  };

  // Clean up when modal closes
  useEffect(() => {
    if (!isOpen) {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen]);

  // Handle Image File Upload Scan
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setCameraError('');
    try {
      if (!html5QrCodeRef.current) {
        html5QrCodeRef.current = new Html5Qrcode(scannerContainerId);
      }

      // Stop camera if running before scanning image
      if (html5QrCodeRef.current.isScanning) {
        await html5QrCodeRef.current.stop();
        setCameraActive(false);
      }

      const decodedText = await html5QrCodeRef.current.scanFile(file, true);
      const prodId = extractProductId(decodedText);
      setScannedResult(prodId);
      
      setTimeout(() => {
        onClose();
        onVerifyId(prodId);
      }, 500);
    } catch (err) {
      console.error(err);
      setCameraError("No readable QR code found in this image. Please try another image or use demo presets.");
    }
  };

  // Quick Preset trigger
  const handleSimulateScan = (id) => {
    stopCamera();
    setIsScanningAnim(true);
    setTimeout(() => {
      setIsScanningAnim(false);
      onClose();
      onVerifyId(id);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!manualId.trim()) return;
    handleSimulateScan(manualId.trim().toUpperCase());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden my-6">
        
        {/* Decorative corner glows */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-44 h-44 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Live Camera QR Scanner</h3>
              <p className="text-xs text-slate-400">Scan physical craft tag with your mobile camera or webcam</p>
            </div>
          </div>
          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CAMERA VIEWFINDER CONTAINER */}
        <div className="mt-5 relative w-full rounded-2xl border-2 border-slate-800 bg-slate-950 overflow-hidden min-h-[240px] flex flex-col items-center justify-center">
          
          {/* HTML5 QR Container for Video Feed */}
          <div 
            id={scannerContainerId} 
            className={`w-full overflow-hidden ${cameraActive ? 'block' : 'hidden'}`}
          />

          {/* When Camera is OFF / Simulated State */}
          {!cameraActive && (
            <div className="p-6 text-center space-y-3 flex flex-col items-center justify-center w-full">
              {/* Reticle Viewfinder Corners */}
              <div className="relative w-44 h-44 border border-dashed border-slate-700 rounded-2xl flex flex-col items-center justify-center bg-slate-900/40">
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-400" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-400" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-400" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-400" />

                {isScanningAnim ? (
                  <div className="text-center space-y-2">
                    <span className="w-8 h-8 rounded-full border-2 border-amber-400 border-t-transparent animate-spin inline-block" />
                    <p className="text-[11px] font-mono text-amber-300">DECODING HASH...</p>
                  </div>
                ) : (
                  <div className="text-center space-y-2">
                    <Camera className="w-10 h-10 text-slate-600 mx-auto" />
                    <span className="text-[11px] text-slate-400 font-mono block">CAMERA READY</span>
                  </div>
                )}
              </div>

              {/* Camera Activation Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={startCamera}
                  className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 mx-auto transition-transform hover:scale-105"
                >
                  <Camera className="w-4 h-4" />
                  <span>Start Device Camera</span>
                </button>
              </div>
            </div>
          )}

          {/* When Camera is ACTIVE */}
          {cameraActive && (
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800 text-xs">
              <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Point camera at physical craft QR tag
              </span>
              <button
                type="button"
                onClick={stopCamera}
                className="py-1 px-2.5 rounded-lg bg-rose-900/80 hover:bg-rose-800 text-rose-200 text-[11px] font-bold"
              >
                Stop Camera
              </button>
            </div>
          )}

          {/* Scanned Success Confirmation Overlay */}
          {scannedResult && (
            <div className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center p-4 text-center animate-fadeIn z-20">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mb-2" />
              <h4 className="text-base font-bold text-white">QR Code Recognized!</h4>
              <p className="font-mono text-sm font-bold text-amber-300 mt-1">{scannedResult}</p>
              <p className="text-xs text-slate-400 mt-2">Loading verified provenance dossier...</p>
            </div>
          )}

        </div>

        {/* Error notification if camera permission rejected */}
        {cameraError && (
          <div className="mt-3 p-3 rounded-xl bg-rose-950/70 border border-rose-800/60 text-rose-300 text-xs flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">{cameraError}</p>
          </div>
        )}

        {/* Alternate Option: Scan QR Image File */}
        <div className="mt-4 flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
          <div className="text-xs text-slate-300">
            <span className="font-semibold block">Or Scan From Photo / Screenshot:</span>
            <span className="text-[11px] text-slate-500">Upload any saved image file of a QR tag</span>
          </div>
          <label className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 cursor-pointer transition flex items-center gap-1.5">
            <Upload className="w-3.5 h-3.5 text-amber-400" />
            <span>Upload QR</span>
            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>

        {/* Quick Demo Selector for Judges */}
        <div className="mt-5">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Hackathon One-Click Demo Presets:
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={() => handleSimulateScan('AJ-2026-00125')}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-emerald-500/30 hover:border-emerald-500/60 transition group text-left"
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-white font-mono">AJ-2026-00125</span>
                </div>
                <p className="text-[11px] text-emerald-300/80 mt-0.5">Genuine Ajrak (Verified)</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition" />
            </button>

            <button
              onClick={() => handleSimulateScan('RL-2026-00126')}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-emerald-500/30 hover:border-emerald-500/60 transition group text-left"
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-white font-mono">RL-2026-00126</span>
                </div>
                <p className="text-[11px] text-emerald-300/80 mt-0.5">Genuine Ralli (Verified)</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition" />
            </button>

            <button
              onClick={() => handleSimulateScan('AJ-2026-00404')}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-rose-500/30 hover:border-rose-500/60 transition group text-left"
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span className="text-xs font-bold text-white font-mono">AJ-2026-00404</span>
                </div>
                <p className="text-[11px] text-rose-300/80 mt-0.5">Suspicious (47 scans flag)</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-rose-400 group-hover:translate-x-0.5 transition" />
            </button>

            <button
              onClick={() => handleSimulateScan('FAKE-999')}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-amber-500/30 hover:border-amber-500/60 transition group text-left"
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-white font-mono">FAKE-999</span>
                </div>
                <p className="text-[11px] text-amber-300/80 mt-0.5">Unregistered / Unknown</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition" />
            </button>
          </div>
        </div>

        {/* Manual Input Form */}
        <form onSubmit={handleSubmit} className="mt-4 pt-4 border-t border-slate-800">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Or type Product ID (e.g. AJ-2026-00125)..."
                value={manualId}
                onChange={(e) => setManualId(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition flex items-center gap-1"
            >
              Inspect
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
