import { toast } from '@/components/Toaster'

const API = process.env.NEXT_PUBLIC_API_URL

// Turn the backend's error shape into a readable message.
// Zod errors come back as { error: { field: ["msg", ...] } }; others as { error: "msg" }.
function readableError(body: unknown, status: number): string {
  const err = (body as { error?: unknown } | null)?.error
  if (typeof err === 'string') return err
  if (err && typeof err === 'object') {
    return Object.entries(err as Record<string, string[]>)
      .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
      .join(' · ')
  }
  return `Request failed (${status})`
}

/**
 * Fetch wrapper for authenticated admin calls.
 * - Attaches the admin token.
 * - On 401 (missing/expired token) clears it and redirects to the login page.
 * - On any other error throws a readable message so the caller can show it.
 * - Returns parsed JSON (or undefined for 204).
 */
export async function adminFetch<T = unknown>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('admin_token')

  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })

  if (res.status === 401) {
    localStorage.removeItem('admin_token')
    window.location.href = '/admin'
    throw new Error('Session expired — please log in again.')
  }

  if (!res.ok) {
    const body = await res.json().catch(() => null)
    const message = readableError(body, res.status)
    toast.error(message)
    throw new Error(message)
  }

  const method = (options.method ?? 'GET').toUpperCase()
  if (method === 'POST' || method === 'PUT') toast.success('Saved')
  else if (method === 'DELETE') toast.success('Deleted')

  if (res.status === 204) return undefined as T
  return (await res.json()) as T
}
