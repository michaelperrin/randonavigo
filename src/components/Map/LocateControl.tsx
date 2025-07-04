import { useEffect, useMemo } from "react";
import { useMap } from "react-leaflet";
import { LocateControl } from "leaflet.locatecontrol";
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";

const MapLocateControl = () => {
  const map = useMap();
  const locateControl = useMemo(() => new LocateControl(), []);

  useEffect(() => {
    locateControl.addTo(map);
  }, [map, locateControl]);

  return null;
};

export default MapLocateControl;
