import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import PublicVerificationPage from './pages/PublicVerificationPage';
import ArtisanDashboard from './pages/ArtisanDashboard';
import RegisterProductPage from './pages/RegisterProductPage';
import MiddlemanDashboard from './pages/MiddlemanDashboard';
import ExporterDashboard from './pages/ExporterDashboard';
import AdminDashboard from './pages/AdminDashboard';
import CraftStoryPage from './pages/CraftStoryPage';
import HowItWorksPage from './pages/HowItWorksPage';
import PitchJudgeGuide from './pages/PitchJudgeGuide';

import LiveProvenanceTicker from './components/LiveProvenanceTicker';
import QRCodeModal from './components/QRCodeModal';
import ProductDetailsModal from './components/ProductDetailsModal';
import ScanSimulatorModal from './components/ScanSimulatorModal';
import ExportReportModal from './components/ExportReportModal';
import EditProductModal from './components/EditProductModal';
import { initializeStorage } from './services/storageService';

export default function App() {
  const [currentTab, setCurrentTab] = useState('landing');
  const [userRole, setUserRole] = useState('artisan');
  const [verifyProductId, setVerifyProductId] = useState('AJ-2026-00125');

  // Theme state: defaults to 'light' per user request
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('crafttrace_theme') || 'light';
  });

  // Modal states
  const [selectedQRProduct, setSelectedQRProduct] = useState(null);
  const [selectedDetailsProduct, setSelectedDetailsProduct] = useState(null);
  const [selectedExportProduct, setSelectedExportProduct] = useState(null);
  const [editingProductGlobal, setEditingProductGlobal] = useState(null);
  const [scanModalOpen, setScanModalOpen] = useState(false);

  // Sync theme changes with localStorage and document body
  useEffect(() => {
    localStorage.setItem('crafttrace_theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    } else {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    }
  }, [theme]);

  // Initialize storage on first load and parse URL hash if scanned
  useEffect(() => {
    initializeStorage();

    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#verify')) {
        const params = new URLSearchParams(hash.replace('#verify', ''));
        const id = params.get('id');
        if (id) {
          setVerifyProductId(id);
          setCurrentTab('verify');
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Handlers
  const handleOpenQR = (product) => {
    setSelectedQRProduct(product);
  };

  const handleViewDetails = (product) => {
    setSelectedDetailsProduct(product);
  };

  const handleVerifyDirect = (productId) => {
    setVerifyProductId(productId);
    setCurrentTab('verify');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenerateReport = (product) => {
    setSelectedExportProduct(product);
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'light' ? 'light-mode' : 'dark-mode'} bg-ajrak-pattern text-slate-100 selection:bg-amber-500 selection:text-slate-950 font-sans transition-colors duration-300`}>
      
      {/* Sticky Navigation Header */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        userRole={userRole}
        setUserRole={setUserRole}
        theme={theme}
        setTheme={setTheme}
        onOpenScanModal={() => setScanModalOpen(true)}
      />

      {/* Real-time Provenance Marquee Ticker */}
      <LiveProvenanceTicker onVerifyClick={handleVerifyDirect} />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'landing' && (
          <LandingPage
            setCurrentTab={setCurrentTab}
            onOpenScanModal={() => setScanModalOpen(true)}
            onVerifyDirect={handleVerifyDirect}
          />
        )}

        {currentTab === 'verify' && (
          <PublicVerificationPage
            initialProductId={verifyProductId}
            onViewStory={(craft) => setCurrentTab('craft-stories')}
            onOpenScanModal={() => setScanModalOpen(true)}
          />
        )}

        {currentTab === 'artisan-dashboard' && (
          <ArtisanDashboard
            onNavigateRegister={() => setCurrentTab('register-product')}
            onOpenQR={handleOpenQR}
            onViewDetails={handleViewDetails}
            onVerifyDirect={handleVerifyDirect}
          />
        )}

        {currentTab === 'register-product' && (
          <RegisterProductPage
            onBack={() => setCurrentTab('artisan-dashboard')}
            onOpenPublicPage={handleVerifyDirect}
            onOpenQR={handleOpenQR}
          />
        )}

        {currentTab === 'middleman-dashboard' && (
          <MiddlemanDashboard
            onOpenQR={handleOpenQR}
            onViewDetails={handleViewDetails}
            onVerifyDirect={handleVerifyDirect}
          />
        )}

        {currentTab === 'exporter-dashboard' && (
          <ExporterDashboard
            onGenerateReport={handleGenerateReport}
            onViewDetails={handleViewDetails}
            onVerifyDirect={handleVerifyDirect}
          />
        )}

        {currentTab === 'admin-dashboard' && (
          <AdminDashboard
            onVerifyDirect={handleVerifyDirect}
            onViewDetails={handleViewDetails}
          />
        )}

        {currentTab === 'craft-stories' && (
          <CraftStoryPage
            onVerifyDirect={handleVerifyDirect}
          />
        )}

        {currentTab === 'how-it-works' && (
          <HowItWorksPage
            onVerifyDirect={handleVerifyDirect}
          />
        )}

        {currentTab === 'pitch-guide' && (
          <PitchJudgeGuide />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        setCurrentTab={setCurrentTab}
        onResetData={() => {
          setVerifyProductId('AJ-2026-00125');
        }}
      />

      {/* QR Code Modal */}
      <QRCodeModal
        product={selectedQRProduct}
        isOpen={Boolean(selectedQRProduct)}
        onClose={() => setSelectedQRProduct(null)}
        onOpenPublicPage={handleVerifyDirect}
      />

      {/* Product Details Modal */}
      <ProductDetailsModal
        product={selectedDetailsProduct}
        isOpen={Boolean(selectedDetailsProduct)}
        onClose={() => setSelectedDetailsProduct(null)}
        onOpenQR={handleOpenQR}
        onEditProduct={(p) => setEditingProductGlobal(p)}
      />

      {/* Global Edit Product & Picture Modal */}
      <EditProductModal
        product={editingProductGlobal}
        isOpen={Boolean(editingProductGlobal)}
        onClose={() => setEditingProductGlobal(null)}
        onProductUpdated={(updated) => {
          setSelectedDetailsProduct(updated);
        }}
      />

      {/* Scan Simulator Modal */}
      <ScanSimulatorModal
        isOpen={scanModalOpen}
        onClose={() => setScanModalOpen(false)}
        onVerifyId={handleVerifyDirect}
      />

      {/* Export Report / Dossier Modal */}
      <ExportReportModal
        product={selectedExportProduct}
        isOpen={Boolean(selectedExportProduct)}
        onClose={() => setSelectedExportProduct(null)}
      />

    </div>
  );
}
