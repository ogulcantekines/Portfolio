'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'border-b border-emerald-500/10 bg-black/80 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="group font-mono text-sm font-semibold tracking-widest text-emerald-400 transition-transform hover:scale-105"
          onClick={() => setOpen(false)}
        >
          OT
          <span className="cursor-blink text-white transition-colors group-hover:text-emerald-400">
            _
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 sm:flex">
          {links.map(({ href, label }) => {
            const active = pathname === href
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`group relative font-mono text-xs tracking-widest transition-colors ${
                    active ? 'text-emerald-400' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px bg-emerald-400 transition-all duration-300 ${
                      active ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-1.5 sm:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span
            className={`h-px w-6 bg-zinc-400 transition-all duration-300 ${open ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span
            className={`h-px w-6 bg-zinc-400 transition-all duration-300 ${open ? 'opacity-0' : ''}`}
          />
          <span
            className={`h-px w-6 bg-zinc-400 transition-all duration-300 ${open ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-zinc-800/60 bg-black/95 px-6 py-6 sm:hidden">
          <ul className="space-y-4">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`block font-mono text-sm tracking-widest transition-colors ${
                    pathname === href ? 'text-emerald-400' : 'text-zinc-400'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
