import { UPSTASH_REDIS_REST_TOKEN, UPSTASH_REDIS_REST_URL } from './env'

let channelMapCache: Record<string, number> | undefined

export async function getChannelMap() {
  if (channelMapCache) return channelMapCache

  const { result } = await fetch(`${UPSTASH_REDIS_REST_URL}/get/channel`, {
    headers: { Authorization: `Bearer ${UPSTASH_REDIS_REST_TOKEN}` },
  }).then((response) => response.json())
  return (channelMapCache = JSON.parse(result))
}
