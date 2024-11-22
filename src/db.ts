import { Redis } from '@upstash/redis'
import { UPSTASH_REDIS_REST_TOKEN, UPSTASH_REDIS_REST_URL } from './env'

let channelMapCache: Record<string, number> | undefined
let adminsCache: number[] | undefined

const redis = new Redis({
  url: UPSTASH_REDIS_REST_URL,
  token: UPSTASH_REDIS_REST_TOKEN,
})

export async function getChannelMap() {
  channelMapCache ||=
    (await redis.json.get<Record<string, number>>('book:channels')) || undefined
  return channelMapCache
}

export async function getChannelIdByUser(uid: number) {
  return (
    await redis.json.get<number[]>('book:channels', `$.${String(uid)}`)
  )?.[0]
}

export async function getAdminList() {
  adminsCache ||= await redis.smembers<number[]>('book:admins')
  return adminsCache
}
