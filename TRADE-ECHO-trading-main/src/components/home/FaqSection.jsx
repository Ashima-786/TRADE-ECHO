import { useState } from 'react'

const faqs = [
  {
    q: 'What is Trade Echo?',
    a: 'Trade Echo is a professional-grade market data analytics platform (tradeecho.com) that provides options flow, dark pool data, dealer positioning (GEX), and algorithmic pattern detection for $199 per month. It gives retail traders access to real-time smart money data. It combines OptionFlow, Darkpool, DealerEdge, AlgoEdge, NewsEdge, Cortex (AI chat), copy trading, and the trade journal into one unified workspace available on web, iOS, and Android.',
  },
  {
    q: 'How does Trade Echo work?',
    a: 'Trade Echo connects to real-time exchange data feeds and processes every options print across all U.S. exchanges. It tiers the flow by aggression level (Aggressive, Unusual, Golden), monitors dark pool prints, calculates live GEX surfaces, and runs algorithmic pattern detection — all streamed into one terminal. You get the full picture in one view, not five tabs.',
  },
  {
    q: 'Is Trade Echo the same as Echo Trade?',
    a: 'No. Trade Echo (tradeecho.com) is a distinct platform with its own technology, team, and product. We are not affiliated with any service called "Echo Trade."',
  },
  {
    q: 'Can beginners use Trade Echo?',
    a: 'Yes. While Trade Echo provides institutional-grade data, the platform is designed for all experience levels. The Cortex AI assistant explains flow, GEX levels, and dark pool activity in plain English. Most members are profitable retail traders — not institutions.',
  },
  {
    q: 'What is OptionFlow on Trade Echo?',
    a: 'OptionFlow tracks every options print across all U.S. exchanges in real time. It filters and tiers each trade into Aggressive, Unusual, or Golden categories so you can quickly identify where institutions are positioning without sifting through thousands of low-signal prints.',
  },
  {
    q: 'What is DealerEdge on Trade Echo?',
    a: 'DealerEdge is our GEX (Gamma Exposure) heatmap module. It shows you the live gamma surface for any ticker or index, including HVL, gamma flip points, call walls, and put walls. When you know where dealer hedging creates magnetic price levels, you can trade structure — not noise.',
  },
]

// Inline SVG chevron icons (no lucide dependency needed, but lucide versions shown in comments)
// Lucide equivalent: <ChevronDown /> and <ChevronUp />
function ChevronDownIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 4L6 8L10 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronUpIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 8L6 4L10 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function FaqCard({ q, a, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div
      style={{
        background: '#111214',
        border: `1px solid ${open ? 'rgba(255,255,255,0.13)' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: '14px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 0.2s',
      }}
    >
      {/* Header Row */}
      <div
        onClick={() => setOpen((v) => !v)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 22px',
          gap: '12px',
          userSelect: 'none',
        }}
      >
        {/* Left: icon + question */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Green ? icon in dark circle */}
          <div
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              background: '#0e1a0f',
              border: '1.5px solid #1c3d1e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              fontSize: '13px',
              fontWeight: 800,
              color: '#d4af37',
              fontStyle: 'italic',
              lineHeight: 1,
            }}
          >
            ?
          </div>

          {/* Question text */}
          <span
            style={{
              fontSize: '15px',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.3,
            }}
          >
            {q}
          </span>
        </div>

        {/* Right: chevron toggle */}
        <div
          style={{
            flexShrink: 0,
            color: open ? '#d4af37' : 'rgba(255,255,255,0.35)',
            transition: 'color 0.2s',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </div>
      </div>

      {/* Answer Body */}
      {open && (
        <div style={{ padding: '0 22px 22px 60px' }}>
          <p
            style={{
              fontSize: '14px',
              lineHeight: 1.75,
              color: 'rgba(255,255,255,0.48)',
              margin: 0,
            }}
          >
            {a}
          </p>
        </div>
      )}
    </div>
  )
}

export default function FaqSection() {
  // Split into two columns: left = even indices, right = odd indices
  const leftCol = faqs.filter((_, i) => i % 2 === 0)
  const rightCol = faqs.filter((_, i) => i % 2 !== 0)

  return (
    <section
      style={{
        background: '#000000',
        minHeight: '100vh',
        padding: '72px 32px',
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '52px' }}>
        <p
          style={{
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.24em',
            color: 'rgba(255,255,255,0.3)',
            textTransform: 'uppercase',
            marginBottom: '18px',
          }}
        >
          07 / Questions
        </p>
        <h2
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            fontWeight: 900,
            color: '#ffffff',
            letterSpacing: '-0.025em',
            lineHeight: 1.05,
            margin: 0,
          }}
        >
          Answers before you ask.
        </h2>
      </div>

      {/* Two-Column FAQ Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px',
          maxWidth: '1100px',
          margin: '0 auto',
          alignItems: 'start',
        }}
      >
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {leftCol.map((item, i) => (
            <FaqCard
              key={item.q}
              q={item.q}
              a={item.a}
              defaultOpen={i === 0} // first card open by default (matches screenshot)
            />
          ))}
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {rightCol.map((item) => (
            <FaqCard key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  )
}