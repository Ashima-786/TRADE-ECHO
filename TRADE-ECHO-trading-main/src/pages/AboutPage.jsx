// AboutPage.jsx — Matches tradeecho.com/about exactly
// All 8 sections: Hero, Timeline, Mission, Numbers, Values, Community, Rumble, CTA

import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

const GLOBAL = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:        #0a0a0a;
    --surf:      #111314;
    --surf2:     #0e1012;
    --bdr:       #1e2023;
    --bdr2:      #2a2d31;
    --txt:       #ffffff;
    --txt2:      #f0f2f4;
    --muted:     #6b7280;
    --dim:       #4b5563;
    --acc:       #d4af37;
    --acc-faint: rgba(212,175,55,0.08);
    --acc-ring:  rgba(212,175,55,0.30);
    --font-body: 'Inter', system-ui, sans-serif;
    --font-mono: 'JetBrains Mono', 'Courier New', monospace;
  }

  html, body {
    background: var(--bg);
    color: var(--txt);
    font-family: var(--font-body);
    -webkit-font-smoothing: antialiased;
  }

  .section-label {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.16em;
    color: var(--dim);
    text-transform: uppercase;
    margin-bottom: 16px;
  }
  .section-label .slash { color: #374151; }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: #222; border-radius: 3px; }

  /* ── Scroll-reveal animations ── */
  .reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.55s cubic-bezier(0.16,1,0.3,1),
                transform 0.55s cubic-bezier(0.16,1,0.3,1);
  }
  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .reveal-left {
    opacity: 0;
    transform: translateX(-24px);
    transition: opacity 0.55s cubic-bezier(0.16,1,0.3,1),
                transform 0.55s cubic-bezier(0.16,1,0.3,1);
  }
  .reveal-left.visible {
    opacity: 1;
    transform: translateX(0);
  }
  .reveal-right {
    opacity: 0;
    transform: translateX(24px);
    transition: opacity 0.55s cubic-bezier(0.16,1,0.3,1),
                transform 0.55s cubic-bezier(0.16,1,0.3,1);
  }
  .reveal-right.visible {
    opacity: 1;
    transform: translateX(0);
  }
  .reveal-scale {
    opacity: 0;
    transform: scale(0.94);
    transition: opacity 0.5s cubic-bezier(0.16,1,0.3,1),
                transform 0.5s cubic-bezier(0.16,1,0.3,1);
  }
  .reveal-scale.visible {
    opacity: 1;
    transform: scale(1);
  }

  /* stagger children inside a .stagger-parent */
  .stagger-parent .reveal:nth-child(1) { transition-delay: 0ms; }
  .stagger-parent .reveal:nth-child(2) { transition-delay: 80ms; }
  .stagger-parent .reveal:nth-child(3) { transition-delay: 160ms; }
  .stagger-parent .reveal:nth-child(4) { transition-delay: 240ms; }
  .stagger-parent .reveal:nth-child(5) { transition-delay: 320ms; }
  .stagger-parent .reveal:nth-child(6) { transition-delay: 400ms; }
  .stagger-parent .reveal:nth-child(7) { transition-delay: 480ms; }
  .stagger-parent .reveal:nth-child(8) { transition-delay: 560ms; }

  /* Number counter animation */
  @keyframes countUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .num-animate {
    animation: countUp 0.5s cubic-bezier(0.16,1,0.3,1) both;
  }

  /* Timeline left/right alternating */
  .tl-left  { opacity: 0; transform: translateX(-32px); transition: opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1); }
  .tl-right { opacity: 0; transform: translateX(32px);  transition: opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1); }
  .tl-left.visible, .tl-right.visible { opacity: 1; transform: translateX(0); }
`;

// ── Data ──────────────────────────────────────────────────────────────────────

const TIMELINE = [
  { n: 1,  date: "November 2024",  title: "The Beginning",          body: "Trade Echo was founded to level the playing field between retail and institutional traders by providing access to the same data and insights that professional firms use." },
  { n: 2,  date: "December 2024",  title: "Platform Launch",        body: "Launched the first version of the Trade Echo web terminal focused on Option Flow and real-time market data. Early retail traders joined from Discord and community word-of-mouth." },
  { n: 3,  date: "January 2025",   title: "Community Growth",       body: "Discord community crossed 5,000 active traders. Dedicated channels launched for SPY/QQQ trades, large prints, and daily market talk. Copy Trading and community features rolled out for sharing insights." },
  { n: 4,  date: "February 2025",  title: "Advanced Analytics",     body: "Integrated AI and machine learning capabilities including sentiment analysis, pattern recognition, and automated alerts. Members could build their own views of the flow with custom filters and strike-level screeners." },
  { n: 5,  date: "April 2025",     title: "Algo Edge Launch",       body: "Launched Algo Edge with algorithmic pattern detection, call/put ratio analysis, and momentum filters. Quantitative data analysis previously reserved for hedge funds." },
  { n: 6,  date: "August 2025",    title: "Cortex AI Integration",  body: "Cortex AI shipped. Ask the terminal what the flow is saying and get answers in seconds, with data from every Trade Echo module as context." },
  { n: 7,  date: "November 2025",  title: "Dealer Edge Launch",     body: "GEX heatmaps, gamma flip points, call walls, put walls, and anchor levels released. A full dealer positioning view replaces $699/mo competitors." },
  { n: 8,  date: "Q1 2026",        title: "Copy Trading Launch",    body: "Launched Copy Trading. Follow top-performing traders, view their activity, and get alerts when they open new positions. Optional brokerage linking for self-directed automation where available. 5,000+ active copy traders." },
];

const MISSION = [
  { title: "One Connected Workflow",            body: "Traders shouldn't have to pay for one platform for flow, one for dealer levels, and another for community context." },
  { title: "Clarity Over Noise",                body: "We organize institutional signals so traders understand what matters faster instead of drowning in disconnected data points." },
  { title: "Community That Sharpens Execution", body: "Beyond the platform, Trade Echo helps traders learn together, compare setups, and stay accountable." },
];

const NUMBERS = [
  { value: "50K+",   label: "Options tracked daily" },
  { value: "$2B+",   label: "Options volume monitored" },
  { value: "5,000+", label: "Discord community members" },
  { value: "99.9%",  label: "Platform uptime" },
];

const VALUES = [
  {
    title: "Transparency",
    body: "Every flow alert shows its source. No black box signals. You see exactly what triggered it and why. Real-time, sourced, verifiable.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    title: "Community",
    body: "5,000+ traders in Discord sharing setups, analysis, and insights every day. Monthly trading competitions with $15,000+ in prizes.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    title: "Innovation",
    body: "Dealer Edge, Algo Edge, Copy Trading, Cortex. We build what retail traders actually need. New features ship every month.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
];

const SIGNAL_CH    = ["momentum-trades", "spy-qqq-trades", "large-trades", "high-value-80", "weekly-trades"];
const COMMUNITY_CH = ["market-news", "stock-success", "market-talk", "stock-analysis", "watchlist"];

// ── Helpers ───────────────────────────────────────────────────────────────────

const ArrowRight = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const MissionIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const card = {
  background: "var(--surf)",
  border: "1px solid var(--bdr)",
  borderRadius: 14,
  padding: "22px 22px 20px",
};

// ── useScrollReveal hook ──────────────────────────────────────────────────────

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right, .reveal-scale, .tl-left, .tl-right"
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ── Btn helpers (avoids inline onMouse repetition) ────────────────────────────

function BtnGreen({ children, onClick, href }) {
  const base = {
    display: "inline-flex", alignItems: "center", gap: 8,
    background: "var(--acc)", color: "#0a0a0a",
    fontWeight: 700, fontSize: 15, padding: "12px 26px",
    borderRadius: 999, textDecoration: "none", border: "none",
    fontFamily: "var(--font-body)", cursor: "pointer",
    transition: "background 0.15s, transform 0.12s",
  };
  const hover = (e) => { e.currentTarget.style.background = "#b8912e"; e.currentTarget.style.transform = "translateY(-1px)"; };
  const leave = (e) => { e.currentTarget.style.background = "var(--acc)"; e.currentTarget.style.transform = "translateY(0)"; };
  if (href) return <a href={href} target="_blank" rel="noreferrer" style={base} onMouseEnter={hover} onMouseLeave={leave}>{children}</a>;
  return <button type="button" style={base} onClick={onClick} onMouseEnter={hover} onMouseLeave={leave}>{children}</button>;
}

function BtnOutline({ children, onClick }) {
  const base = {
    display: "inline-flex", alignItems: "center", gap: 8,
    background: "transparent", color: "var(--txt2)",
    fontWeight: 600, fontSize: 15, padding: "12px 26px",
    borderRadius: 999, border: "1px solid var(--bdr2)",
    textDecoration: "none", fontFamily: "var(--font-body)", cursor: "pointer",
    transition: "border-color 0.15s, color 0.15s",
  };
  const hover = (e) => { e.currentTarget.style.borderColor = "#4b5563"; e.currentTarget.style.color = "#fff"; };
  const leave = (e) => { e.currentTarget.style.borderColor = "var(--bdr2)"; e.currentTarget.style.color = "var(--txt2)"; };
  return <button type="button" style={base} onClick={onClick} onMouseEnter={hover} onMouseLeave={leave}>{children}</button>;
}

// ── Main component ────────────────────────────────────────────────────────────

export default function AboutPage() {
  const navigate = useNavigate();
  useScrollReveal();

  // Navigate to pricing page
  const goToPricing = () => navigate("/pricing");

  // Navigate to platform page and scroll to Platform section
 const goToPlatform = () => {
  navigate("/platform");
  setTimeout(() => {
    const el = document.getElementById("platform-section");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 120);
};

  return (
    <>
      <style>{GLOBAL}</style>

      <main style={{ background: "var(--bg)", minHeight: "100vh", padding: "0 0 80px" }}>

        {/* ══ 01 / HERO ══════════════════════════════════════════════════════ */}
        <section style={{ textAlign: "center", padding: "80px 24px 72px", borderBottom: "1px solid var(--bdr)" }}>
          <div className="section-label reveal">
            <span>01</span><span className="slash">/</span><span>About</span>
          </div>

          <h1 className="reveal" style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 900, color: "var(--txt)",
            letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 20,
            transitionDelay: "60ms",
          }}>
            Institutional data,<br />
            built for <span style={{ color: "var(--acc)" }}>retail traders.</span>
          </h1>

          <p className="reveal" style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.75, maxWidth: 580, margin: "0 auto 10px", transitionDelay: "120ms" }}>
            Trade Echo combines Option Flow, Dark Pool, Dealer Edge, and Algo Edge with
            community-driven education. The signal doesn't stop at raw data.
          </p>
          <p className="reveal" style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.75, maxWidth: 580, margin: "0 auto 36px", transitionDelay: "160ms" }}>
            One platform. No stitching together 3–4 separate subscriptions. Move from
            market signal to conviction faster.
          </p>

          <div className="reveal" style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", transitionDelay: "200ms" }}>
            {/* ✅ View Plans → /pricing */}
            <BtnGreen onClick={goToPricing}>
              View Plans <ArrowRight size={15} />
            </BtnGreen>
            {/* ✅ View Features → /platform (Platform section) */}
            <BtnOutline onClick={goToPlatform}>
              View Features
            </BtnOutline>
          </div>
        </section>

        {/* ══ 02 / TIMELINE ══════════════════════════════════════════════════ */}
        <section style={{ textAlign: "center", padding: "72px 24px 64px", borderBottom: "1px solid var(--bdr)" }}>
          <div className="section-label reveal">
            <span>02</span><span className="slash">/</span><span>Timeline</span>
          </div>
          <h2 className="reveal" style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 900, color: "var(--txt)", letterSpacing: "-0.03em", marginBottom: 12, transitionDelay: "60ms" }}>
            Our story.
          </h2>
          <p className="reveal" style={{ fontSize: 15, color: "var(--muted)", marginBottom: 52, lineHeight: 1.6, transitionDelay: "100ms" }}>
            From idea to professional-grade platform in under two years.
          </p>

          <div style={{ maxWidth: 820, margin: "0 auto", position: "relative" }}>
            {/* Center line */}
            <div style={{
              position: "absolute", left: "50%", top: 0, bottom: 0,
              width: 2, background: "var(--acc)", transform: "translateX(-50%)", zIndex: 0,
            }} />

            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {TIMELINE.map((item, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <div key={i} style={{
                    display: "flex",
                    justifyContent: isLeft ? "flex-start" : "flex-end",
                    position: "relative",
                    paddingBottom: 28,
                    alignItems: "flex-start",
                  }}>
                    {/* Dot */}
                    <div style={{
                      position: "absolute", left: "50%", top: 16,
                      transform: "translate(-50%, 0)",
                      width: 14, height: 14,
                      background: "var(--acc)", borderRadius: "50%",
                      zIndex: 2, boxShadow: "0 0 0 3px var(--bg)",
                    }} />

                    {/* Card — alternating left/right slide */}
                    <div
                      className={isLeft ? "tl-left" : "tl-right"}
                      style={{
                        width: "calc(50% - 30px)",
                        background: "var(--surf)",
                        border: "1px solid var(--bdr)",
                        borderRadius: 12,
                        padding: "18px 20px",
                        textAlign: "left",
                        position: "relative", zIndex: 1,
                        transitionDelay: `${i * 60}ms`,
                      }}
                    >
                      <div style={{ marginBottom: 8 }}>
                        <span style={{
                          fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600,
                          color: "var(--acc)", background: "var(--acc-faint)",
                          border: "1px solid var(--acc-ring)",
                          borderRadius: 999, padding: "2px 10px",
                          display: "inline-block", marginBottom: 6,
                        }}>
                          {item.date}
                        </span>
                        <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--txt2)" }}>{item.title}</h3>
                      </div>
                      <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.65 }}>{item.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══ 03 / MISSION ═══════════════════════════════════════════════════ */}
        <section style={{ textAlign: "center", padding: "72px 24px 64px", borderBottom: "1px solid var(--bdr)" }}>
          <div className="section-label reveal">
            <span>03</span><span className="slash">/</span><span>Mission</span>
          </div>
          <h2 className="reveal" style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 900, color: "var(--txt)", letterSpacing: "-0.03em", marginBottom: 16, transitionDelay: "60ms" }}>
            Our mission.
          </h2>
          <p className="reveal" style={{ fontSize: 15, color: "var(--txt2)", lineHeight: 1.75, maxWidth: 600, margin: "0 auto 44px", transitionDelay: "100ms" }}>
            Democratize institutional-level trading insights. Give retail traders the same data and analysis tools
            that professional firms use to move with informed decisions.
          </p>

          <div className="stagger-parent" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 14, maxWidth: 920, margin: "0 auto", textAlign: "left",
          }}>
            {MISSION.map((m, i) => (
              <div key={i} className="reveal" style={card}>
                <div style={{
                  width: 36, height: 36,
                  background: "var(--acc-faint)", border: "1px solid var(--acc-ring)",
                  borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 14, color: "var(--acc)",
                }}>
                  <MissionIcon />
                </div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--txt2)", marginBottom: 8 }}>{m.title}</h3>
                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.65 }}>{m.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══ 04 / BY THE NUMBERS ════════════════════════════════════════════ */}
        <section style={{ textAlign: "center", padding: "72px 24px 64px", borderBottom: "1px solid var(--bdr)" }}>
          <div className="section-label reveal">
            <span>04</span><span className="slash">/</span><span>By the numbers</span>
          </div>
          <h2 className="reveal" style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 900, color: "var(--txt)", letterSpacing: "-0.03em", marginBottom: 40, transitionDelay: "60ms" }}>
            Trade Echo in production.
          </h2>

          <div className="reveal-scale" style={{
            maxWidth: 900, margin: "0 auto",
            background: "var(--surf)", border: "1px solid var(--bdr)",
            borderRadius: 16, padding: "36px 24px",
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0,
          }}>
            {NUMBERS.map((n, i) => (
              <div key={i} style={{
                textAlign: "center",
                borderRight: i < NUMBERS.length - 1 ? "1px solid var(--bdr)" : "none",
                padding: "0 20px",
              }}>
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "clamp(28px, 3vw, 38px)",
                  fontWeight: 700, color: "var(--txt)",
                  letterSpacing: "-0.02em", marginBottom: 8,
                }}>
                  {n.value}
                </div>
                <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>{n.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ 05 / VALUES ════════════════════════════════════════════════════ */}
        <section style={{ textAlign: "center", padding: "72px 24px 64px", borderBottom: "1px solid var(--bdr)" }}>
          <div className="section-label reveal">
            <span>05</span><span className="slash">/</span><span>Values</span>
          </div>
          <h2 className="reveal" style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 900, color: "var(--txt)", letterSpacing: "-0.03em", marginBottom: 44, transitionDelay: "60ms" }}>
            What we stand for.
          </h2>

          <div className="stagger-parent" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 14, maxWidth: 920, margin: "0 auto", textAlign: "left",
          }}>
            {VALUES.map((v, i) => (
              <div key={i} className="reveal" style={{ ...card, transition: "border-color 0.18s, transform 0.15s, opacity 0.55s cubic-bezier(0.16,1,0.3,1)" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--acc-ring)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--bdr)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{
                  width: 36, height: 36,
                  background: "var(--acc-faint)", border: "1px solid var(--acc-ring)",
                  borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--acc)", marginBottom: 14,
                }}>
                  {v.icon}
                </div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--txt2)", marginBottom: 8 }}>{v.title}</h3>
                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.65 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══ 06 / COMMUNITY ═════════════════════════════════════════════════ */}
        <section style={{ textAlign: "center", padding: "72px 24px 64px", borderBottom: "1px solid var(--bdr)" }}>
          <div className="section-label reveal">
            <span>06</span><span className="slash">/</span><span>Community</span>
          </div>
          <h2 className="reveal" style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 16, transitionDelay: "60ms" }}>
            Active <span style={{ color: "var(--acc)" }}>Discord Community.</span>
          </h2>
          <p className="reveal" style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.75, maxWidth: 560, margin: "0 auto 40px", transitionDelay: "100ms" }}>
            Connect with thousands of traders sharing setups, analysis, and real-time alerts.
            Algo Edge signal channels, market discussion, and a watchlist community. All in one server.
          </p>

          <div className="reveal-scale" style={{
            maxWidth: 820, margin: "0 auto",
            background: "#0d1117", border: "1px solid #1e2329",
            borderRadius: 16, overflow: "hidden", textAlign: "left",
          }}>
            {/* Discord header */}
            <div style={{ padding: "24px 28px 20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8, background: "#5865F2",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.031.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                  </svg>
                </div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 16, fontWeight: 700, color: "var(--txt)" }}>
                  discord.gg/tradeecho
                </span>
              </div>
              <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.65, maxWidth: 520 }}>
                Two sides to the server. Signal channels stream alerts straight from Algo Edge. Community Hub is where traders actually talk.
              </p>
            </div>

            {/* Column labels */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: "1px solid #1e2329" }}>
              <div style={{ padding: "14px 28px 0", borderRight: "1px solid #1e2329" }}>
                <p style={{ fontSize: 11, fontFamily: "var(--font-mono)", fontWeight: 600, color: "var(--acc)", textTransform: "uppercase", letterSpacing: "0.12em" }}>Signal Channels</p>
              </div>
              <div style={{ padding: "14px 28px 0" }}>
                <p style={{ fontSize: 11, fontFamily: "var(--font-mono)", fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.12em" }}>Community Hub</p>
              </div>
            </div>

            {/* Channels */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              <div style={{ padding: "12px 28px 24px", borderRight: "1px solid #1e2329", display: "flex", flexDirection: "column", gap: 10 }}>
                {SIGNAL_CH.map((ch) => (
                  <div key={ch} style={{
                    display: "flex", alignItems: "center", gap: 8,
                    background: "#161b22", border: "1px solid #1e2329",
                    borderRadius: 8, padding: "9px 14px",
                  }}>
                    <span style={{ color: "var(--muted)", fontSize: 14 }}>#</span>
                    <span style={{ fontSize: 13, fontFamily: "var(--font-mono)", color: "var(--txt2)" }}>{ch}</span>
                  </div>
                ))}
              </div>
              <div style={{ padding: "12px 28px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
                {COMMUNITY_CH.map((ch) => (
                  <div key={ch} style={{
                    display: "flex", alignItems: "center", gap: 8,
                    background: "#161b22", border: "1px solid #1e2329",
                    borderRadius: 8, padding: "9px 14px",
                  }}>
                    <span style={{ color: "var(--muted)", fontSize: 14 }}>#</span>
                    <span style={{ fontSize: 13, fontFamily: "var(--font-mono)", color: "var(--muted)" }}>{ch}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Join button */}
            <div style={{ padding: "0 28px 24px" }}>
              <a href="https://discord.gg/tradeecho" target="_blank" rel="noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "var(--acc)", color: "#0a0a0a",
                  fontWeight: 700, fontSize: 14, padding: "10px 22px",
                  borderRadius: 999, textDecoration: "none", transition: "background 0.15s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#b8912e"}
                onMouseLeave={e => e.currentTarget.style.background = "var(--acc)"}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.031.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                </svg>
                Join Discord ↗
              </a>
            </div>
          </div>
        </section>

        {/* ══ 07 / RUMBLE ════════════════════════════════════════════════════ */}
        <section style={{ textAlign: "center", padding: "72px 24px 64px", borderBottom: "1px solid var(--bdr)" }}>
          <div className="section-label reveal">
            <span>07</span><span className="slash">/</span><span>Rumble</span>
          </div>
          <h2 className="reveal" style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 900, color: "var(--txt)", letterSpacing: "-0.03em", marginBottom: 16, transitionDelay: "60ms" }}>
            Monthly Trading Rumble.
          </h2>
          <p className="reveal" style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.75, maxWidth: 560, margin: "0 auto 44px", transitionDelay: "100ms" }}>
            Compete for prizes and prove your trading skills against the community.
            Ranked by community vote (65%), performance (25%), and participation (10%).
          </p>

          <div className="stagger-parent" style={{
            display: "flex", alignItems: "flex-end", justifyContent: "center",
            gap: 16, maxWidth: 700, margin: "0 auto",
          }}>
            {/* 2nd place */}
            <div className="reveal" style={{
              flex: 1, background: "var(--surf)", border: "1px solid var(--bdr)",
              borderRadius: 14, padding: "28px 20px 24px", textAlign: "center",
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: "50%", background: "#374151",
                border: "2px solid #4b5563", display: "flex", alignItems: "center",
                justifyContent: "center", margin: "0 auto 14px",
              }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 20, fontWeight: 700, color: "#9ca3af" }}>2</span>
              </div>
              <div style={{ fontSize: 11, color: "var(--dim)", fontFamily: "var(--font-mono)", letterSpacing: "0.1em", marginBottom: 10 }}>2ND PLACE</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 28, fontWeight: 700, color: "var(--txt)", letterSpacing: "0.04em", marginBottom: 8 }}>$3,000</div>
              <div style={{ fontSize: 13, color: "var(--muted)" }}>Runner-up</div>
            </div>

            {/* 1st place */}
            <div className="reveal" style={{
              flex: 1, background: "rgba(234,179,8,0.07)", border: "1px solid rgba(234,179,8,0.35)",
              borderRadius: 14, padding: "36px 20px 28px", textAlign: "center",
              transitionDelay: "80ms",
            }}>
              <div style={{
                width: 52, height: 52, borderRadius: "50%",
                background: "linear-gradient(135deg, #fbbf24, #d97706)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 14px", boxShadow: "0 4px 20px rgba(251,191,36,0.35)",
              }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 22, fontWeight: 700, color: "#0a0a0a" }}>1</span>
              </div>
              <div style={{ fontSize: 11, color: "#d97706", fontFamily: "var(--font-mono)", letterSpacing: "0.1em", marginBottom: 10 }}>1ST PLACE</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 34, fontWeight: 700, color: "var(--txt)", letterSpacing: "0.04em", marginBottom: 8 }}>$4,000</div>
              <div style={{ fontSize: 13, color: "var(--muted)" }}>Monthly champion</div>
            </div>

            {/* 3rd place */}
            <div className="reveal" style={{
              flex: 1, background: "var(--surf)", border: "1px solid var(--bdr)",
              borderRadius: 14, padding: "28px 20px 24px", textAlign: "center",
              transitionDelay: "160ms",
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: "50%", background: "#451a03",
                border: "2px solid #78350f", display: "flex", alignItems: "center",
                justifyContent: "center", margin: "0 auto 14px",
              }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 20, fontWeight: 700, color: "#b45309" }}>3</span>
              </div>
              <div style={{ fontSize: 11, color: "var(--dim)", fontFamily: "var(--font-mono)", letterSpacing: "0.1em", marginBottom: 10 }}>3RD PLACE</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 28, fontWeight: 700, color: "var(--txt)", letterSpacing: "0.04em", marginBottom: 8 }}>$1,500</div>
              <div style={{ fontSize: 13, color: "var(--muted)" }}>Podium finish</div>
            </div>
          </div>

          <p className="reveal" style={{
            textAlign: "center", fontSize: 13, fontFamily: "var(--font-mono)",
            color: "var(--acc)", marginTop: 24, fontWeight: 700,
          }}>
            $15,000+ total prizes every month
          </p>
        </section>

        {/* ══ 08 / GET STARTED ═══════════════════════════════════════════════ */}
        <section style={{ padding: "72px 24px 48px" }}>
          <div className="reveal-scale" style={{
            maxWidth: 820, margin: "0 auto",
            background: "linear-gradient(160deg, rgba(212,175,55,0.10) 0%, rgba(17,19,20,0.95) 40%)",
            border: "1px solid var(--bdr)", borderRadius: 20,
            padding: "56px 40px 52px", textAlign: "center",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
              width: 300, height: 120,
              background: "radial-gradient(ellipse at top, rgba(212,175,55,0.18) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />

            <div className="section-label" style={{ justifyContent: "center" }}>
              <span>08</span><span className="slash">/</span><span>Get started</span>
            </div>

            <h2 style={{
              fontSize: "clamp(22px, 3.5vw, 36px)", fontWeight: 900,
              color: "var(--txt)", letterSpacing: "-0.025em",
              lineHeight: 1.2, marginBottom: 16,
            }}>
              See what Trade Echo looks like<br />in your <span style={{ color: "var(--acc)" }}>workflow.</span>
            </h2>

            <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.75, maxWidth: 500, margin: "0 auto 36px" }}>
              Explore the full feature set, compare plans, and join the community combining
              institutional data with practical trading context.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
              {/* ✅ Compare Plans → /pricing */}
              <BtnGreen onClick={goToPricing}>
                Compare Plans <ArrowRight size={15} />
              </BtnGreen>
              {/* ✅ View Features → /platform */}
              <BtnOutline onClick={goToPlatform}>
                View Features
              </BtnOutline>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}