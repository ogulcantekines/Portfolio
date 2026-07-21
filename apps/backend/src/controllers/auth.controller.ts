import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const login = (req: Request, res: Response) => {
  const { password } = req.body

  if (password !== process.env.ADMIN_PASSWORD) {
    res.status(401).json({ error: 'Invalid password' })
    return
  }

  const token = jwt.sign({ admin: true }, process.env.JWT_SECRET!, { expiresIn: '7d' })
  res.json({ token })
}
