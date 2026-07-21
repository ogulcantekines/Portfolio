import { Router, IRouter } from 'express'
import projectRouter from './project.route'
import blogRouter from './blog.route'
import contactRouter from './contact.route'
import profileRouter from './profile.route'
import authRouter from './auth.route'

export const router: IRouter = Router()

router.use('/auth', authRouter)
router.use('/projects', projectRouter)
router.use('/blog', blogRouter)
router.use('/contact', contactRouter)
router.use('/profile', profileRouter)
