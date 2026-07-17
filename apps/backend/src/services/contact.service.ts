import { prisma } from '../lib/prisma'
import { ContactInput } from '@portfolio/shared'

export const createMessage = async (data: ContactInput) => {
  return prisma.contactMessage.create({ data })
}
