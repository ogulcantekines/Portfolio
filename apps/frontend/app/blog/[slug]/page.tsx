import Link from 'next/link'
import { notFound } from 'next/navigation'
import ScrollReveal from '../../../components/ScrollReveal'

const posts: Record<
  string,
  {
    title: string
    excerpt: string
    publishedAt: string
    readTime: string
    tags: string[]
    content: string
  }
> = {
  'pentesting-my-own-portfolio': {
    title: 'Pentesting My Own Portfolio Site',
    excerpt: 'What happens when you build a web app and then try to break it yourself?',
    publishedAt: '2026-08-01',
    readTime: '8 min',
    tags: ['pentest', 'web-security', 'writeup'],
    content:
      'Coming soon. This writeup will cover the full penetration testing methodology applied to this portfolio site — reconnaissance, vulnerability discovery, exploitation, and remediation.',
  },
  'backend-api-security': {
    title: 'Securing a Node.js REST API: Rate Limiting, CORS, and Headers',
    excerpt: "A practical look at the security controls added to this portfolio's Express backend.",
    publishedAt: '2026-07-20',
    readTime: '6 min',
    tags: ['nodejs', 'security', 'api'],
    content:
      'Coming soon. This post will cover the security middleware stack — Helmet, CORS configuration, rate limiting — and why each control exists.',
  },
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = posts[slug]

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
            className="group mb-12 inline-flex items-center gap-2 font-mono text-xs tracking-widest text-zinc-600 transition-colors hover:text-emerald-400"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            BACK TO BLOG
          </Link>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="mb-12">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <time className="font-mono text-xs text-zinc-600">{post.publishedAt}</time>
              <span className="text-zinc-700">·</span>
              <span className="font-mono text-xs text-zinc-600">{post.readTime} read</span>
              <div className="flex gap-3">
                {post.tags.map((tag) => (
                  <span key={tag} className="font-mono text-xs text-emerald-400/50">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
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
