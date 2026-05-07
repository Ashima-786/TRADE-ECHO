import { useState, useRef, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
  ChevronDown,
  Activity,
  BarChart2,
  Layers,
  Cpu,
  Brain,
  Copy,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react'

const features = [
  {
    icon: Activity,
    label: 'OptionFlow',
    desc: 'Institutional options flow, tiered',
    href: '/features/optionflow',
  },
  {
    icon: BarChart2,
    label: 'DealerEdge',
    desc: 'GEX heatmaps and dealer positioning',
    href: '/features/dealeredge',
  },
  {
    icon: Layers,
    label: 'Darkpool',
    desc: 'Off-exchange prints on the tape',
    href: '/features/darkpool',
  },
  {
    icon: Cpu,
    label: 'AlgoEdge',
    desc: 'Algorithmic pattern detection',
    href: '/features/algoedge',
  },
  {
    icon: Brain,
    label: 'Cortex',
    desc: 'AI chat tied to your live flow',
    href: '/features/cortex',
  },
  {
    icon: Copy,
    label: 'Automate Strategy Execution',
    desc: 'Mirror pilots in your brokerage',
    href: '/features/automate-strategy-execution',
  }
]

export default function Navbar() {
  const [featuresOpen, setFeaturesOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setFeaturesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-white font-black text-lg tracking-tight">
            TRADE <span className="text-brand-green">ECHO</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {/* Features dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              className="nav-link flex items-center gap-1"
              onClick={() => setFeaturesOpen((v) => !v)}
              aria-expanded={featuresOpen}
            >
              Features
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${featuresOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {featuresOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 card-dark shadow-2xl shadow-black/60 animate-slide-down p-2 z-50">
                {features.map(({ icon: Icon, label, desc, href }) => (
                  <a
                    key={label}
                    href={href}
                    onClick={() => setFeaturesOpen(false)}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-brand-green/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-green/20 transition-colors">
                      <Icon size={15} className="text-brand-green" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{label}</p>
                      <p className="text-xs text-white/50 mt-0.5">{desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

          <NavLink to="/pricing" className="nav-link">Pricing</NavLink>
          <NavLink to="/edge" className="nav-link">Edge</NavLink>
          <NavLink to="/about" className="nav-link">About</NavLink>
          <NavLink to="/faq" className="nav-link">FAQ</NavLink>
          <a
            href="https://discord.gg/tradeecho"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link flex items-center gap-1"
          >
            Discord <ExternalLink size={11} className="opacity-50" />
          </a>
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/auth/login" className="nav-link">Sign in</Link>
          <Link to="/pricing" className="btn-primary text-sm">
            Start Pro · $199/mo
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white/70 hover:text-white"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black border-t border-white/5 px-4 pb-4 animate-slide-down">
          <div className="pt-4 space-y-1">
            <p className="text-xs text-white/30 font-semibold uppercase tracking-widest px-2 mb-2">
              Features
            </p>
            {features.map(({ icon: Icon, label, desc, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-white/5 transition-colors"
              >
                <Icon size={16} className="text-brand-green" />
                <span className="text-sm text-white">{label}</span>
              </a>
            ))}
            <div className="h-px bg-white/5 my-3" />
            {[
              { label: 'Pricing', to: '/pricing' },
              { label: 'Edge', to: '/edge' },
              { label: 'About', to: '/about' },
              { label: 'FAQ', to: '/faq' },
            ].map(({ label, to }) => (
              <NavLink
                key={label}
                to={to}
                onClick={() => setMobileOpen(false)}
                className="block px-2 py-2.5 text-sm text-white/70 hover:text-white"
              >
                {label}
              </NavLink>
            ))}
            <div className="h-px bg-white/5 my-3" />
            <Link
              to="/auth/login"
              onClick={() => setMobileOpen(false)}
              className="block px-2 py-2.5 text-sm text-white/70 hover:text-white"
            >
              Sign in
            </Link>
            <Link
              to="/pricing"
              onClick={() => setMobileOpen(false)}
              className="btn-primary block text-center text-sm mt-2"
            >
              Start Pro · $199/mo
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
