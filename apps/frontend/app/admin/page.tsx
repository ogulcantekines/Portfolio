'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('admin_token')) router.push('/admin/projects')
  }, [router])

  const login = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      const { token } = await res.json()
      localStorage.setItem('admin_token', token)
      router.push('/admin/projects')
    } else {
      setError('Invalid password')
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="w-full max-w-sm border border-zinc-800 bg-zinc-900/20 p-8">
        <p className="mb-8 font-mono text-xs tracking-[0.3em] text-emerald-400">ADMIN LOGIN</p>

        <form onSubmit={login} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border border-zinc-800 bg-black px-4 py-3 font-mono text-sm text-white placeholder-zinc-700 outline-none focus:border-emerald-500/50"
            autoFocus
          />

          {error && <p className="font-mono text-xs text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer border border-emerald-500 bg-emerald-500 py-3 font-mono text-xs font-bold tracking-widest text-black transition-all hover:bg-transparent hover:text-emerald-400 disabled:opacity-50"
          >
            {loading ? 'LOGGING IN...' : 'LOGIN'}
          </button>
        </form>
      </div>
    </div>
  )
}
