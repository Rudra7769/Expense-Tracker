"use client"

import { Card, CardContent } from "@/components/ui/card"
import { PlusCircle, Target, BarChart3, Shield } from "lucide-react"
import { motion } from "framer-motion"

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
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-border/50 hover:border-accent/50">
                <CardContent className="p-8 text-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                    className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 text-accent rounded-2xl mb-6 group-hover:bg-accent/20 transition-colors"
                  >
                    <feature.icon className="w-8 h-8" />
                  </motion.div>
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
