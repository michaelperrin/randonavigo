import { Hike } from "@/lib/types";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";
import withLeafletGestureHandling from "../../map/withLeafletGestureHandling";
import MapContainer from "../../map/MapContainer";
import getHikeGpxPath from "@/lib/getHikeGpxPath";
import withFullScreenControl from "@/components/map/withFullScreenControl";

type MapProps = {
  hike: Hike;
};

const compose = (...fns: Function[]) =>
  fns.reduceRight(
    (prevFn, nextFn) =>
      (...args: any[]) =>
        nextFn(prevFn(...args)),
    (value: any) => value
  );

const ComposedMapContainer = compose(
  withLeafletGestureHandling,
  withFullScreenControl(true)
)(MapContainer);

const gpxFiles = (hike: Hike): string[] => [
  getHikeGpxPath(hike.slug, hike.publication_date, hike.gpx_file),
];

const Map = ({ hike }: MapProps) => (
  <div>
    <ComposedMapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
      gpxFiles={gpxFiles(hike)}
    />
  </div>
);

export default Map;
