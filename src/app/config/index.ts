import dotenv from 'dotenv'
import path from 'node:path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  port: process.env.PORT,
  database_url: process.env.MONGODB_URL,
  salt_round: process.env.BCRYPT_SALT_ROUND,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET,
  Access_Token_Expiration: process.env.ACCESS_TOKEN_EXPIRATION,
} as Record<string, string>
