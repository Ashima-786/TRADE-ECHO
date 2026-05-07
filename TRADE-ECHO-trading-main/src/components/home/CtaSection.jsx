import { Link } from 'react-router-dom'
import { Lock } from 'lucide-react'

export default function CtaSection() {
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
      {/* Green glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[700px] h-[300px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.06) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <p className="text-[10px] font-bold tracking-[0.25em] text-white/25 uppercase mb-6">
          08 / Get started
        </p>
        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black text-white leading-[1.05] tracking-tight mb-5">
          Trade what the whales trade.
        </h2>
        <p className="text-white/45 text-base leading-relaxed max-w-xl mx-auto mb-10">
          Every plan includes the full toolkit. Option Flow, Dealer Edge, Dark Pool, Algo Edge, Copy
          Trading, and the Discord community. Web, iOS, and Android.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <Link
            to="/pricing"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#d4af37] text-black font-bold text-sm hover:bg-[#e5c158] transition-colors shadow-[0_0_60px_rgba(212,175,55,0.25)]"
          >
            Start Pro · $199/mo →
          </Link>
          <a
            href="https://discord.gg/tradeecho"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white/6 border border-white/10 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
          >
            Join the Discord
          </a>
        </div>

        {/* App badges */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <a
            href="https://apps.apple.com/us/app/trade-echo/id6749560531"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 bg-white/5 border border-white/8 rounded-xl px-4 py-2.5 hover:bg-white/8 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <div className="text-left">
              <p className="text-[9px] text-white/35 leading-none">Download on the</p>
              <p className="text-xs font-bold text-white leading-none mt-0.5">App Store</p>
            </div>
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.tradeecho.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 bg-white/5 border border-white/8 rounded-xl px-4 py-2.5 hover:bg-white/8 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
              <path d="M3.18 23.5c.34.19.73.2 1.1.02l12.72-7.14-2.82-2.82L3.18 23.5z" fill="#EA4335"/>
              <path d="M22.15 10.28l-3.07-1.72-3.18 3.18 3.18 3.18 3.1-1.74c.88-.5.88-1.9-.03-2.9z" fill="#FBBC04"/>
              <path d="M1.08 1.5C1.03 1.68 1 1.88 1 2.1v19.8c0 .22.03.42.08.6l12.1-12.1L1.08 1.5z" fill="#4285F4"/>
              <path d="M14.18 12L4.28 2.02C3.91 1.83 3.52 1.83 3.18 2.02L14.18 12z" fill="#34A853"/>
            </svg>
            <div className="text-left">
              <p className="text-[9px] text-white/35 leading-none">Get it on</p>
              <p className="text-xs font-bold text-white leading-none mt-0.5">Google Play</p>
            </div>
          </a>
        </div>

        {/* Security note */}
        <p className="flex items-center justify-center gap-1.5 text-xs text-white/25">
          <Lock size={11} />
          Secure checkout via Stripe. Cancel anytime.
        </p>

        {/* Bottom ticker */}
        <div className="mt-14 pt-8 border-t border-white/5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[10px] font-bold text-white/20 uppercase tracking-widest">
          <span>Trade Echo Pro</span>
          <span className="text-white/10">·</span>
          <span>$199/mo</span>
          <span className="text-white/10">·</span>
          <span>Web</span>
          <span className="text-white/10">·</span>
          <span>iOS</span>
          <span className="text-white/10">·</span>
          <span>Android</span>
          <span className="text-white/10">·</span>
          <Link to="/pricing" className="text-[#d4af37]/60 hover:text-[#d4af37] transition-colors">
            Start Pro →
          </Link>
        </div>
      </div>
    </section>
  )
}
