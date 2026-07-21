import { Router, IRouter } from 'express'
import * as profileController from '../controllers/profile.controller'
import { requireAuth } from '../middleware/auth'

const router: IRouter = Router()

router.get('/skills', profileController.getSkills)
router.post('/skills', requireAuth, profileController.createSkill)
router.put('/skills/:id', requireAuth, profileController.updateSkill)
router.delete('/skills/:id', requireAuth, profileController.deleteSkill)

router.get('/stats', profileController.getStats)
router.post('/stats', requireAuth, profileController.createStat)
router.put('/stats/:id', requireAuth, profileController.updateStat)
router.delete('/stats/:id', requireAuth, profileController.deleteStat)

router.get('/experience', profileController.getExperience)
router.post('/experience', requireAuth, profileController.createExperience)
router.put('/experience/:id', requireAuth, profileController.updateExperience)
router.delete('/experience/:id', requireAuth, profileController.deleteExperience)

router.get('/certifications', profileController.getCertifications)
router.post('/certifications', requireAuth, profileController.createCertification)
router.put('/certifications/:id', requireAuth, profileController.updateCertification)
router.delete('/certifications/:id', requireAuth, profileController.deleteCertification)

router.get('/socials', profileController.getSocials)
router.post('/socials', requireAuth, profileController.createSocial)
router.put('/socials/:id', requireAuth, profileController.updateSocial)
router.delete('/socials/:id', requireAuth, profileController.deleteSocial)

router.get('/about', profileController.getAbout)
router.put('/about/:slug', requireAuth, profileController.updateAbout)

export default router
