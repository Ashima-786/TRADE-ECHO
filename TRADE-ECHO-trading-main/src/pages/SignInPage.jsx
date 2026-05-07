import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Eye, EyeOff } from 'lucide-react'

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)
  const [form, setForm] = useState({ email: '', password: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: wire up authentication
    console.log('Sign in:', form)
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      {/* Candlestick background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => {
          const h = 20 + Math.random() * 80
          const isGreen = Math.random() > 0.5
          return (
            <div
              key={i}
              className="absolute bottom-0 w-[2px] opacity-20"
              style={{
                left: `${(i / 40) * 100}%`,
                height: `${h}%`,
                backgroundColor: isGreen ? '#d4af37' : '#9ca3af',
              }}
            />
          )
        })}
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/">
            <span className="text-white font-black text-2xl tracking-tight">
              TRADE <span className="text-brand-green">ECHO</span>
            </span>
            <p className="text-white/30 text-xs mt-1">WHERE TRADING MEETS COMMUNITY</p>
          </Link>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-8 border border-brand-green/20" style={{ backgroundColor: '#0d2112' }}>
          <h1 className="text-2xl font-bold text-white text-center mb-1">Sign In</h1>
          <p className="text-white/50 text-sm text-center mb-8">
            Welcome back! Please log in to access your account.
          </p>

          <div className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-white mb-1.5">
                Email <span className="text-[#9ca3af]">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="input-dark pr-10"
                  required
                />
                <Mail size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-white mb-1.5">
                Password <span className="text-[#9ca3af]">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  className="input-dark pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <div className="flex justify-end mt-1.5">
                <a href="#" className="text-xs text-brand-green hover:text-brand-green-bright">
                  Forgot Password?
                </a>
              </div>
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 accent-brand-green rounded"
              />
              <span className="text-sm text-white/70">Remember Me</span>
            </label>

            {/* Sign In button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-brand-green text-black font-bold py-3 rounded-xl hover:bg-brand-green-bright transition-colors"
            >
              Sign In
            </button>

            {/* Divider */}
            <div className="relative flex items-center gap-3">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-xs text-white/30">or</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Google */}
            <button className="w-full bg-brand-green text-black font-bold py-3 rounded-xl hover:bg-brand-green-bright transition-colors flex items-center justify-center gap-2">
              <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            {/* Apple */}
            <button className="w-full bg-brand-green text-black font-bold py-3 rounded-xl hover:bg-brand-green-bright transition-colors flex items-center justify-center gap-2">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Continue with Apple
            </button>
          </div>

          <p className="text-center text-sm text-white/50 mt-6">
            Don't have an account?{' '}
            <Link to="/auth/signup" className="text-brand-green hover:text-brand-green-bright font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
