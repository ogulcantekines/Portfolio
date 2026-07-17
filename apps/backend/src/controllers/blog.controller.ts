import { NextFunction, Request, Response } from 'express'
import * as blogService from '../services/blog.service'

export const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await blogService.getAllPosts()
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
