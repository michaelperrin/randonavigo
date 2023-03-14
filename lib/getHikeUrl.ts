import dayjs from "dayjs";
import { Hike } from "./types";

const getHikeUrl = (hike: Hike) => {
  return `/${dayjs(hike.publication_date).format("YYYY/MM/DD")}/${hike.slug}`;
};

export default getHikeUrl;
