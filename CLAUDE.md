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

- **`src/app.ts`** — Express app instance. Registers middleware in order: pino-http request logging → helmet → cors → express.json → rateLimit → `/api` router → `/health` → global error handler (4-param signature).
- **`src/routes/index.ts`** — Aggregator router mounted at `/api`. Delegates `/auth`, `/projects`, `/blog`, `/contact`, `/profile` to sub-routers. Admin-only write routes sit behind the JWT middleware in `src/middleware/auth.ts`.
- **`src/controllers/*.ts`** — HTTP layer only. All handlers are async, use try/catch, and call `next(err)` on failure.
- **`src/services/*.ts`** — All Prisma queries live here. Controllers never touch Prisma directly.
- **`src/lib/prisma.ts`** — Singleton PrismaClient (globalThis pattern to survive hot reload in dev).

CORS origin is `process.env.FRONTEND_URL ?? 'http://localhost:3000'` — set `FRONTEND_URL` in prod.

## Frontend architecture

Next.js App Router (`apps/frontend/src/app/`). Reads the AGENTS.md note: this is Next.js 16, which has breaking changes from what most training data covers — check `node_modules/next/dist/docs/` before writing Next.js-specific code.

## Shared package

`packages/shared/src/index.ts` exports Zod schemas (e.g. `contactSchema`) and their inferred TypeScript types. Only the backend imports it, as `@portfolio/shared`; the frontend does not use it. The package is compiled: `"main"` points at `./dist/index.js`, so `pnpm --filter '@portfolio/shared' build` must run before the backend type-checks or starts (the root `build` script and both CI jobs do this). A missing `dist` shows up as `MODULE_NOT_FOUND` at backend start, not as a build error.

## Data models (Prisma)

Nine models in `apps/backend/prisma/schema.prisma`: `Project`, `BlogPost`, `ContactMessage`, plus the profile content edited from the admin panel (`About`, `Stat`, `Experience`, `SkillCategory`, `Certification`, `Social`). IDs are cuid strings. `BlogPost.slug` is unique. Run `prisma generate` after schema changes (`postinstall` does this automatically).

## Infrastructure

- **`docker-compose.yml`** (dev) — only PostgreSQL; apps run directly on the host.
- **`docker-compose.prod.yml`** — the full stack: `db`, `backend`, `frontend`, `nginx`. Used on the server and for local production-shape testing with `--env-file .env.prod`. CI builds and boots it on every PR.
- **`infra/nginx.prod.conf`** — the nginx config the compose stack mounts: TLS termination with a Cloudflare Origin certificate, `/api/*` → `backend:5000`, everything else → `frontend:3000`, security headers.
- **`infra/backup-db.sh`** — nightly `pg_dump` on the server (see `docs/RECOVERY.md`).

## Git workflow

- **Never commit without asking the user first.**
- **Never add `Co-Authored-By: Claude` to commits.**
- All changes go through PRs — never push directly to `main`.
- Pre-commit hook runs `pnpm lint && pnpm format --check`; fix failures before committing.
