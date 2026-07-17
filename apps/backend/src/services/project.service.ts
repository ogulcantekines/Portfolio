import { prisma } from '../lib/prisma'

export const getAllProjects = async () => {
  return prisma.project.findMany({
    orderBy: { order: 'asc' },
  })
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
