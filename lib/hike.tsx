import fs from 'fs'
import path from 'path'
import remark from 'remark'
import html from 'remark-html'
import { format } from 'date-fns'
import { Hike } from './types'

const getHtmlContent = async (content: string): Promise<string> => {
  const processedContent = await remark()
    .use(html)
    .process(content)

  return processedContent.toString()
}

const mapHike = async (hikeData): Promise<Hike> => {
  return {
    ...hikeData,
    description: await getHtmlContent(hikeData.description),
  }
}

export const getHikes = async (): Promise<Hike[]> => {
  const hikesPath = path.join(process.cwd(), 'hikes')
  const hikesFile = path.join(hikesPath, 'hikes.json')
  const hikesData = JSON.parse(fs.readFileSync(hikesFile, 'utf8'))

  const mappedHikes = hikesData.map(async (hikeData) => await mapHike(hikeData))

  return Promise.all(mappedHikes)
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

export const getAllHikePaths = async () => {
  const hikes = await getHikes();

  return hikes
    .map(hike => ({ params: getHikePathParams(hike) }))
}

export const getHikeData = async (slug: string): Promise<Hike | undefined> => {
  const hikes = await getHikes()

  return hikes.find(hike => hike.slug === slug)
}
