import { bot } from '../src'

export default eventHandler(async (evt) => {
  const query = getQuery(evt)
  try {
    return await bot.telegram.getChat(query.chat_id as string)
  } catch (error) {
    return error
  }
})
