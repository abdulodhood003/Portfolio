'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'

interface SectionHeaderProps extends Omit<HTMLMotionProps<'div'>, 'title'> {
  label: string
  title: React.ReactNode
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({
  label,
  title,
  description,
  align = 'left',
  className = '',
  ...props
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' as const }}
      className={`mb-12 ${align === 'center' ? 'text-center mx-auto' : ''} ${className}`}
      {...props}
    >
      <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
        {label}
      </p>
      <h2 className="font-display text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-pretty text-sm leading-relaxed text-muted-foreground ${align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-xl'}`}>
          {description}
        </p>
      )}
    </motion.div>
  )
}
