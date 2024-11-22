import process from 'node:process'

export const TOKEN = process.env.TOKEN!
export const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL!
export const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN!
export const BOT_TOKEN = process.env.BOT_TOKEN!

if (
  !TOKEN ||
  !UPSTASH_REDIS_REST_URL ||
  !UPSTASH_REDIS_REST_TOKEN ||
  !BOT_TOKEN
) {
  throw new Error('missing env')
}
