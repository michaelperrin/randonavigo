import fs from 'fs'
import path from 'path'

export function getHikes() {
  const hikesPath = path.join(process.cwd(), 'hikes')
  const hikesFile = path.join(hikesPath, 'hikes.json')

  return JSON.parse(fs.readFileSync(hikesFile, 'utf8'));
}
