import { Request, Response, NextFunction } from 'express'
import { createHash, timingSafeEqual } from 'crypto'
import jwt from 'jsonwebtoken'
import { env } from '../lib/env'

// Constant-time comparison — same duration regardless of where a mismatch is.
const safeEqual = (a: string, b: string) =>
  timingSafeEqual(createHash('sha256').update(a).digest(), createHash('sha256').update(b).digest())

export const login = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password } = req.body

    if (typeof password !== 'string' || !safeEqual(password, env.ADMIN_PASSWORD)) {
      res.status(401).json({ error: 'Invalid password' })
      return
    }

    const token = jwt.sign({ admin: true }, env.JWT_SECRET, { expiresIn: '7d' })
    res.json({ token })
  } catch (err) {
    next(err)
  }
}
