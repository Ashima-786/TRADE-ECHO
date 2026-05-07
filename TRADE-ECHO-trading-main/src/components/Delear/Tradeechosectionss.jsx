import { useState, useEffect, useRef } from "react";

// ─── Fonts ───────────────────────────────────────────────────────────────────
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap";
document.head.appendChild(fontLink);

const globalStyle = document.createElement("style");
globalStyle.textContent = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0a0a0a; }
  .font-grotesk { font-family: 'Space Grotesk', sans-serif; }
  .font-mono    { font-family: 'IBM Plex Mono', monospace; }
`;
document.head.appendChild(globalStyle);

// ─── Section 04 — Dealer Regime ──────────────────────────────────────────────
function LongGammaChart() {
  return (
    <svg viewBox="0 0 460 80" width="100%" height="80" style={{ display: "block" }}>
      {/* subtle grid */}
      {[0, 20, 40, 60, 80].map((y) => (
        <line key={y} x1="0" y1={y} x2="460" y2={y} stroke="#1a2e1a" strokeWidth="1" />
      ))}
      {/* sine wave */}
      <path
        d="M0,40 C30,10 60,10 90,40 C120,70 150,70 180,40 C210,10 240,10 270,40 C300,70 330,70 360,40 C390,10 420,10 460,40"
        fill="none"
        stroke="#39d353"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShortGammaChart() {
  return (
    <svg viewBox="0 0 460 80" width="100%" height="80" style={{ display: "block" }}>
      {[0, 20, 40, 60, 80].map((y) => (
        <line key={y} x1="0" y1={y} x2="460" y2={y} stroke="#2a1a1a" strokeWidth="1" />
      ))}
      {/* trending up with small bumps */}
      <path
        d="M0,60 C60,58 100,55 140,52 C180,49 200,50 240,46 C280,42 320,35 360,25 C390,18 430,12 460,8"
        fill="none"
        stroke="#9ca3af"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DealerRegime() {
  return (
    <section style={{ background: "#0a0a0a", padding: "80px 24px", textAlign: "center" }}>
      <p className="font-mono" style={{ color: "#555", fontSize: "11px", letterSpacing: "0.18em", marginBottom: "24px" }}>
        04 &nbsp;/&nbsp; DEALER REGIME
      </p>
      <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "#fff", marginBottom: "18px", lineHeight: 1.15 }}>
        Two regimes.{" "}
        <span style={{ color: "#39d353" }}>Two playbooks.</span>
      </h2>
      <p style={{ color: "#aaa", fontSize: "1rem", maxWidth: "560px", margin: "0 auto 56px", lineHeight: 1.7 }}>
        Dealer gamma determines whether price dampens or expands. Know the regime before you size the trade.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px", maxWidth: "980px", margin: "0 auto" }}>
        {/* Long Gamma */}
        <div style={{ background: "#0d1a0f", border: "1px solid #1e3a22", borderRadius: "12px", padding: "28px 28px 32px", textAlign: "left" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2,12 C5,6 8,6 10,10 C12,14 15,14 18,8" stroke="#39d353" strokeWidth="2" strokeLinecap="round" fill="none" />
              </svg>
              <span style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff" }}>Long gamma</span>
            </div>
            <span className="font-mono" style={{ background: "#0a0a0a", border: "1px solid #39d353", borderRadius: "4px", padding: "4px 10px", color: "#39d353", fontSize: "10px", letterSpacing: "0.12em" }}>
              POSITIVE GEX
            </span>
          </div>
          <LongGammaChart />
          <p style={{ color: "#bbb", fontSize: "0.93rem", lineHeight: 1.7, margin: "20px 0 20px" }}>
            When dealers are long gamma, they sell into rallies and buy into dips to hedge. Result: price-dampening, range-bound, mean-reverting session.
          </p>
          <div style={{ background: "#0a130c", borderRadius: "8px", padding: "18px 20px" }}>
            <p className="font-mono" style={{ color: "#555", fontSize: "10px", letterSpacing: "0.14em", marginBottom: "12px" }}>PLAYBOOK</p>
            {["Fade the extremes, trade the range", "Smaller size, tighter stops", "Scalp toward the HVL"].map((t) => (
              <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "8px" }}>
                <span style={{ color: "#39d353", fontSize: "16px", lineHeight: 1, flexShrink: 0 }}>·</span>
                <span style={{ color: "#ccc", fontSize: "0.9rem" }}>{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Short Gamma */}
        <div style={{ background: "#1a0d0d", border: "1px solid #3a1e1e", borderRadius: "12px", padding: "28px 28px 32px", textAlign: "left" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2,14 C6,12 10,10 14,7 C16,5 17,4 18,2" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" fill="none" />
                <polyline points="14,2 18,2 18,6" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
              <span style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff" }}>Short gamma</span>
            </div>
            <span className="font-mono" style={{ background: "#0a0a0a", border: "1px solid #9ca3af", borderRadius: "4px", padding: "4px 10px", color: "#9ca3af", fontSize: "10px", letterSpacing: "0.12em" }}>
              NEGATIVE GEX
            </span>
          </div>
          <ShortGammaChart />
          <p style={{ color: "#bbb", fontSize: "0.93rem", lineHeight: 1.7, margin: "20px 0 20px" }}>
            When dealers are short gamma, they sell into dips and buy into rallies to hedge. Result: move-amplifying, trending, high-volatility session.
          </p>
          <div style={{ background: "#130a0a", borderRadius: "8px", padding: "18px 20px" }}>
            <p className="font-mono" style={{ color: "#555", fontSize: "10px", letterSpacing: "0.14em", marginBottom: "12px" }}>PLAYBOOK</p>
            {["Trend-follow, hold winners", "Size up on breakout plays", "Wider stops, expect vol expansion"].map((t) => (
              <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "8px" }}>
                <span style={{ color: "#9ca3af", fontSize: "16px", lineHeight: 1, flexShrink: 0 }}>·</span>
                <span style={{ color: "#ccc", fontSize: "0.9rem" }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 05 — Capabilities ───────────────────────────────────────────────
const capabilities = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="10" width="3" height="9" rx="1" fill="#39d353" />
        <rect x="9" y="6" width="3" height="13" rx="1" fill="#39d353" />
        <rect x="15" y="2" width="3" height="17" rx="1" fill="#39d353" />
      </svg>
    ),
    title: "Interactive GEX heatmap",
    desc: "Click any strike to drill into gamma, delta, and volume context. Hover for net dealer exposure. Layer key levels on top of your chart.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 3L13.5 8.5L19.5 9.3L15 13.5L16.2 19.5L11 16.5L5.8 19.5L7 13.5L2.5 9.3L8.5 8.5L11 3Z" stroke="#39d353" strokeWidth="1.8" strokeLinejoin="round" fill="none" />
        <path d="M11 7V11M9 9H13" stroke="#39d353" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "HVL, gamma flip, walls",
    desc: "High Volume Level, gamma flip points, call walls, and put walls identified automatically. The levels update through the session.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 3C7.69 3 5 5.69 5 9C5 12.31 7.69 15 11 15C14.31 15 17 12.31 17 9C17 5.69 14.31 3 11 3Z" stroke="#39d353" strokeWidth="1.8" fill="none" />
        <path d="M11 9L11 6M9.5 10.5L11 9L12.5 10.5" stroke="#39d353" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 15.5L7 19M14 15.5L15 19" stroke="#39d353" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Defense lines and anchors",
    desc: "Defense lines show where market makers will hedge aggressively. Anchor points mark strikes where gamma pins price. Both drive intraday structure.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="8" stroke="#39d353" strokeWidth="1.8" fill="none" />
        <circle cx="11" cy="11" r="4" stroke="#39d353" strokeWidth="1.5" fill="none" />
        <circle cx="11" cy="11" r="1.5" fill="#39d353" />
      </svg>
    ),
    title: "Priced for retail",
    desc: "Heatseeker by Skylit.ai charges $699/mo for GEX alone. DealerEdge is included in Trade Echo Pro at $199/mo, alongside OptionFlow, Darkpool, AlgoEdge, Cortex, and Copy Trading.",
  },
];

function Capabilities() {
  return (
    <section style={{ background: "#0a0a0a", padding: "80px 24px", textAlign: "center" }}>
      <p className="font-mono" style={{ color: "#555", fontSize: "11px", letterSpacing: "0.18em", marginBottom: "24px" }}>
        05 &nbsp;/&nbsp; CAPABILITIES
      </p>
      <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "#fff", marginBottom: "56px", lineHeight: 1.15 }}>
        What it does.
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "12px", maxWidth: "980px", margin: "0 auto" }}>
        {capabilities.map((cap) => (
          <div key={cap.title} style={{ background: "#0e0e0e", border: "1px solid #1c1c1c", borderRadius: "10px", padding: "28px 28px 32px", textAlign: "left" }}>
            <div style={{ background: "#0d1a0f", border: "1px solid #1e3a22", borderRadius: "8px", width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
              {cap.icon}
            </div>
            <p style={{ fontSize: "1.05rem", fontWeight: 700, color: "#fff", marginBottom: "12px" }}>{cap.title}</p>
            <p style={{ color: "#aaa", fontSize: "0.93rem", lineHeight: 1.7 }}>{cap.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Section 06 — Who It's For ───────────────────────────────────────────────
const audiences = [
  {
    tag: "OPTIONS SCALPERS",
    title: "Read the walls in real time.",
    desc: "Fade price into the put wall. Fade rallies into the call wall. Know which strikes hold and which break.",
  },
  {
    tag: "0DTE TRADERS",
    title: "Size by the regime.",
    desc: "Read intraday gamma flip in real time. Size up when dealers are long gamma. Back off when they flip short.",
  },
  {
    tag: "SWING TRADERS",
    title: "Plan around the map.",
    desc: "Check where HVL sits heading into the next session. Plan entries and exits around the dealer map, not the indicator.",
  },
];

function WhoItsFor() {
  return (
    <section style={{ background: "#0a0a0a", padding: "80px 24px", textAlign: "center" }}>
      <p className="font-mono" style={{ color: "#555", fontSize: "11px", letterSpacing: "0.18em", marginBottom: "24px" }}>
        06 &nbsp;/&nbsp; WHO IT'S FOR
      </p>
      <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "#fff", marginBottom: "56px", lineHeight: 1.15 }}>
        Built for every seat{" "}
        <span style={{ color: "#39d353" }}>at the desk.</span>
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "12px", maxWidth: "980px", margin: "0 auto" }}>
        {audiences.map((a) => (
          <div key={a.tag} style={{ background: "#0e0e0e", border: "1px solid #1c1c1c", borderRadius: "10px", padding: "28px 24px 32px", textAlign: "left" }}>
            <span className="font-mono" style={{ display: "inline-block", background: "#0d1a0f", border: "1px solid #39d353", borderRadius: "4px", padding: "4px 10px", color: "#39d353", fontSize: "10px", letterSpacing: "0.14em", marginBottom: "20px" }}>
              {a.tag}
            </span>
            <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: "12px" }}>{a.title}</p>
            <p style={{ color: "#aaa", fontSize: "0.93rem", lineHeight: 1.7 }}>{a.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Section 07 — FAQ ────────────────────────────────────────────────────────
const faqs = [
  {
    q: "What is DealerEdge on Trade Echo?",
    a: "DealerEdge is Trade Echo's gamma exposure (GEX) analysis tool. It provides interactive heatmaps showing where market makers are positioned, including key levels like the High Volume Level (HVL), gamma flip points, call and put walls, defense lines, and anchor points. When dealers are long gamma (positive GEX), they hedge by selling rallies and buying dips, dampening volatility. When short gamma (negative GEX), their hedging amplifies price moves.",
  },
  {
    q: "What is gamma exposure (GEX) and how does Trade Echo use it?",
    a: "Gamma exposure (GEX) measures the net gamma dealers hold from options they've sold. Trade Echo calculates GEX across all strikes and expirations to show where dealers must hedge, surfacing the levels that structure intraday price action.",
  },
  {
    q: "Trade Echo vs Heatseeker by Skylit.ai?",
    a: "Heatseeker charges $699/mo for GEX alone. Trade Echo Pro includes DealerEdge GEX plus OptionFlow, Darkpool, AlgoEdge, Cortex AI, and Copy Trading — all for $199/mo. One subscription, one terminal.",
  },
];

function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section style={{ background: "#0a0a0a", padding: "80px 24px", textAlign: "center" }}>
      <p className="font-mono" style={{ color: "#555", fontSize: "11px", letterSpacing: "0.18em", marginBottom: "24px" }}>
        07 &nbsp;/&nbsp; QUESTIONS
      </p>
      <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "#fff", marginBottom: "56px" }}>
        Quick answers.
      </h2>

      <div style={{ maxWidth: "860px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "12px" }}>
        {faqs.map((faq, i) => (
          <div
            key={i}
            style={{ background: "#0e0e0e", border: "1px solid #1c1c1c", borderRadius: "10px", overflow: "hidden", textAlign: "left" }}
          >
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "22px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}
            >
              <span style={{ color: "#fff", fontSize: "1rem", fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif", textAlign: "left" }}>
                {faq.q}
              </span>
              <span style={{ width: "28px", height: "28px", border: "1.5px solid #39d353", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#39d353", fontSize: "18px", fontWeight: 300, flexShrink: 0 }}>
                {open === i ? "×" : "+"}
              </span>
            </button>
            {open === i && (
              <div style={{ padding: "0 24px 24px" }}>
                <p style={{ color: "#aaa", fontSize: "0.93rem", lineHeight: 1.75 }}>{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Section 08 — Get Started ────────────────────────────────────────────────
function GetStarted() {
  const [hovPrimary, setHovPrimary] = useState(false);
  const [hovSecondary, setHovSecondary] = useState(false);

  return (
    <section style={{ background: "#0a0a0a", padding: "32px 24px 80px" }}>
      <div
        style={{
          maxWidth: "980px",
          margin: "0 auto",
          background: "radial-gradient(ellipse at 50% 120%, #1a3d1a 0%, #0d0d0d 65%)",
          border: "1px solid #1e3a22",
          borderRadius: "16px",
          padding: "64px 32px",
          textAlign: "center",
        }}
      >
        <p className="font-mono" style={{ color: "#555", fontSize: "11px", letterSpacing: "0.18em", marginBottom: "24px" }}>
          08 &nbsp;/&nbsp; GET STARTED
        </p>
        <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "#fff", marginBottom: "18px", lineHeight: 1.15 }}>
          Start reading the{" "}
          <span style={{ color: "#39d353" }}>dealer map</span> today.
        </h2>
        <p style={{ color: "#aaa", fontSize: "1rem", maxWidth: "480px", margin: "0 auto 40px", lineHeight: 1.7 }}>
          Included in Trade Echo Pro with OptionFlow, Darkpool, AlgoEdge, Cortex, and Copy Trading. $199/mo. Cancel anytime.
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
          <button
            onMouseEnter={() => setHovPrimary(true)}
            onMouseLeave={() => setHovPrimary(false)}
            style={{
              background: hovPrimary ? "#2ebd47" : "#39d353",
              color: "#0a0a0a",
              border: "none",
              borderRadius: "8px",
              padding: "14px 28px",
              fontSize: "0.95rem",
              fontWeight: 700,
              fontFamily: "'Space Grotesk', sans-serif",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "background 0.2s",
            }}
          >
            Start reading the map <span style={{ fontSize: "1rem" }}>→</span>
          </button>
          <button
            onMouseEnter={() => setHovSecondary(true)}
            onMouseLeave={() => setHovSecondary(false)}
            style={{
              background: hovSecondary ? "#1c1c1c" : "transparent",
              color: "#fff",
              border: "1.5px solid #333",
              borderRadius: "8px",
              padding: "14px 28px",
              fontSize: "0.95rem",
              fontWeight: 700,
              fontFamily: "'Space Grotesk', sans-serif",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
          >
            View all plans
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Root ────────────────────────────────────────────────────────────────────
export default function TradeEchoSections2() {
  return (
    <div className="font-grotesk" style={{ background: "#0a0a0a", color: "#fff", minHeight: "100vh" }}>
      <DealerRegime />
      <Capabilities />
      <WhoItsFor />
      <FAQ />
      <GetStarted />
    </div>
  );
}