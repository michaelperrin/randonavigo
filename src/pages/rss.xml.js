import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

export async function GET(context) {
  const hikes = await getCollection("hike");
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: hikes.map((hike) => ({
      ...hike.data,
      link: `/hike/${hike.id}/`,
    })),
  });
}
