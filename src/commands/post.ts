import { getChannelIdByUser } from '../db'
import { bot } from '../index'
import emojis from './emojis.json'
import type { Context } from 'telegraf'
import type { Message, Update } from 'telegraf/types'

export async function post(
  ctx: Context<{
    message: Update.New & Update.NonChannel & Message.TextMessage
    update_id: number
  }>,
) {
  try {
    const senderId = ctx.message.reply_to_message?.from?.id
    if (!ctx.message.reply_to_message || !senderId) {
      await ctx.reply('请在引用回复中使用此命令')
      return
    }

    const channelId = await getChannelIdByUser(senderId)
    if (!channelId) {
      await ctx.reply('该用户没有绑定频道')
      return
    }

    const originalChatId = ctx.message.chat.id
    const originalMsgId = ctx.message.reply_to_message.message_id
    const { message_id: msgId, chat: channelChat } =
      await bot.telegram.forwardMessage(
        channelId,
        originalChatId,
        originalMsgId,
      )

    const link = `https://t.me/c/${removeChannelIdPrefix(channelChat.id)}/${msgId}`
    await ctx.replyWithMarkdownV2(
      `投稿成功，这是第 ${msgId} 页。[阅读](${link})`,
    )

    await bot.telegram.setMessageReaction(originalChatId, originalMsgId, [
      { type: 'emoji', emoji: getRandomEmoji() },
    ])
  } catch (error) {
    console.error(error)
    await ctx.replyWithMarkdownV2(`投稿失败\n\`\`\`\n${error}\n\`\`\``)
  }
}

function removeChannelIdPrefix(channelId: number) {
  return String(channelId).slice(4)
}

function getRandomEmoji(): any {
  return emojis[Math.floor(Math.random() * emojis.length)]
}
