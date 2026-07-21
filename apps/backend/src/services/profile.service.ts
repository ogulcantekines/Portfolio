import { prisma } from '../lib/prisma'

export const getSkills = () => prisma.skillCategory.findMany({ orderBy: { order: 'asc' } })
export const createSkill = (data: {
  name: string
  icon: string
  items: string[]
  order?: number
}) => prisma.skillCategory.create({ data })
export const updateSkill = (
  id: string,
  data: { name?: string; icon?: string; items?: string[]; order?: number }
) => prisma.skillCategory.update({ where: { id }, data })
export const deleteSkill = (id: string) => prisma.skillCategory.delete({ where: { id } })

export const getStats = () => prisma.stat.findMany({ orderBy: { order: 'asc' } })
export const createStat = (data: { value: string; label: string; order?: number }) =>
  prisma.stat.create({ data })
export const updateStat = (id: string, data: { value?: string; label?: string; order?: number }) =>
  prisma.stat.update({ where: { id }, data })
export const deleteStat = (id: string) => prisma.stat.delete({ where: { id } })

export const getExperience = () => prisma.experience.findMany({ orderBy: { order: 'asc' } })
export const createExperience = (data: {
  year: string
  title: string
  place: string
  description: string
  order?: number
}) => prisma.experience.create({ data })
export const updateExperience = (
  id: string,
  data: { year?: string; title?: string; place?: string; description?: string; order?: number }
) => prisma.experience.update({ where: { id }, data })
export const deleteExperience = (id: string) => prisma.experience.delete({ where: { id } })

export const getCertifications = () => prisma.certification.findMany({ orderBy: { order: 'asc' } })
export const createCertification = (data: {
  name: string
  issuer: string
  status: string
  year: string
  order?: number
}) => prisma.certification.create({ data })
export const updateCertification = (
  id: string,
  data: { name?: string; issuer?: string; status?: string; year?: string; order?: number }
) => prisma.certification.update({ where: { id }, data })
export const deleteCertification = (id: string) => prisma.certification.delete({ where: { id } })

export const getSocials = () => prisma.social.findMany({ orderBy: { order: 'asc' } })
export const createSocial = (data: { label: string; href: string; icon: string; order?: number }) =>
  prisma.social.create({ data })
export const updateSocial = (
  id: string,
  data: { label?: string; href?: string; icon?: string; order?: number }
) => prisma.social.update({ where: { id }, data })
export const deleteSocial = (id: string) => prisma.social.delete({ where: { id } })

export const getAbout = () => prisma.about.findMany()
export const updateAbout = (slug: string, data: { content: string }) =>
  prisma.about.update({ where: { slug }, data })
