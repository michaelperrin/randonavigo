import withLeafletGestureHandling from "@/components/map/withLeafletGestureHandling";
import MapContainer from "@/components/map/MapContainer";
import { Hike } from "@/lib/types";
import getHikeGpxPath from "@/lib/getHikeGpxPath";

type HikesOverviewMapProps = {
  hikes: Hike[];
};

const MapContainerWithGestureHandling =
  withLeafletGestureHandling(MapContainer);

const gpxFiles = (hikes: Hike[]): string[] =>
  hikes.map((hike) =>
    getHikeGpxPath(hike.slug, hike.publication_date, hike.gpx_file)
  );

const HikesOverviewMap = ({ hikes }: HikesOverviewMapProps) => (
  <MapContainerWithGestureHandling
    center={[48.866667, 2.333]}
    zoom={13}
    scrollWheelZoom={false}
    gpxFiles={gpxFiles(hikes)}
  />
);

export default HikesOverviewMap;
