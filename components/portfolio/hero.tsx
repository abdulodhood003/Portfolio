'use client'

import { motion, type Variants, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import { ArrowUpRight, Download, Star } from 'lucide-react'
import { TypingRole } from './typing-role'
import { useLoading } from './loading-context'
import { useEffect, useState } from 'react'

const stats = [
  { value: '5+', label: 'Full Stack Projects' },
  { value: '1+', label: 'Years of Coding' },
  { value: '1000+', label: 'Hours of Learning' },
];

export function Hero() {
  const { isLoaded } = useLoading()
  const [headingFinished, setHeadingFinished] = useState(false)

  // Mouse parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (typeof window === 'undefined') return
    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window
    const x = (clientX / innerWidth - 0.5) * 30 
    const y = (clientY / innerHeight - 0.5) * 30
    mouseX.set(x)
    mouseY.set(y)
  }

  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 20 })
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 20 })

  // Animations sequence
  // 1. Image: 0 -> 0.9s
  // 2. Heading words: staggered starting at ~0.4s
  // 3. Typing role: starts after heading (we'll use a timer or state, ~1.5s)
  // 4. Description: ~2s
  // 5. Buttons: ~2.3s
  // 6. Stats: ~2.8s

  useEffect(() => {
    if (isLoaded) {
      const t = setTimeout(() => setHeadingFinished(true), 1500)
      return () => clearTimeout(t)
    }
  }, [isLoaded])

  const headingText = "Building modern full-stack web applications".split(" ")

  return (
    <section
      id="top"
      onMouseMove={handleMouseMove}
      className="relative mx-auto w-[min(92%,76rem)] pt-32 pb-20 sm:pt-40 lg:pt-44"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
        {/* ---------- Left: copy ---------- */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            Available for new projects — 2026
          </motion.span>

          <h1 className="max-w-3xl text-balance font-display text-4xl font-bold leading-[1.03] tracking-tight sm:text-6xl lg:text-[4.25rem] overflow-hidden flex flex-wrap justify-center lg:justify-start">
            {headingText.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`mr-3 lg:mr-4 ${word === 'modern' ? 'text-gradient' : ''}`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={headingFinished ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-5 flex min-h-[1.75rem] items-center gap-2 font-display text-lg font-semibold sm:text-2xl"
          >
            <span className="text-muted-foreground">I'm a</span>
            {headingFinished && (
              <TypingRole
                roles={[
                  "MERN Stack Developer",
                  "React Developer",
                  "Full Stack Developer",
                  "JavaScript Developer",
                ]}
              />
            )}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 2.0 }}
            className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Hi, I'm <span className="font-semibold text-foreground">Abdul Odudood</span>, a final-year B.Tech Information Technology student and MERN Stack Developer. I build responsive, scalable, and user-friendly web applications using React, Node.js, Express.js, and MongoDB while continuously exploring modern web technologies and AI-powered solutions.
          </motion.p>
          
          <div className="mt-9 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
            <motion.a
              href="#work"
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileHover={{ scale: 1.04, y: -2, boxShadow: "0 20px 25px -5px rgba(var(--primary), 0.4)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.5, delay: 2.3 }}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const ripple = document.createElement('span')
                const size = Math.max(rect.width, rect.height)
                ripple.className = 'ripple'
                ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px;`
                e.currentTarget.appendChild(ripple)
                ripple.addEventListener('animationend', () => ripple.remove())
              }}
              className="group relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-shadow hover:shadow-xl hover:shadow-primary/40"
            >
              <span className="absolute inset-0 bg-white/20 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
              <span className="relative flex items-center gap-2">
                View my work
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </motion.a>

            <motion.a
              href="/AbdulOdudood_SoftwareDeveloper.pdf"
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.5, delay: 2.4 }}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const ripple = document.createElement('span')
                const size = Math.max(rect.width, rect.height)
                ripple.className = 'ripple'
                ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px;`
                e.currentTarget.appendChild(ripple)
                ripple.addEventListener('animationend', () => ripple.remove())
              }}
              className="group relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary/60 hover:shadow-lg hover:shadow-white/5"
            >
              <span className="absolute inset-0 bg-white/5 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
              <span className="relative flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download Resume
              </span>
            </motion.a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 2.6 }}
            className="mt-8 flex items-center gap-2 text-sm text-muted-foreground"
          >
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            Passionate about building modern and scalable web applications.
          </motion.div>
        </div>

        {/* ---------- Right: floating profile image ---------- */}
        <div className="relative mx-auto flex w-full max-w-sm items-center justify-center lg:max-w-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(15px)' }}
            animate={isLoaded ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : { opacity: 0, scale: 0.8, filter: 'blur(15px)' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ x: smoothX, y: smoothY }}
            className="animate-float relative aspect-square w-64 sm:w-80 lg:w-full lg:max-w-md"
          >
            {/* spinning conic gradient halo */}
            <div className="hero-gradient animate-glow absolute -inset-10 rounded-full opacity-90 blur-3xl" />
            
            {/* Soft subtle light sweep (simulated with CSS animation in globals or just a rotating linear gradient) */}
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-primary/30 via-accent/10 to-primary/30 blur-2xl animate-spin-slow" />

            {/* framed portrait */}
            <div className="glass relative h-full w-full overflow-hidden rounded-[2rem] p-2 ring-1 ring-white/20 shadow-2xl">
              <div className="relative h-full w-full overflow-hidden rounded-[1.6rem]">
                <Image
                  src="/abd.png"
                  alt="Portrait of Abdul Wadu"
                  width={400}
                  height={400}
                  priority
                  className="h-full w-full object-cover object-[center_25%]"
                />
                
                {/* Image light sweep effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-[150%] animate-light-sweep" />

                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>
            </div>

            {/* floating accent badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="glass absolute -bottom-4 -left-4 rounded-2xl px-4 py-3 text-left sm:-left-6 border border-white/10 shadow-lg shadow-black/20"
            >
              <p className="font-display text-lg font-bold text-gradient">Open to work</p>
              <p className="text-xs text-muted-foreground">Remote · Worldwide</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ---------- stats card ---------- */}
      <motion.dl
        initial={{ y: 40, opacity: 0 }}
        animate={isLoaded ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
        transition={{ duration: 0.7, delay: 2.8, ease: 'easeOut' }}
        className="mt-16 grid w-full max-w-3xl grid-cols-1 divide-y divide-border rounded-3xl glass p-2 sm:mx-auto sm:grid-cols-3 sm:divide-x sm:divide-y-0"
      >
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-1 px-6 py-6 group">
            <dt className="sr-only">{stat.label}</dt>
            <dd className="font-display text-3xl font-bold text-gradient transition-transform duration-300 group-hover:scale-110">{stat.value}</dd>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </motion.dl>
    </section>
  )
}
