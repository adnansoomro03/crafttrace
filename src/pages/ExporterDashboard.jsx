import React, { useState } from 'react';
import { 
  Globe, Award, ShieldCheck, AlertTriangle, FileText, 
  Printer, Download, ExternalLink, CheckCircle2, Search, Filter, Eye,
  Plus, Building2, MapPin
} from 'lucide-react';
import { getProducts, getExporters } from '../services/storageService';
import StatusBadge from '../components/StatusBadge';
import AddExporterModal from '../components/AddExporterModal';

export default function ExporterDashboard({ 
  onGenerateReport, 
  onViewDetails, 
  onVerifyDirect 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [addExporterModalOpen, setAddExporterModalOpen] = useState(false);
  const [exportersList, setExportersList] = useState(getExporters());
  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' | 'firms'

  const products = getProducts();

  const totalProducts = products.length;
  const verifiedProducts = products.filter(p => p.status === 'verified').length;
  const suspiciousProducts = products.filter(p => p.status === 'suspicious').length;
  const shipments = 14;

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.productId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.artisanName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 flex-shrink-0 shadow">
              <Globe className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-bold text-white">
                  Sindh Heritage Global Exports Ltd.
                </h1>
                <span className="text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full">
                  Authorized Port Exporter
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Managed by Zeeshan Ali • Terminal: Karachi Port Trust • Consignments to UK, EU, UAE, & Japan
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setAddExporterModalOpen(true)}
              className="flex items-center gap-2 py-3 px-4 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Register Exporter</span>
            </button>
            <button
              onClick={() => onGenerateReport(products[0])}
              className="flex items-center gap-2 py-3 px-5 rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-700 hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Export Verification Report</span>
            </button>
          </div>

        </div>

        {/* 4 Stat Cards */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs text-slate-400 font-medium block">Total Monitored Crafts</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-serif text-3xl font-extrabold text-white">{totalProducts}</span>
              <span className="text-[11px] text-slate-400">Inventory</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs text-slate-400 font-medium block">Export-Cleared (Verified)</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-serif text-3xl font-extrabold text-emerald-400">{verifiedProducts}</span>
              <span className="text-[11px] text-emerald-400/80">Customs Ready</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs text-slate-400 font-medium block">Suspicious Flags</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-serif text-3xl font-extrabold text-rose-400">{suspiciousProducts}</span>
              <span className="text-[11px] text-rose-400/80">Quarantined</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs text-slate-400 font-medium block">Overseas Shipments</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-serif text-3xl font-extrabold text-purple-300">{shipments}</span>
              <span className="text-[11px] text-slate-400">En Route</span>
            </div>
          </div>
        </div>

      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`py-2 px-4 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === 'inventory'
              ? 'bg-purple-600 text-white'
              : 'text-slate-400 hover:text-white bg-slate-900'
          }`}
        >
          Pre-Shipment Inspection Inventory ({filteredProducts.length})
        </button>
        <button
          onClick={() => setActiveTab('firms')}
          className={`py-2 px-4 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === 'firms'
              ? 'bg-purple-600 text-white'
              : 'text-slate-400 hover:text-white bg-slate-900'
          }`}
        >
          Accredited Export Firms & Terminals ({exportersList.length})
        </button>
      </div>

      {/* TAB CONTENT 1: INVENTORY TABLE */}
      {activeTab === 'inventory' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white">Pre-Shipment Provenance Verification</h3>
              <p className="text-xs text-slate-400">
                Audit craft identities before issuing international export certificates
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search Product ID, artisan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="py-2 px-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="verified">Verified Only</option>
                <option value="suspicious">Suspicious Flags</option>
                <option value="unverified">Unverified</option>
              </select>
            </div>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/70 text-slate-400 uppercase font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3 px-3">Product ID</th>
                  <th className="py-3 px-3">Craft & Technique</th>
                  <th className="py-3 px-3">Master Artisan</th>
                  <th className="py-3 px-3">Village Origin</th>
                  <th className="py-3 px-3">Export Clearance</th>
                  <th className="py-3 px-3">Scans</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-3 font-mono font-bold text-amber-300">
                      {p.productId}
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-semibold text-white">{p.productName}</div>
                      <div className="text-[11px] text-slate-400 truncate max-w-xs">{p.technique}</div>
                    </td>
                    <td className="py-3 px-3 text-slate-200">
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
                        onClick={() => onVerifyDirect(p.productId)}
                        className="py-1 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold cursor-pointer"
                      >
                        Verify
                      </button>
                      <button
                        onClick={() => onViewDetails(p)}
                        className="py-1 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-[11px] font-semibold cursor-pointer"
                      >
                        Provenance
                      </button>
                      <button
                        onClick={() => onGenerateReport(p)}
                        className="py-1 px-2.5 rounded-lg bg-purple-700 hover:bg-purple-600 text-white font-semibold text-[11px] cursor-pointer"
                      >
                        Certificate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* TAB CONTENT 2: EXPORT FIRMS */}
      {activeTab === 'firms' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Accredited Port Exporters & International Terminals</h3>
            <button
              onClick={() => setAddExporterModalOpen(true)}
              className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Register Exporter</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exportersList.map((firm) => (
              <div key={firm.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{firm.company}</h4>
                      <p className="text-[11px] text-slate-400">Managing Director: {firm.name}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/80 border border-emerald-800/40 px-2 py-0.5 rounded font-bold">
                    {firm.verified ? 'Customs Accredited' : 'Pending Audit'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                  <div>
                    <span className="text-slate-500 block">Headquarters / Terminal</span>
                    <span className="text-white font-medium">{firm.headquarters}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Annual Consignments</span>
                    <span className="text-purple-300 font-bold">{firm.annualShipments}+ Shipments</span>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] text-slate-500 block mb-1.5">Authorized Destination Markets</span>
                  <div className="flex flex-wrap gap-1.5">
                    {firm.exportDestinations?.map((dest, i) => (
                      <span key={i} className="text-[10px] bg-slate-800/80 text-purple-300 border border-purple-800/30 px-2 py-0.5 rounded-lg">
                        {dest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Exporter Modal */}
      <AddExporterModal
        isOpen={addExporterModalOpen}
        onClose={() => setAddExporterModalOpen(false)}
        onExporterAdded={(newExp) => {
          setExportersList(getExporters());
        }}
      />

    </div>
  );
}
