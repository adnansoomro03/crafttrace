import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle2, QrCode, Upload, ArrowLeft, 
  Download, Printer, ExternalLink, Image as ImageIcon, Camera, AlertCircle, UserPlus
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import AddArtisanModal from '../components/AddArtisanModal';
import { registerNewProduct, getArtisans } from '../services/storageService';
import { CRAFT_TECHNIQUES } from '../data/mockData';

export default function RegisterProductPage({ 
  onBack, 
  onOpenPublicPage, 
  onOpenQR 
}) {
  const [artisansList, setArtisansList] = useState(getArtisans());
  const [addArtisanModalOpen, setAddArtisanModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    artisanName: 'Ayesha Bibi',
    artisanId: 'artisan-1',
    craftType: 'Ajrak',
    productName: '',
    technique: 'Hand Block Printed (16-Step Teli)',
    productionDate: 'October 2026',
    origin: 'Matiari, Sindh, Pakistan',
    description: '',
    productionTime: '21 Days (16 Stages)',
    craftStory: '',
    priceEstimate: 'PKR 15,000',
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80',
    materials: 'Unbleached handloom cotton, natural indigo from Matiari, alizarin madder root'
  });

  const [registeredResult, setRegisteredResult] = useState(null);
  const [imagePreview, setImagePreview] = useState(formData.image);
  const [loading, setLoading] = useState(false);

  // Available techniques for the selected craft type
  const activeCraftObj = CRAFT_TECHNIQUES.find(c => 
    c.name.toLowerCase().includes(formData.craftType.toLowerCase())
  ) || CRAFT_TECHNIQUES[0];

  const handleImagePreset = (url) => {
    setFormData(prev => ({ ...prev, image: url }));
    setImagePreview(url);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const newProd = registerNewProduct(formData);
      setRegisteredResult(newProd);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Artisan Dashboard</span>
        </button>

        <span className="text-xs font-mono bg-slate-900 text-amber-400 px-3 py-1 rounded-lg border border-slate-800">
          Step 1: Digital Identity Registration
        </span>
      </div>

      {registeredResult ? (
        /* SUCCESSFUL REGISTRATION SCREEN */
        <div className="p-8 md:p-12 rounded-3xl bg-slate-900 border border-emerald-500/50 shadow-2xl space-y-8 animate-fadeIn text-center">
          
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Registration Successful
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-white mt-1">
              Digital Identity Activated
            </h2>
            <p className="text-xs md:text-sm text-slate-300 mt-2 max-w-lg mx-auto">
              Your handmade craft has received a unique digital provenance record. The generated QR code is ready to attach to the physical item.
            </p>
          </div>

          {/* Generated Tag Container */}
          <div className="max-w-xs mx-auto p-5 bg-white text-slate-950 rounded-2xl border-4 border-amber-600/30 shadow-2xl flex flex-col items-center">
            <div className="w-full flex items-center justify-between border-b pb-2 mb-3">
              <span className="font-extrabold text-[10px] text-rose-900 font-serif">CRAFTTRACE™ VERIFIED</span>
              <span className="text-[9px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">SINDH</span>
            </div>

            <QRCodeSVG
              value={`${window.location.origin}/#verify?id=${registeredResult.productId}`}
              size={160}
              level="H"
              fgColor="#16203B"
            />

            <div className="mt-3 text-center">
              <div className="font-mono font-bold text-sm text-slate-950">
                {registeredResult.productId}
              </div>
              <p className="text-xs font-semibold text-slate-800">{registeredResult.productName}</p>
              <p className="text-[11px] text-slate-600">Artisan: {registeredResult.artisanName}</p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onOpenPublicPage(registeredResult.productId)}
              className="w-full sm:w-auto py-3 px-6 rounded-xl bg-gradient-to-r from-rose-800 to-amber-700 hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider shadow transition flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View Public Verification Page</span>
            </button>
            <button
              onClick={() => onOpenQR(registeredResult)}
              className="w-full sm:w-auto py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition border border-slate-700 flex items-center justify-center gap-2"
            >
              <QrCode className="w-4 h-4 text-amber-400" />
              <span>Print / Download QR Label</span>
            </button>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={() => {
                setRegisteredResult(null);
                setFormData(prev => ({ ...prev, productName: '', description: '', craftStory: '' }));
              }}
              className="text-xs text-slate-400 hover:text-amber-300 font-medium underline transition"
            >
              + Register Another Handmade Craft
            </button>
          </div>

        </div>
      ) : (
        /* REGISTRATION FORM */
        <form onSubmit={handleSubmit} className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
          
          <div>
            <h1 className="font-serif text-xl md:text-2xl font-bold text-white">
              Register Handmade Sindhi Craft
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Give your slow, skilled craft an immutable digital identity before dispatching to middleman or exporter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Artisan Selector with Onboard Trigger */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-300">
                  Select Master Artisan *
                </label>
                <button
                  type="button"
                  onClick={() => setAddArtisanModalOpen(true)}
                  className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 font-bold"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>+ New Artisan</span>
                </button>
              </div>

              <select
                value={formData.artisanName}
                onChange={(e) => {
                  const selectedName = e.target.value;
                  const foundArtisan = artisansList.find(a => a.name === selectedName);
                  if (foundArtisan) {
                    setFormData(prev => ({
                      ...prev,
                      artisanName: foundArtisan.name,
                      artisanId: foundArtisan.id,
                      origin: `${foundArtisan.village}, ${foundArtisan.district}, Sindh, Pakistan`,
                      craftType: foundArtisan.craftType || prev.craftType
                    }));
                  } else {
                    setFormData(prev => ({ ...prev, artisanName: selectedName }));
                  }
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500 font-medium"
              >
                {artisansList.map((a) => (
                  <option key={a.id} value={a.name}>
                    {a.name} ({a.village}, Sindh • {a.craftType})
                  </option>
                ))}
              </select>
            </div>

            {/* Craft Type */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Craft Type *
              </label>
              <select
                value={formData.craftType}
                onChange={(e) => setFormData({ ...formData, craftType: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="Ajrak">Ajrak (Sindhi Block Print)</option>
                <option value="Ralli">Ralli (Handmade Quilt)</option>
                <option value="Sindhi Embroidery">Sindhi Embroidery (Sheesha / Hurmitch)</option>
                <option value="Block Printing">Block Printing (Kashmiri / Floral)</option>
                <option value="Other">Other Traditional Sindh Craft</option>
              </select>
            </div>

            {/* Product Name */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Product Title / Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Royal Teli Double-Sided Indigo Ajrak"
                value={formData.productName}
                onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Technique */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Technique / Method *
              </label>
              <select
                value={formData.technique}
                onChange={(e) => setFormData({ ...formData, technique: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                {activeCraftObj.techniques.map((tech, idx) => (
                  <option key={idx} value={tech}>{tech}</option>
                ))}
              </select>
            </div>

            {/* Origin */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Origin / Village & District *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Matiari, Sindh, Pakistan"
                value={formData.origin}
                onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Estimated Production Time */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Estimated Production Time *
              </label>
              <input
                type="text"
                placeholder="e.g. 21 Days (16 Stages) or 38 Days"
                value={formData.productionTime}
                onChange={(e) => setFormData({ ...formData, productionTime: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Product Description & Dimensions
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Double-sided Ajrak on 100% pure Indus cotton, size 2.5m x 1.2m, dyed with organic indigo and madder root."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Craft Story */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1 flex items-center justify-between">
              <span>The Generational Story Behind This Piece</span>
              <span className="text-[11px] text-amber-400 font-normal">Connects international buyers directly to your lineage</span>
            </label>
            <textarea
              rows={3}
              placeholder="Explain how this craft was created, the generational technique passed down, the natural pigments used, and the cultural heritage it carries..."
              value={formData.craftStory}
              onChange={(e) => setFormData({ ...formData, craftStory: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Image & Proof Photo Upload */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-2">
              Product Photo & Workshop Proof
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1 h-36 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 relative group">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                  <span className="text-[11px] text-white font-medium">Selected Photo</span>
                </div>
              </div>

              <div className="sm:col-span-2 flex flex-col justify-between space-y-2">
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Choose a demo cultural photo preset or upload your camera workshop picture:
                </p>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleImagePreset("https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80")}
                    className="text-[10px] px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                  >
                    Ajrak Textile Preset
                  </button>
                  <button
                    type="button"
                    onClick={() => handleImagePreset("https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80")}
                    className="text-[10px] px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                  >
                    Ralli Quilt Preset
                  </button>
                  <button
                    type="button"
                    onClick={() => handleImagePreset("https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80")}
                    className="text-[10px] px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                  >
                    Mirrorwork Embroidery Preset
                  </button>
                </div>

                <label className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-dashed border-slate-700 text-xs text-slate-300 cursor-pointer transition">
                  <Upload className="w-3.5 h-3.5 text-amber-400" />
                  <span>Upload Custom Picture from Device</span>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">
              Unique Product ID & QR will be generated automatically
            </span>

            <button
              type="submit"
              disabled={loading}
              className="py-3 px-8 rounded-xl bg-gradient-to-r from-rose-800 via-rose-700 to-amber-700 hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition flex items-center gap-2"
            >
              {loading ? (
                <span>Generating Digital Identity...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Register Craft & Generate QR</span>
                </>
              )}
            </button>
          </div>

        </form>
      )}

      {/* Add Artisan Modal */}
      <AddArtisanModal
        isOpen={addArtisanModalOpen}
        onClose={() => setAddArtisanModalOpen(false)}
        onArtisanAdded={(newArtisan) => {
          setArtisansList(getArtisans());
          setFormData(prev => ({
            ...prev,
            artisanName: newArtisan.name,
            artisanId: newArtisan.id,
            origin: `${newArtisan.village}, ${newArtisan.district}, Sindh, Pakistan`,
            craftType: newArtisan.craftType || prev.craftType
          }));
        }}
      />

    </div>
  );
}
