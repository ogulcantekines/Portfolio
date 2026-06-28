import { Router, IRouter } from 'express'

export const router: IRouter = Router()

router.get('/', (_req, res) => {
  res.json({ message: 'Portfolio API' })
})
