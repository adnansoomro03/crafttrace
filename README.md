# CRAFTTRACE 🏺
### Digital Provenance & Authentication Platform for Traditional Sindhi Crafts
> *"Scan the craft. Know the story. Trust the origin."*

Built for the **IET TechFest Hackathon 2026** to protect traditional Sindhi handmade crafts (such as 16-step hand-printed **Ajrak** and hand-stitched **Ralli** quilts) from chemical machine-made counterfeits and fake paper certificates.

---

## 🌟 Executive Summary

Traditional Sindhi crafts carry 4,500 years of civilization tracing back to Mohenjo-Daro. An authentic hand-block-printed Ajrak requires **21 days, 16 distinct natural washing and resist-dyeing stages**, and generational mastery. Today:
- Industrial screen-printing factories duplicate sacred motifs in **15 minutes** using toxic chemical dyes.
- Counterfeiters sell machine copies for 1/10th the price under the same name.
- Paper "certificates of authenticity" are easily photocopied.
- Honest rural artisans earn declining wages, forcing families to remove children from craft apprenticeships.
- Honest Pakistani exporters lose international reputation when overseas buyers discover counterfeit stock.

**CraftTrace solves this without complex paperwork, expensive hardware, or mandatory blockchain gas fees.**

---

## 💡 Important Real-World Logic

> **CRITICAL ARCHITECTURAL PRINCIPLE:**  
> A QR code is **NOT** itself proof of physical authenticity.  
> The QR code contains only a unique Product ID (`AJ-2026-00125`).  
> Authenticity is established through:
> 1. **Accredited Master Artisans** registered with regional craft guilds.
> 2. **Photographic Intermediate Proof** (mustard-oil soaking, river washing, resist paste application).
> 3. **Custody Verification** across transparent middlemen and port exporters.
> 4. **Automated Scan Anomaly Sentinel**: Detecting abnormal bursts of scans across conflicting geographic locations when a counterfeiter photocopies a physical QR tag.

---

## 👥 The 4 Stakeholders

Unlike naive systems that seek to eliminate middlemen, CraftTrace recognizes that **middlemen are vital supply-chain partners**:
1. **Artisan (Ayesha Bibi):** Free registration, zero paperwork, generates printable QR tags for < PKR 5, shares generational story.
2. **Middleman (Tariq Khan):** Legitimate bridge providing advance cash payments, supplying raw Indus cotton, and transferring verified consignments to exporters.
3. **Everyday Buyer & Collector:** Scans QR with any standard smartphone camera. **No app installation. No account creation. Zero friction.**
4. **Exporter (Zeeshan Ali):** Audits pre-shipment authenticity and generates official **Export Provenance Certificates** for UK/EU luxury trade.

---

## 🚀 Quick Start (Run Locally in 60 Seconds)

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
# Navigate into crafttrace directory
cd crafttrace

# Dependencies are already installed, but to install freshly:
npm install

# Start local Vite development server
npm run dev
```

The application will start immediately at:
👉 **`http://localhost:5173`**

---

## 🧪 Demo Presentation Flow (For Hackathon Judges)

Follow this sequence for a flawless demo during your 3-minute hackathon pitch:

| Step | Page / Action | What Judges See |
|------|---------------|-----------------|
| **1** | **Landing Page** (`/`) | Hero section with tagline, visual flow diagram, problem breakdown, and stakeholder cards. |
| **2** | **Click "For Artisans"** | Opens **Artisan Dashboard** (`Ayesha Bibi, Matiari`). Shows metrics (18 Registered, 16 Verified, Total Scans). |
| **3** | **Click "+ Register New Craft"** | Fill in craft details: *Royal Indigo Teli Ajrak*, 21 days production, select workshop photo. |
| **4** | **Submit Registration** | System instantly generates unique ID: `AJ-2026-XXXX` + Scannable QR Tag. |
| **5** | **Click "Print Label"** | Shows official printable artisan tag with guild stamp and tamper instructions. |
| **6** | **Open Public Verification Page** | Scans `AJ-2026-00125`. Confetti triggers! Displays **`✓ VERIFIED HANDMADE CRAFT`**, artisan story, 16-step proof, and scan history. |
| **7** | **Demo Suspicious Activity** | Select preset `AJ-2026-00404`. Displays **`⚠ SUSPICIOUS ACTIVITY DETECTED`** (47 scans detected across Khairpur, Dubai, London, and Karachi). Shows how photocopied tags are caught! |
| **8** | **Demo Unknown Fake ID** | Enter `FAKE-999`. Displays **`⚠ UNVERIFIED PRODUCT`** with report stall button. |
| **9** | **Middleman Dashboard** | Switch role to Middleman. Shows Tariq Khan's PKR 480,000 advance support, sourced inventory, and transfer to port. |
| **10** | **Exporter Portal & Certificate** | Click **"Generate Export Verification Report"**. Displays full printable customs dossier with QR seal. |
| **11** | **Pitch & Q&A Tab** | Built directly into the navbar for immediate reference during stage presentation! |

---

## 📁 Project Structure

```
crafttrace/
├── index.html                   # HTML entry with Google Fonts (Plus Jakarta Sans & Cinzel)
├── package.json                 # Project dependencies (React 19, Lucide, QR, Tailwind v4)
├── vite.config.js               # Vite config with @tailwindcss/vite plugin
├── supabase/
│   └── schema.sql               # PostgreSQL production database schema with RLS & indexes
├── src/
│   ├── main.jsx                 # React root mount
│   ├── App.jsx                  # Main application router, modal coordinator & hash listener
│   ├── index.css                # Tailwind CSS v4 setup + Sindhi Ajrak geometric patterns
│   ├── components/
│   │   ├── Navbar.jsx           # Cultural logo, role switcher, navigation, Scan QR button
│   │   ├── Footer.jsx           # Cultural heritage attribution & demo data reset
│   │   ├── StatusBadge.jsx      # Verified (Green), Suspicious (Red), Unverified (Amber)
│   │   ├── QRCodeModal.jsx      # Scannable QR code, PNG download, printable artisan label
│   │   ├── ProductCard.jsx      # Rich visual craft card with photo, badges, and QR triggers
│   │   ├── ProductDetailsModal.jsx # Comprehensive provenance dossier, workshop proof, timeline
│   │   ├── ScanSimulatorModal.jsx  # Interactive camera viewfinder with judge preset chips
│   │   └── ExportReportModal.jsx   # Official printable Export Provenance Certificate
│   ├── data/
│   │   └── mockData.js          # Cultural seed data for Artisans, Products, and Techniques
│   ├── services/
│   │   ├── storageService.js    # Persistent store with automated scan anomaly engine
│   │   └── supabaseClient.js    # Production Supabase connector configuration
│   └── pages/
│       ├── LandingPage.jsx             # Hero, problem, visual flow, 4 stakeholders, stats
│       ├── PublicVerificationPage.jsx  # Zero-login public scanner, authentic check, suspicious alert
│       ├── ArtisanDashboard.jsx        # Artisan management, metrics, quick QR tags
│       ├── RegisterProductPage.jsx     # Form to register crafts and auto-generate QR codes
│       ├── MiddlemanDashboard.jsx      # Legitimate supply-chain hub & advance payments
│       ├── ExporterDashboard.jsx       # International pre-shipment clearance portal
│       ├── AdminDashboard.jsx          # Central Sindh Craft Authority oversight & charts
│       ├── CraftStoryPage.jsx          # Emotional 16-step Ajrak and Ralli quilting stories
│       ├── HowItWorksPage.jsx          # Real-world anti-fraud & affordability breakdown
│       └── PitchJudgeGuide.jsx         # 3-min pitch script & 14 judge answers
```

---

## 🛡️ Anti-Fraud Anomaly Engine

```
[Physical Tag Copied onto 50 Fakes]
              ↓
[Concurrent Scans in Khairpur, Dubai, London, Karachi, Lahore]
              ↓
[CraftTrace Anomaly Engine Flags Rapid Geographic Inconsistency]
              ↓
[Badge Automatically Shifts: VERIFIED → SUSPICIOUS ACTIVITY]
              ↓
[Buyer is Alerted • Fake is Neutralized • Guild Inspectors Notified]
```

---

## 🗄️ Database & Supabase Integration

In MVP mode, CraftTrace uses a high-fidelity, persistent browser data layer that works immediately without configuring API keys.

To connect to a live Supabase PostgreSQL instance in production:
1. Copy `.env.example` to `.env`:
   ```bash
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
2. Run the SQL schema from `supabase/schema.sql` in your Supabase SQL Editor.
3. The schema includes tables for `artisans`, `products`, `scans`, `middlemen`, `exporters`, and `verifications` with Row-Level Security (RLS) enabled.

---

## 🎤 3-Minute Hackathon Pitch Script

*Available directly inside the web app under the **Pitch & Q&A** tab.*

> **[0:00 - 0:25] THE CRISIS**  
> "Honorable judges, on the banks of the Indus, an authentic handmade Sindhi Ajrak takes 21 days and 16 separate natural dyeing stages to create. Today, chemical screen printers copy those sacred 4,500-year-old motifs in 15 minutes, sell them at roadside stalls for 1/10th the price under the exact same name, and slap fake photocopied certificates on them. Honest artisans are starving, and honest Pakistani exporters are losing international trust."
> 
> **[0:25 - 0:45] WHY CERTIFICATES FAIL & OUR SOLUTION**  
> "Paper certificates fail because paper can be photocopied in seconds. Today we present **CraftTrace**: digital provenance and verification for traditional Sindhi crafts. Our motto: *'Scan the craft. Know the story. Trust the origin.'*"
> 
> **[0:45 - 1:15] HOW IT WORKS**  
> "Every registered genuine craft receives a unique digital identity and a low-cost QR tag sewn directly into the hem. When an everyday buyer in Karachi or a collector in London scans the QR with any standard smartphone camera, zero app download is required. The live provenance dossier opens instantly with the master artisan's name, village, 16-step making photos, and guild certification."
> 
> **[1:15 - 1:45] ANTI-FRAUD SENTINEL**  
> "Judges ask: 'What if someone photocopies the QR code?' Here is our core innovation: The QR code is NOT the proof—it is the gateway to our central scan anomaly engine. A genuine handmade piece is scanned 2 or 3 times in its life. But if a counterfeiter copies that tag onto 50 machine prints, our system detects 47 concurrent scans in Khairpur, Dubai, London, and Lahore, and instantly shifts the badge to 'SUSPICIOUS ACTIVITY'. The buyer is warned, and the fake is neutralized."
> 
> **[1:45 - 2:15] EMPATHY FOR MIDDLEMEN & AFFORDABILITY**  
> "Crucially, we do not demonize the middleman. Middlemen provide vital advance cash payments to sustain artisans during month-long printing cycles. CraftTrace makes them transparent partners. Furthermore, CraftTrace costs less than 5 rupees per craft—no expensive hardware, no mandatory blockchain gas fees."
> 
> **[2:15 - 3:00] CLOSING**  
> "CraftTrace protects the soul of our Indus civilization, restores fair wages to rural masters, and gives Pakistani exporters the digital gold standard for global trade. Thank you!"

---

## ⚖️ License & Cultural Attribution
Dedicated to the master artisans of Matiari, Bhit Shah, Larkana, and Tharparkar.  
Built for the **IET TechFest Hackathon 2026**.
