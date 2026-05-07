import { useState, useEffect, useRef } from "react";
import {
  TrendingUp,
  Eye,
  Layers,
  Target,
  Plus,
  X,
  ArrowRight,
} from "lucide-react";

/* ─── INTERSECTION OBSERVER HOOK ─────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

/* ─── SECTION LABEL ─────────────────────────────────────────────── */
function SectionLabel({ num, label }) {
  return (
    <p
      style={{
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.22em",
        color: "rgba(255,255,255,0.25)",
        textTransform: "uppercase",
        textAlign: "center",
        marginBottom: 20,
      }}
    >
      {num} / {label}
    </p>
  );
}

/* ══════════════════════════════════════════════════════════════════
   03 — CAPABILITIES
══════════════════════════════════════════════════════════════════ */
const capabilities = [
  {
    icon: TrendingUp,
    title: "Live print stream",
    desc: "Every dark pool print as it crosses. Size, level, attribution. Filter by minimum notional, by ticker, by sector.",
  },
  {
    icon: Eye,
    title: "Institutional footprint",
    desc: "Track accumulation patterns in the names you care about. Dark pool prints reveal positioning before retail sees it on the lit book.",
  },
  {
    icon: Layers,
    title: "Treemap visualization",
    desc: "A live heatmap of dark pool activity sized by notional. Spot concentration at a glance. Drill in to the underlying prints.",
  },
  {
    icon: Target,
    title: "Paired with OptionFlow",
    desc: "Cross-reference dark pool prints against OptionFlow tiers in the same terminal. When both fire together, conviction is highest.",
  },
];

function CapabilityCard({ cap, delay }) {
  const [ref, inView] = useInView(0.1);
  const Icon = cap.icon;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#111" : "#0c0c0c",
        border: `1px solid ${hovered ? "rgba(212,175,55,0.2)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 14,
        padding: "28px 28px 32px",
        transition: "all 0.35s ease",
        transform: inView
          ? hovered
            ? "translateY(-3px)"
            : "translateY(0)"
          : "translateY(28px)",
        opacity: inView ? 1 : 0,
        transitionDelay: `${delay}ms`,
        cursor: "default",
      }}
    >
      {/* Icon box */}
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 10,
          background: hovered
            ? "rgba(212,175,55,0.18)"
            : "rgba(212,175,55,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 22,
          transition: "background 0.3s",
        }}
      >
        <Icon size={20} color="#d4af37" />
      </div>
      <h3
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 700,
          fontSize: 17,
          color: "#fff",
          marginBottom: 10,
          letterSpacing: "-0.01em",
        }}
      >
        {cap.title}
      </h3>
      <p
        style={{
          fontSize: 14,
          lineHeight: 1.65,
          color: "rgba(255,255,255,0.45)",
          margin: 0,
        }}
      >
        {cap.desc}
      </p>
    </div>
  );
}

function CapabilitiesSection() {
  const [headRef, headInView] = useInView(0.2);

  return (
    <section
      style={{
        padding: "100px 24px",
        background: "#000",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>
        <div
          ref={headRef}
          style={{
            textAlign: "center",
            marginBottom: 56,
            opacity: headInView ? 1 : 0,
            transform: headInView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease",
          }}
        >
          <SectionLabel num="03" label="CAPABILITIES" />
          <h2
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.2rem)",
              fontWeight: 900,
              color: "#fff",
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
              margin: 0,
            }}
          >
            What it does.
          </h2>
        </div>

        {/* 2×2 grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(440px, 1fr))",
            gap: 16,
          }}
        >
          {capabilities.map((cap, i) => (
            <CapabilityCard key={cap.title} cap={cap} delay={i * 90} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════
   04 — WHO IT'S FOR
══════════════════════════════════════════════════════════════════ */
const personas = [
  {
    tag: "POSITION TRADERS",
    headline: "Follow the build.",
    desc: "Watch for multi-day accumulation in a name. Size into the trend the desks are building.",
  },
  {
    tag: "SWING TRADERS",
    headline: "Confirm with flow.",
    desc: "Cross-reference dark pool prints with OptionFlow. When both fire, conviction is highest.",
  },
  {
    tag: "ACCUMULATION HUNTERS",
    headline: "Alert on the whales.",
    desc: "Filter for prints above $5M notional. Receive push alerts the moment they hit.",
  },
];

function PersonaCard({ p, delay }) {
  const [ref, inView] = useInView(0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#111" : "#0c0c0c",
        border: `1px solid ${hovered ? "rgba(212,175,55,0.18)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 14,
        padding: "28px 26px 32px",
        flex: 1,
        minWidth: 240,
        transition: "all 0.35s ease",
        transform: inView
          ? hovered
            ? "translateY(-3px)"
            : "translateY(0)"
          : "translateY(28px)",
        opacity: inView ? 1 : 0,
        transitionDelay: `${delay}ms`,
        cursor: "default",
      }}
    >
      {/* Tag pill */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          padding: "5px 10px",
          borderRadius: 6,
          border: "1px solid rgba(212,175,55,0.35)",
          background: "rgba(212,175,55,0.08)",
          marginBottom: 20,
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.14em",
            color: "#d4af37",
            textTransform: "uppercase",
          }}
        >
          {p.tag}
        </span>
      </div>

      <h3
        style={{
          fontWeight: 800,
          fontSize: 19,
          color: "#fff",
          letterSpacing: "-0.02em",
          marginBottom: 12,
        }}
      >
        {p.headline}
      </h3>
      <p
        style={{
          fontSize: 14,
          lineHeight: 1.65,
          color: "rgba(255,255,255,0.45)",
          margin: 0,
        }}
      >
        {p.desc}
      </p>
    </div>
  );
}

function WhoItsForSection() {
  const [headRef, headInView] = useInView(0.2);

  return (
    <section
      style={{
        padding: "100px 24px",
        background: "#000",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>
        <div
          ref={headRef}
          style={{
            textAlign: "center",
            marginBottom: 56,
            opacity: headInView ? 1 : 0,
            transform: headInView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease",
          }}
        >
          <SectionLabel num="04" label="WHO IT'S FOR" />
          <h2
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3rem)",
              fontWeight: 900,
              color: "#fff",
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
              margin: 0,
            }}
          >
            Built for every seat{" "}
            <span style={{ color: "#d4af37" }}>at the desk.</span>
          </h2>
        </div>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {personas.map((p, i) => (
            <PersonaCard key={p.tag} p={p} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════
   05 — FAQ
══════════════════════════════════════════════════════════════════ */
const faqs = [
  {
    q: "What is Darkpool on Trade Echo?",
    a: "Darkpool is Trade Echo's real-time off-exchange print monitor. It streams every qualifying block from every U.S. dark pool venue as it crosses, surfacing institutional accumulation before those positions rotate to the lit book. Filter by minimum notional, symbol, or venue.",
  },
  {
    q: "How is this different from dark pool data on other platforms?",
    a: "Most platforms batch dark pool data and deliver it on a 15-minute delay. Trade Echo streams prints in real time, directly from FINRA TRF feeds, so you see accumulation as it happens — not after the move is already in progress.",
  },
  {
    q: "How does Trade Echo work?",
    a: "Trade Echo aggregates off-exchange trade reports from all major U.S. dark pool venues and TRFs. Our engine filters, enriches, and surfaces prints that meet institutional thresholds — giving you the same tape the desks watch, without the Bloomberg terminal price tag.",
  },
];

function FaqItem({ item, index }) {
  const [open, setOpen] = useState(index === 0);
  const [ref, inView] = useInView(0.1);

  return (
    <div
      ref={ref}
      style={{
        border: `1px solid ${open ? "rgba(212,175,55,0.2)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 12,
        overflow: "hidden",
        background: open ? "rgba(212,175,55,0.03)" : "#0c0c0c",
        transition: "all 0.3s ease",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${index * 80}ms`,
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "22px 24px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          gap: 16,
        }}
      >
        <span
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#fff",
            textAlign: "left",
            letterSpacing: "-0.01em",
          }}
        >
          {item.q}
        </span>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            border: `1px solid ${open ? "#d4af37" : "rgba(212,175,55,0.4)"}`,
            background: open ? "#d4af37" : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all 0.3s ease",
          }}
        >
          {open ? (
            <X size={13} color="#000" />
          ) : (
            <Plus size={13} color="#d4af37" />
          )}
        </div>
      </button>

      {/* Animated answer */}
      <div
        style={{
          maxHeight: open ? 300 : 0,
          overflow: "hidden",
          transition: "max-height 0.4s ease",
        }}
      >
        <p
          style={{
            fontSize: 14,
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.5)",
            padding: "0 24px 24px",
            margin: 0,
          }}
        >
          {item.a}
        </p>
      </div>
    </div>
  );
}

function FaqSection() {
  const [headRef, headInView] = useInView(0.2);

  return (
    <section
      style={{
        padding: "100px 24px",
        background: "#000",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div
          ref={headRef}
          style={{
            textAlign: "center",
            marginBottom: 52,
            opacity: headInView ? 1 : 0,
            transform: headInView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease",
          }}
        >
          <SectionLabel num="05" label="QUESTIONS" />
          <h2
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3rem)",
              fontWeight: 900,
              color: "#fff",
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
              margin: 0,
            }}
          >
            Quick answers.
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {faqs.map((f, i) => (
            <FaqItem key={f.q} item={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════
   06 — GET STARTED CTA
══════════════════════════════════════════════════════════════════ */
function GetStartedSection({ onStartTracking, onViewPlans }) {
  const [ref, inView] = useInView(0.15);
  const [btn1Hov, setBtn1Hov] = useState(false);
  const [btn2Hov, setBtn2Hov] = useState(false);

  return (
    <section
      style={{
        padding: "80px 24px 100px",
        background: "#000",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div
        ref={ref}
        style={{
          maxWidth: 820,
          margin: "0 auto",
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.12) 0%, rgba(0,0,0,0) 70%), #0c0c0c",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 20,
          padding: "72px 40px",
          textAlign: "center",
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(28px)",
          transition: "all 0.7s ease",
        }}
      >
        <SectionLabel num="06" label="GET STARTED" />

        <h2
          style={{
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 900,
            color: "#fff",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: 18,
          }}
        >
          Start tracking{" "}
          <span style={{ color: "#d4af37" }}>the dark</span> today.
        </h2>

        <p
          style={{
            fontSize: 15,
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.6,
            maxWidth: 480,
            margin: "0 auto 40px",
          }}
        >
          Included in Trade Echo Pro with OptionFlow, DealerEdge, AlgoEdge,
          Cortex, and Copy Trading. $199/mo. Cancel anytime.
        </p>

        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {/* Primary */}
          <button
            onClick={onStartTracking}
            onMouseEnter={() => setBtn1Hov(true)}
            onMouseLeave={() => setBtn1Hov(false)}
            style={{
              background: btn1Hov ? "#b8912e" : "#d4af37",
              color: "#000",
              border: "none",
              borderRadius: 8,
              padding: "13px 26px",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              transform: btn1Hov ? "scale(1.03)" : "scale(1)",
              transition: "all 0.2s ease",
              boxShadow: btn1Hov ? "0 0 24px rgba(212,175,55,0.35)" : "none",
            }}
          >
            Start tracking the dark <ArrowRight size={15} />
          </button>

          {/* Secondary */}
          <button
            onClick={onViewPlans}
            onMouseEnter={() => setBtn2Hov(true)}
            onMouseLeave={() => setBtn2Hov(false)}
            style={{
              background: "transparent",
              color: btn2Hov ? "#fff" : "rgba(255,255,255,0.75)",
              border: `1px solid ${btn2Hov ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.2)"}`,
              borderRadius: 8,
              padding: "13px 26px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
              background: btn2Hov ? "rgba(255,255,255,0.05)" : "transparent",
            }}
          >
            View all plans
          </button>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════
   ROOT EXPORT — combines all four sections
══════════════════════════════════════════════════════════════════ */
export default function DarkpoolSections({ onStartTracking, onViewPlans }) {
  return (
    <div
      style={{
        background: "#000",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <CapabilitiesSection />
      <WhoItsForSection />
      <FaqSection />
      <GetStartedSection
        onStartTracking={onStartTracking}
        onViewPlans={onViewPlans}
      />
    </div>
  );
}