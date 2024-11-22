import type { Context } from 'telegraf'
import type { Message, Update } from 'telegraf/types'

export async function fingerprint(
  ctx: Context<{
    message: Update.New & Update.NonChannel & Message.TextMessage
    update_id: number
  }>,
) {
  await ctx.replyWithMarkdownV2(
    `\`\`\`\n${JSON.stringify(ctx.message, undefined, 2)}\n\`\`\``,
  )
}
