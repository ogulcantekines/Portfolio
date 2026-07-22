import 'dotenv/config'
import { env } from './lib/env'
import app from './app'

app.listen(env.PORT, () => {
  console.log(`Backend running on port ${env.PORT}`)
})
