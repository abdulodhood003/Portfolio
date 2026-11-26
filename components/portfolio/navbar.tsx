'use client'

import { useCallback, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { Download, Menu, Sparkles, X } from 'lucide-react'
import { useActiveSection } from '@/hooks/use-active-section'

const links = [
  { label: 'Home',    href: '#top',     id: 'top' },
  { label: 'Work',    href: '#work',    id: 'work' },
  { label: 'About',   href: '#about',   id: 'about' },
  { label: 'Contact', href: '#contact', id: 'contact' },
]

const sectionIds = ['work', 'about', 'contact']

/* ── Magnetic nav link ── */
function MagneticNavLink({
  link,
  isActive,
  onClick,
}: {
  link: typeof links[number]
  isActive: boolean
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 350, damping: 20 })
  const sy = useSpring(y, { stiffness: 350, damping: 20 })

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * 0.28)
    y.set((e.clientY - cy) * 0.28)
  }, [x, y])

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.a
      ref={ref}
      href={link.href}
      onClick={(e) => onClick(e, link.id)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: sx, y: sy }}
      className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
        isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
      }`}
    >
      {/* Active background pill */}
      {isActive && (
        <motion.span
          layoutId="nav-active-pill"
          className="absolute inset-0 -z-10 rounded-full bg-secondary/70"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}

      {link.label}

      {/* Smooth underline — shows on hover for non-active links */}
      {!isActive && (
        <span className="nav-underline" />
      )}

      {/* Active indicator dot */}
      {isActive && (
        <motion.span
          layoutId="nav-dot"
          className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-primary"
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
    </motion.a>
  )
}

/* ── Ripple button ── */
function RippleButton({
  href,
  children,
  className,
  download,
}: {
  href: string
  children: React.ReactNode
  className: string
  download?: boolean
}) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = e.currentTarget
    const rect = btn.getBoundingClientRect()
    const ripple = document.createElement('span')
    const size = Math.max(rect.width, rect.height)
    ripple.className = 'ripple'
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px;`
    btn.appendChild(ripple)
    ripple.addEventListener('animationend', () => ripple.remove())
  }

  return (
    <motion.a
      href={href}
      download={download}
      onClick={handleClick}
      whileHover={{ scale: 1.05, boxShadow: '0 0 20px color-mix(in oklch, var(--primary) 30%, transparent)' }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
    </motion.a>
  )
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(sectionIds)

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    setOpen(false)
    if (id === 'top') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed inset-x-0 top-4 z-50 mx-auto w-[min(92%,64rem)]"
    >
      <div className="flex items-center justify-between rounded-full glass px-4 py-3 shadow-lg shadow-black/20 sm:px-6">
        {/* Brand */}
        <a
          href="#top"
          onClick={(e) => handleNav(e, 'top')}
          className="flex items-center gap-2 font-display text-sm font-semibold tracking-tight"
        >
          <motion.span
            whileHover={{ rotate: [0, -15, 15, 0], scale: 1.15 }}
            transition={{ duration: 0.5 }}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary"
          >
            <Sparkles className="h-4 w-4" />
          </motion.span>
          Abdul Odudood
        </a>

        {/* Desktop links */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <MagneticNavLink
              key={link.href}
              link={link}
              isActive={active === link.id}
              onClick={handleNav}
            />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Resume CTA with ripple */}
          <RippleButton
            href="/AbdulOdudood_SoftwareDeveloper.pdf"
            download
            className="hidden items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 sm:inline-flex sm:px-5"
          >
            <Download className="h-4 w-4" />
            Resume
          </RippleButton>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full glass text-foreground md:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="mt-3 overflow-hidden rounded-3xl glass p-2 shadow-lg shadow-black/20 md:hidden"
          >
            {links.map((link, i) => {
              const isActive = active === link.id
              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNav(e, link.id)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i }}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm transition-colors ${
                    isActive
                      ? 'bg-secondary/70 text-foreground'
                      : 'text-muted-foreground hover:bg-secondary/40 hover:text-foreground'
                  }`}
                >
                  {link.label}
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                </motion.a>
              )
            })}
            <a
              href="/AbdulOdudood_SoftwareDeveloper.pdf"
              download
              onClick={() => setOpen(false)}
              className="mt-1 flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
