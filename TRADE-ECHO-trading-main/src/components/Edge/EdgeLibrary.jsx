// 02/Library — EdgeLibrary.jsx
// Exact match to screenshot: rounded-square sandal icon badges, wide flat cards
import { GraduationCap, Wrench, Target, ArrowRight } from "lucide-react";

const PATHS = [
  {
    id: "new",
    Icon: GraduationCap,
    label: "I'm New to Trading",
    desc: "Start with the fundamentals.",
  },
  {
    id: "basics",
    Icon: Wrench,
    label: "I Know the Basics",
    desc: "Master the platform tools.",
  },
  {
    id: "advanced",
    Icon: Target,
    label: "I'm Ready for Advanced",
    desc: "Strategies, risk, and case studies.",
  },
];

export default function EdgeLibrary({ activePath, onPathChange }) {
  return (
    <section className="lib">
      <div className="lib-inner">
        {/* 02 / LIBRARY eyebrow */}
        <p className="lib-eyebrow">
          <span className="lib-eyebrow-num">02</span>
          <span className="lib-eyebrow-slash"> / </span>
          LIBRARY
        </p>

        <h2 className="lib-title">Pick a learning path</h2>

        <div className="lib-cards">
          {PATHS.map(({ id, Icon, label, desc }) => (
            <button
              key={id}
              className={`lib-card ${activePath === id ? "active" : ""}`}
              onClick={() => onPathChange?.(id)}
            >
              {/* Rounded-square sandal icon badge — matches screenshot exactly */}
              <div className="lib-icon-badge">
                <Icon size={22} color="#d4af37" strokeWidth={1.8} />
              </div>

              {/* Text block */}
              <div className="lib-text">
                <span className="lib-label">{label}</span>
                <span className="lib-desc">{desc}</span>
              </div>

              {/* Arrow pushed to far right */}
              <ArrowRight size={16} color="#d4af37" strokeWidth={2.2} className="lib-arrow" />
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .lib {
          background: #0f0f0f;
          padding: 52px 64px 64px;
        }

        .lib-inner {
          max-width: 1100px;
          margin: 0 auto;
        }

        /* Eyebrow: "02 / LIBRARY" */
        .lib-eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.2em;
          color: #555;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .lib-eyebrow-num  { color: #444; }
        .lib-eyebrow-slash { color: #333; }

        /* Section title */
        .lib-title {
          font-family: 'Inter', sans-serif;
          font-size: clamp(22px, 2.6vw, 30px);
          font-weight: 600;
          color: #ffffff;
          letter-spacing: -0.02em;
          margin: 0 0 28px;
        }

        /* Card grid — 3 equal columns */
        .lib-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        @media (max-width: 860px) {
          .lib-cards { grid-template-columns: 1fr; }
          .lib { padding: 40px 24px 48px; }
        }

        /* Individual card */
        .lib-card {
          display: flex;
          align-items: center;
          gap: 14px;
          background: #161616;
          border: 1px solid #252525;
          border-radius: 14px;
          padding: 18px 18px 18px 18px;
          cursor: pointer;
          text-align: left;
          width: 100%;
          font-family: 'Inter', sans-serif;
          transition: border-color 0.18s, background 0.18s, transform 0.15s;
        }

        .lib-card:hover {
          border-color: #d4af37;
          background: #161616;
          transform: translateY(-2px);
        }

        .lib-card.active {
          border-color: #d4af37;
          background: rgba(34, 197, 94, 0.04);
        }

        /* Rounded-square icon badge — key detail from screenshot */
        .lib-icon-badge {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: #1a2e1a;
          border: 1px solid rgba(34, 197, 94, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* Text block */
        .lib-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 0;
        }

        .lib-label {
          font-size: 14px;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .lib-desc {
          font-size: 13px;
          font-weight: 400;
          color: #666;
          line-height: 1.3;
        }

        /* Arrow on far right */
        .lib-arrow {
          flex-shrink: 0;
          margin-left: auto;
          transition: transform 0.15s;
          opacity: 0.85;
        }

        .lib-card:hover .lib-arrow {
          transform: translateX(3px);
          opacity: 1;
        }
      `}</style>
    </section>
  );
}