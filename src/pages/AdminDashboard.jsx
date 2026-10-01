import React, { useState } from 'react';
import { 
  ShieldCheck, AlertTriangle, Users, Package, Eye, 
  CheckCircle2, XCircle, Search, Filter, Sparkles, 
  BarChart3, RefreshCw, Flag, Check, UserPlus,
  Truck, Globe, Building2, Plus, Edit3, Camera
} from 'lucide-react';
import { 
  getProducts, getArtisans, getMiddlemen, getExporters,
  updateProductStatus, updateArtisanVerification, resetDemoData 
} from '../services/storageService';
import StatusBadge from '../components/StatusBadge';
import AddArtisanModal from '../components/AddArtisanModal';
import AddMiddlemanModal from '../components/AddMiddlemanModal';
import AddExporterModal from '../components/AddExporterModal';
import EditArtisanModal from '../components/EditArtisanModal';
import EditProductModal from '../components/EditProductModal';

export default function AdminDashboard({ onVerifyDirect, onViewDetails }) {
  const [products, setProducts] = useState(getProducts());
  const [artisans, setArtisans] = useState(getArtisans());
  const [middlemen, setMiddlemen] = useState(getMiddlemen());
  const [exporters, setExporters] = useState(getExporters());
  const [actionNotice, setActionNotice] = useState('');
  const [addArtisanModalOpen, setAddArtisanModalOpen] = useState(false);
  const [addMiddlemanModalOpen, setAddMiddlemanModalOpen] = useState(false);
  const [addExporterModalOpen, setAddExporterModalOpen] = useState(false);

  const [editingArtisan, setEditingArtisan] = useState(null);
  const [editArtisanModalOpen, setEditArtisanModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editProductModalOpen, setEditProductModalOpen] = useState(false);

  const totalArtisans = artisans.length;
  const totalProducts = products.length;
  const verifiedProducts = products.filter(p => p.status === 'verified').length;
  const suspiciousProducts = products.filter(p => p.status === 'suspicious').length;
  const totalScans = products.reduce((acc, curr) => acc + (curr.scansCount || 0), 0);

  // Craft distribution counts
  const ajrakCount = products.filter(p => p.craftType?.toLowerCase().includes('ajrak')).length;
  const ralliCount = products.filter(p => p.craftType?.toLowerCase().includes('ralli')).length;
  const embroideryCount = products.filter(p => p.craftType?.toLowerCase().includes('embroidery')).length;
  const blockCount = products.filter(p => p.craftType?.toLowerCase().includes('block')).length;

  const showNotification = (msg) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(''), 3500);
  };

  const handleToggleStatus = (productId, currentStatus) => {
    const nextStatus = currentStatus === 'verified' ? 'suspicious' : 'verified';
    const reason = nextStatus === 'suspicious' 
      ? 'Manually flagged for physical audit by Sindh Craft Authority Inspector'
      : 'Approved & certified authentic by Sindh Craft Authority Inspector';

    const updated = updateProductStatus(productId, nextStatus, reason);
    if (updated) {
      setProducts(getProducts());
      showNotification(`Product ${productId} status updated to: ${nextStatus.toUpperCase()}`);
    }
  };

  const handleToggleArtisan = (artisanId, currentVerified) => {
    const updated = updateArtisanVerification(artisanId, !currentVerified);
    if (updated) {
      setArtisans(getArtisans());
      showNotification(`Artisan ${updated.name} verification status updated.`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0 shadow">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-bold text-white">
                  Sindh Craft & Culture Authority
                </h1>
                <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  Central Provenance Registry & Verification Desk
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Official oversight for authentic Ajrak, Ralli, and embroidery guilds across Sindh province
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-800/40">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Automated Anomaly Sentinel Active
            </span>
          </div>
        </div>

        {/* 5 Key Metric Cards */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs text-slate-400 font-medium block">Total Artisans</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-serif text-3xl font-extrabold text-white">{totalArtisans}</span>
              <span className="text-[11px] text-slate-400">Registered</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs text-slate-400 font-medium block">Registered Crafts</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-serif text-3xl font-extrabold text-white">{totalProducts}</span>
              <span className="text-[11px] text-slate-400">Total</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs text-slate-400 font-medium block">Verified Genuine</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-serif text-3xl font-extrabold text-emerald-400">{verifiedProducts}</span>
              <span className="text-[11px] text-emerald-400/80">Active</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs text-slate-400 font-medium block">Suspicious Flags</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-serif text-3xl font-extrabold text-rose-400">{suspiciousProducts}</span>
              <span className="text-[11px] text-rose-400/80">Anomalies</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 col-span-2 sm:col-span-1">
            <span className="text-xs text-slate-400 font-medium block">Total Scans</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-serif text-3xl font-extrabold text-amber-300">{totalScans}</span>
              <span className="text-[11px] text-slate-400">Public</span>
            </div>
          </div>
        </div>

      </div>

      {actionNotice && (
        <div className="p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs font-semibold animate-fadeIn flex items-center justify-between">
          <span>✓ {actionNotice}</span>
        </div>
      )}

      {/* ANALYTICS CHARTS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Products by Craft Chart */}
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-amber-400" />
              Products by Craft
            </h3>
            <span className="text-[10px] text-slate-400">Guild Volume</span>
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Sindhi Ajrak</span>
                <span className="font-bold text-white">{ajrakCount} crafts</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-rose-600 rounded-full" style={{ width: `${(ajrakCount / totalProducts) * 100}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Ralli Quilting</span>
                <span className="font-bold text-white">{ralliCount} crafts</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(ralliCount / totalProducts) * 100}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Sindhi Embroidery</span>
                <span className="font-bold text-white">{embroideryCount} crafts</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: `${(embroideryCount / totalProducts) * 100}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Block Printing</span>
                <span className="font-bold text-white">{blockCount} crafts</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(blockCount / totalProducts) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Verification Status Distribution */}
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Registry Integrity
            </h3>
            <span className="text-[10px] text-slate-400">Live Breakdown</span>
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Verified Genuine
                </span>
                <span className="font-bold text-emerald-400">{verifiedProducts} ({Math.round((verifiedProducts / totalProducts) * 100)}%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(verifiedProducts / totalProducts) * 100}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  Flagged Suspicious
                </span>
                <span className="font-bold text-rose-400">{suspiciousProducts} ({Math.round((suspiciousProducts / totalProducts) * 100)}%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full" style={{ width: `${(suspiciousProducts / totalProducts) * 100}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  Pending Inspection
                </span>
                <span className="font-bold text-amber-400">{totalProducts - verifiedProducts - suspiciousProducts}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${((totalProducts - verifiedProducts - suspiciousProducts) / totalProducts) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Scan & Anomaly Activity */}
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-rose-400" />
              Scan Geographic Distribution
            </h3>
            <span className="text-[10px] text-slate-400">Recent Cities</span>
          </div>

          <div className="space-y-2.5 pt-2 text-xs">
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-300">Karachi (Port & Bazaars)</span>
              <span className="font-mono font-bold text-amber-300">18 Scans</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-300">London, United Kingdom</span>
              <span className="font-mono font-bold text-amber-300">12 Scans</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-300">Dubai Souk, UAE</span>
              <span className="font-mono font-bold text-amber-300">9 Scans</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-300">Matiari Village Hub</span>
              <span className="font-mono font-bold text-amber-300">8 Scans</span>
            </div>
          </div>
        </div>

      </div>

      {/* VERIFICATION & AUDIT TABLE */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Central Registry Management</h3>
            <p className="text-xs text-slate-400">
              Inspect provenance data, approve pending crafts, or manually flag suspicious activities
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/70 text-slate-400 uppercase font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-3">Product ID</th>
                <th className="py-3 px-3">Craft Title</th>
                <th className="py-3 px-3">Artisan</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Scans</th>
                <th className="py-3 px-3 text-right">Admin Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {products.map((p) => (
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
                  <td className="py-3 px-3">
                    <StatusBadge status={p.status} size="sm" />
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-400">
                    {p.scansCount || 0}
                  </td>
                  <td className="py-3 px-3 text-right space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => {
                        setEditingProduct(p);
                        setEditProductModalOpen(true);
                      }}
                      className="py-1 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-[11px] font-semibold inline-flex items-center gap-1 cursor-pointer"
                      title="Change Craft Photo & Specifications"
                    >
                      <Camera className="w-3 h-3" />
                      <span>Photo</span>
                    </button>
                    <button
                      onClick={() => onVerifyDirect(p.productId)}
                      className="py-1 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold cursor-pointer"
                    >
                      Audit
                    </button>
                    <button
                      onClick={() => handleToggleStatus(p.productId, p.status)}
                      className={`py-1 px-2.5 rounded-lg text-white font-semibold text-[11px] cursor-pointer ${
                        p.status === 'verified'
                          ? 'bg-rose-700 hover:bg-rose-600'
                          : 'bg-emerald-700 hover:bg-emerald-600'
                      }`}
                    >
                      {p.status === 'verified' ? 'Flag Suspicious' : 'Approve Verified'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ARTISAN DIRECTORY & GUILD ACCREDITATION */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Master Artisan Accreditation Desk</h3>
            <p className="text-xs text-slate-400">Accredit master craftsmen and link village cooperatives</p>
          </div>
          <button
            onClick={() => setAddArtisanModalOpen(true)}
            className="flex items-center gap-1.5 py-2 px-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow transition cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>+ Accredit New Artisan</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {artisans.map((artisan) => (
            <div key={artisan.id} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={artisan.avatar}
                  alt={artisan.name}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-700"
                />
                <div>
                  <h4 className="text-xs font-bold text-white">{artisan.name}</h4>
                  <p className="text-[11px] text-slate-400">{artisan.village}, Sindh • {artisan.craftType}</p>
                  <span className={`text-[10px] font-bold ${artisan.verified ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {artisan.badge}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingArtisan(artisan);
                    setEditArtisanModalOpen(true);
                  }}
                  className="py-1.5 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold inline-flex items-center gap-1 transition border border-slate-700 cursor-pointer"
                  title="Edit Artisan Profile & Portrait"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleToggleArtisan(artisan.id, artisan.verified)}
                  className={`py-1.5 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
                    artisan.verified 
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' 
                      : 'bg-emerald-600 text-white hover:bg-emerald-500'
                  }`}
                >
                  {artisan.verified ? 'Revoke Review' : 'Certify Artisan'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SOURCING PARTNERS (MIDDLEMEN) ACCREDITATION DESK */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Truck className="w-5 h-5 text-blue-400" />
              <span>Sourcing Logistics Partners & Market Bridges ({middlemen.length})</span>
            </h3>
            <p className="text-xs text-slate-400">Accredit rural logistics coordinators and verify advance liquidity support</p>
          </div>
          <button
            onClick={() => setAddMiddlemanModalOpen(true)}
            className="flex items-center gap-1.5 py-2 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Enroll Sourcing Partner</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {middlemen.map((mid) => (
            <div key={mid.id} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">{mid.businessName}</h4>
                  <p className="text-[11px] text-slate-400">Lead: {mid.name} • Hub: {mid.hubLocation}</p>
                </div>
                <span className="text-[10px] font-bold text-blue-400 bg-blue-950/80 border border-blue-800/40 px-2 py-0.5 rounded">
                  {mid.verified ? 'Verified Logistics Bridge' : 'Pending Audit'}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/60 pt-2">
                <span>Supported: <strong className="text-slate-200">{mid.artisansSupported} Clusters</strong></span>
                <span>Advances: <strong className="text-emerald-400">{mid.advancePaymentsIssued}</strong></span>
                <span className="font-mono text-amber-300">{mid.phone}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EXPORT PARTNERS DESK */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-purple-400" />
              <span>Accredited Port Exporters & Terminals ({exporters.length})</span>
            </h3>
            <p className="text-xs text-slate-400">Supervise overseas trade firms licensed to issue international export certificates</p>
          </div>
          <button
            onClick={() => setAddExporterModalOpen(true)}
            className="flex items-center gap-1.5 py-2 px-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider shadow transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Enroll Exporter Firm</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exporters.map((firm) => (
            <div key={firm.id} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">{firm.company}</h4>
                  <p className="text-[11px] text-slate-400">Director: {firm.name} • {firm.headquarters}</p>
                </div>
                <span className="text-[10px] font-bold text-purple-400 bg-purple-950/80 border border-purple-800/40 px-2 py-0.5 rounded">
                  {firm.verified ? 'Customs Approved' : 'Pending Audit'}
                </span>
              </div>
              <div className="flex flex-wrap gap-1 pt-1">
                {firm.exportDestinations?.map((dest, i) => (
                  <span key={i} className="text-[10px] bg-slate-900 text-slate-300 border border-slate-800 px-1.5 py-0.5 rounded">
                    {dest}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Artisan Modal */}
      <AddArtisanModal
        isOpen={addArtisanModalOpen}
        onClose={() => setAddArtisanModalOpen(false)}
        onArtisanAdded={(newArtisan) => {
          setArtisans(getArtisans());
          showNotification(`Artisan ${newArtisan.name} successfully accredited!`);
        }}
      />

      {/* Add Middleman Modal */}
      <AddMiddlemanModal
        isOpen={addMiddlemanModalOpen}
        onClose={() => setAddMiddlemanModalOpen(false)}
        onMiddlemanAdded={(newMid) => {
          setMiddlemen(getMiddlemen());
          showNotification(`Sourcing Partner ${newMid.businessName} enrolled!`);
        }}
      />

      {/* Add Exporter Modal */}
      <AddExporterModal
        isOpen={addExporterModalOpen}
        onClose={() => setAddExporterModalOpen(false)}
        onExporterAdded={(newExp) => {
          setExporters(getExporters());
          showNotification(`Exporter ${newExp.company} accredited!`);
        }}
      />

      {/* Edit Artisan Modal */}
      <EditArtisanModal
        artisan={editingArtisan}
        isOpen={editArtisanModalOpen}
        onClose={() => {
          setEditArtisanModalOpen(false);
          setEditingArtisan(null);
        }}
        onArtisanUpdated={(updated) => {
          setArtisans(getArtisans());
          setProducts(getProducts());
          showNotification(`Artisan ${updated.name} profile & portrait updated!`);
        }}
      />

      {/* Edit Product Modal */}
      <EditProductModal
        product={editingProduct}
        isOpen={editProductModalOpen}
        onClose={() => {
          setEditProductModalOpen(false);
          setEditingProduct(null);
        }}
        onProductUpdated={(updated) => {
          setProducts(getProducts());
          showNotification(`Product ${updated.productId} photograph & dossier updated!`);
        }}
      />

    </div>
  );
}
