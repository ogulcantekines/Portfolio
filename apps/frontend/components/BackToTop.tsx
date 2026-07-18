'use client'

import { useEffect, useState } from 'react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed right-8 bottom-8 z-50 border border-zinc-700 bg-black/80 px-3 py-3 font-mono text-xs text-zinc-400 backdrop-blur-sm transition-all hover:border-emerald-400/50 hover:text-emerald-400"
      aria-label="Back to top"
    >
      ↑
    </button>
  )
}
