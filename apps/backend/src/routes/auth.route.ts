import { Router, IRouter } from 'express'
import rateLimit from 'express-rate-limit'
import { login } from '../controllers/auth.controller'

const router: IRouter = Router()

// Brute-force protection: limit login attempts per IP.
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts. Try again later.' },
})

router.post('/login', loginLimiter, login)

export default router
