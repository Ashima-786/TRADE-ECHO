# Trade Echo — Frontend

> Institutional-grade options intelligence. One platform.

React + Vite + Tailwind CSS frontend for [tradeecho.com](https://tradeecho.com).

---

## Tech Stack

| Layer | Library |
|---|---|
| Framework | React 18 |
| Build tool | Vite 5 |
| Routing | React Router v6 |
| Styling | Tailwind CSS v3 |
| Icons | Lucide React |
| Utility | clsx |

---

## Project Structure

```
tradeecho/
├── public/                  # Static assets (favicon, og images)
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.jsx   # Wraps all main pages (Navbar + Footer + Outlet)
│   │   │   ├── Navbar.jsx   # Top nav with Features dropdown + mobile menu
│   │   │   └── Footer.jsx   # Site-wide footer
│   │   ├── features/        # Feature-specific components (add here)
│   │   └── ui/              # Reusable UI primitives (Button, Badge, etc.)
│   ├── pages/
│   │   ├── HomePage.jsx     # Hero + Six Tools grid + The Math comparison
│   │   ├── PricingPage.jsx  # Single Pro plan card
│   │   ├── EdgePage.jsx     # Edge / value prop page
│   │   ├── AboutPage.jsx    # About + stats
│   │   ├── FAQPage.jsx      # Accordion FAQ
│   │   ├── SignInPage.jsx   # /auth/login — dark green card, no Layout
│   │   └── SignUpPage.jsx   # /auth/signup — dark green card, no Layout
│   ├── hooks/               # Custom React hooks (add here)
│   ├── lib/                 # Utilities, API clients (add here)
│   ├── App.jsx              # Route definitions
│   ├── main.jsx             # ReactDOM entry point
│   └── index.css            # Tailwind directives + global styles
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Install & Run

```bash
# 1. Clone the repo
git clone https://github.com/your-org/tradeecho.git
cd tradeecho

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

The app will be available at **http://localhost:5173**

### Build for Production

```bash
npm run build       # outputs to /dist
npm run preview     # preview the production build locally
```

---

## Routes

| Path | Component | Layout |
|---|---|---|
| `/` | `HomePage` | ✅ Navbar + Footer |
| `/pricing` | `PricingPage` | ✅ Navbar + Footer |
| `/edge` | `EdgePage` | ✅ Navbar + Footer |
| `/about` | `AboutPage` | ✅ Navbar + Footer |
| `/faq` | `FAQPage` | ✅ Navbar + Footer |
| `/auth/login` | `SignInPage` | ❌ Standalone (no nav) |
| `/auth/signup` | `SignUpPage` | ❌ Standalone (no nav) |

---

## Design System

### Colors

| Token | Value | Usage |
|---|---|---|
| `brand-green` | `#22c55e` | Primary CTA, accents, icons |
| `brand-green-bright` | `#4ade80` | Hover states |
| `brand-green-dim` | `#16a34a` | Subtle green |
| `brand-dark` | `#0a0a0a` | Page background |
| `brand-dark-card` | `#111111` | Card backgrounds |
| `brand-dark-border` | `#1a1a1a` | Card borders |

### Reusable CSS Classes (defined in `index.css`)

```css
.btn-primary      /* Green pill CTA button */
.btn-secondary    /* Ghost/outline pill button */
.card-dark        /* Dark card with border */
.grid-bg          /* Subtle grid background pattern */
.nav-link         /* Navbar anchor style */
.input-dark       /* Dark themed form input */
.text-gradient-green  /* Green gradient text */
```

### Typography
- Font: **Inter** (Google Fonts) — weights 400, 500, 600, 700, 800, 900
- Headings: `font-black` (900) with tight tracking
- Body: `font-medium` or `font-normal` at `text-white/60`–`text-white/70`

---

## Features Dropdown — Adding/Editing Items

Edit the `features` array in `src/components/layout/Navbar.jsx`:

```js
const features = [
  {
    icon: Activity,          // Lucide icon component
    label: 'OptionFlow',     // Display name
    desc: 'Institutional options flow, tiered',  // Subtitle
    href: '/#optionflow',    // Link — use anchor for same-page sections
  },
  // ... add more here
]
```

---

## Auth Pages

Auth pages (`/auth/login`, `/auth/signup`) are intentionally excluded from the main Layout so they render full-screen without the Navbar and Footer — matching the sign-in design reference.

The `handleSubmit` functions are **stubs** — wire them up to your auth provider (Supabase, Firebase, custom API, etc.) in `src/lib/auth.js`.

---

## Adding New Pages

1. Create `src/pages/NewPage.jsx`
2. Import and add a `<Route>` in `src/App.jsx`:

```jsx
import NewPage from '@/pages/NewPage'

// Inside <Routes>, within the Layout route:
<Route path="/new-page" element={<NewPage />} />
```

3. Add a link in `Navbar.jsx` or `Footer.jsx` as needed.

---

## Path Aliases

`@/` resolves to `src/` — configured in `vite.config.js`:

```js
resolve: {
  alias: { '@': path.resolve(__dirname, './src') }
}
```

Use it like: `import Navbar from '@/components/layout/Navbar'`

---

## External Links

| Destination | URL |
|---|---|
| Discord | https://discord.gg/tradeecho |
| Live site | https://tradeecho.com |
| App (auth) | https://app.tradeecho.com |

---

## Scripts

```bash
npm run dev       # Start local dev server (http://localhost:5173)
npm run build     # Production build → /dist
npm run preview   # Preview /dist locally
```

---

## Contributing

1. Branch off `main`: `git checkout -b feat/your-feature`
2. Follow the existing component patterns
3. Use Tailwind utility classes — avoid inline styles unless necessary
4. Use Lucide icons only — no other icon libraries
5. Keep new components in the appropriate folder (`layout/`, `features/`, `ui/`)
6. Open a PR with a clear description

---

## License

Private — © Trade Echo. All rights reserved.
