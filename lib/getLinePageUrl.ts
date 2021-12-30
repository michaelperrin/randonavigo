import { isRER, isTram, isTransilien } from './transport'

const BASE_URL = '/randonnees-par-ligne'

const getLinePageUrl = (line: string): string => {
  if (isRER(line)) {
    return `${BASE_URL}/randonnees-rer-${line.toLocaleLowerCase()}`
  }

  if (isTransilien(line)) {
    return `${BASE_URL}/randonnees-transilien-ligne-${line.toLocaleLowerCase()}`
  }

  if (isTram(line)) {
    return `${BASE_URL}/randonnees-tram-${line.toLocaleLowerCase()}`
  }

  return ''
}

export default getLinePageUrl
