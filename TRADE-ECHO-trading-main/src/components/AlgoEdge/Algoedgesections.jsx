import { useState, useEffect, useRef } from "react";

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body {
        background: #000;
        color: #fff;
        font-family: 'DM Sans', sans-serif;
        -webkit-font-smoothing: antialiased;
      }

      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: #000; }
      ::-webkit-scrollbar-thumb { background: #d4af37; border-radius: 2px; }

      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(28px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
      @keyframes glowPulse {
        0%, 100% { box-shadow: 0 0 18px #d4af3744; }
        50%       { box-shadow: 0 0 36px #d4af3788; }
      }

      .ae-fade-up      { opacity: 0; }
      .ae-fade-up.in   { animation: fadeUp .65s cubic-bezier(.22,1,.36,1) forwards; }
      .ae-fade-in      { opacity: 0; }
      .ae-fade-in.in   { animation: fadeIn .55s ease forwards; }

      .ae-card {
        background: #0d0d0d;
        border: 1px solid #1c1c1c;
        border-radius: 14px;
        transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
      }
      .ae-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 20px 60px #d4af371a;
        border-color: #d4af3755;
      }

      .ae-btn-primary {
        background: #d4af37;
        color: #000;
        font-family: 'DM Sans', sans-serif;
        font-weight: 600;
        font-size: 15px;
        padding: 14px 28px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        animation: glowPulse 3s ease-in-out infinite;
        transition: background .2s, transform .15s, box-shadow .2s;
      }
      .ae-btn-primary:hover {
        background: #b8912e;
        transform: translateY(-2px);
        box-shadow: 0 8px 30px #d4af3755;
      }

      .ae-btn-secondary {
        background: transparent;
        color: #fff;
        font-family: 'DM Sans', sans-serif;
        font-weight: 600;
        font-size: 15px;
        padding: 13px 28px;
        border: 1.5px solid #333;
        border-radius: 8px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        transition: border-color .2s, background .2s, transform .15s;
      }
      .ae-btn-secondary:hover {
        border-color: #d4af37;
        background: #d4af3712;
        transform: translateY(-2px);
      }

      .ae-section-label {
        font-family: 'DM Sans', sans-serif;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: .18em;
        color: #555;
        text-transform: uppercase;
        text-align: center;
        margin-bottom: 20px;
      }
      .ae-section-label .green { color: #d4af37; }

      .ae-faq-answer {
        overflow: hidden;
        transition: max-height .4s cubic-bezier(.22,1,.36,1), opacity .35s ease;
      }

      .ae-toolkit-tag {
        font-size: 10px;
        font-weight: 700;
        letter-spacing: .12em;
        text-transform: uppercase;
        padding: 4px 10px;
        border-radius: 4px;
        display: inline-block;
        margin-bottom: 14px;
      }

      .ae-step-num {
        color: #d4af37;
        font-family: 'Syne', sans-serif;
        font-weight: 700;
        font-size: 13px;
        letter-spacing: .05em;
        flex-shrink: 0;
        margin-top: 2px;
      }
    `}</style>
  );
}

/* ── 04 PLAYBOOK ── */
function PlaybookSection() {
  const [ref, visible] = useInView();

  const steps = [
    { num: "01", title: "Wait for size",     body: "SPX 0DTE only. Flag trades over 1,000 contracts and $250K in value." },
    { num: "02", title: "Confirm direction", body: "Single-sided clusters only. All calls or all puts. Skip paired hedges." },
    { num: "03", title: "Check context",     body: "Is SPX trending the same way? Volume above average? Cross-check in OptionFlow." },
    { num: "04", title: "Wait for repeat",   body: "Second alert in the same direction within minutes. Repeat tickers sidebar flags it." },
    { num: "05", title: "Execute fast",      body: "Enter within 5 to 10 minutes. 20 percent stop, 50 to 100 percent target." },
    { num: "06", title: "Exit by 2 PM",      body: "0DTE theta accelerates into the close. Don't hold hoping for more." },
  ];

  return (
    <section
      ref={ref}
      style={{ padding: "120px 40px", maxWidth: 1100, margin: "0 auto" }}
    >
      <div className={`ae-fade-in${visible ? " in" : ""}`}>
        <p className="ae-section-label"><span className="green">04</span> / PLAYBOOK</p>
        <h2 style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(36px, 5vw, 58px)",
          textAlign: "center",
          letterSpacing: "-.02em",
          lineHeight: 1.1,
          marginBottom: 16,
        }}>
          The SPX 0DTE <span style={{ color: "#d4af37" }}>framework.</span>
        </h2>
        <p style={{
          textAlign: "center",
          color: "#888",
          fontSize: 16,
          lineHeight: 1.7,
          maxWidth: 500,
          margin: "0 auto 64px",
        }}>
          The most popular channel has the most leverage and the fastest results. Here's the six-step framework our community uses.
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 12,
        }}>
          {steps.map((s, i) => (
            <div
              key={s.num}
              className="ae-card"
              style={{
                padding: "28px 28px",
                opacity: visible ? 1 : 0,
                animation: visible
                  ? `fadeUp .55s cubic-bezier(.22,1,.36,1) ${i * 80}ms forwards`
                  : "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 10 }}>
                <span className="ae-step-num">{s.num}</span>
                <h3 style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: 17,
                  color: "#fff",
                }}>{s.title}</h3>
              </div>
              <p style={{ color: "#777", fontSize: 14, lineHeight: 1.65, paddingLeft: 28 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 05 WHO IT'S FOR ── */
function AudienceSection() {
  const [ref, visible] = useInView();

  const seats = [
    {
      tag: "DAY TRADERS",
      title: "Scalp the algo size.",
      body: "SPX 0DTE, High Value 0DTE, and Momentum channels surface the day's most aggressive institutional bets in real time. Combine with DealerEdge gamma levels for the entry.",
    },
    {
      tag: "SWING TRADERS",
      title: "Follow the seven-figure plays.",
      body: "Large Trades and Weekly channels filter for conviction. When a desk puts $5M on a three-week call, there's a thesis behind it. Ride the same direction.",
    },
    {
      tag: "STOCK PICKERS",
      title: "Find the hidden names.",
      body: "Small Trades and Insider channels surface unusual activity on tickers outside the indices. Repeat-ticker tags tell you when the same name keeps printing.",
    },
  ];

  return (
    <section
      ref={ref}
      style={{ padding: "120px 40px", background: "#000" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p className="ae-section-label"><span className="green">05</span> / WHO IT'S FOR</p>
        <h2 style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(32px, 4.5vw, 52px)",
          textAlign: "center",
          letterSpacing: "-.02em",
          lineHeight: 1.1,
          marginBottom: 64,
        }}>
          Built for every seat <span style={{ color: "#d4af37" }}>at the desk.</span>
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
        }}>
          {seats.map((s, i) => (
            <div
              key={s.tag}
              className="ae-card"
              style={{
                padding: "32px 28px",
                opacity: visible ? 1 : 0,
                animation: visible
                  ? `fadeUp .55s cubic-bezier(.22,1,.36,1) ${i * 100}ms forwards`
                  : "none",
              }}
            >
              <span
                className="ae-toolkit-tag"
                style={{
                  color: "#d4af37",
                  background: "#d4af3715",
                  border: "1px solid #d4af3733",
                }}
              >
                {s.tag}
              </span>
              <h3 style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: 20,
                color: "#fff",
                marginBottom: 14,
                lineHeight: 1.3,
              }}>{s.title}</h3>
              <p style={{ color: "#777", fontSize: 14, lineHeight: 1.7 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 06 FAQ ── */
function FaqSection() {
  const [ref, visible] = useInView();
  const [open, setOpen] = useState(0);

  const faqs = [
    {
      q: "What is AlgoEdge?",
      a: "AlgoEdge tracks algorithmic options trades in real time and classifies them by type, size, and strategy. Every print lands in one of nine channels: Large Trades, Executive, SPX 0DTE, Momentum, Directional, Weekly, High Value 0DTE, Small Trades, and Insider. You pick the channels that match your strategy and the system filters the rest of the noise out.",
    },
    {
      q: "How often does it refresh?",
      a: "AlgoEdge processes trades in real time as they hit the tape. Alerts appear within seconds of a qualifying print. There is no polling delay or batch processing — every signal is live.",
    },
    {
      q: "What counts as a high-conviction signal?",
      a: "A high-conviction signal combines size (1,000+ contracts or $250K+ value), direction (single-sided, not a hedge), context (SPX trending same way, volume above average), and repetition (same ticker printing again within minutes). The Repeat Tickers sidebar tracks this automatically.",
    },
  ];

  return (
    <section ref={ref} style={{ padding: "120px 40px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <p className="ae-section-label"><span className="green">06</span> / QUESTIONS</p>
        <h2 style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(30px, 4vw, 48px)",
          textAlign: "center",
          letterSpacing: "-.02em",
          marginBottom: 56,
        }}>Quick answers.</h2>

        <div
          className={`ae-fade-up${visible ? " in" : ""}`}
          style={{
            border: "1px solid #1a1a1a",
            borderRadius: 14,
            overflow: "hidden",
          }}
        >
          {faqs.map((f, i) => (
            <div
              key={i}
              style={{ borderBottom: i < faqs.length - 1 ? "1px solid #1a1a1a" : "none" }}
            >
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                style={{
                  width: "100%",
                  background: "none",
                  border: "none",
                  padding: "22px 28px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  color: "#fff",
                }}
              >
                <span style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 600,
                  fontSize: 16,
                  textAlign: "left",
                }}>{f.q}</span>
                <span style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  border: "1.5px solid #d4af37",
                  color: "#d4af37",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  fontWeight: 300,
                  flexShrink: 0,
                  marginLeft: 16,
                  transition: "transform .3s ease",
                  transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                }}>+</span>
              </button>
              <div
                className="ae-faq-answer"
                style={{
                  maxHeight: open === i ? "300px" : 0,
                  opacity: open === i ? 1 : 0,
                }}
              >
                <p style={{
                  padding: "0 28px 24px",
                  color: "#777",
                  fontSize: 15,
                  lineHeight: 1.7,
                }}>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 07 GET STARTED ── */
function GetStartedSection() {
  const [ref, visible] = useInView();

  return (
    <section ref={ref} style={{ padding: "80px 40px 120px" }}>
      <div
        className={`ae-fade-up${visible ? " in" : ""}`}
        style={{
          maxWidth: 700,
          margin: "0 auto",
          background: "linear-gradient(135deg, #0d1a0d 0%, #0a0a0a 50%, #0d1a0d 100%)",
          border: "1px solid #1c2e1c",
          borderRadius: 20,
          padding: "64px 48px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Green glow blob at bottom */}
        <div style={{
          position: "absolute",
          inset: 0,
          borderRadius: 20,
          background: "radial-gradient(ellipse 60% 50% at 50% 100%, #d4af3718 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <p className="ae-section-label" style={{ marginBottom: 20, position: "relative" }}>
          <span className="green">07</span> / GET STARTED
        </p>
        <h2 style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(28px, 4vw, 46px)",
          letterSpacing: "-.02em",
          marginBottom: 18,
          lineHeight: 1.1,
          position: "relative",
        }}>
          Start tracking <span style={{ color: "#d4af37" }}>the algos</span> today.
        </h2>
        <p style={{
          color: "#888",
          fontSize: 15,
          lineHeight: 1.7,
          marginBottom: 40,
          position: "relative",
        }}>
          Included in Trade Echo Pro with OptionFlow, DealerEdge, Darkpool, Cortex, and Copy Trading. $199/mo. Cancel anytime.
        </p>
        <div style={{
          display: "flex",
          gap: 14,
          justifyContent: "center",
          flexWrap: "wrap",
          position: "relative",
        }}>
          <button className="ae-btn-primary">Start tracking the algos →</button>
          <button className="ae-btn-secondary">View all plans</button>
        </div>
      </div>
    </section>
  );
}

export default function AlgoEdgeSections() {
  return (
    <>
      <GlobalStyles />
      <div style={{ background: "#000", color: "#fff", minHeight: "100vh" }}>
        <PlaybookSection />
        <AudienceSection />
        <FaqSection />
        <GetStartedSection />
      </div>
    </>
  );
}

export { PlaybookSection, AudienceSection, FaqSection, GetStartedSection };