import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

export default function GetStartedCTA() {
  const navigate = useNavigate();
  const [ref, inView] = useInView(0.2);

  return (
    <section
      className="relative w-full flex items-center justify-center py-16 px-6"
      style={{ background: "#0a0a0a" }}
    >
      {/* Outer glow behind card */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(212,175,55,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Card */}
      <div
        ref={ref}
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.75s ease, transform 0.75s ease",
        }}
        className="relative w-full max-w-4xl rounded-3xl border border-white/[0.09] overflow-hidden"
        style2={{}}
      >
        {/* Card background + inner sandal radial */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 100% at 50% 110%, rgba(212,175,55,0.18) 0%, rgba(15,20,15,0.98) 55%, #0d0f0d 100%)",
          }}
        />
        {/* Subtle grid inside card */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-8 py-16">
          {/* Label */}
          <p className="text-[#6b7280] text-[0.65rem] font-semibold tracking-[0.22em] uppercase mb-5">
            06 &nbsp;/&nbsp; Get Started
          </p>

          {/* Heading */}
          <h2
            className="font-extrabold leading-tight tracking-tight mb-5"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontFamily: "'Georgia', serif",
            }}
          >
            <span className="text-white">Start mirroring </span>
            <span className="text-[#d4af37]">verified pilots</span>
            <span className="text-white"> today.</span>
          </h2>

          {/* Subtext */}
          <p className="text-[#9ca3af] text-[0.9rem] leading-relaxed max-w-md mb-10">
            Included in Trade Echo Pro with OptionFlow, DealerEdge, Darkpool, AlgoEdge,
            and Cortex. $199/mo. Cancel anytime.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Primary CTA */}
            <button
              onClick={() => navigate("/pricing")}
              className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-[0.92rem] text-black bg-[#d4af37] hover:bg-[#b8912e] transition-all duration-200 shadow-lg shadow-[#d4af37]/20 hover:shadow-[#d4af37]/35 hover:scale-[1.02] active:scale-[0.98]"
            >
              Start mirroring pilots
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
            </button>

            {/* Secondary CTA */}
            <button
              onClick={() => navigate("/pricing")}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-[0.92rem] text-white border border-white/20 bg-transparent hover:border-white/40 hover:bg-white/[0.06] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              View all plans
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}