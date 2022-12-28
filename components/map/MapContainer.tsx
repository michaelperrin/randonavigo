import { MapContainer as LeafletMapContainer, TileLayer } from "react-leaflet";
// import React from "react";
import GpxTrace from "./GpxTrace";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";
import MapLocateControl from "./LocateControl";
import "leaflet.fullscreen";
import GeoJsonTrace from "./GeoJsonTrace";
// import transitNetwork from "../hikes-overview-map/traces-du-reseau-ferre-idf.json";
import transitNetwork from "../hikes-overview-map/trace-simple.json";
import "leaflet.fullscreen/Control.FullScreen.css";

type MapProps = {
  zoom: number;
  center: [number, number];
  scrollWheelZoom: boolean;
  fullscreenControl?: boolean;
  children?: React.ReactNode;
  gpxFiles?: string[];
};

const MapContainer = ({
  zoom,
  center,
  scrollWheelZoom,
  fullscreenControl = true,
  children,
  gpxFiles,
  ...otherProps
}: MapProps) => (
  <LeafletMapContainer
    zoom={zoom}
    center={center}
    scrollWheelZoom={scrollWheelZoom}
    fullscreenControl={fullscreenControl}
    {...otherProps}
    className="h-64 md:h-screen"
  >
    {children}
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      detectRetina
    />
    <MapLocateControl />
    {gpxFiles &&
      gpxFiles.map((gpxFile) => <GpxTrace key={gpxFile} gpxFile={gpxFile} />)}
    <GeoJsonTrace file={transitNetwork} />
  </LeafletMapContainer>
);

export default MapContainer;
