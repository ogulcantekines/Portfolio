# syntax=docker/dockerfile:1

# ============================================================
# Stage 1 — builder: install deps and run `next build`
#   (with output: 'standalone' this yields .next/standalone)
# ============================================================
FROM node:22-slim AS builder

RUN corepack enable
WORKDIR /app

# Workspace manifests. Only the frontend's own package.json is copied: pnpm
# installs every workspace member whose manifest is present, so copying the
# backend's would pull express, prisma, vitest and friends into this image.
# The frontend does not import @portfolio/shared and its tsconfig does not
# extend the root one, so neither is needed here.
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY apps/frontend/package.json ./apps/frontend/
RUN pnpm install --frozen-lockfile --ignore-scripts

# NEXT_PUBLIC_* vars are inlined into the client bundle at BUILD time. Empty by
# default -> the browser calls "/api/..." (same origin), which nginx proxies.
ARG NEXT_PUBLIC_API_URL=""
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Public site URL, baked in for sitemap.xml / robots.txt / OG metadata. Empty ->
# the code falls back to http://localhost:3000 (wrong in prod); set to the real
# domain so search engines get correct URLs.
ARG NEXT_PUBLIC_SITE_URL=""
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

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

# Next.js writes its data and image cache here at runtime. Create it as root and
# hand it to node; everything else stays root-owned so the process cannot modify
# its own code.
RUN mkdir -p apps/frontend/.next/cache && chown node:node apps/frontend/.next/cache

# Run as the unprivileged node user (security).
USER node

# server.js reads HOSTNAME/PORT; 0.0.0.0 so the published port can reach it.
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
EXPOSE 3000

CMD ["node", "apps/frontend/server.js"]
