import rss from "@astrojs/rss";
import { SITE_TITLE, SITE_DESCRIPTION } from "~/consts";
import { getHikes } from "~/lib/getHikes";
import { getHikeUrl } from "~/lib/getHikeUrl";

export async function GET(context) {
  const hikes = await getHikes();
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: hikes.map((hike) => {
      return {
        ...hike.data,
        link: getHikeUrl(hike),
      };
    }),
  });
}
