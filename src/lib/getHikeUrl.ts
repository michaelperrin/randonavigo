import { type CollectionEntry } from "astro:content";

export const getHikeUrl = (hike: CollectionEntry<"hike">) => {
  const pubDate = hike.data.pubDate;
  const year = pubDate.getFullYear().toString();
  const month = (pubDate.getMonth() + 1).toString().padStart(2, "0");
  const day = pubDate.getDate().toString().padStart(2, "0");

  return `/${year}/${month}/${day}/${hike.id}/`;
};

/** Clé stable pour D1 / API (chemin sans slash de début ni fin). */
export const getHikeRouteKey = (hike: CollectionEntry<"hike">) =>
  getHikeUrl(hike).replace(/^\/|\/$/g, "");

/** Même clé que {@link getHikeUrl} / {@link getHikeRouteKey} à partir des identifiants de l'entrée collection. */
export const getHikeRouteKeyFromParts = (pubDate: Date, hikeEntryId: string) => {
  const year = pubDate.getFullYear().toString();
  const month = (pubDate.getMonth() + 1).toString().padStart(2, "0");
  const day = pubDate.getDate().toString().padStart(2, "0");
  return `${year}/${month}/${day}/${hikeEntryId}`;
};
