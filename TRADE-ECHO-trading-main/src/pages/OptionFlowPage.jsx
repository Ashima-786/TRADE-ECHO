import { useState } from "react";

export default function OptionFlowPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "What is OptionFlow on Trade Echo?",
      a: "OptionFlow is Trade Echo's real-time options order flow scanner. It streams strike-level prints from every U.S. options exchange and classifies each print into three tiers: Aggressive, Unusual, and Golden.",
    },
    {
      q: "How does Trade Echo work?",
      a: "Trade Echo provides institutional-grade options flow, dark pool data, dealer positioning, and trading analytics inside one platform.",
    },
    {
      q: "Is Trade Echo the same as Echo Trade?",
      a: "No. Trade Echo is a separate institutional-grade options analytics platform focused on real-time market intelligence.",
    },
  ];

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#000",
      color: "#fff",
      fontFamily: "Inter, system-ui, sans-serif",
      padding: "90px 22px",
    },
    wrap: {
      maxWidth: "1180px",
      margin: "0 auto",
    },
    hero: {
      textAlign: "center",
      padding: "40px 0 90px",
    },
    label: {
      color: "#777",
      fontSize: "12px",
      letterSpacing: "5px",
      fontWeight: "700",
      marginBottom: "24px",
    },
    title: {
      fontSize: "clamp(46px, 7vw, 92px)",
      lineHeight: "1.05",
      fontWeight: "900",
      letterSpacing: "-3px",
      marginBottom: "26px",
    },
    gold: {
      color: "#d4af37",
    },
    desc: {
      maxWidth: "760px",
      margin: "0 auto",
      color: "#c9c9c9",
      fontSize: "clamp(16px, 1.5vw, 19px)",
      lineHeight: "1.75",
    },
    buttons: {
      marginTop: "38px",
      display: "flex",
      justifyContent: "center",
      gap: "16px",
      flexWrap: "wrap",
    },
    primaryBtn: {
      background: "#d4af37",
      color: "#000",
      border: "1px solid #d4af37",
      padding: "15px 30px",
      borderRadius: "14px",
      fontSize: "15px",
      fontWeight: "800",
      cursor: "pointer",
    },
    secondaryBtn: {
      background: "transparent",
      color: "#fff",
      border: "1px solid rgba(255,255,255,0.16)",
      padding: "15px 30px",
      borderRadius: "14px",
      fontSize: "15px",
      fontWeight: "800",
      cursor: "pointer",
    },
    section: {
      padding: "80px 0",
    },
    sectionTitle: {
      textAlign: "center",
      fontSize: "clamp(34px, 5vw, 58px)",
      lineHeight: "1.1",
      fontWeight: "900",
      letterSpacing: "-1.5px",
      marginBottom: "48px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "22px",
    },
    card: {
      background: "#050505",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "22px",
      padding: "30px",
      minHeight: "210px",
    },
    icon: {
      width: "46px",
      height: "46px",
      borderRadius: "14px",
      border: "1px solid rgba(212,175,55,0.45)",
      color: "#d4af37",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "22px",
      fontWeight: "900",
      marginBottom: "22px",
    },
    cardTitle: {
      color: "#fff",
      fontSize: "22px",
      lineHeight: "1.25",
      fontWeight: "850",
      marginBottom: "14px",
    },
    cardText: {
      color: "#b8b8b8",
      fontSize: "16px",
      lineHeight: "1.7",
    },
    tierBox: {
      maxWidth: "880px",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },
    tier: {
      background: "#050505",
      border: "1px solid rgba(212,175,55,0.22)",
      borderRadius: "20px",
      padding: "24px",
      display: "grid",
      gridTemplateColumns: "160px 1fr",
      gap: "20px",
      alignItems: "center",
    },
    tierName: {
      color: "#d4af37",
      fontSize: "21px",
      fontWeight: "900",
    },
    tierText: {
      color: "#c9c9c9",
      fontSize: "16px",
      lineHeight: "1.65",
    },
    faqWrap: {
      maxWidth: "980px",
      margin: "0 auto",
    },
    faqBox: {
      background: "#050505",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "20px",
      marginBottom: "16px",
      overflow: "hidden",
    },
    faqHead: {
      width: "100%",
      background: "transparent",
      border: "none",
      padding: "24px 26px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "20px",
      cursor: "pointer",
      textAlign: "left",
    },
    faqQ: {
      color: "#fff",
      fontSize: "clamp(17px, 2vw, 22px)",
      fontWeight: "850",
      lineHeight: "1.35",
    },
    plus: {
      minWidth: "34px",
      height: "34px",
      borderRadius: "50%",
      border: "1px solid #d4af37",
      color: "#d4af37",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "22px",
      fontWeight: "700",
    },
    faqAns: {
      color: "#c9c9c9",
      fontSize: "16px",
      lineHeight: "1.75",
      padding: "0 26px 26px",
    },
    cta: {
      marginTop: "60px",
      background:
        "linear-gradient(180deg, rgba(212,175,55,0.12), rgba(212,175,55,0.03))",
      border: "1px solid rgba(212,175,55,0.28)",
      borderRadius: "28px",
      padding: "60px 24px",
      textAlign: "center",
    },
    ctaTitle: {
      fontSize: "clamp(32px, 5vw, 56px)",
      fontWeight: "900",
      letterSpacing: "-1.5px",
      marginBottom: "18px",
    },
  };

  return (
    <main style={styles.page}>
      <div style={styles.wrap}>
        <section style={styles.hero}>
          <p style={styles.label}>01 / OPTIONFLOW</p>

          <h1 style={styles.title}>
            Institutional flow,
            <br />
            <span style={styles.gold}>tiered three ways.</span>
          </h1>

          <p style={styles.desc}>
            OptionFlow scans every U.S. options exchange in real time.
            Proprietary tiering surfaces the signal in three layers:
            Aggressive, Unusual, and Golden. Each alert opens a full analysis
            workspace.
          </p>

          <div style={styles.buttons}>
            <button style={styles.primaryBtn}>Start tracking the flow →</button>
            <button style={styles.secondaryBtn}>See the full platform</button>
          </div>
        </section>

        <section style={styles.section}>
          <p style={{ ...styles.label, textAlign: "center" }}>02 / TIERING</p>

          <h2 style={styles.sectionTitle}>
            Three tiers. Millions of prints
            <br />
            <span style={styles.gold}>filtered to what matters.</span>
          </h2>

          <div style={styles.tierBox}>
            <div style={styles.tier}>
              <h3 style={styles.tierName}>Aggressive</h3>
              <p style={styles.tierText}>
                Large premium crossing the ask with urgency. The market is
                paying up to get filled.
              </p>
            </div>

            <div style={styles.tier}>
              <h3 style={styles.tierName}>Unusual</h3>
              <p style={styles.tierText}>
                Size and structure the typical desk would not put on. Something
                specific is in play.
              </p>
            </div>

            <div style={styles.tier}>
              <h3 style={styles.tierName}>Golden</h3>
              <p style={styles.tierText}>
                Highest-conviction overlap: aggressive, unusual, and above the
                premium threshold.
              </p>
            </div>
          </div>
        </section>

        <section style={styles.section}>
          <p style={{ ...styles.label, textAlign: "center" }}>
            03 / CAPABILITIES
          </p>

          <h2 style={styles.sectionTitle}>What it does.</h2>

          <div style={styles.grid}>
            <div style={styles.card}>
              <div style={styles.icon}>↗</div>
              <h3 style={styles.cardTitle}>Three-tier signal engine</h3>
              <p style={styles.cardText}>
                Aggressive, Unusual, and Golden flow tiers cut through the noise
                and show only important activity.
              </p>
            </div>

            <div style={styles.card}>
              <div style={styles.icon}>⌕</div>
              <h3 style={styles.cardTitle}>Premium size filters</h3>
              <p style={styles.cardText}>
                Isolate prints above premium size, expiration, strike,
                sentiment, and sector.
              </p>
            </div>

            <div style={styles.card}>
              <div style={styles.icon}>▣</div>
              <h3 style={styles.cardTitle}>Six-tab workspace</h3>
              <p style={styles.cardText}>
                Each alert opens into Flow, P&L, Greeks, Heatmap, GEX, and Open
                Interest views.
              </p>
            </div>
          </div>
        </section>

        <section style={styles.section}>
          <p style={{ ...styles.label, textAlign: "center" }}>06 / QUESTIONS</p>

          <h2 style={styles.sectionTitle}>Quick answers.</h2>

          <div style={styles.faqWrap}>
            {faqs.map((item, index) => (
              <div
                key={index}
                style={{
                  ...styles.faqBox,
                  borderColor:
                    openIndex === index
                      ? "rgba(212,175,55,0.6)"
                      : "rgba(255,255,255,0.1)",
                }}
              >
                <button
                  style={styles.faqHead}
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  <span style={styles.faqQ}>{item.q}</span>
                  <span style={styles.plus}>
                    {openIndex === index ? "×" : "+"}
                  </span>
                </button>

                {openIndex === index && (
                  <p style={styles.faqAns}>{item.a}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section style={styles.cta}>
          <p style={styles.label}>07 / GET STARTED</p>

          <h2 style={styles.ctaTitle}>
            Start using <span style={styles.gold}>OptionFlow</span> today.
          </h2>

          <p style={styles.desc}>
            Included in Trade Echo Pro with DealerEdge, Darkpool, AlgoEdge,
            Cortex, and Copy Trading. Cancel anytime.
          </p>

          <div style={styles.buttons}>
            <button style={styles.primaryBtn}>Start tracking the flow →</button>
            <button style={styles.secondaryBtn}>View all plans</button>
          </div>
        </section>
      </div>
    </main>
  );
}