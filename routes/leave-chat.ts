import { bot } from '../src'

export default eventHandler(async (evt) => {
  const query = getQuery(evt)
  try {
    const result = await bot.telegram.leaveChat(query.chat_id as string)
    return result ? 'success' : 'fail'
  } catch (error) {
    return error
  }
})
