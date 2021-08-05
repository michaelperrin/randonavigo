import { format } from 'date-fns';
import { Hike } from './types'

const getHikeGpxPath = (hike: Hike): string => {
  const date = new Date(hike.publication_date)

  return `/hikes/${format(date, 'yyyy')}/${format(date, 'MM')}/${hike.slug}/gpx/${hike.gpx_file}`
}

export default getHikeGpxPath;
