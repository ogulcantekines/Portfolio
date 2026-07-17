import { prisma } from '../lib/prisma'

export const getAllPosts = async () => {
  return prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      publishedAt: true,
    },
  })
}

export const getPostBySlug = async (slug: string) => {
  return prisma.blogPost.findUnique({
    where: { slug, published: true },
  })
}
