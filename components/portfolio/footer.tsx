'use client'

import { motion } from 'framer-motion'
import { ArrowUp, Sparkles } from 'lucide-react'

/* ─── Social inline SVGs (from contact section) ── */
function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}
function DribbbleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308a10.21 10.21 0 0 0 4.392-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.048 6.4A10.16 10.16 0 0 0 12 22.248c1.41 0 2.76-.287 3.99-.798zM3.63 17.95c.25-.43 3.25-5.44 8.43-7.15.13-.04.27-.08.4-.12-.26-.59-.53-1.17-.82-1.74C6.585 10.558 1.927 10.5 1.5 10.5a10.2 10.2 0 0 0 2.13 7.45zm-.96-9.37c.44.01 4.39.04 9.16-1.2-.39-.7-.8-1.38-1.24-2.03A10.185 10.185 0 0 0 2.67 8.58zm9.63-7.97c-.42.64-.83 1.33-1.22 2.06 3.81 1.14 6.9 2.84 8.89 4.52A10.155 10.155 0 0 0 12 2.01zm6.79 5.65c-1.96-1.64-4.9-3.26-8.52-4.36a51.7 51.7 0 0 0-1.53 3.48c3.31.93 5.77 2.51 7.2 3.8.96-.95 1.79-2.02 2.45-3.19l.4.27z" />
    </svg>
  )
}

const socials = [
  { label: 'GitHub', href: 'https://github.com/abdulodhood003', Icon: GithubIcon },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/abdul-odudood/', Icon: LinkedInIcon },
]

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative mt-12 w-full overflow-hidden bg-background">
      {/* ── Gradient Divider ── */}
      <div className="absolute top-0 w-full h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/50 to-transparent blur-sm opacity-60" />
      </div>

      <div className="mx-auto w-[min(92%,72rem)] py-12 lg:py-16">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          {/* ── Brand / Logo ── */}
          <div className="flex flex-col items-center md:items-start">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault()
                scrollToTop()
              }}
              className="group flex items-center gap-2 font-display text-lg font-bold tracking-tight text-foreground transition-colors hover:text-primary"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                <Sparkles className="h-5 w-5" />
              </span>
              Abdul Odudood
            </a>
          <p className="mt-4 max-w-xs text-center text-sm leading-relaxed text-muted-foreground md:text-left">
  Transforming ideas into responsive, scalable, and AI-powered web applications through clean code and modern technologies.
</p>
          </div>

          {/* ── Socials ── */}
          <div className="flex flex-col items-center gap-4 md:items-end">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Connect
            </p>
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-secondary/30 text-muted-foreground backdrop-blur-sm transition-colors hover:border-foreground/20 hover:bg-secondary hover:text-foreground"
                >
                  <social.Icon className="h-4.5 w-4.5 h-[18px] w-[18px] transition-transform duration-300 group-hover:scale-110" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom Strip ── */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-border/40 pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Abdul Odudood. All rights reserved.
          </p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-2 rounded-full border border-border/50 bg-secondary/30 px-5 py-2 text-sm font-medium text-muted-foreground backdrop-blur-sm transition-colors hover:border-foreground/20 hover:bg-secondary hover:text-foreground"
          >
            Back to top
            <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
