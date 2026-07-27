'use client'

import { useState, useEffect } from 'react'
import { adminFetch } from '@/lib/adminApi'

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  published: boolean
  publishedAt: string | null
}

const emptyForm = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  published: false,
}

function toSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
}

export default function AdminBlog() {
  const [posts, setPosts] = useState<Post[]>([])
  const [form, setForm] = useState(emptyForm)
  const [editSlug, setEditSlug] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [wasPublished, setWasPublished] = useState(false)

  const load = async () => {
    try {
      const json = await adminFetch<{ data: Post[] }>('/api/blog/admin/all')
      setPosts(json.data ?? [])
    } catch {
      // 401 redirects to login; other errors leave the list unchanged
    }
  }

  useEffect(() => {
    adminFetch<{ data: Post[] }>('/api/blog/admin/all')
      .then((json) => setPosts(json.data ?? []))
      .catch(() => {})
  }, [])

  const openCreate = () => {
    setEditSlug(null)
    setForm(emptyForm)
    setWasPublished(false)
    setShowForm(true)
  }

  const openEdit = async (slug: string) => {
    const json = await adminFetch<{
      data: { title: string; slug: string; excerpt: string; content: string; published: boolean }
    }>(`/api/blog/admin/${slug}`)
    const p = json.data
    setEditSlug(slug)
    setWasPublished(p.published)
    setForm({
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      content: p.content,
      published: p.published,
    })
    setShowForm(true)
  }

  const cancel = () => {
    setShowForm(false)
    setEditSlug(null)
    setForm(emptyForm)
  }

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const body = {
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt,
        content: form.content,
        published: form.published,
        // only set publishedAt when transitioning draft → published for the first time
        ...(!wasPublished && form.published ? { publishedAt: new Date().toISOString() } : {}),
        ...(!form.published ? { publishedAt: null } : {}),
      }
      const path = editSlug ? `/api/blog/${editSlug}` : '/api/blog'
      await adminFetch(path, { method: editSlug ? 'PUT' : 'POST', body: JSON.stringify(body) })
      await load()
      cancel()
    } catch {
      // error toast is shown by adminFetch
    } finally {
      setLoading(false)
    }
  }

  const remove = async (slug: string) => {
    if (!confirm('Delete this post?')) return
    try {
      await adminFetch(`/api/blog/${slug}`, { method: 'DELETE' })
      await load()
    } catch {
      // error toast is shown by adminFetch
    }
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <p className="font-mono text-xs tracking-[0.3em] text-emerald-400">BLOG POSTS</p>
        <button
          onClick={openCreate}
          className="border border-emerald-500 px-4 py-2 font-mono text-xs text-emerald-400 transition-colors hover:bg-emerald-500/10"
        >
          + NEW POST
        </button>
      </div>

      {showForm && (
        <form onSubmit={save} className="mb-8 space-y-4 border border-zinc-800 bg-zinc-900/20 p-6">
          <p className="font-mono text-xs text-zinc-400">{editSlug ? 'EDIT POST' : 'NEW POST'}</p>

          <div>
            <label className="mb-1 block font-mono text-xs text-zinc-500">Title *</label>
            <input
              required
              value={form.title}
              onChange={(e) => {
                const title = e.target.value
                setForm({
                  ...form,
                  title,
                  slug: editSlug ? form.slug : toSlug(title),
                })
              }}
              className="w-full border border-zinc-800 bg-black px-3 py-2 font-mono text-sm text-white outline-none focus:border-emerald-500/50"
            />
          </div>

          <div>
            <label className="mb-1 block font-mono text-xs text-zinc-500">Slug *</label>
            <input
              required
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="w-full border border-zinc-800 bg-black px-3 py-2 font-mono text-sm text-white outline-none focus:border-emerald-500/50"
            />
          </div>

          <div>
            <label className="mb-1 block font-mono text-xs text-zinc-500">Excerpt *</label>
            <textarea
              required
              rows={2}
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              className="w-full border border-zinc-800 bg-black px-3 py-2 font-mono text-sm text-white outline-none focus:border-emerald-500/50"
            />
          </div>

          <div>
            <label className="mb-1 block font-mono text-xs text-zinc-500">
              Content * (Markdown)
            </label>
            <textarea
              required
              rows={12}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full border border-zinc-800 bg-black px-3 py-2 font-mono text-sm text-white outline-none focus:border-emerald-500/50"
            />
          </div>

          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
              className="accent-emerald-500"
            />
            <span className="font-mono text-xs text-zinc-400">Published</span>
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
        {posts.map((p) => (
          <div
            key={p.id}
            className="flex items-start justify-between border border-zinc-800 bg-zinc-900/10 px-5 py-4"
          >
            <div className="flex-1 pr-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-white">{p.title}</span>
                {p.published ? (
                  <span className="border border-emerald-500/30 px-2 py-0.5 font-mono text-[10px] text-emerald-400">
                    PUBLISHED
                  </span>
                ) : (
                  <span className="border border-zinc-700 px-2 py-0.5 font-mono text-[10px] text-zinc-500">
                    DRAFT
                  </span>
                )}
              </div>
              <p className="mt-1 font-mono text-xs text-zinc-600">/{p.slug}</p>
              <p className="mt-1 line-clamp-2 font-mono text-xs text-zinc-500">{p.excerpt}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => openEdit(p.slug)}
                className="font-mono text-xs text-zinc-400 transition-colors hover:text-white"
              >
                EDIT
              </button>
              <button
                onClick={() => remove(p.slug)}
                className="font-mono text-xs text-zinc-600 transition-colors hover:text-red-400"
              >
                DELETE
              </button>
            </div>
          </div>
        ))}

        {posts.length === 0 && <p className="font-mono text-xs text-zinc-600">No posts yet.</p>}
      </div>
    </div>
  )
}
