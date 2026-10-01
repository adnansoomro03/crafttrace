import React, { useState } from 'react';
import { 
  Sparkles, Heart, MapPin, Clock, Calendar, 
  ArrowRight, ShieldCheck, CheckCircle2, BookOpen, Layers
} from 'lucide-react';

export default function CraftStoryPage({ onVerifyDirect }) {
  const [selectedStory, setSelectedStory] = useState('ajrak');

  const stories = {
    ajrak: {
      title: "The 16-Step Indigo Symphony: Sacred Ajrak of the Indus",
      artisan: "Ayesha Bibi & Family",
      village: "Matiari, Sindh (45 km from Hyderabad)",
      lineage: "4 Generations of Natural Block Printers",
      productionTime: "21 to 28 Days",
      materials: "100% Unbleached Cotton, Indigofera tinctoria, Rubia cordifolia (Alizarin), Tamarisk, River Mud",
      quote: "Our grandfathers printed for the Sufi shrines of Bhit Shah. When you touch genuine Ajrak, you are holding the breath of the Indus River.",
      heroImage: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1200&q=80",
      demoId: "AJ-2026-00125",
      steps: [
        { name: "1. Khumbh (Steaming)", desc: "Raw cotton cloth is washed in river water and steamed in large copper vats with soda ash to open cotton fibers." },
        { name: "2. Teli (Mustard Oil Soaking)", desc: "Cloth is soaked in mustard oil, camel dung, and water emulsion for 15 days, massaged daily by hand." },
        { name: "3. Khaan (River Washing)", desc: "Rinsed in flowing Indus canal water before dawn and spread across desert sands to bake under morning sun." },
        { name: "4. Kiryana & Resist Printing", desc: "First woodblock prints carved from Acacia nilotica are stamped with mud and fuller's earth resists." },
        { name: "5. Indigo Dyeing", desc: "Submerged into underground earthenware vats filled with fermented natural indigo liquor." },
        { name: "6. Manjishtha Red Boiling", desc: "Boiled in large cauldrons with crushed madder roots to produce the iconic deep Ajrak ruby crimson." }
      ]
    },
    ralli: {
      title: "Geometric Cosmos: Tuk & Hand-Stitched Ralli Quilts",
      artisan: "Shazia Bibi & Women's Guild",
      village: "Garelo, Larkana, Sindh",
      lineage: "Generations of Rural Matriarchs",
      productionTime: "30 to 45 Days (Over 35,000 Hand Stitches)",
      materials: "Upcycled Cotton Textiles, Natural Dyes, Thick Needlework Thread",
      quote: "We don't use rulers or pencils. The geometry is held in our eyes and memorized through our mother's songs as we sit in the courtyard.",
      heroImage: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80",
      demoId: "RL-2026-00126",
      steps: [
        { name: "1. Fabric Curation", desc: "Rural women collect pure cotton remnants, hand-washing and pressing them flat." },
        { name: "2. Hand Geometric Cutting", desc: "Intricate triangular motifs (Tuk) and chevrons are folded and hand-cut with razor shears." },
        { name: "3. Layering & Basting", desc: "Seven layers of soft fabric wadding are aligned on the desert courtyard floor." },
        { name: "4. Micro-Stitching (Ralli Seam)", desc: "Stitched with dense parallel lines running up to 18 stitches per inch to endure a lifetime." }
      ]
    },
    embroidery: {
      title: "Desert Starlight: Hurmitch & Sheesha Mirrorwork of Thar",
      artisan: "Mai Janki",
      village: "Islamkot, Tharparkar, Sindh",
      lineage: "Ancestral Thar Desert Needlecraft",
      productionTime: "40 to 60 Days",
      materials: "Fine Silk Organza, Blown Convex Mirrors, Hand-Dyed Silk Floss",
      quote: "In the Thar desert, the heat is fierce and water is scarce, but our needles weave the reflection of the stars into every mirror.",
      heroImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
      demoId: "EM-2026-00127",
      steps: [
        { name: "1. Thread Tensioning", desc: "Pure silk threads are naturally dyed with desert root extracts and hand-wound." },
        { name: "2. Mirror Framing", desc: "Real glass mirrors are hand-gripped with intricate thread lattices without any adhesive." },
        { name: "3. Interlocking Hurmitch", desc: "Needlework travels underneath tensioned foundation threads without puncturing the fabric backing." }
      ]
    }
  };

  const activeStory = stories[selectedStory];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-10 animate-fadeIn">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center justify-center gap-1.5 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          Sindh Cultural Heritage Dossier
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Every Authentic Craft Has A Human Soul
        </h1>
        <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
          CraftTrace reconnects international collectors and everyday buyers with the living hands, sacred mud, and ancestral villages behind every thread.
        </p>

        {/* Story Selector Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setSelectedStory('ajrak')}
            className={`py-2 px-5 rounded-2xl text-xs font-bold transition ${
              selectedStory === 'ajrak' 
                ? 'bg-rose-800 text-white shadow-lg' 
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            Sindhi Ajrak (16 Stages)
          </button>
          <button
            onClick={() => setSelectedStory('ralli')}
            className={`py-2 px-5 rounded-2xl text-xs font-bold transition ${
              selectedStory === 'ralli' 
                ? 'bg-amber-600 text-white shadow-lg' 
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            Ralli Quilt (Tuk Patchwork)
          </button>
          <button
            onClick={() => setSelectedStory('embroidery')}
            className={`py-2 px-5 rounded-2xl text-xs font-bold transition ${
              selectedStory === 'embroidery' 
                ? 'bg-purple-700 text-white shadow-lg' 
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            Thar Mirrorwork Embroidery
          </button>
        </div>
      </div>

      {/* Hero Visual Card */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl h-80 sm:h-96">
        <img
          src={activeStory.heroImage}
          alt={activeStory.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

        <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="text-[11px] font-bold text-amber-300 uppercase tracking-widest bg-slate-950/80 px-2.5 py-1 rounded-md">
              Living Heritage
            </span>
            <h2 className="font-serif text-xl sm:text-3xl font-bold text-white mt-2">
              {activeStory.title}
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-300">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                {activeStory.village}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {activeStory.productionTime}
              </span>
            </div>
          </div>

          <button
            onClick={() => onVerifyDirect(activeStory.demoId)}
            className="py-2.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow transition whitespace-nowrap"
          >
            Verify This Craft ID ({activeStory.demoId})
          </button>
        </div>
      </div>

      {/* Artisan Quote Block */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center relative">
        <div className="w-12 h-12 rounded-full bg-rose-900/40 border border-rose-700/50 flex items-center justify-center text-rose-300 mx-auto mb-3">
          <Heart className="w-6 h-6" />
        </div>
        <p className="font-serif italic text-base sm:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
          "{activeStory.quote}"
        </p>
        <span className="block text-xs font-bold text-amber-400 uppercase tracking-wider mt-3">
          — {activeStory.artisan}, {activeStory.village}
        </span>
      </div>

      {/* Production Stages */}
      <div className="space-y-4">
        <h3 className="font-serif text-xl font-bold text-white">
          Why It Cannot Be Replicated By Machines: Stage-by-Stage Mastery
        </h3>
        <p className="text-xs text-slate-400">
          Machine screen copies mimic the final colors on surface polyester, but miss the deep organic alizarin chemistry and manual tactile stitch density that defines genuine craft.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {activeStory.steps.map((s, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition">
              <span className="text-xs font-bold text-amber-400 font-mono block mb-1">
                Stage 0{idx + 1}
              </span>
              <h4 className="text-sm font-bold text-white mb-2">{s.name}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Natural Materials Attestation */}
      <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
            Natural Organic Ingredients
          </span>
          <p className="text-xs text-slate-300 mt-1 font-medium">
            {activeStory.materials}
          </p>
        </div>

        <button
          onClick={() => onVerifyDirect(activeStory.demoId)}
          className="py-2.5 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition whitespace-nowrap"
        >
          Inspect Digital Provenance Tag
        </button>
      </div>

    </div>
  );
}
