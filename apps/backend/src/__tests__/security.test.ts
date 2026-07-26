import { describe, it, expect, afterAll } from 'vitest'
import request from 'supertest'
import jwt from 'jsonwebtoken'
import app from '../app'
import { prisma } from '../lib/prisma'
import { env } from '../lib/env'

describe('security controls', () => {
  afterAll(async () => {
    await prisma.$disconnect()
  })

  describe('authentication', () => {
    it('rejects a write request with no token (401)', async () => {
      const res = await request(app)
        .post('/api/projects')
        .send({ title: 'x', description: 'y', techStack: ['z'] })

      expect(res.status).toBe(401)
    })

    it('rejects a token forged with the wrong secret (401)', async () => {
      const forged = jwt.sign({ admin: true }, 'attacker-guessed-secret')

      const res = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${forged}`)
        .send({ title: 'x', description: 'y', techStack: ['z'] })

      expect(res.status).toBe(401)
    })
  })

  describe('input validation', () => {
    it('rejects an invalid payload with 400 even when authenticated', async () => {
      const token = jwt.sign({ admin: true }, env.JWT_SECRET)

      const res = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${token}`)
        .send({ title: '' })

      expect(res.status).toBe(400)
    })
  })

  describe('rate limiting', () => {
    it('blocks brute-force login after too many attempts (429)', async () => {
      let lastStatus = 0
      for (let i = 0; i < 6; i++) {
        const res = await request(app).post('/api/auth/login').send({ password: 'wrong-password' })
        lastStatus = res.status
      }

      expect(lastStatus).toBe(429)
    })
  })
})
