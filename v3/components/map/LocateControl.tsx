import { useEffect, useMemo } from "react";
import { useMap } from "react-leaflet";
import * as L from "leaflet";

const MapLocateControl = () => {
  const map = useMap();
  const locateControl = useMemo(() => new L.Control.Locate(), []);

  useEffect(() => {
    map.addControl(locateControl);
  }, [map, locateControl]);

  return null;
};

export default MapLocateControl;
