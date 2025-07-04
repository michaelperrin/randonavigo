import { useMap, useMapEvents } from "react-leaflet";

const FullScreenControl = () => {
  const map = useMap();

  useMapEvents({
    exitFullscreen: () => {
      map.gestureHandling?.enable();
    },
    enterFullscreen: () => {
      map.gestureHandling?.disable();
    },
  });

  return null;
};

export default FullScreenControl;
