'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import {
  motion,
  useReducedMotion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from 'framer-motion'
import { ArrowUpRight, Globe } from 'lucide-react'
import { Section } from '@/components/ui/section'
import { SectionHeader } from '@/components/ui/section-header'

/* ─── GithubIcon ─────────────────────────────────────────────── */
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

/* ─── Types ──────────────────────────────────────────────────── */
type Tech =
  | 'React' | 'Nextjs' | 'JavaScript' | 'Node.js' | 'Express.js'
  | 'MongoDB' | 'Tailwind CSS' | 'Redux Toolkit' | 'TypeScript'
  | 'Prisma' | 'PostgreSQL' | 'Cloudinary' | 'Stripe' | 'Razorpay'
  | 'Firebase' | 'OpenAI API' | 'Gemini API' | 'REST API' | 'Git'

type Project = {
  id: string
  title: string
  category: string
  description: string
  image: string
  tech: Tech[]
  github: string
  demo: string
  accent: string
  accentRgb: string
  featured?: boolean
}

type ConnectorPhase = 'idle' | 'drawing' | 'arrow' | 'done'

/* ─── Project Data ───────────────────────────────────────────── */
const projects: Project[] = [
  {
    id: 'ecommerce',
    title: 'E-Commerce Platform',
    category: 'Full Stack · MERN',
    description:
      'A modern MERN-based e-commerce platform with secure authentication, product management, shopping cart, and online payments via Stripe and Razorpay.',
    image: '/ecom.png',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Cloudinary', 'Stripe', 'Razorpay'],
    github: 'https://github.com/abdulodhood003/Ai-powered-e-commerce',
    demo: 'https://aurafit-frontend.vercel.app/',
    accent: 'from-emerald-500/40 via-green-400/20',
    accentRgb: '52,211,153',
    featured: true,
  },
  {
    id: 'invoice',
    title: 'AI Invoice Generator',
    category: 'AI · SaaS',
    description:
      'An AI-powered SaaS platform for generating professional invoices, managing customers, exporting PDF billing documents, and automating workflows.',
    image: '/invoice.png',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'OpenAI API', 'Tailwind CSS'],
    github: 'https://github.com/abdulodhood003/AI-invoice-app',
    demo: 'https://ai-invoice-252jq670b-abdul-odudoods-projects.vercel.app/login',
    accent: 'from-cyan-500/40 via-blue-500/20',
    accentRgb: '34,211,238',
    featured: true,
  },
  {
    id: 'social',
    title: 'AI Social Media Automation',
    category: 'AI · Full Stack',
    description:
      'A full-stack AI platform that generates content, schedules posts, uploads media, and automates publishing across multiple social platforms.',
    image: '/social.png',
    tech: ['TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'Gemini API', 'Cloudinary', 'Tailwind CSS'],
    github: 'https://github.com/abdulodhood003/Ai-social-media-autmoation',
    demo: 'https://ai-social-media-autmoation.vercel.app/',
    accent: 'from-purple-500/40 via-pink-500/20',
    accentRgb: '192,132,252',
    featured: true,
  },
  {
    id: 'kisan',
    title: 'Kisan Mitra AI',
    category: 'AgriTech · Web App',
    description:
      'An AI-powered agriculture assistant helping farmers with crop recommendations, weather forecasts, pest alerts, and smart farming insights.',
    image: '/kisan.png',
    tech: ['React', 'TypeScript', 'Node.js', 'Express.js', 'Tailwind CSS'],
    github: 'https://github.com/abdulodhood003/Kisan-mitra-ai',
    demo: 'https://kisan-mitra-ai-mu.vercel.app/',
    accent: 'from-green-500/40 via-lime-400/20',
    accentRgb: '74,222,128',
  },
  {
    id: 'imagify',
    title: 'AI Text-to-Image SaaS',
    category: 'AI · SaaS',
    description:
      'A cloud-based AI image generation platform transforming text prompts into stunning images with credit management and Cloudinary integration.',
    image: '/saas.png',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Cloudinary', 'Tailwind CSS'],
    github: 'https://github.com/abdulodhood003/ai-saas-app',
    demo: 'https://ai-saas-frontend-orpin.vercel.app/',
    accent: 'from-orange-500/40 via-amber-400/20',
    accentRgb: '251,146,60',
    featured: true,
  },
]

/* ─── Tech badge colors ──────────────────────────────────────── */
const techColors: Partial<Record<Tech, string>> = {
  React:          'bg-cyan-500/15 text-cyan-400 border-cyan-500/25',
  Nextjs:         'bg-neutral-500/15 text-neutral-300 border-neutral-500/25',
  TypeScript:     'bg-blue-500/15 text-blue-400 border-blue-500/25',
  JavaScript:     'bg-yellow-500/15 text-yellow-400 border-yellow-500/25',
  'Node.js':      'bg-green-500/15 text-green-400 border-green-500/25',
  'Express.js':   'bg-neutral-500/15 text-neutral-300 border-neutral-500/25',
  MongoDB:        'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
  PostgreSQL:     'bg-indigo-500/15 text-indigo-400 border-indigo-500/25',
  'Tailwind CSS': 'bg-sky-500/15 text-sky-400 border-sky-500/25',
  Stripe:         'bg-violet-500/15 text-violet-400 border-violet-500/25',
  Cloudinary:     'bg-blue-500/15 text-blue-300 border-blue-500/25',
  'OpenAI API':   'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
  'Gemini API':   'bg-indigo-500/15 text-indigo-300 border-indigo-500/25',
  Razorpay:       'bg-sky-500/15 text-sky-400 border-sky-500/25',
}
const defaultTechColor = 'bg-secondary text-muted-foreground border-border'

/* ─── Milestone Data (between connectors) ────────────────────── */
const milestoneData = [
  { icon: '💳', title: 'Payment Gateway',    desc: 'Stripe & Razorpay Payments',          accent: '52,211,153'  },
  { icon: '🤖', title: 'AI Automation',      desc: 'Content Generation & Scheduling',     accent: '34,211,238'  },
  { icon: '🌱', title: 'Agriculture AI',     desc: 'Smart Crop Intelligence',             accent: '192,132,252' },
  { icon: '🎨', title: 'Generative AI',      desc: 'Text-to-Image Platform',             accent: '251,146,60'  },
]

const connectorChips = [
  ['JWT Auth', 'Stripe', 'Razorpay', 'Cloudinary'],
  ['OpenAI API', 'PDF Export', 'SaaS', 'REST API'],
  ['Gemini AI', 'Automation', 'MongoDB', 'Cloudinary'],
  ['TypeScript', 'AI Crop', 'Weather API', 'REST API'],
]

/* ─── Code Window Data ───────────────────────────────────────── */
const codeWindowData = [
  {
    file: 'server.ts',
    lines: [
      { num: 1, content: <><span className="text-[#c678dd]">const</span> <span className="text-[#e06c75]">post</span> <span className="text-[#56b6c2]">=</span> <span className="text-[#c678dd]">await</span> <span className="text-[#e5c07b]">ai</span>.<span className="text-[#61afef]">generate</span>();</> },
      { num: 2, content: null },
      { num: 3, content: <><span className="text-[#c678dd]">await</span> <span className="text-[#e5c07b]">scheduler</span>.<span className="text-[#61afef]">publish</span>(<span className="text-[#e06c75]">post</span>);</> },
      { num: 4, content: null },
      { num: 5, content: <><span className="text-[#c678dd]">return</span> <span className="text-[#e06c75]">success</span>;</> },
    ],
    cursorLine: 4,
  },
  {
    file: 'payment.ts',
    lines: [
      { num: 1, content: <><span className="text-[#c678dd]">const</span> <span className="text-[#e06c75]">order</span> <span className="text-[#56b6c2]">=</span> <span className="text-[#c678dd]">await</span> <span className="text-[#e5c07b]">stripe</span>.<span className="text-[#61afef]">checkout</span>();</> },
      { num: 2, content: null },
      { num: 3, content: <><span className="text-[#c678dd]">await</span> <span className="text-[#61afef]">saveOrder</span>(<span className="text-[#e06c75]">order</span>);</> },
      { num: 4, content: null },
      { num: 5, content: <><span className="text-[#c678dd]">return</span> <span className="text-[#e06c75]">order</span>;</> },
    ],
    cursorLine: 4,
  },
  {
    file: 'invoice.ts',
    lines: [
      { num: 1, content: <><span className="text-[#c678dd]">const</span> <span className="text-[#e06c75]">pdf</span> <span className="text-[#56b6c2]">=</span> <span className="text-[#c678dd]">await</span> <span className="text-[#61afef]">generateInvoice</span>();</> },
      { num: 2, content: null },
      { num: 3, content: <><span className="text-[#c678dd]">return</span> <span className="text-[#e06c75]">pdf</span>;</> },
    ],
    cursorLine: 2,
  },
  {
    file: 'predict.ts',
    lines: [
      { num: 1, content: <><span className="text-[#c678dd]">const</span> <span className="text-[#e06c75]">crop</span> <span className="text-[#56b6c2]">=</span> <span className="text-[#c678dd]">await</span> <span className="text-[#61afef]">predictCrop</span>(<span className="text-[#e06c75]">data</span>);</> },
      { num: 2, content: null },
      { num: 3, content: <><span className="text-[#c678dd]">return</span> <span className="text-[#e06c75]">crop</span>;</> },
    ],
    cursorLine: 2,
  },
  {
    file: 'image.ts',
    lines: [
      { num: 1, content: <><span className="text-[#c678dd]">const</span> <span className="text-[#e06c75]">image</span> <span className="text-[#56b6c2]">=</span> <span className="text-[#c678dd]">await</span> <span className="text-[#e5c07b]">ai</span>.<span className="text-[#61afef]">generate</span>(<span className="text-[#e06c75]">prompt</span>);</> },
      { num: 2, content: null },
      { num: 3, content: <><span className="text-[#c678dd]">return</span> <span className="text-[#e06c75]">image</span>;</> },
    ],
    cursorLine: 2,
  },
]

/* ─── FloatingCodeWindow ─────────────────────────────────────── */
function FloatingCodeWindow({
  data,
  revealed,
}: {
  data: typeof codeWindowData[0]
  revealed: boolean
}) {
  if (!data) return null
  
  // Random delay between 0 and 2s for floating animation so they don't sync
  const floatDelay = useRef(Math.random() * 2).current

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.35, delay: 0 }}
      className="hidden md:flex w-full h-full items-center justify-center pointer-events-auto"
    >
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: floatDelay }}
        className="group relative w-[240px] h-[170px] flex flex-col rounded-xl border border-white/10 bg-[#1e1e1e]/85 backdrop-blur-md shadow-2xl overflow-hidden hover:opacity-100 hover:backdrop-blur-none hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-300"
      >
        {/* Header */}
        <div className="flex items-center px-3 py-2 bg-[#252526] border-b border-white/5">
          <div className="flex gap-1.5 mr-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <div className="flex items-center gap-1.5 opacity-70">
            <div className="text-[#3178c6] text-[10px] font-bold tracking-wider">TS</div>
            <span className="text-[11px] font-mono text-white/80">{data.file}</span>
          </div>
        </div>
        
        {/* Code Content */}
        <div className="flex-1 overflow-hidden relative bg-[#1e1e1e]">
          <div className="absolute right-1 top-1 bottom-1 w-[3px] bg-white/10 rounded-full" />
          <div className="py-3 px-2 text-[10.5px] font-mono leading-[1.7]">
            {data.lines.map((line, i) => {
              const isActive = i === data.cursorLine
              return (
                <div key={i} className={`flex items-center ${isActive ? 'bg-white/[0.04] border-l-2 border-[#3178c6] -ml-2 pl-[6px]' : 'pl-2'}`}>
                  <span className="w-4 inline-block text-right text-white/30 mr-3 select-none">{line.num}</span>
                  <span className="text-white/90 relative flex items-center">
                    {line.content}
                    {isActive && (
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="inline-block w-[1.5px] h-[12px] bg-[#3178c6] ml-[1px]"
                      />
                    )}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}


/* ─── Bezier Math Helpers ─────────────────────────────────────── */
function cubicAt(t: number, p0: number, p1: number, p2: number, p3: number): number {
  const mt = 1 - t
  return mt ** 3 * p0 + 3 * mt ** 2 * t * p1 + 3 * mt * t ** 2 * p2 + t ** 3 * p3
}

function cubicTangentAngle(
  t: number,
  px: [number, number, number, number],
  py: [number, number, number, number],
): number {
  const mt = 1 - t
  const dx = 3 * (mt ** 2 * (px[1] - px[0]) + 2 * mt * t * (px[2] - px[1]) + t ** 2 * (px[3] - px[2]))
  const dy = 3 * (mt ** 2 * (py[1] - py[0]) + 2 * mt * t * (py[2] - py[1]) + t ** 2 * (py[3] - py[2]))
  return Math.atan2(dy, dx) * (180 / Math.PI)
}

/* ─── TravelingArrow ─────────────────────────────────────────── */
function TravelingArrow({
  cpX,
  cpY,
  active,
  activeColor,
  onComplete,
  onProgress,
}: {
  cpX: [number, number, number, number]
  cpY: [number, number, number, number]
  active: boolean
  activeColor?: string
  onComplete: () => void
  onProgress?: () => void
}) {
  const tVal = useMotionValue(0)
  const x = useTransform(tVal, (v) => cubicAt(v, cpX[0], cpX[1], cpX[2], cpX[3]))
  const y = useTransform(tVal, (v) => cubicAt(v, cpY[0], cpY[1], cpY[2], cpY[3]))
  const rotate = useTransform(tVal, (v) => cubicTangentAngle(v, cpX, cpY))

  const transform = useTransform(
    [x, y, rotate],
    ([latestX, latestY, latestRotate]) =>
      `translate(${latestX}, ${latestY}) rotate(${latestRotate})`
  )

  useEffect(() => {
    if (!active) {
      tVal.set(0)
      return
    }
    tVal.set(0)
    let progressTriggered = false
    const ctrl = animate(tVal, 1, {
      duration: 0.5,
      ease: 'easeInOut',
      onUpdate: (v) => {
        if (v >= 0.6 && !progressTriggered && onProgress) {
          progressTriggered = true
          onProgress()
        }
      },
      onComplete,
    })
    return () => ctrl.stop()
  }, [active]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!active) return null

  const arrowColor = activeColor ? `rgb(${activeColor})` : 'hsl(var(--primary))'
  const glowShadow = activeColor
    ? `drop-shadow(0 0 8px rgba(${activeColor}, 0.8))`
    : 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.8))'

  return (
    <motion.g transform={transform} style={{ filter: glowShadow }}>
      {/* Glow halos */}
      <circle r={22} style={{ fill: arrowColor }} opacity={0.07} />
      <circle r={14} style={{ fill: arrowColor }} opacity={0.14} />
      {/* Core dot */}
      <circle r={6} style={{ fill: arrowColor }} />
      {/* Arrow chevron */}
      <polygon points="-5,-3.5 6,0 -5,3.5" fill="white" opacity={0.9} />
      {/* Trailing particles */}
      <circle cx={-14} cy={0} r={2.5} style={{ fill: arrowColor }} opacity={0.5} />
      <circle cx={-24} cy={0} r={1.8} style={{ fill: arrowColor }} opacity={0.3} />
      <circle cx={-34} cy={0} r={1.2} style={{ fill: arrowColor }} opacity={0.15} />
    </motion.g>
  )
}

/* ─── TimelineNode ───────────────────────────────────────────── */
function TimelineNode({ x, y, active }: { x: number; y: number; active: boolean }) {
  return (
    <g>
      {/* Ripple rings (only when active) */}
      {active && (
        <>
          <motion.circle
            cx={x} cy={y} r={8}
            fill="none"
            initial={{ r: 8, opacity: 0.8 }}
            animate={{ r: 40, opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            style={{ stroke: 'hsl(var(--primary))', strokeWidth: 1.5 }}
          />
          <motion.circle
            cx={x} cy={y} r={8}
            fill="none"
            initial={{ r: 8, opacity: 0.5 }}
            animate={{ r: 28, opacity: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
            style={{ stroke: 'hsl(var(--primary))', strokeWidth: 1 }}
          />
        </>
      )}
      {/* Static dot */}
      <motion.circle
        cx={x} cy={y} r={8}
        initial={{ opacity: 0.25, scale: 1 }}
        animate={active ? { scale: 1.2, opacity: 1 } : { scale: 1, opacity: 0.25 }}
        transition={{ duration: 0.4 }}
        style={{ fill: 'hsl(var(--primary))' }}
      />
      <circle cx={x} cy={y} r={4} fill="white" opacity={0.9} />
    </g>
  )
}

/* ─── FlowingParticle ────────────────────────────────────────── */
function FlowingParticle({
  cpX, cpY, delay, color
}: {
  cpX: [number, number, number, number]
  cpY: [number, number, number, number]
  delay: number
  color: string
}) {
  const tVal = useMotionValue(0)

  useEffect(() => {
    const ctrl = animate(tVal, 1, {
      duration: 3.8,
      ease: 'linear',
      repeat: Infinity,
      repeatDelay: 0.8,
      delay,
    })
    return () => ctrl.stop()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const svgTransform = useTransform(tVal, (v) => {
    const px = cubicAt(v, cpX[0], cpX[1], cpX[2], cpX[3])
    const py = cubicAt(v, cpY[0], cpY[1], cpY[2], cpY[3])
    return `translate(${px}, ${py})`
  })
  const opacity = useTransform(tVal, [0, 0.08, 0.9, 1], [0, 0.7, 0.7, 0])

  return (
    <motion.g transform={svgTransform} style={{ opacity }}>
      {/* Glow halo */}
      <circle r={6} style={{ fill: color }} opacity={0.15} />
      {/* Core */}
      <circle r={3} style={{ fill: color }} />
    </motion.g>
  )
}

function FlowingParticles({
  cpX, cpY, active, color
}: {
  cpX: [number, number, number, number]
  cpY: [number, number, number, number]
  active: boolean
  color: string
}) {
  if (!active) return null
  return (
    <>
      <FlowingParticle cpX={cpX} cpY={cpY} delay={0}   color={color} />
      <FlowingParticle cpX={cpX} cpY={cpY} delay={1.3} color={color} />
      <FlowingParticle cpX={cpX} cpY={cpY} delay={2.6} color={color} />
    </>
  )
}

/* ─── MilestoneLabel ─────────────────────────────────────────── */
function MilestoneLabel({
  icon, title, desc, accent, side, revealDelay
}: {
  icon: string
  title: string
  desc: string
  accent: string
  side: 'left' | 'right'
  revealDelay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: revealDelay ?? 0, ease: [0.22, 1, 0.36, 1] }}
      className={`pointer-events-none relative z-30 flex ${side === 'right' ? 'justify-end' : 'justify-start'}`}
      style={{ marginTop: -24, marginBottom: -24 }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl blur-2xl"
        style={{ background: `radial-gradient(ellipse, rgba(${accent},0.18) 0%, transparent 70%)` }}
      />
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative max-w-[188px] rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 backdrop-blur-xl"
        style={{ boxShadow: `0 0 0 1px rgba(${accent},0.12), 0 8px 32px rgba(0,0,0,0.2)` }}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="text-base leading-none">{icon}</span>
          <span className="text-[11px] font-bold uppercase tracking-widest text-white/80">{title}</span>
        </div>
        <p className="text-[10px] leading-snug text-white/45">{desc}</p>
        {/* Accent dot */}
        <div
          className="absolute -top-1 -right-1 h-2 w-2 rounded-full"
          style={{ background: `rgb(${accent})`, boxShadow: `0 0 6px rgba(${accent},0.8)` }}
        />
      </motion.div>
    </motion.div>
  )
}

/* ─── FeatureChips ───────────────────────────────────────────── */
function FeatureChips({
  chips, side, revealDelay
}: {
  chips: string[]
  side: 'left' | 'right'
  revealDelay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.5, delay: revealDelay ?? 0 }}
      className={`pointer-events-none relative z-30 flex flex-wrap gap-1.5 px-2 ${side === 'right' ? 'justify-end pr-[58%]' : 'justify-start pl-[58%]'}`}
      style={{ marginTop: 8, marginBottom: 8 }}
    >
      {chips.map((chip) => (
        <span
          key={chip}
          className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/50 backdrop-blur-sm"
        >
          {chip}
        </span>
      ))}
    </motion.div>
  )
}

/* ─── ProjectNumber ──────────────────────────────────────────── */
function ProjectNumber({ num }: { num: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none"
      aria-hidden="true"
      style={{ zIndex: 0 }}
    >
      <span
        className="font-black leading-none text-white"
        style={{
          fontSize: 'clamp(120px, 16vw, 220px)',
          opacity: 0.025,
          filter: 'blur(1px)',
          fontVariantNumeric: 'tabular-nums',
          letterSpacing: '-0.05em',
        }}
      >
        {String(num).padStart(2, '0')}
      </span>
    </div>
  )
}

/* ─── ConnectorSVG ───────────────────────────────────────────── */
function ConnectorSVG({
  direction,
  phase,
  activeColor,
  onDrawComplete,
  onArrowComplete,
  onArrowProgress,
}: {
  direction: 'ltr' | 'rtl'
  phase: ConnectorPhase
  activeColor: string | null
  onDrawComplete: () => void
  onArrowComplete: () => void
  onArrowProgress?: () => void
}) {
  const pathRef = useRef<SVGPathElement>(null)
  const [pathLength, setPathLength] = useState(640)
  const dashOffset = useMotionValue(9999)
  const [nodeActive, setNodeActive] = useState(false)

  const isLTR = direction === 'ltr'
  // S-curves: horizontal exit and horizontal entry, stopping cleanly at 720 / 280 before the card
  const d = isLTR
    ? 'M 250 10 C 500 10 500 190 720 190'
    : 'M 750 10 C 500 10 500 190 280 190'
  const cpX: [number, number, number, number] = isLTR ? [250, 500, 500, 720] : [750, 500, 500, 280]
  const cpY: [number, number, number, number] = [10, 10, 190, 190]

  // Measure path length on mount
  useEffect(() => {
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength()
      setPathLength(len)
      dashOffset.set(len)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Drive drawing animation
  useEffect(() => {
    if (phase === 'idle') {
      dashOffset.set(pathLength)
      setNodeActive(false)
      return
    }
    if (phase === 'drawing' && pathLength < 9000) {
      dashOffset.set(pathLength)
      const ctrl = animate(dashOffset, 0, {
        duration: 0.6,
        ease: 'easeInOut',
        onComplete: onDrawComplete,
      })
      return () => ctrl.stop()
    }
    if (phase === 'arrow') {
      // Fire node glow at the arrow's midpoint (≈0.25s into 0.5s travel)
      const t = setTimeout(() => setNodeActive(true), 250)
      return () => clearTimeout(t)
    }
    if (phase === 'done') {
      dashOffset.set(0)
    }
  }, [phase, pathLength]) // eslint-disable-line react-hooks/exhaustive-deps

  const pathVisible = phase !== 'idle'
  const isHovered = activeColor !== null
  const activePathColor = activeColor ? `rgb(${activeColor})` : 'hsl(var(--primary))'
  
  // Reveal arrowhead immediately after connection finishes drawing
  const showActiveMarker = phase === 'done' || phase === 'arrow'

  return (
    <svg
      viewBox="0 0 1000 200"
      className="w-full relative"
      style={{ height: 200, overflow: 'visible', zIndex: 20 }}
      aria-hidden="true"
    >
      {/* Background track (always visible) */}
      <path
        d={d}
        stroke={isHovered ? `rgba(${activeColor}, 0.35)` : 'rgba(255,255,255,0.20)'}
        strokeWidth={isHovered ? 3 : 2}
        fill="none"
        strokeLinecap="round"
        className="transition-colors duration-300"
      />

      {/* Background static arrowhead (always visible) */}
      <g transform={`translate(${isLTR ? 720 : 280}, 190) rotate(${isLTR ? 0 : 180})`}>
        <motion.path
          d="M -24 -11 L 0 0 L -24 11 Z"
          fill={isHovered ? `rgba(${activeColor}, 0.6)` : 'rgba(255, 255, 255, 0.35)'}
          animate={{ scale: isHovered ? 1.15 : 1 }}
          className="transition-all duration-300"
        />
      </g>

      {/* Always rendered for length measurement; visible when active */}
      <motion.path
        ref={pathRef as React.Ref<SVGPathElement>}
        d={d}
        fill="none"
        strokeLinecap="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: pathVisible ? 0.9 : 0 }}
        transition={{ duration: 0.15 }}
        style={{
          stroke: activePathColor,
          strokeWidth: isHovered ? 5.5 : 4, // Increase stroke width to 4px (5.5px on hover)
          strokeDasharray: pathLength,
          strokeDashoffset: dashOffset,
          filter: isHovered
            ? `drop-shadow(0 0 10px ${activePathColor})`
            : `drop-shadow(0 0 4px ${activePathColor})`,
        }}
        className="transition-all duration-300"
      />

      {/* Active arrowhead - reveals on draw complete and pulses continuously */}
      <motion.g
        transform={`translate(${isLTR ? 720 : 280}, 190) rotate(${isLTR ? 0 : 180})`}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: showActiveMarker ? 1 : 0,
          scale: showActiveMarker ? (isHovered ? 1.15 : 1) : 0, // Slightly enlarge on hover
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        style={{ zIndex: 30 }}
      >
        <motion.path
          d="M -24 -11 L 0 0 L -24 11 Z"
          animate={{
            filter: isHovered
              ? [
                  `drop-shadow(0 0 12px ${activePathColor})`,
                  `drop-shadow(0 0 20px ${activePathColor})`,
                  `drop-shadow(0 0 12px ${activePathColor})`,
                ]
              : [
                  `drop-shadow(0 0 6px ${activePathColor})`,
                  `drop-shadow(0 0 12px ${activePathColor})`,
                  `drop-shadow(0 0 6px ${activePathColor})`,
                ],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            fill: activePathColor,
          }}
        />
      </motion.g>

      {/* Timeline node at curve midpoint (500, 100) - pulses/ripples on hover */}
      <TimelineNode x={500} y={100} active={nodeActive || isHovered} />

      {/* Traveling arrow */}
      <TravelingArrow
        cpX={cpX}
        cpY={cpY}
        active={phase === 'arrow'}
        activeColor={activeColor || undefined}
        onComplete={onArrowComplete}
        onProgress={onArrowProgress}
      />

      {/* Flowing data particles — visible after path is fully drawn */}
      <FlowingParticles
        cpX={cpX}
        cpY={cpY}
        active={phase === 'done'}
        color={activePathColor}
      />
    </svg>
  )
}

/* ─── ProjectCard ────────────────────────────────────────────── */
function ProjectCard({
  project,
  revealed,
}: {
  project: Project
  revealed: boolean
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 40, scale: 0.96 }}
      animate={
        revealed || reduceMotion
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 40, scale: 0.96 }
      }
      transition={{ type: 'spring', stiffness: 110, damping: 18 }}
      whileHover={reduceMotion ? {} : { y: -10, scale: 1.02 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.06] bg-card/50 shadow-[0_4px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl will-change-transform cursor-default"
    >
      {/* Gradient border glow on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="pointer-events-none absolute inset-0 z-10 rounded-3xl"
        style={{
          boxShadow: `0 0 0 1px rgba(${project.accentRgb},0.35), 0 20px 60px rgba(${project.accentRgb},0.12)`,
        }}
      />

      {/* Image */}
      <div className="relative h-52 overflow-hidden rounded-t-3xl">
        <motion.div
          className="absolute inset-0"
          whileHover={reduceMotion ? {} : { scale: 1.06 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover object-top"
            priority={project.featured}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/20 to-transparent" />

        {/* Category badge */}
        <div className="absolute left-4 top-4 z-20">
          <span className="inline-flex items-center rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white/80 backdrop-blur-md">
            {project.category}
          </span>
        </div>

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute right-4 top-4 z-20">
            <span className="inline-flex items-center rounded-full bg-primary/90 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary-foreground">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-1 flex-col gap-4 p-6">
        {/* Accent glow */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.55 }}
          transition={{ duration: 0.4 }}
          className={`pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full bg-gradient-to-br ${project.accent} to-transparent blur-2xl`}
        />

        <div>
          <h3 className="font-display text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Tech badges — slide up on hover */}
        <motion.div
          className="flex flex-wrap gap-1.5"
          variants={{ rest: {}, hover: { transition: { staggerChildren: 0.04 } } }}
          initial="rest"
          whileHover="hover"
        >
          {project.tech.slice(0, 5).map((t) => (
            <motion.span
              key={t}
              variants={{
                rest: { y: 0, opacity: 0.7 },
                hover: { y: -3, opacity: 1, transition: { type: 'spring', stiffness: 300 } },
              }}
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${techColors[t] ?? defaultTechColor}`}
            >
              {t}
            </motion.span>
          ))}
          {project.tech.length > 5 && (
            <span className="inline-flex items-center rounded-full border border-border bg-secondary px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground">
              +{project.tech.length - 5} more
            </span>
          )}
        </motion.div>

        {/* Action buttons — fade + slide up on hover */}
        <motion.div
          className="flex items-center gap-3 pt-1"
          initial={{ y: 6, opacity: 0.45 }}
          whileHover={{ y: 0, opacity: 1, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
        >
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-2 text-xs font-semibold text-foreground/80 backdrop-blur-sm transition-all hover:border-foreground/30 hover:text-foreground hover:-translate-y-0.5 hover:shadow-lg"
          >
            <GithubIcon className="h-3.5 w-3.5" />
            GitHub
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="group/btn relative overflow-hidden inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-all hover:brightness-110 hover:shadow-[0_0_20px_rgba(var(--primary),0.4)] hover:-translate-y-0.5"
          >
            <span className="absolute inset-0 bg-white/20 translate-y-full transition-transform duration-300 group-hover/btn:translate-y-0" />
            <Globe className="relative h-3.5 w-3.5" />
            <span className="relative">Live Demo</span>
            <ArrowUpRight className="relative h-3.5 w-3.5 -ml-0.5 opacity-0 -translate-x-2 transition-all group-hover/btn:opacity-100 group-hover/btn:translate-x-0" />
          </a>
        </motion.div>
      </div>
    </motion.article>
  )
}

/* ─── Projects Section ───────────────────────────────────────── */
export function Projects() {
  const reduceMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-80px' })

  const [revealedCount, setRevealedCount] = useState(reduceMotion ? projects.length : 0)
  const [activeConnector, setActiveConnector] = useState<{
    idx: number
    stage: 'drawing' | 'arrow'
  } | null>(null)
  const [hoveredCardIdx, setHoveredCardIdx] = useState<number | null>(null)

  const hasStarted = useRef(false)

  // Kick off the sequential animation chain
  useEffect(() => {
    if (!isInView || hasStarted.current || reduceMotion) {
      if (reduceMotion) setRevealedCount(projects.length)
      return
    }
    hasStarted.current = true

    // Reveal card 0 first
    setRevealedCount(1)

    // Begin connector chain after card 0 appears
    const t0 = setTimeout(() => {
      setActiveConnector({ idx: 0, stage: 'drawing' })
    }, 200)

    return () => clearTimeout(t0)
  }, [isInView, reduceMotion])

  function handleDrawComplete(idx: number) {
    setActiveConnector({ idx, stage: 'arrow' })
  }

  function handleArrowProgress(idx: number) {
    setRevealedCount(prev => Math.max(prev, idx + 2))
  }

  function handleArrowComplete(idx: number) {
    setActiveConnector(null)
    setRevealedCount(prev => Math.max(prev, idx + 2))

    // Chain to next connector after 100ms pause
    if (idx < projects.length - 2) {
      setTimeout(() => {
        setActiveConnector({ idx: idx + 1, stage: 'drawing' })
      }, 100)
    }
  }

  function getPhase(idx: number): ConnectorPhase {
    if (activeConnector && activeConnector.idx === idx) return activeConnector.stage
    if (revealedCount >= idx + 2) return 'done'
    return 'idle'
  }

  return (
    <Section id="work" className="relative overflow-hidden">
      {/* ── Background ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Ambient color orbs */}
        <div className="absolute left-1/4 top-0 h-[40rem] w-[40rem] rounded-full bg-primary/6 blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 h-[32rem] w-[32rem] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute left-0 top-1/2 h-[24rem] w-[24rem] -translate-y-1/2 rounded-full bg-emerald-500/3 blur-[100px]" />

        {/* Premium dot grid */}
        <div
          className="absolute inset-0 opacity-[0.028]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.85) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Fine line grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '96px 96px',
          }}
        />
        {/* Diagonal gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/[0.02] to-transparent" />
      </div>

      {/* ── Header ── */}
      <div className="relative z-20 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end mb-4">
        <SectionHeader
          label="Selected work"
          title={
            <>
              Projects crafted <span className="text-gradient">with intent</span>
            </>
          }
          description="A curated selection of products shipped from concept to production — each one solving a real problem with thoughtful engineering."
          className="mb-0"
        />
        <a
          href="#contact"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-muted-foreground transition-all hover:border-foreground/30 hover:text-foreground mb-4 sm:mb-0"
        >
          Start a project
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      {/* ── Roadmap Container ── */}
      <div ref={containerRef} className="relative z-10 mt-16">

        {/* ── Desktop / Tablet: Alternating Roadmap ── */}
        <div className="hidden md:block">
          {projects.map((project, idx) => {
            const isLeft = idx % 2 === 0
            const isLast = idx === projects.length - 1
            const direction: 'ltr' | 'rtl' = isLeft ? 'ltr' : 'rtl'

            // Hover state logic for connecting paths
            const isConnectorHovered = hoveredCardIdx === idx || hoveredCardIdx === idx + 1
            const activeColor = isConnectorHovered
              ? (hoveredCardIdx === idx ? projects[idx].accentRgb : projects[idx + 1].accentRgb)
              : null

            return (
              <div key={project.id}>
                {/* ── Project Row ── */}
                <div className="relative flex w-full items-center">
                  {/* Giant background project number */}
                  <ProjectNumber num={idx + 1} />

                  {/* Left column */}
                  <div
                    className="relative z-10 w-[46%] pr-6"
                    onMouseEnter={() => setHoveredCardIdx(idx)}
                    onMouseLeave={() => setHoveredCardIdx(null)}
                  >
                    {isLeft && <ProjectCard project={project} revealed={idx < revealedCount} />}
                    {!isLeft && codeWindowData[idx] && <FloatingCodeWindow data={codeWindowData[idx]} revealed={idx < revealedCount} />}
                  </div>

                  {/* Center spine */}
                  <div className="relative z-10 flex w-[8%] flex-col items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0.15, scale: 1 }}
                      animate={idx < revealedCount
                        ? { scale: [1, 1.3, 1], opacity: [0.5, 1, 0.8] }
                        : { opacity: 0.15, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="h-3 w-3 rounded-full bg-primary ring-4 ring-primary/20"
                    />
                  </div>

                  {/* Right column */}
                  <div
                    className="relative z-10 w-[46%] pl-6"
                    onMouseEnter={() => setHoveredCardIdx(idx)}
                    onMouseLeave={() => setHoveredCardIdx(null)}
                  >
                    {!isLeft && <ProjectCard project={project} revealed={idx < revealedCount} />}
                    {isLeft && codeWindowData[idx] && <FloatingCodeWindow data={codeWindowData[idx]} revealed={idx < revealedCount} />}
                  </div>
                </div>

                {/* ── Connector ── */}
                {!isLast && (
                  <>
                    <ConnectorSVG
                      direction={direction}
                      phase={getPhase(idx)}
                      activeColor={activeColor}
                      onDrawComplete={() => handleDrawComplete(idx)}
                      onArrowComplete={() => handleArrowComplete(idx)}
                      onArrowProgress={() => handleArrowProgress(idx)}
                    />

                    {/* Milestone label — alternates left/right, appears after connector draws */}
                    {milestoneData[idx] && getPhase(idx) !== 'idle' && (
                      <MilestoneLabel
                        icon={milestoneData[idx].icon}
                        title={milestoneData[idx].title}
                        desc={milestoneData[idx].desc}
                        accent={milestoneData[idx].accent}
                        side={isLeft ? 'right' : 'left'}
                        revealDelay={0.3}
                      />
                    )}

                    {/* Feature chips — opposite side to milestone, subtle scroll-in */}
                    {connectorChips[idx] && getPhase(idx) !== 'idle' && (
                      <FeatureChips
                        chips={connectorChips[idx]}
                        side={isLeft ? 'left' : 'right'}
                        revealDelay={0.5}
                      />
                    )}
                  </>
                )}
              </div>
            )
          })}
        </div>

        {/* ── Mobile: Single Column Timeline ── */}
        <div className="flex flex-col md:hidden">
          {projects.map((project, idx) => {
            const isLast = idx === projects.length - 1
            return (
              <div key={project.id} className="relative flex flex-col items-center">
                {/* Giant background project number */}
                <ProjectNumber num={idx + 1} />

                {/* Node dot */}
                <div className="relative z-10 flex items-center justify-center py-2">
                  <div className="h-4 w-4 rounded-full bg-primary ring-4 ring-primary/20" />
                </div>

                {/* Card */}
                <motion.div
                  className="relative z-10 w-full"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ type: 'spring', stiffness: 110, damping: 18 }}
                >
                  <ProjectCard project={project} revealed={true} />
                </motion.div>

                {/* Vertical connector line & Milestone/Chips */}
                {!isLast && (
                  <div className="relative flex w-full flex-col items-center py-8">
                    {/* The Line */}
                    <motion.div
                      className="absolute inset-y-0 w-px bg-gradient-to-b from-primary/60 via-primary/20 to-primary/10"
                      initial={{ scaleY: 0, originY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                    
                    {/* Milestone Label (Centered for mobile) */}
                    {milestoneData[idx] && (
                      <div className="relative z-20 mb-4 w-full max-w-[240px]">
                        <MilestoneLabel
                          icon={milestoneData[idx].icon}
                          title={milestoneData[idx].title}
                          desc={milestoneData[idx].desc}
                          accent={milestoneData[idx].accent}
                          side="left" // Doesn't matter much when container is centered/max-w
                          revealDelay={0.2}
                        />
                      </div>
                    )}

                    {/* Feature Chips (Centered for mobile) */}
                    {connectorChips[idx] && (
                      <div className="relative z-20 flex w-full flex-wrap justify-center gap-1.5 px-4">
                        {connectorChips[idx].map((chip) => (
                          <span
                            key={chip}
                            className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/50 backdrop-blur-sm"
                          >
                            {chip}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
