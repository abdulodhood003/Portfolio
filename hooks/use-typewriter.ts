'use client'

import { useEffect, useState } from 'react'

type Options = {
  /** words to cycle through */
  words: string[]
  /** ms per character while typing */
  typeSpeed?: number
  /** ms per character while deleting */
  deleteSpeed?: number
  /** ms to pause once a word is fully typed */
  pauseTime?: number
}

/**
 * Reusable typewriter effect that types, pauses, deletes, then advances
 * to the next word and loops. Respects prefers-reduced-motion by rendering
 * the first word statically.
 */
export function useTypewriter({
  words,
  typeSpeed = 90,
  deleteSpeed = 45,
  pauseTime = 1400,
}: Options) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) {
        setText(words[0] ?? '')
        return
      }
    }

    const current = words[wordIndex % words.length] ?? ''

    // pause at the end of a fully typed word
    if (!deleting && text === current) {
      const timeout = setTimeout(() => setDeleting(true), pauseTime)
      return () => clearTimeout(timeout)
    }

    // advance to next word once fully deleted
    if (deleting && text === '') {
      setDeleting(false)
      setWordIndex((i) => (i + 1) % words.length)
      return
    }

    const timeout = setTimeout(
      () => {
        setText((prev) =>
          deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1),
        )
      },
      deleting ? deleteSpeed : typeSpeed,
    )

    return () => clearTimeout(timeout)
  }, [text, deleting, wordIndex, words, typeSpeed, deleteSpeed, pauseTime])

  return text
}
