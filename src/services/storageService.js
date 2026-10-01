// CraftTrace Storage and Provenance Engine
// LocalStorage persistent store with Supabase compatibility layer

import { INITIAL_ARTISANS, INITIAL_PRODUCTS, INITIAL_MIDDLEMEN, INITIAL_EXPORTERS } from '../data/mockData';

const STORAGE_KEYS = {
  PRODUCTS: 'crafttrace_products_v1',
  ARTISANS: 'crafttrace_artisans_v1',
  MIDDLEMEN: 'crafttrace_middlemen_v1',
  EXPORTERS: 'crafttrace_exporters_v1',
  SCANS: 'crafttrace_scans_v1',
};

// Initialize default state if not already populated
export function initializeStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ARTISANS)) {
    localStorage.setItem(STORAGE_KEYS.ARTISANS, JSON.stringify(INITIAL_ARTISANS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.MIDDLEMEN)) {
    localStorage.setItem(STORAGE_KEYS.MIDDLEMEN, JSON.stringify(INITIAL_MIDDLEMEN));
  }
  if (!localStorage.getItem(STORAGE_KEYS.EXPORTERS)) {
    localStorage.setItem(STORAGE_KEYS.EXPORTERS, JSON.stringify(INITIAL_EXPORTERS));
  }
}

// Reset data to default seed anytime for demo rehearsals
export function resetDemoData() {
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
  localStorage.setItem(STORAGE_KEYS.ARTISANS, JSON.stringify(INITIAL_ARTISANS));
  localStorage.setItem(STORAGE_KEYS.MIDDLEMEN, JSON.stringify(INITIAL_MIDDLEMEN));
  localStorage.setItem(STORAGE_KEYS.EXPORTERS, JSON.stringify(INITIAL_EXPORTERS));
  return { success: true };
}

// ================= PRODUCT METHODS =================
export function getProducts() {
  initializeStorage();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return raw ? JSON.parse(raw) : INITIAL_PRODUCTS;
  } catch (e) {
    console.error('Failed to parse products from localStorage', e);
    return INITIAL_PRODUCTS;
  }
}

export function getProductById(productId) {
  if (!productId) return null;
  const products = getProducts();
  const normalizedSearch = productId.trim().toUpperCase();
  return products.find(p => p.productId.toUpperCase() === normalizedSearch) || null;
}

export function registerNewProduct(productData) {
  const products = getProducts();
  
  // Prefix generator by craft type
  let prefix = "AJ";
  const craft = (productData.craftType || "").toLowerCase();
  if (craft.includes("ralli")) prefix = "RL";
  else if (craft.includes("embroidery")) prefix = "EM";
  else if (craft.includes("block")) prefix = "BP";
  else if (craft.includes("ajrak")) prefix = "AJ";
  else prefix = "CT";

  // Generate unique formatted Product ID
  const randomSeq = Math.floor(10000 + Math.random() * 90000);
  const newProductId = `${prefix}-2026-${randomSeq.toString().slice(-4)}`;

  const newProduct = {
    id: `prod-${Date.now()}`,
    productId: newProductId,
    artisanId: productData.artisanId || "artisan-1",
    artisanName: productData.artisanName || "Ayesha Bibi",
    artisanVillage: productData.origin || "Matiari, Sindh, Pakistan",
    productName: productData.productName || "Traditional Handcrafted Sindhi Piece",
    craftType: productData.craftType || "Ajrak",
    technique: productData.technique || "Hand Printed",
    origin: productData.origin || "Matiari, Sindh, Pakistan",
    productionDate: productData.productionDate || "October 2026",
    productionTime: productData.productionTime || "21 Days",
    priceEstimate: productData.priceEstimate || "PKR 12,000",
    status: "verified", // Default verified for demonstration
    description: productData.description || "Authentic handmade heritage craft created using traditional Sindhi techniques.",
    craftStory: productData.craftStory || "Handcrafted with generational mastery along the Indus basin, preserving ancient Sindhi heritage.",
    image: productData.image || "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80",
    processImages: productData.processImages && productData.processImages.length > 0 
      ? productData.processImages 
      : ["https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80"],
    materials: productData.materials || "Natural cotton, organic vegetable dyes",
    dimensions: productData.dimensions || "Standard Handcrafted Dimension",
    batchNumber: `CT-2026-${Math.floor(100 + Math.random() * 900)}`,
    exportGrade: "Grade-A Export Verified",
    verifiedBy: "Sindh Craft & Culture Authority (Self-Reg Verified)",
    scansCount: 0,
    scans: [
      {
        id: `s-${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        location: productData.origin || "Matiari, Sindh",
        city: "Matiari",
        device: "Artisan Registration Terminal",
        result: "Registered & Verified"
      }
    ],
    timeline: [
      { step: "Craft Registered", date: new Date().toISOString().split('T')[0], detail: `Registered by ${productData.artisanName}` },
      { step: "QR Identity Generated", date: new Date().toISOString().split('T')[0], detail: "Digital Provenance Identity Activated" }
    ]
  };

  const updated = [newProduct, ...products];
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
  return newProduct;
}

// Record a public verification scan with anti-fraud anomaly tracking
export function recordProductScan(productId, scanContext = {}) {
  const products = getProducts();
  const index = products.findIndex(p => p.productId.toUpperCase() === productId.toUpperCase());
  if (index === -1) return null;

  const product = products[index];
  const newScanCount = (product.scansCount || 0) + 1;

  const newScan = {
    id: `scan-${Date.now()}`,
    timestamp: new Date().toLocaleString(),
    location: scanContext.location || "Public Scan Terminal",
    city: scanContext.city || "Karachi",
    device: scanContext.device || "Mobile Browser",
    result: product.status === "suspicious" ? "Flagged" : "Verified"
  };

  const updatedScans = [newScan, ...(product.scans || [])];
  
  // Anti-fraud logic: If scans exceed threshold with different cities, trigger anomaly status
  let updatedStatus = product.status;
  let suspiciousReason = product.suspiciousReason;
  
  const distinctCities = new Set(updatedScans.map(s => s.city));
  if (newScanCount >= 10 && distinctCities.size >= 4 && product.status !== "suspicious") {
    updatedStatus = "suspicious";
    suspiciousReason = `Automated Fraud Alert: ${newScanCount} scans recorded across ${distinctCities.size} distinct cities in short interval. Possible QR code duplication.`;
  }

  const updatedProduct = {
    ...product,
    scansCount: newScanCount,
    status: updatedStatus,
    suspiciousReason,
    scans: updatedScans
  };

  products[index] = updatedProduct;
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  return updatedProduct;
}

// Update status by Admin / Verifier
export function updateProductStatus(productId, newStatus, reason = "") {
  const products = getProducts();
  const index = products.findIndex(p => p.productId.toUpperCase() === productId.toUpperCase());
  if (index === -1) return null;

  products[index] = {
    ...products[index],
    status: newStatus,
    suspiciousReason: newStatus === "suspicious" ? reason || "Flagged by Sindh Craft Authority Inspector" : undefined,
    timeline: [
      ...(products[index].timeline || []),
      { step: `Status Changed to ${newStatus.toUpperCase()}`, date: new Date().toISOString().split('T')[0], detail: reason || "Administrative update" }
    ]
  };

  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  return products[index];
}

// Update product details and/or picture
export function updateProduct(productId, updatedData) {
  const products = getProducts();
  const index = products.findIndex(p => p.productId.toUpperCase() === productId.toUpperCase());
  if (index === -1) return null;

  const current = products[index];
  const updatedProduct = {
    ...current,
    ...updatedData,
    timeline: [
      ...(current.timeline || []),
      { 
        step: "Product Dossier & Visual Record Updated", 
        date: new Date().toISOString().split('T')[0], 
        detail: "Craft details or authentic provenance photograph updated." 
      }
    ]
  };

  products[index] = updatedProduct;
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  return updatedProduct;
}

// ================= ARTISAN METHODS =================
export function getArtisans() {
  initializeStorage();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ARTISANS);
    return raw ? JSON.parse(raw) : INITIAL_ARTISANS;
  } catch (e) {
    return INITIAL_ARTISANS;
  }
}

export function getArtisanById(artisanId) {
  const artisans = getArtisans();
  return artisans.find(a => a.id === artisanId) || null;
}

export function updateArtisanVerification(artisanId, verified) {
  const artisans = getArtisans();
  const idx = artisans.findIndex(a => a.id === artisanId);
  if (idx === -1) return null;
  artisans[idx].verified = verified;
  artisans[idx].badge = verified ? "Master Artisan (Grade A)" : "Pending Review";
  localStorage.setItem(STORAGE_KEYS.ARTISANS, JSON.stringify(artisans));
  return artisans[idx];
}

export function updateArtisanDetails(artisanId, updatedData) {
  const artisans = getArtisans();
  const idx = artisans.findIndex(a => a.id === artisanId);
  if (idx === -1) return null;

  const oldName = artisans[idx].name;
  const updatedArtisan = {
    ...artisans[idx],
    ...updatedData
  };

  artisans[idx] = updatedArtisan;
  localStorage.setItem(STORAGE_KEYS.ARTISANS, JSON.stringify(artisans));

  // If artisan name was changed, sync products associated with this artisan
  if (updatedData.name && updatedData.name !== oldName) {
    const products = getProducts();
    let hasProductChanges = false;
    const syncedProducts = products.map(p => {
      if (p.artisanId === artisanId || p.artisanName === oldName) {
        hasProductChanges = true;
        return { ...p, artisanName: updatedData.name };
      }
      return p;
    });
    if (hasProductChanges) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(syncedProducts));
    }
  }

  return updatedArtisan;
}

export function registerNewArtisan(artisanData) {
  const artisans = getArtisans();
  const newArtisan = {
    id: `artisan-${Date.now()}`,
    name: artisanData.name || "New Artisan",
    phone: artisanData.phone || "+92 300 0000000",
    village: artisanData.village || "Matiari",
    district: artisanData.district || "Matiari",
    province: "Sindh",
    craftType: artisanData.craftType || "Ajrak",
    experienceYears: parseInt(artisanData.experienceYears || "10", 10),
    cooperative: artisanData.cooperative || "Sindh Indigenous Craft Guild",
    verified: artisanData.verified !== undefined ? artisanData.verified : true,
    avatar: artisanData.avatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    bio: artisanData.bio || "Master artisan carrying generational Sindhi handmade craftsmanship along the Indus basin.",
    registeredAt: new Date().toISOString().split('T')[0],
    totalProductsRegistered: 0,
    badge: artisanData.verified ? "Master Artisan (Grade A)" : "Pending Review"
  };

  const updated = [newArtisan, ...artisans];
  localStorage.setItem(STORAGE_KEYS.ARTISANS, JSON.stringify(updated));
  return newArtisan;
}

export function getMiddlemen() {
  initializeStorage();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MIDDLEMEN);
    return raw ? JSON.parse(raw) : INITIAL_MIDDLEMEN;
  } catch (e) {
    return INITIAL_MIDDLEMEN;
  }
}

export function registerNewMiddleman(data) {
  const middlemen = getMiddlemen();
  const newMiddleman = {
    id: `mid-${Date.now()}`,
    name: data.name || "New Sourcing Partner",
    businessName: data.businessName || "Indus Regional Craft Logistics",
    phone: data.phone || "+92 321 0000000",
    hubLocation: data.hubLocation || "Hyderabad, Sindh",
    artisansSupported: parseInt(data.artisansSupported || "5", 10),
    advancePaymentsIssued: data.advancePaymentsIssued || "PKR 250,000",
    verified: data.verified !== undefined ? data.verified : true,
    roleDescription: data.roleDescription || "Connects rural craft clusters with urban markets and port exporters while providing upfront cash advances."
  };

  const updated = [newMiddleman, ...middlemen];
  localStorage.setItem(STORAGE_KEYS.MIDDLEMEN, JSON.stringify(updated));
  return newMiddleman;
}

export function getExporters() {
  initializeStorage();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EXPORTERS);
    return raw ? JSON.parse(raw) : INITIAL_EXPORTERS;
  } catch (e) {
    return INITIAL_EXPORTERS;
  }
}

export function registerNewExporter(data) {
  const exporters = getExporters();
  const newExporter = {
    id: `exp-${Date.now()}`,
    name: data.name || "Export Director",
    company: data.company || "Indus Heritage Trade Ltd.",
    country: data.country || "Pakistan & International",
    headquarters: data.headquarters || "Karachi Port Trust Complex, Karachi",
    exportDestinations: data.exportDestinations ? (Array.isArray(data.exportDestinations) ? data.exportDestinations : data.exportDestinations.split(',').map(s => s.trim())) : ["London, UK", "Milan, Italy", "Dubai, UAE"],
    verified: data.verified !== undefined ? data.verified : true,
    annualShipments: parseInt(data.annualShipments || "50", 10)
  };

  const updated = [newExporter, ...exporters];
  localStorage.setItem(STORAGE_KEYS.EXPORTERS, JSON.stringify(updated));
  return newExporter;
}
