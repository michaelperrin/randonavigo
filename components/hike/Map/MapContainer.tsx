import { Hike } from "@/lib/types";
import { MapContainer as LeafletMapContainer, TileLayer } from "react-leaflet";
import GpxTrace from "./GpxTrace";
import getHikeGpxPath from "@/lib/getHikeGpxPath";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";

type MapProps = {
  hike: Hike;
  zoom: number;
  center: [number, number];
  scrollWheelZoom: boolean;
  children?: React.ReactNode;
};

const MapContainer = ({
  hike,
  zoom,
  center,
  scrollWheelZoom,
  children,
  ...otherProps
}: MapProps) => (
  <LeafletMapContainer
    zoom={zoom}
    center={center}
    scrollWheelZoom={scrollWheelZoom}
    {...otherProps}
    className="h-64 md:h-52"
  >
    {children}
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      detectRetina
    />
    {/* <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
    <GpxTrace
      gpxFile={getHikeGpxPath(hike.slug, hike.publication_date, hike.gpx_file)}
    />
  </LeafletMapContainer>
);

export default MapContainer;
