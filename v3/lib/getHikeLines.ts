import { Hike } from "./types";

const getHikeLines = (hike: Hike): string[] => {
  let lines: string[] = []

  if (Array.isArray(hike.starting_point.line)) {
    lines.push(...hike.starting_point.line)
  } else {
    lines.push(hike.starting_point.line)
  }

  if (hike.ending_point) {
      if (Array.isArray(hike.ending_point.line)) {
      lines.push(...hike.ending_point.line)
    } else {
      lines.push(hike.ending_point.line)
    }
  }

  // Sort and remove duplicates
  lines = lines.sort()
  const a = new Set(lines)
  lines = Array.from(new Set(lines))

  return lines
}

export default getHikeLines;
