import { type CollectionEntry } from "astro:content";

export const getHikeUrl = (hike: CollectionEntry<"hike">) => {
  const pubDate = hike.data.pubDate;
  const year = pubDate.getFullYear().toString();
  const month = (pubDate.getMonth() + 1).toString().padStart(2, "0");
  const day = pubDate.getDate().toString().padStart(2, "0");

  return `/${year}/${month}/${day}/${hike.id}/`;
};
