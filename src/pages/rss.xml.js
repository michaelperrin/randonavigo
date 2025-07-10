import rss from "@astrojs/rss";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";
import { getHikes } from "../lib/getHikes";

export async function GET(context) {
  const hikes = await getHikes();
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: hikes.map((hike) => {
      const pubDate = hike.data.pubDate;
      const year = pubDate.getFullYear().toString();
      const month = (pubDate.getMonth() + 1).toString().padStart(2, '0');
      const day = pubDate.getDate().toString().padStart(2, '0');

      return {
        ...hike.data,
        link: `/${year}/${month}/${day}/${hike.id}/`,
      };
    }),
  });
}
