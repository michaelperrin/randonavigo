import fs from 'fs'
import path from 'path'
import { format } from 'date-fns'

export const getHikes = () => {
  const hikesPath = path.join(process.cwd(), 'hikes')
  const hikesFile = path.join(hikesPath, 'hikes.json')

  return JSON.parse(fs.readFileSync(hikesFile, 'utf8'));
}

const getHikePathParams = (hike) => {
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

export const getHikeData = (slug: string) => {
  return getHikes().find(hike => hike.slug === slug)
}
