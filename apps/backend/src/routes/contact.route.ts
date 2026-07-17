import { Router, IRouter } from 'express'
import * as contactController from '../controllers/contact.controller'

const router: IRouter = Router()

router.post('/', contactController.sendMessage)

export default router
