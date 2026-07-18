import Link from 'next/link'

const links = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

const socials = [{ href: 'https://github.com/ogulcantekines', label: 'GitHub' }]

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-zinc-800/60">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-900/20 to-transparent" />
      <div className="relative mx-auto max-w-5xl px-6 py-16">
        <div className="mb-12 grid gap-10 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="mb-4 inline-block font-mono text-lg font-bold tracking-widest text-emerald-400"
            >
              OT<span className="text-white">_</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-zinc-500">
              Offensive Security researcher and Full-Stack Developer building secure systems.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="mb-4 font-mono text-xs tracking-widest text-emerald-400">NAVIGATION</p>
            <ul className="space-y-3">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-zinc-500 transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-4 font-mono text-xs tracking-widest text-emerald-400">CONNECT</p>
            <ul className="space-y-3">
              {socials.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-zinc-500 transition-colors hover:text-white"
                  >
                    {label} ↗
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="mailto:ogs1905.com@gmail.com"
                  className="text-sm text-zinc-500 transition-colors hover:text-white"
                >
                  ogs1905.com@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-zinc-800/60 pt-8 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-zinc-600">
            © 2026 Oğulcan Tekineş. Built with Next.js + Express.
          </p>
          <p className="font-mono text-xs text-zinc-700">
            <span className="text-emerald-400/50">{'>'}</span> designed & developed by me
          </p>
        </div>
      </div>
    </footer>
  )
}
