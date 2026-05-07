/**
 * HomePage — Parent component
 *
 * Composed of child sections, each in src/components/home/:
 *
 *  1. HeroSection         — Headline, CTAs, dashboard preview, ticker tape
 *  2. PlatformSection     — Six professional-grade tools grid (01 / Platform)
 *  3. MathSection         — Cost comparison (02 / The Math)
 *  4. OnboardingSection   — Three-step flow (03 / Onboarding)
 *  5. CompareSection      — Feature table vs competitors (04 / Compare)
 *  6. MobileSection       — Mobile app section (05 / Mobile)
 *  7. TestimonialsSection — User quotes + stats (06 / Users)
 *  8. FaqSection          — Accordion FAQ (07 / Questions)
 *  9. CtaSection          — Final CTA + app badges (08 / Get started)
 */

import HeroSection from '@/components/home/HeroSection'
import PlatformSection from '@/components/home/PlatformSection'
import MathSection from '@/components/home/MathSection'
import OnboardingSection from '@/components/home/OnboardingSection'
import CompareSection from '@/components/home/CompareSection'
import MobileSection from '@/components/home/MobileSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import FaqSection from '@/components/home/FaqSection'
import CtaSection from '@/components/home/CtaSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PlatformSection />
      <MathSection />
      <OnboardingSection />
      <CompareSection />
      <MobileSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
    </>
  )
}
