import dayjs from "dayjs";

const getHikeGpxPath = (
  slug: string,
  publication_date: string,
  file: string
): string => {
  const date = dayjs(publication_date);

  return `/hikes/${date.format("YYYY/MM")}/${slug}/gpx/${file}`;
};

export default getHikeGpxPath;
