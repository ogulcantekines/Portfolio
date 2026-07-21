import { Router, IRouter } from 'express'
import * as projectController from '../controllers/project.controller'
import { requireAuth } from '../middleware/auth'

const router: IRouter = Router()

router.get('/', projectController.getAll)
router.get('/featured', projectController.getFeatured)
router.get('/:id', projectController.getById)

router.post('/', requireAuth, projectController.create)
router.put('/:id', requireAuth, projectController.update)
router.delete('/:id', requireAuth, projectController.remove)

export default router
