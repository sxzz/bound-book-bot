import process from 'node:process'

export const SECRET_HASH = process.env.SECRET_HASH!
export const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL!
export const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN!
export const BOT_TOKEN = process.env.BOT_TOKEN!

if (
  !SECRET_HASH ||
  !UPSTASH_REDIS_REST_URL ||
  !UPSTASH_REDIS_REST_TOKEN ||
  !BOT_TOKEN
) {
  throw new Error('missing env')
}
