import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="bg-grid relative flex min-h-screen items-center justify-center">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10 px-6 text-center">
        <p className="mb-4 font-mono text-xs tracking-[0.3em] text-emerald-400">ERROR</p>
        <h1 className="mb-4 text-8xl font-bold text-white sm:text-9xl">404</h1>
        <p className="mb-2 text-xl text-zinc-400">Page not found</p>
        <p className="mb-12 font-mono text-sm text-zinc-600">
          <span className="text-emerald-400">{'>'}</span> The page you are looking for does not
          exist
          <span className="cursor-blink text-emerald-400">_</span>
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 border border-emerald-500 bg-emerald-500 px-8 py-3 font-mono text-xs font-bold tracking-widest text-black transition-all hover:bg-transparent hover:text-emerald-400"
        >
          ← GO HOME
        </Link>
      </div>
    </div>
  )
}
