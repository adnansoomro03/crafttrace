import React, { useState } from 'react';
import { 
  Truck, Users, Package, CheckCircle2, Clock, 
  ArrowRight, ShieldCheck, HeartHandshake, DollarSign, 
  MapPin, Plus, QrCode, Eye, Send, UserPlus
} from 'lucide-react';
import { getProducts, getArtisans, getMiddlemen } from '../services/storageService';
import StatusBadge from '../components/StatusBadge';
import AddMiddlemanModal from '../components/AddMiddlemanModal';
import AddArtisanModal from '../components/AddArtisanModal';

export default function MiddlemanDashboard({ onOpenQR, onViewDetails, onVerifyDirect }) {
  const [activeTab, setActiveTab] = useState('sourced-products'); // 'sourced-products' | 'artisans-network'
  const [transferSuccess, setTransferSuccess] = useState('');
  const [addMiddlemanModalOpen, setAddMiddlemanModalOpen] = useState(false);
  const [addArtisanModalOpen, setAddArtisanModalOpen] = useState(false);
  
  const [middlemenList, setMiddlemenList] = useState(getMiddlemen());
  const [artisansList, setArtisansList] = useState(getArtisans());
  const allProducts = getProducts();

  const totalProducts = allProducts.length;
  const verifiedProducts = allProducts.filter(p => p.status === 'verified').length;
  const pendingProducts = allProducts.filter(p => p.status === 'unverified').length;

  const handleTransfer = (productId) => {
    setTransferSuccess(`Consignment ${productId} successfully routed to Sindh Heritage Global Exports terminal.`);
    setTimeout(() => setTransferSuccess(''), 4000);
  };

  const allArtisans = artisansList;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0 shadow">
              <Truck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-bold text-white">
                  Indus Craft Logistics & Market Bridge
                </h1>
                <span className="text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded-full">
                  Verified Sourcing Partner
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Managed by Tariq Khan • Hub: Hyderabad, Sindh • Connecting 14 Rural Villages with Global Port Exporters
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => setAddMiddlemanModalOpen(true)}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition shadow-lg cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Onboard Sourcing Partner</span>
            </button>
            <button
              onClick={() => setAddArtisanModalOpen(true)}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs transition cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>+ Add Partner Artisan</span>
            </button>
          </div>

        </div>

        {/* 4 Stat Cards */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs text-slate-400 font-medium block">Supported Artisans</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-serif text-3xl font-extrabold text-white">{allArtisans.length}</span>
              <span className="text-[11px] text-slate-400">Rural Families</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs text-slate-400 font-medium block">Sourced Products</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-serif text-3xl font-extrabold text-white">{totalProducts}</span>
              <span className="text-[11px] text-slate-400">Pieces</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs text-slate-400 font-medium block">Verified Crafts</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-serif text-3xl font-extrabold text-emerald-400">{verifiedProducts}</span>
              <span className="text-[11px] text-emerald-400/80">Certified</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs text-slate-400 font-medium block">Active Sourcing Hubs</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-serif text-3xl font-extrabold text-blue-400">{middlemenList.length}</span>
              <span className="text-[11px] text-slate-400">Accredited</span>
            </div>
          </div>
        </div>

      </div>

      {transferSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs font-semibold animate-fadeIn flex items-center justify-between">
          <span>✓ {transferSuccess}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('sourced-products')}
          className={`py-2 px-4 rounded-xl text-xs font-bold transition ${
            activeTab === 'sourced-products'
              ? 'bg-blue-600 text-white'
              : 'text-slate-400 hover:text-white bg-slate-900'
          }`}
        >
          Sourced Crafts Inventory ({allProducts.length})
        </button>
        <button
          onClick={() => setActiveTab('artisans-network')}
          className={`py-2 px-4 rounded-xl text-xs font-bold transition ${
            activeTab === 'artisans-network'
              ? 'bg-blue-600 text-white'
              : 'text-slate-400 hover:text-white bg-slate-900'
          }`}
        >
          Partner Artisans ({allArtisans.length})
        </button>
        <button
          onClick={() => setActiveTab('middlemen-network')}
          className={`py-2 px-4 rounded-xl text-xs font-bold transition ${
            activeTab === 'middlemen-network'
              ? 'bg-blue-600 text-white'
              : 'text-slate-400 hover:text-white bg-slate-900'
          }`}
        >
          Sourcing Partners & Logistics Hubs ({middlemenList.length})
        </button>
      </div>

      {/* TAB CONTENT 1: SOURCED PRODUCTS TABLE */}
      {activeTab === 'sourced-products' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Sourced Crafts & Consignments</h3>
            <span className="text-xs text-slate-400">
              Middlemen maintain custody records and dispatch verified pieces
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 uppercase font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3 px-3">Product ID</th>
                  <th className="py-3 px-3">Craft Title</th>
                  <th className="py-3 px-3">Artisan</th>
                  <th className="py-3 px-3">Origin Village</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Scans</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {allProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-3 font-mono font-bold text-amber-300">
                      {p.productId}
                    </td>
                    <td className="py-3 px-3 font-semibold text-white">
                      {p.productName}
                    </td>
                    <td className="py-3 px-3 text-slate-300">
                      {p.artisanName}
                    </td>
                    <td className="py-3 px-3 text-slate-400">
                      {p.origin?.split(',')[0]}
                    </td>
                    <td className="py-3 px-3">
                      <StatusBadge status={p.status} size="sm" />
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-400">
                      {p.scansCount || 0}
                    </td>
                    <td className="py-3 px-3 text-right space-x-1.5 whitespace-nowrap">
                      <button
                        onClick={() => onOpenQR(p)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400"
                        title="View QR Label"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onViewDetails(p)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                        title="View Dossier"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleTransfer(p.productId)}
                        className="py-1 px-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[11px]"
                      >
                        Consign to Exporter
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: ARTISANS DIRECTORY */}
      {activeTab === 'artisans-network' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Partner Artisans & Rural Micro-Financing</h3>
            <button
              onClick={() => setAddArtisanModalOpen(true)}
              className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>+ Add Artisan</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allArtisans.map((artisan) => (
              <div key={artisan.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-4">
                <img
                  src={artisan.avatar}
                  alt={artisan.name}
                  className="w-16 h-16 rounded-xl object-cover border border-slate-700 flex-shrink-0"
                />
                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">{artisan.name}</h4>
                    <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded font-bold">
                      {artisan.verified ? 'Verified Guild Member' : 'Pending Audit'}
                    </span>
                  </div>
                  <p className="text-[11px] text-amber-300 mt-0.5">{artisan.craftType} Master • {artisan.experienceYears} Years Exp.</p>
                  <div className="flex items-center gap-1 text-slate-400 mt-1">
                    <MapPin className="w-3 h-3 text-rose-400" />
                    <span>{artisan.village}, {artisan.district}, Sindh</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {artisan.bio}
                  </p>
                  <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Advance Support: <strong>PKR 35,000</strong></span>
                    <span className="text-slate-400">Total Registered: <strong>{artisan.totalProductsRegistered}</strong></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: MIDDLEMEN DIRECTORY */}
      {activeTab === 'middlemen-network' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Registered Sourcing Partners & Supply Chain Bridges</h3>
            <button
              onClick={() => setAddMiddlemanModalOpen(true)}
              className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Onboard Sourcing Partner</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {middlemenList.map((partner) => (
              <div key={partner.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{partner.businessName}</h4>
                      <p className="text-[11px] text-slate-400">Lead: {partner.name}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/80 border border-emerald-800/40 px-2 py-0.5 rounded font-bold">
                    {partner.verified ? 'Verified Logistics Partner' : 'Audit Pending'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                  <div>
                    <span className="text-slate-500 block">Hub Location</span>
                    <span className="text-white font-medium">{partner.hubLocation}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Phone</span>
                    <span className="text-amber-400 font-mono">{partner.phone}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Artisans Supported</span>
                    <span className="text-white font-medium">{partner.artisansSupported} Rural Clusters</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Advance Liquidity Issued</span>
                    <span className="text-emerald-400 font-bold">{partner.advancePaymentsIssued}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {partner.roleDescription}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Middleman Modal */}
      <AddMiddlemanModal
        isOpen={addMiddlemanModalOpen}
        onClose={() => setAddMiddlemanModalOpen(false)}
        onMiddlemanAdded={(newPartner) => {
          setMiddlemenList(getMiddlemen());
        }}
      />

      {/* Add Artisan Modal */}
      <AddArtisanModal
        isOpen={addArtisanModalOpen}
        onClose={() => setAddArtisanModalOpen(false)}
        onArtisanAdded={(newArtisan) => {
          setArtisansList(getArtisans());
        }}
      />

    </div>
  );
}
