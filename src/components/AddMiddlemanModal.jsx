import React, { useState } from 'react';
import { X, Truck, HeartHandshake, MapPin, DollarSign, Phone, CheckCircle2 } from 'lucide-react';
import { registerNewMiddleman } from '../services/storageService';

export default function AddMiddlemanModal({ isOpen, onClose, onMiddlemanAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    hubLocation: 'Hyderabad, Sindh',
    phone: '+92 321 ',
    artisansSupported: '8',
    advancePaymentsIssued: 'PKR 350,000',
    roleDescription: 'Provides upfront advance payments to sustain rural artisan households and coordinates consignment logistics to port exporters.',
    verified: true
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.businessName.trim()) return;

    const newMid = registerNewMiddleman(formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      if (onMiddlemanAdded) onMiddlemanAdded(newMid);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl p-6 md:p-8 shadow-2xl my-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Onboard Sourcing Partner (Middleman)</h3>
              <p className="text-xs text-slate-400">Register a legitimate rural logistics and advance cash partner</p>
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
            <h4 className="text-lg font-bold text-white">Sourcing Partner Registered!</h4>
            <p className="text-xs text-slate-300">
              <strong className="text-blue-300">{formData.businessName}</strong> has been enrolled as an accredited supply chain bridge.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Partner Name */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Representative Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tariq Khan or Mansoor Ali"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Business Name */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Agency / Logistics Entity *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Indus Craft Logistics Bridge"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Hub Location */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Hub Location *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hyderabad, Sindh"
                  value={formData.hubLocation}
                  onChange={(e) => setFormData({ ...formData, hubLocation: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Contact Phone */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Contact Phone / WhatsApp
                </label>
                <input
                  type="text"
                  placeholder="+92 321 1234567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Artisans Supported */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Artisan Households Supported
                </label>
                <input
                  type="number"
                  placeholder="e.g. 10"
                  value={formData.artisansSupported}
                  onChange={(e) => setFormData({ ...formData, artisansSupported: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Advance Cash Pool */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Advance Payments Pool
                </label>
                <input
                  type="text"
                  placeholder="e.g. PKR 350,000"
                  value={formData.advancePaymentsIssued}
                  onChange={(e) => setFormData({ ...formData, advancePaymentsIssued: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Logistics & Supply-Chain Role Description
              </label>
              <textarea
                rows={2}
                value={formData.roleDescription}
                onChange={(e) => setFormData({ ...formData, roleDescription: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
              />
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
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg transition-transform hover:-translate-y-0.5"
              >
                Onboard Sourcing Partner
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
