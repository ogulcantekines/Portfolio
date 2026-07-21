'use client'

import { useState, useEffect } from 'react'

interface Certification {
  id: string
  name: string
  issuer: string
  status: string
  year: string
  order: number
}

const API = process.env.NEXT_PUBLIC_API_URL
const getToken = () => localStorage.getItem('admin_token')
const empty = { name: '', issuer: '', status: 'Completed', year: '', order: 0 }

export default function AdminCertifications() {
  const [certs, setCerts] = useState<Certification[]>([])
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch(`${API}/api/profile/certifications`)
      .then((r) => r.json())
      .then((json) => setCerts(json.data ?? []))
  }, [])

  const load = async () => {
    const res = await fetch(`${API}/api/profile/certifications`)
    const json = await res.json()
    setCerts(json.data ?? [])
  }

  const openCreate = () => {
    setEditId(null)
    setForm(empty)
    setShowForm(true)
  }
  const openEdit = (c: Certification) => {
    setEditId(c.id)
    setForm({ name: c.name, issuer: c.issuer, status: c.status, year: c.year, order: c.order })
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
    const url = editId
      ? `${API}/api/profile/certifications/${editId}`
      : `${API}/api/profile/certifications`
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
    if (!confirm('Delete this certification?')) return
    await fetch(`${API}/api/profile/certifications/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    await load()
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <p className="font-mono text-xs tracking-[0.3em] text-emerald-400">CERTIFICATIONS</p>
        <button
          onClick={openCreate}
          className="border border-emerald-500 px-4 py-2 font-mono text-xs text-emerald-400 transition-colors hover:bg-emerald-500/10"
        >
          + NEW CERT
        </button>
      </div>

      {showForm && (
        <form onSubmit={save} className="mb-8 space-y-4 border border-zinc-800 bg-zinc-900/20 p-6">
          <p className="font-mono text-xs text-zinc-400">{editId ? 'EDIT' : 'NEW'} CERTIFICATION</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-mono text-xs text-zinc-500">Name *</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="CEH"
                className="w-full border border-zinc-800 bg-black px-3 py-2 font-mono text-sm text-white outline-none focus:border-emerald-500/50"
              />
            </div>
            <div>
              <label className="mb-1 block font-mono text-xs text-zinc-500">Issuer *</label>
              <input
                required
                value={form.issuer}
                onChange={(e) => setForm({ ...form, issuer: e.target.value })}
                placeholder="EC-Council"
                className="w-full border border-zinc-800 bg-black px-3 py-2 font-mono text-sm text-white outline-none focus:border-emerald-500/50"
              />
            </div>
            <div>
              <label className="mb-1 block font-mono text-xs text-zinc-500">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full border border-zinc-800 bg-black px-3 py-2 font-mono text-sm text-white outline-none focus:border-emerald-500/50"
              >
                <option>Completed</option>
                <option>In Progress</option>
                <option>Planned</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block font-mono text-xs text-zinc-500">Year</label>
              <input
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                placeholder="2025"
                className="w-full border border-zinc-800 bg-black px-3 py-2 font-mono text-sm text-white outline-none focus:border-emerald-500/50"
              />
            </div>
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
        {certs.map((c) => (
          <div
            key={c.id}
            className="flex items-center justify-between border border-zinc-800 bg-zinc-900/10 px-5 py-4"
          >
            <div className="flex-1 pr-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-white">{c.name}</span>
                <span className="font-mono text-xs text-zinc-500">{c.issuer}</span>
                <span
                  className={`border px-2 py-0.5 font-mono text-[10px] ${c.status === 'Completed' ? 'border-emerald-500/30 text-emerald-400' : c.status === 'In Progress' ? 'border-yellow-500/30 text-yellow-400' : 'border-zinc-700 text-zinc-500'}`}
                >
                  {c.status.toUpperCase()}
                </span>
              </div>
              {c.year && <p className="mt-0.5 font-mono text-xs text-zinc-600">{c.year}</p>}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => openEdit(c)}
                className="font-mono text-xs text-zinc-400 transition-colors hover:text-white"
              >
                EDIT
              </button>
              <button
                onClick={() => remove(c.id)}
                className="font-mono text-xs text-zinc-600 transition-colors hover:text-red-400"
              >
                DELETE
              </button>
            </div>
          </div>
        ))}
        {certs.length === 0 && (
          <p className="font-mono text-xs text-zinc-600">No certifications yet.</p>
        )}
      </div>
    </div>
  )
}
