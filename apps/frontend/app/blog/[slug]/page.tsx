import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
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
  try {
    const res = await fetch(`${process.env.API_URL}/api/blog/${slug}`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return null
    const json = await res.json()
    return json.data ?? null
  } catch {
    return null
  }
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
            <p className="mb-6 font-mono text-xs text-emerald-400">{'// content'}</p>
            <div className="space-y-4">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h2 className="mt-8 mb-4 text-2xl font-bold text-white">{children}</h2>
                  ),
                  h2: ({ children }) => (
                    <h3 className="mt-8 mb-4 text-xl font-bold text-white">{children}</h3>
                  ),
                  h3: ({ children }) => (
                    <h4 className="mt-6 mb-3 text-lg font-semibold text-white">{children}</h4>
                  ),
                  p: ({ children }) => <p className="leading-relaxed text-zinc-400">{children}</p>,
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300"
                    >
                      {children}
                    </a>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc space-y-2 pl-6 text-zinc-400">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal space-y-2 pl-6 text-zinc-400">{children}</ol>
                  ),
                  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-2 border-emerald-500/40 pl-4 text-zinc-500 italic">
                      {children}
                    </blockquote>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-white">{children}</strong>
                  ),
                  hr: () => <hr className="border-zinc-800" />,
                  pre: ({ children }) => (
                    <pre className="overflow-x-auto rounded border border-zinc-800 bg-black/50 p-4 font-mono text-sm text-zinc-300">
                      {children}
                    </pre>
                  ),
                  code: ({ className, children }) =>
                    className?.includes('language-') ? (
                      <code className={className}>{children}</code>
                    ) : (
                      <code className="rounded bg-zinc-800/60 px-1.5 py-0.5 font-mono text-sm text-emerald-300">
                        {children}
                      </code>
                    ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
