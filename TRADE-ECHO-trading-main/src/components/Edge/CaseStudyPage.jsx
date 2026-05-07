// components/Edge/CaseStudyPage.jsx
import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, Clock, BookOpen } from "lucide-react";

// ── Article data ───────────────────────────────────────────────────────────────
const ARTICLES = {
  "case-study-tsla-750-pct": {
    breadcrumb: ["Edge", "Stage 4", "Case Studies"],
    level: "Advanced",
    levelColor: "#9ca3af",
    levelBg: "rgba(239,68,68,0.1)",
    levelBorder: "rgba(239,68,68,0.3)",
    mins: 2,
    stage: "Stage 4: Prove It",
    tags: ["case study", "TSLA"],
    title: "Case Study: TSLA 410c - 750% Gain with Three Edges",
    subtitle:
      "How DealerEdge gamma setup, NewsEdge China catalyst, and AlgoEdge $550M+ institutional flow combined for a 750% options win.",
    sections: [
      {
        id: "three-edge-setup",
        heading: "Three-Edge Setup",
        body: "Three Trade Echo tools flagged this setup before market open. TSLA was trading around $398 pre-market.",
      },
      {
        id: "dealeredge-gamma-map",
        heading: "DealerEdge: The Gamma Map",
        body: "Gamma Anchor at 410, Flip Level at 401, GEX Rating 4/5 (short gamma). The thesis: if TSLA reclaims 401, dealers are forced to buy to hedge, creating an explosive path toward the 410 anchor. Below 397.5, negative gamma takes over and amplifies the downside.\n\nThe AI analysis confirmed: bullish, significant call gamma at the 410 strike, buyers likely to defend.",
      },
      {
        id: "newsedge-catalyst",
        heading: "NewsEdge: The Catalyst",
        body: "China sales data came in strong for TSLA - a fundamental catalyst that gave the technical setup a reason to trigger.",
      },
      {
        id: "algoedge-institutional-flow",
        heading: "AlgoEdge: The Institutional Flow",
        body: "279 large trades totaling **$550M+ in premium** at the prior close. Flow was heavily skewed to calls: TSLA 455 calls at 1,408 contracts ($10M), 410 calls at 1,408 contracts ($10.5M), 430 calls at 1,005 contracts, and 600 calls with 5,400 contracts across expirations ($2.4M each). Massive institutional conviction.",
      },
      {
        id: "chart-execution",
        heading: "Chart and Execution",
        body: "Descending trendline from highs, trigger level at 400 (aligned with DealerEdge flip at 401). 400 acts as the trigger, 410 acts as the magnet. Once TSLA reclaimed 401, the short gamma squeeze carried it through. The chart delivered exactly what the tools predicted.",
      },
      {
        id: "result",
        heading: "Result",
        body: "TSLA 410 calls: **750% gain**. Discord community members caught even bigger moves - one trader turned $1.22 into $5.33 for +1,232%, another scaled out of 410 calls for +456%, and another netted $8,890 profit on 70 contracts.",
      },
    ],
    upNext: [
      {
        slug: "case-study-tsla-500-pct",
        title: "Case Study: TSLA 435c - 500% Gain with Structure + Catalyst + Gamma",
        mins: 1,
      },
      {
        slug: "case-study-oklo-10k-challenge",
        title: "Case Study: OKLO 95c - $10K Challenge Winner (+102.6%)",
        mins: 2,
      },
      {
        slug: "discord-server-guide",
        title: "Discord Server Guide: Channels, Commands, and Your First 5 Steps",
        mins: 1,
      },
    ],
    prev: null,
    next: {
      slug: "case-study-tsla-500-pct",
      title: "Case Study: TSLA 435c - 500% Gain...",
    },
  },

  "case-study-tsla-500-pct": {
    breadcrumb: ["Edge", "Stage 4", "Case Studies"],
    level: "Advanced",
    levelColor: "#9ca3af",
    levelBg: "rgba(239,68,68,0.1)",
    levelBorder: "rgba(239,68,68,0.3)",
    mins: 1,
    stage: "Stage 4: Prove It",
    tags: ["case study", "TSLA"],
    title: "Case Study: TSLA 435c - 500% Gain with Structure + Catalyst + Gamma",
    subtitle:
      "SpaceX merger news, positive gamma at 432.5–440, AI-guided entry at 435 — the complete breakdown of a 500% winner.",
    sections: [
      {
        id: "the-setup",
        heading: "The Setup",
        body: "TSLA showed relative strength vs. the broader market before the open. The process: stack catalyst, gamma, and levels before trading.",
      },
      {
        id: "newsedge-catalyst",
        heading: "NewsEdge Catalyst",
        body: "SpaceX merger talks with TSLA - a headline that would drive speculative interest and volume.",
      },
      {
        id: "dealeredge-gamma",
        heading: "DealerEdge Gamma",
        body: 'Positive gamma zone from 432.5 to 440. Anchor Point at 440. Flip Point at 407 (TSLA was above it). GEX Rating: 5. The AI analysis was specific: "Take 435 break entry to target 440."',
      },
      {
        id: "chart-structure",
        heading: "Chart Structure",
        body: "1-hour chart: trendline from January 23 highs at 451 down to opening highs at 433. Resistance at 440 (matched the DealerEdge anchor). Retest level at 425. Plan: clean break and hold above structure, target 440.\n\n3-minute chart: Opening range high at 430, Golden Zone from 415-430. Perfect backtest and bounce at the 0.5 level of the zone.",
      },
      {
        id: "entry-and-exit",
        heading: "Entry and Exit",
        body: "Entry: 435 calls at $1.05 with 0.20 delta. Exit at the 440 target. The options ran from $1.05 to $6.35 - a **500% gain**. Catalyst + structure + gamma + execution all aligned.",
      },
    ],
    upNext: [
      {
        slug: "case-study-tsla-750-pct",
        title: "Case Study: TSLA 410c - 750% Gain with Three Edges",
        mins: 2,
      },
      {
        slug: "case-study-oklo-10k-challenge",
        title: "Case Study: OKLO 95c - $10K Challenge Winner (+102.6%)",
        mins: 2,
      },
      {
        slug: "discord-server-guide",
        title: "Discord Server Guide: Channels, Commands, and Your First 5 Steps",
        mins: 1,
      },
    ],
    prev: {
      slug: "case-study-tsla-750-pct",
      title: "Case Study: TSLA 410c - 750% Gain...",
    },
    next: {
      slug: "case-study-oklo-10k-challenge",
      title: "Case Study: OKLO 95c - $10K Chall...",
    },
  },

  "case-study-oklo-10k-challenge": {
    breadcrumb: ["Edge", "Stage 4", "Case Studies"],
    level: "Advanced",
    levelColor: "#9ca3af",
    levelBg: "rgba(239,68,68,0.1)",
    levelBorder: "rgba(239,68,68,0.3)",
    mins: 2,
    stage: "Stage 4: Prove It",
    tags: ["case study", "OKLO"],
    title: "Case Study: OKLO 95c - $10K Challenge Winner (+102.6%)",
    subtitle:
      "Nuclear sector strength, DOE policy catalyst, DealerEdge levels at 86/95/100, and a textbook 5-edge entry for a 102% gain.",
    sections: [
      {
        id: "top-down-scan",
        heading: "Top-Down Scan",
        body: "Nuclear and uranium sector showed relative strength while the broader market was soft. OKLO had unusual options activity the day before - 120 calls for 02/20 expiry. Big money stepping out in time signals interest building.",
      },
      {
        id: "newsedge-catalysts",
        heading: "NewsEdge Catalysts",
        body: "DOE seeking sites for nuclear deployment with OKLO listed as a beneficiary. Fresh bullish analyst initiation with an aggressive price target. Policy and infrastructure backdrop supporting a bigger move.",
      },
      {
        id: "dealeredge-levels",
        heading: "DealerEdge Levels",
        body: "Anchor at 100. GEX Rating 4. Flip Point around 86. Secondary node at 95. The gamma map gave us exact levels for entry (86), first target (95), and extension (100).",
      },
      {
        id: "chart-structure",
        heading: "Chart Structure",
        body: "1-hour chart showed 86 as the breakout trigger, 95 as first resistance, 100 as the extension target. Clean structure with no overhead supply between levels.",
      },
      {
        id: "entry",
        heading: "Entry",
        body: "5-minute breakout above 86 at 9:46 AM. BTO 10 OKLO 95 calls, 01/30 expiry at $1.15 each. Strike chosen because it aligned with both chart resistance and the DealerEdge node.",
      },
      {
        id: "management-and-exit",
        heading: "Management and Exit",
        body: "Price pulled back to VWAP and held - OKLO maintained relative strength against a weak broader market. Sold at $2.33 at the 95 target zone. **+102.6% gain, $1,180 profit** - pushing the challenge account to $10,000.",
      },
      {
        id: "five-edges-stacked",
        heading: "Five Edges Stacked",
        body: "Sector strength + NewsEdge catalyst + DealerEdge levels + chart structure + clean entry trigger. Five edges pointing the same direction.",
      },
    ],
    upNext: [
      {
        slug: "case-study-tsla-750-pct",
        title: "Case Study: TSLA 410c - 750% Gain with Three Edges",
        mins: 2,
      },
      {
        slug: "case-study-tsla-500-pct",
        title: "Case Study: TSLA 435c - 500% Gain with Structure + Catalyst + Gamma",
        mins: 1,
      },
      {
        slug: "discord-server-guide",
        title: "Discord Server Guide: Channels, Commands, and Your First 5 Steps",
        mins: 1,
      },
    ],
    prev: {
      slug: "case-study-tsla-500-pct",
      title: "Case Study: TSLA 435c - 500% Gain...",
    },
    next: {
      slug: "discord-server-guide",
      title: "Discord Server Guide: Channels, Co...",
    },
  },
};

// ── Scroll reveal hook ─────────────────────────────────────────────────────────
function useReveal(delay = 0) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return { ref, visible };
}

// ── Render rich body text (**bold** support) ───────────────────────────────────
function RichText({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("**") ? (
          <strong key={i} style={{ color: "#ffffff", fontWeight: 700 }}>
            {p.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  );
}

// ── TOC sidebar ────────────────────────────────────────────────────────────────
function TableOfContents({ sections, activeId }) {
  return (
    <nav style={{ position: "sticky", top: "32px" }}>
      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.28)",
          marginBottom: "14px",
        }}
      >
        ON THIS PAGE
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {sections.map((s) => {
          const isActive = activeId === s.id;
          return (
            <li key={s.id} style={{ marginBottom: "2px" }}>
              <a
                href={`#${s.id}`}
                style={{
                  display: "block",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13px",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "#d4af37" : "rgba(255,255,255,0.4)",
                  textDecoration: "none",
                  padding: "5px 0 5px 12px",
                  borderLeft: `2px solid ${isActive ? "#d4af37" : "rgba(255,255,255,0.08)"}`,
                  transition: "color 0.15s, border-color 0.15s",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = "rgba(255,255,255,0.72)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                }}
              >
                {s.heading}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// ── Up Next card ───────────────────────────────────────────────────────────────
function UpNextCard({ article, onNavigate, highlighted }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onNavigate(article.slug)}
      style={{
        flex: "1 1 200px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        padding: "18px 18px 14px",
        background: hovered ? "#161819" : highlighted ? "#141618" : "#111214",
        border: `1px solid ${hovered || highlighted ? "rgba(212,175,55,0.3)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: "12px",
        cursor: "pointer",
        textAlign: "left",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "all 0.2s ease",
      }}
    >
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "13.5px",
          fontWeight: 700,
          color: hovered ? "#d4af37" : "#e0e2e6",
          lineHeight: 1.45,
          margin: 0,
          transition: "color 0.15s",
        }}
      >
        {article.title}
      </p>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "11px",
          color: "rgba(255,255,255,0.28)",
        }}
      >
        <Clock size={11} />
        {article.mins} min read
      </span>
    </button>
  );
}

// ── Section block ──────────────────────────────────────────────────────────────
function SectionBlock({ section, delay }) {
  const { ref, visible } = useReveal(delay);
  return (
    <div
      id={section.id}
      ref={ref}
      style={{
        marginBottom: "40px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
      }}
    >
      <h2
        style={{
          fontFamily: "'Inter', -apple-system, sans-serif",
          fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
          fontWeight: 700,
          color: "#ffffff",
          letterSpacing: "-0.02em",
          lineHeight: 1.3,
          margin: "0 0 12px",
        }}
      >
        {section.heading}
      </h2>
      {section.body.split("\n\n").map((para, i) => (
        <p
          key={i}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "15px",
            fontWeight: 400,
            color: "rgba(255,255,255,0.58)",
            lineHeight: 1.8,
            margin: i > 0 ? "14px 0 0" : "0",
            maxWidth: "65ch",
          }}
        >
          <RichText text={para} />
        </p>
      ))}
    </div>
  );
}

// ── Up Next section ────────────────────────────────────────────────────────────
function UpNextSection({ articles, onNavigate }) {
  const { ref, visible } = useReveal(0);
  return (
    <div
      ref={ref}
      style={{
        marginBottom: "40px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.28)",
          marginBottom: "14px",
        }}
      >
        UP NEXT
      </p>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        {articles.map((a, i) => (
          <UpNextCard
            key={a.slug}
            article={a}
            onNavigate={onNavigate}
            highlighted={i === 1}
          />
        ))}
      </div>
    </div>
  );
}

// ── Bottom nav bar ─────────────────────────────────────────────────────────────
function BottomNav({ onBack, prev, next, onNavigate }) {
  const [backHov, setBackHov] = useState(false);
  const [prevHov, setPrevHov] = useState(false);
  const [nextHov, setNextHov] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: "28px",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        gap: "20px",
        flexWrap: "wrap",
      }}
    >
      {/* Left: PREVIOUS */}
      <div>
        {prev && (
          <button
            onClick={() => onNavigate(prev.slug)}
            onMouseEnter={() => setPrevHov(true)}
            onMouseLeave={() => setPrevHov(false)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              background: "none",
              border: "none",
              cursor: "pointer",
              gap: "2px",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.28)",
              }}
            >
              <ArrowLeft size={11} /> PREVIOUS
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "13.5px",
                fontWeight: 600,
                color: prevHov ? "#d4af37" : "rgba(255,255,255,0.6)",
                transition: "color 0.15s",
                maxWidth: "280px",
                textAlign: "left",
              }}
            >
              {prev.title}
            </span>
          </button>
        )}
      </div>

      {/* Center: Back to Edge */}
      <button
        onClick={onBack}
        onMouseEnter={() => setBackHov(true)}
        onMouseLeave={() => setBackHov(false)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          fontFamily: "'Inter', sans-serif",
          fontSize: "14px",
          fontWeight: 700,
          color: backHov ? "#d4af37" : "#000000",
          background: backHov ? "rgba(212,175,55,0.09)" : "#d4af37",
          border: backHov ? "1px solid rgba(212,175,55,0.3)" : "1px solid transparent",
          borderRadius: "999px",
          padding: "10px 22px",
          cursor: "pointer",
          transition: "all 0.18s ease",
        }}
      >
        Back to Edge
      </button>

      {/* Right: NEXT */}
      {next && (
        <button
          onClick={() => onNavigate(next.slug)}
          onMouseEnter={() => setNextHov(true)}
          onMouseLeave={() => setNextHov(false)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            background: "none",
            border: "none",
            cursor: "pointer",
            gap: "2px",
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.28)",
            }}
          >
            NEXT <ArrowRight size={11} />
          </span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "13.5px",
              fontWeight: 600,
              color: nextHov ? "#d4af37" : "rgba(255,255,255,0.6)",
              transition: "color 0.15s",
              maxWidth: "280px",
              textAlign: "right",
            }}
          >
            {next.title}
          </span>
        </button>
      )}
    </div>
  );
}

// ── Explore Edge Banner ────────────────────────────────────────────────────────
// ⚡ KEY CHANGE: button now calls onNavigateToPricing() instead of using href
function ExploreEdgeBanner({ onNavigateToPricing }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "20px",
        flexWrap: "wrap",
        padding: "20px 24px",
        marginTop: "16px",
        marginBottom: "48px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "12px",
      }}
    >
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "13.5px",
          color: "rgba(255,255,255,0.55)",
          margin: 0,
          maxWidth: "480px",
          lineHeight: 1.6,
        }}
      >
        See these concepts in action with live Anchor Points, Defense Lines,
        and GEX ratings.
      </p>

      {/* ── Button: navigates to PricingPage via prop — no href ── */}
      <button
        onClick={onNavigateToPricing}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          fontFamily: "'Inter', sans-serif",
          fontSize: "13.5px",
          fontWeight: 600,
          color: hovered ? "#d4af37" : "#e0e2e6",
          background: "none",
          border: `1px solid ${hovered ? "rgba(212,175,55,0.5)" : "rgba(255,255,255,0.18)"}`,
          borderRadius: "999px",
          padding: "9px 20px",
          cursor: "pointer",
          whiteSpace: "nowrap",
          transition: "all 0.18s ease",
        }}
      >
        Explore Edge tools
        <ArrowRight
          size={14}
          style={{
            transform: hovered ? "translateX(3px)" : "translateX(0)",
            transition: "transform 0.15s",
          }}
        />
      </button>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
//
// Props:
//   slug               — which article to render
//   onBack             — () => void   — go back to Edge page
//   onNavigate         — (slug) => void — go to another article
//   onNavigateToPricing — () => void  — go to PricingPage  ← NEW
//
export default function CaseStudyPage({ slug, onBack, onNavigate, onNavigateToPricing }) {
  const article = ARTICLES[slug];
  const [activeId, setActiveId] = useState(null);
  const [backHovered, setBackHovered] = useState(false);
  const headerReveal = useReveal(0);
  const bodyReveal   = useReveal(120);

  // Highlight active TOC item on scroll
  useEffect(() => {
    const ids = article?.sections.map((s) => s.id) || [];
    const handler = () => {
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      }
      setActiveId(current);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [article]);

  if (!article) {
    return (
      <div
        style={{
          padding: "80px 0",
          color: "rgba(255,255,255,0.4)",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        Article not found.{" "}
        <button
          onClick={onBack}
          style={{ color: "#d4af37", background: "none", border: "none", cursor: "pointer" }}
        >
          ← Back to Edge
        </button>
      </div>
    );
  }

  return (
    <article
      style={{
        width: "100%",
        fontFamily: "'Inter', -apple-system, sans-serif",
        background: "#0a0a0a",
        color: "#e0e2e6",
      }}
    >
      {/* ── Header zone ── */}
      <div
        ref={headerReveal.ref}
        style={{
          maxWidth: "860px",
          opacity: headerReveal.visible ? 1 : 0,
          transform: headerReveal.visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        {/* Breadcrumb */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontFamily: "'Inter', sans-serif",
            fontSize: "13px",
            color: "rgba(255,255,255,0.35)",
            marginBottom: "16px",
          }}
        >
          {article.breadcrumb.map((crumb, i) => (
            <span key={crumb} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              {i > 0 && <span style={{ color: "rgba(255,255,255,0.18)" }}>/</span>}
              <span
                style={{
                  color:
                    i === article.breadcrumb.length - 1
                      ? "rgba(255,255,255,0.5)"
                      : "rgba(255,255,255,0.3)",
                }}
              >
                {crumb}
              </span>
            </span>
          ))}
        </nav>

        {/* Back button */}
        <button
          onClick={onBack}
          onMouseEnter={() => setBackHovered(true)}
          onMouseLeave={() => setBackHovered(false)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "'Inter', sans-serif",
            fontSize: "13.5px",
            fontWeight: 600,
            color: backHovered ? "#d4af37" : "#e0e2e6",
            background: backHovered ? "rgba(212,175,55,0.07)" : "rgba(255,255,255,0.05)",
            border: `1px solid ${backHovered ? "rgba(212,175,55,0.3)" : "rgba(255,255,255,0.1)"}`,
            borderRadius: "8px",
            padding: "8px 16px",
            cursor: "pointer",
            marginBottom: "28px",
            transition: "all 0.18s ease",
          }}
        >
          <ArrowLeft size={14} />
          Back to Edge
        </button>

        {/* Meta row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10.5px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: article.levelColor,
              background: article.levelBg,
              border: `1px solid ${article.levelBorder}`,
              borderRadius: "5px",
              padding: "3px 10px",
            }}
          >
            {article.level}
          </span>

          <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "13px" }}>|</span>

          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            <Clock size={13} />
            {article.mins} min read
          </span>

          <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "13px" }}>|</span>

          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            <BookOpen size={13} />
            {article.stage}
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "'Inter', -apple-system, sans-serif",
            fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            fontWeight: 900,
            color: "#ffffff",
            lineHeight: 1.12,
            letterSpacing: "-0.03em",
            margin: "0 0 18px",
          }}
        >
          {article.title}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "16px",
            fontWeight: 400,
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.7,
            margin: "0 0 18px",
            maxWidth: "680px",
          }}
        >
          {article.subtitle}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {article.tags.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                fontWeight: 500,
                color: "rgba(255,255,255,0.35)",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: "5px",
                padding: "3px 9px",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── Body: two-column layout ── */}
      <div
        ref={bodyReveal.ref}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 220px",
          gap: "64px",
          alignItems: "start",
          marginTop: "52px",
          opacity: bodyReveal.visible ? 1 : 0,
          transform: bodyReveal.visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.55s ease, transform 0.55s ease",
        }}
      >
        {/* ── Article content ── */}
        <div>
          {article.sections.map((section, idx) => (
            <SectionBlock key={section.id} section={section} delay={idx * 60} />
          ))}

          {/* ── Explore Edge Banner — wired to PricingPage ── */}
          <ExploreEdgeBanner onNavigateToPricing={onNavigateToPricing} />

          {/* ── Up Next ── */}
          <UpNextSection articles={article.upNext} onNavigate={onNavigate} />

          {/* ── Bottom nav ── */}
          <BottomNav
            onBack={onBack}
            prev={article.prev}
            next={article.next}
            onNavigate={onNavigate}
          />
        </div>

        {/* ── TOC sidebar ── */}
        <div>
          <TableOfContents sections={article.sections} activeId={activeId} />
        </div>
      </div>
    </article>
  );
}