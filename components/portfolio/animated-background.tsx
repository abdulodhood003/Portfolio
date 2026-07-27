'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useLoading } from './loading-context'

export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false)
  const { isLoaded } = useLoading()
  const cursorLightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Cursor-following radial light (uses CSS vars + RAF for perf)
  useEffect(() => {
    if (!isLoaded) return
    const el = cursorLightRef.current
    if (!el) return

    let raf = 0
    let cx = window.innerWidth / 2
    let cy = window.innerHeight / 2
    let tcx = cx
    let tcy = cy

    const onMove = (e: MouseEvent) => {
      tcx = e.clientX
      tcy = e.clientY
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const tick = () => {
      // Spring-like interpolation toward target
      cx = lerp(cx, tcx, 0.08)
      cy = lerp(cy, tcy, 0.08)
      el.style.setProperty('--cx', `${cx}px`)
      el.style.setProperty('--cy', `${cy}px`)
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [isLoaded])

  // Generate deterministic particles to avoid hydration mismatch
  const particles = Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    left: `${(i * 17) % 100}%`,
    top: `${(i * 23) % 100}%`,
    duration: 15 + (i % 15),
    delay: (i % 10) * 0.5,
    size: 2 + (i % 4),
  }))

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base wash */}
      <div className="absolute inset-0 bg-background" />

      {/* aurora blobs */}
      <div
        className="aurora-blob absolute -top-40 -left-20 h-[38rem] w-[38rem] rounded-full bg-primary/20 blur-[110px]"
        style={{ animationDuration: '25s' }}
      />
      <div
        className="aurora-blob absolute top-1/4 -right-24 h-[34rem] w-[34rem] rounded-full bg-accent/20 blur-[110px]"
        style={{ animationDelay: '-10s', animationDuration: '30s' }}
      />
      <div
        className="aurora-blob absolute bottom-0 left-1/3 h-[30rem] w-[30rem] rounded-full bg-primary/15 blur-[110px]"
        style={{ animationDelay: '-15s', animationDuration: '28s' }}
      />
      {/* 4th diagonal blob for richer gradient mesh */}
      <div
        className="aurora-blob absolute top-2/3 right-1/4 h-[24rem] w-[24rem] rounded-full bg-accent/10 blur-[100px]"
        style={{ animationDelay: '-7s', animationDuration: '32s' }}
      />

      {/* Cursor radial light — very subtle, follows pointer */}
      {isLoaded && (
        <div
          ref={cursorLightRef}
          className="cursor-light"
        />
      )}

      {/* Particles Layer */}
      {mounted && isLoaded && (
        <div className="absolute inset-0 opacity-40">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ y: 0, opacity: 0 }}
              animate={{
                y: -500,
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: 'linear',
              }}
              className="absolute rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.8)]"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
              }}
            />
          ))}
        </div>
      )}

      {/* subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,var(--background)_100%)]" />
    </div>
  )
}
