import { FilterDefaults, Hike } from "./types";

const getFilterDefaults = (hikes: Hike[]): FilterDefaults => {
  const categories = Array.from(
    new Set(
      hikes
        .map((hike) => hike.categories)
        .filter(Boolean)
        .flat()
    )
  );
  const tags = Array.from(
    new Set(
      hikes
        .map((hike) => hike.tags)
        .filter(Boolean)
        .flat()
    )
  );

  const hikeLines = hikes
    .map((hike) => {
      const hikeLines = [hike.starting_point.line];

      if (hike.ending_point?.line) {
        hikeLines.push(hike.ending_point.line);
      }

      return hikeLines;
    })
    .flat()
    .filter(Boolean);

  const lines = Array.from(new Set(hikeLines)) as string[];

  const distances = hikes.map((hike) => Number(hike.distance));
  const minDistance = Math.min(...distances);
  const maxDistance = Math.max(...distances);

  return {
    minDistance,
    maxDistance,
    categories: categories,
    tags: tags,
    lines: lines ?? [],
  };
};

export default getFilterDefaults;
