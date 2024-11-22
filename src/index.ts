import { Telegraf } from 'telegraf'
import { BOT_TOKEN } from './env'
import { post } from './post'
import type { BotCommand } from 'telegraf/types'

export const bot = new Telegraf(BOT_TOKEN)

bot.start((ctx) => ctx.reply('欢迎欢迎！'))
bot.help((ctx) => ctx.reply('在引用回复「投稿」！'))

bot.hears('投稿', post)
bot.command('post', post)

bot.hears('按个指纹', async (ctx) => {
  await ctx.replyWithMarkdownV2(
    `\`\`\`\n${JSON.stringify(ctx.message, undefined, 2)}\n\`\`\``,
  )
})

export const commands: BotCommand[] = [
  { command: 'start', description: '使用说明' },
  { command: 'post', description: '投稿' },
]
const helpMsg = commands
  .map(({ command, description }) => `/${command} - ${description}`)
  .join('\n')

bot.start((ctx) => ctx.reply(helpMsg))
bot.help((ctx) => ctx.reply(helpMsg))
