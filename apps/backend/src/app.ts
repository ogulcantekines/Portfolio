import express, { Express, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { ZodError } from 'zod'
import { router } from './routes'
import { Prisma } from '@prisma/client'
import { prisma } from './lib/prisma'
import pinoHttp from 'pino-http'
import { logger } from './lib/logger'

const app: Express = express()

// Behind nginx (reverse proxy): trust the first hop so req.ip reflects the real
// client (from X-Forwarded-For), not nginx's container IP. Required for correct
// per-client rate limiting. With Cloudflare added later this becomes a 2-hop
// chain — revisit then (nginx real_ip, or 'trust proxy' = 2).
app.set('trust proxy', 1)

app.use(pinoHttp({ logger }))

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

app.get('/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`
    res.json({ status: 'ok', db: 'up' })
  } catch {
    res.status(503).json({ status: 'error', db: 'down' })
  }
})

app.use((err: unknown, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ZodError) {
    res.status(400).json({ error: err.flatten().fieldErrors })
    return
  }
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2025') {
      res.status(404).json({ error: 'Record not found' })
      return
    }
    if (err.code === 'P2002') {
      res.status(409).json({ error: 'A record with this value already exists' })
      return
    }
  }
  req.log.error({ err }, 'Unhandled error')
  res.status(500).json({ error: 'Internal server error' })
})

export default app
