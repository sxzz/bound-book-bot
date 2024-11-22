import { bot } from '../src'

export default eventHandler(async (evt) => {
  const query = getQuery(evt)
  try {
    const result = await bot.telegram.getChat(query.chat_id as string)
    return result
  } catch (error) {
    return error
  }
})
