import { describe, it, expect, beforeEach, afterAll } from 'vitest'
import request from 'supertest'
import app from '../app'
import { prisma } from '../lib/prisma'

describe('GET /api/blog', () => {
  beforeEach(async () => {
    await prisma.blogPost.deleteMany()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('returns an empty list and zero total when there are no posts', async () => {
    const res = await request(app).get('/api/blog')

    expect(res.status).toBe(200)
    expect(res.body.data).toEqual([])
    expect(res.body.pagination.total).toBe(0)
  })

  it('returns published posts wrapped in pagination metadata', async () => {
    await prisma.blogPost.create({
      data: {
        title: 'Forging a JWT',
        slug: 'forging-a-jwt',
        content: 'Full writeup...',
        excerpt: 'How I forged a token and then closed the hole',
        published: true,
        publishedAt: new Date(),
      },
    })

    const res = await request(app).get('/api/blog')

    expect(res.status).toBe(200)
    expect(res.body.data).toHaveLength(1)
    expect(res.body.data[0].title).toBe('Forging a JWT')
    expect(res.body.pagination.total).toBe(1)
  })

  it('does not return unpublished (draft) posts', async () => {
    await prisma.blogPost.create({
      data: {
        title: 'Draft post',
        slug: 'draft-post',
        content: 'Not ready yet',
        excerpt: 'Still a draft',
        published: false,
      },
    })

    const res = await request(app).get('/api/blog')

    expect(res.status).toBe(200)
    expect(res.body.data).toEqual([])
    expect(res.body.pagination.total).toBe(0)
  })
})
