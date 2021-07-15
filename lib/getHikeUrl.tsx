import { format } from 'date-fns'

const getHikeUrl = (hike) => `${format(new Date(hike.publication_date), 'yyyy/MM/dd')}/${hike.slug}`

export default getHikeUrl
