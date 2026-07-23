import { Router, IRouter } from 'express'
import * as contactController from '../controllers/contact.controller'
import { requireAuth } from '../middleware/auth'
import rateLimit from 'express-rate-limit'

// Spam protection: a real person won't send many messages in 15 min.
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many messages. Please try again later.' },
})

const router: IRouter = Router()

router.post('/', contactLimiter, contactController.sendMessage)
router.get('/', requireAuth, contactController.getMessages)
router.patch('/:id/read', requireAuth, contactController.markRead)
router.delete('/:id', requireAuth, contactController.deleteMessage)

export default router
