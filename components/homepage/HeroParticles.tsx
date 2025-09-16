"use client"

import { useEffect, useRef } from "react"

const MAX_PARTICLES = 140
const SPEED = 0.15

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)

    const particles: Array<{ x: number; y: number; vx: number; vy: number; r: number; a: number }> = []

    const init = () => {
      particles.length = 0
      const count = Math.min(MAX_PARTICLES, Math.floor((width * height) / 18000))
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() * 0.8 + 0.2) * (Math.random() < 0.5 ? 1 : -1) * SPEED,
          vy: (Math.random() * 0.8 + 0.2) * (Math.random() < 0.5 ? 1 : -1) * SPEED,
          r: Math.random() * 1.4 + 0.4,
          a: Math.random() * 0.5 + 0.3,
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = "#ffffff"
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < -2) p.x = width + 2
        if (p.x > width + 2) p.x = -2
        if (p.y < -2) p.y = height + 2
        if (p.y > height + 2) p.y = -2

        ctx.globalAlpha = p.a
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      rafRef.current = requestAnimationFrame(draw)
    }

    const onResize = () => {
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
      init()
    }
    const ro = new ResizeObserver(onResize)
    ro.observe(canvas)

    init()
    draw()

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 z-[1] opacity-70" />
}


