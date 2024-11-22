import { bot } from '../src'

export default eventHandler(async (evt) => {
  const query = getQuery(evt)

  const chatId = query.chat_id
  if (typeof chatId !== 'string') return 'invalid chat_id'

  try {
    return await bot.telegram.getChat(chatId)
  } catch (error) {
    return error
  }
})
