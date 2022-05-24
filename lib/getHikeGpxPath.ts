import { format } from "date-fns";

const getHikeGpxPath = (
  slug: string,
  publication_date: string,
  file: string
): string => {
  const date = new Date(publication_date);

  return `/hikes/${format(date, "yyyy")}/${format(
    date,
    "MM"
  )}/${slug}/gpx/${file}`;
};

export default getHikeGpxPath;
