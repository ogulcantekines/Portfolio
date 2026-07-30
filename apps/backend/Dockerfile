# syntax=docker/dockerfile:1

# ============================================================
# Stage 1 — builder: install ALL deps and compile everything
# ============================================================
FROM node:22-slim AS builder

# Prisma's engine needs openssl at build time (client generation).
RUN apt-get update \
    && apt-get install -y --no-install-recommends openssl \
    && rm -rf /var/lib/apt/lists/*

# corepack activates the pnpm version pinned in the root package.json.
RUN corepack enable

WORKDIR /app

# Manifests first (layer cache) + root tsconfig.json (the packages' tsconfig
# files `extends` it, otherwise tsc falls back to es5 and fails on Map/Set).
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json tsconfig.json ./
COPY packages/shared/package.json ./packages/shared/
COPY apps/backend/package.json ./apps/backend/

# Install every dependency (dev + prod). --ignore-scripts: source isn't here yet.
RUN pnpm install --frozen-lockfile --ignore-scripts

# Copy source, then compile: shared -> prisma client -> backend (tsc).
COPY packages/shared ./packages/shared/
COPY apps/backend ./apps/backend/
RUN pnpm --filter @portfolio/shared build \
    && pnpm --filter @portfolio/backend exec prisma generate \
    && pnpm --filter @portfolio/backend build

# ============================================================
# Stage 2 — runtime: PROD-only deps + compiled output (slim)
# ============================================================
FROM node:22-slim AS runtime

# The Prisma engine needs openssl at runtime too.
RUN apt-get update \
    && apt-get install -y --no-install-recommends openssl \
    && rm -rf /var/lib/apt/lists/*

RUN corepack enable

ENV NODE_ENV=production
WORKDIR /app

# Manifests + prisma schema (schema is needed to generate the client here).
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY packages/shared/package.json ./packages/shared/
COPY apps/backend/package.json ./apps/backend/
COPY apps/backend/prisma ./apps/backend/prisma/

# Install ONLY production dependencies — leaves out typescript, vitest, eslint,
# esbuild, prettier, tsx, @types/* ... (the heavy dev tools) -> much smaller.
RUN pnpm install --prod --frozen-lockfile --ignore-scripts

# Generate the Prisma client (prisma is a prod dep now; schema is present).
RUN pnpm --filter @portfolio/backend exec prisma generate

# Bring ONLY the compiled output from the builder stage (no source, no dev deps).
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist

# Run as the unprivileged 'node' user shipped with the image (security).
USER node
WORKDIR /app/apps/backend

EXPOSE 5000

# On start: apply any pending DB migrations, then launch the server.
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]
