"use client"
import { HeroSection } from "./hero-section"
import { FeaturesSection } from "./features-section"
import { DashboardPreview } from "./dashboard-preview"
import { BenefitsSection } from "./benefits-section"
import { Footer } from "./footer"
import { ModeToggle } from "@/components/mode-toggle"
import ClickSpark from "@/components/ClickSpark";

interface HomepageProps {
  onGetStarted: () => void
  onLogin: () => void
}

export function Homepage({ onGetStarted, onLogin }: HomepageProps) {
  return (
    <ClickSpark sparkColor="#fff" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
      <div className="min-h-screen bg-background">
        {/* Header with theme toggle */}
        <header className="fixed top-0 right-0 z-50 p-4">
          <ModeToggle />
        </header>
        {/* Main content */}
        <main>
          <HeroSection onGetStarted={onGetStarted} onLogin={onLogin} />
          <FeaturesSection />
          <DashboardPreview />
          <BenefitsSection />
        </main>
        <Footer />
      </div>
    </ClickSpark>
  )
}
