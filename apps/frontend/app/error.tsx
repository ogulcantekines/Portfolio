'use client'

// Error boundaries must be Client Components. In Next 16 the retry helper is
// `unstable_retry` (re-fetches and re-renders the segment), not the old `reset`.
import { useEffect } from 'react'

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="bg-grid relative flex min-h-screen items-center justify-center">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10 px-6 text-center">
        <p className="mb-4 font-mono text-xs tracking-[0.3em] text-red-400">ERROR</p>
        <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">Something went wrong</h1>
        <p className="mb-10 font-mono text-sm text-zinc-600">
          <span className="text-red-400">{'>'}</span> An unexpected error occurred
          <span className="cursor-blink text-red-400">_</span>
        </p>
        <button
          onClick={() => unstable_retry()}
          className="inline-flex items-center gap-2 border border-emerald-500 bg-emerald-500 px-8 py-3 font-mono text-xs font-bold tracking-widest text-black transition-all hover:bg-transparent hover:text-emerald-400"
        >
          TRY AGAIN
        </button>
      </div>
    </div>
  )
}
