import Link from 'next/link'
import ScrollReveal from '../../components/ScrollReveal'

const posts = [
  {
    slug: 'pentesting-my-own-portfolio',
    title: 'Pentesting My Own Portfolio Site',
    excerpt:
      'What happens when you build a web app and then try to break it yourself? A walkthrough of the methodology, findings, and fixes.',
    publishedAt: '2026-08-01',
    tags: ['pentest', 'web-security', 'writeup'],
    readTime: '8 min',
  },
  {
    slug: 'backend-api-security',
    title: 'Securing a Node.js REST API: Rate Limiting, CORS, and Headers',
    excerpt:
      "A practical look at the security controls added to this portfolio's Express backend — and why each one matters.",
    publishedAt: '2026-07-20',
    tags: ['nodejs', 'security', 'api'],
    readTime: '6 min',
  },
]

export default function Blog() {
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
                <div className="mb-4 flex flex-wrap items-center gap-4">
                  <time className="font-mono text-xs text-zinc-600">{post.publishedAt}</time>
                  <span className="font-mono text-xs text-zinc-700">·</span>
                  <span className="font-mono text-xs text-zinc-600">{post.readTime} read</span>
                  <div className="flex gap-3">
                    {post.tags.map((tag) => (
                      <span key={tag} className="font-mono text-xs text-emerald-400/50">
                        #{tag}
                      </span>
                    ))}
                  </div>
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
        </div>
      </div>
    </div>
  )
}
