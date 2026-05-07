import { useState, useEffect, useRef } from 'react'

// ─── ICONS ───────────────────────────────────────────────
function IconSparkle() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
    </svg>
  )
}
function IconChat() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}
function IconZap() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}
function IconStar() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
function IconPlus({ open }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" style={{ opacity: open ? 0 : 1, transition: 'opacity 0.2s' }} />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

// ─── INTERSECTION HOOK ───────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect() }
    }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

// ─── CAPABILITY CARDS DATA ────────────────────────────────
const CAPS = [
  {
    icon: <IconSparkle />,
    title: 'Connected to every module',
    desc: 'Cortex reads live OptionFlow, DealerEdge, Darkpool, and AlgoEdge data. Context is automatic. You do not paste screenshots.',
  },
  {
    icon: <IconChat />,
    title: 'Specific, not generic',
    desc: 'Answers reference actual tickers, strikes, prints, and levels from your session. Not a general chatbot with memorized textbook answers.',
  },
  {
    icon: <IconZap />,
    title: 'Fast by design',
    desc: 'Most queries answer in under three seconds. Conversation history stays with your account across web and mobile.',
  },
  {
    icon: <IconStar />,
    title: 'The moat competitors lack',
    desc: 'No other retail platform ships AI tied to proprietary flow. Cortex is the difference between reading data and asking questions about it.',
  },
]

// ─── AUDIENCE CARDS DATA ─────────────────────────────────
const AUDIENCE = [
  {
    tag: 'Question-Driven Traders',
    title: 'Ask, don\'t parse.',
    desc: 'Instead of reading six dashboards, ask Cortex: what just changed in SPY? Get a direct answer with data.',
  },
  {
    tag: 'Level Planners',
    title: 'Brief the session.',
    desc: 'Ask Cortex to summarize the dealer map for the week. Use the output as a planning brief for every session.',
  },
  {
    tag: 'Discretionary Traders',
    title: 'Stress-test the thesis.',
    desc: 'When flow contradicts your thesis, ask Cortex why. Get the counter-case before you size in.',
  },
]

// ─── FAQ DATA ────────────────────────────────────────────
const FAQS = [
  {
    q: 'What is Cortex on Trade Echo?',
    a: "Cortex is Trade Echo's AI chat interface tied directly to your live OptionFlow, DealerEdge, Darkpool, and AlgoEdge data. Ask a question in plain English and Cortex answers using your actual session context. No copy-pasting, no screenshots, no generic chatbot answers.",
  },
  {
    q: 'How is this different from ChatGPT or other AI tools?',
    a: 'ChatGPT has no access to real-time market data or your trading session. Cortex is wired into your live flow, GEX surfaces, dark pool tape, and algo signals. Every answer is grounded in what is actually happening in the market right now, not memorized training data.',
  },
  {
    q: 'Does Cortex store my queries?',
    a: 'Conversation history is saved to your account so you can reference past sessions across web and mobile. Your data is never used to train external models or shared with third parties.',
  },
]

// ═══════════════════════════════════════════════════════
// SECTION 1 — Capabilities (03 / CAPABILITIES)
// ═══════════════════════════════════════════════════════
function CapabilitiesSection() {
  const { ref, inView } = useInView(0.1)

  return (
    <section ref={ref} className="capabilities-section">
      {/* Header */}
      <div className={`section-header ${inView ? 'anim-in' : ''}`}>
        <p className="section-label">03 / Capabilities</p>
        <h2 className="section-heading">What it does.</h2>
      </div>

      {/* 2×2 Grid */}
      <div className="caps-grid">
        {CAPS.map((cap, i) => (
          <div
            key={cap.title}
            className={`cap-card ${inView ? 'card-in' : ''}`}
            style={{ transitionDelay: inView ? `${i * 100 + 150}ms` : '0ms' }}
          >
            <div className="cap-icon-wrap">{cap.icon}</div>
            <h3 className="cap-title">{cap.title}</h3>
            <p className="cap-desc">{cap.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════
// SECTION 2 — Audience (04 / WHO IT'S FOR)
// ═══════════════════════════════════════════════════════
function AudienceSection() {
  const { ref, inView } = useInView(0.1)

  return (
    <section ref={ref} className="audience-section">
      <div className={`section-header ${inView ? 'anim-in' : ''}`}>
        <p className="section-label">04 / Who It's For</p>
        <h2 className="section-heading">
          Built for every seat{' '}
          <span className="green-text">at the desk.</span>
        </h2>
      </div>

      <div className="audience-grid">
        {AUDIENCE.map((item, i) => (
          <div
            key={item.tag}
            className={`audience-card ${inView ? 'card-in' : ''}`}
            style={{ transitionDelay: inView ? `${i * 120 + 150}ms` : '0ms' }}
          >
            <div className="audience-tag">{item.tag}</div>
            <h3 className="audience-title">{item.title}</h3>
            <p className="audience-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════
// SECTION 3 — FAQ (05 / QUESTIONS)
// ═══════════════════════════════════════════════════════
function FAQItem({ faq, index, inView }) {
  const [open, setOpen] = useState(index === 0)

  return (
    <div
      className={`faq-item ${inView ? 'card-in' : ''}`}
      style={{ transitionDelay: inView ? `${index * 100 + 150}ms` : '0ms' }}
    >
      <button className="faq-trigger" onClick={() => setOpen(v => !v)}>
        <span className="faq-question">{faq.q}</span>
        <div className={`faq-icon-wrap ${open ? 'faq-open' : ''}`}>
          <IconPlus open={open} />
        </div>
      </button>
      <div
        className="faq-body"
        style={{
          maxHeight: open ? '300px' : '0',
          opacity: open ? 1 : 0,
          transition: 'max-height 0.4s ease, opacity 0.3s ease',
        }}
      >
        <p className="faq-answer">{faq.a}</p>
      </div>
    </div>
  )
}

function QuestionsSection() {
  const { ref, inView } = useInView(0.1)

  return (
    <section ref={ref} className="questions-section">
      <div className={`section-header ${inView ? 'anim-in' : ''}`}>
        <p className="section-label">05 / Questions</p>
        <h2 className="section-heading">Quick answers.</h2>
      </div>

      <div className="faq-list">
        {FAQS.map((faq, i) => (
          <FAQItem key={faq.q} faq={faq} index={i} inView={inView} />
        ))}
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════
// PARENT EXPORT
// ═══════════════════════════════════════════════════════
export default function CortexFeatures() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        /* ── Reset / Base ── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── Shared layout ── */
        .capabilities-section,
        .audience-section,
        .questions-section {
          padding: 96px 32px 100px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          max-width: 100%;
          overflow: hidden;
        }

        /* ── Section header ── */
        .section-header {
          text-align: center;
          margin-bottom: 56px;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }
        .section-header.anim-in {
          opacity: 1;
          transform: translateY(0);
        }

        .section-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.26em;
          color: rgba(255,255,255,0.28);
          text-transform: uppercase;
          margin-bottom: 18px;
        }

        .section-heading {
          font-size: clamp(2rem, 5vw, 3.4rem);
          font-weight: 900;
          color: #ffffff;
          letter-spacing: -0.03em;
          line-height: 1.07;
        }

        .green-text { color: #d4af37; }

        /* ── Card shared animation ── */
        .cap-card,
        .audience-card,
        .faq-item {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .cap-card.card-in,
        .audience-card.card-in,
        .faq-item.card-in {
          opacity: 1;
          transform: translateY(0);
        }

        /* ══════════════════════════════
           SECTION 1 — Capabilities
        ══════════════════════════════ */
        .caps-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          max-width: 920px;
          margin: 0 auto;
        }

        .cap-card {
          background: #111214;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 28px 28px 32px;
          transition: opacity 0.55s ease, transform 0.55s ease, border-color 0.25s ease, box-shadow 0.25s ease;
          cursor: default;
        }
        .cap-card:hover {
          border-color: rgba(212,175,55,0.25);
          box-shadow: 0 0 32px rgba(212,175,55,0.07);
        }

        .cap-icon-wrap {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: rgba(212,175,55,0.08);
          border: 1px solid rgba(212,175,55,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          transition: box-shadow 0.25s ease;
        }
        .cap-card:hover .cap-icon-wrap {
          box-shadow: 0 0 18px rgba(212,175,55,0.25);
        }

        .cap-title {
          font-size: 15px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 10px;
          letter-spacing: -0.01em;
        }

        .cap-desc {
          font-size: 13.5px;
          line-height: 1.68;
          color: rgba(255,255,255,0.48);
        }

        /* ══════════════════════════════
           SECTION 2 — Audience
        ══════════════════════════════ */
        .audience-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          max-width: 1050px;
          margin: 0 auto;
        }

        .audience-card {
          background: #111214;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 28px 26px 32px;
          transition: opacity 0.55s ease, transform 0.55s ease, border-color 0.25s ease;
        }
        .audience-card:hover {
          border-color: rgba(212,175,55,0.2);
        }

        .audience-tag {
          display: inline-block;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #d4af37;
          border: 1px solid rgba(212,175,55,0.35);
          border-radius: 4px;
          padding: 4px 10px;
          margin-bottom: 18px;
        }

        .audience-title {
          font-size: 16px;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.015em;
          margin-bottom: 12px;
          line-height: 1.25;
        }

        .audience-desc {
          font-size: 13.5px;
          line-height: 1.7;
          color: rgba(255,255,255,0.48);
        }

        /* ══════════════════════════════
           SECTION 3 — FAQ
        ══════════════════════════════ */
        .faq-list {
          max-width: 700px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .faq-item {
          background: #111214;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          overflow: hidden;
          transition: opacity 0.55s ease, transform 0.55s ease, border-color 0.25s ease;
        }
        .faq-item:hover {
          border-color: rgba(212,175,55,0.18);
        }

        .faq-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 22px;
          background: none;
          border: none;
          cursor: pointer;
          gap: 16px;
          text-align: left;
        }

        .faq-question {
          font-size: 14.5px;
          font-weight: 600;
          color: #ffffff;
          letter-spacing: -0.01em;
          line-height: 1.35;
        }

        .faq-icon-wrap {
          flex-shrink: 0;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1.5px solid rgba(212,175,55,0.4);
          background: rgba(212,175,55,0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .faq-icon-wrap.faq-open {
          background: rgba(212,175,55,0.12);
          border-color: rgba(212,175,55,0.6);
          box-shadow: 0 0 12px rgba(212,175,55,0.2);
        }

        .faq-body {
          overflow: hidden;
          padding: 0 22px;
        }

        .faq-answer {
          font-size: 14px;
          line-height: 1.72;
          color: rgba(255,255,255,0.52);
          padding-bottom: 20px;
          letter-spacing: -0.005em;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .caps-grid { grid-template-columns: 1fr; }
          .audience-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── All 3 sections ── */}
      <CapabilitiesSection />
      <AudienceSection />
      <QuestionsSection />
    </>
  )
}