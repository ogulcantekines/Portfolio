import type { NextConfig } from 'next'
import path from 'node:path'

const nextConfig: NextConfig = {
  // Produce a self-contained server bundle (.next/standalone) for Docker —
  // it copies only the files actually needed to run, plus a minimal server.js.
  output: 'standalone',
  // In a pnpm monorepo, dependencies are hoisted to the repo root, so trace
  // from there; otherwise the standalone server would miss required modules.
  outputFileTracingRoot: path.join(__dirname, '..', '..'),
}

export default nextConfig
