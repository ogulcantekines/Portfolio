export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-black">
      <div className="flex items-center gap-3 font-mono text-sm tracking-widest text-emerald-400">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        LOADING...
      </div>
    </div>
  )
}
