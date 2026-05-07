import { useState, useRef, useEffect } from "react";

const faqs = [
  {
    question: "What is Copy Trading on Trade Echo?",
    answer:
      "Copy Trading lets you mirror a vetted pilot's trades directly in your linked brokerage. Monthly and Yearly plans follow one pilot at a time. Lifetime unlocks following multiple pilots simultaneously. Every copied trade posts to your trade journal automatically for P&L review. Pilot performance is published on a public leaderboard so you can pick partners with transparent track records.",
  },
  {
    question: "Which brokers are supported?",
    answer:
      "Trade Echo supports all major brokerages including Interactive Brokers, TD Ameritrade, Alpaca, and more. We're continuously adding new broker integrations. Check the broker page for a full up-to-date list of supported platforms.",
  },
  {
    question: "Can I set my own risk controls?",
    answer:
      "Yes. You can set per-trade size limits, daily max loss thresholds, and choose which instruments to copy. You can pause or cancel copying at any time directly from the terminal or mobile app — giving you full control at all times.",
  },
  {
    question: "How does the leaderboard verification work?",
    answer:
      "Every pilot's performance is verified by connecting directly to their brokerage data. Win rates, P&L, and drawdown figures are pulled live — not self-reported. You always see real, audited numbers before choosing a pilot to follow.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Absolutely. Monthly and Yearly plans can be cancelled at any time with no penalties. Lifetime plans are a one-time purchase with no recurring fees. Downgrading or pausing is always available from your account settings.",
  },
];

function useInView(threshold = 0.1) {
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

function FAQItem({ question, answer, index }) {
  const [open, setOpen] = useState(index === 0);
  const contentRef = useRef(null);
  const [height, setHeight] = useState(index === 0 ? "auto" : "0px");
  const [itemRef, inView] = useInView();

  useEffect(() => {
    if (open) {
      setHeight(contentRef.current.scrollHeight + "px");
      // After transition, set to auto for dynamic content
      const t = setTimeout(() => setHeight("auto"), 400);
      return () => clearTimeout(t);
    } else {
      // First set to fixed height, then to 0
      setHeight(contentRef.current.scrollHeight + "px");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setHeight("0px"));
      });
    }
  }, [open]);

  return (
    <div
      ref={itemRef}
      style={{
        transitionDelay: `${index * 80}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.55s ease, transform 0.55s ease",
      }}
      className={`group rounded-2xl border transition-all duration-300 overflow-hidden
        ${open
          ? "border-[#d4af37]/30 bg-white/[0.04]"
          : "border-white/[0.07] bg-white/[0.025] hover:border-white/[0.13] hover:bg-white/[0.04]"
        }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-7 py-5 text-left focus:outline-none"
      >
        <span className={`font-bold text-[0.97rem] tracking-tight transition-colors duration-300 ${open ? "text-white" : "text-white/90"}`}>
          {question}
        </span>

        {/* Icon circle */}
        <span
          className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300
            ${open
              ? "border-[#d4af37]/60 bg-[#d4af37]/15 text-[#d4af37] rotate-0"
              : "border-white/20 bg-transparent text-white/50 group-hover:border-[#d4af37]/40 group-hover:text-[#d4af37]/70"
            }`}
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.35s cubic-bezier(.4,0,.2,1), background 0.3s, border-color 0.3s, color 0.3s" }}
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-3.5 h-3.5">
            <line x1="8" y1="2" x2="8" y2="14" />
            <line x1="2" y1="8" x2="14" y2="8" />
          </svg>
        </span>
      </button>

      {/* Animated answer */}
      <div
        ref={contentRef}
        style={{
          height,
          overflow: "hidden",
          transition: "height 0.38s cubic-bezier(.4,0,.2,1)",
        }}
      >
        <div className="px-7 pb-6">
          <div className="w-full h-px bg-white/[0.06] mb-5" />
          <p className="text-[#9ca3af] text-[0.875rem] leading-[1.75]">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function QuickAnswers() {
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
            "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Center radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 40%, rgba(212,175,55,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-3xl mx-auto">
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? "translateY(0)" : "translateY(22px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
          className="text-center mb-12"
        >
          <p className="text-[#6b7280] text-[0.65rem] font-semibold tracking-[0.22em] uppercase mb-4">
            05 &nbsp;/&nbsp; Questions
          </p>
          <h2
            className="text-white font-extrabold leading-tight tracking-tight"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3rem)",
              fontFamily: "'Georgia', serif",
            }}
          >
            Quick answers.
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} {...faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}