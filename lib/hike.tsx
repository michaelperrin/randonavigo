import fs from 'fs'
import path from 'path'
import { format } from 'date-fns'
import { Hike } from './types'

export const getHikes = (): Hike[] => {
  const hikesPath = path.join(process.cwd(), 'hikes')
  const hikesFile = path.join(hikesPath, 'hikes.json')

  return JSON.parse(fs.readFileSync(hikesFile, 'utf8'));
}

const getHikePathParams = (hike: Hike) => {
  const date = new Date(hike.publication_date)

  return {
    year: format(date, 'yyyy'),
    month: format(date, 'MM'),
    day: format(date, 'dd'),
    slug: hike.slug,
  };
}

export const getAllHikePaths = () => {
  return getHikes()
    .map(hike => ({ params: getHikePathParams(hike) }))
}

export const getHikeData = (slug: string): Hike | undefined => {
  return getHikes().find(hike => hike.slug === slug);
}
