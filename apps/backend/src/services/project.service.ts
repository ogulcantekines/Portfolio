import { prisma } from '../lib/prisma'

export const getAllProjects = async ({ skip, take }: { skip: number; take: number }) => {
  const [data, total] = await prisma.$transaction([
    prisma.project.findMany({ orderBy: { order: 'asc' }, skip, take }),
    prisma.project.count(),
  ])
  return { data, total }
}

export const getFeaturedProjects = async () => {
  return prisma.project.findMany({
    where: { featured: true },
    orderBy: { order: 'asc' },
  })
}

export const getProjectById = async (id: string) => {
  return prisma.project.findUnique({
    where: { id },
  })
}

export const createProject = async (data: {
  title: string
  description: string
  techStack: string[]
  githubUrl?: string | null
  liveUrl?: string | null
  imageUrl?: string | null
  featured?: boolean
  order?: number
}) => {
  return prisma.project.create({ data })
}

export const updateProject = async (
  id: string,
  data: {
    title?: string
    description?: string
    techStack?: string[]
    githubUrl?: string | null
    liveUrl?: string | null
    imageUrl?: string | null
    featured?: boolean
    order?: number
  }
) => {
  return prisma.project.update({ where: { id }, data })
}

export const deleteProject = async (id: string) => {
  return prisma.project.delete({ where: { id } })
}
