"use client"

import { FiCheckCircle as CheckCircle } from "react-icons/fi"
import { motion } from "framer-motion"

const benefits = [
  {
    title: "Simple & Intuitive",
    description:
      "No complex setup or learning curve. Start tracking expenses in seconds with our user-friendly interface.",
  },
  {
    title: "Bank-Level Security",
    description:
      "Your financial data is protected with enterprise-grade encryption and secure authentication protocols.",
  },
  {
    title: "Cross-Platform Access",
    description: "Access your expense data anywhere, anytime. Works seamlessly on desktop, tablet, and mobile devices.",
  },
  {
    title: "Complete Privacy",
    description: "Your data belongs to you. We never sell your information or share it with third parties.",
  },
]

export function BenefitsSection() {
  return (
    <section id="faqs" className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 text-balance">
            Why Choose <span className="text-accent">Our Platform</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Built with your needs in mind, designed for your success
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-4 group"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3 text-balance">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-pretty">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
