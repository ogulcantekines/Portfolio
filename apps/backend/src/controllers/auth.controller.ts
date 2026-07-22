import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '../lib/env'

export const login = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password } = req.body

    if (!password || password !== env.ADMIN_PASSWORD) {
      res.status(401).json({ error: 'Invalid password' })
      return
    }

    const token = jwt.sign({ admin: true }, env.JWT_SECRET, { expiresIn: '7d' })
    res.json({ token })
  } catch (err) {
    next(err)
  }
}
