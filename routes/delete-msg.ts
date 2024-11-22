import { bot } from '../src'

export default eventHandler(async (evt) => {
  const query = getQuery(evt)

  const url = query.url
  let chatId: string
  let msgId: number

  if (typeof url === 'string') {
    // https://t.me/c/[chatId]/[msgId]
    const urlObj = new URL(url)
    const paths = urlObj.pathname.split('/')
    chatId = `-100${paths[2]}`
    msgId = +paths[3]
  } else {
    if (typeof query.chat_id !== 'string') return 'invalid chat_id'
    chatId = query.chat_id
    if (typeof query.msg_id !== 'string') return 'invalid msg_id'
    msgId = +query.msg_id
  }

  try {
    return await bot.telegram.deleteMessage(chatId, msgId)
  } catch (error) {
    return error
  }
})
