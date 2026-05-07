const testimonials = [
  {
    quote:
      'Push alerts on my phone catch flow I would have missed sitting at the desktop. The Copy Trading feature has basically put my book on auto-pilot for the afternoons.',
    name: 'Daniel P.',
    role: 'Prop desk · NYC',
    initials: 'DP',
  },
  {
    quote:
      'DealerEdge alone is worth the $199. Knowing exactly where gamma flips are before the market opens gives me a real structural edge every session.',
    name: 'Sarah K.',
    role: 'Retail trader · Chicago',
    initials: 'SK',
  },
  {
    quote:
      'I was paying $848/mo between FlowAlgo and Heatseeker. Trade Echo replaced both — with better data and the Cortex AI on top. It was a no-brainer.',
    name: 'Marcus T.',
    role: 'Full-time trader · Miami',
    initials: 'MT',
  },
]

export default function TestimonialsSection() {
  return (
    <section
      className="py-28 px-4"
      style={{
        background: '#0a0a0a',
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[10px] font-bold tracking-[0.25em] text-white/25 uppercase mb-6">
            06 / Users
          </p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black text-white leading-[1.05] tracking-tight">
            Traders running Trade Echo every session.
          </h2>
          <p className="text-white/40 mt-4 text-sm">
            Three of the 5,000+ members on the platform today.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map(({ quote, name, role, initials }) => (
            <div key={name} className="rounded-2xl border border-white/8 bg-[#0d0d0d] p-7 flex flex-col">
              {/* Quote mark */}
              <span className="text-[#d4af37]/40 text-5xl font-black leading-none mb-4 select-none">❝</span>

              <p className="text-white/60 text-sm leading-relaxed flex-1 mb-8 italic">
                {quote}
              </p>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-black text-[#d4af37]">{initials}</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{name}</p>
                  <p className="text-[11px] text-white/30">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mt-12">
          {[
            { val: '5,000+', label: 'Active traders' },
            { val: '4.8★', label: 'Trustpilot rating' },
            { val: '$900+', label: 'Saved per month' },
          ].map(({ val, label }) => (
            <div key={label} className="text-center rounded-2xl border border-white/6 bg-[#0d0d0d] py-6 px-4">
              <p className="text-3xl font-black text-[#d4af37]">{val}</p>
              <p className="text-xs text-white/30 mt-1.5">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
