import { useState, useEffect, useRef } from 'react'

const QA_DATA = [
  {
    question: 'Why did TSLA just flip to short gamma?',
    answer:
      'Dealers hit net negative gamma at 14:28 as put walls at $340 and $335 absorbed aggressive call flow expiring this Friday. Expect amplified moves below $342.',
    sources: [
      { label: 'DEALEREDGE', color: '#d4af37' },
      { label: 'OPTIONFLOW', color: '#d4af37' },
    ],
  },
  {
    question: 'Which names just crossed $1M premium on the ask?',
    answer:
      'Three Golden-tier prints in the last 15 minutes: NVDA 950C at $1.2M, AAPL 250C at $2.4M, MSFT 430C at $1.1M. All aggressive, all unusual relative to 30-day baseline.',
    sources: [
      { label: 'OPTIONFLOW', color: '#d4af37' },
      { label: 'GOLDEN', color: '#d4af37' },
    ],
  },
  {
    question: 'What is the dark pool doing in NVDA today?',
    answer:
      '$847M total notional across 12 prints, all above $20M. Concentrated between 12:40 and 14:15, with $112M block at 14:32 at $894.12. Multi-day accumulation pattern, not distribution.',
    sources: [
      { label: 'DARKPOOL', color: '#d4af37' },
      { label: '24H', color: '#d4af37' },
    ],
  },
]

// Typewriter hook
function useTypewriter(text, speed = 18, active = false) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const idx = useRef(0)

  useEffect(() => {
    if (!active) return
    setDisplayed('')
    setDone(false)
    idx.current = 0
    const interval = setInterval(() => {
      idx.current += 1
      setDisplayed(text.slice(0, idx.current))
      if (idx.current >= text.length) {
        clearInterval(interval)
        setDone(true)
      }
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed, active])

  return { displayed, done }
}

// Cortex icon (crosshair target)
function CortexIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3" />
      <line x1="12" y1="3" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="21" />
      <line x1="3" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="21" y2="12" />
    </svg>
  )
}

// Single QA block
function QABlock({ qa, index, isVisible }) {
  const [phase, setPhase] = useState('idle') // idle | question | answering | done
  const { displayed, done: typeDone } = useTypewriter(qa.answer, 14, phase === 'answering')

  useEffect(() => {
    if (!isVisible) return
    // Stagger start by index
    const delay = index * 900
    const t1 = setTimeout(() => setPhase('question'), delay)
    const t2 = setTimeout(() => setPhase('answering'), delay + 600)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [isVisible, index])

  const showQuestion = phase !== 'idle'
  const showAnswer = phase === 'answering' || phase === 'done'
  const showSources = typeDone

  useEffect(() => {
    if (typeDone) setPhase('done')
  }, [typeDone])

  return (
    <div
      className="w-full max-w-[700px] mx-auto"
      style={{
        opacity: showQuestion ? 1 : 0,
        transform: showQuestion ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
    >
      {/* User bubble */}
      <div className="flex items-center justify-start gap-3 mb-4">
        <div
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
            fontSize: '10px',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.05em',
          }}
        >
          You
        </div>

        <div
          style={{
            background: '#1a1c1e',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            padding: '11px 18px',
            fontSize: '14.5px',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.9)',
            maxWidth: '560px',
            letterSpacing: '-0.01em',
          }}
        >
          {qa.question}
        </div>
      </div>

      {/* Cortex answer bubble */}
      <div
        className="flex items-start gap-3"
        style={{
          opacity: showAnswer ? 1 : 0,
          transform: showAnswer ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s',
        }}
      >
        {/* Cortex avatar */}
        <div
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
          style={{
            background: 'rgba(212,175,55,0.08)',
            border: '1.5px solid rgba(212,175,55,0.3)',
            boxShadow: showAnswer ? '0 0 14px rgba(212,175,55,0.2)' : 'none',
            transition: 'box-shadow 0.4s ease',
          }}
        >
          <CortexIcon />
        </div>

        {/* Answer card */}
        <div
          style={{
            flex: 1,
            background: '#111413',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '14px',
            padding: '18px 22px',
            borderLeft: '2px solid rgba(212,175,55,0.25)',
          }}
        >
          {/* Answer text with typewriter */}
          <p
            style={{
              fontSize: '14.5px',
              lineHeight: 1.72,
              color: 'rgba(255,255,255,0.82)',
              margin: '0 0 14px 0',
              minHeight: '44px',
              letterSpacing: '-0.005em',
            }}
          >
            {displayed}
            {phase === 'answering' && (
              <span
                style={{
                  display: 'inline-block',
                  width: '2px',
                  height: '14px',
                  background: '#d4af37',
                  marginLeft: '2px',
                  verticalAlign: 'middle',
                  animation: 'blink 0.7s step-end infinite',
                }}
              />
            )}
          </p>

          {/* Sources row */}
          <div
            style={{
              opacity: showSources ? 1 : 0,
              transition: 'opacity 0.4s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span
              style={{
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.16em',
                color: 'rgba(255,255,255,0.22)',
                textTransform: 'uppercase',
              }}
            >
              Sources
            </span>
            {qa.sources.map((src, i) => (
              <>
                <span
                  key={src.label}
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    color: src.color,
                    textTransform: 'uppercase',
                  }}
                >
                  {src.label}
                </span>
                {i < qa.sources.length - 1 && (
                  <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '10px' }}>·</span>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Main section
export default function CortexSection() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cortex-heading-animate {
          animation: fadeSlideUp 0.7s ease forwards;
        }
        .cortex-sub-animate {
          animation: fadeSlideUp 0.7s ease 0.15s forwards;
          opacity: 0;
        }
        .cortex-sub2-animate {
          animation: fadeSlideUp 0.7s ease 0.25s forwards;
          opacity: 0;
        }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          minHeight: '100vh',
          padding: '96px 24px 120px',
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        {/* Header */}
        <div className="text-center mb-16">
          <p
            className={isVisible ? 'cortex-heading-animate' : ''}
            style={{
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.26em',
              color: 'rgba(255,255,255,0.28)',
              textTransform: 'uppercase',
              marginBottom: '20px',
              opacity: isVisible ? undefined : 0,
            }}
          >
            02 / In Action
          </p>

          <h2
            className={isVisible ? 'cortex-heading-animate' : ''}
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              margin: '0 auto 20px',
              maxWidth: '740px',
              opacity: isVisible ? undefined : 0,
            }}
          >
            Three questions.{' '}
            <span style={{ color: '#d4af37' }}>Three answers with your data.</span>
          </h2>

          <p
            className={isVisible ? 'cortex-sub-animate' : ''}
            style={{
              fontSize: '15px',
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.45)',
              maxWidth: '520px',
              margin: '0 auto',
            }}
          >
            These aren't canned demos. Cortex reads the same flow you see and writes answers using
            real tickers, real prints, real levels. Your session, your context.
          </p>
        </div>

        {/* QA blocks */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '36px',
            maxWidth: '780px',
            margin: '0 auto',
          }}
        >
          {QA_DATA.map((qa, i) => (
            <QABlock key={i} qa={qa} index={i} isVisible={isVisible} />
          ))}
        </div>
      </section>
    </>
  )
}