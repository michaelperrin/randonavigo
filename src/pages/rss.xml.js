import rss from "@astrojs/rss";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";
import { getHikes } from "../lib/getHikes";

export async function GET(context) {
  const hikes = await getHikes();
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
