import React, { useState } from 'react';
import { 
  Sparkles, Award, Clock, HelpCircle, CheckCircle2, 
  AlertTriangle, DollarSign, Globe, ChevronDown, ChevronUp, Copy, Check
} from 'lucide-react';

export default function PitchJudgeGuide() {
  const [activeTab, setActiveTab] = useState('pitch'); // 'pitch' | 'qa'
  const [copiedPitch, setCopiedPitch] = useState(false);
  const [openQuestionIdx, setOpenQuestionIdx] = useState(0);

  const pitchScript = `[0:00 - 0:25] THE CRISIS
"Honorable judges, on the banks of the Indus, an authentic handmade Sindhi Ajrak takes 21 days and 16 separate natural dyeing stages to create. Today, chemical screen printers copy those sacred 4,500-year-old motifs in 15 minutes, sell them at roadside stalls for 1/10th the price under the exact same name, and slap fake photocopied certificates of authenticity on them. Honest artisans are starving, families are taking children away from traditional craft apprenticeships, and honest Pakistani exporters are losing international trust."

[0:25 - 0:45] WHY CERTIFICATES FAIL & OUR SOLUTION
"Paper certificates are broken because paper can be photocopied in seconds. Today we present CraftTrace: the digital provenance and verification platform for traditional Sindhi crafts. Our motto is: 'Scan the craft. Know the story. Trust the origin.'"

[0:45 - 1:15] HOW CRAFTTRACE WORKS
"Every registered genuine craft receives a unique digital identity and a low-cost QR tag sewn directly into the hem. When an everyday buyer in Karachi or a collector in London scans the QR with any standard smartphone camera, zero app download is required. The live provenance dossier opens instantly, displaying the master artisan's name, village, 16-step making photos, and guild certification."

[1:15 - 1:45] THE ANTI-FRAUD SENTINEL
"Judges always ask: 'What if someone photocopies the QR code?' Here is our core innovation: The QR code is NOT the proof—it is the gateway to our central scan anomaly engine. A genuine handmade piece is scanned 2 or 3 times in its life. But if a counterfeiter copies that tag onto 50 machine prints, our system detects 47 concurrent scans in Khairpur, Dubai, London, and Lahore, and instantly shifts the badge from 'VERIFIED' to 'SUSPICIOUS ACTIVITY: Unusually high multi-location scans detected.' The buyer is warned, and the fake is neutralized."

[1:45 - 2:15] EMPATHY FOR MIDDLEMEN & AFFORDABILITY
"Crucially, we do not demonize the middleman. Middlemen provide vital advance cash payments to sustain artisans during month-long printing cycles. CraftTrace makes them transparent partners in the custody chain. Furthermore, CraftTrace costs less than 5 rupees per craft—no expensive hardware, no mandatory blockchain gas fees."

[2:15 - 3:00] TRACTION & CLOSING
"CraftTrace protects the soul of our Indus civilization, restores fair wages to rural masters, and gives Pakistani exporters the digital gold standard for global trade. Thank you!"`;

  const judgeQuestions = [
    {
      q: "1. What if someone copies or photocopies the QR code?",
      a: "A static QR code by itself is just an identifier, which is why paper certificates fail. CraftTrace monitors scanning telemetry. A genuine single craft follows a predictable lifecycle: registered in Matiari, checked at the logistics hub, and scanned once or twice by its final buyer. If a counterfeiter prints 50 photocopies, our Anomaly Sentinel detects an abnormal burst of scans across conflicting cities within short hours. The status automatically flips to 'SUSPICIOUS ACTIVITY', protecting the buyer while alerting guild inspectors."
    },
    {
      q: "2. How do you know the product is actually handmade and not machine-made?",
      a: "Authenticity in CraftTrace is an ecosystem, not a single sticker. It combines: (1) Verified Master Artisans accredited by regional craft guilds, (2) Mandatory photographic proof of intermediate stages (such as mustard oil soaking and resist printing), (3) Batch custody tracking by registered middlemen, and (4) Random physical guild sample audits. In future phases, our AI visual classifier will screen textile microscopic weave density."
    },
    {
      q: "3. Why didn't you make blockchain mandatory in the MVP?",
      a: "Because rural artisans in Sindh do not have cryptocurrency wallets, cannot afford fluctuating Ethereum gas fees, and often lack stable broadband. Forcing blockchain in an MVP is over-engineering that excludes the very people we are trying to save. CraftTrace uses high-speed, secure PostgreSQL with cryptographic hash records. Future enterprise export consignments can be anchored to lightweight Layer-2 ledgers without imposing friction on village artisans."
    },
    {
      q: "4. How will poor or illiterate artisans use CraftTrace?",
      a: "CraftTrace was designed with radical accessibility. The interface uses voice prompts, photo capture, and visual iconography. More importantly, we leverage the existing Middleman and Guild Cooperative network: the local craft guild or middleman acts as an assisted registrar who scans and logs crafts on the artisan's behalf."
    },
    {
      q: "5. What happens if an artisan does not own a smartphone?",
      a: "The artisan does not need to own a smartphone. Village guild cluster centers (such as in Matiari or Bhit Shah) have shared tablets, and partner middlemen register the crafts upon issuing advance payments, handing the pre-printed QR tags to the artisan."
    },
    {
      q: "6. What role does the middleman play in CraftTrace?",
      a: "The problem statement explicitly highlights that middlemen are vital because they provide cash advances and market access. Rather than trying to eliminate them, CraftTrace provides a dedicated Middleman Dashboard where they log sourced artisans, record advance payments, verify inventory batches, and transfer consignments to exporters with transparent custody logs."
    },
    {
      q: "7. How does this help Pakistani exporters?",
      a: "Exporters currently face skepticism in Western and Gulf luxury markets due to flooded market copies. CraftTrace gives exporters a 1-click 'Export Provenance Certificate' detailing the full artisan lineage, workshop evidence, and clean scan history to satisfy customs auditors and luxury boutique buyers."
    },
    {
      q: "8. How does the system make money (Business Model)?",
      a: "Artisans register for FREE. Middlemen have free basic tier with optional inventory analytics. Revenue is generated from: (1) Exporters paying per-consignment verification certificates, (2) International luxury brands paying API integration fees, and (3) Government/NGO cultural preservation licensing grants."
    },
    {
      q: "9. How will you verify artisans in the first place?",
      a: "Through local artisan guilds, UNESCO-recognized cooperatives, and the Sindh Craft & Culture Authority. Artisans are vetted based on ancestral village reputation, master block-carving demonstrations, and community peer recognition."
    },
    {
      q: "10. How will fake certificates of authenticity be handled?",
      a: "Fake paper certificates rely on unverified claims printed on cardboard. CraftTrace replaces vulnerable paper with a real-time digital lookup. If a buyer inputs a fake certificate number into CraftTrace, it immediately displays 'UNVERIFIED PRODUCT: Not found in official registry' with a 1-click report button."
    },
    {
      q: "11. What prevents someone from registering a machine-made product as handmade?",
      a: "Registration is restricted to accredited artisans and audited middlemen. Any registered product requires photographic workshop evidence. If a fraudulent registrant attempts to log machine-made stock, guild inspectors review the anomalous volume (a single artisan cannot hand-make 500 Ajraks in a week) and revoke their accreditation."
    },
    {
      q: "12. How can AI help in future phases?",
      a: "Computer vision models trained on macro-lens textile photography can detect the microscopic irregularities of hand block printing (such as natural dye bleed and block edge mismatches) versus the razor-sharp artificial dots of chemical screen printing."
    },
    {
      q: "13. What makes this different from a simple QR code generator?",
      a: "A simple QR generator just points to a static URL without authentication or database backing. CraftTrace is a complete digital provenance infrastructure: relational identity registry, anomaly detection engine, multi-stakeholder custody ledger, and export certification suite."
    },
    {
      q: "14. What if someone tears off the QR tag?",
      a: "In future production rollouts, we use tamper-evident woven threads that break if unstitched, alongside serialized holographic seals and water-resistant NFC chips for high-end museum export pieces."
    }
  ];

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(pitchScript);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center justify-center gap-1.5 mb-2">
          <Award className="w-4 h-4" />
          IET TechFest Hackathon 2026 Presentation Kit
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-white">
          Pitch Plan & Judge Q&A Playbook
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
          Everything your team needs to deliver an award-winning 3-minute pitch and handle the toughest judge questions with technical and economic authority.
        </p>

        {/* Tab Toggle */}
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => setActiveTab('pitch')}
            className={`py-2 px-5 rounded-2xl text-xs font-bold transition ${
              activeTab === 'pitch'
                ? 'bg-amber-500 text-slate-950 shadow-lg'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            3-Minute Winning Pitch Script
          </button>
          <button
            onClick={() => setActiveTab('qa')}
            className={`py-2 px-5 rounded-2xl text-xs font-bold transition ${
              activeTab === 'qa'
                ? 'bg-amber-500 text-slate-950 shadow-lg'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            14 Hard Judge Questions & Answers
          </button>
        </div>
      </div>

      {/* PITCH SCRIPT TAB */}
      {activeTab === 'pitch' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                3-Minute Stage Script (Timed)
              </h3>
            </div>
            <button
              onClick={handleCopyPitch}
              className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition"
            >
              {copiedPitch ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPitch ? 'Copied to Clipboard' : 'Copy Pitch Script'}</span>
            </button>
          </div>

          <div className="space-y-4 font-sans text-xs md:text-sm leading-relaxed text-slate-200">
            
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <span className="font-mono text-xs font-bold text-rose-400 block mb-1">[0:00 - 0:25] THE CRISIS</span>
              <p className="text-slate-300">
                "Honorable judges, on the banks of the Indus, an authentic handmade Sindhi Ajrak takes 21 days and 16 separate natural dyeing stages to create. Today, chemical screen printers copy those sacred 4,500-year-old motifs in 15 minutes, sell them at roadside stalls for 1/10th the price under the exact same name, and slap fake photocopied certificates of authenticity on them. Honest artisans are starving, families are pulling children away from traditional craft training, and honest Pakistani exporters are losing international trust."
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <span className="font-mono text-xs font-bold text-amber-400 block mb-1">[0:25 - 0:45] WHY CERTIFICATES FAIL & OUR SOLUTION</span>
              <p className="text-slate-300">
                "Paper certificates are broken because paper can be photocopied in seconds. Today we present <strong>CraftTrace</strong>: the digital provenance and verification platform for traditional Sindhi crafts. Our motto is: <em>'Scan the craft. Know the story. Trust the origin.'</em>"
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <span className="font-mono text-xs font-bold text-blue-400 block mb-1">[0:45 - 1:15] HOW CRAFTTRACE WORKS</span>
              <p className="text-slate-300">
                "Every registered genuine craft receives a unique digital identity and a low-cost QR tag sewn directly into the hem. When an everyday buyer in Karachi or a collector in London scans the QR with any standard smartphone camera, zero app download is required. The live provenance dossier opens instantly, displaying the master artisan's name, village, 16-step making photos, and guild certification."
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <span className="font-mono text-xs font-bold text-emerald-400 block mb-1">[1:15 - 1:45] THE ANTI-FRAUD SENTINEL</span>
              <p className="text-slate-300">
                "Judges always ask: 'What if someone photocopies the QR code?' Here is our core innovation: The QR code is NOT the proof—it is the gateway to our central scan anomaly engine. A genuine handmade piece is scanned 2 or 3 times in its life. But if a counterfeiter copies that tag onto 50 machine prints, our system detects 47 concurrent scans in Khairpur, Dubai, London, and Lahore, and instantly shifts the badge from 'VERIFIED' to 'SUSPICIOUS ACTIVITY: Unusually high multi-location scans detected.' The buyer is warned, and the fake is neutralized."
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <span className="font-mono text-xs font-bold text-purple-400 block mb-1">[1:45 - 2:15] EMPATHY FOR MIDDLEMEN & AFFORDABILITY</span>
              <p className="text-slate-300">
                "Crucially, we do not demonize the middleman. Middlemen provide vital advance cash payments to sustain artisans during month-long printing cycles. CraftTrace makes them transparent partners in the custody chain. Furthermore, CraftTrace costs less than 5 rupees per craft—no expensive hardware, no mandatory blockchain gas fees."
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/40 to-amber-950/40 border border-amber-500/30">
              <span className="font-mono text-xs font-bold text-amber-300 block mb-1">[2:15 - 3:00] TRACTION & CLOSING</span>
              <p className="text-slate-200 font-medium">
                "CraftTrace protects the soul of our Indus civilization, restores fair wages to rural masters, and gives Pakistani exporters the digital gold standard for global trade. Scan the craft. Know the story. Trust the origin. Thank you!"
              </p>
            </div>

          </div>
        </div>
      )}

      {/* JUDGE Q&A TAB */}
      {activeTab === 'qa' && (
        <div className="space-y-3">
          {judgeQuestions.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition"
            >
              <button
                onClick={() => setOpenQuestionIdx(openQuestionIdx === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left gap-4"
              >
                <span className="text-sm font-bold text-white">{item.q}</span>
                {openQuestionIdx === idx ? (
                  <ChevronUp className="w-4 h-4 text-amber-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0" />
                )}
              </button>

              {openQuestionIdx === idx && (
                <div className="mt-3 pt-3 border-t border-slate-800 text-xs text-slate-300 leading-relaxed font-sans">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
