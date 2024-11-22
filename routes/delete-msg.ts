import { z } from 'zod'
import { bot } from '~/src'
import { parseMsgUrl, sendJson } from '~/src/utils'

const schema = z
  .object({
    url: z.coerce.string().url(),
  })
  .or(
    z.object({
      chat_id: z.coerce.number().int(),
      msg_id: z.coerce.number().int().positive(),
    }),
  )

export default eventHandler(async (evt) => {
  const query = await getValidatedQuery(evt, schema.parse)

  let chatId: number
  let msgId: number

  if ('url' in query) {
    ;[chatId, msgId] = parseMsgUrl(query.url)
  } else {
    ;({ chat_id: chatId, msg_id: msgId } = query)
  }

  try {
    return await bot.telegram.deleteMessage(chatId, msgId)
  } catch (error) {
    return sendJson(evt, error)
  }
})
