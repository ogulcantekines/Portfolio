'use client'

import { useEffect, useRef, useState } from 'react'

// Single "DOWNLOAD CV" button that opens a small menu to pick a language.
// A client component because the dropdown needs open/close state and
// outside-click / Escape handling.
export default function CvDownload() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onPointer = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const item =
    'flex items-center justify-between gap-8 px-5 py-3 font-mono text-xs tracking-widest text-zinc-400 transition-colors hover:bg-emerald-500/10 hover:text-emerald-400'

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 border border-zinc-800 px-8 py-3 font-mono text-xs font-bold tracking-widest text-zinc-600 transition-all duration-300 hover:border-zinc-600 hover:text-zinc-400"
      >
        DOWNLOAD CV
        <span className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute top-full left-0 z-30 mt-2 min-w-full overflow-hidden border border-zinc-800 bg-black/95 backdrop-blur-md"
        >
          <a
            href="/cv-en.pdf"
            download="Ogulcan_Tekines_CV_EN.pdf"
            role="menuitem"
            onClick={() => setOpen(false)}
            className={item}
          >
            ENGLISH <span className="text-zinc-600">↓</span>
          </a>
          <a
            href="/cv-tr.pdf"
            download="Ogulcan_Tekines_CV_TR.pdf"
            role="menuitem"
            onClick={() => setOpen(false)}
            className={`${item} border-t border-zinc-800`}
          >
            TURKISH <span className="text-zinc-600">↓</span>
          </a>
        </div>
      )}
    </div>
  )
}
