import { NextFunction, Request, Response } from 'express'
import { contactSchema } from '@portfolio/shared'
import * as contactService from '../services/contact.service'

export const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = contactSchema.safeParse(req.body)

    if (!result.success) {
      res.status(400).json({ error: result.error.flatten().fieldErrors })
      return
    }

    const message = await contactService.createMessage(result.data)
    res.status(201).json({ data: message })
  } catch (err) {
    next(err)
  }
}
