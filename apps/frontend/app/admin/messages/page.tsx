'use client'

import { useState, useEffect } from 'react'

interface Message {
  id: string
  name: string
  email: string
  message: string
  read: boolean
  createdAt: string
}

const API = process.env.NEXT_PUBLIC_API_URL
const getToken = () => localStorage.getItem('admin_token')

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    fetch(`${API}/api/contact`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then((r) => r.json())
      .then((json) => setMessages(json.data ?? []))
  }, [])

  const load = async () => {
    const res = await fetch(`${API}/api/contact`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    const json = await res.json()
    setMessages(json.data ?? [])
  }

  const markRead = async (id: string) => {
    await fetch(`${API}/api/contact/${id}/read`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)))
  }

  const remove = async (id: string) => {
    if (!confirm('Delete this message?')) return
    await fetch(`${API}/api/contact/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    await load()
  }

  const unread = messages.filter((m) => !m.read).length

  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        <p className="font-mono text-xs tracking-[0.3em] text-emerald-400">MESSAGES</p>
        {unread > 0 && (
          <span className="border border-emerald-500/50 px-2 py-0.5 font-mono text-[10px] text-emerald-400">
            {unread} UNREAD
          </span>
        )}
      </div>

      <div className="space-y-3">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`border bg-zinc-900/10 px-5 py-4 ${m.read ? 'border-zinc-800' : 'border-zinc-600'}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-white">{m.name}</span>
                  <span className="font-mono text-xs text-zinc-500">{m.email}</span>
                  {!m.read && (
                    <span className="border border-emerald-500/40 px-1.5 py-0.5 font-mono text-[9px] text-emerald-400">
                      NEW
                    </span>
                  )}
                  <span className="font-mono text-[10px] text-zinc-700">
                    {new Date(m.createdAt).toLocaleDateString('tr-TR')}
                  </span>
                </div>
                <p className="mt-3 font-mono text-xs leading-relaxed text-zinc-400">{m.message}</p>
              </div>
              <div className="flex shrink-0 gap-3">
                {!m.read && (
                  <button
                    onClick={() => markRead(m.id)}
                    className="font-mono text-xs text-zinc-500 transition-colors hover:text-white"
                  >
                    MARK READ
                  </button>
                )}
                <button
                  onClick={() => remove(m.id)}
                  className="font-mono text-xs text-zinc-600 transition-colors hover:text-red-400"
                >
                  DELETE
                </button>
              </div>
            </div>
          </div>
        ))}

        {messages.length === 0 && (
          <p className="font-mono text-xs text-zinc-600">No messages yet.</p>
        )}
      </div>
    </div>
  )
}
