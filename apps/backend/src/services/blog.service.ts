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

export const getAllPostsAdmin = async () => {
  return prisma.blogPost.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      published: true,
      publishedAt: true,
    },
  })
}

export const getPostBySlug = async (slug: string) => {
  return prisma.blogPost.findUnique({
    where: { slug, published: true },
  })
}

export const getPostBySlugAdmin = async (slug: string) => {
  return prisma.blogPost.findUnique({
    where: { slug },
  })
}

export const createPost = async (data: {
  title: string
  slug: string
  content: string
  excerpt: string
  published?: boolean
  publishedAt?: Date
}) => {
  return prisma.blogPost.create({ data })
}

export const updatePost = async (
  slug: string,
  data: {
    title?: string
    content?: string
    excerpt?: string
    published?: boolean
    publishedAt?: Date | null
  }
) => {
  return prisma.blogPost.update({ where: { slug }, data })
}

export const deletePost = async (slug: string) => {
  return prisma.blogPost.delete({ where: { slug } })
}
