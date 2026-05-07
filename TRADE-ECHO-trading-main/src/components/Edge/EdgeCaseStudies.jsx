// components/EdgeCaseStudies.jsx
import { useState, useEffect, useRef } from "react";
import { TrendingUp, ArrowRight } from "lucide-react";

const CASES = [
  {
    slug: "case-study-tsla-750-pct",
    badge: "+750%",
    title: "Case Study: TSLA 410c - 750% Gain with Three Edges",
    desc: "How DealerEdge gamma setup, NewsEdge China catalyst, and AlgoEdge $550M+ institutional flow combined for a 750% options win.",
    tags: ["DealerEdge", "NewsEdge", "AlgoEdge"],
    color: "#d4af37",
  },
  {
    slug: "case-study-tsla-500-pct",
    badge: "+500%",
    title: "Case Study: TSLA 435c - 500% Gain with Structure + Catalyst + Gamma",
    desc: "SpaceX merger news, positive gamma at 432.5–440, AI-guided entry at 435 — the complete breakdown of a 500% winner.",
    tags: ["DealerEdge", "NewsEdge"],
    color: "#d4af37",
  },
  {
    slug: "case-study-oklo-10k-challenge",
    badge: "+102.6%",
    title: "Case Study: OKLO 95c - $10K Challenge Winner (+102.6%)",
    desc: "Nuclear sector strength, DOE policy catalyst, DealerEdge levels at 86/95/100, and a textbook 5-edge entry for a 102% gain.",
    tags: ["DealerEdge", "AlgoEdge"],
    color: "#d4af37",
  },
];

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

function CaseCard({ c, onNavigate, index }) {
  const [hovered, setHovered] = useState(false);
  const { ref, visible } = useReveal(index * 80);

  return (
    <button
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onNavigate?.(c.slug)}
      style={{
        display: "flex", flexDirection: "column", gap: "12px",
        padding: "24px", textAlign: "left",
        background: hovered ? "#141618" : "#111214",
        border: `1px solid ${hovered ? "rgba(212,175,55,0.45)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: "14px",
        cursor: "pointer",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? "0 10px 36px rgba(0,0,0,0.45)" : "none",
        opacity: visible ? 1 : 0,
        transition: "all 0.22s ease, opacity 0.5s ease",
      }}
    >
      {/* Badge + tags */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: "5px",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "12px", fontWeight: 700,
          color: c.color,
          background: c.color + "16",
          border: `1px solid ${c.color}45`,
          borderRadius: "999px", padding: "3px 11px 3px 8px",
        }}>
          <TrendingUp size={12} />
          {c.badge}
        </span>
        <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", justifyContent: "flex-end" }}>
          {c.tags.map(t => (
            <span key={t} style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px", fontWeight: 500,
              color: "rgba(255,255,255,0.3)",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "4px", padding: "2px 7px",
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "14.5px", fontWeight: 700,
        color: hovered ? "#ffffff" : "#e8eaed",
        lineHeight: 1.45, margin: 0, letterSpacing: "-0.01em",
        transition: "color 0.15s",
      }}>
        {c.title}
      </h3>

      {/* Desc */}
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "13px",
        color: "rgba(255,255,255,0.38)",
        lineHeight: 1.65, margin: 0, flex: 1,
      }}>
        {c.desc}
      </p>

      {/* CTA */}
      <span style={{
        display: "flex", alignItems: "center", gap: "5px",
        fontFamily: "'Inter', sans-serif",
        fontSize: "13px", fontWeight: 600, color: "#d4af37",
        marginTop: "4px",
      }}>
        Read case study
        <ArrowRight size={13} style={{ transform: hovered ? "translateX(4px)" : "translateX(0)", transition: "transform 0.15s" }} />
      </span>
    </button>
  );
}

export default function EdgeCaseStudies({ onNavigate }) {
  const reveal = useReveal(0);

  return (
    <section
      ref={reveal.ref}
      style={{
        padding: "56px 0 80px",
        width: "100%",
        opacity: reveal.visible ? 1 : 0,
        transform: reveal.visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.55s ease, transform 0.55s ease",
        fontFamily: "'Inter', -apple-system, sans-serif",
      }}
    >
      {/* Label */}
      <p style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "10px", fontWeight: 700,
        letterSpacing: "0.26em", textTransform: "uppercase",
        color: "rgba(255,255,255,0.28)",
        marginBottom: "10px",
        display: "flex", alignItems: "center", gap: "6px",
      }}>
        <span>05</span>
        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
        <span>CASE STUDIES</span>
      </p>

      {/* Heading */}
      <h2 style={{
        fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
        fontWeight: 700, color: "#ffffff",
        letterSpacing: "-0.025em",
        margin: "0 0 28px",
      }}>
        See the tools in action.
      </h2>

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "14px",
      }}>
        {CASES.map((c, i) => (
          <CaseCard key={c.slug} c={c} onNavigate={onNavigate} index={i} />
        ))}
      </div>
    </section>
  );
}