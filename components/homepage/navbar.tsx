"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

interface NavbarProps {
  onSignup: () => void
}

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#process", label: "Process" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faqs", label: "FAQs" },
  { href: "#contact", label: "Contact" },
  { href: "#signup", label: "Signup" },
]

export function Navbar({ onSignup }: NavbarProps) {
  const [active, setActive] = useState<string>("#home")

  useEffect(() => {
    const handler = () => {
      const positions = navItems
        .map((item) => {
          const el = document.querySelector(item.href) as HTMLElement | null
          if (!el) return { href: item.href, top: Number.POSITIVE_INFINITY }
          const rect = el.getBoundingClientRect()
          return { href: item.href, top: Math.abs(rect.top) }
        })
        .sort((a, b) => a.top - b.top)
      if (positions[0]) setActive(positions[0].href)
    }
    handler()
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 right-0 z-50"
      style={{
        background:
          "radial-gradient(120% 80% at 50% -40%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.7) 100%), #0b0b0b",
      }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between text-white">
        <a href="#home" className="pointer-events-auto inline-flex items-center gap-2 text-foreground/90">
          <div className="w-6 h-6 rounded-md bg-accent" />
          <span className="font-extrabold tracking-tight">Flike</span>
        </a>

        <nav className="pointer-events-auto">
          <div className="mx-auto flex items-center gap-1 rounded-full border border-white/10 bg-black/40 px-2 py-1 shadow-[0_0_30px_rgba(255,211,105,0.12),inset_0_1px_0_0_rgba(255,211,105,0.08)] backdrop-blur">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  if (item.label === "Signup") {
                    e.preventDefault()
                    onSignup()
                  }
                }}
                className={
                  "relative rounded-full px-4 py-2 text-sm transition-colors " +
                  (active === item.href
                    ? "bg-[#ffd369]/15 text-[#ffd369]"
                    : "text-white/70 hover:text-white")
                }
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        <div className="pointer-events-auto">
          <Button onClick={onSignup} className="bg-[#ffd369] text-black hover:bg-[#ffd369]/90">
            Signup
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Navbar


