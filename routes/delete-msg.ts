import { bot } from '../src'

export default eventHandler(async (evt) => {
  const query = getQuery(evt)
  try {
    return await bot.telegram.deleteMessage(
      query.chat_id as string,
      +query.msg_id!,
    )
  } catch (error) {
    return error
  }
})
