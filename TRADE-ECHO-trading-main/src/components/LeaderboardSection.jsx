import { useEffect, useState } from "react";

const pilots = [
  {
    rank: "01",
    handle: "@vega_runner",
    style: ["Swing", "options"],
    winRate: "73%",
    pnl: "+$84.2k",
    barWidth: "84%",
  },
  {
    rank: "02",
    handle: "@spy_scalper",
    style: ["0DTE", "intraday"],
    winRate: "68%",
    pnl: "+$61.4k",
    barWidth: "61%",
  },
  {
    rank: "03",
    handle: "@gex_reader",
    style: ["Dealer levels"],
    winRate: "71%",
    pnl: "+$52.9k",
    barWidth: "53%",
  },
];

export default function TradingLeaderboard() {
  const [visible, setVisible] = useState(false);
  const [rowsVisible, setRowsVisible] = useState([false, false, false]);
  const [barsGrow, setBarsGrow] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 100);
    const t2 = setTimeout(() => setRowsVisible([true, false, false]), 750);
    const t3 = setTimeout(() => setRowsVisible([true, true, false]), 900);
    const t4 = setTimeout(() => setRowsVisible([true, true, true]), 1050);
    const t5 = setTimeout(() => setBarsGrow(true), 1200);
    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout);
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-5 py-[60px] overflow-hidden relative"
      style={{
        background: "#0a0a0a",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      {/* Scanline overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
        }}
      />

      <div className="max-w-[820px] w-full text-center relative z-10">
        {/* Label */}
        <div
          className="text-[11px] tracking-[0.2em] mb-[18px] transition-all duration-500"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: "#555e55",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(14px)",
          }}
        >
          02 / LEADERBOARD
        </div>

        {/* Headline */}
        <h1
          className="font-bold leading-[1.1] mb-[18px] transition-all duration-[600ms] delay-150"
          style={{
            fontSize: "clamp(32px, 5vw, 54px)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(14px)",
          }}
        >
          <span style={{ color: "#f0f0f0" }}>Every pilot,&nbsp;</span>
          <span className="relative" style={{ color: "#d4af37" }}>
            verified.
            {/* Underline grow */}
            <span
              className="absolute bottom-[2px] left-0 h-[3px] rounded-sm transition-all duration-700"
              style={{
                background: "#d4af37",
                width: visible ? "100%" : "0%",
                transitionDelay: "1s",
              }}
            />
          </span>
        </h1>

        {/* Subtext */}
        <p
          className="text-sm leading-relaxed max-w-[480px] mx-auto mb-10 transition-all duration-[600ms] delay-300"
          style={{
            color: "#555e55",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(14px)",
          }}
        >
          Public performance. No screenshot P&L, no Discord claims. Win rates
          and dollar figures are calculated from live trades that hit broker
          APIs.
        </p>

        {/* Table Card */}
        <div
          className="rounded-xl overflow-hidden transition-all duration-700 delay-[450ms]"
          style={{
            background: "#111211",
            border: "1px solid #1e221e",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(14px)",
          }}
        >
          {/* Table Header */}
          <div
            className="grid items-center px-6 py-3"
            style={{
              gridTemplateColumns: "60px 1fr 160px 110px 130px",
              borderBottom: "1px solid #1e221e",
            }}
          >
            {["Rank", "Pilot", "Style", "Win Rate", "90-Day P&L"].map(
              (col, i) => (
                <span
                  key={col}
                  className="text-[10px] uppercase tracking-[0.15em]"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: "#555e55",
                    textAlign: i === 4 ? "right" : "left",
                  }}
                >
                  {col}
                </span>
              )
            )}
          </div>

          {/* Rows */}
          {pilots.map((pilot, i) => (
            <div
              key={pilot.rank}
              className="group grid items-center px-6 py-5 relative cursor-default transition-all duration-500"
              style={{
                gridTemplateColumns: "60px 1fr 160px 110px 130px",
                borderBottom: i < pilots.length - 1 ? "1px solid #1e221e" : "none",
                opacity: rowsVisible[i] ? 1 : 0,
                transform: rowsVisible[i] ? "translateX(0)" : "translateX(-12px)",
                transitionDuration: "500ms",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(212,175,55,0.04)";
                e.currentTarget.querySelector(".accent-bar").style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.querySelector(".accent-bar").style.opacity = "0";
              }}
            >
              {/* Left accent bar */}
              <span
                className="accent-bar absolute left-0 top-0 bottom-0 w-[3px] rounded-sm transition-opacity duration-200"
                style={{ background: "#d4af37", opacity: 0 }}
              />

              {/* Rank */}
              <span
                className="text-[15px] font-semibold"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "#d4af37",
                  animation: "rankPulse 3s ease-in-out infinite",
                }}
              >
                {pilot.rank}
              </span>

              {/* Pilot handle */}
              <span
                className="text-sm font-semibold flex items-center gap-1.5"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "#f0f0f0",
                }}
              >
                {pilot.handle}
                <span
                  className="inline-flex items-center justify-center w-4 h-4 rounded-full text-[9px]"
                  style={{
                    background: "rgba(212,175,55,0.15)",
                    color: "#d4af37",
                  }}
                >
                  ✓
                </span>
              </span>

              {/* Style */}
              <span className="text-[13px]" style={{ color: "#888" }}>
                {pilot.style.length === 2 ? (
                  <>
                    {pilot.style[0]}
                    <span className="mx-[3px]" style={{ color: "#555e55" }}>
                      ·
                    </span>
                    {pilot.style[1]}
                  </>
                ) : (
                  pilot.style[0]
                )}
              </span>

              {/* Win Rate */}
              <span
                className="font-bold text-[15px]"
                style={{ color: "#f0f0f0" }}
              >
                {pilot.winRate}
              </span>

              {/* P&L */}
              <div className="text-right relative pb-1">
                <span
                  className="font-semibold text-[15px] block"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: "#d4af37",
                  }}
                >
                  {pilot.pnl}
                </span>
                {/* Bar */}
                <span
                  className="absolute bottom-[-6px] right-0 h-[2px] rounded-sm transition-all duration-[800ms]"
                  style={{
                    background: "#d4af37",
                    opacity: 0.3,
                    width: barsGrow ? pilot.barWidth : "0",
                    transitionDelay: "1.2s",
                  }}
                />
              </div>
            </div>
          ))}

          {/* Footer */}
          <div
            className="px-6 py-[14px] text-[11px] tracking-[0.02em] text-left"
            style={{
              borderTop: "1px solid #1e221e",
              color: "#555e55",
            }}
          >
            Live leaderboard updates every trading day. Lifetime members see
            the full top 100.
          </div>
        </div>
      </div>

      {/* Rank pulse keyframe */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap');
        @keyframes rankPulse {
          0%, 100% { text-shadow: 0 0 6px rgba(212,175,55,0.4); }
          50%       { text-shadow: 0 0 16px rgba(212,175,55,0.9); }
        }
      `}</style>
    </div>
  );
}