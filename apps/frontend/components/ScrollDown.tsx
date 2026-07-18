'use client'

export default function ScrollDown() {
  return (
    <button
      onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
      className="group mt-20 flex flex-col items-center gap-2"
      aria-label="Scroll down"
    >
      <span className="font-mono text-xs tracking-[0.3em] text-zinc-700 transition-colors group-hover:text-zinc-500">
        SCROLL
      </span>
      <div className="flex flex-col items-center gap-1">
        <span
          className="h-px w-px animate-[fadeDown_1.5s_ease_infinite] rounded-full bg-emerald-400/60"
          style={{ animationDelay: '0s' }}
        />
        <span
          className="h-px w-px animate-[fadeDown_1.5s_ease_infinite] rounded-full bg-emerald-400/40"
          style={{ animationDelay: '0.2s' }}
        />
        <span
          className="h-px w-px animate-[fadeDown_1.5s_ease_infinite] rounded-full bg-emerald-400/20"
          style={{ animationDelay: '0.4s' }}
        />
      </div>
      <div className="h-10 w-px overflow-hidden bg-zinc-800">
        <div className="h-full w-full animate-[scrollLine_1.5s_ease_infinite] bg-gradient-to-b from-transparent via-emerald-400 to-transparent" />
      </div>
    </button>
  )
}
