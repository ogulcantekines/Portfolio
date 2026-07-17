import { Router, IRouter } from 'express'
import projectRouter from './project.route'
import blogRouter from './blog.route'
import contactRouter from './contact.route'

export const router: IRouter = Router()

router.use('/projects', projectRouter)
router.use('/blog', blogRouter)
router.use('/contact', contactRouter)
