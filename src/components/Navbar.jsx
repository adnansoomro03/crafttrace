import React, { useState } from 'react';
import { 
  ShieldCheck, QrCode, Sparkles, User, ChevronDown, 
  Menu, X, ExternalLink, Award, FileText, HelpCircle, 
  Layers, Truck, Store, Sun, Moon
} from 'lucide-react';

export default function Navbar({ 
  currentTab, 
  setCurrentTab, 
  userRole, 
  setUserRole, 
  theme,
  setTheme,
  onOpenScanModal 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const roles = [
    { id: 'artisan', label: 'Artisan', name: 'Ayesha Bibi (Matiari)', icon: User, color: 'text-amber-400' },
    { id: 'middleman', label: 'Middleman', name: 'Tariq Khan (Logistics)', icon: Truck, color: 'text-blue-400' },
    { id: 'exporter', label: 'Exporter', name: 'Zeeshan Ali (Global)', icon: Award, color: 'text-purple-400' },
    { id: 'admin', label: 'Admin Verifier', name: 'Sindh Craft Authority', icon: ShieldCheck, color: 'text-emerald-400' },
    { id: 'buyer', label: 'Public Buyer', name: 'Instant Verify (No Login)', icon: Store, color: 'text-rose-400' }
  ];

  const currentRoleObj = roles.find(r => r.id === userRole) || roles[0];

  const handleNavClick = (tab) => {
    setCurrentTab(tab);
    setMobileMenuOpen(false);
  };

  const handleRoleSelect = (roleId) => {
    setUserRole(roleId);
    setRoleDropdownOpen(false);
    // Auto-navigate to respective dashboard
    if (roleId === 'artisan') setCurrentTab('artisan-dashboard');
    else if (roleId === 'middleman') setCurrentTab('middleman-dashboard');
    else if (roleId === 'exporter') setCurrentTab('exporter-dashboard');
    else if (roleId === 'admin') setCurrentTab('admin-dashboard');
    else if (roleId === 'buyer') setCurrentTab('verify');
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="h-1 w-full bg-gradient-to-r from-rose-800 via-amber-500 via-indigo-900 to-rose-800 opacity-90 shadow-sm" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Cultural Geometric Icon */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-900 via-rose-800 to-amber-700 p-0.5 shadow-lg group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-slate-950/80 rounded-[10px] flex items-center justify-center relative overflow-hidden">
                <span className="font-serif font-black text-amber-400 text-sm tracking-wider">CT</span>
                {/* Decorative dot */}
                <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-rose-500 rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-lg md:text-xl font-bold tracking-tight text-white group-hover:text-amber-300 transition">
                  CRAFTTRACE
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-rose-950/80 text-rose-300 border border-rose-800/50 px-1.5 py-0.2 rounded">
                  Sindh
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block tracking-wide">
                Digital Provenance & Authentication
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold text-slate-300">
            <button
              onClick={() => handleNavClick('landing')}
              className={`px-3 py-2 rounded-xl transition ${
                currentTab === 'landing' ? 'bg-slate-800 text-white font-bold' : 'hover:text-white hover:bg-slate-900'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('verify')}
              className={`px-3 py-2 rounded-xl transition flex items-center gap-1.5 ${
                currentTab === 'verify' ? 'bg-rose-950/70 text-rose-300 border border-rose-800/40' : 'hover:text-white hover:bg-slate-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
              Public Verification
            </button>
            <button
              onClick={() => handleNavClick('artisan-dashboard')}
              className={`px-3 py-2 rounded-xl transition ${
                currentTab === 'artisan-dashboard' ? 'bg-slate-800 text-white font-bold' : 'hover:text-white hover:bg-slate-900'
              }`}
            >
              Artisans
            </button>
            <button
              onClick={() => handleNavClick('middleman-dashboard')}
              className={`px-3 py-2 rounded-xl transition ${
                currentTab === 'middleman-dashboard' ? 'bg-slate-800 text-white font-bold' : 'hover:text-white hover:bg-slate-900'
              }`}
            >
              Middlemen
            </button>
            <button
              onClick={() => handleNavClick('exporter-dashboard')}
              className={`px-3 py-2 rounded-xl transition ${
                currentTab === 'exporter-dashboard' ? 'bg-slate-800 text-white font-bold' : 'hover:text-white hover:bg-slate-900'
              }`}
            >
              Exporters
            </button>
            <button
              onClick={() => handleNavClick('admin-dashboard')}
              className={`px-3 py-2 rounded-xl transition ${
                currentTab === 'admin-dashboard' ? 'bg-slate-800 text-white font-bold' : 'hover:text-white hover:bg-slate-900'
              }`}
            >
              Guild Admin
            </button>
            <button
              onClick={() => handleNavClick('craft-stories')}
              className={`px-3 py-2 rounded-xl transition ${
                currentTab === 'craft-stories' ? 'bg-slate-800 text-white font-bold' : 'hover:text-white hover:bg-slate-900'
              }`}
            >
              Craft Stories
            </button>
            <button
              onClick={() => handleNavClick('pitch-guide')}
              className={`px-2.5 py-1.5 rounded-lg transition border border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 font-bold`}
            >
              Pitch & Q&A
            </button>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2">
            
            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme && setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-500 text-amber-400 hover:text-amber-300 transition cursor-pointer shadow-sm flex items-center justify-center"
              title={theme === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 text-slate-700" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400" />
              )}
            </button>

            {/* Scan QR Button */}
            <button
              onClick={onOpenScanModal}
              className="flex items-center gap-1.5 py-2 px-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-amber-500/20 transition transform active:scale-95 cursor-pointer"
            >
              <QrCode className="w-4 h-4" />
              <span>Scan QR</span>
            </button>

            {/* Role Switcher Pill */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="hidden sm:flex items-center gap-2 py-1.5 px-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-xs text-slate-200 transition"
              >
                <currentRoleObj.icon className={`w-3.5 h-3.5 ${currentRoleObj.color}`} />
                <div className="text-left">
                  <span className="block text-[10px] text-slate-400 leading-tight">Role:</span>
                  <span className="font-bold text-white leading-tight">{currentRoleObj.label}</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Role Dropdown */}
              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-2 z-50 animate-fadeIn">
                  <div className="p-2 border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Demo Role Switcher
                  </div>
                  <div className="mt-1 space-y-1">
                    {roles.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => handleRoleSelect(r.id)}
                        className={`w-full flex items-center gap-3 p-2 rounded-xl text-left transition ${
                          userRole === r.id ? 'bg-slate-800 text-white font-bold' : 'hover:bg-slate-800/60 text-slate-300'
                        }`}
                      >
                        <div className={`p-1.5 rounded-lg bg-slate-950 border border-slate-800 ${r.color}`}>
                          <r.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold">{r.label}</div>
                          <div className="text-[10px] text-slate-400">{r.name}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          <div className="p-2 bg-slate-900 rounded-xl mb-3">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Active Persona:</span>
            <div className="grid grid-cols-2 gap-1.5">
              {roles.map((r) => (
                <button
                  key={r.id}
                  onClick={() => handleRoleSelect(r.id)}
                  className={`py-1.5 px-2 rounded-lg text-left text-xs ${
                    userRole === r.id ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => handleNavClick('landing')} className="w-full text-left py-2 px-3 rounded-lg text-sm text-slate-200 hover:bg-slate-900">
            Home
          </button>
          <button onClick={() => handleNavClick('verify')} className="w-full text-left py-2 px-3 rounded-lg text-sm text-rose-300 font-semibold hover:bg-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-rose-400" />
            Public Verification Page
          </button>
          <button onClick={() => handleNavClick('artisan-dashboard')} className="w-full text-left py-2 px-3 rounded-lg text-sm text-slate-200 hover:bg-slate-900">
            Artisan Dashboard
          </button>
          <button onClick={() => handleNavClick('register-product')} className="w-full text-left py-2 px-3 rounded-lg text-sm text-slate-200 hover:bg-slate-900">
            + Register New Craft
          </button>
          <button onClick={() => handleNavClick('middleman-dashboard')} className="w-full text-left py-2 px-3 rounded-lg text-sm text-slate-200 hover:bg-slate-900">
            Middleman Dashboard
          </button>
          <button onClick={() => handleNavClick('exporter-dashboard')} className="w-full text-left py-2 px-3 rounded-lg text-sm text-slate-200 hover:bg-slate-900">
            Exporter Dashboard
          </button>
          <button onClick={() => handleNavClick('admin-dashboard')} className="w-full text-left py-2 px-3 rounded-lg text-sm text-slate-200 hover:bg-slate-900">
            Guild Admin Dashboard
          </button>
          <button onClick={() => handleNavClick('craft-stories')} className="w-full text-left py-2 px-3 rounded-lg text-sm text-slate-200 hover:bg-slate-900">
            Craft Stories
          </button>
          <button onClick={() => handleNavClick('how-it-works')} className="w-full text-left py-2 px-3 rounded-lg text-sm text-slate-200 hover:bg-slate-900">
            How It Works & Anti-Fraud
          </button>
          <button 
            onClick={() => setTheme && setTheme(theme === 'light' ? 'dark' : 'light')} 
            className="w-full text-left py-2 px-3 rounded-lg text-sm text-amber-400 hover:bg-slate-900 flex items-center justify-between"
          >
            <span>Theme: {theme === 'light' ? 'Light Theme (Active)' : 'Dark Theme (Active)'}</span>
            {theme === 'light' ? <Moon className="w-4 h-4 text-slate-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>
          <button onClick={() => handleNavClick('pitch-guide')} className="w-full text-left py-2 px-3 rounded-lg text-sm text-amber-300 font-bold bg-amber-500/10">
            3-Min Pitch & Judge Q&A Guide
          </button>
        </div>
      )}
    </header>
  );
}
