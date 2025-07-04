// import { Hike } from "@/lib/types";
// import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";
// import withLeafletGestureHandling from "../../map/withLeafletGestureHandling";
// import MapContainer from "../../map/MapContainer";
// import getHikeGpxPath from "@/lib/getHikeGpxPath";
// import withFullScreenControl from "@/components/map/withFullScreenControl";

import { getHikeGpxPath } from "../../../lib/getHikeGpxPath";
import MapContainer from "../../Map/MapContainer";
import withFullScreenControl from "../../Map/withFullScreenControl";
import withLeafletGestureHandling from "../../Map/withLeafletGestureHandling";

type MapProps = {
  slug: string;
  pubDate: Date;
  gpxFile: string;
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
  withFullScreenControl()
)(MapContainer);

const gpxFiles = (slug: string, pubDate: Date, gpxFile: string): string[] => [
  getHikeGpxPath(slug, pubDate, gpxFile),
];


const Map = ({ slug, pubDate, gpxFile }: MapProps) => {
    console.log(slug, pubDate, gpxFile, getHikeGpxPath(slug, pubDate, gpxFile));
    return (
        <div>
          <ComposedMapContainer
            center={[51.505, -0.09]}
            zoom={13}
            scrollWheelZoom={false}
            gpxFiles={gpxFiles(slug, pubDate, gpxFile)}
          />
        </div>
    );
};

export default Map;
