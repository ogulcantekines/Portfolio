# syntax=docker/dockerfile:1

# ============================================================
# Stage 1 — builder: install deps and run `next build`
#   (with output: 'standalone' this yields .next/standalone)
# ============================================================
FROM node:22-slim AS builder

RUN corepack enable
WORKDIR /app

# Workspace manifests (all package.json's so --frozen-lockfile resolves the
# whole workspace) + root tsconfig.json.
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json tsconfig.json ./
COPY apps/frontend/package.json ./apps/frontend/
COPY apps/backend/package.json ./apps/backend/
COPY packages/shared/package.json ./packages/shared/
RUN pnpm install --frozen-lockfile --ignore-scripts

# NEXT_PUBLIC_* vars are inlined into the client bundle at BUILD time. Empty by
# default -> the browser calls "/api/..." (same origin), which nginx proxies.
ARG NEXT_PUBLIC_API_URL=""
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Frontend source, then build (produces .next/standalone + .next/static).
COPY apps/frontend ./apps/frontend/
RUN pnpm --filter @portfolio/frontend build

# ============================================================
# Stage 2 — runtime: run the tiny self-contained standalone server
# ============================================================
FROM node:22-slim AS runtime

ENV NODE_ENV=production
WORKDIR /app

# The standalone bundle mirrors the monorepo layout under /app
# (server.js ends up at /app/apps/frontend/server.js, deps at /app/node_modules).
COPY --from=builder /app/apps/frontend/.next/standalone ./
# public/ and .next/static are NOT part of standalone by default — copy them in.
COPY --from=builder /app/apps/frontend/.next/static ./apps/frontend/.next/static
COPY --from=builder /app/apps/frontend/public ./apps/frontend/public

# Run as the unprivileged node user (security).
USER node

# server.js reads HOSTNAME/PORT; 0.0.0.0 so the published port can reach it.
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
EXPOSE 3000

CMD ["node", "apps/frontend/server.js"]
