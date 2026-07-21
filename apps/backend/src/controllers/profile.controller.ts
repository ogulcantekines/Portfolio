import { NextFunction, Request, Response } from 'express'
import * as profileService from '../services/profile.service'

export const getSkills = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await profileService.getSkills()
    res.json({ data })
  } catch (err) {
    next(err)
  }
}

export const getStats = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await profileService.getStats()
    res.json({ data })
  } catch (err) {
    next(err)
  }
}

export const getExperience = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await profileService.getExperience()
    res.json({ data })
  } catch (err) {
    next(err)
  }
}

export const getCertifications = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await profileService.getCertifications()
    res.json({ data })
  } catch (err) {
    next(err)
  }
}

export const getSocials = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await profileService.getSocials()
    res.json({ data })
  } catch (err) {
    next(err)
  }
}

export const getAbout = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await profileService.getAbout()
    res.json({ data })
  } catch (err) {
    next(err)
  }
}
