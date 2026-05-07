// EdgePage.jsx — Parent page (no header/footer)
// Assembles all Edge child components with exact tradeecho.com/edge theme
import { useState } from "react";

import EdgeHero             from "../components/Edge/EdgeHero";
import EdgeTopicsAndStages  from "../components/Edge/EdgeTopicsAndStages";
import EdgeCaseStudies      from "../components/Edge/EdgeCaseStudies";
import CaseStudyPage        from "../components/Edge/CaseStudyPage";
import { useNavigate } from "react-router-dom";
// ── Global design tokens ──────────────────────────────────────────────────────
const GLOBAL = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:         #0a0a0a;
    --surf:       #111314;
    --surf2:      #0e1012;
    --bdr:        #1e2023;
    --bdr2:       #2a2d31;
    --txt:        #ffffff;
    --txt2:       #f0f2f4;
    --muted:      #6b7280;
    --dim:        #4b5563;
    --acc:        #d4af37;
    --acc-faint:  rgba(212,175,55,0.08);
    --acc-ring:   rgba(212,175,55,0.30);
    --font-body:  'Inter', system-ui, sans-serif;
    --font-mono:  'JetBrains Mono', 'Courier New', monospace;
  }

  html, body {
    background: var(--bg);
    color: var(--txt);
    font-family: var(--font-body);
    -webkit-font-smoothing: antialiased;
  }

  /* Shared eyebrow label */
  .section-label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.16em;
    color: var(--dim);
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  .section-label .num   { color: var(--dim); }
  .section-label .slash { color: #374151; }

  /* Shared section heading */
  .section-heading {
    font-size: clamp(20px, 2.5vw, 28px);
    font-weight: 800;
    color: var(--txt);
    letter-spacing: -0.025em;
    margin: 0 0 24px;
  }

  /* Section divider */
  .section-divider {
    border: none;
    border-top: 1px solid #1e2023;
    margin: 0;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: #222; border-radius: 3px; }

  /* ── Animated page transition ── */
  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .page-enter {
    animation: fadeSlideIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
  }
`;

// ── 02 / Library — inline (small, no separate file needed) ───────────────────
import { GraduationCap, KeyRound, CircleDot, ArrowRight } from "lucide-react";

const LIBRARY_PATHS = [
  { id: "new",      icon: GraduationCap, title: "I'm New to Trading",      desc: "Start with the fundamentals.", stageId: 1 },
  { id: "basics",   icon: KeyRound,      title: "I Know the Basics",        desc: "Master the platform tools.",   stageId: 2 },
  { id: "advanced", icon: CircleDot,     title: "I'm Ready for Advanced",   desc: "Strategies, risk, and case studies.", stageId: 3 },
];

function EdgeLibrary({ onPathSelect }) {
  const [hovered, setHovered] = useState(null);

  return (
    <section style={{ padding: "52px 0 44px", borderBottom: "1px solid #1e2023" }}>
      {/* Label */}
      <p style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "10px", fontWeight: 700,
        letterSpacing: "0.26em", textTransform: "uppercase",
        color: "rgba(255,255,255,0.28)",
        marginBottom: "10px",
        display: "flex", alignItems: "center", gap: "6px",
      }}>
        <span>02</span>
        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
        <span>LIBRARY</span>
      </p>

      {/* Heading */}
      <h2 style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "clamp(1.5rem, 3vw, 2rem)",
        fontWeight: 700, color: "#ffffff",
        letterSpacing: "-0.025em",
        margin: "0 0 24px",
      }}>
        Pick a learning path
      </h2>

      {/* Cards */}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        {LIBRARY_PATHS.map((path) => {
          const Icon = path.icon;
          const isHov = hovered === path.id;
          return (
            <button
              key={path.id}
              onClick={() => onPathSelect?.(path.stageId)}
              onMouseEnter={() => setHovered(path.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                flex: "1 1 220px",
                display: "flex", alignItems: "center", gap: "14px",
                padding: "18px 20px",
                background: isHov ? "#141618" : "#111214",
                border: `1px solid ${isHov ? "rgba(212,175,55,0.35)" : "rgba(255,255,255,0.08)"}`,
                borderRadius: "14px",
                cursor: "pointer", textAlign: "left",
                transform: isHov ? "translateY(-2px)" : "translateY(0)",
                boxShadow: isHov ? "0 8px 24px rgba(212,175,55,0.07)" : "none",
                transition: "all 0.2s ease",
              }}
            >
              {/* Icon */}
              <div style={{
                width: "40px", height: "40px", borderRadius: "10px", flexShrink: 0,
                background: isHov ? "rgba(212,175,55,0.18)" : "rgba(212,175,55,0.1)",
                border: `1px solid ${isHov ? "rgba(212,175,55,0.4)" : "rgba(212,175,55,0.18)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s",
              }}>
                <Icon size={18} color="#d4af37" />
              </div>

              {/* Text */}
              <div style={{ flex: 1 }}>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px", fontWeight: 700,
                  color: isHov ? "#d4af37" : "#e8eaed",
                  margin: "0 0 3px",
                  transition: "color 0.15s",
                }}>
                  {path.title}
                </p>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "12.5px",
                  color: "rgba(255,255,255,0.35)",
                  margin: 0,
                }}>
                  {path.desc}
                </p>
              </div>

              {/* Arrow */}
              <ArrowRight
                size={15}
                color={isHov ? "#d4af37" : "rgba(255,255,255,0.22)"}
                style={{
                  flexShrink: 0,
                  transform: isHov ? "translateX(3px)" : "translateX(0)",
                  transition: "all 0.2s",
                }}
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function EdgePage() {
    const navigate = useNavigate(); // ✅ ADD THIS

  // null  → show main Edge listing
  // string → show case study article for that slug
  const [openSlug, setOpenSlug] = useState(null);

  // Ref so Library card click can scroll to + open 04/Stages
  const [jumpStage, setJumpStage] = useState(null);

  // Handle Library card click: scroll to stages + open that stage
  const handleLibrarySelect = (stageId) => {
    setJumpStage(stageId);
    // Reset after EdgeTopicsAndStages picks it up
    setTimeout(() => setJumpStage(null), 500);
    const el = document.getElementById("edge-stages-section");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Navigate to a case study
  const handleNavigate = (slug) => {
    setOpenSlug(slug);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Back from case study to main listing
  const handleBack = () => {
    setOpenSlug(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style>{GLOBAL}</style>

      {/* ── Case Study Detail Page ── */}
      {openSlug ? (
        <div
          key={openSlug}
          className="page-enter"
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "48px 32px 80px",
            background: "#0a0a0a",
            minHeight: "100vh",
          }}
        >
         <CaseStudyPage
  slug={openSlug}
  onBack={handleBack}
  onNavigate={handleNavigate}
  onNavigateToPricing={() => navigate("/pricing")}
/>
        </div>
      ) : (

        /* ── Main Edge Listing ── */
        <div key="listing" className="page-enter">

          {/* 01 / Edge Hero — full bleed (no max-width) */}
          <EdgeHero onSearch={(q) => console.log("search:", q)} />

          <main style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px" }}>

            <hr className="section-divider" />

            {/* 02 / Library */}
            {/* <EdgeLibrary onPathSelect={handleLibrarySelect} /> */}

            {/* 03 / Topics + 04 / Stages */}
            <div id="edge-stages-section">
              <EdgeTopicsAndStages jumpStage={jumpStage} />
            </div>

            <hr className="section-divider" />

            {/* 05 / Case Studies */}
            <EdgeCaseStudies onNavigate={handleNavigate} />

          </main>
        </div>
      )}
    </>
  );
}