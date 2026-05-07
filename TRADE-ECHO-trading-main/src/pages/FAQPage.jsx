// FaqPage.jsx — Matches tradeecho.com/faq exactly
// All 7 sections: Hero (search), About Trade Echo, Features & Tools, Pricing, Comparisons, Access, Still Stuck CTA
// Design: dark theme, green accent, lucide icons, expand/collapse accordion, green hover on open card

import { useState, useEffect, useRef } from "react";
import {
  Search, ChevronRight, ExternalLink
} from "lucide-react";
// import { ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
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

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: #222; border-radius: 3px; }

  /* ── Section label ── */
  .faq-section-label {
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
  .faq-section-label .slash { color: #374151; }

  /* ── Section heading ── */
  .faq-section-heading {
    font-size: clamp(20px, 2.5vw, 28px);
    font-weight: 900;
    color: var(--txt);
    letter-spacing: -0.025em;
    margin-bottom: 24px;
  }

  /* ── Accordion card ── */
  .faq-item {
    border: 1px solid var(--bdr);
    border-radius: 12px;
    margin-bottom: 10px;
    overflow: hidden;
    background: var(--surf);
    transition: border-color 0.2s ease, background 0.2s ease;
  }
  .faq-item:hover:not(.open) {
    border-color: var(--bdr2);
  }
  .faq-item.open {
    border-color: var(--acc-ring);
    background: rgba(212,175,55,0.04);
  }

  /* ── Question row ── */
  .faq-question {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 20px;
    background: transparent;
    border: none;
    cursor: pointer;
    text-align: left;
    gap: 12px;
  }
  .faq-question-text {
    font-size: 14px;
    font-weight: 600;
    color: var(--txt2);
    line-height: 1.45;
    flex: 1;
    transition: color 0.2s ease;
  }
  .faq-item.open .faq-question-text {
    color: var(--acc);
  }

  /* ── Chevron circle button ── */
  .faq-chevron-btn {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1px solid var(--bdr2);
    background: rgba(212,175,55,0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: var(--acc);
    transition: transform 0.25s ease, background 0.2s ease, border-color 0.2s ease;
  }
  .faq-item.open .faq-chevron-btn {
    transform: rotate(90deg);
    background: rgba(212,175,55,0.18);
    border-color: var(--acc-ring);
  }

  /* ── Answer panel ── */
  .faq-answer {
    overflow: hidden;
    max-height: 0;
    opacity: 0;
    padding: 0 20px;
    transition:
      max-height 0.32s cubic-bezier(0.4, 0, 0.2, 1),
      opacity 0.25s ease,
      padding 0.25s ease;
  }
  .faq-answer.open {
    max-height: 700px;
    opacity: 1;
    padding: 0 20px 18px;
  }
  .faq-answer p {
    font-size: 13px;
    color: var(--muted);
    line-height: 1.72;
    border-top: 1px solid rgba(212,175,55,0.12);
    padding-top: 14px;
  }

  /* ── Search bar ── */
  .search-bar {
    width: 100%;
    max-width: 560px;
    position: relative;
    margin: 0 auto;
  }
  .search-input {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--bdr2);
    border-radius: 12px;
    padding: 14px 52px 14px 44px;
    font-family: var(--font-body);
    font-size: 14px;
    color: var(--txt2);
    outline: none;
    transition: border-color 0.2s ease, background 0.2s ease;
  }
  .search-input::placeholder { color: var(--muted); }
  .search-input:focus {
    border-color: var(--acc-ring);
    background: rgba(212,175,55,0.04);
  }
  .search-icon-left {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--muted);
    pointer-events: none;
    display: flex;
  }
  .search-slash {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    background: var(--surf);
    border: 1px solid var(--bdr2);
    border-radius: 5px;
    padding: 2px 6px;
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--dim);
    line-height: 1.4;
  }

  /* ── CTA pill buttons ── */
  .btn-green {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--acc);
    color: #0a0a0a;
    font-weight: 700;
    font-size: 14px;
    padding: 11px 24px;
    border-radius: 999px;
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: background 0.15s, transform 0.12s;
    font-family: var(--font-body);
  }
  .btn-green:hover {
    background: #b8912e;
    transform: translateY(-1px);
  }
  .btn-outline {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    color: var(--txt2);
    font-weight: 600;
    font-size: 14px;
    padding: 11px 24px;
    border-radius: 999px;
    border: 1px solid var(--bdr2);
    text-decoration: none;
    cursor: pointer;
    transition: border-color 0.15s;
    font-family: var(--font-body);
  }
  .btn-outline:hover {
    border-color: #4b5563;
  }
`;

// ── FAQ DATA ─────────────────────────────────────────────────────────────────

const FAQ_SECTIONS = [
  {
    id: "about",
    num: "02",
    label: "About Trade Echo",
    heading: "About Trade Echo.",
    items: [
      {
        q: "What is Trade Echo?",
        a: "Trade Echo is a professional-grade market data analytics platform (tradeecho.com) that provides options flow, dark pool data, dealer positioning (GEX), and algorithmic pattern detection for $199 per month. It gives retail traders access to real-time smart money data. It combines OptionFlow, Darkpool, DealerEdge, AlgoEdge, NewsEdge, Cortex (AI chat), copy trading, and the trade journal into one unified workspace available on web, iOS, and Android.",
        defaultOpen: true,
      },
      {
        q: "How does Trade Echo work?",
        a: "Trade Echo aggregates institutional-grade market data in real time — options flow, dark pool prints, dealer gamma exposure, and algorithmic signals — and presents them in a unified dashboard. Every alert shows its source so you always know what triggered it and why.",
      },
      {
        q: "Is Trade Echo the same as Echo Trade?",
        a: "No. Trade Echo (tradeecho.com) is a separate product from Echo Trade. Trade Echo is focused on options flow analytics, dealer positioning (GEX), and community-driven trading insights for retail traders.",
      },
      {
        q: "Can beginners use Trade Echo?",
        a: "Yes. Trade Echo is designed for both beginners and professional traders. The platform includes educational resources, a community Discord with 5,000+ active traders, and Cortex AI chat to help you interpret signals and build conviction in your trading decisions.",
      },
    ],
  },
  {
    id: "features",
    num: "03",
    label: "Features and tools",
    heading: "Features and tools.",
    items: [
      {
        q: "What is OptionFlow on Trade Echo?",
        a: "OptionFlow is Trade Echo's real-time options flow scanner. It tracks every unusual options trade across the market — sweeps, blocks, and large prints — filtering by premium, contract type, expiry, and sentiment. Each alert includes the ticker, strike, expiry, premium paid, side (call/put), and whether it was a sweep or a block.",
        defaultOpen: true,
      },
      {
        q: "What is DealerEdge on Trade Echo?",
        a: "DealerEdge is Trade Echo's gamma exposure (GEX) module. It shows dealer positioning heatmaps, gamma flip levels, call walls, put walls, and anchor levels — the same data institutional desks use to identify key price magnets and volatility inflection points.",
      },
      {
        q: "What is gamma exposure (GEX) and how does Trade Echo use it?",
        a: "Gamma exposure (GEX) measures how much delta hedging market makers must do as price moves. When dealers are short gamma, they amplify moves. When they're long gamma, they dampen them. Trade Echo's DealerEdge module visualizes GEX across strikes so you can identify where price is likely to pin, accelerate, or reverse.",
      },
      {
        q: "What is Copy Trading on Trade Echo?",
        a: "Copy Trading lets you follow top-performing traders on the platform, view their live activity, and receive alerts when they open new positions. Optional brokerage linking allows for self-directed automation where available. There are currently 5,000+ active copy traders on the platform.",
      },
      {
        q: "Can I track my trades on Trade Echo?",
        a: "Yes. Trade Echo includes a full trade journal where you can log entries, exits, notes, and screenshots. The journal connects to your flow activity so you can review which signals led to your best and worst trades over time.",
      },
    ],
  },
  {
    id: "pricing",
    num: "04",
    label: "Pricing",
    heading: "Pricing.",
    items: [
      {
        q: "What is Trade Echo pricing?",
        a: "Trade Echo is $199 per month. This includes full access to OptionFlow, DealerEdge (GEX), AlgoEdge, Darkpool, NewsEdge, Cortex AI, Copy Trading, the trade journal, and the Discord community. There are no feature-gated tiers — every subscriber gets the complete platform.",
      },
      {
        q: "What are all the features included in each plan?",
        a: "Every Trade Echo subscription includes: OptionFlow (real-time options scanner), DealerEdge (GEX heatmaps, gamma flip, call/put walls), AlgoEdge (algorithmic pattern detection), Darkpool (dark pool prints), NewsEdge (real-time market news), Cortex AI (AI market assistant), Copy Trading, Trade Journal, and full Discord community access including signal channels and Monthly Trading Rumble competitions.",
      },
    ],
  },
  {
    id: "comparisons",
    num: "05",
    label: "Comparisons",
    heading: "Comparisons.",
    items: [
      {
        q: "Trade Echo vs Unusual Whales?",
        a: "Unusual Whales focuses primarily on options flow with strong political trade tracking. Trade Echo combines options flow with DealerEdge (GEX), AlgoEdge (algorithmic signals), Copy Trading, and an active Discord community — giving you more context to act on the data, not just see it.",
      },
      {
        q: "Trade Echo vs FlowAlgo?",
        a: "FlowAlgo is a standalone options flow tool. Trade Echo includes options flow plus dealer positioning (GEX), algorithmic signals, dark pool data, an AI assistant (Cortex), and a 5,000+ member trading community — all in one subscription instead of multiple tools.",
      },
      {
        q: "Trade Echo vs Cheddar Flow?",
        a: "Cheddar Flow provides options flow alerts. Trade Echo expands on that with GEX dealer levels, AlgoEdge pattern detection, copy trading, and community-driven trading competitions with $15,000+ in monthly prizes.",
      },
      {
        q: "Trade Echo vs Heatseeker by Skylit.ai?",
        a: "Heatseeker focuses on options heat and momentum scanning. Trade Echo provides a broader institutional data stack — options flow, dark pool, GEX, algorithmic signals, AI chat, and copy trading — designed as an integrated workflow rather than a single signal tool.",
      },
    ],
  },
  {
    id: "access",
    num: "06",
    label: "Access",
    heading: "Access.",
    items: [
      {
        q: "Is Discord included with Trade Echo?",
        a: "Yes. Every Trade Echo subscription includes full access to the Discord community at discord.gg/tradeecho. This includes signal channels that stream live alerts from AlgoEdge, as well as community channels for market discussion, trade sharing, and the Monthly Trading Rumble competitions.",
      },
      {
        q: "Is Trade Echo available on mobile?",
        a: "Yes. Trade Echo is available on web (tradeecho.com), iOS, and Android. The mobile apps give you access to OptionFlow, DealerEdge, AlgoEdge, Cortex AI, and your trade journal on the go — with real-time push notifications for flow alerts.",
      },
    ],
  },
];

// ── Accordion Item Component ──────────────────────────────────────────────────
function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className={`faq-item${isOpen ? " open" : ""}`}>
      <button
        className="faq-question"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="faq-question-text">{item.q}</span>
        <span className="faq-chevron-btn" aria-hidden="true">
          <ChevronRight size={14} strokeWidth={2.5} />
        </span>
      </button>
      <div className={`faq-answer${isOpen ? " open" : ""}`}>
        <p>{item.a}</p>
      </div>
    </div>
  );
}

// ── FAQ Section Component ─────────────────────────────────────────────────────
function FaqSection({ section, openMap, onToggle }) {
  return (
    <section
      style={{
        padding: "52px 0 44px",
        borderBottom: "1px solid var(--bdr)",
      }}
    >
      <div className="faq-section-label">
        <span>{section.num}</span>
        <span className="slash">/</span>
        <span>{section.label.toUpperCase()}</span>
      </div>
      <h2 className="faq-section-heading">{section.heading}</h2>
      <div>
        {section.items.map((item, idx) => {
          const key = `${section.id}-${idx}`;
          return (
            <FaqItem
              key={key}
              item={item}
              isOpen={!!openMap[key]}
              onToggle={() => onToggle(key)}
            />
          );
        })}
      </div>
    </section>
  );
}

// ── Main FaqPage Component ────────────────────────────────────────────────────
export default function FaqPage() {
   const navigate = useNavigate();
  // Build initial open state — items with defaultOpen:true start expanded
  const initialOpen = {};
  FAQ_SECTIONS.forEach((sec) => {
    sec.items.forEach((item, idx) => {
      if (item.defaultOpen) initialOpen[`${sec.id}-${idx}`] = true;
    });
  });

  const [openMap, setOpenMap] = useState(initialOpen);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(null); // null = show all sections

  // Keyboard shortcut: "/" focuses search bar, Escape clears it
  useEffect(() => {
    const handler = (e) => {
      if (
        e.key === "/" &&
        document.activeElement.tagName !== "INPUT" &&
        document.activeElement.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        document.getElementById("faq-search")?.focus();
      }
      if (e.key === "Escape") {
        document.getElementById("faq-search")?.blur();
        setQuery("");
        setFiltered(null);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Live search filter
  const handleSearch = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (!val.trim()) {
      setFiltered(null);
      return;
    }
    const q = val.toLowerCase();
    const results = [];
    FAQ_SECTIONS.forEach((sec) => {
      sec.items.forEach((item, idx) => {
        if (
          item.q.toLowerCase().includes(q) ||
          item.a.toLowerCase().includes(q)
        ) {
          results.push({
            secId: sec.id,
            item,
            idx,
            key: `${sec.id}-${idx}`,
          });
        }
      });
    });
    setFiltered(results);
  };

  const toggleItem = (key) => {
    setOpenMap((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <style>{GLOBAL}</style>

      <main
        style={{
          maxWidth: 860,
          margin: "0 auto",
          padding: "0 24px 80px",
        }}
      >
        {/* ══════════════════════════════════════════════════════════════════
            01 / FAQ — Hero with search bar
        ══════════════════════════════════════════════════════════════════ */}
        <section
          style={{
            textAlign: "center",
            padding: "80px 0 64px",
            borderBottom: "1px solid var(--bdr)",
          }}
        >
          {/* Section label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.16em",
              color: "var(--dim)",
              textTransform: "uppercase",
              marginBottom: 24,
            }}
          >
            <span>01</span>
            <span style={{ color: "#374151" }}>/</span>
            <span>FAQ</span>
          </div>

          {/* Hero heading */}
          <h1
            style={{
              fontSize: "clamp(40px, 6vw, 72px)",
              fontWeight: 900,
              color: "var(--txt)",
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
              marginBottom: 20,
            }}
          >
            Frequently
            <br />
            asked <span style={{ color: "var(--acc)" }}>questions.</span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 16,
              color: "var(--muted)",
              lineHeight: 1.7,
              marginBottom: 36,
            }}
          >
            Everything you need to know about Trade Echo. Options flow, dark
            pool, GEX,
            <br />
            pricing, and more.
          </p>

          {/* Search bar */}
          <div className="search-bar">
            <span className="search-icon-left">
              <Search size={15} />
            </span>
            <input
              id="faq-search"
              className="search-input"
              type="text"
              placeholder="Search questions…"
              value={query}
              onChange={handleSearch}
              autoComplete="off"
              spellCheck="false"
            />
            <span className="search-slash">/</span>
          </div>

          {/* Live search results */}
          {filtered !== null && (
            <div style={{ marginTop: 24, textAlign: "left" }}>
              {filtered.length === 0 ? (
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--muted)",
                    textAlign: "center",
                    padding: "28px 0",
                  }}
                >
                  No questions match &ldquo;{query}&rdquo; — try a different
                  keyword.
                </p>
              ) : (
                <>
                  <p
                    style={{
                      fontSize: 12,
                      fontFamily: "var(--font-mono)",
                      color: "var(--dim)",
                      marginBottom: 14,
                    }}
                  >
                    {filtered.length} result
                    {filtered.length !== 1 ? "s" : ""} for &ldquo;{query}
                    &rdquo;
                  </p>
                  {filtered.map((r) => (
                    <FaqItem
                      key={r.key}
                      item={r.item}
                      isOpen={!!openMap[r.key]}
                      onToggle={() => toggleItem(r.key)}
                    />
                  ))}
                </>
              )}
            </div>
          )}
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            02–06 / FAQ Sections — rendered only when not searching
        ══════════════════════════════════════════════════════════════════ */}
        {filtered === null &&
          FAQ_SECTIONS.map((section) => (
            <FaqSection
              key={section.id}
              section={section}
              openMap={openMap}
              onToggle={toggleItem}
            />
          ))}

        {/* ══════════════════════════════════════════════════════════════════
            07 / Still Stuck — CTA card with sandal glow
        ══════════════════════════════════════════════════════════════════ */}
        {filtered === null && (
          <section style={{ padding: "60px 0 32px" }}>
            <div
              style={{
                background:
                  "linear-gradient(160deg, rgba(212,175,55,0.13) 0%, rgba(11,13,14,0.97) 45%)",
                border: "1px solid var(--bdr)",
                borderRadius: 20,
                padding: "56px 40px 52px",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Radial sandal glow at top */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 360,
                  height: 140,
                  background:
                    "radial-gradient(ellipse at top, rgba(212,175,55,0.22) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />

              {/* Section label */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.16em",
                  color: "var(--dim)",
                  textTransform: "uppercase",
                  marginBottom: 20,
                  position: "relative",
                }}
              >
                <span>07</span>
                <span style={{ color: "#374151" }}>/</span>
                <span>Still Stuck</span>
              </div>

              {/* Heading */}
              <h2
                style={{
                  fontSize: "clamp(26px, 4vw, 48px)",
                  fontWeight: 900,
                  color: "var(--txt)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                  marginBottom: 16,
                  position: "relative",
                }}
              >
                Still have{" "}
                <span style={{ color: "var(--acc)" }}>questions?</span>
              </h2>

              {/* Subtitle */}
              <p
                style={{
                  fontSize: 15,
                  color: "var(--muted)",
                  lineHeight: 1.75,
                  marginBottom: 36,
                  position: "relative",
                }}
              >
                Our team and community are active every day. Start a
                conversation in Discord or reach out directly.
              </p>

              {/* CTA buttons */}
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  flexWrap: "wrap",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                  <button
            className="btn-green"
            onClick={() => navigate("/pricing")}
            type="button"
          >
            View Pricing
          </button>
                   <button
            className="btn-outline"
            onClick={() => navigate("/what-is-trade-echo")}
            type="button"
          >
            What is Trade Echo?
          </button>
                <a
                  href="https://discord.gg/tradeecho"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline"
                >
                  Join Discord <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
