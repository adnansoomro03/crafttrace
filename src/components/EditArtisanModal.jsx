import React, { useState, useEffect } from 'react';
import { X, Award, MapPin, Upload, Image as ImageIcon, CheckCircle2, User, Phone, Briefcase } from 'lucide-react';
import { updateArtisanDetails } from '../services/storageService';

const AVATAR_PRESETS = [
  { name: 'Ayesha Bibi', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80' },
  { name: 'Mai Bhagi', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80' },
  { name: 'Gul Mohammad', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
  { name: 'Zarina Baloch', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80' },
  { name: 'Ustad Karim', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' }
];

export default function EditArtisanModal({ artisan, isOpen, onClose, onArtisanUpdated }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    village: '',
    district: '',
    craftType: '',
    experienceYears: 10,
    cooperative: '',
    bio: '',
    avatar: '',
    badge: 'Master Artisan (Grade A)'
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (artisan) {
      setFormData({
        name: artisan.name || '',
        phone: artisan.phone || '+92 300 1234567',
        village: artisan.village || 'Matiari',
        district: artisan.district || 'Matiari',
        craftType: artisan.craftType || 'Ajrak',
        experienceYears: artisan.experienceYears || 15,
        cooperative: artisan.cooperative || 'Matiari Artisans Welfare Cooperative',
        bio: artisan.bio || '',
        avatar: artisan.avatar || AVATAR_PRESETS[0].url,
        badge: artisan.badge || 'Master Artisan (Grade A)'
      });
    }
  }, [artisan, isOpen]);

  if (!isOpen || !artisan) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const updated = updateArtisanDetails(artisan.id, {
      ...formData,
      experienceYears: parseInt(formData.experienceYears, 10)
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      if (onArtisanUpdated) onArtisanUpdated(updated);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 md:p-8 shadow-2xl my-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Edit Artisan Profile</h3>
              <p className="text-xs text-slate-400">Update craft credentials, generational bio & profile portrait</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-3 animate-fadeIn">
            <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto" />
            <h4 className="text-lg font-bold text-white">Profile Updated Successfully!</h4>
            <p className="text-xs text-slate-300">
              Artisan profile for <strong className="text-amber-300">{formData.name}</strong> has been updated across the provenance registry.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            
            {/* Avatar Preview & Upload */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-amber-500/60 shadow-lg flex-shrink-0 bg-slate-900">
                <img
                  src={formData.avatar}
                  alt={formData.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = AVATAR_PRESETS[0].url;
                  }}
                />
              </div>

              <div className="flex-1 space-y-2 text-center sm:text-left">
                <span className="text-xs font-semibold text-slate-200 block">Artisan Profile Portrait</span>
                
                <div className="flex flex-wrap items-center gap-2">
                  <label className="py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 cursor-pointer flex items-center gap-1.5 transition">
                    <Upload className="w-3.5 h-3.5 text-amber-400" />
                    <span>Upload Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  <span className="text-[11px] text-slate-500">or pick preset:</span>
                  <div className="flex items-center gap-1.5">
                    {AVATAR_PRESETS.map((p, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setFormData({ ...formData, avatar: p.url })}
                        className={`w-7 h-7 rounded-lg overflow-hidden border-2 transition ${
                          formData.avatar === p.url ? 'border-amber-400 scale-110' : 'border-slate-700 opacity-60 hover:opacity-100'
                        }`}
                        title={p.name}
                      >
                        <img src={p.url} alt={p.name} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Or enter direct image URL..."
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Master Artisan Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Contact / Phone
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Craft & Experience */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Craft Specialization
                </label>
                <select
                  value={formData.craftType}
                  onChange={(e) => setFormData({ ...formData, craftType: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Ajrak">Traditional Ajrak</option>
                  <option value="Ralli">Hand-Stitched Ralli</option>
                  <option value="Embroidery">Sindhi Hand Embroidery</option>
                  <option value="Block Printing">Hand Block Printing</option>
                  <option value="Pottery">Kashikari Glazed Pottery</option>
                  <option value="Leather Craft">Camel Leather Craft</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Years of Experience
                </label>
                <input
                  type="number"
                  min="1"
                  max="70"
                  value={formData.experienceYears}
                  onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Guild Accreditation
                </label>
                <input
                  type="text"
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Village & Cooperative */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Village & District (Sindh)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Matiari, Sindh"
                  value={formData.village}
                  onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Artisan Guild / Cooperative
                </label>
                <input
                  type="text"
                  value={formData.cooperative}
                  onChange={(e) => setFormData({ ...formData, cooperative: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Bio & Generational Story */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Generational Heritage Bio & Artisan Story
              </label>
              <textarea
                rows="3"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Action buttons */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:brightness-110 text-slate-950 font-bold text-xs shadow-lg transition cursor-pointer"
              >
                Save Artisan Profile
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
