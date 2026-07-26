import { describe, it, expect, beforeEach, afterAll } from 'vitest'
import request from 'supertest'
import app from '../app'
import { prisma } from '../lib/prisma'

describe('GET /api/projects', () => {
  // Start each test from a clean table so results are predictable.
  beforeEach(async () => {
    await prisma.project.deleteMany()
  })

  // Close the DB connection once all tests finish so the runner can exit.
  afterAll(async () => {
    await prisma.$disconnect()
  })

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
})
