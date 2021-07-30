import { format } from 'date-fns'
import { Hike } from './types'

const getHikeUrl = (hike: Hike) => `/${format(new Date(hike.publication_date), 'yyyy/MM/dd')}/${hike.slug}`

export default getHikeUrl
