import { getChannelMap } from '~/src/db'

export default eventHandler(async () => {
  return (await getChannelMap()) || 'no data'
})
