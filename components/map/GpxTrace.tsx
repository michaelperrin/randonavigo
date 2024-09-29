import { useEffect } from "react";
import { useLeafletContext } from "@react-leaflet/core";
import { useMap } from "react-leaflet";
import * as L from "leaflet";
import "leaflet-gpx";
import "leaflet.locatecontrol";

type GpxTraceProps = {
  gpxFile: string;
};

const GpxTrace = ({ gpxFile }: GpxTraceProps) => {
  const map = useMap();

  useEffect(() => {
    new L.GPX(gpxFile, {
      async: true,
      marker_options: {
        startIcon: L.icon({
          iconUrl: "/images/map/starting-point-pin.svg",
          iconSize: [32, 32],
          iconAnchor: [16, 32],
        }),
        endIcon: L.icon({
          iconUrl: "/images/map/ending-point-pin.svg",
          iconSize: [32, 32],
          iconAnchor: [16, 32],
        }),
        wptIcons: {
          Winery: L.icon({
            iconUrl: "/images/map/winery-pin.svg",
            iconSize: [40, 40],
            iconAnchor: [20, 40],
          }),
          Bar: L.icon({
            iconUrl: "/images/map/bar-pin.svg",
            iconSize: [20, 20],
            iconAnchor: [20, 20],
          }),
          Museum: L.icon({
            iconUrl: "/images/map/museum-pin.svg",
            iconSize: [20, 20],
            iconAnchor: [20, 20],
          }),
          "Picnic Area": L.icon({
            iconUrl: "/images/map/picnic-pin.svg",
            iconSize: [20, 20],
            iconAnchor: [20, 20],
          }),
        },
        shadowUrl: undefined,
      },
    })
      .on("loaded", function (e) {
        map.fitBounds(e.target.getBounds());
      })
      .addTo(map);
  }, [gpxFile, map]);

  return null;
};

export default GpxTrace;
