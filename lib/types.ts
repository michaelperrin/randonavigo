type Point = {
  station: string,
  line: string,
  comment?: string,
}

export type Hike = {
  title: string,
  summary: string,
  description: string,
  slug: string,
  publication_date: string,
  categories: string[],
  tags: string[],
  pictures: string,
  main_picture: string,
  distance: string,
  gpx_file: string,
  starting_point: Point,
  ending_point?: Point,
  favorite?: boolean,
  hidden?: boolean,
};
