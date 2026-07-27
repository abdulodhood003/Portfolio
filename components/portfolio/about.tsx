'use client'

import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import {
  Briefcase,
  Clock,
  GraduationCap,
  Rocket,
  Trophy,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { Section } from '@/components/ui/section'
import { SectionHeader } from '@/components/ui/section-header'

/* ---------------------------------- data --------------------------------- */

const skills = [
  'React.js',
  'Node.js',
  'Express.js',
  'MongoDB',
  'JavaScript',
  'TypeScript',
  'Tailwind CSS',
  'REST APIs',
  'Redux Toolkit',
  'Git & GitHub',
  'Prisma ORM',
  'PostgreSQL',
]

type Stat = {
  icon: LucideIcon
  value: number
  suffix: string
  label: string
}

const stats: Stat[] = [
  { icon: Rocket, value: 5, suffix: '+', label: 'Projects Built' },
  { icon: Clock, value: 2, suffix: '', label: 'Internships Completed' },
  { icon: Trophy, value: 15, suffix: '+', label: 'Technologies Learned' },
  { icon: Users, value: 1, suffix: '+', label: 'Years of Coding Journey' },
]

type TimelineEntry = {
  period: string
  title: string
  place: string
  description: string
}

const experience: TimelineEntry[] = [
  {
    period: 'Mar 2026 — Jun 2026',
    title: 'Full Stack Developer Intern',
    place: 'Revamp Academy',
    description:
      'Developed full-stack web applications using the MERN stack, built reusable React components, integrated REST APIs, and created responsive user interfaces.',
  },
  {
    period: 'Jun 2025',
    title: 'Python Developer Intern',
    place: 'OctaNet Services Pvt. Ltd.',
    description:
      'Completed a one-month internship focused on Python programming fundamentals, problem-solving, and hands-on coding assignments.',
  },
]

const education: TimelineEntry[] = [
  {
    period: '2023 — 2027',
    title: 'Bachelor of Technology in Information Technology',
    place: 'Agni College of Technology',
    description:
      'Pursuing a B.Tech in Information Technology with a focus on full-stack web development, software engineering, cloud computing, and modern application development.',
  },

]

/* ------------------------------ count-up hook ----------------------------- */

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      setValue(target)
      return
    }

    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      // easeOutCubic for a premium decelerating count
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, active, duration])

  return value
}

/* ------------------------------- stat card -------------------------------- */

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const count = useCountUp(stat.value, inView)
  const Icon = stat.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.08 }}
      className="group glass relative overflow-hidden rounded-2xl p-5 text-center sm:p-6"
    >
      <div className="absolute inset-x-0 -top-16 mx-auto h-24 w-24 rounded-full bg-primary/20 blur-2xl transition-opacity duration-500 group-hover:opacity-80" />
      <div className="relative">
        <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <p className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {count}
          <span className="text-primary">{stat.suffix}</span>
        </p>
        <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
      </div>
    </motion.div>
  )
}

/* -------------------------------- timeline -------------------------------- */

function Timeline({
  icon: Icon,
  title,
  entries,
}: {
  icon: LucideIcon
  title: string
  entries: TimelineEntry[]
}) {
  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <h3 className="font-display text-xl font-semibold tracking-tight">{title}</h3>
      </div>

      <ol className="relative ml-1 border-l border-border pl-6">
        {entries.map((entry, index) => (
          <motion.li
            key={entry.title}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
            className="relative mb-6 last:mb-0"
          >
            {/* node */}
            <span className="absolute -left-[1.9rem] top-1.5 flex h-3.5 w-3.5 items-center justify-center">
              <span className="h-3.5 w-3.5 rounded-full border-2 border-primary bg-background" />
              <span className="absolute h-3.5 w-3.5 animate-ping rounded-full bg-primary/40" />
            </span>

            <div className="glass rounded-2xl p-5">
              <span className="text-xs font-medium uppercase tracking-widest text-primary">
                {entry.period}
              </span>
              <p className="mt-1.5 font-semibold text-foreground">{entry.title}</p>
              <p className="text-sm text-accent">{entry.place}</p>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                {entry.description}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  )
}

/* --------------------------------- about ---------------------------------- */

export function About() {
  return (
    <Section id="about">
      {/* intro */}
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative order-last lg:order-first"
        >
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/20 via-accent/10 to-transparent blur-2xl" />
          <div className="glass overflow-hidden rounded-3xl p-2">
           <Image
  src="/abd.png"
  alt="Portrait of Abdul Wadu"
  width={500}
  height={500}
  className="h-full w-full rounded-2xl object-cover object-[center_25%]"
/>
          </div>
        </motion.div>

        <div>
          <SectionHeader
  label="About Me"
  title={
    <>
   
    Turning <span className="text-gradient">ideas into scalable software</span>
  

    </>
  }
  className="mb-3"
/>
     
      <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-80px' }}
  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
>
  <p className="text-pretty leading-relaxed text-muted-foreground">
    I'm <span className="font-medium text-foreground">Abdul Odudood</span>, a final-year
    Information Technology student and passionate
    <span className="font-medium text-foreground"> MERN Stack Developer</span>. I enjoy
    building scalable, responsive, and user-centric web applications that combine clean
    architecture with intuitive user experiences. My expertise includes React.js, Node.js,
    Express.js, MongoDB, and modern frontend technologies, enabling me to develop complete
    end-to-end solutions.
  </p>

  <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
    Beyond web development, I'm passionate about exploring AI-powered applications,
    cloud technologies, and modern software engineering practices. Through internships
    and personal projects, I've built solutions ranging from AI automation platforms to
    full-stack business applications. I'm always eager to learn, collaborate, and solve
    real-world problems through technology while continuously growing as a Software Engineer.
  </p>

  <ul className="mt-8 flex flex-wrap gap-2.5" aria-label="Skills">
    {skills.map((skill) => (
      <li
        key={skill}
        className="glass rounded-full px-4 py-2 text-sm text-foreground/90 transition-all duration-300 hover:-translate-y-1 hover:bg-primary/10 hover:text-primary"
      >
        {skill}
      </li>
    ))}
  </ul>
</motion.div>
        </div>
      </div>

      {/* statistics */}
      <div className="mt-16 grid grid-cols-2 gap-4 sm:mt-20 sm:gap-5 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={stat.label} stat={stat} index={index} />
        ))}
      </div>

      {/* timelines */}
      <div className="mt-16 grid gap-12 sm:mt-20 lg:grid-cols-2 lg:gap-10">
        <Timeline icon={Briefcase} title="Experience" entries={experience} />
        <Timeline icon={GraduationCap} title="Education" entries={education} />
      </div>
    </Section>
  )
}
