import { NextFunction, Request, Response } from 'express'
import { blogSchema } from '@portfolio/shared'
import * as blogService from '../services/blog.service'
import { getPagination, paginated } from '../lib/pagination'

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, limit, skip } = getPagination(req.query)
    const { data, total } = await blogService.getAllPosts({ skip, take: limit })
    res.json(paginated(data, total, page, limit))
  } catch (err) {
    next(err)
  }
}

export const getAllAdmin = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await blogService.getAllPostsAdmin()
    res.json({ data: posts })
  } catch (err) {
    next(err)
  }
}

export const getBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await blogService.getPostBySlug(req.params.slug)
    if (!post) {
      res.status(404).json({ error: 'Post not found' })
      return
    }
    res.json({ data: post })
  } catch (err) {
    next(err)
  }
}

export const getBySlugAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await blogService.getPostBySlugAdmin(req.params.slug)
    if (!post) {
      res.status(404).json({ error: 'Post not found' })
      return
    }
    res.json({ data: post })
  } catch (err) {
    next(err)
  }
}

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = blogSchema.safeParse(req.body)
    if (!result.success) {
      res.status(400).json({ error: result.error.flatten().fieldErrors })
      return
    }
    const post = await blogService.createPost(result.data)
    res.status(201).json({ data: post })
  } catch (err) {
    next(err)
  }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = blogSchema.partial().safeParse(req.body)
    if (!result.success) {
      res.status(400).json({ error: result.error.flatten().fieldErrors })
      return
    }
    const post = await blogService.updatePost(req.params.slug, result.data)
    res.json({ data: post })
  } catch (err) {
    next(err)
  }
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await blogService.deletePost(req.params.slug)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}
