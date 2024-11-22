import { z } from 'zod'
import { bot } from '~/src'
import { sendJson } from '~/src/utils'

const schema = z.object({
  chat_id: z.coerce.number().int(),
})

export default eventHandler(async (evt) => {
  const { chat_id: chatId } = await getValidatedQuery(evt, schema.parse)
  try {
    return await bot.telegram.getChat(chatId)
  } catch (error) {
    return sendJson(evt, error)
  }
})
