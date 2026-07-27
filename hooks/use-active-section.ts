'use client'

import { useEffect, useState } from 'react'

/**
 * Tracks which section is currently in view using IntersectionObserver.
 * Returns the id of the most prominent visible section.
 *
 * @param sectionIds - list of element ids to observe (in DOM order)
 * @param topId - id returned when the page is scrolled near the very top
 */
export function useActiveSection(sectionIds: string[], topId = 'top') {
  const [active, setActive] = useState(topId)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    // Track the visibility ratio of every observed section.
    const ratios = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
        }

        // Near the top of the page, treat the hero/home as active.
        if (window.scrollY < 120) {
          setActive(topId)
          return
        }

        let best = topId
        let bestRatio = 0
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestRatio = ratio
            best = id
          }
        }
        if (bestRatio > 0) setActive(best)
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    elements.forEach((el) => observer.observe(el))

    const onScroll = () => {
      if (window.scrollY < 120) setActive(topId)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [sectionIds, topId])

  return active
}
