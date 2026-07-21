'use client'

import { useState, useEffect } from 'react'

interface Skill {
  id: string
  name: string
  icon: string
  items: string[]
  order: number
}

const API = process.env.NEXT_PUBLIC_API_URL
const getToken = () => localStorage.getItem('admin_token')

const empty = { name: '', icon: '', items: '', order: 0 }

export default function AdminSkills() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch(`${API}/api/profile/skills`)
      .then((r) => r.json())
      .then((json) => setSkills(json.data ?? []))
  }, [])

  const load = async () => {
    const res = await fetch(`${API}/api/profile/skills`)
    const json = await res.json()
    setSkills(json.data ?? [])
  }

  const openCreate = () => {
    setEditId(null)
    setForm(empty)
    setShowForm(true)
  }

  const openEdit = (s: Skill) => {
    setEditId(s.id)
    setForm({ name: s.name, icon: s.icon, items: s.items.join(', '), order: s.order })
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
    const body = {
      name: form.name,
      icon: form.icon,
      items: form.items
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      order: Number(form.order),
    }
    const url = editId ? `${API}/api/profile/skills/${editId}` : `${API}/api/profile/skills`
    await fetch(url, {
      method: editId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify(body),
    })
    await load()
    cancel()
    setLoading(false)
  }

  const remove = async (id: string) => {
    if (!confirm('Delete this skill category?')) return
    await fetch(`${API}/api/profile/skills/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    await load()
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <p className="font-mono text-xs tracking-[0.3em] text-emerald-400">SKILLS</p>
        <button
          onClick={openCreate}
          className="border border-emerald-500 px-4 py-2 font-mono text-xs text-emerald-400 transition-colors hover:bg-emerald-500/10"
        >
          + NEW CATEGORY
        </button>
      </div>

      {showForm && (
        <form onSubmit={save} className="mb-8 space-y-4 border border-zinc-800 bg-zinc-900/20 p-6">
          <p className="font-mono text-xs text-zinc-400">
            {editId ? 'EDIT' : 'NEW'} SKILL CATEGORY
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block font-mono text-xs text-zinc-500">Name *</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-zinc-800 bg-black px-3 py-2 font-mono text-sm text-white outline-none focus:border-emerald-500/50"
              />
            </div>
            <div>
              <label className="mb-1 block font-mono text-xs text-zinc-500">
                Icon (emoji/text)
              </label>
              <input
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
                className="w-full border border-zinc-800 bg-black px-3 py-2 font-mono text-sm text-white outline-none focus:border-emerald-500/50"
              />
            </div>
            <div>
              <label className="mb-1 block font-mono text-xs text-zinc-500">Order</label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                className="w-full border border-zinc-800 bg-black px-3 py-2 font-mono text-sm text-white outline-none focus:border-emerald-500/50"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block font-mono text-xs text-zinc-500">
              Items (comma separated)
            </label>
            <input
              value={form.items}
              onChange={(e) => setForm({ ...form, items: e.target.value })}
              placeholder="Python, Burp Suite, Nmap"
              className="w-full border border-zinc-800 bg-black px-3 py-2 font-mono text-sm text-white outline-none focus:border-emerald-500/50"
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
        {skills.map((s) => (
          <div
            key={s.id}
            className="flex items-start justify-between border border-zinc-800 bg-zinc-900/10 px-5 py-4"
          >
            <div className="flex-1 pr-4">
              <div className="flex items-center gap-2">
                <span className="text-sm">{s.icon}</span>
                <span className="font-mono text-sm text-white">{s.name}</span>
              </div>
              <p className="mt-1 font-mono text-xs text-zinc-600">{s.items.join(' · ')}</p>
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
        {skills.length === 0 && (
          <p className="font-mono text-xs text-zinc-600">No skill categories yet.</p>
        )}
      </div>
    </div>
  )
}
