"use client"

import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { FiPlusCircle as PlusCircle, FiTarget as Target, FiBarChart2 as BarChart3, FiShield as Shield } from "react-icons/fi"
import { motion, useInView } from "framer-motion"

const features = [
  {
    icon: PlusCircle,
    title: "Add & Manage Expenses",
    description:
      "Quickly add expenses with smart categorization and detailed tracking for complete financial visibility.",
  },
  {
    icon: Target,
    title: "Budget Tracking & Alerts",
    description: "Set monthly budgets and receive intelligent alerts when you're approaching or exceeding your limits.",
  },
  {
    icon: BarChart3,
    title: "Visual Reports with Charts",
    description:
      "Beautiful charts and analytics help you understand spending patterns and make informed financial decisions.",
  },
  {
    icon: Shield,
    title: "Secure Login & Cloud Sync",
    description: "Your financial data is encrypted and securely stored, accessible across all your devices seamlessly.",
  },
]

export function FeaturesSection() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-200px" })
  const cardWidth = 288 // w-72
  const gap = 32 // gap-8
  const totalCardWidth = cardWidth + gap

  return (
    <section id="features" className="py-24 bg-black">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 text-balance">
            Everything You Need to <span className="text-accent">Master Your Money</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Powerful features designed to make expense tracking effortless and insightful
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div
          ref={containerRef}
          className="relative flex h-96 items-center justify-center"
          style={{ perspective: "1200px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="absolute"
              initial={{ x: 0, scale: 0.8 }}
              animate={
                isInView
                  ? { x: (index - (features.length - 1) / 2) * totalCardWidth, scale: 1 }
                  : {}
              }
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.1 }}
              style={{ zIndex: features.length - index, transformStyle: "preserve-3d" }}
            >
              <Card className="w-72 h-80 flex flex-col justify-center group transition-colors duration-300 border-border/50 hover:border-accent/50 bg-white/5 backdrop-blur-sm">
                <CardContent className="p-8 text-center flex flex-col justify-center h-full">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 text-accent rounded-2xl mb-6 group-hover:bg-accent/20 transition-colors">
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4 text-balance">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-pretty">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
