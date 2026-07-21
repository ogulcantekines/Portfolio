import { Router, IRouter } from 'express'
import { login } from '../controllers/auth.controller'

const router: IRouter = Router()

router.post('/login', login)

export default router
