import { Router, IRouter } from 'express'
import * as projectController from '../controllers/project.controller'

const router: IRouter = Router()

router.get('/', projectController.getAll)
router.get('/featured', projectController.getFeatured)
router.get('/:id', projectController.getById)

export default router
