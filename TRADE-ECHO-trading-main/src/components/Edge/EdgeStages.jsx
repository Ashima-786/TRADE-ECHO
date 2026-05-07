// 04/Stages — Learning stages accordion with article cards
import { useState } from "react";

const STAGES = [
  {
    id: 1,
    title: "Stage 1: Foundations",
    count: 8,
    desc: "New to options flow, GEX, and dark pools? Start with the fundamentals that power every Trade Echo tool.",
    articles: [
      {
        slug: "platform-overview",
        level: "Beginner",
        title: "Trade Echo Platform Overview: Your Complete Trading Ecosystem",
        excerpt:
          "A walkthrough of Trade Echo's five core pillars — Dashboard, DealerEdge, Cortex AI, AlgoEdge, and Copy Trading — and how they work together.",
        time: "4 min",
      },
      {
        slug: "creating-your-account",
        level: "Beginner",
        title: "Creating Your Account: Sign Up, Subscribe, and Get Set Up",
        excerpt:
          "Three sign-in options, subscription activation, profile setup, theme selection, and notification configuration.",
        time: "2 min",
      },
      {
        slug: "daily-trading-system",
        level: "Beginner",
        title: "The Daily Trading System: Stack Your Edges Before Every Trade",
        excerpt:
          "The complete pre-market to post-market routine — how to use DealerEdge, NewsEdge, AlgoEdge, and OptionFlow together.",
        time: "3 min",
      },
      {
        slug: "your-first-trade",
        level: "Beginner",
        title: "Your First Trade: A 7-Step Process from Scan to Exit",
        excerpt:
          "The exact step-by-step process for finding, entering, managing, and closing a trade using Trade Echo's multi-tool confirmation system.",
        time: "3 min",
      },
      {
        slug: "what-is-options-flow",
        level: "Beginner",
        title: "What Is Options Flow? A Beginner's Guide to Reading Smart Money",
        excerpt:
          "Learn how institutional options orders create a trail of 'smart money' signals — and how retail traders can follow them in real time.",
        time: "2 min",
      },
      {
        slug: "what-is-gamma-exposure",
        level: "Beginner",
        title: "What Is Gamma Exposure (GEX)? How Dealers Move the Market",
        excerpt:
          "Understand how market makers hedge options positions and why their gamma exposure creates predictable support and resistance levels.",
        time: "2 min",
      },
      {
        slug: "understanding-the-greeks",
        level: "Beginner",
        title: "Understanding the Greeks: Delta, Gamma, Theta, Vega Explained",
        excerpt:
          "A plain-language breakdown of the four primary options Greeks and how they affect your P&L on every trade.",
        time: "2 min",
      },
    ],
  },
  {
    id: 2,
    title: "Stage 2: Platform Mastery",
    count: 31,
    desc: "Go deep on every tool. Learn to read OptionFlow, decode GEX heatmaps, and act on Algo signals with confidence.",
    articles: [],
  },
  {
    id: 3,
    title: "Stage 3: Strategies & Risk",
    count: 10,
    desc: "Real-world playbooks, risk frameworks, and position sizing models for consistent trading performance.",
    articles: [],
  },
  {
    id: 4,
    title: "Stage 4: Prove It",
    count: 13,
    desc: "Case studies, live trade walkthroughs, and challenge documentation from real Trade Echo traders.",
    articles: [],
  },
];

function ArticleCard({ article }) {
  return (
    <a
      href={`https://tradeecho.com/edge/${article.slug}`}
      target="_blank"
      rel="noreferrer"
      className="edge-article-card"
    >
      <span className="edge-article-card__level">{article.level}</span>
      <span className="edge-article-card__title">{article.title}</span>
      <span className="edge-article-card__excerpt">{article.excerpt}</span>
      <span className="edge-article-card__time">{article.time}</span>
    </a>
  );
}

export default function EdgeStages() {
  const [open, setOpen] = useState(1);

  return (
    <section className="edge-stages">
      <div className="edge-section-label">
        <span className="edge-num">04/</span>Stages
      </div>

      <h2 className="edge-section-title">Learning stages</h2>

      <div className="edge-stages__list">
        {STAGES.map((stage) => (
          <div
            key={stage.id}
            className={`edge-stage ${open === stage.id ? "open" : ""}`}
          >
            <button
              className="edge-stage__header"
              onClick={() => setOpen(open === stage.id ? null : stage.id)}
            >
              <div className="edge-stage__meta">
                <span className="edge-stage__title">{stage.title}</span>
                <span className="edge-stage__count">{stage.count} articles</span>
              </div>
              <svg
                className="edge-stage__chevron"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {open === stage.id && (
              <div className="edge-stage__body">
                <p className="edge-stage__desc">{stage.desc}</p>

                {stage.articles.length > 0 ? (
                  <div className="edge-stage__articles">
                    {stage.articles.map((a) => (
                      <ArticleCard key={a.slug} article={a} />
                    ))}
                  </div>
                ) : (
                  <p className="edge-stage__coming">
                    Articles available inside the platform ↗
                  </p>
                )}

                {stage.id === 1 && (
                  <a
                    href="https://tradeecho.com/pricing"
                    target="_blank"
                    rel="noreferrer"
                    className="edge-cta-inline"
                  >
                    Ready to see these tools live? — Start Pro · $199/mo →
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <style>{`
        .edge-stages {
          padding: 56px 0;
          border-bottom: 1px solid var(--border);
        }
        .edge-stages__list {
          margin-top: 24px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .edge-stage {
          border: 1px solid var(--border);
          border-radius: 10px;
          overflow: hidden;
          transition: border-color 0.2s;
        }
        .edge-stage.open { border-color: var(--accent); }
        .edge-stage__header {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 20px;
          background: var(--surface);
          cursor: pointer;
          border: none;
          text-align: left;
          transition: background 0.15s;
          font-family: var(--font-body);
        }
        .edge-stage__header:hover { background: var(--surface-hover); }
        .edge-stage__meta {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .edge-stage__title {
          font-size: 15px;
          font-weight: 600;
          color: var(--text);
        }
        .edge-stage__count {
          font-size: 12px;
          color: var(--muted);
          font-family: var(--font-mono);
        }
        .edge-stage__chevron {
          color: var(--muted);
          flex-shrink: 0;
          transition: transform 0.2s;
        }
        .edge-stage.open .edge-stage__chevron { transform: rotate(180deg); }
        .edge-stage__body {
          padding: 20px;
          background: var(--bg);
          border-top: 1px solid var(--border);
        }
        .edge-stage__desc {
          font-size: 14px;
          color: var(--muted);
          line-height: 1.6;
          margin-bottom: 20px;
        }
        .edge-stage__articles {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 10px;
        }
        .edge-article-card {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 16px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          text-decoration: none;
          transition: border-color 0.18s, transform 0.15s;
        }
        .edge-article-card:hover {
          border-color: var(--accent);
          transform: translateY(-2px);
        }
        .edge-article-card__level {
          font-size: 10px;
          font-weight: 600;
          font-family: var(--font-mono);
          color: var(--accent);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .edge-article-card__title {
          font-size: 13px;
          font-weight: 600;
          color: var(--text);
          line-height: 1.4;
        }
        .edge-article-card__excerpt {
          font-size: 12px;
          color: var(--muted);
          line-height: 1.5;
        }
        .edge-article-card__time {
          font-size: 11px;
          color: var(--accent);
          font-family: var(--font-mono);
          margin-top: auto;
        }
        .edge-stage__coming {
          font-size: 13px;
          color: var(--muted);
          font-style: italic;
        }
        .edge-cta-inline {
          display: inline-block;
          margin-top: 20px;
          padding: 10px 18px;
          background: var(--accent);
          color: #fff;
          border-radius: 7px;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          transition: opacity 0.15s;
        }
        .edge-cta-inline:hover { opacity: 0.88; }
      `}</style>
    </section>
  );
}