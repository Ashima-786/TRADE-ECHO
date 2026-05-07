import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CortexSection from '../components/cortex/Cortexsection';
import CapabilitiesSection from '../components/Capabilitiessection';
import CortexFeatures from '../components/cortex/Cortexfeatures';
import CortexCTA from '../components/cortex/Cortexcta';

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

/* ── Agent Builder Preview (Image 2 recreation) ── */
const agents = [
  { icon: "⊕", name: "GEX Scout",       desc: "Gamma exposure, flip levels, and dealer positioning." },
  { icon: "◎", name: "Flow Spiner",      desc: "Unusual options flow, sweeps, and premium." },
  { icon: "↗", name: "Dark Pool Radar",  desc: "Large off-exchange prints and size." },
  { icon: "⬚", name: "Catalyst Scout",   desc: "Event-driven analysis - signals ahead of earnings, FOMC, &..." },
  { icon: "◈", name: "Risk Scout",       desc: "SEC filings, financial data, and risk assessment from EDGAR." },
  { icon: "↬", name: "My Portfolio",     desc: "Analyze your own trade journal - P&L, win rate, best..." },
  { icon: "☰", name: "Market Recap",     desc: "Daily or weekly market digest - key moves, flow, and GEX..." },
  { icon: "⬡", name: "Sector Flow",      desc: "Broad-market unusual premium and sector-level flo..." },
  { icon: "▦", name: "ATS Tape Trends",  desc: "Delayed FINRA ATS volume trends vs live dark pool prints." },
  { icon: "↑", name: "Liquidity Pulse",  desc: "Spot large algo prints, and flow together on a name." },
  { icon: "⌇", name: "Index Pulse",      desc: "Indices snapshot (SPX, NDX, VIX), plus ETF tape and news." },
  { icon: "⊞", name: "Chain Scout",      desc: "Options chain snapshot with flow and spot." },
  { icon: "≡", name: "Structure Scout",  desc: "Near-dated options structure and spot (0-DTE style reads)." },
  { icon: "≋", name: "Full Scan",        desc: "Unrestricted access to all Cortex tools - ask any..." },
];

function AgentBuilderPreview() {
  const [selected, setSelected] = useState(0);

  return (
    <div
      className="w-full rounded-2xl overflow-hidden"
      style={{
        background: "#0e1010",
        border: "1px solid rgba(255,255,255,0.10)",
        fontFamily: "sans-serif",
      }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.07]">
        <div className="flex items-center gap-3">
          <button className="text-[#d4af37] opacity-70 hover:opacity-100 transition-opacity text-lg">‹</button>
          <span className="text-white font-semibold text-sm">Agent Builder</span>
        </div>
        <span className="text-[#6b7280] text-sm">Listings marketplace</span>
      </div>

      <div className="px-6 py-5">
        {/* Broker linked banner */}
        <div className="flex items-start gap-3 rounded-xl border border-[#d4af37]/30 bg-[#d4af37]/[0.06] px-4 py-3.5 mb-6">
          <div className="flex-shrink-0 w-6 h-6 rounded-full border border-[#d4af37]/50 bg-[#d4af37]/15 flex items-center justify-center mt-0.5">
            <svg viewBox="0 0 12 12" fill="none" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" className="w-3 h-3">
              <polyline points="2 6 5 9 10 3" />
            </svg>
          </div>
          <p className="text-[#d1d5db] text-[0.8rem] leading-relaxed">
            Broker linked and eligible for SnapTrade-backed automation. Future live agent execution will use your connected account after you opt in.
          </p>
        </div>

        {/* Title */}
        <h2 className="text-white font-bold text-xl mb-1">Create a custom agent</h2>
        <p className="text-[#6b7280] text-[0.82rem] mb-5">Build specialized agents by combining a base strategy with your own instructions.</p>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-6">
          {[
            { n: 1, label: "Choose agent", active: true },
            { n: 2, label: "Instructions", active: false },
            { n: 3, label: "Automated Trading", active: false },
            { n: 4, label: "Save", active: false },
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`flex items-center gap-1.5 ${i > 0 ? "opacity-40" : ""}`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[0.65rem] font-bold
                  ${step.active ? "bg-[#d4af37] text-black" : "bg-white/10 text-white/60"}`}>
                  {step.n}
                </div>
                <span className={`text-[0.75rem] font-medium ${step.active ? "text-white" : "text-white/40"}`}>{step.label}</span>
              </div>
              {i < 3 && <div className="w-8 h-px bg-white/10 mx-1" />}
            </div>
          ))}
        </div>

        {/* Agent grid */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {agents.map((agent, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`text-left rounded-xl border p-3.5 transition-all duration-200
                ${selected === i
                  ? "border-[#d4af37]/50 bg-[#d4af37]/[0.07]"
                  : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.04]"
                }`}
            >
              <div className="text-[#9ca3af] text-base mb-1.5">{agent.icon}</div>
              <div className="text-white font-semibold text-[0.78rem] mb-1">{agent.name}</div>
              <div className="text-[#6b7280] text-[0.72rem] leading-snug line-clamp-2">{agent.desc}</div>
            </button>
          ))}
        </div>

        {/* Continue button */}
        <div className="flex justify-end mb-6">
          <button className="px-5 py-2 rounded-lg bg-[#d4af37] text-black text-sm font-bold hover:bg-[#b8912e] transition-colors duration-200">
            Continue
          </button>
        </div>

        {/* My agents */}
        <div>
          <h3 className="text-white font-bold text-base mb-3">My agents</h3>
          <div className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3.5 hover:border-white/[0.15] transition-colors duration-200 cursor-pointer">
            <span className="text-white text-sm font-medium">Cblast AI</span>
            <span className="text-[#6b7280]">›</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Hero Section ── */
export default function CortexHero() {
  const navigate = useNavigate();
  const [heroRef, heroInView] = useInView(0.1);
  const [previewRef, previewInView] = useInView(0.05);

  return (
    <section
      className="relative w-full"
      style={{ background: "#0a0a0a" }}
    >
      {/* Grid bg */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(212,175,55,0.06) 0%, transparent 65%)",
        }}
      />

      {/* ── Hero text ── */}
      <div
        ref={heroRef}
        className="relative z-10 text-center px-6 pt-20 pb-16 max-w-4xl mx-auto"
        style={{
          opacity: heroInView ? 1 : 0,
          transform: heroInView ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.75s ease, transform 0.75s ease",
        }}
      >
        {/* Label */}
        <p
          className="text-[#6b7280] text-[0.65rem] font-semibold tracking-[0.22em] uppercase mb-6"
          style={{ fontFamily: "sans-serif" }}
        >
          01 &nbsp;/&nbsp; Cortex
        </p>

        {/* Headline */}
        <h1
          className="font-extrabold leading-[1.05] tracking-tight mb-6"
          style={{
            fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
            fontFamily: "'Georgia', serif",
          }}
        >
          <span className="text-white block">Ask your terminal.</span>
          <span className="text-[#d4af37] block">Get answered in seconds.</span>
        </h1>

        {/* Subtext */}
        <p
          className="text-[#9ca3af] leading-relaxed max-w-2xl mx-auto mb-10"
          style={{ fontFamily: "sans-serif", fontSize: "clamp(0.88rem, 1.5vw, 1rem)" }}
        >
          Cortex is an AI chat connected to every Trade Echo module. Ask why TSLA just flipped to
          short gamma. Ask which calls just crossed the $1M premium line. Ask what the dark pool is
          doing in NVDA. Cortex sees the data the moment you do.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate("/pricing")}
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-[0.92rem] text-black bg-[#d4af37] hover:bg-[#b8912e] transition-all duration-200 shadow-lg shadow-[#d4af37]/20 hover:shadow-[#d4af37]/35 hover:scale-[1.02] active:scale-[0.98]"
            style={{ fontFamily: "sans-serif" }}
          >
            Start asking your terminal
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
          </button>
          <button
            onClick={() => navigate("/pricing")}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-[0.92rem] text-white border border-white/20 bg-transparent hover:border-white/40 hover:bg-white/[0.06] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            style={{ fontFamily: "sans-serif" }}
          >
            See the full platform
          </button>
        </div>
      </div>

      {/* ── Divider line ── */}
      <div className="relative z-10 w-full px-6 max-w-5xl mx-auto">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
      </div>

      {/* ── Agent Builder Preview ── */}
      <div
        ref={previewRef}
        className="relative z-10 px-6 pt-12 pb-20 max-w-5xl mx-auto"
        style={{
          opacity: previewInView ? 1 : 0,
          transform: previewInView ? "translateY(0)" : "translateY(36px)",
          transition: "opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s",
        }}
      >
        {/* Outer glow around preview */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 60%, rgba(212,175,55,0.05) 0%, transparent 70%)",
          }}
        />
        <AgentBuilderPreview />
        <CortexSection />
        <CapabilitiesSection />
        <CortexFeatures />
        <CortexCTA />
      </div>
    </section>
  );
}