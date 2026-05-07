import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export default function CortexCTA() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [hoverGreen, setHoverGreen] = useState(false)
  const [hoverWhite, setHoverWhite] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.2 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <style>{`
        @keyframes glowBreath {
          0%, 100% { box-shadow: 0 0 60px rgba(212,175,55,0.12), inset 0 0 60px rgba(212,175,55,0.04); }
          50%       { box-shadow: 0 0 100px rgba(212,175,55,0.22), inset 0 0 80px rgba(212,175,55,0.08); }
        }
        @keyframes ctaFadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cta-section-wrap {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .cta-section-wrap.cta-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .cta-label-anim {
          opacity: 0;
          animation: none;
        }
        .cta-visible .cta-label-anim {
          animation: ctaFadeUp 0.6s ease 0.1s forwards;
        }
        .cta-heading-anim {
          opacity: 0;
        }
        .cta-visible .cta-heading-anim {
          animation: ctaFadeUp 0.65s ease 0.2s forwards;
        }
        .cta-sub-anim {
          opacity: 0;
        }
        .cta-visible .cta-sub-anim {
          animation: ctaFadeUp 0.65s ease 0.3s forwards;
        }
        .cta-btns-anim {
          opacity: 0;
        }
        .cta-visible .cta-btns-anim {
          animation: ctaFadeUp 0.65s ease 0.42s forwards;
        }
      `}</style>

      <section
        style={{
          padding: '60px 32px 100px',
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        <div
          ref={ref}
          className={`cta-section-wrap${visible ? ' cta-visible' : ''}`}
          style={{
            maxWidth: '860px',
            margin: '0 auto',
            borderRadius: '20px',
            background: 'linear-gradient(160deg, #0d1a0e 0%, #091209 60%, #050d06 100%)',
            border: '1px solid rgba(212,175,55,0.22)',
            padding: '72px 48px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            animation: visible ? 'glowBreath 4s ease-in-out infinite' : 'none',
          }}
        >
          {/* Top radial sandal glow blob */}
          <div
            style={{
              position: 'absolute',
              top: '-60px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '500px',
              height: '260px',
              background: 'radial-gradient(ellipse, rgba(212,175,55,0.18) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Bottom subtle glow */}
          <div
            style={{
              position: 'absolute',
              bottom: '-40px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '300px',
              height: '140px',
              background: 'radial-gradient(ellipse, rgba(212,175,55,0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Label */}
            <p
              className="cta-label-anim"
              style={{
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.26em',
                color: 'rgba(255,255,255,0.28)',
                textTransform: 'uppercase',
                marginBottom: '22px',
              }}
            >
              06 / Get Started
            </p>

            {/* Heading */}
            <h2
              className="cta-heading-anim"
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
                fontWeight: 900,
                lineHeight: 1.07,
                letterSpacing: '-0.03em',
                color: '#ffffff',
                marginBottom: '18px',
              }}
            >
              Start asking{' '}
              <span style={{ color: '#d4af37' }}>your terminal</span>{' '}
              today.
            </h2>

            {/* Subtext */}
            <p
              className="cta-sub-anim"
              style={{
                fontSize: '15px',
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.5)',
                maxWidth: '460px',
                margin: '0 auto 36px',
              }}
            >
              Included in Trade Echo Pro with OptionFlow, DealerEdge, Darkpool, AlgoEdge,
              and Copy Trading. $199/mo. Cancel anytime.
            </p>

            {/* Buttons */}
            <div
              className="cta-btns-anim"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '14px',
                flexWrap: 'wrap',
              }}
            >
              {/* Primary sandal button → /pricing */}
              <Link
                to="/pricing"
                onMouseEnter={() => setHoverGreen(true)}
                onMouseLeave={() => setHoverGreen(false)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '13px 26px',
                  borderRadius: '999px',
                  background: '#d4af37',
                  color: '#000000',
                  fontWeight: 800,
                  fontSize: '14.5px',
                  textDecoration: 'none',
                  letterSpacing: '-0.01em',
                  boxShadow: hoverGreen
                    ? '0 0 48px rgba(212,175,55,0.55)'
                    : '0 0 28px rgba(212,175,55,0.3)',
                  transform: hoverGreen ? 'scale(1.04)' : 'scale(1)',
                  filter: hoverGreen ? 'brightness(1.1)' : 'brightness(1)',
                  transition: 'box-shadow 0.25s ease, transform 0.2s ease, filter 0.2s ease',
                }}
              >
                Start asking your terminal →
              </Link>

              {/* Secondary white outline button → /pricing */}
              <Link
                to="/pricing"
                onMouseEnter={() => setHoverWhite(true)}
                onMouseLeave={() => setHoverWhite(false)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '13px 26px',
                  borderRadius: '999px',
                  background: hoverWhite ? 'rgba(255,255,255,0.07)' : 'transparent',
                  border: `1.5px solid ${hoverWhite ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.28)'}`,
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '14.5px',
                  textDecoration: 'none',
                  letterSpacing: '-0.01em',
                  transition: 'background 0.22s ease, border-color 0.22s ease, transform 0.2s ease',
                  transform: hoverWhite ? 'scale(1.02)' : 'scale(1)',
                }}
              >
                View all plans
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}