import { Router, IRouter } from 'express'
import * as blogController from '../controllers/blog.controller'

const router: IRouter = Router()

router.get('/', blogController.getAll)
router.get('/:slug', blogController.getBySlug)

export default router
