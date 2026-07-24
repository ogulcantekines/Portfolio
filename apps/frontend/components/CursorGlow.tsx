'use client'

import { useEffect, useRef } from 'react'

// A soft emerald spotlight that follows the cursor. Desktop only (no cursor on
// touch devices). Uses a CSS variable + rAF so it stays smooth.
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--x', `${e.clientX}px`)
        el.style.setProperty('--y', `${e.clientY}px`)
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] hidden md:block"
      style={{
        background:
          'radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgba(16, 185, 129, 0.06), transparent 40%)',
      }}
    />
  )
}
