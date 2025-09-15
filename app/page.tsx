"use client"
import { useState } from "react"
import { AuthProvider, useAuth } from "@/contexts/auth-context"
import { ThemeProvider } from "@/components/theme-provider"
import LoginForm from "@/components/auth/login-form"
import Dashboard from "@/components/dashboard/dashboard"
import { Homepage } from "@/components/homepage/homepage"
import ClickSpark from "@/components/ClickSpark";

function AppContent() {
  const { user, loading } = useAuth()
  const [showApp, setShowApp] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!showApp && !user) {
    return <Homepage onGetStarted={() => setShowApp(true)} onLogin={() => setShowApp(true)} />
  }

  return <div className="min-h-screen bg-background">{user ? <Dashboard /> : <LoginForm />}</div>
}

export default function Home() {
  return (
    <ClickSpark sparkColor="#fff" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </ClickSpark>
  )
}
