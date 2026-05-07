import { Link } from 'react-router-dom'
import { X, Check } from 'lucide-react'

const competitors = [
  { name: 'Unusual Whales · flow', price: '$50/mo' },
  { name: 'FlowAlgo · desktop flow', price: '$149/mo' },
  { name: 'Heatseeker by Skylit.ai · GEX', price: '$699/mo' },
  { name: 'Premium Discord group', price: '$199/mo' },
]

const included = [
  'Option Flow · strike-level institutional activity',
  'Dealer Edge · GEX heatmaps, flip, walls',
  'Dark Pool · off-exchange prints',
  'Algo Edge + News Edge + Cortex AI',
  'Copy Trading · mirror pilots in your brokerage',
  'Discord community + iOS/Android apps',
]

export default function MathSection() {
  return (
    <section
      className="py-28 px-4 relative overflow-hidden"
      style={{
        background: '#0a0a0a',
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[10px] font-bold tracking-[0.25em] text-white/25 uppercase mb-6">
            02 / The Math
          </p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black text-white leading-[1.05] tracking-tight">
            What you're paying for today.
            <br />
            What Trade Echo delivers.
          </h2>
        </div>

        {/* Two columns */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Competitor stack */}
          <div className="rounded-2xl border border-white/8 bg-[#0d0d0d] p-7 md:p-9">
            <p className="text-[9px] font-bold tracking-[0.25em] text-white/25 uppercase mb-2">
              CURRENT STACK
            </p>
            <h3 className="text-white font-bold text-xl mb-8">The tools you stitch together</h3>

            <ul className="space-y-4 mb-8">
              {competitors.map(({ name, price }) => (
                <li key={name} className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-3 text-sm text-white/50">
                    <X size={14} className="text-[#9ca3af] flex-shrink-0" />
                    {name}
                  </span>
                  <span className="text-[#9ca3af] font-bold text-sm flex-shrink-0">{price}</span>
                </li>
              ))}
            </ul>

            <div className="border-t border-white/5 pt-5 flex items-center justify-between">
              <span className="text-white/40 text-sm">Monthly total</span>
              <span className="text-[#9ca3af] font-black text-[2.2rem] leading-none">$1,097</span>
            </div>
          </div>

          {/* Trade Echo */}
          <div className="rounded-2xl border border-[#d4af37]/20 bg-[#0d0d0d] p-7 md:p-9 relative overflow-hidden">
            {/* Subtle sandal tint */}
            <div className="absolute inset-0 bg-[#d4af37]/[0.03] pointer-events-none" />

            <div className="relative">
              <p className="text-[9px] font-bold tracking-[0.25em] text-[#d4af37] uppercase mb-2">
                TRADE ECHO PRO
              </p>
              <h3 className="text-white font-bold text-xl mb-8">One subscription replaces all of it</h3>

              <ul className="space-y-4 mb-8">
                {included.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white/60">
                    <Check size={14} className="text-[#d4af37] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="border-t border-white/5 pt-5 flex items-center justify-between">
                <span className="text-white/40 text-sm">Monthly total</span>
                <span className="text-[#d4af37] font-black text-[2.2rem] leading-none">$199</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            to="/pricing"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#d4af37] text-black font-bold text-sm hover:bg-[#e5c158] transition-colors shadow-[0_0_40px_rgba(212,175,55,0.2)]"
          >
            Start Pro · $199/mo →
          </Link>
        </div>
      </div>
    </section>
  )
}
