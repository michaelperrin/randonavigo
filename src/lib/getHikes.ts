import { getCollection, type CollectionEntry } from "astro:content";

/**
 * Get all hikes from the collection, excluding hidden ones
 */
export async function getHikes(): Promise<CollectionEntry<"hike">[]> {
  return await getCollection("hike", ({ data }) => !data.hidden);
}

/**
 * Get all hikes from the collection, excluding hidden ones, sorted by publication date (newest first)
 */
export async function getHikesSorted(): Promise<CollectionEntry<"hike">[]> {
  const hikes = await getHikes();
  return hikes.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
}

export async function getHikesForTransportLine(
  line: string
): Promise<CollectionEntry<"hike">[]> {
  const hikes = await getHikes();

  const hasLine = (hike: CollectionEntry<"hike">, line: string): boolean => {
    if (
      hike.data.starting_point.line === line ||
      hike.data.starting_point.line.includes(line)
    ) {
      return true;
    }

    if (
      hike.data.ending_point?.line === line ||
      hike.data.ending_point?.line.includes(line)
    ) {
      return true;
    }

    return false;
  };

  const hikesForLine = hikes.filter((hike) => hasLine(hike, line));

  return hikesForLine;
}
