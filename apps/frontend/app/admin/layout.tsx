'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

const CONTENT_NAV = [
  { label: 'Projects', href: '/admin/projects' },
  { label: 'Blog', href: '/admin/blog' },
  { label: 'Messages', href: '/admin/messages' },
]

const PROFILE_NAV = [
  { label: 'Skills', href: '/admin/profile/skills' },
  { label: 'Stats', href: '/admin/profile/stats' },
  { label: 'Experience', href: '/admin/profile/experience' },
  { label: 'Certifications', href: '/admin/profile/certifications' },
  { label: 'Socials', href: '/admin/profile/socials' },
  { label: 'About', href: '/admin/profile/about' },
]

function NavLink({ href, label, pathname }: { href: string; label: string; pathname: string }) {
  const active = pathname.startsWith(href)
  return (
    <Link
      href={href}
      className={`block px-3 py-2 font-mono text-xs transition-colors ${
        active ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300'
      }`}
    >
      {label}
    </Link>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === '/admin') return
    const token = localStorage.getItem('admin_token')
    if (!token) router.push('/admin')
  }, [pathname, router])

  const logout = () => {
    localStorage.removeItem('admin_token')
    router.push('/admin')
  }

  if (pathname === '/admin') return <>{children}</>

  return (
    <div className="flex min-h-screen bg-black text-white [&_button]:cursor-pointer">
      <aside className="flex w-48 shrink-0 flex-col border-r border-zinc-800">
        <div className="border-b border-zinc-800 px-5 py-5">
          <span className="font-mono text-[10px] tracking-[0.3em] text-emerald-400">ADMIN</span>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <p className="px-5 pb-2 font-mono text-[9px] tracking-[0.2em] text-zinc-700">CONTENT</p>
          <div className="space-y-0.5 px-2">
            {CONTENT_NAV.map((item) => (
              <NavLink key={item.href} {...item} pathname={pathname} />
            ))}
          </div>

          <p className="mt-6 px-5 pb-2 font-mono text-[9px] tracking-[0.2em] text-zinc-700">
            PROFILE
          </p>
          <div className="space-y-0.5 px-2">
            {PROFILE_NAV.map((item) => (
              <NavLink key={item.href} {...item} pathname={pathname} />
            ))}
          </div>
        </nav>

        <div className="border-t border-zinc-800 px-5 py-4">
          <button
            onClick={logout}
            className="font-mono text-xs text-zinc-600 transition-colors hover:text-red-400"
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto p-10">{children}</main>
    </div>
  )
}
