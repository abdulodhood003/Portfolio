'use client'

import { HTMLAttributes, ReactNode } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'

interface SectionProps extends HTMLMotionProps<'section'> {
  id?: string
  children: ReactNode
  className?: string
  innerClassName?: string
}

export function Section({
  id,
  children,
  className = '',
  innerClassName = '',
  ...props
}: SectionProps) {
  return (
    <motion.section
      id={id}
      className={`relative mx-auto w-[min(92%,72rem)] py-20 sm:py-28 ${className}`}
      {...props}
    >
      <div className={innerClassName}>{children}</div>
    </motion.section>
  )
}
