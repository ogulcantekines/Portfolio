import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
})

export type ContactInput = z.infer<typeof contactSchema>

export const projectSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  techStack: z.array(z.string().min(1).max(50)).max(30),
  githubUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
  imageUrl: z.string().url().optional(),
  featured: z.boolean().optional(),
  order: z.number().int().min(0).optional(),
})

export type ProjectInput = z.infer<typeof projectSchema>

export const blogSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z
    .string()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9-]+$/, 'slug may only contain lowercase letters, numbers, and hyphens'),
  content: z.string().min(1),
  excerpt: z.string().min(1).max(500),
  published: z.boolean().optional(),
  publishedAt: z.coerce.date().optional(),
})

export type BlogInput = z.infer<typeof blogSchema>

// Only http(s) URLs — rejects javascript:, data:, etc. (stored-XSS defense at the input)
const httpUrl = z
  .string()
  .url()
  .refine((u) => /^https?:\/\//i.test(u), 'must be an http(s) URL')

export const skillSchema = z.object({
  name: z.string().min(1).max(100),
  icon: z.string().min(1).max(50),
  items: z.array(z.string().min(1).max(100)).max(50),
  order: z.number().int().min(0).optional(),
})

export const statSchema = z.object({
  value: z.string().min(1).max(50),
  label: z.string().min(1).max(100),
  order: z.number().int().min(0).optional(),
})

export const experienceSchema = z.object({
  year: z.string().min(1).max(50),
  title: z.string().min(1).max(200),
  place: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  order: z.number().int().min(0).optional(),
})

export const certificationSchema = z.object({
  name: z.string().min(1).max(200),
  issuer: z.string().min(1).max(200),
  status: z.string().min(1).max(50),
  year: z.string().min(1).max(50),
  order: z.number().int().min(0).optional(),
})

export const socialSchema = z.object({
  label: z.string().min(1).max(100),
  href: httpUrl,
  icon: z.string().min(1).max(50),
  order: z.number().int().min(0).optional(),
})

export const aboutSchema = z.object({
  content: z.string().min(1).max(5000),
})
