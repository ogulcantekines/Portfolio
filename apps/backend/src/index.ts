import 'dotenv/config'
import { env } from './lib/env'
import app from './app'
import { logger } from './lib/logger'
import { prisma } from './lib/prisma'

const server = app.listen(env.PORT, () => {
  logger.info(`Backend running on port ${env.PORT}`)
})

// Node runs as PID 1 in the container, and the kernel does not deliver SIGTERM
// to PID 1 unless a handler is installed. Without this, `docker stop` waits 10s
// and then SIGKILLs the process (exit 137), cutting off in-flight requests.
function shutdown(signal: NodeJS.Signals) {
  logger.info(`${signal} received, shutting down`)
  // Stop accepting new connections and let in-flight requests finish.
  server.close(() => {
    void prisma.$disconnect().finally(() => process.exit(0))
  })
  // Stay under Docker's 10s stop timeout if a connection refuses to close.
  setTimeout(() => process.exit(1), 8000).unref()
}

process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)
