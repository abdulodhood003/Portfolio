'use client'

import { useRef } from 'react'
import Image from 'next/image'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from 'framer-motion'
import { MapPin, CalendarDays, TrendingUp, CheckCircle2 } from 'lucide-react'
import { Section } from '@/components/ui/section'
import { SectionHeader } from '@/components/ui/section-header'

/* ─── Types ──────────────────────────────────────────────────── */
type Achievement = { metric: string; label: string }
type Job = {
  id: string
  role: string
  company: string
  location: string
  period: string
  tenure: string
  type: 'Full-time' | 'Contract' | 'Freelance' | 'Internship'
  logo: string | null   // null = use SVG fallback
  logoFallback: string  // initials or emoji
  accentFrom: string    // tailwind class
  accentTo: string
  accentText: string    // tailwind text-* for logo placeholder
  description: string
  achievements: Achievement[]
  tags: string[]
}

/* ─── Data ───────────────────────────────────────────────────── */
const jobs: Job[] = [
  {
    id: 'revamp',
    role: 'Full Stack Developer Intern',
    company: 'Revamp Academy',
    location: 'Remote',
    period: 'Mar 2026 — Jun 2026',
    tenure: '3 mos',
    type: 'Internship',
    logo: '/revamp.png',
    logoFallback: 'RA',
    accentFrom: 'from-cyan-500/20',
    accentTo: 'to-primary/10',
    accentText: 'text-cyan-400',
    description:
      'Developed responsive full-stack web applications using the MERN stack. Built reusable React components, integrated REST APIs, and collaborated on real-world development projects while following modern development practices.',
 achievements: [
  { metric: '3', label: 'months of internship experience' },
  { metric: '1', label: 'real-world MERN application developed' },
  { metric: '10+', label: 'React components created' },
  { metric: '100%', label: 'mobile-responsive implementation' },
],
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
  },

{
  id: 'octanet',
  role: 'Python Developer Intern',
  company: 'OctaNet Services Pvt. Ltd.',
  location: 'Remote',
  period: 'Jun 2025',
  tenure: '1 mo',
  type: 'Internship',
  logo: '/octanet.png',
  logoFallback: 'ON',
  accentFrom: 'from-violet-500/20',
  accentTo: 'to-pink-500/10',
  accentText: 'text-violet-400',
  description:
    'Completed a one-month Python internship focused on developing Python applications, understanding core programming concepts, working with data structures, and building problem-solving skills through hands-on assignments and mini projects.',
achievements: [
  { metric: '1', label: 'month internship completed' },
  { metric: '5+', label: 'Python assignments completed' },
  { metric: '100%', label: 'internship completion' },
],
  
  tags: ['Python', 'Git', 'Problem Solving'],
},

]

/* ─── Animation variants ─────────────────────────────────────── */
const cardVariants: Variants = {
  hidden: (index: number) => ({ 
    opacity: 0, 
    x: index % 2 === 0 ? -50 : 50, 
    scale: 0.95 
  }),
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
}

const dotVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4, ease: 'backOut' as const },
  },
}

const achievementVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.07, ease: 'easeOut' as const },
  }),
}

/* ─── Logo component ─────────────────────────────────────────── */
function CompanyLogo({ job }: { job: Job }) {
  if (job.logo) {
    return (
    <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-white/10 bg-card shadow-lg">
  <Image
    src={job.logo}
    alt={`${job.company} logo`}
    fill
    sizes="48px"
    className="object-contain p-2"
  />
</div>
    )
  }
  return (
    <div
      className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10
                  bg-gradient-to-br ${job.accentFrom} ${job.accentTo} shadow-lg backdrop-blur-sm`}
    >
      <span className={`text-sm font-bold tracking-tight ${job.accentText}`}>
        {job.logoFallback}
      </span>
    </div>
  )
}

/* ─── TimelineConnector (animated growing line) ──────────────── */
function TimelineConnector() {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div
      ref={ref}
      className="absolute left-6 top-0 bottom-0 w-px bg-border/40"
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-x-0 top-0 bg-gradient-to-b from-primary via-accent to-primary/30 rounded-full"
        style={{ height: reduceMotion ? '100%' : height }}
      />
    </div>
  )
}

/* ─── ExperienceCard ─────────────────────────────────────────── */
function ExperienceCard({ job, index }: { job: Job; index: number }) {
  const isLast = index === jobs.length - 1

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="relative pl-16"
    >
      {/* Timeline dot */}
      <motion.div
        variants={dotVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="absolute left-0 top-6 flex h-12 w-12 items-center justify-center"
        style={{ zIndex: 1 }}
      >
        {/* Outer glow ring */}
        <motion.span
          className={`absolute h-12 w-12 rounded-full bg-gradient-to-br ${job.accentFrom} ${job.accentTo}
                      opacity-60 blur-md`}
          animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.75, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 }}
        />
        {/* Inner dot */}
        <motion.span
          whileHover={{ scale: 1.3, boxShadow: '0 0 20px 6px rgba(var(--primary),0.6)' }}
          className={`relative h-4 w-4 rounded-full border-2 border-primary bg-background shadow-[0_0_12px_2px] shadow-primary/50 cursor-default`}
        />
        {/* Continuous ping — all dots */}
        <motion.span
          className="absolute h-4 w-4 rounded-full bg-primary/40"
          animate={{ scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: index * 0.5 }}
        />
      </motion.div>

      {/* Card */}
      <motion.div
        whileHover={{ y: -4, transition: { duration: 0.25, ease: 'easeOut' } }}
        className={`group relative overflow-hidden rounded-3xl glass p-6 sm:p-8
                    transition-shadow duration-300 hover:shadow-2xl hover:shadow-primary/10
                    ${!isLast ? 'mb-8 sm:mb-12' : ''}`}
      >
        {/* Accent glow */}
        <div
          className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full
                      bg-gradient-to-br ${job.accentFrom} ${job.accentTo} to-transparent
                      blur-3xl opacity-50 transition-opacity duration-500 group-hover:opacity-90`}
        />
        {/* Hover border */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 ring-1 ring-inset ring-white/15 transition-opacity duration-300 group-hover:opacity-100" />

        {/* ── Header ── */}
        <div className="relative flex flex-wrap items-start gap-4">
          <CompanyLogo job={job} />

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-0.5">
              <h3 className="font-display text-lg font-bold tracking-tight text-foreground leading-snug">
                {job.role}
              </h3>
              <span
                className="inline-flex items-center rounded-full border border-border bg-secondary/60
                           px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground"
              >
                {job.type}
              </span>
            </div>

            <p className={`text-sm font-semibold ${job.accentText}`}>
              {job.company}
            </p>

            <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <CalendarDays className="h-3.5 w-3.5" />
                {job.period}
                <span className="ml-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium">
                  {job.tenure}
                </span>
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {job.location}
              </span>
            </div>
          </div>
        </div>

        {/* ── Description ── */}
        <p className="relative mt-5 text-sm leading-relaxed text-muted-foreground text-pretty">
          {job.description}
        </p>

        {/* ── Achievements grid ── */}
        <div className="relative mt-6">
          <div className="mb-3 flex items-center gap-2">
            <TrendingUp className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Key Achievements
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {job.achievements.map((a, i) => (
              <motion.div
                key={a.label}
                custom={i}
                variants={achievementVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className="flex flex-col rounded-2xl border border-border/60 bg-secondary/40 p-3 text-center
                           backdrop-blur-sm transition-colors duration-200 hover:bg-secondary/70"
              >
                <span
                  className={`font-display text-xl font-extrabold tracking-tight ${job.accentText}`}
                >
                  {a.metric}
                </span>
                <span className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                  {a.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Tags ── */}
        <div className="relative mt-5 flex flex-wrap gap-1.5">
          {job.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-full border border-border/60
                         bg-secondary/40 px-3 py-1 text-[11px] font-medium text-muted-foreground
                         transition-colors duration-150 hover:text-foreground"
            >
              <CheckCircle2 className="h-2.5 w-2.5 text-primary/70" />
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Experience section ─────────────────────────────────────── */
export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <Section id="experience">
      {/* Section header */}
   <SectionHeader
  label="Experience"
  title={
    <>
      Turning <span className="text-gradient">learning into impact</span>
    </>
  }
  description="Gaining hands-on experience through internships and building modern full-stack applications that solve real-world problems with clean, scalable solutions."
/>

      {/* Timeline */}
      <div ref={containerRef} className="relative">
        {/* Animated growing connector line */}
        <TimelineConnector />

        <div className="relative">
          {jobs.map((job, i) => (
            <ExperienceCard key={job.id} job={job} index={i} />
          ))}
        </div>
      </div>

      {/* Bottom cap — "open to work" CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' as const }}
        className="mt-4 pl-16"
      >
        <div className="relative pl-0">
          {/* End dot */}
          <div className="absolute -left-10 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center">
            <span className="h-3 w-3 rounded-full border-2 border-muted-foreground/40 bg-background" />
          </div>
          <div
            className="inline-flex items-center gap-3 rounded-2xl border border-dashed border-primary/40
                        bg-primary/5 px-5 py-3.5"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <span className="text-sm font-medium text-foreground/80">
              Currently open to new opportunities
            </span>
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
