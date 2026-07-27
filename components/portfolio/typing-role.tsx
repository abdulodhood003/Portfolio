'use client'

import { useTypewriter } from '@/hooks/use-typewriter'

type TypingRoleProps = {
  roles: string[]
  className?: string
}

export function TypingRole({ roles, className }: TypingRoleProps) {
  const text = useTypewriter({ words: roles })

  return (
    <span className={className} aria-live="polite">
      <span className="text-gradient">{text}</span>
      <span
        aria-hidden
        className="animate-caret ml-1 inline-block h-[1em] w-[2px] translate-y-[0.12em] bg-primary align-middle"
      />
    </span>
  )
}
