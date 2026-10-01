import React, { useState } from 'react';
import { X, Globe, Award, Building2, MapPin, CheckCircle2 } from 'lucide-react';
import { registerNewExporter } from '../services/storageService';

export default function AddExporterModal({ isOpen, onClose, onExporterAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    country: 'Pakistan & Overseas',
    headquarters: 'Karachi Port Trust Complex, Karachi',
    exportDestinations: 'London UK, Milan Italy, Dubai UAE, Tokyo Japan',
    annualShipments: '75',
    verified: true
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.company.trim()) return;

    const newExp = registerNewExporter({
      ...formData,
      exportDestinations: formData.exportDestinations.split(',').map(s => s.trim())
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      if (onExporterAdded) onExporterAdded(newExp);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl p-6 md:p-8 shadow-2xl my-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Register Export Partner</h3>
              <p className="text-xs text-slate-400">Enroll accredited port exporter for international trade clearance</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-3 animate-fadeIn">
            <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto" />
            <h4 className="text-lg font-bold text-white">Export Partner Accredited!</h4>
            <p className="text-xs text-slate-300">
              <strong className="text-purple-300">{formData.company}</strong> is now licensed to issue Export Provenance Certificates.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Representative Name */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Director / Officer *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zeeshan Ali or Imran Memon"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Company Name */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Export Firm Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sindh Heritage Global Exports Ltd."
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Headquarters / Port */}
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Terminal / Headquarters *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Karachi Port Trust Complex, Karachi"
                  value={formData.headquarters}
                  onChange={(e) => setFormData({ ...formData, headquarters: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Destinations */}
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Key Overseas Destinations (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="London UK, Milan Italy, Dubai UAE, Tokyo Japan"
                  value={formData.exportDestinations}
                  onChange={(e) => setFormData({ ...formData, exportDestinations: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Annual Shipments */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Annual Consignments
                </label>
                <input
                  type="number"
                  placeholder="e.g. 100"
                  value={formData.annualShipments}
                  onChange={(e) => setFormData({ ...formData, annualShipments: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 hover:brightness-110 text-white text-xs font-bold uppercase tracking-wider shadow-lg transition-transform hover:-translate-y-0.5"
              >
                Register Exporter
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
