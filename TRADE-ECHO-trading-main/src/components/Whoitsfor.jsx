import { useEffect, useRef, useState } from "react";

const cards = [
  {
    tag: "NEW TRADERS",
    title: "Learn from real trades.",
    desc: "Follow a vetted swing trader for 90 days. Learn the decision points from real trades landing in your own P&L.",
  },
  {
    tag: "BUSY PROFESSIONALS",
    title: "Auto-execute while you work.",
    desc: "Let a full-time pilot execute while you work. Review the journal at end of day.",
  },
  {
    tag: "DIVERSIFIERS",
    title: "Spread across styles.",
    desc: "On Lifetime, follow an options scalper, a swing trader, and a trend-follower simultaneously. Smooth the equity curve across styles.",
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

function Card({ tag, title, desc, delay }) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0px)" : "translateY(32px)",
        transition: "opacity 0.65s ease, transform 0.65s ease",
      }}
      className="group relative flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 hover:border-[#d4af37]/25 hover:bg-white/[0.05] transition-all duration-400 overflow-hidden"
    >
      {/* Hover glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "radial-gradient(ellipse at 15% 15%, rgba(212,175,55,0.06) 0%, transparent 65%)" }}
      />

      {/* Tag badge */}
      <div className="mb-5 self-start">
        <span
          className="text-[#d4af37] text-[0.6rem] font-bold tracking-[0.18em] uppercase border border-[#d4af37]/40 rounded px-2 py-1 bg-[#d4af37]/5"
        >
          {tag}
        </span>
      </div>

      <h3 className="text-white font-extrabold text-[1.1rem] mb-3 tracking-tight leading-snug">
        {title}
      </h3>
      <p className="text-[#9ca3af] text-[0.875rem] leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

export default function WhoItsFor() {
  const [headerRef, headerInView] = useInView(0.2);

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center py-24 px-6"
      style={{ background: "#0a0a0a" }}
    >
      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Center radial */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 45%, rgba(212,175,55,0.035) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? "translateY(0)" : "translateY(22px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
          className="text-center mb-14"
        >
          <p className="text-[#6b7280] text-[0.65rem] font-semibold tracking-[0.22em] uppercase mb-4">
            04 &nbsp;/&nbsp; Who It's For
          </p>
          <h2
            className="font-extrabold leading-tight tracking-tight"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3rem)",
              fontFamily: "'Georgia', serif",
            }}
          >
            <span className="text-white">Built for every seat </span>
            <span className="text-[#d4af37]">at the desk.</span>
          </h2>
        </div>

        {/* 3-column cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {cards.map((card, i) => (
            <Card key={i} {...card} delay={i * 130} />
          ))}
        </div>
      </div>
    </section>
  );
}