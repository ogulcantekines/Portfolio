'use client'

import { useState, useEffect } from 'react'

interface Experience {
  id: string
  year: string
  title: string
  place: string
  description: string
  order: number
}

const API = process.env.NEXT_PUBLIC_API_URL
const getToken = () => localStorage.getItem('admin_token')
const empty = { year: '', title: '', place: '', description: '', order: 0 }

export default function AdminExperience() {
  const [items, setItems] = useState<Experience[]>([])
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch(`${API}/api/profile/experience`)
      .then((r) => r.json())
      .then((json) => setItems(json.data ?? []))
  }, [])

  const load = async () => {
    const res = await fetch(`${API}/api/profile/experience`)
    const json = await res.json()
    setItems(json.data ?? [])
  }

  const openCreate = () => {
    setEditId(null)
    setForm(empty)
    setShowForm(true)
  }
  const openEdit = (e: Experience) => {
    setEditId(e.id)
    setForm({
      year: e.year,
      title: e.title,
      place: e.place,
      description: e.description,
      order: e.order,
    })
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
    const body = { ...form, order: Number(form.order) }
    const url = editId ? `${API}/api/profile/experience/${editId}` : `${API}/api/profile/experience`
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
    if (!confirm('Delete this entry?')) return
    await fetch(`${API}/api/profile/experience/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    await load()
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <p className="font-mono text-xs tracking-[0.3em] text-emerald-400">EXPERIENCE</p>
        <button
          onClick={openCreate}
          className="border border-emerald-500 px-4 py-2 font-mono text-xs text-emerald-400 transition-colors hover:bg-emerald-500/10"
        >
          + NEW ENTRY
        </button>
      </div>

      {showForm && (
        <form onSubmit={save} className="mb-8 space-y-4 border border-zinc-800 bg-zinc-900/20 p-6">
          <p className="font-mono text-xs text-zinc-400">{editId ? 'EDIT' : 'NEW'} EXPERIENCE</p>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block font-mono text-xs text-zinc-500">Year *</label>
              <input
                required
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                placeholder="2024"
                className="w-full border border-zinc-800 bg-black px-3 py-2 font-mono text-sm text-white outline-none focus:border-emerald-500/50"
              />
            </div>
            <div>
              <label className="mb-1 block font-mono text-xs text-zinc-500">Title *</label>
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Security Intern"
                className="w-full border border-zinc-800 bg-black px-3 py-2 font-mono text-sm text-white outline-none focus:border-emerald-500/50"
              />
            </div>
            <div>
              <label className="mb-1 block font-mono text-xs text-zinc-500">Place *</label>
              <input
                required
                value={form.place}
                onChange={(e) => setForm({ ...form, place: e.target.value })}
                placeholder="Company / University"
                className="w-full border border-zinc-800 bg-black px-3 py-2 font-mono text-sm text-white outline-none focus:border-emerald-500/50"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block font-mono text-xs text-zinc-500">Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
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
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-start justify-between border border-zinc-800 bg-zinc-900/10 px-5 py-4"
          >
            <div className="flex-1 pr-4">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-emerald-400">{item.year}</span>
                <span className="font-mono text-sm text-white">{item.title}</span>
                <span className="font-mono text-xs text-zinc-500">{item.place}</span>
              </div>
              {item.description && (
                <p className="mt-1 line-clamp-2 font-mono text-xs text-zinc-600">
                  {item.description}
                </p>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => openEdit(item)}
                className="font-mono text-xs text-zinc-400 transition-colors hover:text-white"
              >
                EDIT
              </button>
              <button
                onClick={() => remove(item.id)}
                className="font-mono text-xs text-zinc-600 transition-colors hover:text-red-400"
              >
                DELETE
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="font-mono text-xs text-zinc-600">No experience entries yet.</p>
        )}
      </div>
    </div>
  )
}
