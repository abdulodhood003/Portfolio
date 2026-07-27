'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Atom, Hexagon, Server, Database, FileType2, FileCode2, Wind, GitBranch, GitMerge } from 'lucide-react'
import { useLoading } from './loading-context'

const techLogos = [
  { id: 'react',      Icon: Atom,       color: 'text-cyan-400',    glow: 'rgba(34,211,238,0.5)',   label: 'React' },
  { id: 'node',       Icon: Hexagon,    color: 'text-green-400',   glow: 'rgba(74,222,128,0.5)',   label: 'Node.js' },
  { id: 'express',    Icon: Server,     color: 'text-neutral-400', glow: 'rgba(161,161,170,0.4)',  label: 'Express.js' },
  { id: 'mongodb',    Icon: Database,   color: 'text-emerald-400', glow: 'rgba(52,211,153,0.5)',   label: 'MongoDB' },
  { id: 'typescript', Icon: FileType2,  color: 'text-blue-400',    glow: 'rgba(96,165,250,0.5)',   label: 'TypeScript' },
  { id: 'javascript', Icon: FileCode2,  color: 'text-yellow-400',  glow: 'rgba(250,204,21,0.5)',   label: 'JavaScript' },
  { id: 'tailwind',   Icon: Wind,       color: 'text-sky-400',     glow: 'rgba(56,189,248,0.5)',   label: 'Tailwind CSS' },
  { id: 'git',        Icon: GitBranch,  color: 'text-orange-400',  glow: 'rgba(251,146,60,0.5)',   label: 'Git' },
  { id: 'github',     Icon: GitMerge,   color: 'text-white',       glow: 'rgba(255,255,255,0.35)', label: 'GitHub' },
]

export function Preloader() {
  const { isLoaded, setIsLoaded } = useLoading()
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'loading' | 'logos' | 'orb' | 'text' | 'complete'>('loading')
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      // Skip straight to complete for users who prefer reduced motion
      setProgress(100)
      setPhase('complete')
      setIsLoaded(true)
      return
    }

    // Phase 1: Loading bar — 2 seconds
    const loadingDuration = 2000
    const intervalTime = 16 // ~60fps
    const steps = loadingDuration / intervalTime

    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      const t = currentStep / steps
      // Ease-out cubic
      const easedProgress = (1 - Math.pow(1 - t, 3)) * 100
      setProgress(Math.min(easedProgress, 100))

      if (currentStep >= steps) {
        clearInterval(interval)
        setPhase('logos')
      }
    }, intervalTime)

    return () => clearInterval(interval)
  }, [prefersReducedMotion, setIsLoaded])

  useEffect(() => {
    if (prefersReducedMotion) return

    if (phase === 'logos') {
      // Show logos for 1.6s, letting all 9 stagger in + settle
      const timer = setTimeout(() => setPhase('orb'), 1600)
      return () => clearTimeout(timer)
    }
    if (phase === 'orb') {
      // Orb merge for 700ms
      const timer = setTimeout(() => setPhase('text'), 700)
      return () => clearTimeout(timer)
    }
    if (phase === 'text') {
      // Text reveal for 1.1s
      const timer = setTimeout(() => {
        setPhase('complete')
        setIsLoaded(true)
      }, 1100)
      return () => clearTimeout(timer)
    }
  }, [phase, setIsLoaded, prefersReducedMotion])

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: 'easeInOut' } }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        >
          <div className="relative flex flex-col items-center justify-center w-full max-w-2xl h-full">

            {/* ── Phase 1: Loading bar ── */}
            <AnimatePresence mode="wait">
              {phase === 'loading' && (
                <motion.div
                  key="loading"
                  exit={{ opacity: 0, scale: 0.93, filter: 'blur(6px)', transition: { duration: 0.45 } }}
                  className="flex flex-col items-center gap-0"
                >
                  <motion.h1
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
                  >
                    Abdul Odudood
                  </motion.h1>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="mt-3 font-mono text-sm uppercase tracking-widest text-muted-foreground"
                  >
                    MERN Stack Developer
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-12 relative"
                  >
                    {/* Progress track */}
                    <div className="h-0.5 w-64 overflow-hidden rounded-full bg-secondary">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-primary"
                        style={{ width: `${progress}%`, backgroundSize: '200% 100%' }}
                        animate={{ backgroundPosition: ['0% 50%', '100% 50%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                      />
                    </div>
                    {/* Glow under bar */}
                    <motion.div
                      className="absolute -bottom-1 left-0 h-1 rounded-full bg-primary blur-sm opacity-60"
                      style={{ width: `${progress}%` }}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-4 font-mono text-xs tabular-nums text-muted-foreground"
                  >
                    {Math.round(progress)}%
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Phase 2: Tech Stack Logos in a circle ── */}
            <AnimatePresence>
              {phase === 'logos' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-72 h-72 flex items-center justify-center">
                    {/* Center pulse */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: [0, 1.4, 1], opacity: [0, 0.3, 0.15] }}
                      transition={{ duration: 0.8, delay: techLogos.length * 0.09 }}
                      className="absolute h-16 w-16 rounded-full bg-primary blur-xl"
                    />

                    {techLogos.map((tech, i) => {
                      const angle = (i / techLogos.length) * Math.PI * 2 - Math.PI / 2
                      const radius = 105
                      const x = Math.cos(angle) * radius
                      const y = Math.sin(angle) * radius
                      return (
                        <motion.div
                          key={tech.id}
                          initial={{
                            opacity: 0,
                            scale: 0,
                            x: 0,
                            y: 0,
                            rotate: -60 + (i % 2 === 0 ? 1 : -1) * 30,
                          }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                            x,
                            y,
                            rotate: 0,
                          }}
                          exit={{
                            opacity: 0,
                            scale: 0.3,
                            x: 0,
                            y: 0,
                            rotate: i % 2 === 0 ? 45 : -45,
                            filter: 'blur(8px)',
                          }}
                          transition={{
                            duration: 0.55,
                            delay: i * 0.09,
                            type: 'spring',
                            stiffness: 220,
                            damping: 18,
                          }}
                          className={`absolute flex h-14 w-14 items-center justify-center rounded-2xl
                                      bg-secondary/90 backdrop-blur-md border border-white/10 ${tech.color}
                                      cursor-default select-none`}
                          style={{
                            boxShadow: `0 0 20px 4px ${tech.glow}, inset 0 1px 0 rgba(255,255,255,0.08)`,
                          }}
                        >
                          <tech.Icon className="h-6 w-6" />
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              )}
            </AnimatePresence>

            {/* ── Phase 3 & 4: Orb merge → Text reveal ── */}
            <AnimatePresence>
              {(phase === 'orb' || phase === 'text') && (
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Outer glow ring */}
                  <motion.div
                    key="orb-glow"
                    initial={{ scale: 0.3, opacity: 0 }}
                    animate={
                      phase === 'orb'
                        ? { scale: [0.3, 1.6, 1.2], opacity: [0, 0.5, 0.2] }
                        : { scale: 2.2, opacity: 0 }
                    }
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="absolute h-32 w-32 rounded-full bg-primary blur-3xl"
                  />

                  {/* Main orb / pill */}
                  <motion.div
                    key="orb"
                    initial={{ scale: 0, opacity: 0, borderRadius: '100%', width: '80px', height: '80px' }}
                    animate={
                      phase === 'orb'
                        ? {
                            scale: [0, 1.15, 1],
                            opacity: 1,
                            borderRadius: '50%',
                            width: '80px',
                            height: '80px',
                          }
                        : {
                            scale: 1,
                            opacity: 1,
                            borderRadius: '1.5rem',
                            width: '340px',
                            height: '64px',
                          }
                    }
                    exit={{ opacity: 0, scale: 1.08, filter: 'blur(12px)', transition: { duration: 0.5 } }}
                    transition={{
                      duration: phase === 'orb' ? 0.6 : 0.65,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative flex items-center justify-center overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                      boxShadow: '0 0 50px 10px color-mix(in oklch, var(--primary) 50%, transparent)',
                    }}
                  >
                    {/* Inner shimmer sweep */}
                    <motion.div
                      animate={{ x: ['-150%', '150%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                    />

                    <AnimatePresence>
                      {phase === 'text' && (
                        <motion.span
                          initial={{ opacity: 0, y: 10, filter: 'blur(6px)', letterSpacing: '0.4em' }}
                          animate={{ opacity: 1, y: 0, filter: 'blur(0px)', letterSpacing: '0.15em' }}
                          transition={{ delay: 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                          className="relative font-display text-base font-bold tracking-widest text-primary-foreground uppercase whitespace-nowrap"
                        >
                          MERN Stack Developer
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
