import { Router, IRouter } from 'express'
import * as blogController from '../controllers/blog.controller'
import { requireAuth } from '../middleware/auth'

const router: IRouter = Router()

router.get('/', blogController.getAll)
router.get('/:slug', blogController.getBySlug)

router.post('/', requireAuth, blogController.create)
router.put('/:slug', requireAuth, blogController.update)
router.delete('/:slug', requireAuth, blogController.remove)

export default router
