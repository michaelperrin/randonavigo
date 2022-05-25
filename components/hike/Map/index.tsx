import { Hike } from "@/lib/types";
import GpxTrace from "./GpxTrace";
import getHikeGpxPath from "@/lib/getHikeGpxPath";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";
import withLeafletGestureHandling from "./withLeafletGestureHandling";
import MapContainer from "./MapContainer";

type MapProps = {
  hike: Hike;
};

const MapContainerWithGestureHandling =
  withLeafletGestureHandling(MapContainer);

const Map = ({ hike }: MapProps) => {
  return (
    <div>
      <MapContainerWithGestureHandling
        hike={hike}
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
      />
    </div>
  );
};

export default Map;
