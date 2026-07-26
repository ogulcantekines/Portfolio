import { describe, it, expect, beforeEach, afterAll } from 'vitest'
import request from 'supertest'
import jwt from 'jsonwebtoken'
import app from '../app'
import { prisma } from '../lib/prisma'
import { env } from '../lib/env'

describe('projects endpoint', () => {
  // Start each test from a clean table so results are predictable.
  beforeEach(async () => {
    await prisma.project.deleteMany()
  })

  // Close the DB connection once all tests finish so the runner can exit.
  afterAll(async () => {
    await prisma.$disconnect()
  })

  describe('GET /api/projects', () => {
    it('returns an empty list and zero total when there are no projects', async () => {
      const res = await request(app).get('/api/projects')

      expect(res.status).toBe(200)
      expect(res.body.data).toEqual([])
      expect(res.body.pagination.total).toBe(0)
    })

    it('returns created projects wrapped in pagination metadata', async () => {
      await prisma.project.create({
        data: { title: 'Nmap Wrapper', description: 'A port scanner', techStack: ['Go'] },
      })

      const res = await request(app).get('/api/projects')

      expect(res.status).toBe(200)
      expect(res.body.data).toHaveLength(1)
      expect(res.body.data[0].title).toBe('Nmap Wrapper')
      expect(res.body.pagination.total).toBe(1)
    })

    it('paginates results with ?page and ?limit', async () => {
      for (const n of [1, 2, 3]) {
        await prisma.project.create({
          data: { title: `Project ${n}`, description: 'x', techStack: ['Go'], order: n },
        })
      }

      const page1 = await request(app).get('/api/projects?page=1&limit=2')
      expect(page1.body.data).toHaveLength(2)
      expect(page1.body.pagination.total).toBe(3)
      expect(page1.body.pagination.totalPages).toBe(2)

      const page2 = await request(app).get('/api/projects?page=2&limit=2')
      expect(page2.body.data).toHaveLength(1)
      expect(page2.body.pagination.page).toBe(2)
    })
  })

  describe('POST /api/projects', () => {
    it('creates a project with a valid token and valid body (201)', async () => {
      const token = jwt.sign({ admin: true }, env.JWT_SECRET)

      const res = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'New Project', description: 'Created in a test', techStack: ['TypeScript'] })

      expect(res.status).toBe(201)
      expect(res.body.data.title).toBe('New Project')

      // The project should actually be persisted, not just echoed back.
      expect(await prisma.project.count()).toBe(1)
    })
  })
})
