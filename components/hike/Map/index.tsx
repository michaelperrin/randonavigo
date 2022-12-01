import { Hike } from "@/lib/types";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";
import withLeafletGestureHandling from "../../map/withLeafletGestureHandling";
import MapContainer from "../../map/MapContainer";
import getHikeGpxPath from "@/lib/getHikeGpxPath";

type MapProps = {
  hike: Hike;
};

const MapContainerWithGestureHandling =
  withLeafletGestureHandling(MapContainer);

const gpxFiles = (hike: Hike): string[] => [
  getHikeGpxPath(hike.slug, hike.publication_date, hike.gpx_file),
];

const Map = ({ hike }: MapProps) => {
  return (
    <div>
      <MapContainerWithGestureHandling
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        gpxFiles={gpxFiles(hike)}
      />
    </div>
  );
};

export default Map;
