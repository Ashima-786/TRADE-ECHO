import { useState } from 'react'
import { UserPlus, Monitor, Zap } from 'lucide-react'

const steps = [
  {
    num: '1',
    icon: UserPlus,
    title: 'Sign up in 60 seconds',
    desc: 'Pay once via Stripe. No broker connection required to start. Your account is active instantly.',
  },
  {
    num: '2',
    icon: Monitor,
    title: 'Open web or mobile',
    desc: 'Web app runs in any browser. Native iOS and Android apps sync your watchlists, alerts, and journal.',
  },
  {
    num: '3',
    icon: Zap,
    title: 'Act on real-time signals',
    desc: 'Flow, GEX, dark pool, and algo signals stream live. Custom alerts pushed to phone and Discord.',
  },
]

export default function OnboardingSection() {
  const [activeCard, setActiveCard] = useState(1) // card 2 active by default (matches screenshot)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [clickedCard, setClickedCard] = useState(null)

  const handleClick = (idx) => {
    setActiveCard(idx)
    setClickedCard(idx)
    setTimeout(() => setClickedCard(null), 600)
  }

  const isGlowing = (idx) => activeCard === idx || hoveredCard === idx

  return (
    <>
      <style>{`
        @keyframes glowPulse {
          0%   { box-shadow: 0 0 0px 0px rgba(212,175,55,0), 0 0 30px 0px rgba(212,175,55,0); }
          30%  { box-shadow: 0 0 0px 8px rgba(212,175,55,0.3), 0 0 70px 16px rgba(212,175,55,0.22); }
          100% { box-shadow: 0 0 0 1px rgba(212,175,55,0.5), 0 0 40px 8px rgba(212,175,55,0.12), 0 8px 32px rgba(0,0,0,0.5); }
        }

        .step-card {
          position: relative;
          border-radius: 16px;
          padding: 28px 28px 32px 28px;
          cursor: pointer;
          transition:
            background 0.3s ease,
            border-color 0.3s ease,
            box-shadow 0.35s ease,
            transform 0.2s ease;
          overflow: hidden;
        }

        .step-card:hover {
          transform: translateY(-3px);
        }

        .step-card.active {
          box-shadow:
            0 0 0 1px rgba(212,175,55,0.5),
            0 0 40px 8px rgba(212,175,55,0.12),
            0 8px 32px rgba(0,0,0,0.5);
        }

        .step-card.hovered {
          box-shadow:
            0 0 0 1px rgba(212,175,55,0.25),
            0 0 28px 5px rgba(212,175,55,0.08),
            0 8px 24px rgba(0,0,0,0.4);
        }

        .step-card.clicked {
          animation: glowPulse 0.6s ease-out forwards;
        }

        /* Top radial glow overlay */
        .step-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 16px;
          background: radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.11) 0%, transparent 68%);
          opacity: 0;
          transition: opacity 0.35s ease;
          pointer-events: none;
          z-index: 0;
        }
        .step-card.active::before,
        .step-card.hovered::before {
          opacity: 1;
        }

        /* Bottom green shimmer line on active */
        .step-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 18%;
          right: 18%;
          height: 1.5px;
          border-radius: 999px;
          background: linear-gradient(90deg, transparent, #d4af37, transparent);
          opacity: 0;
          transition: opacity 0.35s ease;
          pointer-events: none;
        }
        .step-card.active::after {
          opacity: 1;
        }

        /* Keep card content above pseudo-elements */
        .step-card > * {
          position: relative;
          z-index: 1;
        }
      `}</style>

      <section
        style={{
          background: '#000000',
          padding: '96px 32px',
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p
              style={{
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.24em',
                color: 'rgba(255,255,255,0.28)',
                textTransform: 'uppercase',
                margin: '0 0 20px 0',
              }}
            >
              03 / Onboarding
            </p>
            <h2
              style={{
                fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)',
                fontWeight: 900,
                color: '#ffffff',
                letterSpacing: '-0.025em',
                lineHeight: 1.08,
                margin: 0,
              }}
            >
              Three steps.{' '}
              <span style={{ color: '#d4af37' }}>You're live by the open.</span>
            </h2>
          </div>

          {/* Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px',
            }}
          >
            {steps.map(({ num, icon: Icon, title, desc }, idx) => {
              const isActive = activeCard === idx
              const isHovered = hoveredCard === idx
              const isClicked = clickedCard === idx
              const glowing = isGlowing(idx)

              let cardClass = 'step-card'
              if (isClicked) cardClass += ' clicked'
              else if (isActive) cardClass += ' active'
              else if (isHovered) cardClass += ' hovered'

              return (
                <div
                  key={num}
                  className={cardClass}
                  onClick={() => handleClick(idx)}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    background: glowing ? '#0d120e' : '#0d0d0d',
                    border: `1.5px solid ${
                      isActive
                        ? '#d4af37'
                        : isHovered
                        ? 'rgba(212,175,55,0.35)'
                        : 'rgba(255,255,255,0.08)'
                    }`,
                  }}
                >
                  {/* Top row: number circle + icon */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '32px',
                    }}
                  >
                    {/* Solid green circle */}
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        background: '#d4af37',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                        fontWeight: 900,
                        color: '#000000',
                        flexShrink: 0,
                        transition: 'box-shadow 0.3s ease',
                        boxShadow: glowing
                          ? '0 0 20px 6px rgba(212,175,55,0.5)'
                          : '0 0 0 0 transparent',
                      }}
                    >
                      {num}
                    </div>

                    {/* Corner icon */}
                    <Icon
                      size={22}
                      strokeWidth={1.5}
                      style={{
                        color: glowing ? '#d4af37' : 'rgba(255,255,255,0.22)',
                        transition: 'color 0.3s ease, filter 0.3s ease',
                        filter: glowing
                          ? 'drop-shadow(0 0 7px rgba(212,175,55,0.75))'
                          : 'none',
                      }}
                    />
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontSize: '17px',
                      fontWeight: 800,
                      color: '#ffffff',
                      margin: '0 0 12px 0',
                      lineHeight: 1.2,
                    }}
                  >
                    {title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: '14px',
                      lineHeight: 1.7,
                      color: glowing
                        ? 'rgba(255,255,255,0.58)'
                        : 'rgba(255,255,255,0.45)',
                      margin: 0,
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}