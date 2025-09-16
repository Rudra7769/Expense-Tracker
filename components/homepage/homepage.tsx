"use client"
import { HeroSection } from "./hero-section"
import { FeaturesSection } from "./features-section"
import { DashboardPreview } from "./dashboard-preview"
import { BenefitsSection } from "./benefits-section"
import { Footer } from "./footer"
import { Navbar } from "./navbar"

interface HomepageProps {
  onGetStarted: () => void
  onLogin: () => void
}

export function Homepage({ onGetStarted, onLogin }: HomepageProps) {
  return (
    <div className="homepage-theme min-h-screen bg-background">
      <Navbar onSignup={onLogin} />

      {/* Main content */}
      <main className="pt-20">
        <HeroSection onGetStarted={onGetStarted} onLogin={onLogin} />
        <FeaturesSection />
        <section id="action">
          <DashboardPreview />
        </section>
        <BenefitsSection />
      </main>

      <Footer />
    </div>
  )
}
