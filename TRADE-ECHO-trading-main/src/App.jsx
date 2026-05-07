import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import HomePage from '@/pages/HomePage'
import PricingPage from '@/pages/PricingPage'
import EdgePage from '@/pages/EdgePage'
import AboutPage from '@/pages/AboutPage'
import FAQPage from '@/pages/FAQPage'
import SignInPage from '@/pages/SignInPage'
import SignUpPage from '@/pages/SignUpPage'
import WhatIsTradeEcho from './pages/WhatIsTradeEcho'
import PlatformSection from "./components/home/PlatformSection";
import CopyTradingPage from "./pages/CopyTradingPage";
import OptionFlowPage from './pages/OptionFlowPage'
import DealerEdgePage from './pages/DealerEdgePage'
import DarkpoolPage from './pages/DarkpoolPage'
import AlgoEdgePage from './pages/AlgoEdgePage'
import CortexPage from './pages/CortexPage'
export default function App() {
  return (
    <Routes>
      {/* Auth pages – no navbar/footer */}
      <Route path="/auth/login"  element={<SignInPage />} />
      <Route path="/auth/signup" element={<SignUpPage />} />

      {/* Main site with Layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/platform" element={<PlatformSection />} />
        <Route path="/pricing"            element={<PricingPage />} />
        <Route path="/edge"               element={<EdgePage />} />
        <Route path="/about"              element={<AboutPage />} />
        <Route path="/faq"                element={<FAQPage />} />
        <Route path="/what-is-trade-echo" element={<WhatIsTradeEcho />} />
        <Route path="/features/automate-strategy-execution" element={<CopyTradingPage />} />

        <Route path="/features/optionflow" element={<OptionFlowPage />} />
<Route path="/features/dealeredge" element={<DealerEdgePage />} />
<Route path="/features/darkpool" element={<DarkpoolPage />} />
<Route path="/features/algoedge" element={<AlgoEdgePage />} />
<Route path="/features/cortex" element={<CortexPage />} />
      </Route>
    </Routes>
  )
}