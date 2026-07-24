import { NextFunction, Request, Response } from 'express'
import * as projectService from '../services/project.service'
import { projectSchema } from '@portfolio/shared'
import { getPagination, paginated } from '../lib/pagination'

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, limit, skip } = getPagination(req.query)
    const { data, total } = await projectService.getAllProjects({ skip, take: limit })
    res.json(paginated(data, total, page, limit))
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

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = projectSchema.safeParse(req.body)
    if (!result.success) {
      res.status(400).json({ error: result.error.flatten().fieldErrors })
      return
    }
    const project = await projectService.createProject(result.data)
    res.status(201).json({ data: project })
  } catch (err) {
    next(err)
  }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = projectSchema.partial().safeParse(req.body)
    if (!result.success) {
      res.status(400).json({ error: result.error.flatten().fieldErrors })
      return
    }
    const project = await projectService.updateProject(req.params.id, result.data)
    res.json({ data: project })
  } catch (err) {
    next(err)
  }
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await projectService.deleteProject(req.params.id)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}
