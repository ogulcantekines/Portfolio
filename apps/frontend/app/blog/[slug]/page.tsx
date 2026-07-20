import Link from 'next/link'
import { notFound } from 'next/navigation'
import ScrollReveal from '../../../components/ScrollReveal'

type Post = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  publishedAt: string | null
}

async function getPost(slug: string): Promise<Post | null> {
  const res = await fetch(`${process.env.API_URL}/api/blog/${slug}`, {
    next: { revalidate: 60 },
  })
  if (!res.ok) return null
  const json = await res.json()
  return json.data ?? null
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) notFound()

  return (
    <div className="bg-grid relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-emerald-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 py-24">
        <ScrollReveal>
          <Link
            href="/blog"
            className="mb-12 inline-flex items-center gap-2 font-mono text-xs text-zinc-600 transition-colors hover:text-emerald-400"
          >
            ← BACK TO BLOG
          </Link>

          <div className="mb-12">
            {post.publishedAt && (
              <time className="mb-6 block font-mono text-xs text-zinc-600">
                {new Date(post.publishedAt).toISOString().slice(0, 10)}
              </time>
            )}
            <h1 className="mb-6 text-4xl leading-tight font-bold text-white sm:text-5xl">
              {post.title}
            </h1>
            <p className="text-lg leading-relaxed text-zinc-400">{post.excerpt}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <div className="mb-12 h-px bg-gradient-to-r from-emerald-500/30 via-zinc-800 to-transparent" />
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="border border-zinc-800/60 bg-zinc-900/20 p-8 backdrop-blur-sm">
            <p className="mb-4 font-mono text-xs text-emerald-400">{'// content'}</p>
            <p className="leading-relaxed text-zinc-400">{post.content}</p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
