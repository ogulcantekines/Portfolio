import { describe, it, expect } from 'vitest'
import { getPagination, paginated } from './pagination'

describe('getPagination', () => {
  it('returns defaults when no params are given', () => {
    expect(getPagination({})).toEqual({ page: 1, limit: 10, skip: 0 })
  })

  it('computes skip from page and limit', () => {
    expect(getPagination({ page: 3, limit: 10 })).toEqual({ page: 3, limit: 10, skip: 20 })
  })

  it('clamps limit to a maximum of 100', () => {
    expect(getPagination({ limit: 999 }).limit).toBe(100)
  })

  it('coerces invalid or negative page to 1', () => {
    expect(getPagination({ page: 0 }).page).toBe(1)
    expect(getPagination({ page: 'abc' }).page).toBe(1)
  })
})

describe('paginated', () => {
  it('wraps data with pagination metadata and computes totalPages', () => {
    const result = paginated(['a', 'b'], 25, 1, 10)
    expect(result).toEqual({
      data: ['a', 'b'],
      pagination: { page: 1, limit: 10, total: 25, totalPages: 3 },
    })
  })
})
