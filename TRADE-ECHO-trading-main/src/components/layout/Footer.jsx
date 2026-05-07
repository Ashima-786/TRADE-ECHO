import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <span className="text-white font-black text-lg tracking-tight">
              TRADE <span className="text-brand-green">ECHO</span>
            </span>
            <p className="text-white/40 text-xs mt-2 leading-relaxed">
              Where trading meets community.
            </p>
          </div>

          {/* Product */}
          <div>
            <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">
              Product
            </p>
            <ul className="space-y-2">
              {['OptionFlow', 'DealerEdge', 'Darkpool', 'AlgoEdge', 'Cortex', 'Copy Trading'].map(
                (item) => (
                  <li key={item}>
                    <a href="/#" className="text-sm text-white/50 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">
              Company
            </p>
            <ul className="space-y-2">
              {[
                { label: 'Pricing', to: '/pricing' },
                { label: 'Edge', to: '/edge' },
                { label: 'About', to: '/about' },
                { label: 'FAQ', to: '/faq' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">
              Community
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://discord.gg/tradeecho"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-1"
                >
                  Discord <ExternalLink size={11} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            © {new Date().getFullYear()} Trade Echo. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-white/20 hover:text-white/50 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-white/20 hover:text-white/50 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
