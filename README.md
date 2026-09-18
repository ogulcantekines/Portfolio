# Portfolio

[![CI](https://github.com/ogulcantekines/Portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/ogulcantekines/Portfolio/actions/workflows/ci.yml)

Personal portfolio site with a self-hosted content backend and an admin panel. Projects, blog posts, and profile content are stored in PostgreSQL and served through a REST API, so everything on the site is editable from a protected `/admin` dashboard — no redeploys to change content.

## Tech stack

| Layer    | Stack                                                         |
| -------- | ------------------------------------------------------------- |
| Frontend | Next.js 16 (App Router), React 19, Tailwind CSS 4, TypeScript |
| Backend  | Express, TypeScript, Prisma ORM, JWT auth                     |
| Database | PostgreSQL 16 (Docker)                                        |
| Shared   | Zod schemas + inferred types (`@portfolio/shared`)            |
| Tooling  | pnpm workspaces, ESLint, Prettier, Husky, GitHub Actions (CI) |

## Features

- **Public site** — animated hero, about, skills, experience, certifications, projects, blog, and contact form.
- **Admin panel** (`/admin`) — JWT-protected dashboard to manage projects, blog posts, contact messages, and all profile sections.
- **REST API** — CRUD endpoints for projects, blog, contact, and profile data.
- **Validation** — contact form submissions validated with a Zod schema from the shared package.
- **Security baseline** — Helmet, CORS, and rate limiting on the API.

## Monorepo structure

```
apps/
  backend/      Express + Prisma REST API  (@portfolio/backend)
  frontend/     Next.js app                (@portfolio/frontend)
packages/
  shared/       Zod schemas & shared types (@portfolio/shared)
infra/
  nginx.prod.conf   nginx config for the production compose stack
  backup-db.sh      Nightly database backup script
```

## Backend architecture

Requests flow through clear layers, each with a single responsibility:

```
index.ts → app.ts → routes → controllers → services → Prisma → PostgreSQL
```

- **routes** — declare endpoints and attach auth middleware.
- **controllers** — HTTP layer only (parse request, send response, `next(err)` on failure).
- **services** — all database access; controllers never touch Prisma directly.

## Getting started

### Prerequisites

- Node.js 20+
- pnpm 10+
- Docker (for PostgreSQL)

### 1. Install

```bash
pnpm install
```

### 2. Environment variables

```bash
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.example apps/frontend/.env.local
```

Then fill in the values (database URL, `JWT_SECRET`, `ADMIN_PASSWORD`, API URLs).

### 3. Database

```bash
docker compose up -d                                  # start PostgreSQL
pnpm --filter '@portfolio/backend' exec prisma migrate dev   # run migrations
pnpm --filter '@portfolio/backend' seed               # seed sample data
```

### 4. Run

```bash
pnpm dev            # start backend (:5000) and frontend (:3000) together
```

- Frontend → http://localhost:3000
- Backend → http://localhost:5000
- Admin → http://localhost:3000/admin

## Scripts

Run from the repo root:

```bash
pnpm dev                              # run all apps in dev mode
pnpm build                            # build shared package, then all apps
pnpm lint                             # lint all apps
pnpm format                           # format with Prettier

pnpm --filter '@portfolio/backend' dev            # backend only
pnpm --filter '@portfolio/frontend' dev           # frontend only
pnpm --filter '@portfolio/backend' exec prisma studio   # inspect the database
```

## Deployment

Production runs as four containers from `docker-compose.prod.yml`: PostgreSQL, the backend, the frontend and nginx. nginx (`infra/nginx.prod.conf`) terminates TLS and routes `/api/*` to the backend and everything else to the Next.js server. The backend container applies pending Prisma migrations on start, so no manual `migrate deploy` step is needed. Operations and recovery steps are in `docs/RECOVERY.md`.

## License

All rights reserved — see the [LICENSE](./LICENSE) file. This project is published for portfolio and reference purposes only.
