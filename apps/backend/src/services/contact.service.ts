import { prisma } from '../lib/prisma'
import { ContactInput } from '@portfolio/shared'

export const createMessage = async (data: ContactInput) => {
  return prisma.contactMessage.create({ data })
}

export const getMessages = async () => {
  return prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } })
}

export const markRead = async (id: string) => {
  return prisma.contactMessage.update({ where: { id }, data: { read: true } })
}

export const deleteMessage = async (id: string) => {
  return prisma.contactMessage.delete({ where: { id } })
}
