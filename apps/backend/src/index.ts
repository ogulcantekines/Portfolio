import 'dotenv/config'
import { env } from './lib/env'
import app from './app'
import { logger } from './lib/logger'

app.listen(env.PORT, () => {
  logger.info(`Backend running on port ${env.PORT}`)
})
