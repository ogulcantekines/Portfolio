import Link from 'next/link'
import ScrollReveal from '../../components/ScrollReveal'

type Post = {
  id: string
  title: string
  slug: string
  excerpt: string
  publishedAt: string | null
}

async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch(`${process.env.API_URL}/api/blog`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return []
    const json = await res.json()
    return json.data ?? []
  } catch {
    return []
  }
}

export default async function Blog() {
  const posts = await getPosts()

  return (
    <div className="bg-grid relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-emerald-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24">
        <ScrollReveal>
          <div className="mb-16">
            <p className="mb-4 font-mono text-xs tracking-[0.3em] text-emerald-400">WRITING</p>
            <h1 className="text-5xl font-bold text-white sm:text-6xl">Blog</h1>
          </div>
        </ScrollReveal>

        <div className="space-y-2">
          {posts.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 100}>
              <Link
                href={`/blog/${post.slug}`}
                className="card-glow group block border border-zinc-800/60 bg-zinc-900/20 p-8 backdrop-blur-sm"
              >
                <div className="mb-4">
                  {post.publishedAt && (
                    <time className="font-mono text-xs text-zinc-600">
                      {new Date(post.publishedAt).toISOString().slice(0, 10)}
                    </time>
                  )}
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="mb-2 text-xl font-semibold text-white transition-colors group-hover:text-emerald-400">
                      {post.title}
                    </h2>
                    <p className="text-sm leading-relaxed text-zinc-500">{post.excerpt}</p>
                  </div>
                  <span className="mt-1 shrink-0 font-mono text-sm text-zinc-700 transition-colors group-hover:text-emerald-400">
                    →
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}

          {posts.length === 0 && <p className="font-mono text-sm text-zinc-600">No posts yet.</p>}
        </div>
      </div>
    </div>
  )
}
