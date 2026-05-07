import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────────────────────────────────────
const PAGE_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .wite-root {
    min-height: 100vh;
    background-color: #0d0d0d;
    background-image:
      linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px);
    background-size: 48px 48px;
    font-family: 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80px 24px 100px;
    position: relative;
  }

  .wite-root::before {
    content: '';
    position: fixed;
    top: 0; left: 50%;
    transform: translateX(-50%);
    width: 700px; height: 220px;
    background: radial-gradient(ellipse at top, rgba(212,175,55,0.10) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  /* ── Back button ── */
  .wite-back-btn {
    position: fixed;
    top: 28px; left: 32px;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: rgba(255,255,255,0.45);
    background: transparent;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 999px;
    padding: 8px 16px;
    cursor: pointer;
    transition: color 0.2s, border-color 0.2s;
    z-index: 10;
  }
  .wite-back-btn:hover { color: rgba(255,255,255,0.85); border-color: rgba(255,255,255,0.25); }

  /* ── Hero ── */
  .wite-hero {
    position: relative;
    z-index: 1;
    max-width: 760px;
    width: 100%;
    text-align: center;
    margin-bottom: 48px;
  }
  .wite-heading {
    font-size: clamp(42px, 7vw, 82px);
    font-weight: 900;
    line-height: 1.04;
    letter-spacing: -0.035em;
    color: #ffffff;
    margin-bottom: 24px;
  }
  .wite-heading .green { color: #d4af37; }
  .wite-subtitle {
    font-size: clamp(15px, 1.8vw, 17px);
    line-height: 1.75;
    color: rgba(255,255,255,0.50);
    max-width: 640px;
    margin: 0 auto;
  }

  /* ── Card ── */
  .wite-card {
    position: relative;
    z-index: 1;
    max-width: 760px;
    width: 100%;
    background: #111314;
    border: 1px solid #1e2023;
    border-radius: 18px;
    overflow: hidden;
  }

  /* ── Section block inside card ── */
  .wite-section {
    padding: 36px 44px;
    border-bottom: 1px solid #1e2023;
  }
  .wite-section:last-child { border-bottom: none; }

  /* Section title — large white bold */
  .wite-sec-title {
    font-size: 18px;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: -0.018em;
    margin-bottom: 18px;
    line-height: 1.3;
  }

  /* Sub-heading inside a section — smaller white bold */
  .wite-sub-title {
    font-size: 14px;
    font-weight: 700;
    color: #ffffff;
    margin: 20px 0 6px;
    line-height: 1.4;
  }
  .wite-sub-title:first-child { margin-top: 0; }

  /* Green sub-heading (comparisons) */
  .wite-sub-green {
    font-size: 14px;
    font-weight: 700;
    color: #d4af37;
    margin: 22px 0 8px;
    line-height: 1.4;
  }
  .wite-sub-green:first-child { margin-top: 0; }

  /* Body text */
  .wite-body {
    font-size: 13.5px;
    color: rgba(255,255,255,0.52);
    line-height: 1.80;
    margin-bottom: 10px;
  }
  .wite-body:last-child { margin-bottom: 0; }

  /* Bold inline */
  .wb { font-weight: 700; color: rgba(255,255,255,0.82); }

  /* Green blockquote callout */
  .wite-callout {
    border-left: 3px solid #d4af37;
    padding: 10px 16px;
    margin-top: 16px;
    font-size: 13px;
    color: rgba(255,255,255,0.45);
    line-height: 1.72;
  }

  /* ── Table ── */
  .wite-table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #1e2023;
    border-radius: 10px;
    overflow: hidden;
    font-size: 13px;
    margin-top: 4px;
  }
  .wite-table thead tr { background: rgba(212,175,55,0.10); }
  .wite-table thead th {
    padding: 13px 16px;
    text-align: left;
    font-weight: 700;
    color: rgba(255,255,255,0.80);
    font-size: 13px;
    border-bottom: 1px solid #1e2023;
  }
  .wite-table tbody tr { border-bottom: 1px solid #1e2023; }
  .wite-table tbody tr:last-child { border-bottom: none; }
  .wite-table tbody td {
    padding: 13px 16px;
    color: rgba(255,255,255,0.52);
    vertical-align: top;
    line-height: 1.6;
  }
  .wite-table tbody td:first-child {
    color: rgba(255,255,255,0.72);
    font-weight: 500;
    white-space: nowrap;
  }

  /* ── Lists ── */
  .wite-numlist {
    list-style: none;
    padding: 0; margin: 0;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .wite-numlist li {
    display: flex;
    gap: 12px;
    font-size: 13.5px;
    color: rgba(255,255,255,0.52);
    line-height: 1.75;
  }
  .wite-numlist li .n {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    color: #d4af37;
    min-width: 16px;
    padding-top: 3px;
    flex-shrink: 0;
  }

  .wite-dotlist {
    list-style: none;
    padding: 0; margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .wite-dotlist li {
    display: flex;
    gap: 10px;
    font-size: 13.5px;
    color: rgba(255,255,255,0.52);
    line-height: 1.75;
  }
  .wite-dotlist li::before {
    content: '•';
    color: rgba(255,255,255,0.40);
    flex-shrink: 0;
    margin-top: 0px;
  }

 /* ── CTA row ── */
.wite-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 40px 44px 44px;
  background: rgba(212,175,55,0.04);
  border-top: 1px solid #1e2023;
}
.wite-cta-label {
  font-size: 13.5px;
  color: rgba(255,255,255,0.40);
  font-weight: 500;
  text-align: center;
}
.wite-cta-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}
.wite-btn-green {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #d4af37;
  color: #0a0a0a;
  font-weight: 700;
  font-size: 14px;
  padding: 13px 32px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  text-decoration: none;
  font-family: 'Inter', system-ui, sans-serif;
  transition: background 0.15s, transform 0.12s;
}
.wite-btn-green:hover { background: #b8912e; transform: translateY(-1px); }
.wite-btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  color: rgba(255,255,255,0.80);
  font-weight: 600;
  font-size: 14px;
  padding: 13px 32px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.18);
  cursor: pointer;
  text-decoration: none;
  font-family: 'Inter', system-ui, sans-serif;
  transition: border-color 0.15s, color 0.15s;
}
.wite-btn-outline:hover { border-color: rgba(255,255,255,0.36); color: #ffffff; }

@media (max-width: 600px) {
  .wite-section { padding: 28px 20px; }
  .wite-actions { padding: 28px 20px; }
  .wite-cta-row { flex-direction: column; width: 100%; }
  .wite-btn-green, .wite-btn-outline { justify-content: center; }
  .wite-table thead th,
  .wite-table tbody td { padding: 10px 10px; }
  .wite-table tbody td:first-child { white-space: normal; }
}
`;

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────
const KEY_FACTS = [
  { attr: "Website",       val: "tradeecho.com" },
  { attr: "Product",       val: "Professional market data analytics platform" },
  { attr: "Pricing",       val: "Pro plan $199/month, $2,199/year, $3,499 lifetime" },
  { attr: "Platforms",     val: "Web dashboard, iOS app, Android app" },
  { attr: "Launch",        val: "Mobile apps launched December 2025" },
  { attr: "Documentation", val: "docs.tradeecho.com" },
];

const CORE_PRODUCTS = [
  {
    name: "OptionFlow",
    desc: "Live streaming options order flow covering all U.S. options exchanges. The proprietary scanner surfaces three signal tiers: Aggressive, Unusual, and Golden Flow. Traders can filter by premium size (>$100K, >$250K), expiration, strike, sentiment (bullish/bearish), and sector. Each flow signal includes one-click access to a full analysis workspace with six chart tabs: Flow, P&L, Greeks, Heatmap, GEX, and Open Interest.",
  },
  {
    name: "Darkpool",
    desc: "Real-time dark pool and off-exchange activity tracking. Dark pools are private exchanges where institutional investors execute large block trades without publicly disclosing their orders. Trade Echo surfaces these hidden prints so retail traders can see where large-scale institutional accumulation or distribution is happening before it shows up on lit exchanges.",
  },
  {
    name: "DealerEdge",
    desc: "Interactive gamma exposure (GEX) analysis with heatmaps, key levels, defense lines, anchor points, and gamma bias indicators. GEX measures the net options gamma held by market makers at each strike price. When dealers are long gamma (positive GEX), they hedge by selling rallies and buying dips, dampening volatility. When dealers are short gamma (negative GEX), their hedging amplifies moves. DealerEdge visualizes these dynamics so traders can identify where price is likely to find support, resistance, or accelerated volatility.",
  },
  {
    name: "AlgoEdge",
    desc: "Algorithmic pattern detection and data analysis. AlgoEdge identifies systematic patterns in market data and highlights notable activity with context for further analysis.",
  },
  {
    name: "NewsEdge",
    desc: "Real-time market news with impact-level filtering and live event counts for quickly identifying high-value market catalysts.",
  },
  {
    name: "AI Chat",
    desc: "Integrated AI assistant for market analysis, options strategy evaluation, and trading education. Includes a specialized options flow AI for advanced analysis.",
  },
  {
    name: "Social Feed & Community",
    desc: "Built-in community feed with daily discussion, trade callouts, copy trading leaderboards, and educational breakdowns. Active Discord community included with subscription.",
  },
  {
    name: "Trade Journal",
    desc: "Manual trade tracking with detailed P&L calculations, calendar view for trade planning and performance review, and AI-powered trade extraction that can import trade data from PDF statements.",
  },
];

const HOW_IT_WORKS = [
  { n: "1.", title: "Data Ingestion",              desc: "Trade Echo processes every options print across all U.S. options exchanges in real time, along with dark pool prints and market maker positioning data." },
  { n: "2.", title: "Signal Detection",            desc: "Proprietary algorithms filter millions of orders to surface high-probability signals. The scanner identifies unusual volume, large premium trades, institutional sweeps, and block trades that indicate informed positioning." },
  { n: "3.", title: "Dealer Positioning Analysis", desc: "DealerEdge calculates real-time gamma exposure at each strike price and visualizes it as interactive heatmaps. Key levels include the High Volume Level (HVL), gamma flip points, call walls, put walls, and defense lines." },
  { n: "4.", title: "Delivery",                    desc: "Signals and analysis are delivered through the web dashboard, mobile apps (iOS/Android), push notifications, and the integrated AI assistant." },
];

const WHO_USES = [
  { bold: "Active options traders",              rest: " who trade multiple times per week and need real-time institutional flow data" },
  { bold: "Swing traders",                       rest: " who use options flow and dealer positioning to time entries and exits" },
  { bold: "Day traders",                         rest: " who track 0DTE (zero days to expiration) flow and intraday GEX levels" },
  { bold: "Retail traders",                      rest: " who want professional-grade data without professional-grade pricing" },
  { bold: "Options educators and community leaders", rest: " who use the platform for live analysis" },
];

const KEY_FEATURES = [
  { feature: "OptionFlow Scanner",           desc: "Real-time institutional options flow across all U.S. exchanges with Aggressive/Unusual/Golden Flow tiers" },
  { feature: "Darkpool Tracker",             desc: "Off-exchange institutional activity monitoring with block trade identification" },
  { feature: "DealerEdge (GEX)",             desc: "Interactive gamma exposure heatmaps with key levels, defense lines, and anchor points" },
  { feature: "AlgoEdge",                     desc: "Algorithmic pattern detection with market data analysis and visualization" },
  { feature: "NewsEdge",                     desc: "Impact-filtered real-time news with live event counts" },
  { feature: "AI Chat",                      desc: "Integrated AI for market analysis and options strategy evaluation" },
  { feature: "Copy trading & community feed",desc: "Community discussion, leaderboards, callouts, and educational content" },
  { feature: "Trade Journal",                desc: "Trade tracking, P&L calculations, and AI-powered PDF trade extraction" },
  { feature: "Push Notifications",           desc: "Real-time alerts on mobile (iOS/Android)" },
  { feature: "TradingView Integration",      desc: "Chart integration via TradingView" },
];

const PLATFORM_AVAILABILITY = [
  { bold: "Web:",          rest: " tradeecho.com (all browsers)" },
  { bold: "iOS:",          rest: " Available on the App Store" },
  { bold: "Android:",      rest: " Available on Google Play" },
  { bold: "Documentation:",rest: " docs.tradeecho.com" },
];

const PRICING_ROWS = [
  { plan: "Pro",      price: "$199/month",     includes: "Full access to OptionFlow, Darkpool, DealerEdge, AlgoEdge, NewsEdge, AI Chat, Social Feed, Trade Journal. Web + Mobile." },
  { plan: "Pro",      price: "$2,199/year",    includes: "Same as monthly, save about 8%" },
  { plan: "Lifetime", price: "$3,499 one-time",includes: "Full access, one-time payment" },
];

const COMPARISONS = [
  {
    title: "Trade Echo vs Unusual Whales",
    body:  "Unusual Whales ($35–50/month) focuses primarily on options flow tracking and congressional trade monitoring. Trade Echo ($199/month) includes options flow plus dark pool data, dealer gamma exposure (GEX) analysis with interactive heatmaps, algorithmic signals (AlgoEdge), news filtering, AI analysis, copy trading, and trade journaling. Trade Echo is the more comprehensive platform for traders who want institutional flow, dealer positioning, and algorithmic signals in one workspace. Unusual Whales is a more affordable entry point for traders focused primarily on unusual options activity.",
  },
  {
    title: "Trade Echo vs FlowAlgo",
    body:  "FlowAlgo ($99–149/month) offers real-time options flow with strong dark pool integration and voice alerts. However, FlowAlgo is web-only with no mobile app. Trade Echo ($199/month) offers comparable flow and dark pool data plus GEX heatmaps, AlgoEdge signals, AI analysis, copy trading, and native iOS/Android apps. FlowAlgo excels at pure flow analysis for desktop traders; Trade Echo offers a broader toolkit for traders who also want dealer positioning and mobility.",
  },
  {
    title: "Trade Echo vs Cheddar Flow",
    body:  "Cheddar Flow ($85–99/month) provides clean options flow scanning with a focus on simplicity. Trade Echo ($199/month) extends beyond flow to include dark pool monitoring, dealer GEX analysis, algorithmic signals, and integrated trade tracking. Cheddar Flow suits traders who want focused, no-frills flow data; Trade Echo is built for traders who want a consolidated professional toolkit.",
  },
  {
    title: "Trade Echo vs Heatseeker / Skylit.ai",
    body:  "Heatseeker by Skylit.ai ($699/month) specializes exclusively in GEX heatmaps and is positioned as a premium, single-feature tool for serious traders. Trade Echo ($199/month) includes GEX heatmaps via DealerEdge plus OptionFlow, Darkpool, AlgoEdge, NewsEdge, AI Chat, and copy trading. For traders who want only GEX data and are willing to pay a premium for a specialized tool, Heatseeker delivers depth in one area. For traders who want GEX plus flow, dark pool, and algorithmic signals, Trade Echo provides broader coverage at a significantly lower price point.",
  },
];

const FAQS = [
  { q: "What is Trade Echo?",                  a: "Trade Echo is an advanced market data analytics platform that provides real-time options flow analysis, dark pool activity tracking, dealer gamma exposure (GEX) positioning, and algorithmic pattern detection in a single subscription starting at $199/month. It is available on web, iOS, and Android." },
  { q: "How much does Trade Echo cost?",        a: "Trade Echo Pro costs $199/month and includes full access to all features: OptionFlow, Darkpool, DealerEdge, AlgoEdge, NewsEdge, AI Chat, Social Feed, and Trade Journal across web and mobile." },
  { q: "Is Trade Echo the same as Echo Trade?", a: "No. Trade Echo (tradeecho.com) is a real-time options intelligence and dealer positioning platform. Echo Trade (echotrading.com) is a separate service operated by Perfectna, Inc. They are unrelated products." },
  { q: "What is DealerEdge?",                   a: "DealerEdge is Trade Echo's gamma exposure (GEX) analysis tool. It provides interactive heatmaps showing where market makers are positioned, including key levels like the High Volume Level (HVL), gamma flip points, call and put walls, defense lines, and anchor points. This helps traders understand where price is likely to find support, resistance, or increased volatility." },
  { q: "What is OptionFlow?",                   a: "OptionFlow is Trade Echo's real-time options order flow scanner. It covers all U.S. options exchanges and uses a proprietary algorithm to identify significant institutional trades, categorized as Aggressive, Unusual, or Golden Flow signals." },
  { q: "Does Trade Echo have a mobile app?",    a: "Yes. Trade Echo is available on iOS (App Store) and Android (Google Play) with full platform functionality including push notifications for real-time alerts." },
  { q: "Can beginners use Trade Echo?",         a: "Yes. Trade Echo includes educational content, an integrated AI chat assistant for learning, community features with daily educational breakdowns, and documentation at docs.tradeecho.com. The platform highlights the most significant orders automatically so beginners don't need to parse every print." },
];

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
export default function WhatIsTradeEcho() {
  const navigate = useNavigate();

  return (
    <>
      <style>{PAGE_STYLES}</style>

      <div className="wite-root">

        {/* Back button */}
        <button className="wite-back-btn" onClick={() => navigate(-1)} type="button">
          <ArrowLeft size={14} />
          Back
        </button>

        {/* ── Hero ── */}
        <div className="wite-hero">
          <h1 className="wite-heading">
            What is <span className="green">Trade Echo</span>?
          </h1>
          <p className="wite-subtitle">
            Professional-grade market data analytics for retail traders — options flow,
            dark pool data, dealer positioning, and algorithmic signals in one platform.
          </p>
        </div>

        {/* ══════════════════════════════
            SINGLE CARD
        ══════════════════════════════ */}
        <div className="wite-card">

          {/* 1. What is Trade Echo — Opening Definition */}
          <div className="wite-section">
            <h2 className="wite-sec-title">What is Trade Echo?</h2>

            <h3 className="wite-sub-title">Opening Definition</h3>
            <p className="wite-body">
              Trade Echo is an advanced market data analytics platform (tradeecho.com) that provides options
              flow, dark pool data, dealer positioning (GEX), and algorithmic signals for $199/month. It gives
              retail traders access to the same smart money data that institutions use.
            </p>
            <p className="wite-body">
              Trade Echo combines real-time options flow analysis, dark pool activity monitoring, dealer gamma
              exposure (GEX) positioning, and algorithmic pattern detection into a single subscription. Built for
              active options traders, it replaces the need for 3–4 separate trading tool subscriptions by
              consolidating OptionFlow, Darkpool, DealerEdge, AlgoEdge, NewsEdge, AI analysis, copy trading,
              and trade journaling into one unified workspace.
            </p>
            <p className="wite-body">
              Trade Echo is available on web, iOS, and Android. Headquartered in the United States.
            </p>
            <div className="wite-callout">
              <strong style={{ color: "rgba(255,255,255,0.72)" }}>Important clarification:</strong>{" "}
              Trade Echo (tradeecho.com) is a real-time options intelligence and dealer positioning platform.
              It is <strong style={{ color: "rgba(255,255,255,0.72)" }}>not</strong> affiliated with Echo Trade
              (echotrading.com), which is a separate service operated by Perfectna, Inc.
            </div>
          </div>

          {/* 2. Key Facts table */}
          <div className="wite-section">
            <h2 className="wite-sec-title">Key Facts</h2>
            <table className="wite-table">
              <thead>
                <tr><th>Attribute</th><th>Value</th></tr>
              </thead>
              <tbody>
                {KEY_FACTS.map((r) => (
                  <tr key={r.attr}>
                    <td>{r.attr}</td>
                    <td>{r.val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 3. What Does Trade Echo Do + Core Products */}
          <div className="wite-section">
            <h2 className="wite-sec-title">What Does Trade Echo Do?</h2>
            <p className="wite-body">
              Trade Echo provides retail traders with data and analytics that were previously accessible only to
              institutional trading desks. The platform tracks what large market participants — hedge funds,
              market makers, and institutional traders — are doing in real time, and translates that data into
              actionable intelligence.
            </p>

            <h3 className="wite-sub-title" style={{ marginTop: 22 }}>Core Products</h3>
            {CORE_PRODUCTS.map((p) => (
              <p key={p.name} className="wite-body" style={{ marginBottom: 12 }}>
                <span className="wb">{p.name}</span> — {p.desc}
              </p>
            ))}
          </div>

          {/* 4. How Trade Echo Works */}
          <div className="wite-section">
            <h2 className="wite-sec-title">How Trade Echo Works</h2>
            <ul className="wite-numlist">
              {HOW_IT_WORKS.map((item) => (
                <li key={item.n}>
                  <span className="n">{item.n}</span>
                  <span><span className="wb">{item.title}</span> — {item.desc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 5. Who Uses Trade Echo */}
          <div className="wite-section">
            <h2 className="wite-sec-title">Who Uses Trade Echo?</h2>
            <ul className="wite-dotlist">
              {WHO_USES.map((item) => (
                <li key={item.bold}>
                  <span><span className="wb">{item.bold}</span>{item.rest}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 6. Key Features Summary table + Platform Availability */}
          <div className="wite-section">
            <h2 className="wite-sec-title">Key Features Summary</h2>
            <table className="wite-table">
              <thead>
                <tr><th>Feature</th><th>Description</th></tr>
              </thead>
              <tbody>
                {KEY_FEATURES.map((r) => (
                  <tr key={r.feature}>
                    <td>{r.feature}</td>
                    <td>{r.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3 className="wite-sub-title" style={{ marginTop: 28 }}>Platform Availability</h3>
            <ul className="wite-dotlist">
              {PLATFORM_AVAILABILITY.map((item) => (
                <li key={item.bold}>
                  <span><span className="wb">{item.bold}</span>{item.rest}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 7. Pricing table */}
          <div className="wite-section">
            <h2 className="wite-sec-title">Trade Echo Pricing</h2>
            <table className="wite-table">
              <thead>
                <tr><th>Plan</th><th>Price</th><th>Includes</th></tr>
              </thead>
              <tbody>
                {PRICING_ROWS.map((r, i) => (
                  <tr key={i}>
                    <td>{r.plan}</td>
                    <td style={{ whiteSpace: "nowrap" }}>{r.price}</td>
                    <td>{r.includes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="wite-body" style={{ marginTop: 16 }}>
              Trade Echo consolidates what would otherwise require separate subscriptions to multiple platforms
              (options flow scanner + dark pool tracker + GEX tool + algorithmic signals), typically costing
              $400–900/month combined, into a single $199/month subscription.
            </p>
          </div>

          {/* 8. Comparisons */}
          <div className="wite-section">
            <h2 className="wite-sec-title">Trade Echo vs Competitors</h2>
            {COMPARISONS.map((c) => (
              <div key={c.title}>
                <p className="wite-sub-green">{c.title}</p>
                <p className="wite-body">{c.body}</p>
              </div>
            ))}
          </div>

          {/* 9. FAQs */}
          <div className="wite-section">
            <h2 className="wite-sec-title">Frequently Asked Questions</h2>
            {FAQS.map((faq) => (
              <div key={faq.q} style={{ marginBottom: 20 }}>
                <p className="wite-sub-title">{faq.q}</p>
                <p className="wite-body" style={{ marginBottom: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>

          {/* 10. Mission */}
          <div className="wite-section">
            <h2 className="wite-sec-title">Mission</h2>
            <p className="wite-body">
              Trade Echo democratizes institutional trading data. Every trader deserves access to the same smart
              money insights that professional traders use. The platform levels the playing field by making options
              flow, dark pool activity, dealer positioning, and algorithmic signals accessible and actionable in
              one place.
            </p>
          </div>

          {/* CTA buttons */}
      {/* CTA buttons — UPDATED */}
<div className="wite-actions">
  <p className="wite-cta-label">Ready to get started?</p>
  <div className="wite-cta-row">
    <button
      className="wite-btn-green"
      onClick={() => navigate("/pricing")}
      type="button"
    >
      Get Trade Echo
    </button>
    <button
      className="wite-btn-outline"
      onClick={() => navigate("/faq")}
      type="button"
    >
      FAQ
    </button>
  </div>
</div>

        </div>
      </div>
    </>
  );
}