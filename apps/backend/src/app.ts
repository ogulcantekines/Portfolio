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

// Requests arrive as visitor -> Cloudflare -> nginx -> here, so two hops sit in
// front of us. Express builds [socket address, ...X-Forwarded-For reversed] and
// treats the first `n` entries as proxies: at 1 it stops on Cloudflare's edge IP
// and rate limiting buckets every visitor behind that edge together. At 2 it
// resolves the actual visitor.
//
// This trusts the header, so it is only sound while the origin is unreachable
// except through Cloudflare — otherwise a direct request can forge
// X-Forwarded-For and dodge the limiter. Closing that path is the firewall work
// tracked separately; the header is equally forgeable at 1, so this is a strict
// improvement either way.
app.set('trust proxy', 2)

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
