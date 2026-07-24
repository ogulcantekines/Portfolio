const DEFAULT_LIMIT = 10
const MAX_LIMIT = 100

export type PaginationParams = { page: number; limit: number; skip: number }

// Parse ?page & ?limit from a query object, with safe defaults and clamping.
export function getPagination(query: { page?: unknown; limit?: unknown }): PaginationParams {
  const page = Math.max(1, Number(query.page) || 1)
  const limit = Math.min(MAX_LIMIT, Math.max(1, Number(query.limit) || DEFAULT_LIMIT))
  return { page, limit, skip: (page - 1) * limit }
}

// Wrap a page of rows + the total count into the standard list response shape.
export function paginated<T>(data: T[], total: number, page: number, limit: number) {
  return {
    data,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  }
}
