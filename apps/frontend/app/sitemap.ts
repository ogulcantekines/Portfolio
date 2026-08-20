import type { MetadataRoute } from 'next'

// Generated at request time so `next build` never needs a live backend — the
// same reason the pages use `export const dynamic = 'force-dynamic'`.
export const dynamic = 'force-dynamic'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

type Post = { slug: string; publishedAt: string | null }
type Project = { slug: string; updatedAt: string }

// Mirror the pages' fetch behaviour: read from the internal API, and degrade to
// an empty list on any failure so the sitemap still builds the static routes.
async function fetchList<T>(endpoint: string): Promise<T[]> {
  try {
    const res = await fetch(`${process.env.API_URL}${endpoint}`, { cache: 'no-store' })
    if (!res.ok) return []
    return (await res.json()).data ?? []
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, projects] = await Promise.all([
    fetchList<Post>('/api/blog?limit=100'),
    fetchList<Project>('/api/projects?limit=100'),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/projects`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/blog`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/contact`, changeFrequency: 'yearly', priority: 0.5 },
  ]

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: p.publishedAt ? new Date(p.publishedAt) : undefined,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...projectRoutes, ...postRoutes]
}
