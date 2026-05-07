// 03/Topics — Topic filter chips
const TOPICS = [
  "All",
  "Foundations",
  "OptionFlow",
  "Darkpool",
  "DealerEdge",
  "AlgoEdge",
  "Copy Trading",
  "NewsEdge",
  "Strategies",
  "Risk",
  "Greeks",
];

export default function EdgeTopics({ activeTopic, onTopicChange }) {
  return (
    <section className="edge-topics">
      <div className="edge-section-label">
        <span className="edge-num">03/</span>Topics
      </div>

      <h2 className="edge-section-title">Filter by topic</h2>

      <div className="edge-topics__chips">
        {TOPICS.map((t) => (
          <button
            key={t}
            className={`edge-chip ${activeTopic === t ? "active" : ""}`}
            onClick={() => onTopicChange?.(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <style>{`
        .edge-topics {
          padding: 56px 0;
          border-bottom: 1px solid var(--border);
        }
        .edge-topics__chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 24px;
        }
        .edge-chip {
          padding: 6px 14px;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: var(--surface);
          font-size: 13px;
          font-weight: 500;
          color: var(--muted);
          cursor: pointer;
          transition: all 0.16s;
          font-family: var(--font-body);
        }
        .edge-chip:hover {
          border-color: var(--accent);
          color: var(--accent);
        }
        .edge-chip.active {
          background: var(--accent);
          border-color: var(--accent);
          color: #fff;
        }
      `}</style>
    </section>
  );
}