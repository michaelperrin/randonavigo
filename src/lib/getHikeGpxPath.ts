export const getHikeGpxPath = (slug: string, pubDate: Date, gpxFile?: string) => {
  if (!gpxFile) return '#';
  const year = pubDate.getFullYear();
  const month = String(pubDate.getMonth() + 1).padStart(2, '0');
  return `/src/assets/hikes/${year}/${month}/${slug}/gpx/${gpxFile}`;
};
