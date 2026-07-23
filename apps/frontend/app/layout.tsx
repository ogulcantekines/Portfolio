import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BackToTop from '../components/BackToTop'
import CursorGlow from '../components/CursorGlow'
import ScrollProgress from '../components/ScrollProgress'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    default: 'Oğulcan Tekineş — Offensive Security & Full-Stack Developer',
    template: '%s | Oğulcan Tekineş',
  },
  description:
    'Offensive Security researcher and Full-Stack Developer. I build secure systems and break insecure ones.',
  openGraph: {
    title: 'Oğulcan Tekineş — Offensive Security & Full-Stack Developer',
    description:
      'Offensive Security researcher and Full-Stack Developer. I build secure systems and break insecure ones.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oğulcan Tekineş',
    description: 'Offensive Security researcher and Full-Stack Developer.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-black text-white">
        <ScrollProgress />
        <CursorGlow />
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  )
}
