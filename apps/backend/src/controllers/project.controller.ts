import { NextFunction, Request, Response } from 'express'
import * as projectService from '../services/project.service'

export const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const projects = await projectService.getAllProjects()
    res.json({ data: projects })
  } catch (err) {
    next(err)
  }
}

export const getFeatured = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const projects = await projectService.getFeaturedProjects()
    res.json({ data: projects })
  } catch (err) {
    next(err)
  }
}

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await projectService.getProjectById(req.params.id)
    if (!project) {
      res.status(404).json({ error: 'Project not found' })
      return
    }
    res.json({ data: project })
  } catch (err) {
    next(err)
  }
}
