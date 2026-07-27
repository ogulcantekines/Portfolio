'use client'

import { useState, useEffect } from 'react'
import { adminFetch } from '@/lib/adminApi'

interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  githubUrl: string | null
  liveUrl: string | null
  imageUrl: string | null
  featured: boolean
  order: number
}

const API = process.env.NEXT_PUBLIC_API_URL

const emptyForm = {
  title: '',
  description: '',
  techStack: '',
  githubUrl: '',
  liveUrl: '',
  imageUrl: '',
  featured: false,
  order: 0,
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)

  const load = async () => {
    const res = await fetch(`${API}/api/projects`)
    const json = await res.json()
    setProjects(json.data ?? [])
  }

  useEffect(() => {
    fetch(`${API}/api/projects`)
      .then((r) => r.json())
      .then((json) => setProjects(json.data ?? []))
  }, [])

  const openCreate = () => {
    setEditId(null)
    setForm(emptyForm)
    setShowForm(true)
  }

  const openEdit = (p: Project) => {
    setEditId(p.id)
    setForm({
      title: p.title,
      description: p.description,
      techStack: p.techStack.join(', '),
      githubUrl: p.githubUrl ?? '',
      liveUrl: p.liveUrl ?? '',
      imageUrl: p.imageUrl ?? '',
      featured: p.featured,
      order: p.order,
    })
    setShowForm(true)
  }

  const cancel = () => {
    setShowForm(false)
    setEditId(null)
    setForm(emptyForm)
  }

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const body = {
        title: form.title,
        description: form.description,
        techStack: form.techStack
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        githubUrl: form.githubUrl || null,
        liveUrl: form.liveUrl || null,
        imageUrl: form.imageUrl || null,
        featured: form.featured,
        order: Number(form.order),
      }
      const path = editId ? `/api/projects/${editId}` : '/api/projects'
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
    if (!confirm('Delete this project?')) return
    try {
      await adminFetch(`/api/projects/${id}`, { method: 'DELETE' })
      await load()
    } catch {
      // error toast is shown by adminFetch
    }
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <p className="font-mono text-xs tracking-[0.3em] text-emerald-400">PROJECTS</p>
        <button
          onClick={openCreate}
          className="border border-emerald-500 px-4 py-2 font-mono text-xs text-emerald-400 transition-colors hover:bg-emerald-500/10"
        >
          + NEW PROJECT
        </button>
      </div>

      {showForm && (
        <form onSubmit={save} className="mb-8 space-y-4 border border-zinc-800 bg-zinc-900/20 p-6">
          <p className="font-mono text-xs text-zinc-400">
            {editId ? 'EDIT PROJECT' : 'NEW PROJECT'}
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-mono text-xs text-zinc-500">Title *</label>
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
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
            <label className="mb-1 block font-mono text-xs text-zinc-500">Description *</label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border border-zinc-800 bg-black px-3 py-2 font-mono text-sm text-white outline-none focus:border-emerald-500/50"
            />
          </div>

          <div>
            <label className="mb-1 block font-mono text-xs text-zinc-500">
              Tech Stack (comma separated)
            </label>
            <input
              value={form.techStack}
              onChange={(e) => setForm({ ...form, techStack: e.target.value })}
              placeholder="Python, Burp Suite, Docker"
              className="w-full border border-zinc-800 bg-black px-3 py-2 font-mono text-sm text-white outline-none focus:border-emerald-500/50"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-mono text-xs text-zinc-500">GitHub URL</label>
              <input
                value={form.githubUrl}
                onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                className="w-full border border-zinc-800 bg-black px-3 py-2 font-mono text-sm text-white outline-none focus:border-emerald-500/50"
              />
            </div>
            <div>
              <label className="mb-1 block font-mono text-xs text-zinc-500">Live URL</label>
              <input
                value={form.liveUrl}
                onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                className="w-full border border-zinc-800 bg-black px-3 py-2 font-mono text-sm text-white outline-none focus:border-emerald-500/50"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block font-mono text-xs text-zinc-500">Image URL</label>
            <input
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              placeholder="https://..."
              className="w-full border border-zinc-800 bg-black px-3 py-2 font-mono text-sm text-white outline-none focus:border-emerald-500/50"
            />
          </div>

          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              className="accent-emerald-500"
            />
            <span className="font-mono text-xs text-zinc-400">Featured</span>
          </label>

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
        {projects.map((p) => (
          <div
            key={p.id}
            className="flex items-start justify-between border border-zinc-800 bg-zinc-900/10 px-5 py-4"
          >
            <div className="flex-1 pr-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-white">{p.title}</span>
                {p.featured && (
                  <span className="border border-emerald-500/30 px-2 py-0.5 font-mono text-[10px] text-emerald-400">
                    FEATURED
                  </span>
                )}
              </div>
              <p className="mt-1 line-clamp-2 font-mono text-xs text-zinc-500">{p.description}</p>
              {p.techStack.length > 0 && (
                <p className="mt-2 font-mono text-xs text-zinc-600">{p.techStack.join(' · ')}</p>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => openEdit(p)}
                className="font-mono text-xs text-zinc-400 transition-colors hover:text-white"
              >
                EDIT
              </button>
              <button
                onClick={() => remove(p.id)}
                className="font-mono text-xs text-zinc-600 transition-colors hover:text-red-400"
              >
                DELETE
              </button>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <p className="font-mono text-xs text-zinc-600">No projects yet.</p>
        )}
      </div>
    </div>
  )
}
