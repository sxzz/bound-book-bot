import { bot } from '../src'

export default eventHandler(async (evt) => {
  const query = getQuery(evt)
  const chatId = query.chat_id
  if (typeof chatId !== 'string') return 'invalid chat_id'

  try {
    const result = await bot.telegram.leaveChat(chatId)
    return result ? 'success' : 'fail'
  } catch (error) {
    return error
  }
})
