'use client'

import { useState, useRef, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion, type Variants } from 'framer-motion'
import {
  Atom,
  Blocks,
  FileCode2,
  FileType2,
  Hexagon,
  Server,
  Database,
  Layers,
  Wind,
  Layout,
  GitBranch,
  GitMerge,
  Triangle,
  Cloud,
  Image as ImageIcon,
  Send,
  AppWindow,
  Palette,
  Network,
  Zap,
  Box,
  Diamond,
  Code2,
  PenTool,
  Monitor,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import { Section } from '@/components/ui/section'
import { SectionHeader } from '@/components/ui/section-header'

/* ─── Types ─────────────────────────────────────────────────── */
type TechItem = {
  name: string
  Icon: LucideIcon
  colorClass: string
}

type CategoryNode = {
  id: string
  title: string
  Icon: LucideIcon
  angle: number // Angle for radial placement (desktop)
  items: TechItem[]
}

/* ─── Data ───────────────────────────────────────────────────── */
const categories: CategoryNode[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    Icon: Monitor,
    angle: -90, // Top
    items: [
      { name: 'React', Icon: Atom, colorClass: 'cyan' },
      { name: 'Next.js', Icon: Blocks, colorClass: 'neutral' },
      { name: 'JavaScript', Icon: FileCode2, colorClass: 'yellow' },
      { name: 'TypeScript', Icon: FileType2, colorClass: 'blue' },
      { name: 'HTML5', Icon: AppWindow, colorClass: 'orange' },
      { name: 'CSS3', Icon: Palette, colorClass: 'blue' },
      { name: 'Tailwind CSS', Icon: Wind, colorClass: 'sky' },
      { name: 'Bootstrap', Icon: Layout, colorClass: 'purple' },
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud & Deploy',
    Icon: Cloud,
    angle: -18, // Top Right
    items: [
      { name: 'AWS', Icon: Cloud, colorClass: 'orange' },
      { name: 'Docker', Icon: Box, colorClass: 'blue' },
      { name: 'Vercel', Icon: Triangle, colorClass: 'neutral' },
      { name: 'Netlify', Icon: Diamond, colorClass: 'emerald' },
      { name: 'Render', Icon: Cloud, colorClass: 'indigo' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    Icon: Server,
    angle: 54, // Bottom Right
    items: [
      { name: 'Node.js', Icon: Hexagon, colorClass: 'green' },
      { name: 'Express.js', Icon: Server, colorClass: 'neutral' },
      { name: 'REST APIs', Icon: Network, colorClass: 'indigo' },
      { name: 'Prisma ORM', Icon: Layers, colorClass: 'purple' },
    ],
  },
  {
    id: 'database',
    title: 'Database',
    Icon: Database,
    angle: 126, // Bottom Left
    items: [
      { name: 'MongoDB', Icon: Database, colorClass: 'emerald' },
      { name: 'PostgreSQL', Icon: Database, colorClass: 'indigo' },
      { name: 'Neon', Icon: Zap, colorClass: 'emerald' },
    ],
  },
  {
    id: 'tools',
    title: 'Dev Tools',
    Icon: Wrench,
    angle: 198, // Top Left
    items: [
      { name: 'Git', Icon: GitBranch, colorClass: 'orange' },
      { name: 'GitHub', Icon: GitMerge, colorClass: 'neutral' },
      { name: 'Postman', Icon: Send, colorClass: 'orange' },
      { name: 'Cloudinary', Icon: ImageIcon, colorClass: 'blue' },
      { name: 'VS Code', Icon: Code2, colorClass: 'blue' },
      { name: 'Figma', Icon: PenTool, colorClass: 'pink' },
    ],
  },
]

/* ─── Color Maps ─────────────────────────────────────────────── */
const colorMap: Record<string, { text: string; bg: string; glow: string; hex: string }> = {
  cyan: { text: 'text-cyan-400', bg: 'bg-cyan-500/10', glow: 'rgba(34,211,238,0.5)', hex: '#22d3ee' },
  neutral: { text: 'text-neutral-200', bg: 'bg-neutral-500/10', glow: 'rgba(163,163,163,0.5)', hex: '#a3a3a3' },
  yellow: { text: 'text-yellow-400', bg: 'bg-yellow-500/10', glow: 'rgba(250,204,21,0.5)', hex: '#facc15' },
  blue: { text: 'text-blue-400', bg: 'bg-blue-500/10', glow: 'rgba(96,165,250,0.5)', hex: '#60a5fa' },
  green: { text: 'text-green-400', bg: 'bg-green-500/10', glow: 'rgba(74,222,128,0.5)', hex: '#4ade80' },
  emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', glow: 'rgba(52,211,153,0.5)', hex: '#34d399' },
  indigo: { text: 'text-indigo-400', bg: 'bg-indigo-500/10', glow: 'rgba(129,140,248,0.5)', hex: '#818cf8' },
  purple: { text: 'text-purple-400', bg: 'bg-purple-500/10', glow: 'rgba(192,132,252,0.5)', hex: '#c084fc' },
  sky: { text: 'text-sky-400', bg: 'bg-sky-500/10', glow: 'rgba(56,189,248,0.5)', hex: '#38bdf8' },
  pink: { text: 'text-pink-400', bg: 'bg-pink-500/10', glow: 'rgba(244,114,182,0.5)', hex: '#f472b6' },
  orange: { text: 'text-orange-400', bg: 'bg-orange-500/10', glow: 'rgba(251,146,60,0.5)', hex: '#fb923c' },
}

/* ─── Helper: Polar to Cartesian ─────────────────────────────── */
function getCoordinates(angleDeg: number, radius: number, center: number = 500) {
  const angleRad = (angleDeg * Math.PI) / 180
  return {
    x: center + radius * Math.cos(angleRad),
    y: center + radius * Math.sin(angleRad),
  }
}

/* ─── Components ─────────────────────────────────────────────── */

export function Skills() {
  const reduceMotion = useReducedMotion()
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [activeLineColor, setActiveLineColor] = useState<string>('rgba(255,255,255,0.1)')

  // Global layout constants for Desktop
  const CANVAS_SIZE = 1000
  const RADIUS = 340 // Distance of categories from center

  return (
    <Section id="skills" className="relative overflow-hidden py-24">
      {/* ── Background Elements ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-[40rem] w-[40rem] rounded-full bg-primary/5 blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 h-[35rem] w-[35rem] rounded-full bg-accent/5 blur-[120px] mix-blend-screen" />
      </div>

      {/* ── Header ── */}
      <div className="relative z-20 mb-16">
        <SectionHeader
          label="Tech Stack"
          title={
            <>
              Technology <span className="text-gradient">Architecture</span>
            </>
          }
          description="The technologies I use to build, deploy, and maintain modern full-stack applications."
        />
      </div>

      {/* ── Desktop/Tablet: Radial Architecture Diagram ── */}
      <div className="relative z-10 hidden w-full items-center justify-center lg:flex">
        <div className="relative h-[900px] w-[900px] scale-75 xl:scale-100 transition-transform">
          
          {/* 1. Center Node (Appears first now) */}
          <div
            className="absolute top-1/2 left-1/2 flex items-center justify-center z-20"
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0, duration: 0.4, ease: 'easeOut' }}
              className="relative flex h-48 w-48 items-center justify-center rounded-full bg-card/30 backdrop-blur-2xl shadow-[0_0_60px_rgba(var(--primary),0.2)] border border-white/10"
            >
              {/* Infinite Pulse */}
              <motion.div
                animate={reduceMotion ? {} : { scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-[-4px] rounded-full bg-primary/20 blur-md"
              />
              
              {/* Rotating Gradient Border */}
              <div className="absolute inset-[-1px] rounded-full bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(var(--primary),0.8)_360deg)] animate-spin" style={{ animationDuration: '6s' }} />
              
              <div className="absolute inset-[2px] rounded-full bg-card/90 flex flex-col items-center justify-center text-center p-6">
                <span className="font-display text-lg font-bold leading-tight text-foreground">Abdul Odudood</span>
                <span className="mt-2 text-xs font-medium uppercase tracking-widest text-primary">MERN Stack<br/>Developer</span>
              </div>
            </motion.div>
          </div>

          {/* 2. SVG Connections (Draw immediately after center) */}
          <svg className="absolute inset-0 h-full w-full pointer-events-none z-0" viewBox={`0 0 ${CANVAS_SIZE} ${CANVAS_SIZE}`}>
            {categories.map((cat) => {
              const { x, y } = getCoordinates(cat.angle, RADIUS)
              const isHovered = hoveredCategory === cat.id
              
              return (
                <motion.line
                  key={`line-${cat.id}`}
                  x1="500"
                  y1="500"
                  x2={x}
                  y2={y}
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ delay: 0.1, duration: 0.7, ease: 'easeInOut' }}
                  stroke={isHovered ? activeLineColor : 'rgba(255,255,255,0.1)'}
                  strokeWidth={isHovered ? 3 : 1.5}
                  strokeLinecap="round"
                  className="transition-colors duration-300"
                  style={{ filter: isHovered ? `drop-shadow(0 0 8px ${activeLineColor})` : 'none' }}
                />
              )
            })}
          </svg>

          {/* 3. Category Nodes & Tech Logos (Simultaneous fade-in) */}
          {useMemo(() => categories.map((cat) => {
            const { x, y } = getCoordinates(cat.angle, RADIUS)
            
            return (
              <div
                key={cat.id}
                className="absolute flex flex-col items-center justify-center z-10"
                style={{
                  left: `${(x / CANVAS_SIZE) * 100}%`,
                  top: `${(y / CANVAS_SIZE) * 100}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {/* Category Title */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="mb-4 flex items-center gap-2 rounded-full border border-white/5 bg-card/60 px-4 py-1.5 backdrop-blur-md shadow-lg"
                >
                  <cat.Icon className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold tracking-wide text-foreground">{cat.title}</span>
                </motion.div>

                {/* Tech Logo Grid */}
                <div className="grid grid-cols-4 gap-3">
                  {cat.items.map((tech, i) => {
                    const theme = colorMap[tech.colorClass] || colorMap.neutral
                    const itemDelay = 0.4 + i * 0.02

                    return (
                      <motion.div
                        key={tech.name}
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: itemDelay, type: 'spring', stiffness: 300, damping: 20 }}
                        onMouseEnter={() => {
                          setHoveredCategory(cat.id)
                          setActiveLineColor(theme.hex)
                        }}
                        onMouseLeave={() => setHoveredCategory(null)}
                        whileHover={reduceMotion ? {} : { scale: 1.15, y: -4 }}
                        className="group relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-2xl border border-white/10 bg-card/80 backdrop-blur-xl shadow-lg transition-colors hover:border-white/30"
                      >
                        {/* Glow */}
                        <div
                          className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          style={{ background: `radial-gradient(circle, ${theme.glow} 0%, transparent 80%)` }}
                        />
                        <tech.Icon className={`relative z-10 h-6 w-6 ${theme.text}`} strokeWidth={1.5} />

                        {/* Tooltip */}
                        <div className="pointer-events-none absolute -top-12 left-1/2 z-50 -translate-x-1/2 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-1">
                          <div className="whitespace-nowrap rounded-lg border border-white/10 bg-card/95 px-3 py-1.5 text-xs font-semibold text-foreground shadow-2xl backdrop-blur-md">
                            {tech.name}
                            <div className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 rounded-sm border-b border-r border-white/10 bg-card/95" />
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            )
          }), [reduceMotion])}

        </div>
      </div>

      {/* ── Mobile: Vertical Architecture Tree ── */}
      <div className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center px-4 lg:hidden">
        
        {/* Center Node (Mobile) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="relative z-20 mb-8 flex h-40 w-40 items-center justify-center rounded-full bg-card/50 backdrop-blur-xl border border-primary/30 shadow-[0_0_30px_rgba(var(--primary),0.2)]"
        >
          <div className="flex flex-col items-center text-center">
            <span className="font-display text-base font-bold leading-tight text-foreground">Abdul Odudood</span>
            <span className="mt-1 text-[10px] font-medium uppercase tracking-widest text-primary">MERN Stack</span>
          </div>
        </motion.div>

        {/* SVG Spine (Mobile) */}
        <div className="absolute top-40 bottom-10 left-1/2 w-[2px] -translate-x-1/2 bg-white/5 z-0" />
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: 'calc(100% - 12rem)' }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.8, ease: 'easeInOut' }}
          className="absolute top-40 left-1/2 w-[2px] -translate-x-1/2 bg-gradient-to-b from-primary via-primary/50 to-transparent z-0"
        />

        {/* Category Cards (Mobile) */}
        <div className="flex w-full flex-col gap-12 pt-8 z-10">
          {useMemo(() => categories.map((cat) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="relative flex flex-col items-center rounded-[24px] border border-white/10 bg-card/60 p-6 backdrop-blur-xl shadow-xl"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <cat.Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                  {cat.title}
                </h3>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                {cat.items.map((tech, i) => {
                  const theme = colorMap[tech.colorClass] || colorMap.neutral
                  
                  return (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.02, type: 'spring', stiffness: 300 }}
                      whileHover={reduceMotion ? {} : { scale: 1.12, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative flex h-14 w-14 flex-col items-center justify-center rounded-2xl border border-white/10 bg-card shadow-sm transition-colors hover:border-white/30"
                    >
                      <div
                        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{ background: `radial-gradient(circle, ${theme.glow} 0%, transparent 80%)` }}
                      />
                      <tech.Icon className={`relative z-10 h-6 w-6 ${theme.text}`} strokeWidth={1.5} />

                      {/* Tooltip (Mobile tap) */}
                      <div className="pointer-events-none absolute -top-10 left-1/2 z-50 -translate-x-1/2 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-1">
                        <div className="whitespace-nowrap rounded-lg border border-white/10 bg-card/95 px-3 py-1.5 text-xs font-semibold text-foreground shadow-xl backdrop-blur-md">
                          {tech.name}
                          <div className="absolute -bottom-1.5 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 rounded-sm border-b border-r border-white/10 bg-card/95" />
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )), [reduceMotion])}
        </div>

      </div>
    </Section>
  )
}
