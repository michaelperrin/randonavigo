"use client";

import { MapContainer as LeafletMapContainer, TileLayer } from "react-leaflet";
import GpxTrace from "./GpxTrace";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";
import MapLocateControl from "./LocateControl";

type MapProps = {
  zoom: number;
  center: [number, number];
  scrollWheelZoom: boolean;
  children?: React.ReactNode;
  gpxFiles?: string[];
};

const MapContainer = ({
  zoom,
  center,
  scrollWheelZoom,
  children,
  gpxFiles,
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
    <MapLocateControl />
    {gpxFiles &&
      gpxFiles.map((gpxFile) => <GpxTrace key={gpxFile} gpxFile={gpxFile} />)}
  </LeafletMapContainer>
);

export default MapContainer;
