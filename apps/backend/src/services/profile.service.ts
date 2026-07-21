import { prisma } from '../lib/prisma'

export const getSkills = () => prisma.skillCategory.findMany({ orderBy: { order: 'asc' } })

export const getStats = () => prisma.stat.findMany({ orderBy: { order: 'asc' } })

export const getExperience = () => prisma.experience.findMany({ orderBy: { order: 'asc' } })

export const getCertifications = () => prisma.certification.findMany({ orderBy: { order: 'asc' } })

export const getSocials = () => prisma.social.findMany({ orderBy: { order: 'asc' } })

export const getAbout = () => prisma.about.findMany()
