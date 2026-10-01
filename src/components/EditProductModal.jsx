import React, { useState, useEffect } from 'react';
import { X, Image as ImageIcon, Upload, CheckCircle2, Sparkles, Tag, Clock, MapPin, DollarSign, Camera } from 'lucide-react';
import { updateProduct } from '../services/storageService';

const SINDHI_CRAFT_PRESETS = [
  {
    title: 'Matiari Indigo Ajrak',
    url: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Geometric Ralli Quilt',
    url: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Tharparkar Embroidery',
    url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Kashikari Glazed Pottery',
    url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Block Printed Cotton',
    url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Sindhi Leather Craft',
    url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80'
  }
];

export default function EditProductModal({ product, isOpen, onClose, onProductUpdated }) {
  const [formData, setFormData] = useState({
    productName: '',
    craftType: '',
    image: '',
    technique: '',
    description: '',
    craftStory: '',
    origin: '',
    productionTime: '',
    priceEstimate: ''
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        productName: product.productName || '',
        craftType: product.craftType || 'Ajrak',
        image: product.image || SINDHI_CRAFT_PRESETS[0].url,
        technique: product.technique || '',
        description: product.description || '',
        craftStory: product.craftStory || '',
        origin: product.origin || '',
        productionTime: product.productionTime || '21 Days',
        priceEstimate: product.priceEstimate || 'PKR 12,000'
      });
    }
  }, [product, isOpen]);

  if (!isOpen || !product) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.productName.trim()) return;

    const updated = updateProduct(product.productId, formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      if (onProductUpdated) onProductUpdated(updated);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 md:p-8 shadow-2xl my-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-800 to-amber-700 flex items-center justify-center text-white font-bold shadow">
              <Camera className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Edit Craft & Change Picture</h3>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                  {product.productId}
                </span>
              </div>
              <p className="text-xs text-slate-400">Update authentic craft photograph, specifications & dossier details</p>
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
            <h4 className="text-lg font-bold text-white">Craft Picture & Details Updated!</h4>
            <p className="text-xs text-slate-300">
              The updated craft photo and dossier for <strong className="text-amber-300">{formData.productName}</strong> have been saved to the permanent provenance ledger.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-5">
            
            {/* PHOTO SECTION */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
                <Camera className="w-4 h-4 text-amber-400" />
                Craft Photograph / Image
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                {/* Visual Preview */}
                <div className="relative h-36 rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 group shadow-inner">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = SINDHI_CRAFT_PRESETS[0].url;
                    }}
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                    <span className="text-[10px] font-bold text-white bg-slate-900/80 px-2 py-1 rounded">Live Preview</span>
                  </div>
                </div>

                {/* Upload & Preset controls */}
                <div className="sm:col-span-2 space-y-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="py-2 px-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow cursor-pointer flex items-center gap-2 transition">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload From Device</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                    <span className="text-[11px] text-slate-400">or pick from authentic presets:</span>
                  </div>

                  {/* Preset chips */}
                  <div className="grid grid-cols-3 gap-1.5">
                    {SINDHI_CRAFT_PRESETS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setFormData({ ...formData, image: preset.url })}
                        className={`p-1 rounded-lg border text-left flex items-center gap-1.5 transition ${
                          formData.image === preset.url
                            ? 'border-amber-400 bg-amber-500/10'
                            : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                        }`}
                      >
                        <img src={preset.url} alt={preset.title} className="w-6 h-6 rounded object-cover flex-shrink-0" />
                        <span className="text-[10px] text-slate-300 truncate">{preset.title.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>

                  {/* Direct URL */}
                  <input
                    type="text"
                    placeholder="Or paste external image URL (https://...)"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* PRODUCT NAME & CRAFT TYPE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.productName}
                  onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Craft Category
                </label>
                <select
                  value={formData.craftType}
                  onChange={(e) => setFormData({ ...formData, craftType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Ajrak">Traditional Ajrak Shawl</option>
                  <option value="Ralli">Hand-Stitched Ralli Quilt</option>
                  <option value="Embroidery">Sindhi Hand Embroidery</option>
                  <option value="Block Printing">Indigo Block Print Fabric</option>
                  <option value="Pottery">Kashikari Glazed Pottery</option>
                  <option value="Leather Craft">Camel Leather Craft</option>
                </select>
              </div>
            </div>

            {/* TECHNIQUE & ORIGIN */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Technique & Materials
                </label>
                <input
                  type="text"
                  value={formData.technique}
                  onChange={(e) => setFormData({ ...formData, technique: e.target.value })}
                  placeholder="e.g. 14-stage natural dye with carved wooden blocks"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Origin Village & Cluster
                </label>
                <input
                  type="text"
                  value={formData.origin}
                  onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* PRODUCTION TIME & ESTIMATED PRICE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Production Time (Handmade)
                </label>
                <input
                  type="text"
                  value={formData.productionTime}
                  onChange={(e) => setFormData({ ...formData, productionTime: e.target.value })}
                  placeholder="e.g. 21 Days or 3 Weeks"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Estimated Artisan Value (PKR)
                </label>
                <input
                  type="text"
                  value={formData.priceEstimate}
                  onChange={(e) => setFormData({ ...formData, priceEstimate: e.target.value })}
                  placeholder="e.g. PKR 14,500"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Description & Craftsmanship Story
              </label>
              <textarea
                rows="2"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* SUBMIT BUTTONS */}
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
                Save Changes & Update Photo
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
