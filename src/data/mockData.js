// CraftTrace Initial Seed & Demo Data
// Cultural provenance data for Sindhi handmade heritage crafts

export const INITIAL_ARTISANS = [
  {
    id: "artisan-1",
    name: "Ayesha Bibi",
    phone: "+92 300 8129411",
    village: "Matiari",
    district: "Matiari",
    province: "Sindh",
    craftType: "Ajrak",
    experienceYears: 24,
    cooperative: "Sindh Indigenous Craft Guild",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    bio: "Master artisan carrying 4 generations of traditional 16-step natural indigo and alizarin hand-block Ajrak craft along the Indus basin.",
    registeredAt: "2024-03-15",
    totalProductsRegistered: 18,
    badge: "Master Artisan (Grade A)"
  },
  {
    id: "artisan-2",
    name: "Shazia Bibi",
    phone: "+92 301 7543219",
    village: "Garelo",
    district: "Larkana",
    province: "Sindh",
    craftType: "Ralli",
    experienceYears: 19,
    cooperative: "Larkana Rural Women Artisans",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    bio: "Celebrated quilter specializing in geometric 'Tuk' appliqué and vibrant multi-layer patchwork Rallis made entirely with hand stitching.",
    registeredAt: "2024-05-20",
    totalProductsRegistered: 12,
    badge: "Master Artisan (Grade A)"
  },
  {
    id: "artisan-3",
    name: "Mai Janki",
    phone: "+92 304 9918234",
    village: "Islamkot",
    district: "Tharparkar",
    province: "Sindh",
    craftType: "Sindhi Embroidery",
    experienceYears: 31,
    cooperative: "Thar Desert Craft Collective",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    bio: "Pioneer of authentic Sheesha (mirror-work) and Hurmitch embroidery, using silk threads naturally dyed from desert roots.",
    registeredAt: "2024-07-10",
    totalProductsRegistered: 9,
    badge: "Senior Master Craftsman"
  },
  {
    id: "artisan-4",
    name: "Ghulam Sarwar",
    phone: "+92 302 4432190",
    village: "Bhit Shah",
    district: "Matiari",
    province: "Sindh",
    craftType: "Block Printing",
    experienceYears: 14,
    cooperative: "Indus Craft Heritage",
    verified: false,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    bio: "Fourth generation carver of traditional Sheesham wood blocks and natural pigment block printer.",
    registeredAt: "2026-09-01",
    totalProductsRegistered: 4,
    badge: "Application In Review"
  }
];

export const INITIAL_PRODUCTS = [
  {
    id: "prod-1",
    productId: "AJ-2026-00125",
    artisanId: "artisan-1",
    artisanName: "Ayesha Bibi",
    artisanVillage: "Matiari, Sindh",
    productName: "Teli Ajrak 16-Step Indigo Handprint",
    craftType: "Ajrak",
    technique: "Hand Block Printed with Natural Indigo & Madder",
    origin: "Matiari, Sindh, Pakistan",
    productionDate: "September 2026",
    productionTime: "21 Days (16 Stages)",
    priceEstimate: "PKR 14,500 (~$52 USD)",
    status: "verified", // 'verified' | 'unverified' | 'suspicious'
    description: "An authentic traditional double-sided Teli Ajrak printed on pure cotton using wooden blocks hand-carved from acacia wood. Dyed with organic indigo and Rubia tinctorum (alizarin), cured with camel-dung wash and Indus river sunlight.",
    craftStory: "Crafted in Matiari, this Ajrak represents 4,500 years of civilization tracing back to the Priest-King of Mohenjo-Daro. Ayesha Bibi soaked the cotton in mustard oil for days before meticulously applying resist pastes and natural indigo. Machine copies wash out in two cycles, but this authentic piece will deepen in luster over decades.",
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80",
    processImages: [
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80"
    ],
    materials: "100% Unbleached Indus Cotton, Natural Indigo, Madder (Manjishtha), Fuller's Earth",
    dimensions: "2.5m x 1.2m (Shawl/Chadar)",
    batchNumber: "MT-2026-SEP-04",
    exportGrade: "Grade-A Museum Heritage Quality",
    verifiedBy: "Sindh Craft & Culture Authority (Inspector #PK-782)",
    scansCount: 4,
    scans: [
      { id: "s-1", timestamp: "2026-09-18 10:20 AM", location: "Matiari, Sindh", city: "Matiari", device: "Artisan Registration Unit", result: "Registered" },
      { id: "s-2", timestamp: "2026-09-22 03:45 PM", location: "Indus Logistics Hub, Hyderabad", city: "Hyderabad", device: "Middleman Handheld", result: "Verified" },
      { id: "s-3", timestamp: "2026-09-25 11:15 AM", location: "Sindh Heritage Export Terminal, Karachi", city: "Karachi", device: "Port Scanner", result: "Verified" },
      { id: "s-4", timestamp: "2026-09-30 02:10 PM", location: "Artisan Boutique, London, UK", city: "London", device: "Buyer iPhone 15", result: "Verified" }
    ],
    timeline: [
      { step: "Craft Registered", date: "2026-09-18", detail: "Registered by Ayesha Bibi with making photos" },
      { step: "Inspector Verification", date: "2026-09-20", detail: "Physical audit by Sindh Craft Authority" },
      { step: "QR Identity Tag Attached", date: "2026-09-21", detail: "Tamper-evident thread tag sewn onto hem" },
      { step: "Transferred to Exporter", date: "2026-09-25", detail: "Consigned to Sindh Heritage Global Exports" },
      { step: "Overseas Arrival", date: "2026-09-30", detail: "Verified authentic by buyer in London" }
    ]
  },
  {
    id: "prod-2",
    productId: "RL-2026-00126",
    artisanId: "artisan-2",
    artisanName: "Shazia Bibi",
    artisanVillage: "Garelo, Larkana",
    productName: "Tuk Geometric Hand-Stitched Ralli",
    craftType: "Ralli",
    technique: "Multi-layered Hand Patchwork & Appliqué (Tuk)",
    origin: "Larkana, Sindh, Pakistan",
    productionDate: "August 2026",
    productionTime: "38 Days",
    priceEstimate: "PKR 22,000 (~$78 USD)",
    status: "verified",
    description: "Traditional Sindhi Tuk Ralli quilt constructed from hundreds of hand-cut geometric fabric patches layered and joined with thousands of micro-stitches. Incorporates ancestral motifs representing stars, water channels, and desert flowers.",
    craftStory: "In Garelo, women gather in courtyards after daytime chores to stitch Rallis together. Shazia Bibi hand-measured each triangular motif without rulers, sewing over 35,000 individual stitches. This quilt carries oral histories of the Indus plain.",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
    processImages: [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80"
    ],
    materials: "Upcycled Cotton Fabrics, Cotton Wadding, Heavy Embroidery Thread",
    dimensions: "6.5ft x 4.5ft (Single Bed / Wall Hanging)",
    batchNumber: "LK-2026-AUG-11",
    exportGrade: "Grade-A Cultural Textile",
    verifiedBy: "Larkana Rural Women Artisans Consortium",
    scansCount: 2,
    scans: [
      { id: "s-201", timestamp: "2026-08-28 09:10 AM", location: "Larkana Rural Center", city: "Larkana", device: "Tablet", result: "Registered" },
      { id: "s-202", timestamp: "2026-09-12 04:30 PM", location: "Craft Fair, Islamabad", city: "Islamabad", device: "Samsung Galaxy", result: "Verified" }
    ],
    timeline: [
      { step: "Craft Registered", date: "2026-08-28", detail: "Registered by Shazia Bibi with process record" },
      { step: "Guild Inspection", date: "2026-08-30", detail: "Stitch density verified (18 stitches/inch)" },
      { step: "QR Identity Issued", date: "2026-08-31", detail: "Digital certificate created" }
    ]
  },
  {
    id: "prod-3",
    productId: "EM-2026-00127",
    artisanId: "artisan-3",
    artisanName: "Mai Janki",
    artisanVillage: "Islamkot, Tharparkar",
    productName: "Hurmitch Sheesha Mirrorwork Dupatta",
    craftType: "Sindhi Embroidery",
    technique: "Interlocking Hurmitch Stitch with Convex Glass Mirrors",
    origin: "Tharparkar, Sindh, Pakistan",
    productionDate: "September 2026",
    productionTime: "45 Days",
    priceEstimate: "PKR 28,000 (~$100 USD)",
    status: "verified",
    description: "An intricate Thar desert masterpiece featuring genuine glass mirror medallions hand-framed by dense interlocked Hurmitch embroidery using pure silk threads.",
    craftStory: "Mai Janki learned Hurmitch embroidery from her grandmother under the starry skies of Tharparkar. Each mirror is held without glue, gripped entirely by tensioned silk threads in geometric lattice formations.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    processImages: [
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80"
    ],
    materials: "Fine Silk Organza, Blown Convex Mirrors, Hand-Dyed Silk Floss",
    dimensions: "2.8m x 1.0m",
    batchNumber: "TH-2026-SEP-01",
    exportGrade: "Museum Grade Haute-Couture",
    verifiedBy: "Thar Desert Craft Collective",
    scansCount: 1,
    scans: [
      { id: "s-301", timestamp: "2026-09-29 11:00 AM", location: "Islamkot Craft Depot", city: "Islamkot", device: "Field Phone", result: "Verified" }
    ],
    timeline: [
      { step: "Craft Registered", date: "2026-09-29", detail: "Registered with high-res mirrorwork closeup" }
    ]
  },
  {
    id: "prod-4",
    productId: "AJ-2026-00404",
    artisanId: "artisan-1",
    artisanName: "Ayesha Bibi (Identity Copied)",
    artisanVillage: "Unknown / Flagged Stall",
    productName: "Suspicious QR Scan Activity Demo",
    craftType: "Ajrak",
    technique: "Machine Screen Copy with Cloned QR Tag",
    origin: "Flagged Bazaar Stall, Lahore / Dubai",
    productionDate: "September 2026",
    productionTime: "Machine Printed in 15 Minutes",
    priceEstimate: "Sold for PKR 1,800 at commercial roadside stall",
    status: "suspicious",
    description: "This physical piece was found at a roadside market with a photocopied CraftTrace QR tag. The QR tag corresponds to a genuine registered identity, but the system triggered automated fraud alerts due to 47 scans occurring concurrently across 5 global locations within 72 hours.",
    craftStory: "Warning: While Ayesha Bibi is a genuine verified artisan, this specific physical QR label has been cloned or mass-reprinted. Commercial screen printers often photocopy genuine certificates to sell chemical-dyed synthetic fabric as authentic handmade craft.",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
    processImages: [],
    materials: "Synthetic Rayon Blend, Chemical Pigments, Photocopied Label",
    dimensions: "2.2m x 1.0m",
    batchNumber: "CLONED-SUSPICIOUS-TAG",
    exportGrade: "REJECTED - Counterfeit Flag",
    verifiedBy: "CraftTrace Automated Anomaly Engine (Flagged)",
    scansCount: 47,
    suspiciousReason: "47 scans detected across 5 geographic locations (Khairpur, Dubai, London, Karachi, Lahore) within an impossible travel interval (36 hours). High probability of label photocopy/cloning.",
    scans: [
      { id: "s-401", timestamp: "2026-10-01 10:15 AM", location: "Khairpur Bazaar, Sindh", city: "Khairpur", device: "Unknown Android", result: "Flagged" },
      { id: "s-402", timestamp: "2026-10-01 10:22 AM", location: "Deira Souk, Dubai, UAE", city: "Dubai", device: "iPhone 13", result: "Flagged" },
      { id: "s-403", timestamp: "2026-10-01 10:48 AM", location: "Camden Market, London, UK", city: "London", device: "Pixel 7", result: "Flagged" },
      { id: "s-404", timestamp: "2026-10-01 11:05 AM", location: "Zainab Market, Karachi", city: "Karachi", device: "Infinix Hot 12", result: "Flagged" },
      { id: "s-405", timestamp: "2026-10-01 11:20 AM", location: "Anarkali Bazaar, Lahore", city: "Lahore", device: "Samsung A32", result: "Flagged" }
    ],
    timeline: [
      { step: "Original Tag Created", date: "2026-09-18", detail: "Legitimate registration in Matiari" },
      { step: "Anomaly Triggered", date: "2026-10-01", detail: "Sudden spike of 47 concurrent scans in 5 international cities" },
      { step: "Status Changed to Suspicious", date: "2026-10-01", detail: "Automated freeze placed on provenance clearance" }
    ]
  },
  {
    id: "prod-5",
    productId: "BP-2026-00128",
    artisanId: "artisan-4",
    artisanName: "Ghulam Sarwar",
    artisanVillage: "Bhit Shah",
    productName: "Bhit Shah Indigo Wooden Block Bedspread",
    craftType: "Block Printing",
    technique: "Traditional Teak Block Printing on Cotton",
    origin: "Bhit Shah, Matiari, Sindh",
    productionDate: "September 2026",
    productionTime: "14 Days",
    priceEstimate: "PKR 9,500",
    status: "unverified",
    description: "Hand-printed natural dyed cotton fabric featuring ancient floral borders. Registered by artisan pending physical inspection by guild verifiers.",
    craftStory: "Ghulam Sarwar's family carved the wood blocks in 1948. While the craftsmanship is genuine, the guild inspection is scheduled for next week, hence marked Unverified in accordance with strict protocol.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
    processImages: [],
    materials: "Pure Cambric Cotton, Vegetable Dyes",
    dimensions: "2.4m x 2.2m",
    batchNumber: "BS-2026-SEP-02",
    exportGrade: "Pending Guild Inspection",
    verifiedBy: "Pending Verification",
    scansCount: 0,
    scans: [],
    timeline: [
      { step: "Craft Registered", date: "2026-09-30", detail: "Submitted by Ghulam Sarwar" },
      { step: "Pending Verification", date: "2026-10-01", detail: "Awaiting field inspector visit" }
    ]
  }
];

export const INITIAL_MIDDLEMEN = [
  {
    id: "mid-1",
    name: "Tariq Khan",
    businessName: "Indus Craft Logistics & Market Bridge",
    phone: "+92 321 8892110",
    hubLocation: "Hyderabad, Sindh",
    artisansSupported: 14,
    advancePaymentsIssued: "PKR 480,000",
    verified: true,
    roleDescription: "Provides raw natural cotton to rural artisans in Matiari, gives upfront cash advances to sustain families during the 3-week printing process, and transports finished crafts to port exporters in Karachi."
  }
];

export const INITIAL_EXPORTERS = [
  {
    id: "exp-1",
    name: "Zeeshan Ali",
    company: "Sindh Heritage Global Exports Ltd.",
    country: "Pakistan & United Kingdom",
    headquarters: "Karachi Port Trust Complex, Karachi",
    exportDestinations: ["London, UK", "Milan, Italy", "Dubai, UAE", "Tokyo, Japan"],
    verified: true,
    annualShipments: 124
  }
];

export const CRAFT_TECHNIQUES = [
  { id: "ajrak", name: "Sindhi Ajrak", techniques: ["Hand Block Printed (16-Step Teli)", "Natural Indigo Resist Print", "Khor Block Print"] },
  { id: "ralli", name: "Ralli Quilt", techniques: ["Hand Stitched Geometric Patchwork", "Tuk Appliqué", "Embroidered Ralli Quilting"] },
  { id: "embroidery", name: "Sindhi Embroidery", techniques: ["Interlocking Hurmitch Stitch", "Sheesha Mirrorwork", "Pakko Needlework", "Soof Delicate Geometry"] },
  { id: "blockprint", name: "Block Printing", techniques: ["Hand-Carved Wooden Block Print", "Kashmiri Motif Printing", "Natural Madder Pigment Print"] },
  { id: "other", name: "Other Sindhi Craft", techniques: ["Hala Blue Pottery", "Kashi Tile Art", "Farasi Camel Hair Rug Weaving"] }
];
