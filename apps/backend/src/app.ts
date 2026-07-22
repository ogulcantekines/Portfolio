import express, { Express, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { ZodError } from 'zod'
import { router } from './routes'

const app: Express = express()

app.use(helmet())
app.use(cors({ origin: process.env.FRONTEND_URL ?? 'http://localhost:3000' }))
app.use(express.json())
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
)

app.use('/api', router)

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ZodError) {
    res.status(400).json({ error: err.flatten().fieldErrors })
    return
  }
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
})

export default app
