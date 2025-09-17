"use client"

import { Button } from "@/components/ui/button"
import { FiArrowRight as ArrowRight, FiTrendingUp as TrendingUp } from "react-icons/fi";
import { motion, useScroll, useTransform } from "framer-motion"
import "./hero-stars.css"
import HeroParticles from "./HeroParticles"
import HeroLaptop from "./HeroLaptop"
import { useRef } from "react"

interface HeroSectionProps {
  onGetStarted: () => void
  onLogin: () => void
}

export function HeroSection({ onGetStarted, onLogin }: HeroSectionProps) {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const laptopY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"])

  return (
    <section ref={heroRef} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{background:"radial-gradient(120% 80% at 50% 0%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.7) 100%), #0b0b0b"}}>
      {/* Starfield background */}
      <div className="hero-sky">
        <div className="hero-sky__stars" />
        <div className="hero-sky__stars hero-sky__stars--near" />
        <div className="hero-sky__twinkle" />
      </div>
      <div className="hero-grid" />
      <div className="hero-horizon" />
      <HeroParticles />

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-8 mt-6 md:mt-8"
          >
            <TrendingUp className="w-4 h-4" />
            Take control of your finances today
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl font-black text-foreground mb-6 text-balance leading-tight"
          >
            Track Your Expenses, <span className="text-accent">Control Your Future</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 text-pretty max-w-3xl mx-auto leading-relaxed"
          >
            Easily manage your spending, set budgets, and get insights into your finances. Join thousands who've
            transformed their financial habits with our intuitive expense tracker.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 text-lg font-semibold group transition-all duration-300 hover:scale-105"
            >
              Request a Demo
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-16 text-sm text-muted-foreground"
          >
            ✨ No credit card required • 🔒 Your data stays private • 📱 Works on all devices
          </motion.div>

          <motion.div style={{ y: laptopY }}>
            <HeroLaptop />
          </motion.div>
        </motion.div>
      </div>
    </section>
)}
