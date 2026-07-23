import { NextFunction, Request, Response } from 'express'
import {
  skillSchema,
  statSchema,
  experienceSchema,
  certificationSchema,
  socialSchema,
  aboutSchema,
} from '@portfolio/shared'
import * as profileService from '../services/profile.service'

const handle =
  (fn: (req: Request) => Promise<unknown>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await fn(req)
      res.json({ data })
    } catch (err) {
      next(err)
    }
  }

const handleCreate =
  (fn: (req: Request) => Promise<unknown>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await fn(req)
      res.status(201).json({ data })
    } catch (err) {
      next(err)
    }
  }

const handleDelete =
  (fn: (req: Request) => Promise<unknown>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req)
      res.status(204).send()
    } catch (err) {
      next(err)
    }
  }

export const getSkills = handle(() => profileService.getSkills())
export const createSkill = handleCreate((req) =>
  profileService.createSkill(skillSchema.parse(req.body))
)
export const updateSkill = handle((req) =>
  profileService.updateSkill(req.params.id, skillSchema.partial().parse(req.body))
)
export const deleteSkill = handleDelete((req) => profileService.deleteSkill(req.params.id))

export const getStats = handle(() => profileService.getStats())
export const createStat = handleCreate((req) =>
  profileService.createStat(statSchema.parse(req.body))
)
export const updateStat = handle((req) =>
  profileService.updateStat(req.params.id, statSchema.partial().parse(req.body))
)
export const deleteStat = handleDelete((req) => profileService.deleteStat(req.params.id))

export const getExperience = handle(() => profileService.getExperience())
export const createExperience = handleCreate((req) =>
  profileService.createExperience(experienceSchema.parse(req.body))
)
export const updateExperience = handle((req) =>
  profileService.updateExperience(req.params.id, experienceSchema.partial().parse(req.body))
)
export const deleteExperience = handleDelete((req) =>
  profileService.deleteExperience(req.params.id)
)

export const getCertifications = handle(() => profileService.getCertifications())
export const createCertification = handleCreate((req) =>
  profileService.createCertification(certificationSchema.parse(req.body))
)
export const updateCertification = handle((req) =>
  profileService.updateCertification(req.params.id, certificationSchema.partial().parse(req.body))
)
export const deleteCertification = handleDelete((req) =>
  profileService.deleteCertification(req.params.id)
)

export const getSocials = handle(() => profileService.getSocials())
export const createSocial = handleCreate((req) =>
  profileService.createSocial(socialSchema.parse(req.body))
)
export const updateSocial = handle((req) =>
  profileService.updateSocial(req.params.id, socialSchema.partial().parse(req.body))
)
export const deleteSocial = handleDelete((req) => profileService.deleteSocial(req.params.id))

export const getAbout = handle(() => profileService.getAbout())
export const updateAbout = handle((req) =>
  profileService.updateAbout(req.params.slug, aboutSchema.parse(req.body))
)
