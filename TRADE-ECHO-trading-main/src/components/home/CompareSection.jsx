import { Check, Minus } from 'lucide-react'

const competitors = [
  { name: 'Trade Echo', price: '$199/mo', highlight: true },
  { name: 'Unusual Whales', price: '$50/mo', highlight: false },
  { name: 'FlowAlgo', price: '$149/mo', highlight: false },
  { name: 'Cheddar Flow', price: '$89/mo', highlight: false },
  { name: 'Heatseeker', price: '$699/mo', highlight: false },
]

const capabilities = [
  { label: 'Real-time options flow', values: [true, true, true, true, false] },
  { label: 'Dark pool prints', values: [true, false, true, false, false] },
  { label: 'Dealer GEX heatmaps', values: [true, false, false, false, true] },
  { label: 'Algo pattern detection + AI chat', values: [true, false, false, false, false] },
  { label: 'Copy Trading in your brokerage', values: [true, false, false, false, false] },
  { label: 'Native iOS + Android apps', values: [true, true, false, false, false] },
]

export default function CompareSection() {
  return (
    <section
      style={{
        background: '#000000',
        padding: '96px 32px',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div style={{ maxWidth: '1050px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <p
            style={{
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.24em',
              color: 'rgba(255,255,255,0.28)',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            04 / Compare
          </p>
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '-0.025em',
              lineHeight: 1.05,
              margin: '0 0 16px 0',
            }}
          >
            Trade Echo vs the usual stack.
          </h2>
          <p
            style={{
              fontSize: '15px',
              color: 'rgba(255,255,255,0.4)',
              maxWidth: '500px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Six of the capabilities traders pay up for most. See where each vendor actually delivers.
          </p>
        </div>

        {/* Table Container */}
        <div
          style={{
            background: '#0d0d0d',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '18px',
            overflow: 'hidden',
          }}
        >
          {/* Header Row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr repeat(5, 1fr)',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            {/* Capability label */}
            <div
              style={{
                padding: '22px 28px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#ffffff',
                }}
              >
                Capability
              </span>
            </div>

            {/* Competitor columns */}
            {competitors.map(({ name, price, highlight }) => (
              <div
                key={name}
                style={{
                  padding: '18px 12px',
                  textAlign: 'center',
                  borderLeft: '1px solid rgba(255,255,255,0.05)',
                  background: highlight ? 'rgba(212,175,55,0.04)' : 'transparent',
                }}
              >
                <p
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: highlight ? '#d4af37' : 'rgba(255,255,255,0.5)',
                    margin: '0 0 5px 0',
                    lineHeight: 1.2,
                  }}
                >
                  {name}
                </p>
                <p
                  style={{
                    fontSize: '13px',
                    fontWeight: 500,
                    color: highlight ? '#d4af37' : 'rgba(255,255,255,0.35)',
                    margin: 0,
                  }}
                >
                  {price}
                </p>
              </div>
            ))}
          </div>

          {/* Data Rows */}
          {capabilities.map(({ label, values }, ri) => (
            <div
              key={label}
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr repeat(5, 1fr)',
                borderBottom: ri < capabilities.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              }}
            >
              {/* Row label */}
              <div
                style={{
                  padding: '18px 28px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.5)',
                    fontWeight: 400,
                  }}
                >
                  {label}
                </span>
              </div>

              {/* Value cells */}
              {values.map((has, ci) => (
                <div
                  key={ci}
                  style={{
                    padding: '18px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderLeft: '1px solid rgba(255,255,255,0.05)',
                    background: competitors[ci].highlight ? 'rgba(212,175,55,0.03)' : 'transparent',
                  }}
                >
                  {has ? (
                    <Check
                      size={17}
                      strokeWidth={2.5}
                      style={{
                        color: competitors[ci].highlight ? '#d4af37' : 'rgba(255,255,255,0.35)',
                      }}
                    />
                  ) : (
                    <Minus
                      size={17}
                      strokeWidth={2}
                      style={{ color: 'rgba(255,255,255,0.13)' }}
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}