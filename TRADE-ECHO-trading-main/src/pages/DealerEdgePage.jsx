import { useState, useEffect } from "react";
import TradeEchoSections from "../components/Delear/Tradeechosections";
import TradeEchoSections2 from "../components/Delear/Tradeechosectionss";
// ─── Data ───────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { icon: "◈", label: "Social Feed" },
  { icon: "▦", label: "Darkpool" },
  { icon: "⬡", label: "Treemap" },
  { icon: "γ", label: "Gamma" },
  { icon: "◷", label: "Snapshot" },
  { icon: "⟳", label: "Historical" },
  { icon: "◈", label: "News Edge" },
  { icon: "↗", label: "Chart" },
  { icon: "◎", label: "Profile" },
  { icon: "◈", label: "Subscriptions" },
  { icon: "◈", label: "Discord" },
  { icon: "◈", label: "Discord Alerts" },
  { icon: "⚡", label: "Algo Edge" },
  { icon: "●", label: "Dealer Edge", active: true },
  { icon: "◈", label: "Notification Preference" },
  { icon: "◈", label: "Portfolios" },
];

const STRIKES = [
  7040, 7020, 7000, 6985, 6970, 6950, 6935, 6920, 6910, 6900, 6895, 6885,
  6875, 6865, 6850, 6840, 6830, 6820, 6815, 6800, 6785, 6770, 6750, 6740,
  6725, 6700, 6680, 6650, 6630, 6610, 6598, 6575,
];

const DATES = ["02/04", "02/05", "02/06", "02/07", "03/10", "03/11", "03/13"];

function generateRow(strike) {
  const seed = strike % 97;
  return DATES.map((_, i) => {
    const v = Math.round(((seed * (i + 3) * 17) % 1800) - 900);
    return v;
  });
}

const TABLE_DATA = STRIKES.map((s) => ({ strike: s, vals: generateRow(s) }));

// ─── Sub-components ──────────────────────────────────────────────────────────

function Navbar() {
  return (
    <p> </p>
  );
}

function HeroSection() {
  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-20 relative"
      style={{
        background:
          "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(212,175,55,0.06) 0%, transparent 70%), #0a0a0a",
      }}
    >
      {/* Label */}
      <div className="flex items-center gap-3 mb-8">
        <span className="h-px w-10 bg-neutral-800 block" />
        <span className="text-[10px] tracking-[4px] uppercase text-neutral-500">
          <span className="text-[#d4af37]">01</span> / DEALEREDGE
        </span>
        <span className="h-px w-10 bg-neutral-800 block" />
      </div>

      {/* Headline */}
      <h1
        className="font-black uppercase leading-none text-white"
        style={{ fontSize: "clamp(48px, 8vw, 96px)", letterSpacing: "-1px" }}
      >
        Know where the
        <br />
        dealers are pinned.
        <br />
        <span className="text-[#d4af37]">At 1/3 the price</span>
        <br />
        <span className="text-[#d4af37]">of Heatseeker.</span>
      </h1>

      {/* Sub */}
      <p className="mt-8 max-w-xl text-neutral-400 text-sm leading-relaxed">
        DealerEdge shows exactly where market makers are positioned.{" "}
        <span className="text-white font-semibold">
          HVL, gamma flip, call walls, put walls, defense lines, anchor points.
        </span>{" "}
        Everything you need to read whether the session dampens or expands.
      </p>

      {/* CTAs */}
      <div className="flex gap-3 mt-10 flex-wrap justify-center">
        <button className="bg-[#d4af37] hover:bg-[#d4af37] text-black font-bold px-7 py-3.5 rounded-md text-sm transition-all hover:-translate-y-0.5 flex items-center gap-2">
          Start reading the map →
        </button>
        <button className="bg-transparent border border-neutral-700 hover:border-neutral-500 hover:bg-neutral-900 text-white font-semibold px-7 py-3.5 rounded-md text-sm transition-all">
          See the full platform
        </button>
      </div>
    </section>
  );
}

function DashboardSection() {
  const [livePrice] = useState("$6,865.98");

  return (
    <section className="flex flex-col items-center px-6 pb-20">
      {/* Section label */}
     

      {/* Dashboard mock */}
      <div
        className="w-full max-w-5xl rounded-xl border border-neutral-800 overflow-hidden"
        style={{
          background: "#0f0f0f",
          boxShadow:
            "0 0 80px rgba(212,175,55,0.07), 0 40px 80px rgba(0,0,0,0.6)",
        }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3 bg-neutral-900 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <span className="text-neutral-600 text-xl cursor-pointer">‹</span>
            <span className="font-bold text-base">Dealer Edge</span>
          </div>
          <div className="flex items-center gap-3">
            {/* Toggle */}
            <div className="w-9 h-5 bg-[#d4af37] rounded-full relative cursor-pointer">
              <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
            </div>
            <span className="bg-[#d4af37] text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
              167
            </span>
            <span className="text-neutral-400 text-sm">Cblast ▾</span>
          </div>
        </div>

        {/* Main layout */}
        <div className="flex" style={{ minHeight: 460 }}>
          {/* Sidebar */}
          <Sidebar />

          {/* Content */}
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* SPX bar */}
            <div className="flex items-center gap-3 px-4 py-2 border-b border-neutral-800 bg-neutral-900/50">
              <span className="bg-[#d4af37] text-[#d4af37] text-[10px] font-bold px-2 py-0.5 rounded">
                SPX
              </span>
              <span className="font-bold text-sm">$6865.98</span>
              <LiveDot />
              <div className="ml-auto flex gap-1">
                {["All", "Next", "Monthly", "GEX", "Vol", "VEX"].map((t) => (
                  <span
                    key={t}
                    className={`text-[10px] px-2 py-0.5 rounded cursor-pointer ${
                      t === "All" || t === "GEX"
                        ? "bg-[#d4af37] text-black font-bold"
                        : "text-neutral-600 hover:text-neutral-400"
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Body */}
            <div className="flex flex-1 overflow-hidden">
              {/* Grid table */}
              <GexTable />
              {/* Right panel */}
              <RightPanel />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LiveDot() {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setOn((v) => !v), 800);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="flex items-center gap-1 text-[#d4af37] text-[10px]">
      <span
        className={`w-1.5 h-1.5 rounded-full bg-[#d4af37] transition-opacity ${on ? "opacity-100" : "opacity-30"}`}
      />
      LIVE
    </span>
  );
}

function Sidebar() {
  return (
    <div
      className="flex-shrink-0 border-r border-neutral-800 py-4 overflow-y-auto"
      style={{ width: 160, background: "#0d0d0d" }}
    >
      {/* Logo */}
      <div className="px-4 pb-3 border-b border-neutral-800 mb-2">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-[#d4af37] flex items-center justify-center text-black font-black text-[9px]">
            T
          </div>
          <span className="text-[9px] font-black tracking-[2px] uppercase">
            TRADE <span className="text-[#d4af37]">ECHO</span>
          </span>
        </div>
      </div>

      {NAV_ITEMS.map((item) => (
        <div
          key={item.label}
          className={`flex items-center gap-2 px-4 py-2 text-[11px] cursor-pointer transition-colors ${
            item.active
              ? "text-white bg-[#d4af37]"
              : "text-neutral-600 hover:text-neutral-400 hover:bg-neutral-800/40"
          }`}
        >
          {item.active ? (
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] flex-shrink-0" />
          ) : (
            <span className="text-[10px] opacity-50">{item.icon}</span>
          )}
          <span className={item.active ? "font-semibold" : ""}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

function GexTable() {
  return (
    <div className="flex-1 overflow-auto">
      <table className="w-full border-collapse" style={{ fontSize: 9 }}>
        <thead>
          <tr>
            <th className="sticky top-0 bg-neutral-900 text-neutral-600 text-center px-3 py-2 border-b border-neutral-800 text-[8px] font-semibold tracking-wide">
              Strike
            </th>
            {DATES.map((d) => (
              <th
                key={d}
                className="sticky top-0 bg-neutral-900 text-neutral-600 text-center px-2 py-2 border-b border-neutral-800 text-[8px] font-semibold tracking-wide whitespace-nowrap"
              >
                {d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_DATA.map(({ strike, vals }) => {
            const isHighlighted = strike === 6865;
            return (
              <tr
                key={strike}
                className={`group transition-colors ${
                  isHighlighted
                    ? "bg-[#050505]"
                    : "hover:bg-neutral-800/30"
                }`}
              >
                <td
                  className={`px-3 py-1.5 text-center font-semibold border-b border-neutral-900 ${
                    isHighlighted ? "text-[#9ca3af]" : "text-neutral-400"
                  }`}
                >
                  {strike}
                </td>
                {vals.map((v, i) => (
                  <td
                    key={i}
                    className={`px-2 py-1.5 text-center border-b border-neutral-900 font-mono ${
                      v > 0
                        ? "text-[#d4af37]"
                        : v < 0
                        ? "text-[#9ca3af]"
                        : "text-neutral-600"
                    }`}
                  >
                    {v === 0 ? "0" : `${v > 0 ? "+" : ""}${v}M`}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function RightPanel() {
  return (
    <div
      className="flex-shrink-0 overflow-y-auto border-l border-neutral-800 p-3 relative"
      style={{ width: 190, background: "#0d0d0d", fontSize: 11 }}
    >
      {/* Key Levels */}
      <div className="mb-4">
        <p className="text-[9px] tracking-[2px] uppercase text-neutral-600 mb-2">
          Key Levels
        </p>
        <div className="flex justify-between items-center mb-1">
          <span className="text-neutral-500 text-[10px]">ANCHOR</span>
          <span className="text-[#d4af37] text-xl font-black">$6900</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-neutral-500 text-[10px]">FLIP</span>
          <span className="text-[#d4af37] text-xl font-black">$6796</span>
        </div>
      </div>

      <div className="h-px bg-neutral-800 my-3" />

      {/* Stats */}
      <div className="mb-4 space-y-1.5">
        {[
          { k: "Price", v: "$6865.98", c: "text-white" },
          { k: "GEX Rating", v: "5/5", c: "text-white" },
          { k: "Bias", v: "Long Gamma", c: "text-[#d4af37]" },
        ].map(({ k, v, c }) => (
          <div key={k} className="flex justify-between items-center">
            <span className="text-neutral-500 text-[10px]">{k}</span>
            <span className={`text-[11px] font-bold ${c}`}>{v}</span>
          </div>
        ))}
      </div>

      <div className="h-px bg-neutral-800 my-3" />

      {/* Defense Lines */}
      <div className="mb-4">
        <p className="text-[9px] tracking-[2px] uppercase text-neutral-600 mb-2">
          Defense Lines
        </p>
        {[
          { k: "Level 1", v: "$6850" },
          { k: "Level 2", v: "$6900" },
          { k: "Level 3", v: "$6925" },
        ].map(({ k, v }) => (
          <div key={k} className="flex justify-between items-center mb-1">
            <span className="text-neutral-500 text-[10px]">{k}</span>
            <span className="text-white text-[11px] font-semibold">{v}</span>
          </div>
        ))}
      </div>

      <div className="h-px bg-neutral-800 my-3" />

      {/* Cell Detail */}
      <div className="mb-4">
        <p className="text-[9px] tracking-[2px] uppercase text-neutral-600 mb-2">
          Cell Detail
        </p>
        {[
          { k: "Strike", v: "$6815", c: "text-white" },
          { k: "Expiration", v: "03/09", c: "text-white" },
          { k: "Net GEX", v: "-28", c: "text-[#9ca3af]" },
          { k: "Display", v: "-26", c: "text-[#9ca3af]" },
        ].map(({ k, v, c }) => (
          <div key={k} className="flex justify-between items-center mb-1">
            <span className="text-neutral-500 text-[10px]">{k}</span>
            <span className={`text-[11px] font-semibold ${c}`}>{v}</span>
          </div>
        ))}
      </div>

      <div className="h-px bg-neutral-800 my-3" />

      {/* AI Analysis */}
      <div className="mb-4">
        <p className="text-[9px] tracking-[2px] uppercase text-neutral-600 mb-1">
          AI Analysis — SPX
        </p>
        <p className="text-neutral-500 text-[10px] mb-2">Outlook</p>
        <div className="bg-neutral-800/60 rounded-md p-2 text-[10px] leading-relaxed text-neutral-500">
          <span className="text-[#d4af37] font-semibold">Bullish</span> — max
          gamma at $6900 indicates strong support, and positive gamma above
          current price suggests upward momentum potential.
        </div>
      </div>

      {/* Levels */}
      <div className="mb-4">
        <p className="text-[9px] tracking-[2px] uppercase text-neutral-600 mb-2 flex items-center gap-1">
          Levels
          <span className="bg-[#d4af37] text-black text-[8px] font-bold px-1.5 py-0.5 rounded">
            SPX $6900
          </span>
        </p>
        <div className="bg-neutral-800/60 rounded-md p-2 text-[10px] text-neutral-500 leading-loose">
          Sup: $6900 / $6850
          <br />
          Res: $6800 / $6875
        </div>
      </div>

      {/* Float btn */}
      <div className="flex justify-end">
    
      </div>
    </div>
  );
}

// ─── Root App ────────────────────────────────────────────────────────────────
export default function DealerEdgePage() {
  return (
    <div
      className="min-h-screen bg-black text-white overflow-x-hidden"
      style={{ fontFamily: "'Barlow', sans-serif" }}
    >
      {/* Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;700;900&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #222; border-radius: 2px; }
      `}</style>

      <Navbar />
      <HeroSection />
      <DashboardSection />
      <TradeEchoSections />
      <TradeEchoSections2 />
    </div>
  );
}