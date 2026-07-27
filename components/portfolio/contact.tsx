'use client'

import { useRef, useState, useId } from 'react'
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from 'framer-motion'
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink,
} from 'lucide-react'
import { Section } from '@/components/ui/section'
import { SectionHeader } from '@/components/ui/section-header'



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


/* ─── Data ───────────────────────────────────────────────────── */
const contactInfo = [
  {
  id: 'email',
  Icon: Mail,
  label: 'Email',
  value: 'abdulodudood@gmail.com',
  href: 'mailto:abdulodudood@gmail.com',
  description: 'Feel free to reach out anytime',
  gradient: 'from-primary/20 to-cyan-500/10',
  iconBg: 'bg-primary/15 text-primary',
},
{
  id: 'phone',
  Icon: Phone,
  label: 'Phone',
  value: '+91 9042487567',
  href: 'tel:+919042487567',
  description: 'Available for calls and interviews',
  gradient: 'from-violet-500/20 to-pink-500/10',
  iconBg: 'bg-violet-500/15 text-violet-400',
},
 {
  id: 'location',
  Icon: MapPin,
  label: 'Location',
  value: 'Chennai, Tamil Nadu, India',
  href: 'https://maps.google.com/?q=Chennai,+Tamil+Nadu,+India',
  description: 'Open to remote, hybrid & on-site opportunities',
  gradient: 'from-emerald-500/20 to-teal-500/10',
  iconBg: 'bg-emerald-500/15 text-emerald-400',
},
]

const socials = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/abdulodhood003',
    Icon: GithubIcon,
    color: 'hover:text-white hover:bg-[#24292e]',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/abdul-odudood/',
    Icon: LinkedInIcon,
    color: 'hover:text-white hover:bg-[#0A66C2]',
  },
]

/* ─── Form types & state ─────────────────────────────────────── */
type FieldName = 'name' | 'email' | 'subject' | 'message'
type FormState = Record<FieldName, string>
type ErrorState = Partial<Record<FieldName, string>>
type Status = 'idle' | 'loading' | 'success' | 'error'

const INITIAL: FormState = { name: '', email: '', subject: '', message: '' }

function validate(form: FormState): ErrorState {
  const errors: ErrorState = {}
  if (!form.name.trim()) errors.name = 'Name is required.'
  if (!form.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email.'
  }
  if (!form.subject.trim()) errors.subject = 'Subject is required.'
  if (!form.message.trim()) {
    errors.message = 'Message is required.'
  } else if (form.message.trim().length < 20) {
    errors.message = 'Message must be at least 20 characters.'
  }
  return errors
}

/* ─── Animation variants ─────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
}

const successVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.25 } },
}

/* ─── InputField ─────────────────────────────────────────────── */
function InputField({
  id,
  label,
  type = 'text',
  value,
  error,
  touched,
  multiline,
  placeholder,
  onChange,
  onBlur,
}: {
  id: FieldName
  label: string
  type?: string
  value: string
  error?: string
  touched: boolean
  multiline?: boolean
  placeholder: string
  onChange: (val: string) => void
  onBlur: () => void
}) {
  const hasError = touched && !!error
  const isValid = touched && !error && value.trim().length > 0
  const inputId = useId()

  const baseClass = `
    w-full rounded-2xl border px-4 py-3.5 text-sm glass shadow-inner
    text-foreground placeholder:text-muted-foreground/50
    outline-none transition-all duration-300 resize-none
    focus:ring-2 focus:ring-offset-0 focus:shadow-[0_0_20px_rgba(var(--primary),0.2)] focus:-translate-y-0.5
    ${hasError
      ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/20 focus:shadow-[0_0_20px_rgba(239,68,68,0.2)]'
      : isValid
      ? 'border-emerald-500/50 focus:border-emerald-500/70 focus:ring-emerald-500/15 focus:shadow-[0_0_20px_rgba(16,185,129,0.2)]'
      : 'border-border/60 focus:border-primary/60 focus:ring-primary/15 hover:border-foreground/30'
    }
  `

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={inputId}
        className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground"
      >
        <span>{label}</span>
        <AnimatePresence>
          {hasError && (
            <motion.span
              key="err"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              className="flex items-center gap-1 text-[11px] font-normal normal-case tracking-normal text-red-400"
            >
              <AlertCircle className="h-3 w-3" />
              {error}
            </motion.span>
          )}
          {isValid && (
            <motion.span
              key="ok"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            </motion.span>
          )}
        </AnimatePresence>
      </label>

      {multiline ? (
        <textarea
          id={inputId}
          rows={5}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={baseClass}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${inputId}-error` : undefined}
        />
      ) : (
        <input
          id={inputId}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={baseClass}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${inputId}-error` : undefined}
        />
      )}
    </div>
  )
}

/* ─── SuccessScreen ──────────────────────────────────────────── */
function SuccessScreen({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      key="success"
      variants={successVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col items-center justify-center gap-6 py-16 text-center"
    >
      {/* Animated checkmark circle */}
      <div className="relative flex h-24 w-24 items-center justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5, ease: 'backOut' as const }}
          className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500/30 to-teal-500/20 blur-xl"
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, duration: 0.5, ease: 'backOut' as const }}
          className="relative flex h-20 w-20 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/15"
        >
          <motion.div
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' as const }}
          >
            <CheckCircle2 className="h-10 w-10 text-emerald-400" strokeWidth={1.5} />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.4 }}
      >
        <h3 className="font-display text-2xl font-bold tracking-tight text-foreground">
          Message sent! 🎉
        </h3>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
          Thanks for reaching out. I&apos;ll get back to you within 24 hours.
        </p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        onClick={onReset}
        className="rounded-full border border-border px-6 py-2.5 text-sm font-medium text-muted-foreground
                   transition-colors duration-200 hover:border-foreground/30 hover:text-foreground"
      >
        Send another message
      </motion.button>
    </motion.div>
  )
}

/* ─── ContactForm ────────────────────────────────────────────── */
function ContactForm() {
  const reduceMotion = useReducedMotion()
  const [form, setForm] = useState<FormState>(INITIAL)
  const [errors, setErrors] = useState<ErrorState>({})
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({})
  const [status, setStatus] = useState<Status>('idle')

  const set = (field: FieldName) => (val: string) => {
    setForm((f) => ({ ...f, [field]: val }))
    // Live re-validate when field already touched
    if (touched[field]) {
      const next = { ...form, [field]: val }
      setErrors(validate(next))
    }
  }

  const touch = (field: FieldName) => () => {
    setTouched((t) => ({ ...t, [field]: true }))
    setErrors(validate(form))
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const allTouched = { name: true, email: true, subject: true, message: true }
    setTouched(allTouched)
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setStatus('loading')
    // Simulate async send (replace with real endpoint)
    await new Promise((r) => setTimeout(r, 1800))
    setStatus('success')
  }

  const reset = () => {
    setForm(INITIAL)
    setErrors({})
    setTouched({})
    setStatus('idle')
  }

  return (
    <div className="relative overflow-hidden rounded-3xl glass p-6 sm:p-8">
      {/* Background glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-to-br from-primary/15 to-accent/10 blur-3xl" />

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <SuccessScreen key="success" onReset={reset} />
        ) : (
          <motion.form
            key="form"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={submit}
            noValidate
            className="relative flex flex-col gap-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <InputField
  id="name"
  label="Full Name"
  placeholder="Enter your full name"
  value={form.name}
  error={errors.name}
  touched={!!touched.name}
  onChange={set('name')}
  onBlur={touch('name')}
/>
             <InputField
  id="email"
  label="Email Address"
  type="email"
  placeholder="Enter your email address"
  value={form.email}
  error={errors.email}
  touched={!!touched.email}
  onChange={set('email')}
  onBlur={touch('email')}
/>
            </div>

          <InputField
  id="subject"
  label="Subject"
  placeholder="Job opportunity, collaboration, or general inquiry"
  value={form.subject}
  error={errors.subject}
  touched={!!touched.subject}
  onChange={set('subject')}
  onBlur={touch('subject')}
/>

          <InputField
  id="message"
  label="Message"
  placeholder="Tell me about the opportunity, project, or how we can work together..."
  value={form.message}
  error={errors.message}
  touched={!!touched.message}
  multiline
  onChange={set('message')}
  onBlur={touch('message')}
/>

            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
              >
                <AlertCircle className="h-4 w-4 shrink-0" />
                Something went wrong. Please try again.
              </motion.p>
            )}

            <motion.button
              type="submit"
              disabled={status === 'loading'}
              whileHover={status !== 'loading' ? { scale: 1.02, boxShadow: '0 0 30px color-mix(in oklch, var(--primary) 50%, transparent)' } : {}}
              whileTap={status !== 'loading' ? { scale: 0.98 } : {}}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              onClick={(e) => {
                if (status === 'loading') return
                const btn = e.currentTarget
                const rect = btn.getBoundingClientRect()
                const ripple = document.createElement('span')
                const size = Math.max(rect.width, rect.height)
                ripple.className = 'ripple'
                ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px;`
                btn.appendChild(ripple)
                ripple.addEventListener('animationend', () => ripple.remove())
              }}
              className="group mt-1 relative overflow-hidden flex items-center justify-center gap-2.5 rounded-2xl bg-primary
                         py-4 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25
                         transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_30px_rgba(var(--primary),0.5)]
                         disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  Send Message
                </>
              )}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Contact section ────────────────────────────────────────── */
export function Contact() {
  return (
    <Section id="contact" aria-label="Contact">
      {/* ── Header ── */}
    <SectionHeader
  label="Get in Touch"
  title={
    <>
      Let&apos;s <span className="text-gradient">connect and build together</span>
    </>
  }
  description="I'm actively seeking Full Stack Developer and Software Engineer opportunities. If you're hiring, have a collaboration in mind, or simply want to connect, feel free to reach out—I’d love to hear from you."
/>

      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        {/* ── Left column — info + socials ── */}
        <div className="flex flex-col gap-5">
          {/* Contact info cards */}
          {contactInfo.map((item, i) => (
            <motion.a
              key={item.id}
              href={item.href}
              target={item.id === 'location' ? '_blank' : undefined}
              rel={item.id === 'location' ? 'noopener noreferrer' : undefined}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative flex items-start gap-4 overflow-hidden rounded-3xl glass p-5
                         transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10"
            >
              {/* Glow blob */}
              <div
                className={`pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full
                            bg-gradient-to-br ${item.gradient} blur-2xl opacity-0 transition-opacity
                            duration-500 group-hover:opacity-100`}
              />
              {/* Icon */}
              <span
                className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl
                            ${item.iconBg} transition-transform duration-300 group-hover:scale-110`}
              >
                <item.Icon className="h-5 w-5" />
              </span>

              <div className="relative min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {item.label}
                </p>
                <p className="mt-0.5 truncate text-sm font-semibold text-foreground">
                  {item.value}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {item.description}
                </p>
              </div>

              <ExternalLink
                className="relative ml-auto h-4 w-4 shrink-0 text-muted-foreground/40
                           transition-all duration-200 group-hover:text-foreground/60
                           group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </motion.a>
          ))}

          {/* Social links */}
          <motion.div
            variants={fadeUp}
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="relative overflow-hidden rounded-3xl glass p-5"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Find me online
            </p>
            <div className="flex flex-wrap gap-3">
              {socials.map((s) => (
                <motion.a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ scale: 1.1, transition: { duration: 0.15 } }}
                  whileTap={{ scale: 0.93 }}
                  className={`group flex h-11 w-11 items-center justify-center rounded-2xl
                              border border-border/60 bg-secondary/40 text-muted-foreground
                              backdrop-blur-sm transition-all duration-200 ${s.color}`}
                >
                  <s.Icon className="h-4.5 w-4.5 h-[18px] w-[18px]" />
                </motion.a>
              ))}
            </div>

            {/* Availability badge */}
            <div className="mt-5 flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                Available for new projects
              </span>
            </div>
          </motion.div>
        </div>

        {/* ── Right column — form ── */}
        <motion.div
          variants={fadeUp}
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <ContactForm />
        </motion.div>
      </div>
    </Section>
  )
}
