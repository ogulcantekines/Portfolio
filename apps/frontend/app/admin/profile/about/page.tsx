'use client'

import { useState, useEffect } from 'react'

interface About {
  id: string
  slug: string
  content: string
}

const API = process.env.NEXT_PUBLIC_API_URL
const getToken = () => localStorage.getItem('admin_token')

export default function AdminAbout() {
  const [about, setAbout] = useState<About[]>([])
  const [saving, setSaving] = useState<string | null>(null)
  const [values, setValues] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch(`${API}/api/profile/about`)
      .then((r) => r.json())
      .then((json) => {
        const data: About[] = json.data ?? []
        setAbout(data)
        const initial: Record<string, string> = {}
        data.forEach((a) => {
          initial[a.slug] = a.content
        })
        setValues(initial)
      })
  }, [])

  const save = async (slug: string) => {
    setSaving(slug)
    await fetch(`${API}/api/profile/about/${slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify({ content: values[slug] }),
    })
    setSaving(null)
  }

  const LABELS: Record<string, string> = {
    background: 'Background',
    approach: 'Approach',
  }

  return (
    <div>
      <p className="mb-8 font-mono text-xs tracking-[0.3em] text-emerald-400">ABOUT</p>

      <div className="space-y-8">
        {about.map((a) => (
          <div key={a.slug} className="space-y-3">
            <label className="font-mono text-xs text-zinc-400">
              {LABELS[a.slug] ?? a.slug.toUpperCase()}
            </label>
            <textarea
              rows={6}
              value={values[a.slug] ?? ''}
              onChange={(e) => setValues({ ...values, [a.slug]: e.target.value })}
              className="w-full border border-zinc-800 bg-zinc-900/20 px-4 py-3 font-mono text-sm text-white outline-none focus:border-emerald-500/50"
            />
            <button
              onClick={() => save(a.slug)}
              disabled={saving === a.slug}
              className="border border-emerald-500 bg-emerald-500 px-6 py-2 font-mono text-xs font-bold text-black transition-all hover:bg-transparent hover:text-emerald-400 disabled:opacity-50"
            >
              {saving === a.slug ? 'SAVING...' : 'SAVE'}
            </button>
          </div>
        ))}
        {about.length === 0 && <p className="font-mono text-xs text-zinc-600">Loading...</p>}
      </div>
    </div>
  )
}
