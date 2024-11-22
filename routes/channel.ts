import { getChannelIdByUser } from '~/src/db'

export default eventHandler(async (evt) => {
  const { uid } = getQuery(evt)
  if (!uid) return 'no uid'
  return (await getChannelIdByUser(+uid)) || 'no data'
})
