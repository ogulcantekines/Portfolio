'use client'

import { useEffect, useState } from 'react'

// Thin emerald bar at the very top that fills as the page is scrolled.
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      setProgress(max > 0 ? Math.min(1, Math.max(0, el.scrollTop / max)) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="pointer-events-none fixed top-0 left-0 z-[60] h-0.5 w-full bg-transparent">
      <div
        className="h-full origin-left bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.6)] transition-transform duration-100 ease-out"
        style={{ transform: `scaleX(${progress})`, width: '100%' }}
      />
    </div>
  )
}
