import React, { useState } from 'react';
import { X, UserPlus, Sparkles, MapPin, Award, Phone, CheckCircle2, Upload } from 'lucide-react';
import { registerNewArtisan } from '../services/storageService';

export default function AddArtisanModal({ isOpen, onClose, onArtisanAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    village: 'Matiari',
    district: 'Matiari',
    craftType: 'Ajrak',
    experienceYears: '18',
    phone: '+92 300 ',
    cooperative: 'Sindh Indigenous Craft Guild',
    bio: '',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    verified: true
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const avatarPresets = [
    { label: 'Artisan 1', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80' },
    { label: 'Artisan 2', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80' },
    { label: 'Artisan 3', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80' },
    { label: 'Master Craftsman', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const newArtisan = registerNewArtisan({
      ...formData,
      bio: formData.bio || `Master ${formData.craftType} artisan carrying generational lineage in ${formData.village}, Sindh.`
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      if (onArtisanAdded) onArtisanAdded(newArtisan);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl p-6 md:p-8 shadow-2xl my-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Onboard New Master Artisan</h3>
              <p className="text-xs text-slate-400">Register master craftsman into the Sindh Guild Registry</p>
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
            <h4 className="text-lg font-bold text-white">Artisan Successfully Accredited!</h4>
            <p className="text-xs text-slate-300">
              <strong className="text-amber-300">{formData.name}</strong> has been enrolled into the verified Guild Registry.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Full Name */}
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Artisan Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mai Fatima Soomro or Ghulam Hussain"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Craft Type */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Primary Craft *
                </label>
                <select
                  value={formData.craftType}
                  onChange={(e) => setFormData({ ...formData, craftType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Ajrak">Ajrak (Hand Block Print)</option>
                  <option value="Ralli">Ralli (Quilt Patchwork)</option>
                  <option value="Sindhi Embroidery">Sindhi Embroidery (Sheesha / Hurmitch)</option>
                  <option value="Block Printing">Block Printing (Wooden Block)</option>
                  <option value="Other">Other Traditional Sindh Craft</option>
                </select>
              </div>

              {/* Experience */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Years of Generational Practice
                </label>
                <input
                  type="number"
                  placeholder="e.g. 20"
                  value={formData.experienceYears}
                  onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Village */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Village / Craft Cluster *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Matiari, Bhit Shah, Garelo, Mithi"
                  value={formData.village}
                  onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* District */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  District (Sindh) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Matiari, Larkana, Tharparkar"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Phone */}
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Contact Phone / WhatsApp
                </label>
                <input
                  type="text"
                  placeholder="+92 300 1234567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Avatar Selection */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Profile Avatar Preset
              </label>
              <div className="flex items-center gap-3">
                <img
                  src={formData.avatar}
                  alt="Selected"
                  className="w-12 h-12 rounded-xl object-cover border-2 border-amber-500/60 shadow"
                />
                <div className="flex gap-2">
                  {avatarPresets.map((p, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setFormData({ ...formData, avatar: p.url })}
                      className={`w-10 h-10 rounded-xl overflow-hidden border transition ${
                        formData.avatar === p.url ? 'border-amber-400 scale-105' : 'border-slate-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={p.url} alt={p.label} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Generational Bio */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Generational Heritage & Skill Story
              </label>
              <textarea
                rows={2}
                placeholder="e.g. 4th generation artisan preserving 16-step natural indigo and alizarin hand-block Ajrak craft..."
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
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
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold uppercase tracking-wider shadow-lg transition-transform hover:-translate-y-0.5"
              >
                Accredit Artisan
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
