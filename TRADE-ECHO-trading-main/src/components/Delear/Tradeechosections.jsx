import { useState } from "react";

// ─── Google Fonts ───────────────────────────────────────────────────────────
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap";
document.head.appendChild(fontLink);

// ─── Inline global styles ────────────────────────────────────────────────────
const globalStyle = document.createElement("style");
globalStyle.textContent = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0a0a0a; }
  .font-grotesk { font-family: 'Space Grotesk', sans-serif; }
  .font-mono    { font-family: 'IBM Plex Mono', monospace; }
`;
document.head.appendChild(globalStyle);

// ─── Data ────────────────────────────────────────────────────────────────────
const levels = [
  {
    num: "01",
    title: "HVL · HIGH VOLUME LEVEL",
    desc: "The strike with the most dealer exposure on the board. Price gravitates here through the session.",
    tactical: "Scalp toward the HVL, fade away from it.",
  },
  {
    num: "02",
    title: "GAMMA FLIP",
    desc: "The level where dealer net gamma crosses zero. Above, dealers dampen moves; below, they amplify them.",
    tactical: "Regime change. Expect more volatility once price crosses.",
  },
  {
    num: "03",
    title: "CALL WALL",
    desc: "Heavy call gamma above current price. Acts as resistance as dealers hedge.",
    tactical: "Fade rallies into the call wall.",
  },
  {
    num: "04",
    title: "PUT WALL",
    desc: "Heavy put gamma below current price. Acts as support as dealers hedge.",
    tactical: "Fade selloffs into the put wall.",
  },
  {
    num: "05",
    title: "DEFENSE LINE",
    desc: "A strike market makers will defend aggressively, often near a major expiration.",
    tactical: "Expect rapid mean reversion if price approaches.",
  },
  {
    num: "06",
    title: "ANCHOR POINT",
    desc: "A strike where gamma pins price for stretches of the session.",
    tactical: "Range-trade around it until gamma rolls off.",
  },
];

const heatseeker = [
  "Only GEX, nothing else",
  "No options flow scanner",
  "No dark pool monitoring",
  "No AI chat tied to data",
  "No copy trading",
  "No included community",
];

const tradeEcho = [
  "DealerEdge GEX heatmaps",
  "OptionFlow institutional flow",
  "Darkpool off-exchange prints",
  "AlgoEdge pattern detection",
  "Cortex AI chat",
  "Copy Trading",
  "Discord community",
  "iOS and Android apps",
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function TradeEchoSections() {
  return (
    <div
      className="font-grotesk"
      style={{ background: "#0a0a0a", color: "#fff", minHeight: "100vh" }}
    >
      {/* ── Section 02 / The Math ── */}
      <section
        style={{
          background: "#0a0a0a",
          padding: "72px 24px 0",
          textAlign: "center",
        }}
      >
        {/* eyebrow */}
        <p
          className="font-mono"
          style={{
            color: "#555",
            fontSize: "11px",
            letterSpacing: "0.18em",
            marginBottom: "28px",
            textTransform: "uppercase",
          }}
        >
          02 &nbsp;/&nbsp; THE MATH
        </p>

        {/* headline */}
        <h2
          style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: "20px",
            color: "#fff",
          }}
        >
          Why pay{" "}
          <span style={{ color: "#39d353" }}>$699/mo</span> for just GEX?
        </h2>

        {/* sub */}
        <p
          style={{
            color: "#aaa",
            fontSize: "1rem",
            maxWidth: "560px",
            margin: "0 auto 64px",
            lineHeight: 1.7,
          }}
        >
          Heatseeker by Skylit.ai specializes in GEX heatmaps and charges a
          premium for it. Trade Echo Pro includes the same depth plus five more
          products, for one third the price.
        </p>

        {/* Pricing cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "16px",
            maxWidth: "960px",
            margin: "0 auto",
          }}
        >
          {/* Heatseeker card */}
          <div
            style={{
              background: "#111",
              border: "1px solid #222",
              borderRadius: "12px",
              padding: "36px 32px",
              textAlign: "left",
            }}
          >
            <p
              className="font-mono"
              style={{
                color: "#888",
                fontSize: "11px",
                letterSpacing: "0.15em",
                marginBottom: "14px",
              }}
            >
              HEATSEEKER · SKYLIT.AI
            </p>
            <p
              style={{
                fontSize: "clamp(2.4rem, 6vw, 3.2rem)",
                fontWeight: 800,
                color: "#c8b97a",
                marginBottom: "16px",
              }}
            >
              $699/mo
            </p>
            <p style={{ color: "#ccc", fontSize: "0.95rem", marginBottom: "28px", lineHeight: 1.6 }}>
              GEX heatmaps and dealer positioning. That is the entire product.
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              {heatseeker.map((item) => (
                <li
                  key={item}
                  style={{ display: "flex", alignItems: "center", gap: "12px", color: "#666", fontSize: "0.93rem" }}
                >
                  <span style={{ width: "20px", color: "#444", fontWeight: 700, fontSize: "1rem" }}>—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Trade Echo Pro card */}
          <div
            style={{
              background: "#0d1a0f",
              border: "1px solid #1e3a22",
              borderRadius: "12px",
              padding: "36px 32px",
              textAlign: "left",
            }}
          >
            <p
              className="font-mono"
              style={{
                color: "#39d353",
                fontSize: "11px",
                letterSpacing: "0.15em",
                marginBottom: "14px",
              }}
            >
              TRADE ECHO PRO
            </p>
            <p
              style={{
                fontSize: "clamp(2.4rem, 6vw, 3.2rem)",
                fontWeight: 800,
                color: "#39d353",
                marginBottom: "16px",
              }}
            >
              $199/mo
            </p>
            <p style={{ color: "#ccc", fontSize: "0.95rem", marginBottom: "28px", lineHeight: 1.6 }}>
              DealerEdge GEX plus five more products. One subscription, one terminal.
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              {tradeEcho.map((item) => (
                <li
                  key={item}
                  style={{ display: "flex", alignItems: "center", gap: "12px", color: "#ddd", fontSize: "0.93rem" }}
                >
                  <span style={{ color: "#39d353", fontSize: "1rem", fontWeight: 700 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* pill */}
        <div style={{ margin: "36px auto 0", display: "inline-block" }}>
          <span
            className="font-mono"
            style={{
              display: "inline-block",
              border: "1px solid #39d353",
              borderRadius: "999px",
              padding: "10px 24px",
              color: "#39d353",
              fontSize: "11px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            $500/MO CHEAPER · 6 MORE PRODUCTS · ONE SUBSCRIPTION
          </span>
        </div>
      </section>

      {/* ── Section 03 / Reading the Map ── */}
      <section style={{ padding: "96px 24px 80px", textAlign: "center" }}>
        {/* eyebrow */}
        <p
          className="font-mono"
          style={{
            color: "#555",
            fontSize: "11px",
            letterSpacing: "0.18em",
            marginBottom: "28px",
            textTransform: "uppercase",
          }}
        >
          03 &nbsp;/&nbsp; READING THE MAP
        </p>

        {/* headline */}
        <h2
          style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: "16px",
            color: "#fff",
          }}
        >
          Six levels that{" "}
          <span style={{ color: "#39d353" }}>drive the session.</span>
        </h2>

        {/* sub */}
        <p
          style={{
            color: "#aaa",
            fontSize: "1rem",
            maxWidth: "560px",
            margin: "0 auto 56px",
            lineHeight: 1.7,
          }}
        >
          DealerEdge surfaces the levels market makers are most likely to
          defend. Learn them once, read them every day.
        </p>

        {/* Level rows */}
        <div
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {levels.map((lvl) => (
            <LevelRow key={lvl.num} {...lvl} />
          ))}
        </div>
      </section>
    </div>
  );
}

function LevelRow({ num, title, desc, tactical }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#111" : "#0e0e0e",
        border: "1px solid #1c1c1c",
        borderRadius: "10px",
        padding: "28px 32px",
        textAlign: "left",
        display: "grid",
        gridTemplateColumns: "56px 1fr",
        gap: "0 24px",
        transition: "background 0.2s",
      }}
    >
      {/* number */}
      <span
        style={{
          color: "#39d353",
          fontSize: "1.5rem",
          fontWeight: 700,
          fontFamily: "'IBM Plex Mono', monospace",
          lineHeight: 1,
          paddingTop: "2px",
        }}
      >
        {num}
      </span>

      {/* content */}
      <div>
        <p
          className="font-mono"
          style={{
            color: "#fff",
            fontSize: "12px",
            letterSpacing: "0.14em",
            fontWeight: 600,
            marginBottom: "10px",
          }}
        >
          {title}
        </p>
        <p
          style={{
            color: "#bbb",
            fontSize: "0.93rem",
            lineHeight: 1.65,
            marginBottom: "14px",
          }}
        >
          {desc}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span
            className="font-mono"
            style={{
              background: "#0d1a0f",
              border: "1px solid #39d353",
              borderRadius: "4px",
              padding: "3px 8px",
              color: "#39d353",
              fontSize: "10px",
              letterSpacing: "0.12em",
              fontWeight: 600,
              textTransform: "uppercase",
              flexShrink: 0,
            }}
          >
            TACTICAL
          </span>
          <span style={{ color: "#ccc", fontSize: "0.9rem" }}>{tactical}</span>
        </div>
      </div>
    </div>
  );
}