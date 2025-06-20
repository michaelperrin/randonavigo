type Point = {
  station: string;
  line: string | string[];
  comment?: string;
};

type GpxAlternative = {
  file: string;
  label: string;
};

export type Hike = {
  title: string;
  summary: string;
  content: string;
  slug: string;
  publication_date: string;
  categories: string[];
  tags: string[];
  pictures: string[];
  main_picture: string;
  thumbnail_picture?: string;
  distance: string;
  gpx_file: string;
  gpx_alternatives?: GpxAlternative[];
  starting_point: Point;
  ending_point?: Point;
  favorite?: boolean;
  hidden?: boolean;
};

export type FilterDefaults = {
  minDistance: number;
  maxDistance: number;
  categories: string[];
  tags: string[];
  lines: string[];
};
