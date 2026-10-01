import React, { useState } from 'react';
import { 
  Plus, QrCode, ShieldCheck, CheckCircle2, Clock, 
  Eye, Package, Sparkles, Filter, Search, Award, ArrowUpRight, UserPlus,
  Edit3, Camera, RefreshCw
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import StatusBadge from '../components/StatusBadge';
import AddArtisanModal from '../components/AddArtisanModal';
import EditArtisanModal from '../components/EditArtisanModal';
import EditProductModal from '../components/EditProductModal';
import { getProducts, getArtisans } from '../services/storageService';

export default function ArtisanDashboard({ 
  onNavigateRegister, 
  onOpenQR, 
  onViewDetails, 
  onVerifyDirect 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCraft, setFilterCraft] = useState('all');
  const [addArtisanModalOpen, setAddArtisanModalOpen] = useState(false);
  const [editArtisanModalOpen, setEditArtisanModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editProductModalOpen, setEditProductModalOpen] = useState(false);

  const [artisansList, setArtisansList] = useState(getArtisans());
  const [selectedArtisanId, setSelectedArtisanId] = useState(artisansList[0]?.id || 'artisan-1');
  const [allProducts, setAllProducts] = useState(getProducts());

  const currentArtisan = artisansList.find(a => a.id === selectedArtisanId) || artisansList[0] || {
    name: 'Ayesha Bibi',
    village: 'Matiari',
    craftType: 'Ajrak',
    badge: 'Master Artisan (Grade A)',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    experienceYears: 18
  };
  
  // Filter for current artisan's crafts or showcase all matching
  const artisanProducts = allProducts.filter(p => 
    p.artisanId === currentArtisan.id || 
    p.artisanName?.toLowerCase().includes(currentArtisan.name.toLowerCase()) ||
    (selectedArtisanId === 'all')
  );

  // Computed metrics
  const totalProducts = artisanProducts.length;
  const verifiedProducts = artisanProducts.filter(p => p.status === 'verified').length;
  const pendingProducts = artisanProducts.filter(p => p.status === 'unverified').length;
  const totalScans = artisanProducts.reduce((acc, curr) => acc + (curr.scansCount || 0), 0);

  // Filter products by search and craft
  const filteredList = artisanProducts.filter(p => {
    const matchesSearch = p.productName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.productId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCraft = filterCraft === 'all' || p.craftType?.toLowerCase() === filterCraft.toLowerCase();
    return matchesSearch && matchesCraft;
  });

  const reloadData = () => {
    setArtisansList(getArtisans());
    setAllProducts(getProducts());
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Top Banner / Artisan Greeting */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-900/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative">
          
          <div className="flex items-center gap-4">
            <div className="relative group w-18 h-18 rounded-2xl overflow-hidden border-2 border-amber-500/60 shadow-lg flex-shrink-0 bg-slate-950">
              <img
                src={currentArtisan.avatar}
                alt={currentArtisan.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80";
                }}
              />
              <button
                onClick={() => setEditArtisanModalOpen(true)}
                className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition cursor-pointer text-amber-300"
                title="Change Portrait"
              >
                <Camera className="w-5 h-5" />
              </button>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl md:text-2xl font-bold text-white">Welcome, {currentArtisan.name}</h1>
                <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  {currentArtisan.badge || 'Master Artisan (Grade A)'}
                </span>

                <button
                  onClick={() => setEditArtisanModalOpen(true)}
                  className="flex items-center gap-1 py-1 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-[11px] font-semibold transition border border-slate-700 cursor-pointer"
                  title="Edit Artisan Details & Photo"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Edit Profile</span>
                </button>
              </div>

              <p className="text-xs text-slate-400 mt-1">
                {currentArtisan.village}, {currentArtisan.district || 'Sindh'} • {currentArtisan.cooperative || 'Sindh Guild'} • {currentArtisan.experienceYears || '15'}+ Years Exp.
              </p>

              {/* Artisan Switcher Dropdown */}
              <div className="mt-2.5 flex items-center gap-2">
                <span className="text-[11px] text-slate-500 font-medium">Switch Artisan View:</span>
                <select
                  value={selectedArtisanId}
                  onChange={(e) => setSelectedArtisanId(e.target.value)}
                  className="py-1 px-2.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-amber-300 font-medium focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  {artisansList.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name} ({a.craftType} - {a.village})
                    </option>
                  ))}
                  <option value="all">View All Artisans' Crafts ({allProducts.length})</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setAddArtisanModalOpen(true)}
              className="flex items-center gap-2 py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider border border-slate-700 shadow transition-transform hover:-translate-y-0.5 cursor-pointer"
            >
              <UserPlus className="w-4 h-4 text-amber-400" />
              <span>+ Add New Artisan</span>
            </button>

            <button
              onClick={onNavigateRegister}
              className="flex items-center gap-2 py-3 px-5 rounded-2xl bg-gradient-to-r from-rose-800 via-rose-700 to-amber-700 hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Register New Craft</span>
            </button>
          </div>

        </div>

        {/* 4 Stat Cards */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Total Registered</span>
              <Package className="w-4 h-4 text-slate-500" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-serif text-3xl font-extrabold text-white">{totalProducts}</span>
              <span className="text-[11px] text-slate-400">Crafts</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Verified Authentic</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-serif text-3xl font-extrabold text-emerald-400">{verifiedProducts}</span>
              <span className="text-[11px] text-emerald-400/80">Active</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Pending Review</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-serif text-3xl font-extrabold text-amber-400">{pendingProducts}</span>
              <span className="text-[11px] text-slate-400">In Audit</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Total Provenance Scans</span>
              <Eye className="w-4 h-4 text-rose-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-serif text-3xl font-extrabold text-amber-300">{totalScans}</span>
              <span className="text-[11px] text-slate-400">By Buyers</span>
            </div>
          </div>

        </div>

      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white">Registered Handmade Crafts</h2>
          <p className="text-xs text-slate-400">Click on any craft card's camera icon to change its photograph or edit specifications</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search by ID or craft name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <select
            value={filterCraft}
            onChange={(e) => setFilterCraft(e.target.value)}
            className="py-2 px-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none"
          >
            <option value="all">All Crafts</option>
            <option value="ajrak">Ajrak</option>
            <option value="ralli">Ralli</option>
            <option value="embroidery">Embroidery</option>
          </select>
        </div>
      </div>

      {/* PRODUCT GRID */}
      {filteredList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredList.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenQR={onOpenQR}
              onViewDetails={onViewDetails}
              onVerifyDirect={onVerifyDirect}
              onEditProduct={(p) => {
                setEditingProduct(p);
                setEditProductModalOpen(true);
              }}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 rounded-3xl bg-slate-900/50 border border-slate-800 text-center space-y-3">
          <Package className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-sm font-bold text-white">No products found matching criteria</h3>
          <p className="text-xs text-slate-400">Try adjusting your search or register a new craft.</p>
          <button
            onClick={onNavigateRegister}
            className="mt-2 py-2 px-4 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs uppercase"
          >
            Register New Craft
          </button>
        </div>
      )}

      {/* Add Artisan Modal */}
      <AddArtisanModal
        isOpen={addArtisanModalOpen}
        onClose={() => setAddArtisanModalOpen(false)}
        onArtisanAdded={(newArtisan) => {
          reloadData();
          setSelectedArtisanId(newArtisan.id);
        }}
      />

      {/* Edit Artisan Modal */}
      <EditArtisanModal
        artisan={currentArtisan}
        isOpen={editArtisanModalOpen}
        onClose={() => setEditArtisanModalOpen(false)}
        onArtisanUpdated={(updated) => {
          reloadData();
        }}
      />

      {/* Edit Product & Picture Modal */}
      <EditProductModal
        product={editingProduct}
        isOpen={editProductModalOpen}
        onClose={() => {
          setEditProductModalOpen(false);
          setEditingProduct(null);
        }}
        onProductUpdated={(updated) => {
          reloadData();
        }}
      />

    </div>
  );
}
