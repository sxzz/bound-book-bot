import { z } from 'zod'
import { getChannelIdByUser } from '~/src/db'

const schema = z.object({
  uid: z.coerce.number().int().positive(),
})

export default eventHandler(async (evt) => {
  const { uid } = await getValidatedQuery(evt, schema.parse)
  return (await getChannelIdByUser(uid)) || 'no data'
})
