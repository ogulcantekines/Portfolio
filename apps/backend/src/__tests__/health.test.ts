import { describe, it, expect, afterAll } from 'vitest'
import request from 'supertest'
import app from '../app'
import { prisma } from '../lib/prisma'

describe('GET /health', () => {
  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('reports ok and db up when the database is reachable', async () => {
    const res = await request(app).get('/health')

    expect(res.status).toBe(200)
    expect(res.body).toEqual({ status: 'ok', db: 'up' })
  })
})
