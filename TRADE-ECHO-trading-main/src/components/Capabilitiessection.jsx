import { useEffect, useRef, useState } from "react";

const capabilities = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Broker-linked execution",
    desc: "Connect your supported brokerage. Copies execute automatically when your pilot enters or exits. Every trade posts to your journal.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Verified public leaderboard",
    desc: "Pilots publish their track records, win rates, and P&L. No black-box performance claims. You pick partners with transparent data.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Multi-pilot on Lifetime",
    desc: "Monthly and Yearly plans follow one pilot at a time. Lifetime unlocks simultaneous follows across multiple pilots for portfolio diversification.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Risk controls included",
    desc: "Set per-trade size limits, daily max loss, and which instruments to copy. Cancel copying at any time from the terminal or mobile app.",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

function CapabilityCard({ icon, title, desc, delay }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0px)" : "translateY(28px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
      className="group relative rounded-2xl border border-white/[0.07] bg-white/[0.03] p-7 cursor-default overflow-hidden hover:border-[#d4af37]/30 hover:bg-white/[0.055]"
      style2={{}}
    >
      {/* Subtle sandal glow on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "radial-gradient(ellipse at 20% 20%, rgba(212,175,55,0.07) 0%, transparent 70%)" }}
      />

      {/* Icon badge */}
      <div className="mb-5 inline-flex items-center justify-center w-10 h-10 rounded-xl border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#d4af37] group-hover:bg-[#d4af37]/20 group-hover:border-[#d4af37]/50 transition-all duration-300">
        {icon}
      </div>

      <h3 className="text-white font-bold text-[1.05rem] mb-2 tracking-tight leading-snug">
        {title}
      </h3>
      <p className="text-[#9ca3af] text-[0.88rem] leading-relaxed font-normal">
        {desc}
      </p>
    </div>
  );
}

export default function CapabilitiesSection() {
  const [headerRef, headerInView] = useInView(0.2);

  return (
    <section
      className="relative min-h-screen w-full flex items-center justify-center py-24 px-6"
      style={{ background: "#0a0a0a" }}
    >
      {/* Faint background grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Soft radial glow center */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(212,175,55,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        {/* Label + Heading */}
        <div
          ref={headerRef}
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
          className="text-center mb-14"
        >
          <p className="text-[#6b7280] text-xs font-semibold tracking-[0.22em] uppercase mb-4">
            03 &nbsp;/&nbsp; Capabilities
          </p>
          <h2
            className="text-white font-extrabold leading-none tracking-tight"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.2rem)", fontFamily: "'Georgia', serif" }}
          >
            What it does.
          </h2>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {capabilities.map((cap, i) => (
            <CapabilityCard key={i} {...cap} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}