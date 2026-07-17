# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Monorepo structure

pnpm workspaces with three packages:
- `apps/backend` — Express + TypeScript API (`@portfolio/backend`)
- `apps/frontend` — Next.js 16 + React 19 + Tailwind 4 (`@portfolio/frontend`)
- `packages/shared` — Zod schemas and TypeScript types shared between both apps (`@portfolio/shared`)

## Common commands

Run from the repo root unless noted.

```bash
# Start all apps in parallel (dev mode)
pnpm dev

# Target a single workspace
pnpm --filter '@portfolio/backend' dev     # tsx watch — runs backend on port 5000
pnpm --filter '@portfolio/frontend' dev   # next dev — runs frontend on port 3000

# Build
pnpm --filter '@portfolio/backend' build  # tsc → dist/
pnpm build                                # builds all apps

# Lint & format (runs on all apps; also enforced by pre-commit hook)
pnpm lint
pnpm format --check

# Database
docker compose up -d                      # start postgres container (portfolio_db, port 5432)
pnpm --filter '@portfolio/backend' exec prisma migrate dev
pnpm --filter '@portfolio/backend' exec prisma studio
```

## Backend architecture

`src/index.ts` → `src/app.ts` → routes → controllers → services → Prisma

- **`src/app.ts`** — Express app instance. Registers middleware in order: helmet → cors → express.json → rateLimit → `/api` router → `/health` → global error handler (4-param signature).
- **`src/routes/index.ts`** — Aggregator router mounted at `/api`. Delegates `/projects`, `/blog`, `/contact` to sub-routers.
- **`src/controllers/*.ts`** — HTTP layer only. All handlers are async, use try/catch, and call `next(err)` on failure.
- **`src/services/*.ts`** — All Prisma queries live here. Controllers never touch Prisma directly.
- **`src/lib/prisma.ts`** — Singleton PrismaClient (globalThis pattern to survive hot reload in dev).

CORS origin is `process.env.FRONTEND_URL ?? 'http://localhost:3000'` — set `FRONTEND_URL` in prod.

## Frontend architecture

Next.js App Router (`apps/frontend/src/app/`). Reads the AGENTS.md note: this is Next.js 16, which has breaking changes from what most training data covers — check `node_modules/next/dist/docs/` before writing Next.js-specific code.

## Shared package

`packages/shared/src/index.ts` exports Zod schemas (e.g. `contactSchema`) and their inferred TypeScript types. Both apps import as `@portfolio/shared`. The package uses `"main": "./src/index.ts"` — it's consumed as raw TypeScript, not compiled.

## Data models (Prisma)

Three models in `apps/backend/prisma/schema.prisma`: `Project`, `BlogPost`, `ContactMessage`. IDs are cuid strings. `BlogPost.slug` is unique. Run `prisma generate` after schema changes (`postinstall` does this automatically).

## Infrastructure

- **Docker Compose** — only PostgreSQL; apps run directly on the host in dev.
- **`infra/nginx.conf`** — reverse proxy config for VPS deploy: `/api/*` → port 5000, everything else → port 3000 (Next.js). Includes TLS termination and security headers.

## Git workflow

- **Never commit without asking the user first.**
- **Never add `Co-Authored-By: Claude` to commits.**
- All changes go through PRs — never push directly to `main`.
- Pre-commit hook runs `pnpm lint && pnpm format --check`; fix failures before committing.
