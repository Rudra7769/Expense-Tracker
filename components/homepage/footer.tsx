"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import {
  LuGithub as Github,
  LuTwitter as Twitter,
  LuLinkedin as Linkedin,
  LuMail as Mail,
} from "react-icons/lu"
import { motion, type Variants } from "framer-motion"

export function Footer(): JSX.Element {
  // cast to Variants via unknown to avoid strict TS shape checks on Transition
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.14, delayChildren: 0.12 },
    },
  } as unknown as Variants

  const itemVariants = {
    hidden: { opacity: 0, y: 26 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 86, damping: 18 },
    },
  } as unknown as Variants

  const socialVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.94 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 16 },
    },
  } as unknown as Variants

  const linkVariants = {
    hidden: { opacity: 0, x: -8 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 250, damping: 20 },
    },
  } as unknown as Variants

  const sentence = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.02 } },
  } as unknown as Variants

  const letter = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0 },
  } as unknown as Variants

  const icons = [Github, Twitter, Linkedin, Mail] as const
  const line = `© ${new Date().getFullYear()} Expenzo. All rights reserved. Built with ❤️ for better financial management.`

  return (
    <footer id="contact" className="bg-card border-t border-border relative overflow-hidden">
      {/* animated background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(90deg, #000000, #1c0030, #002030, #000000)",
          backgroundSize: "200% 200%",
        }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 10, ease: "linear", repeat: Infinity }}
      />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          className="grid md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Brand + Socials */}
          <motion.div className="md:col-span-2" variants={itemVariants}>
            <h3 className="text-2xl font-black text-foreground mb-4">
              Expenzo
            </h3>

            <p className="text-muted-foreground mb-6 max-w-md">
              Take control of your finances with our intuitive expense tracking platform. Simple, secure, and designed for your success.
            </p>

            <div className="flex gap-3">
              {icons.map((Icon, idx) => (
                <motion.div
                  key={idx}
                  className="inline-block"
                  variants={socialVariants}
                  initial="hidden"
                  animate="visible"
                  // inline hover/tap avoids adding hover/tap keys to variants
                  whileHover={{ scale: 1.18 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-accent hover:text-accent-foreground bg-transparent"
                  >
                    {/* button child is icon; if you want an <a> wrap, you can add one */}
                    <Icon className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Product Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-foreground mb-4">Product</h4>
            <ul className="space-y-3 text-muted-foreground">
              {["Features", "Pricing", "Security", "Updates"].map((text) => (
                <li key={text}>
                  <motion.a
                    href="#"
                    className="inline-block hover:text-accent transition-colors"
                    variants={linkVariants}
                    initial="hidden"
                    animate="visible"
                    // inline hover so the variants object remains simple/typed
                    whileHover={{ x: 8, skewX: -8 }}
                  >
                    {text}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-foreground mb-4">Support</h4>
            <ul className="space-y-3 text-muted-foreground">
              {["About", "Contact", "Privacy Policy", "Terms of Service"].map((text) => (
                <li key={text}>
                  <motion.a
                    href="#"
                    className="inline-block hover:text-accent transition-colors"
                    variants={linkVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ x: 8, skewX: -8 }}
                  >
                    {text}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Footer bottom sentence (per-letter animation) */}
        <motion.div
          className="border-t border-border mt-12 pt-8 text-center text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >
          <motion.p variants={sentence} initial="hidden" whileInView="visible">
            {line.split("").map((ch, i) => (
              <motion.span key={`char-${i}`} variants={letter} aria-hidden>
                {ch}
              </motion.span>
            ))}
          </motion.p>
        </motion.div>
      </div>
    </footer>
  )
}
