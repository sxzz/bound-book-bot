import { bot } from '../src'

export default eventHandler(async (evt) => {
  const query = getQuery(evt)
  try {
    const result = await bot.telegram.deleteMessage(
      query.chat_id as string,
      +query.msg_id!,
    )
    return result
  } catch (error) {
    return error
  }
})
