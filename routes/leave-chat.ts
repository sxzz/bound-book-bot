import { z } from 'zod'
import { sendJson } from '~/src/utils'
import { bot } from '../src'

const schema = z.object({
  chat_id: z.coerce.number().int(),
})

export default eventHandler(async (evt) => {
  const { chat_id: chatId } = await getValidatedQuery(evt, schema.parse)

  try {
    const result = await bot.telegram.leaveChat(chatId)
    return result ? 'success' : 'fail'
  } catch (error) {
    return sendJson(evt, error)
  }
})
