import React, { ComponentType } from "react";
import {
  MapContainer,
  MapContainerProps,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet.fullscreen";
import "leaflet.fullscreen/Control.FullScreen.css";

const withFullScreenControl =
  (enabled: boolean) => (Component: typeof MapContainer) => {
    const MapWithFullScreenControl = (
      props: MapContainerProps,
      children: React.ReactNode
    ) => {
      const Elt = () => {
        const map = useMap();

        useMapEvents({
          exitFullscreen: () => {
            // If gesture handling is available, enable it back when exiting full screen
            map.gestureHandling?.enable();
          },
          enterFullscreen: () => {
            // If gesture handling is available, disable it when entering full screen
            // This makes the user experience better on mobile devices
            map.gestureHandling?.disable();
          },
        });

        return null;
      };

      return (
        <Component {...props} fullscreenControl={enabled}>
          <Elt />
        </Component>
      );
    };

    return MapWithFullScreenControl;
  };

export default withFullScreenControl;
