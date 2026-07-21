import { Router, IRouter } from 'express'
import * as profileController from '../controllers/profile.controller'

const router: IRouter = Router()

router.get('/skills', profileController.getSkills)
router.get('/stats', profileController.getStats)
router.get('/experience', profileController.getExperience)
router.get('/certifications', profileController.getCertifications)
router.get('/socials', profileController.getSocials)
router.get('/about', profileController.getAbout)

export default router
