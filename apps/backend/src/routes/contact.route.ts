import { Router, IRouter } from 'express'
import * as contactController from '../controllers/contact.controller'
import { requireAuth } from '../middleware/auth'

const router: IRouter = Router()

router.post('/', contactController.sendMessage)
router.get('/', requireAuth, contactController.getMessages)
router.patch('/:id/read', requireAuth, contactController.markRead)
router.delete('/:id', requireAuth, contactController.deleteMessage)

export default router
