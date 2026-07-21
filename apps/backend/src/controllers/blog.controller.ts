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

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await blogService.createPost(req.body)
    res.status(201).json({ data: post })
  } catch (err) {
    next(err)
  }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await blogService.updatePost(req.params.slug, req.body)
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
