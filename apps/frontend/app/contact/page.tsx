'use client'

import { useState } from 'react'
import ScrollReveal from '../../components/ScrollReveal'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000'}/api/contact`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        }
      )

      if (!res.ok) throw new Error()
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="bg-grid relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-emerald-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24">
        <ScrollReveal>
          <div className="mb-16">
            <p className="mb-4 font-mono text-xs tracking-[0.3em] text-emerald-400">CONTACT</p>
            <h1 className="text-5xl font-bold text-white sm:text-6xl">Get in touch</h1>
          </div>
        </ScrollReveal>

        <div className="grid gap-16 sm:grid-cols-2">
          <ScrollReveal delay={100}>
            <div>
              <p className="mb-8 leading-relaxed text-zinc-400">
                Looking for internships, junior roles, or freelance security projects. Feel free to
                reach out about anything.
              </p>

              <div className="space-y-6">
                <div className="border border-zinc-800/60 bg-zinc-900/20 p-5 backdrop-blur-sm">
                  <p className="mb-1 font-mono text-xs tracking-widest text-emerald-400">EMAIL</p>
                  <a
                    href="mailto:ogs1905.com@gmail.com"
                    className="text-zinc-400 transition-colors hover:text-white"
                  >
                    ogs1905.com@gmail.com
                  </a>
                </div>
                <div className="border border-zinc-800/60 bg-zinc-900/20 p-5 backdrop-blur-sm">
                  <p className="mb-1 font-mono text-xs tracking-widest text-emerald-400">GITHUB</p>
                  <a
                    href="https://github.com/ogulcantekines"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 transition-colors hover:text-emerald-400"
                  >
                    github.com/ogulcantekines ↗
                  </a>
                </div>
                <div className="border border-zinc-800/60 bg-zinc-900/20 p-5 backdrop-blur-sm">
                  <p className="mb-1 font-mono text-xs tracking-widest text-emerald-400">
                    LOCATION
                  </p>
                  <p className="text-zinc-400">Turkey 🇹🇷</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block font-mono text-xs tracking-widest text-zinc-500">
                  NAME
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-zinc-800/60 bg-zinc-900/30 px-4 py-3 text-sm text-white placeholder-zinc-700 backdrop-blur-sm transition-colors outline-none focus:border-emerald-400/50"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="mb-2 block font-mono text-xs tracking-widest text-zinc-500">
                  EMAIL
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-zinc-800/60 bg-zinc-900/30 px-4 py-3 text-sm text-white placeholder-zinc-700 backdrop-blur-sm transition-colors outline-none focus:border-emerald-400/50"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="mb-2 block font-mono text-xs tracking-widest text-zinc-500">
                  MESSAGE
                </label>
                <textarea
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full border border-zinc-800/60 bg-zinc-900/30 px-4 py-3 text-sm text-white placeholder-zinc-700 backdrop-blur-sm transition-colors outline-none focus:border-emerald-400/50"
                  placeholder="What's on your mind?"
                />
              </div>

              {status === 'success' && (
                <div className="border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
                  <p className="font-mono text-xs text-emerald-400">✓ Message sent successfully.</p>
                </div>
              )}
              {status === 'error' && (
                <div className="border border-red-500/20 bg-red-500/5 px-4 py-3">
                  <p className="font-mono text-xs text-red-400">
                    ✗ Something went wrong. Try again.
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full border border-emerald-500 bg-emerald-500 py-3 font-mono text-xs font-bold tracking-widest text-black transition-all hover:bg-transparent hover:text-emerald-400 disabled:opacity-50"
              >
                {status === 'loading' ? 'SENDING...' : 'SEND MESSAGE'}
              </button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
}
