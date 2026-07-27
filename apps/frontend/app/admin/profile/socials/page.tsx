'use client'

import { useState, useEffect } from 'react'
import { adminFetch } from '@/lib/adminApi'

interface Social {
  id: string
  label: string
  href: string
  icon: string
  order: number
}

const API = process.env.NEXT_PUBLIC_API_URL
const empty = { label: '', href: '', icon: '', order: 0 }

export default function AdminSocials() {
  const [socials, setSocials] = useState<Social[]>([])
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch(`${API}/api/profile/socials`)
      .then((r) => r.json())
      .then((json) => setSocials(json.data ?? []))
  }, [])

  const load = async () => {
    const res = await fetch(`${API}/api/profile/socials`)
    const json = await res.json()
    setSocials(json.data ?? [])
  }

  const openCreate = () => {
    setEditId(null)
    setForm(empty)
    setShowForm(true)
  }
  const openEdit = (s: Social) => {
    setEditId(s.id)
    setForm({ label: s.label, href: s.href, icon: s.icon, order: s.order })
    setShowForm(true)
  }
  const cancel = () => {
    setShowForm(false)
    setEditId(null)
    setForm(empty)
  }

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const body = { ...form, order: Number(form.order) }
      const path = editId ? `/api/profile/socials/${editId}` : '/api/profile/socials'
      await adminFetch(path, { method: editId ? 'PUT' : 'POST', body: JSON.stringify(body) })
      await load()
      cancel()
    } catch {
      // error toast is shown by adminFetch
    } finally {
      setLoading(false)
    }
  }

  const remove = async (id: string) => {
    if (!confirm('Delete this social link?')) return
    try {
      await adminFetch(`/api/profile/socials/${id}`, { method: 'DELETE' })
      await load()
    } catch {
      // error toast is shown by adminFetch
    }
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <p className="font-mono text-xs tracking-[0.3em] text-emerald-400">SOCIALS</p>
        <button
          onClick={openCreate}
          className="border border-emerald-500 px-4 py-2 font-mono text-xs text-emerald-400 transition-colors hover:bg-emerald-500/10"
        >
          + NEW LINK
        </button>
      </div>

      {showForm && (
        <form onSubmit={save} className="mb-8 space-y-4 border border-zinc-800 bg-zinc-900/20 p-6">
          <p className="font-mono text-xs text-zinc-400">{editId ? 'EDIT' : 'NEW'} SOCIAL LINK</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-mono text-xs text-zinc-500">Label *</label>
              <input
                required
                value={form.label}
                onChange={(e) => setForm({ ...form, label: e.target.value })}
                placeholder="GitHub"
                className="w-full border border-zinc-800 bg-black px-3 py-2 font-mono text-sm text-white outline-none focus:border-emerald-500/50"
              />
            </div>
            <div>
              <label className="mb-1 block font-mono text-xs text-zinc-500">
                Icon (text/emoji)
              </label>
              <input
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
                placeholder="GH"
                className="w-full border border-zinc-800 bg-black px-3 py-2 font-mono text-sm text-white outline-none focus:border-emerald-500/50"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block font-mono text-xs text-zinc-500">URL *</label>
            <input
              required
              type="url"
              value={form.href}
              onChange={(e) => setForm({ ...form, href: e.target.value })}
              placeholder="https://github.com/username"
              className="w-full border border-zinc-800 bg-black px-3 py-2 font-mono text-sm text-white outline-none focus:border-emerald-500/50"
            />
          </div>
          <div>
            <label className="mb-1 block font-mono text-xs text-zinc-500">Order</label>
            <input
              type="number"
              value={form.order}
              onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
              className="w-full border border-zinc-800 bg-black px-3 py-2 font-mono text-sm text-white outline-none focus:border-emerald-500/50 sm:w-24"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="border border-emerald-500 bg-emerald-500 px-6 py-2 font-mono text-xs font-bold text-black transition-all hover:bg-transparent hover:text-emerald-400 disabled:opacity-50"
            >
              {loading ? 'SAVING...' : 'SAVE'}
            </button>
            <button
              type="button"
              onClick={cancel}
              className="border border-zinc-700 px-6 py-2 font-mono text-xs text-zinc-400 transition-colors hover:border-zinc-500"
            >
              CANCEL
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {socials.map((s) => (
          <div
            key={s.id}
            className="flex items-center justify-between border border-zinc-800 bg-zinc-900/10 px-5 py-4"
          >
            <div className="flex items-center gap-3">
              {s.icon && <span className="font-mono text-sm text-zinc-400">{s.icon}</span>}
              <span className="font-mono text-sm text-white">{s.label}</span>
              <span className="font-mono text-xs text-zinc-600">{s.href}</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => openEdit(s)}
                className="font-mono text-xs text-zinc-400 transition-colors hover:text-white"
              >
                EDIT
              </button>
              <button
                onClick={() => remove(s.id)}
                className="font-mono text-xs text-zinc-600 transition-colors hover:text-red-400"
              >
                DELETE
              </button>
            </div>
          </div>
        ))}
        {socials.length === 0 && (
          <p className="font-mono text-xs text-zinc-600">No social links yet.</p>
        )}
      </div>
    </div>
  )
}
