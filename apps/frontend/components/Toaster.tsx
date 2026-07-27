'use client'

import { useEffect, useState } from 'react'

type ToastItem = { id: number; message: string; type: 'success' | 'error' }

// Simple global toast store so any code (including the adminFetch helper, which
// is not a React component) can trigger a toast without a context/provider.
let listeners: Array<(items: ToastItem[]) => void> = []
let items: ToastItem[] = []
let nextId = 1

function emit() {
  for (const l of listeners) l([...items])
}

function push(message: string, type: 'success' | 'error') {
  const id = nextId++
  items = [...items, { id, message, type }]
  emit()
  setTimeout(() => {
    items = items.filter((t) => t.id !== id)
    emit()
  }, 3500)
}

export const toast = {
  success: (message: string) => push(message, 'success'),
  error: (message: string) => push(message, 'error'),
}

// Mount once (in the admin layout). Renders the active toasts in the corner.
export function Toaster() {
  const [list, setList] = useState<ToastItem[]>([])

  useEffect(() => {
    listeners.push(setList)
    return () => {
      listeners = listeners.filter((l) => l !== setList)
    }
  }, [])

  return (
    <div className="fixed right-6 bottom-6 z-[100] flex flex-col gap-2">
      {list.map((t) => (
        <div
          key={t.id}
          role="status"
          className={`min-w-56 border px-4 py-3 font-mono text-xs shadow-lg backdrop-blur-md ${
            t.type === 'success'
              ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
              : 'border-red-500/40 bg-red-500/10 text-red-300'
          }`}
        >
          {t.message}
        </div>
      ))}
    </div>
  )
}
