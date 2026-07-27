import { AnimatedBackground } from '@/components/portfolio/animated-background'
import { Navbar } from '@/components/portfolio/navbar'
import { Hero } from '@/components/portfolio/hero'
import { Preloader } from '@/components/portfolio/preloader'
import { LoadingProvider } from '@/components/portfolio/loading-context'
import dynamic from 'next/dynamic'

const Projects = dynamic(() => import('@/components/portfolio/projects').then((mod) => mod.Projects))
const Skills = dynamic(() => import('@/components/portfolio/skills').then((mod) => mod.Skills))
const Experience = dynamic(() => import('@/components/portfolio/experience').then((mod) => mod.Experience))
const About = dynamic(() => import('@/components/portfolio/about').then((mod) => mod.About))
const Contact = dynamic(() => import('@/components/portfolio/contact').then((mod) => mod.Contact))
const Footer = dynamic(() => import('@/components/portfolio/footer').then((mod) => mod.Footer))

export default function Page() {
  return (
    <LoadingProvider>
      <main id="top" className="relative min-h-screen">
        <Preloader />
        <AnimatedBackground />
        <Navbar />
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <About />
        <Contact />
        <Footer />
      </main>
    </LoadingProvider>
  )
}
