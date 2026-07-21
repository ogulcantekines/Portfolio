import { NextFunction, Request, Response } from 'express'
import { contactSchema } from '@portfolio/shared'
import * as contactService from '../services/contact.service'

export const getMessages = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await contactService.getMessages()
    res.json({ data })
  } catch (err) {
    next(err)
  }
}

export const markRead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await contactService.markRead(req.params.id)
    res.json({ data })
  } catch (err) {
    next(err)
  }
}

export const deleteMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await contactService.deleteMessage(req.params.id)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}

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
