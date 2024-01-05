# 合订本 bot

把群友的沙雕言论转发到频道的 bot。

## Get Started

- 注册一个 [Upstash Redis 实例](https://console.upstash.com/)
- 创建一个 KV，key 为 `channel`，value 为 JSON 对象。
  - JSON 对象的 key 为 Telegram 的用户 ID，value 为频道 ID（需要加上 `-100` 为前缀）。
  - 例如：`{"123456789": "-100123456789"}`
- 配置环境变量，参考 `.env.example` 文件
  - `BOT_TOKEN`: Telegram bot token
  - `UPSTASH_REDIS_REST_URL`: 从 Upstash 的 REST API 获取
  - `UPSTASH_REDIS_REST_TOKEN`: 从 Upstash 的 REST API 获取
  - `SECRET_HASH`: 自行生成一个随机字符串，用于验证 webhook 请求的合法性

具体部署步骤参考 https://github.com/sxzz/telegram-bot-starter
