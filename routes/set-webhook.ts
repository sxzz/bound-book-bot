import { TOKEN } from '~/src/env'
import { bot, commands } from '../src'

export default eventHandler(async (evt) => {
  const host = getRequestHeader(evt, 'x-forwarded-host') || getRequestHost(evt)
  const webhookUrl = `https://${host}/telegram-hook?token=${TOKEN}`
  const isSet = await bot.telegram.setWebhook(webhookUrl)
  const info = await bot.telegram.getWebhookInfo()
  await bot.telegram.setMyCommands(commands)

  return `Set webhook to ${webhookUrl.replaceAll(
    TOKEN,
    '*',
  )}: ${isSet}<br/>${JSON.stringify(info).replaceAll(TOKEN, '*')}`
})
