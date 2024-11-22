import process from 'node:process'

const SECRET_HASH = process.env.SECRET_HASH!

export default defineEventHandler((event) => {
  const query = getQuery(event)
  if (query.secret_hash !== SECRET_HASH) {
    throw createError({
      status: 401,
      statusMessage: 'Unauthorized',
      message: 'Invalid secret',
    })
  }
})
