// pages/PricingPage.jsx

import { useEffect } from 'react'
import {
  PricingHero,
  PricingCards,
  BillingBanner,
  ToolkitGrid,
  FaqSection,
  GetStartedCTA,
  injectStyles,
} from '../components/Pricing/PricingPage'

export default function PricingPage() {
  useEffect(() => { injectStyles() }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#000', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <PricingHero />    {/* 01 Hero + 02 Value Snapshot */}
      <PricingCards />   {/* 03 Plans */}
      <BillingBanner />  {/* 04 Billing */}
      <ToolkitGrid />    {/* 05 Toolkit */}
      <FaqSection />     {/* 06 Questions */}
      <GetStartedCTA />  {/* 07 Get Started */}
    </div>
  )
}