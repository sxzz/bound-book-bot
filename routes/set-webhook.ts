import { SECRET_HASH } from '~/src/utils'
import { bot, commands } from '../src'

export default eventHandler(async (evt) => {
  const host = getRequestHeader(evt, 'x-forwarded-host') || getRequestHost(evt)
  const webhookUrl = `https://${host}/telegram-hook?secret_hash=${SECRET_HASH}`
  const isSet = await bot.telegram.setWebhook(webhookUrl)
  const info = await bot.telegram.getWebhookInfo()
  await bot.telegram.setMyCommands(commands)

  return `Set webhook to ${webhookUrl.replaceAll(
    SECRET_HASH,
    '*',
  )}: ${isSet}<br/>${JSON.stringify(info).replaceAll(SECRET_HASH, '*')}`
})
