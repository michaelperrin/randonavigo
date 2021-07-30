import { format } from 'date-fns';
import { Hike } from './types'

const getHikePicturePath = (hike: Hike, picture: string): string => {
  const date = new Date(hike.publication_date)

  return `/hikes/${format(date, 'yyyy')}/${format(date, 'MM')}/${hike.slug}/pictures/${picture}`
}

export default getHikePicturePath;
