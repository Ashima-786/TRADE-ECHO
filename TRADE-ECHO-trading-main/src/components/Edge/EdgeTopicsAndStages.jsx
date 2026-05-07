// components/EdgeTopicsAndStages.jsx
import { useState, useEffect, useRef } from "react";
import {
  BookOpen, Layers, Target, Trophy,
  ChevronDown, Clock, ArrowRight,
  GraduationCap, KeyRound, CircleDot,
} from "lucide-react";



// ── Data ──────────────────────────────────────────────────────────────────────
const TOPICS = [
  "All", "Foundations", "OptionFlow", "Darkpool", "DealerEdge",
  "AlgoEdge", "Copy Trading", "NewsEdge", "Strategies", "Risk", "Greeks",
];

const STAGE_ICONS = { 1: BookOpen, 2: Layers, 3: Target, 4: Trophy };

// Library paths → which stage id to open
const LIBRARY_PATHS = [
  {
    icon: GraduationCap,
    title: "I'm New to Trading",
    desc: "Start with the fundamentals.",
    stageId: 1,
  },
  {
    icon: KeyRound,
    title: "I Know the Basics",
    desc: "Master the platform tools.",
    stageId: 2,
  },
  {
    icon: CircleDot,
    title: "I'm Ready for Advanced",
    desc: "Strategies, risk, and case studies.",
    stageId: 3,
  },
];

const STAGES = [
  {
    id: 1, label: "Stage 1: Foundations", count: 8,
    desc: "New to options flow, GEX, and dark pools? Start with the fundamentals that power every Trade Echo tool.",
    articles: [
      { slug: "platform-overview",       level: "Beginner", title: "Trade Echo Platform Overview: Your Complete Trading Ecosystem",      desc: "A walkthrough of Trade Echo's five core pillars - Dashboard, DealerEdge, Cortex AI, AlgoEdge, and Copy Trading - and how they work together to give you a professional-grade edge.", mins: 4, tags: ["Foundations"] },
      { slug: "creating-your-account",   level: "Beginner", title: "Creating Your Account: Sign Up, Subscribe, and Get Set Up",           desc: "Three sign-in options, subscription activation, profile setup, theme selection, and notification configuration - everything to get trading in minutes.", mins: 2, tags: ["Foundations"] },
      { slug: "daily-trading-system",    level: "Beginner", title: "The Daily Trading System: Stack Your Edges Before Every Trade",        desc: "The complete pre-market to post-market routine - how to use DealerEdge, NewsEdge, AlgoEdge, and OptionFlow together for high-conviction setups.", mins: 3, tags: ["Foundations"] },
      { slug: "your-first-trade",        level: "Beginner", title: "Your First Trade: A 7-Step Process from Scan to Exit",                desc: "The exact step-by-step process for finding, entering, managing, and closing a trade using Trade Echo's multi-tool confirmation system.", mins: 3, tags: ["Foundations"] },
      { slug: "what-is-options-flow",    level: "Beginner", title: "What Is Options Flow? A Beginner's Guide to Reading Smart Money",     desc: "Learn how institutional options orders create a trail of 'smart money' signals - and how retail traders can follow them in real time.", mins: 2, tags: ["Foundations", "OptionFlow"] },
      { slug: "what-is-gamma-exposure",  level: "Beginner", title: "What Is Gamma Exposure (GEX)? How Dealers Move the Market",           desc: "Understand how market makers hedge options positions and why their gamma exposure creates predictable support and resistance levels.", mins: 2, tags: ["Foundations", "DealerEdge"] },
      { slug: "understanding-the-greeks",level: "Beginner", title: "Understanding the Greeks: Delta, Gamma, Theta, Vega Explained",        desc: "A plain-language breakdown of the four primary options Greeks and how they affect your P&L on every trade.", mins: 2, tags: ["Greeks", "Foundations"] },
      { slug: "what-is-dark-pool",       level: "Beginner", title: "What Is a Dark Pool? How Institutional Trades Hide in Plain Sight",   desc: "Dark pools explained — what they are, why institutions use them, and how Trade Echo surfaces the data retail traders never used to see.", mins: 2, tags: ["Foundations", "Darkpool"] },
    ],
    upsell: true,
  },
  { id: 2, label: "Stage 2: Platform Mastery",  count: 31, desc: "Go deep on every tool. DealerEdge, OptionFlow, AlgoEdge, Darkpool, Cortex AI — master each one.", articles: [] },
  { id: 3, label: "Stage 3: Strategies & Risk", count: 10, desc: "Build real trading strategies with multi-tool confirmation, position sizing, and risk management frameworks.", articles: [] },
  { id: 4, label: "Stage 4: Prove It",          count: 13, desc: "Real case studies, live trade breakdowns, and the $10K challenge. See the tools work in real market conditions.", articles: [] },
];

const LEVEL_COLORS = {
  Beginner:     { color: "#3b82f6", bg: "rgba(59,130,246,0.08)",  border: "rgba(59,130,246,0.25)" },
  Intermediate: { color: "#f59e0b", bg: "rgba(245,158,11,0.08)",  border: "rgba(245,158,11,0.25)" },
  Advanced:     { color: "#9ca3af", bg: "rgba(239,68,68,0.08)",   border: "rgba(239,68,68,0.25)" },
};

// ── Scroll reveal hook ────────────────────────────────────────────────────────
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
      { threshold: 0.06 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return { ref, visible };
}

// ── Section label ─────────────────────────────────────────────────────────────
function SectionLabel({ num, text }) {
  return (
    <p style={{
      fontFamily: "'JetBrains Mono', 'Courier New', monospace",
      fontSize: "10px", fontWeight: 700,
      letterSpacing: "0.26em",
      color: "rgba(255,255,255,0.28)",
      textTransform: "uppercase",
      marginBottom: "10px",
      display: "flex", alignItems: "center", gap: "6px",
    }}>
      <span>{num}</span>
      <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
      <span>{text}</span>
    </p>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 style={{
      fontFamily: "'Inter', -apple-system, sans-serif",
      fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
      fontWeight: 700,
      color: "#ffffff",
      letterSpacing: "-0.025em",
      margin: "0 0 28px",
      lineHeight: 1.15,
    }}>
      {children}
    </h2>
  );
}

// ── 02 / Library Card ─────────────────────────────────────────────────────────
function LibraryCard({ path, onClick }) {
  const [hovered, setHovered] = useState(false);
  const Icon = path.icon;
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: "1 1 240px",
        display: "flex", alignItems: "center", gap: "16px",
        padding: "18px 20px",
        background: hovered ? "#141618" : "#111214",
        border: `1px solid ${hovered ? "rgba(212,175,55,0.35)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: "14px",
        cursor: "pointer",
        textAlign: "left",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered ? "0 8px 24px rgba(212,175,55,0.07)" : "none",
        transition: "all 0.2s ease",
      }}
    >
      {/* Icon box */}
      <div style={{
        width: "40px", height: "40px", borderRadius: "10px", flexShrink: 0,
        background: hovered ? "rgba(212,175,55,0.18)" : "rgba(212,175,55,0.1)",
        border: `1px solid ${hovered ? "rgba(212,175,55,0.4)" : "rgba(212,175,55,0.18)"}`,
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
          color: hovered ? "#d4af37" : "#e8eaed",
          margin: "0 0 3px",
          transition: "color 0.15s",
        }}>
          {path.title}
        </p>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "12.5px", fontWeight: 400,
          color: "rgba(255,255,255,0.38)",
          margin: 0,
        }}>
          {path.desc}
        </p>
      </div>

      {/* Arrow */}
      <ArrowRight
        size={16}
        color={hovered ? "#d4af37" : "rgba(255,255,255,0.25)"}
        style={{ flexShrink: 0, transform: hovered ? "translateX(3px)" : "translateX(0)", transition: "all 0.2s" }}
      />
    </button>
  );
}

// ── Article Row (matches screenshot — horizontal list rows, not cards) ─────────
function ArticleRow({ article, index }) {
  const [hovered, setHovered] = useState(false);
  const lc = LEVEL_COLORS[article.level] || LEVEL_COLORS.Beginner;

  return (
    <a
      href={`https://tradeecho.com/edge/${article.slug}`}
      target="_blank" rel="noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "80px 1fr auto",
        alignItems: "start",
        gap: "16px",
        padding: "20px 0",
        borderBottom: "1px solid rgba(255,255,255,0.055)",
        textDecoration: "none",
        background: "none",
        opacity: 1,
        transition: "background 0.15s",
      }}
    >
      {/* Level badge */}
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "10px", fontWeight: 700,
        letterSpacing: "0.1em", textTransform: "uppercase",
        color: hovered ? lc.color : "rgba(255,255,255,0.3)",
        paddingTop: "2px",
        transition: "color 0.15s",
      }}>
        {article.level}
      </span>

      {/* Content */}
      <div>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "14px", fontWeight: 700,
          color: hovered ? "#d4af37" : "#e8eaed",
          margin: "0 0 4px",
          lineHeight: 1.4,
          display: "inline",
          transition: "color 0.15s",
        }}>
          {article.title}
        </p>
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "13.5px", fontWeight: 400,
          color: "rgba(255,255,255,0.42)",
          lineHeight: 1.55,
        }}>
          {article.desc}
        </span>
      </div>

      {/* Read time */}
      <div style={{
        display: "flex", alignItems: "center", gap: "5px",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "11px",
        color: "rgba(255,255,255,0.25)",
        paddingTop: "3px",
        whiteSpace: "nowrap",
        flexShrink: 0,
      }}>
        <Clock size={11} />
        {article.mins} min
      </div>
    </a>
  );
}

// ── Upsell Banner ─────────────────────────────────────────────────────────────
function UpsellBanner() {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      gap: "16px", padding: "16px 20px", marginTop: "12px",
      background: "rgba(212,175,55,0.06)",
      border: "1px solid rgba(212,175,55,0.18)",
      borderRadius: "10px",
    }}>
      <span style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "13px", fontWeight: 600, color: "#d1fae5",
      }}>
        Ready to see these tools live?
      </span>
      <a
        href="https://tradeecho.com/pricing"
        target="_blank" rel="noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          fontFamily: "'Inter', sans-serif",
          fontSize: "13px", fontWeight: 700,
          color: "#000", background: hovered ? "#b8912e" : "#d4af37",
          borderRadius: "8px", padding: "8px 16px",
          textDecoration: "none", whiteSpace: "nowrap",
          transform: hovered ? "translateY(-1px)" : "translateY(0)",
          transition: "all 0.15s ease",
        }}
      >
        Start Pro · $199/mo
        <ArrowRight size={13} />
      </a>
    </div>
  );
}

// ── Stage Row ─────────────────────────────────────────────────────────────────
function StageRow({ stage, isOpen, onToggle, activeTopic, stagesRef }) {
  const [headerHovered, setHeaderHovered] = useState(false);
  const Icon = STAGE_ICONS[stage.id] || BookOpen;
  const filtered = activeTopic === "All"
    ? stage.articles
    : stage.articles.filter(a => a.tags.includes(activeTopic));

  return (
    <div style={{
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      background: isOpen ? "rgba(255,255,255,0.015)" : "transparent",
      transition: "background 0.2s",
    }}>
      {/* Header */}
      <button
        onClick={onToggle}
        onMouseEnter={() => setHeaderHovered(true)}
        onMouseLeave={() => setHeaderHovered(false)}
        style={{
          width: "100%", display: "flex", alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 28px",
          background: "none", border: "none",
          cursor: "pointer", textAlign: "left", gap: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: 1 }}>
          {/* Icon box */}
          <div style={{
            width: "42px", height: "42px", borderRadius: "11px", flexShrink: 0,
            background: isOpen
              ? "rgba(212,175,55,0.2)"
              : headerHovered
                ? "rgba(212,175,55,0.15)"
                : "rgba(212,175,55,0.09)",
            border: `1px solid ${
              isOpen
                ? "rgba(212,175,55,0.45)"
                : headerHovered
                  ? "rgba(212,175,55,0.3)"
                  : "rgba(212,175,55,0.16)"
            }`,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s",
          }}>
            <Icon size={19} color="#d4af37" />
          </div>

          {/* Label — turns sandal on hover */}
          <span style={{
            fontFamily: "'Inter', -apple-system, sans-serif",
            fontSize: "15px", fontWeight: 700,
            letterSpacing: "-0.015em",
            color: isOpen
              ? "#ffffff"
              : headerHovered
                ? "#d4af37"           // ← green on hover
                : "#d4d8de",
            transition: "color 0.18s",
          }}>
            {stage.label}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "14px", flexShrink: 0 }}>
          {/* Article count */}
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "10px", fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.28)",
          }}>
            {stage.count} Articles
          </span>

          {/* Chevron box */}
          <div style={{
            width: "30px", height: "30px", borderRadius: "8px",
            background: isOpen ? "rgba(212,175,55,0.12)" : "rgba(255,255,255,0.05)",
            border: `1px solid ${isOpen ? "rgba(212,175,55,0.3)" : "rgba(255,255,255,0.08)"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s",
          }}>
            <ChevronDown
              size={15}
              color={isOpen ? "#d4af37" : "rgba(255,255,255,0.32)"}
              style={{
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.28s cubic-bezier(0.4,0,0.2,1)",
              }}
            />
          </div>
        </div>
      </button>

      {/* Animated body */}
      <div style={{
        maxHeight: isOpen ? "4000px" : "0",
        overflow: "hidden",
        transition: "max-height 0.45s cubic-bezier(0.4,0,0.2,1)",
      }}>
        <div style={{ padding: "0 28px 28px" }}>
          {/* Stage description */}
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "14px", color: "rgba(255,255,255,0.42)",
            lineHeight: 1.7,
            paddingBottom: "20px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            margin: "0 0 4px",
          }}>
            {stage.desc}
          </p>

          {/* Article rows */}
          {filtered.length > 0 ? (
            <div style={{ marginBottom: "8px" }}>
              {filtered.map((a, i) => (
                <ArticleRow key={a.slug} article={a} index={i} />
              ))}
            </div>
          ) : stage.articles.length === 0 ? (
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px", color: "rgba(255,255,255,0.25)",
              padding: "20px 0", fontStyle: "italic",
            }}>
              Articles coming soon —{" "}
              <a href="https://tradeecho.com/edge" target="_blank" rel="noreferrer"
                style={{ color: "#d4af37", textDecoration: "none" }}>
                view on tradeecho.com →
              </a>
            </div>
          ) : (
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px", color: "rgba(255,255,255,0.25)",
              padding: "20px 0",
            }}>
              No articles match this topic.
            </div>
          )}

          {stage.upsell && <UpsellBanner />}
        </div>
      </div>
    </div>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────
export default function EdgeTopicsAndStages() {
  const [activeTopic, setActiveTopic]   = useState("All");
  const [openStage, setOpenStage]       = useState(1);

  const libraryReveal = useReveal(0);
  const topicsReveal  = useReveal(80);
  const stagesReveal  = useReveal(160);

  // Ref to scroll to stages section
  const stagesSectionRef = useRef(null);

  const toggleStage = (id) => setOpenStage(prev => (prev === id ? null : id));

  // Library card click → open that stage + smooth scroll to 04/Stages
  const handleLibraryClick = (stageId) => {
    setOpenStage(stageId);
    setTimeout(() => {
      stagesSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  return (
    <div style={{
      width: "100%",
      fontFamily: "'Inter', -apple-system, sans-serif",
      background: "#0a0a0a",
    }}>

      {/* ════════════════════════════
          02 / LIBRARY
      ════════════════════════════ */}
      <section
        ref={libraryReveal.ref}
        style={{
          padding: "56px 0 48px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          opacity: libraryReveal.visible ? 1 : 0,
          transform: libraryReveal.visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.55s ease, transform 0.55s ease",
        }}
      >
        <SectionLabel num="02" text="LIBRARY" />
        <SectionTitle>Pick a learning path</SectionTitle>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {LIBRARY_PATHS.map((path) => (
            <LibraryCard
              key={path.stageId}
              path={path}
              onClick={() => handleLibraryClick(path.stageId)}
            />
          ))}
        </div>
      </section>

      {/* ════════════════════════════
          03 / TOPICS
      ════════════════════════════ */}
      <section
        ref={topicsReveal.ref}
        style={{
          padding: "52px 0 44px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          opacity: topicsReveal.visible ? 1 : 0,
          transform: topicsReveal.visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.55s ease, transform 0.55s ease",
        }}
      >
        <SectionLabel num="03" text="TOPICS" />
        <SectionTitle>Filter by topic</SectionTitle>

        {/* Underline tab style */}
        <div style={{
          display: "flex", flexWrap: "wrap",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}>
          {TOPICS.map(t => {
            const active = activeTopic === t;
            return (
              <button
                key={t}
                onClick={() => setActiveTopic(t)}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13.5px",
                  fontWeight: active ? 600 : 400,
                  color: active ? "#d4af37" : "rgba(255,255,255,0.42)",
                  background: "none", border: "none",
                  borderBottom: `2px solid ${active ? "#d4af37" : "transparent"}`,
                  padding: "10px 16px 12px",
                  cursor: "pointer",
                  marginBottom: "-1px",
                  whiteSpace: "nowrap",
                  transition: "color 0.15s, border-color 0.15s",
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.color = "rgba(255,255,255,0.72)"; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.color = "rgba(255,255,255,0.42)"; }}
              >
                {t}
              </button>
            );
          })}
        </div>
      </section>

      {/* ════════════════════════════
          04 / STAGES
      ════════════════════════════ */}
      <section
        ref={(el) => {
          stagesSectionRef.current = el;
          stagesReveal.ref.current = el;
        }}
        style={{
          padding: "52px 0 72px",
          opacity: stagesReveal.visible ? 1 : 0,
          transform: stagesReveal.visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.55s ease, transform 0.55s ease",
        }}
      >
        <SectionLabel num="04" text="STAGES" />
        <SectionTitle>Learning stages</SectionTitle>

        <div style={{
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "16px",
          overflow: "hidden",
        }}>
          {STAGES.map(s => (
            <StageRow
              key={s.id}
              stage={s}
              isOpen={openStage === s.id}
              onToggle={() => toggleStage(s.id)}
              activeTopic={activeTopic}
            />
          ))}
        </div>
      </section>

    </div>
  );
}
