import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import TradingLeaderboard from "../components/LeaderboardSection";
import CapabilitiesSection from '../components/Capabilitiessection';
import WhoItsFor from '../components/Whoitsfor'
import QuickAnswers from '../components/Quickanswers';
import GetStartedCTA from '../components/Getstartedcta'

const trades = [
  { time: "04/02/2026, 03:40 PM", trader: "Cblast", action: "SELL", type: "STC", ticker: "SPY 655C 04/06", qty: 2, price: "$4.64", pnl: "+$30.00", status: "Filled" },
  { time: "04/02/2026, 03:36 PM", trader: "Cblast", action: "BUY", type: "BTO", ticker: "SPY 655C 04/06", qty: 2, price: "$4.49", pnl: "–", status: "Filled" },
  { time: "04/02/2026, 10:07 AM", trader: "Cblast", action: "SELL", type: "STC", ticker: "ASTS 89C 04/02", qty: 17, price: "$0.90", pnl: "+$612.00", status: "Filled" },
  { time: "04/02/2026, 10:05 AM", trader: "Cblast", action: "BUY", type: "BTO", ticker: "ASTS 89C 04/02", qty: 17, price: "$0.54", pnl: "–", status: "Filled" },
  { time: "04/02/2026, 09:55 AM", trader: "Cblast", action: "SELL", type: "STC", ticker: "SPY 647C 04/02", qty: 3, price: "$3.29", pnl: "+$216.00", status: "Filled" },
];

const tabs = ["Overview", "Broker Accounts", "Traders", "Leaderboard", "Performance", "Positions", "Settings"];

function useFadeIn(delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = `opacity 0.55s ${delay}ms ease, transform 0.55s ${delay}ms ease`;
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      })
    );
    return () => cancelAnimationFrame(raf);
  }, [delay]);
  return ref;
}

export default function CopyTradingSection() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");
  const [visibleRows, setVisibleRows] = useState([]);
  const [mirrorHov, setMirrorHov] = useState(false);

  const eyebrowRef = useFadeIn(80);
  const headlineRef = useFadeIn(220);
  const descRef = useFadeIn(380);
  const ctaRef = useFadeIn(520);
  const dashRef = useRef(null);

  useEffect(() => {
    const el = dashRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(36px) scale(0.975)";
    el.style.transition =
      "opacity 0.75s 820ms cubic-bezier(0.22,1,0.36,1), transform 0.75s 820ms cubic-bezier(0.22,1,0.36,1)";
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0) scale(1)";
      })
    );
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    trades.forEach((_, i) => {
      setTimeout(() => setVisibleRows((prev) => [...prev, i]), 1100 + i * 120);
    });
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0a0a0a] font-sans text-white">
      <section className="relative overflow-hidden px-6 py-18 text-center">
        <div className="pointer-events-none absolute left-1/2 top-[-140px] h-[820px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.065)_0%,transparent_65%)]" />

        {/* ── Eyebrow ── */}
        <p
          ref={eyebrowRef}
          className="mb-7 flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40"
        >
          <span>01</span>
          <span className="text-white/20">/</span>
          <span>AUTOMATE STRATEGY EXECUTION</span>
        </p>

        {/* ── Headline ── */}
        <h1
          ref={headlineRef}
          className="mx-auto mb-0 max-w-5xl font-['Barlow_Condensed'] text-[clamp(46px,7.5vw,92px)] font-extrabold uppercase leading-none tracking-[-0.01em]"
        >
          <span className="block text-white drop-shadow-[0_2px_40px_rgba(0,0,0,0.5)]">
            Follow the traders with
            <br />
            published track records.
          </span>
          <span className="block text-[#d4af37] drop-shadow-[0_0_60px_rgba(212,175,55,0.45)]">
            Direct in your brokerage.
          </span>
        </h1>

        {/* ── Description ── */}
        <p
          ref={descRef}
          className="mx-auto mt-7 max-w-[555px] text-[15px] leading-[1.78] text-white/48"
        >
          Automate Strategy Execution mirrors a vetted pilot's trades into your own linked brokerage.
          Every position posts to your trade journal automatically. The leaderboard is
          public and verified. Monthly and Yearly members follow one pilot at a time.
          Lifetime unlocks multi-pilot follows.
        </p>

        {/* ── CTAs ── */}
        <div ref={ctaRef} className="mt-10 flex flex-wrap justify-center gap-3">
          <button
            onMouseEnter={() => setMirrorHov(true)}
            onMouseLeave={() => setMirrorHov(false)}
            onClick={() => navigate("/pricing")}
            className="flex items-center gap-2 rounded-lg bg-[#d4af37] px-6 py-[13px] text-sm font-bold text-black transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#e5c158] hover:shadow-[0_10px_32px_rgba(212,175,55,0.4)]"
            style={{
              boxShadow: mirrorHov ? "0 10px 32px rgba(212,175,55,0.42)" : "none",
            }}
          >
            Start automating your strategy
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform duration-150 ${mirrorHov ? "translate-x-1" : ""}`}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          <button
            onClick={() => navigate("/")}
            className="rounded-lg border border-white/18 bg-transparent px-6 py-[13px] text-sm font-semibold text-white/88 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/40 hover:text-white"
          >
            See the full platform
          </button>
        </div>

        {/* ── Dashboard mockup ── */}
        <div ref={dashRef} className="relative mx-auto mt-16 max-w-[900px] px-4">
          <div className="pointer-events-none absolute inset-[-1px] rounded-[15px] bg-[linear-gradient(135deg,rgba(212,175,55,0.3)_0%,transparent_50%,rgba(212,175,55,0.06)_100%)]" />
          <div className="pointer-events-none absolute bottom-[-55px] left-1/2 h-[120px] w-[560px] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(212,175,55,0.18)_0%,transparent_70%)]" />

          <div className="relative z-10 overflow-hidden rounded-[13px] border border-[#d4af3724] bg-[#101213] shadow-[0_48px_120px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.04)_inset]">

            {/* Top bar */}
            <div className="flex items-center justify-between border-b border-white/7 bg-[#0c0d0e] px-5 py-3">
              <div className="flex items-center gap-2.5">
                <span className="text-sm font-bold tracking-[-0.01em]">Automate Strategy Execution</span>
                <span className="rounded border border-[#d4af3738] bg-[#d4af371f] px-2.5 py-[3px] text-[9px] font-extrabold uppercase tracking-[0.08em] text-[#d4af37]">
                  Subscriber
                </span>
              </div>
              <button className="rounded-md border border-white/13 px-3.5 py-1.5 text-xs font-semibold text-white/75 transition hover:border-white/32 hover:bg-white/5 hover:text-white">
                Switch Role
              </button>
            </div>

            {/* Tabs */}
            <div className="flex overflow-x-auto border-b border-white/7 bg-[#0c0d0e] px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap border-b-2 px-3.5 py-[11px] text-xs font-semibold transition ${
                    activeTab === tab
                      ? "border-[#d4af37] text-[#d4af37]"
                      : "border-transparent text-white/42 hover:text-white/72"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Performance score */}
            <div className="mx-4 mt-3.5 flex items-center gap-3 rounded-[9px] border border-white/7 bg-[#141618] px-4 py-3">
              <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-lg bg-[#d4af37] font-['Barlow_Condensed'] text-[20px] font-black tracking-[-0.02em] text-black">
                A–
              </div>
              <div>
                <div className="mb-1.5 text-xs font-bold">Execution Performance Score</div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="rounded border border-[#d4af3738] bg-[#d4af371c] px-2 py-[2px] text-[10px] font-bold tracking-[0.04em] text-[#d4af37]">
                    Win Rate: 100%
                  </span>
                  <span className="rounded border border-[#fbbf2438] bg-[#fbbf2417] px-2 py-[2px] text-[10px] font-bold tracking-[0.04em] text-[#fbbf24]">
                    Slippage: Moderate
                  </span>
                  <span className="rounded border border-[#d4af3738] bg-[#d4af371c] px-2 py-[2px] text-[10px] font-bold tracking-[0.04em] text-[#d4af37]">
                    Execution: Good
                  </span>
                </div>
              </div>
            </div>

            {/* Stats strip */}
            <div className="flex flex-wrap items-center gap-1.5 px-4 pt-2 text-[11.5px] text-white/45">
              <span>🔥</span>
              <span>1 Traders Followed</span>
              <span className="mx-0.5 text-white/14">•</span>
              <span>📋 0 Closed Trades Today</span>
              <span className="mx-0.5 text-white/14">•</span>
              <span>🔥</span>
              <span className="font-bold text-[#d4af37]">+$1,182.00</span>
              <span>Total Earned</span>
            </div>

            {/* P/L */}
            <div className="px-4 pt-3 pb-3.5">
              <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white/38">
                Total P/L
              </div>
              <div className="font-['Barlow_Condensed'] text-[46px] font-extrabold leading-none tracking-[-0.02em] text-[#d4af37]">
                +$1,182.00
              </div>
              <div className="mt-1 text-xs text-[#d4af37]/80">▲ +34.4% this month</div>
            </div>

            {/* Stat cards */}
            <div className="mx-4 mb-3.5 grid grid-cols-3 gap-px overflow-hidden rounded-[9px] border border-white/7 bg-white/6">
              {[
                ["Active Positions", "0", "0 calls, 0 puts"],
                ["Strategies Following", "1", "Active trader"],
                ["Closed Trades Today", "0", "0 filled"],
              ].map(([label, value, sub]) => (
                <div key={label} className="bg-[#141618] p-[13px_15px]">
                  <div className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.11em] text-white/36">
                    {label}
                  </div>
                  <div className="font-['Barlow_Condensed'] text-[30px] font-extrabold leading-none text-white">
                    {value}
                  </div>
                  <div className="mt-0.5 text-[10px] text-white/32">{sub}</div>
                </div>
              ))}
            </div>

            {/* Recent activity table */}
            <div className="mx-4 mb-4">
              <div className="mb-2.5 flex items-center justify-between">
                <div>
                  <div className="text-[13px] font-bold">Recent Activity</div>
                  <div className="mt-1 flex items-center gap-1.5 text-[10px] text-white/38">
                    <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#d4af37] shadow-[0_0_5px_rgba(212,175,55,0.7)]" />
                    Last 10 executions · Live feed
                  </div>
                </div>
                <button className="rounded-[5px] border border-[#d4af3738] bg-[#d4af3717] px-3 py-1 text-[10px] font-bold tracking-[0.04em] text-[#d4af37] transition hover:bg-[#d4af372e]">
                  View all
                </button>
              </div>

              <div className="overflow-hidden rounded-b-[12px]">
                <table className="w-full border-collapse text-[11px]">
                  <thead>
                    <tr className="border-b border-white/7">
                      {["Time", "Trader", "Action", "Type", "Ticker", "Qty", "Price", "P&L", "Status"].map(
                        (h) => (
                          <th
                            key={h}
                            className="px-2 py-1.5 text-left text-[9px] font-bold uppercase tracking-[0.09em] text-white/32"
                          >
                            {h}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {trades.map((row, i) => (
                      <tr
                        key={i}
                        className={`border-b border-white/[0.03] transition duration-300 ${
                          visibleRows.includes(i)
                            ? "translate-x-0 opacity-100"
                            : "-translate-x-2.5 opacity-0"
                        } hover:bg-white/[0.023]`}
                      >
                        <td className="px-2 py-2.5 text-[10px] text-white/30">{row.time}</td>
                        <td className="px-2 py-2.5 text-white/48">
                          <div className="flex items-center gap-1.5">
                            <div className="h-1.5 w-1.5 rounded-full bg-[#d4af37] shadow-[0_0_6px_rgba(212,175,55,0.55)]" />
                            <span className="font-semibold text-white">{row.trader}</span>
                          </div>
                        </td>
                        <td className="px-2 py-2.5">
                          <span
                            className={`rounded-[3px] border px-2 py-[2px] text-[9px] font-extrabold uppercase tracking-[0.06em] ${
                              row.action === "SELL"
                                ? "border-[#9ca3af] bg-[#050505] text-[#9ca3af]"
                                : "border-[#d4af3738] bg-[#d4af371a] text-[#d4af37]"
                            }`}
                          >
                            {row.action}
                          </span>
                        </td>
                        <td className="px-2 py-2.5">
                          <span className="rounded-[3px] bg-white/6 px-1.5 py-[2px] text-[9px] font-bold text-white/52">
                            {row.type}
                          </span>
                        </td>
                        <td className="px-2 py-2.5 font-semibold text-white">{row.ticker}</td>
                        <td className="px-2 py-2.5 text-white/48">{row.qty}</td>
                        <td className="px-2 py-2.5 text-white/48">{row.price}</td>
                        <td className={`px-2 py-2.5 font-bold ${row.pnl !== "–" ? "text-[#d4af37]" : "text-white/48"}`}>
                          {row.pnl}
                        </td>
                        <td className="px-2 py-2.5">
                          <span className="rounded-[3px] border border-[#d4af3733] bg-[#d4af3717] px-2.5 py-[2px] text-[9px] font-bold text-[#d4af37]">
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="pointer-events-none h-11 -mt-11 rounded-b-[12px] bg-gradient-to-b from-transparent to-[#101213]" />
              </div>
            </div>

          </div>
        </div>
      </section>

      <TradingLeaderboard />
      <CapabilitiesSection />
      <WhoItsFor />
      <QuickAnswers />
      <GetStartedCTA />
    </div>
  );
}