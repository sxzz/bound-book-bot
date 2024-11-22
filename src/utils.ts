import type { H3Event } from 'h3'

// https://t.me/c/[chatId]/[msgId]
export function parseMsgUrl(url: string): [chatId: number, msgId: number] {
  const urlObj = new URL(url)
  const paths = urlObj.pathname.split('/')
  if (paths.length < 4) throw new Error('Invalid URL')

  const chatId = +`-100${paths[2]}`
  const msgId = +paths[3]
  return [chatId, msgId] as const
}

export function sendJson(event: H3Event, value: any) {
  return send(event, JSON.stringify(value, undefined, 2), 'application/json')
}
