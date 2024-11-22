import { getChannelMap } from './channel'
import { bot } from './index'
import type { Context } from 'telegraf'
import type { Message, Update } from 'telegraf/types'

export async function post(
  ctx: Context<{
    message: Update.New & Update.NonChannel & Message.TextMessage
    update_id: number
  }>,
) {
  const channelMap = await getChannelMap()
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
      ctx.message.reply_to_message.message_id,
    )

    const link = `https://t.me/c/${removeChannelIdPrefix(
      chat.id,
    )}/${message_id}`
    await ctx.replyWithMarkdownV2(
      `投稿成功，这是第 ${message_id} 页。[阅读](${link})`,
    )
  } catch (error) {
    console.error(error)
    await ctx.replyWithMarkdownV2(`投稿失败\n\`\`\`\n${error}\n\`\`\``)
  }
}

function removeChannelIdPrefix(channelId: number) {
  return String(channelId).slice(4)
}
