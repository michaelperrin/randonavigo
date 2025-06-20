import dayjs from "dayjs";
import { Hike } from "./types";

const getHikePicturePath = (hike: Hike, picture: string): string => {
  const date = dayjs(hike.publication_date);

  return `/hikes/${date.format("YYYY/MM")}/${hike.slug}/pictures/${picture}`;
};

export default getHikePicturePath;
