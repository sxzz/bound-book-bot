import { Telegraf, Context } from 'telegraf'
import { Update, Message } from 'telegraf/types'

let channelMap: Record<string, number> | undefined

fetch(`${process.env.UPSTASH_REDIS_REST_URL!}/get/channel`, {
  headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN!}` },
})
  .then((response) => response.json())
  .then(({ result }) => {
    channelMap = JSON.parse(result)
  })

const BOT_TOKEN = process.env.BOT_TOKEN!
export const bot = new Telegraf(BOT_TOKEN)

bot.start((ctx) => ctx.reply('欢迎欢迎！'))
bot.help((ctx) => ctx.reply('在引用回复「投稿」！'))

const post = async (
  ctx: Context<{
    message: Update.New & Update.NonChannel & Message.TextMessage
    update_id: number
  }>
) => {
  if (!channelMap) {
    await ctx.reply('initializing...')
    return
  }

  if (!ctx.message?.reply_to_message) {
    await ctx.reply('请在引用回复中使用此命令')
    return
  }

  const senderId = ctx.message.reply_to_message.from?.id
  if (!senderId) return

  const channelId = channelMap[senderId]
  if (!channelId) return

  try {
    const { message_id, chat } = await bot.telegram.forwardMessage(
      channelId,
      ctx.message.chat.id,
      ctx.message.reply_to_message.message_id
    )

    const link = `https://t.me/c/${removeChannelIdPrefix(
      chat.id
    )}/${message_id}`
    await ctx.replyWithMarkdownV2(
      `投稿成功，这是第 ${message_id} 页。[阅读](${link})`
    )
  } catch (err) {
    console.error(err)
    await ctx.replyWithMarkdownV2(`投稿失败\n\`\`\`\n${err}\n\`\`\``)
  }
}
bot.hears('投稿', post)
bot.command('post', post)

bot.hears('按个指纹', async (ctx) => {
  await ctx.replyWithMarkdownV2(
    `\`\`\`\n${JSON.stringify(ctx.message, undefined, 2)}\n\`\`\``
  )
})

function removeChannelIdPrefix(channelId: number) {
  return String(channelId).slice(4)
}
