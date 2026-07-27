import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Sora, Inter } from 'next/font/google'
import './globals.css'

const sora = Sora({ subsets: ['latin'], variable: '--font-sora' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Abdul Odudood | MERN Stack Developer',
  description:
    'Portfolio of Abdul Wadu, MERN Stack Developer specializing in React, Node.js, Express.js, MongoDB, and modern web technologies.',
  keywords: [
    'Abdul Odudood',
    'MERN Stack Developer',
    'Full Stack Developer',
    'React Developer',
    'Node.js',
    'Next.js',
    'JavaScript',
    'TypeScript',
    'MongoDB',
    'Portfolio',
  ],
  authors: [{ name: 'Abdul Wadu' }],
  metadataBase: new URL('https://your-domain.com'),

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    title: 'Abdul Odudood | MERN Stack Developer',
    description:
      'Portfolio showcasing full-stack web applications, AI-powered projects, and modern web development skills.',
    siteName: 'Abdul Odudood Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Abdul Odudood Portfolio',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Abdul Odudood | MERN Stack Developer',
    description:
      'Portfolio showcasing full-stack web applications, AI-powered projects, and modern web development skills.',
    creator: '@abdulodudood',
  },

  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark bg-background ${sora.variable} ${inter.variable}`}>
      <body className="antialiased font-sans">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
