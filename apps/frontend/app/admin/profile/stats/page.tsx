'use client'

import { useState, useEffect } from 'react'

interface Stat {
  id: string
  value: string
  label: string
  order: number
}

const API = process.env.NEXT_PUBLIC_API_URL
const getToken = () => localStorage.getItem('admin_token')
const empty = { value: '', label: '', order: 0 }

export default function AdminStats() {
  const [stats, setStats] = useState<Stat[]>([])
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch(`${API}/api/profile/stats`)
      .then((r) => r.json())
      .then((json) => setStats(json.data ?? []))
  }, [])

  const load = async () => {
    const res = await fetch(`${API}/api/profile/stats`)
    const json = await res.json()
    setStats(json.data ?? [])
  }

  const openCreate = () => {
    setEditId(null)
    setForm(empty)
    setShowForm(true)
  }
  const openEdit = (s: Stat) => {
    setEditId(s.id)
    setForm({ value: s.value, label: s.label, order: s.order })
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
    const body = { value: form.value, label: form.label, order: Number(form.order) }
    const url = editId ? `${API}/api/profile/stats/${editId}` : `${API}/api/profile/stats`
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
    if (!confirm('Delete this stat?')) return
    await fetch(`${API}/api/profile/stats/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    await load()
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <p className="font-mono text-xs tracking-[0.3em] text-emerald-400">STATS</p>
        <button
          onClick={openCreate}
          className="border border-emerald-500 px-4 py-2 font-mono text-xs text-emerald-400 transition-colors hover:bg-emerald-500/10"
        >
          + NEW STAT
        </button>
      </div>

      {showForm && (
        <form onSubmit={save} className="mb-8 space-y-4 border border-zinc-800 bg-zinc-900/20 p-6">
          <p className="font-mono text-xs text-zinc-400">{editId ? 'EDIT' : 'NEW'} STAT</p>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block font-mono text-xs text-zinc-500">Value *</label>
              <input
                required
                value={form.value}
                onChange={(e) => setForm({ ...form, value: e.target.value })}
                placeholder="5+"
                className="w-full border border-zinc-800 bg-black px-3 py-2 font-mono text-sm text-white outline-none focus:border-emerald-500/50"
              />
            </div>
            <div>
              <label className="mb-1 block font-mono text-xs text-zinc-500">Label *</label>
              <input
                required
                value={form.label}
                onChange={(e) => setForm({ ...form, label: e.target.value })}
                placeholder="CTF Competitions"
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
        {stats.map((s) => (
          <div
            key={s.id}
            className="flex items-center justify-between border border-zinc-800 bg-zinc-900/10 px-5 py-4"
          >
            <div>
              <span className="font-mono text-lg text-emerald-400">{s.value}</span>
              <span className="ml-3 font-mono text-xs text-zinc-400">{s.label}</span>
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
        {stats.length === 0 && <p className="font-mono text-xs text-zinc-600">No stats yet.</p>}
      </div>
    </div>
  )
}
