import express, { Express } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
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

export default app
