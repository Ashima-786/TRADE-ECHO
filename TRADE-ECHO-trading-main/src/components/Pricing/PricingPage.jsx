// components/PricingPage.jsx

import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Check, Star, Lock, RefreshCw, ShieldCheck, XCircle,
  TrendingUp, Cpu, BarChart2, Smartphone, Users, Trophy,
  BookOpen, Bell, ChevronDown,
} from 'lucide-react'

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const monthlyFeatures = [
  { label: 'Real-Time Market Data' },
  { label: 'Algo Edge' },
  { label: 'GEX & Gamma Tools' },
  { label: 'Option Flow' },
  { label: 'Trading Tools' },
  { label: 'Social Feed' },
  { label: 'Copy Trading', sub: 'One active pilot.' },
  { label: 'Mobile App' },
  { label: 'Competitions', sub: '$15K+ monthly prize pools.' },
  { label: 'Discord Community' },
  { label: 'Priority Support' },
]

const yearlyFeatures = [
  { label: 'Everything in Monthly', star: true },
  { label: 'Copy Trading', sub: 'Same as Monthly. Lifetime unlocks multi-pilot.' },
  { label: 'Advanced Analytics' },
  { label: 'Priority Feature Access' },
  { label: 'Exclusive Competitions' },
  { label: 'Dedicated Support' },
  { label: 'Group Strategy Sessions' },
  { label: 'Custom Alerts' },
  { label: 'Early Beta Access' },
]

const lifetimeFeatures = [
  { label: 'All Current & Future Features', star: true },
  { label: 'Copy Trading', sub: 'Lifetime extra. Multi-pilot.' },
  { label: 'Lifetime Mobile + Web Access' },
  { label: 'VIP Discord Role' },
  { label: 'Priority Support Channel' },
  { label: 'Early Access to New Modules' },
  { label: 'Exclusive Lifetime Badge' },
  { label: 'All Premium Features' },
  { label: 'No Renewal Fees' },
  { label: 'Future-Proof' },
]

const toolkitItems = [
  { icon: TrendingUp, title: 'Real-Time Market Data',    desc: 'Live options chains, quotes, and prints streamed directly to the terminal.' },
  { icon: Cpu,        title: 'Algo Edge & AI Insights',  desc: 'Pattern detection and AI chat that read your live flow and answer in context.' },
  { icon: BarChart2,  title: 'GEX & Gamma Analysis',     desc: 'Dealer positioning, gamma flip points, walls, and anchor levels in one heatmap.' },
  { icon: Smartphone, title: 'iOS & Android Apps',       desc: 'Native apps with push alerts for flow, algo triggers, and market events.' },
  { icon: Users,      title: 'Copy Trading & Community', desc: 'Mirror pilots in your brokerage. Join a Discord of active traders running the same signals.' },
  { icon: Trophy,     title: '$15K+ Monthly Challenges', desc: 'Member-only competitions with real prize pools every month.' },
  { icon: BookOpen,   title: 'Trading Tools',            desc: 'Watchlists, alerts, journal, and strike-level screeners built for the options desk.' },
  { icon: Bell,       title: 'Smart Notifications',      desc: 'Custom alerts on the conditions you care about, delivered to phone, web, or Discord.' },
]

const faqs = [
  {
    q: 'What is Trade Echo pricing?',
    a: 'Trade Echo offers three tiers: Monthly at $199/mo, Yearly at $2,199/yr (save $189), and Lifetime at $3,499 one-time. Every plan includes the full toolkit — nothing is gated behind an upsell.',
  },
  {
    q: 'What are all the features included in each plan?',
    a: 'All plans include OptionFlow, Darkpool, DealerEdge (GEX), AlgoEdge, NewsEdge, Cortex AI, Trade Journal, Copy Trading, mobile apps (iOS & Android), Discord community, $15K+ monthly competitions, and priority support. Yearly and Lifetime add advanced analytics, priority feature access, and exclusive competitions. Lifetime additionally unlocks multi-pilot copy trading and a VIP Discord role.',
  },
]

// ─────────────────────────────────────────────
// GLOBAL STYLES
// ─────────────────────────────────────────────
const STYLES = `
  @keyframes glowPulse {
    0%, 100% { box-shadow: 0 0 40px rgba(212,175,55,0.18); }
    50%       { box-shadow: 0 0 72px rgba(212,175,55,0.34); }
  }
  .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }

  .toolkit-card {
    background: #111214;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 14px;
    padding: 28px 24px;
    transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
  }
  .toolkit-card:hover {
    border-color: rgba(212,175,55,0.55);
    box-shadow: 0 0 32px rgba(212,175,55,0.1);
    transform: translateY(-3px);
  }
  .toolkit-icon {
    width: 40px; height: 40px; border-radius: 10px;
    background: rgba(212,175,55,0.12);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 16px;
    transition: background 0.25s;
  }
  .toolkit-card:hover .toolkit-icon { background: rgba(212,175,55,0.22); }

  .faq-item {
    background: #111214;
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 12px;
    overflow: hidden;
    transition: border-color 0.25s;
    margin-bottom: 12px;
  }
  .faq-item.open { border-color: rgba(212,175,55,0.4); }
  .faq-btn {
    width: 100%; display: flex; justify-content: space-between; align-items: center;
    padding: 22px 24px; background: none; border: none; cursor: pointer;
    text-align: left; gap: 16px;
  }
  .faq-body {
    max-height: 0; overflow: hidden;
    transition: max-height 0.38s cubic-bezier(0.4,0,0.2,1), padding 0.25s;
    padding: 0 24px;
  }
  .faq-body.open { max-height: 300px; padding: 0 24px 20px; }
  .faq-chevron { transition: transform 0.3s ease; flex-shrink: 0; }
  .faq-chevron.open { transform: rotate(180deg); }

  .plan-outline-btn:hover {
    background: rgba(255,255,255,0.06) !important;
    border-color: rgba(255,255,255,0.4) !important;
  }
  .plan-green-btn { transition: filter 0.2s, transform 0.2s; }
  .plan-green-btn:hover { filter: brightness(1.1); transform: scale(1.02); }

  .cta-card {
    border-radius: 20px;
    background: linear-gradient(160deg, #0d1a0e 0%, #0a150b 60%, #050d06 100%);
    border: 1px solid rgba(212,175,55,0.22);
    padding: 72px 40px;
    text-align: center;
    position: relative;
    overflow: hidden;
    animation: glowPulse 4s ease-in-out infinite;
  }
  .cta-card::before {
    content: '';
    position: absolute; top: -80px; left: 50%; transform: translateX(-50%);
    width: 480px; height: 280px;
    background: radial-gradient(ellipse, rgba(212,175,55,0.18) 0%, transparent 70%);
    pointer-events: none;
  }
  .cta-btn-monthly {
    padding: 14px 28px; border-radius: 999px;
    border: 1.5px solid rgba(255,255,255,0.25); background: transparent;
    color: #fff; font-weight: 700; font-size: 15px; cursor: pointer;
    text-decoration: none; display: inline-flex; align-items: center; gap: 6px;
    transition: border-color 0.2s, background 0.2s;
  }
  .cta-btn-monthly:hover { border-color: rgba(255,255,255,0.5); background: rgba(255,255,255,0.06); }
  .cta-btn-green {
    padding: 14px 28px; border-radius: 999px;
    background: #d4af37; border: none;
    color: #000; font-weight: 800; font-size: 15px; cursor: pointer;
    text-decoration: none; display: inline-flex; align-items: center; gap: 6px;
    transition: filter 0.2s, transform 0.2s;
  }
  .cta-btn-green:hover { filter: brightness(1.12); transform: scale(1.03); }
`

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
let stylesInjected = false
export function injectStyles() {
  if (stylesInjected) return
  const el = document.createElement('style')
  el.textContent = STYLES
  document.head.appendChild(el)
  stylesInjected = true
}

function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

function SectionLabel({ num, label }) {
  return (
    <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.26em', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', marginBottom: '18px' }}>
      {num} / {label}
    </p>
  )
}

function FeatureItem({ label, sub, star, highlight }) {
  return (
    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
      {star
        ? <Star size={14} style={{ color: '#d4af37', flexShrink: 0, marginTop: '3px', fill: '#d4af37' }} />
        : <Check size={14} style={{ color: '#d4af37', flexShrink: 0, marginTop: '3px' }} strokeWidth={2.5} />
      }
      <div>
        <span style={{ fontSize: '13.5px', color: highlight ? '#fff' : 'rgba(255,255,255,0.8)', fontWeight: highlight ? 700 : 400, lineHeight: 1.4, display: 'block' }}>
          {label}
        </span>
        {sub && (
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', display: 'block', marginTop: '2px' }}>
            {sub}
          </span>
        )}
      </div>
    </li>
  )
}

// ─────────────────────────────────────────────
// EXPORT: PricingHero  (01 + 02)
// ─────────────────────────────────────────────
export function PricingHero() {
  return (
    <section style={{ background: '#0d0d0d', backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '52px 52px', padding: '96px 32px 80px', textAlign: 'center' }}>
      <SectionLabel num="01" label="Pricing" />
      <h1 style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 900, lineHeight: 1.04, letterSpacing: '-0.03em', color: '#fff', marginBottom: '28px', maxWidth: '820px', marginLeft: 'auto', marginRight: 'auto' }}>
        Simple, <span style={{ color: '#d4af37' }}>transparent pricing.</span>
      </h1>
      <p style={{ fontSize: '17px', lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', maxWidth: '680px', margin: '0 auto 20px' }}>
        Choose the plan that fits your trading style. Every plan includes Option Flow, Dark Pool, Dealer Edge, Algo Edge, Copy Trading, mobile access, community, and the full Trade Echo toolkit.
      </p>
      <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(255,255,255,0.35)', maxWidth: '520px', margin: '0 auto 80px' }}>
        Most active traders choose Yearly for the strongest value. Monthly keeps it flexible. Lifetime locks in long-term access.
      </p>

      <SectionLabel num="02" label="Value Snapshot" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', maxWidth: '1100px', margin: '0 auto', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', overflow: 'hidden' }}>
        <div style={{ padding: '44px 48px', background: '#111814', borderRight: '1px solid rgba(255,255,255,0.06)', textAlign: 'left' }}>
          <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: '20px' }}>What You Get</p>
          <p style={{ fontSize: 'clamp(1.1rem,2vw,1.5rem)', fontWeight: 800, color: '#fff', lineHeight: 1.3 }}>
            Six professional-grade tools for the price of{' '}
            <span style={{ color: '#d4af37' }}>one narrow premium subscription.</span>
          </p>
        </div>
        <div style={{ padding: '44px 48px', background: 'linear-gradient(135deg,#111814 0%,#0d1a0e 100%)', textAlign: 'left' }}>
          <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: '20px' }}>What It Replaces</p>
          <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'rgba(255,255,255,0.65)' }}>
            Trade Echo replaces the usual stack of flow, dealer positioning, dark pool, and community tools with a single membership.
          </p>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// EXPORT: PricingCards  (03)
// ─────────────────────────────────────────────
export function PricingCards() {
  return (
    <section style={{ background: '#000', padding: '96px 32px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <SectionLabel num="03" label="Plans" />
          <h2 style={{ fontSize: 'clamp(2rem,4.5vw,3.4rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.025em', lineHeight: 1.06, margin: '0 0 14px' }}>
            Three ways to join Trade Echo.
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.4)', margin: 0 }}>
            Same full toolkit across every plan. Pick the commitment level that fits.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', alignItems: 'start' }}>

          {/* MONTHLY */}
          <div style={{ background: '#111214', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '32px 28px', display: 'flex', flexDirection: 'column' }}>
            <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: '14px' }}>Monthly</p>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', marginBottom: '20px', lineHeight: 1.5 }}>Perfect for trying out Trade Echo.</p>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', marginBottom: '14px' }}>
              <span style={{ fontSize: '56px', fontWeight: 900, color: '#fff', lineHeight: 1 }}>$199</span>
              <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', marginBottom: '8px' }}>/month</span>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '999px', padding: '5px 14px', marginBottom: '28px', width: 'fit-content' }}>
              <RefreshCw size={10} style={{ color: 'rgba(255,255,255,0.4)' }} />
              <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Flexible · Cancel Anytime</span>
            </div>
            <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', marginBottom: '14px' }}>Included</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: '11px' }}>
              {monthlyFeatures.map(f => <FeatureItem key={f.label} {...f} />)}
            </ul>
            <Link to="/auth/signup?plan=monthly" className="plan-outline-btn"
              style={{ display: 'block', textAlign: 'center', padding: '14px', borderRadius: '999px', border: '1.5px solid rgba(255,255,255,0.2)', color: '#fff', fontWeight: 700, fontSize: '15px', textDecoration: 'none', marginTop: 'auto' }}>
              Choose Monthly →
            </Link>
          </div>

          {/* YEARLY */}
          <div style={{ background: '#0d1a0e', border: '1.5px solid #d4af37', borderRadius: '16px', padding: '32px 28px', display: 'flex', flexDirection: 'column', position: 'relative', boxShadow: '0 0 48px rgba(212,175,55,0.12)' }}>
            <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: '#f97316', color: '#fff', fontSize: '10px', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '5px 16px', borderRadius: '999px', whiteSpace: 'nowrap' }}>Most Popular</div>
            <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', color: '#d4af37', textTransform: 'uppercase', marginBottom: '14px' }}>Yearly</p>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '20px', lineHeight: 1.5 }}>Most traders choose Yearly for the best balance of savings and flexibility.</p>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', marginBottom: '14px' }}>
              <span style={{ fontSize: '56px', fontWeight: 900, color: '#fff', lineHeight: 1 }}>$2,199</span>
              <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', marginBottom: '8px' }}>/year</span>
            </div>
            <div style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '999px', padding: '5px 14px', marginBottom: '28px', width: 'fit-content', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={10} style={{ color: '#d4af37' }} />
              <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', color: '#d4af37', textTransform: 'uppercase' }}>Save $189 vs Monthly · 8% Off</span>
            </div>
            <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', marginBottom: '14px' }}>Included</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: '11px' }}>
              {yearlyFeatures.map(f => <FeatureItem key={f.label} {...f} highlight={f.star} />)}
            </ul>
            <Link to="/auth/signup?plan=yearly" className="plan-green-btn"
              style={{ display: 'block', textAlign: 'center', padding: '14px', borderRadius: '999px', background: '#d4af37', color: '#000', fontWeight: 800, fontSize: '15px', textDecoration: 'none', boxShadow: '0 0 32px rgba(212,175,55,0.35)', marginTop: 'auto' }}>
              Choose Yearly →
            </Link>
          </div>

          {/* LIFETIME */}
          <div style={{ background: '#111214', border: '1.5px solid #d4af37', borderRadius: '16px', padding: '32px 28px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: 'transparent', border: '1.5px solid #d4af37', color: '#d4af37', fontSize: '10px', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 16px', borderRadius: '999px', whiteSpace: 'nowrap' }}>Limited</div>
            <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: '14px' }}>Lifetime</p>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', marginBottom: '20px', lineHeight: 1.5 }}>Pay once, own forever.</p>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', marginBottom: '14px' }}>
              <span style={{ fontSize: '56px', fontWeight: 900, color: '#fff', lineHeight: 1 }}>$3,499</span>
              <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', marginBottom: '8px' }}>one-time</span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderLeft: '2px solid #d4af37', borderRadius: '8px', padding: '12px 14px', marginBottom: '28px' }}>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.6 }}>
                Two years of Monthly would cost $4,776. At $3,499 one-time, Lifetime keeps long-term ownership simple.
              </p>
            </div>
            <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', marginBottom: '14px' }}>Included</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: '11px' }}>
              {lifetimeFeatures.map(f => <FeatureItem key={f.label} {...f} highlight={f.star} />)}
            </ul>
            <Link to="/auth/signup?plan=lifetime" className="plan-green-btn"
              style={{ display: 'block', textAlign: 'center', padding: '14px', borderRadius: '999px', background: '#d4af37', color: '#000', fontWeight: 800, fontSize: '15px', textDecoration: 'none', boxShadow: '0 0 24px rgba(212,175,55,0.25)', marginTop: 'auto' }}>
              Choose Lifetime →
            </Link>
          </div>
        </div>

        {/* Trust row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px', marginTop: '40px', flexWrap: 'wrap' }}>
          {[
            { icon: XCircle,     label: 'Cancel anytime' },
            { icon: Lock,        label: 'No long-term contracts' },
            { icon: ShieldCheck, label: 'Secure checkout powered by Stripe' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>
              <Icon size={13} style={{ color: '#d4af37' }} />
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// EXPORT: BillingBanner  (04)
// ─────────────────────────────────────────────
export function BillingBanner() {
  const { ref, visible } = useReveal()
  return (
    <section ref={ref} className={`reveal${visible ? ' visible' : ''}`} style={{ background: '#000', padding: '0 32px 80px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.26em', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', marginBottom: '24px', textAlign: 'center' }}>04 / Billing</p>
        <div style={{ background: '#111214', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '14px', padding: '32px 36px', display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(212,175,55,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <RefreshCw size={20} style={{ color: '#d4af37' }} />
          </div>
          <div>
            <p style={{ fontSize: '17px', fontWeight: 800, color: '#fff', marginBottom: '8px', lineHeight: 1.3 }}>
              Flexible billing. Upgrade, downgrade, or move between plans.
            </p>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: 0 }}>
              Upgrades apply instantly. Downgrades take effect at your next renewal. Your data, preferences, and trade history stay intact. Contact support if you need help migrating your billing.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// EXPORT: ToolkitGrid  (05)
// ─────────────────────────────────────────────
export function ToolkitGrid() {
  const { ref, visible } = useReveal()
  return (
    <section ref={ref} className={`reveal${visible ? ' visible' : ''}`} style={{ background: '#000', padding: '80px 32px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <SectionLabel num="05" label="Toolkit" />
          <h2 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.025em', lineHeight: 1.08, marginBottom: '16px' }}>
            What's included in every plan.
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.45)', maxWidth: '540px', margin: '0 auto' }}>
            The complete Trade Echo workspace ships with every tier. Nothing gated behind an upsell.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px' }}>
          {toolkitItems.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="toolkit-card">
              <div className="toolkit-icon">
                <Icon size={18} style={{ color: '#d4af37' }} />
              </div>
              <p style={{ fontSize: '14px', fontWeight: 700, color: '#fff', marginBottom: '8px', lineHeight: 1.3 }}>{title}</p>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// EXPORT: FaqSection  (06)
// ─────────────────────────────────────────────
export function FaqSection() {
  const { ref, visible } = useReveal()
  const [openIdx, setOpenIdx] = useState(null)
  return (
    <section ref={ref} className={`reveal${visible ? ' visible' : ''}`} style={{ background: '#000', padding: '80px 32px' }}>
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <SectionLabel num="06" label="Questions" />
          <h2 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            Answers before you ask.
          </h2>
        </div>
        {faqs.map((faq, i) => {
          const isOpen = openIdx === i
          return (
            <div key={i} className={`faq-item${isOpen ? ' open' : ''}`}>
              <button className="faq-btn" onClick={() => setOpenIdx(isOpen ? null : i)}>
                <span style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>{faq.q}</span>
                <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'rgba(212,175,55,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <ChevronDown size={15} className={`faq-chevron${isOpen ? ' open' : ''}`} style={{ color: '#d4af37' }} />
                </div>
              </button>
              <div className={`faq-body${isOpen ? ' open' : ''}`}>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, margin: 0 }}>{faq.a}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// EXPORT: GetStartedCTA  (07)
// ─────────────────────────────────────────────
export function GetStartedCTA() {
  const { ref, visible } = useReveal()
  return (
    <section ref={ref} className={`reveal${visible ? ' visible' : ''}`} style={{ background: '#000', padding: '40px 32px 100px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div className="cta-card">
          <SectionLabel num="07" label="Get Started" />
          <h2 style={{ fontSize: 'clamp(2rem,4.5vw,3.2rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.025em', lineHeight: 1.08, marginBottom: '16px' }}>
            Ready to join <span style={{ color: '#d4af37' }}>Trade Echo?</span>
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)', maxWidth: '520px', margin: '0 auto 36px', lineHeight: 1.7 }}>
            Pick the plan that matches your commitment level and start using the same institutional workflow thousands of traders rely on every week.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', flexWrap: 'wrap', marginBottom: '28px' }}>
            <Link to="/auth/signup?plan=monthly" className="cta-btn-monthly">Start Monthly</Link>
            <Link to="/auth/signup?plan=yearly"  className="cta-btn-green">Go Yearly →</Link>
            <Link to="/auth/signup?plan=lifetime" className="cta-btn-green">Get Lifetime →</Link>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <Lock size={12} style={{ color: 'rgba(255,255,255,0.3)' }} />
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>
              Secure checkout powered by Stripe. All payments are encrypted and secure.
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}