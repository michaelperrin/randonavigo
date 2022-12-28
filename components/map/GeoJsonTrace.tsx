import { useEffect } from "react";
import { useLeafletContext } from "@react-leaflet/core";
import { useMap } from "react-leaflet";
import * as L from "leaflet";
import "leaflet-gpx";
import "leaflet.locatecontrol";

type GeoJsonTraceProps = {
  file: any;
};

const GeoJsonTrace = ({ file }: GeoJsonTraceProps) => {
  const context = useLeafletContext();
  const map = useMap();

  useEffect(() => {
    L.geoJSON(file, {
      style: (feature) => ({
        color: `#${feature.properties.colourweb_hexa}`,
        weight: feature.properties.metro || feature.properties.tramway ? 1 : 3,
      }),
    }).addTo(map);
  }, [file, map]);

  return null;
};

export default GeoJsonTrace;
