import { bot } from '../src'

export default eventHandler(async (evt) => {
  const query = getQuery(evt)

  const chatId = query.chat_id
  if (typeof chatId !== 'string') return 'invalid chat_id'
  if (typeof query.msg_id !== 'string') return 'invalid msg_id'
  const msgId = +query.msg_id

  try {
    return await bot.telegram.deleteMessage(chatId, msgId)
  } catch (error) {
    return error
  }
})
