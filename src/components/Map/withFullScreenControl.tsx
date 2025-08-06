import React from "react";
import {
  MapContainer,
  type MapContainerProps,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet.fullscreen";
import "leaflet.fullscreen/Control.FullScreen.css";
import L from "leaflet";

// Extend Leaflet Map type to include gestureHandling
declare module "leaflet" {
  interface Map {
    gestureHandling?: {
      enable(): void;
      disable(): void;
    };
  }
}

// Disable gesture handling when map is in full screen mode
// Improves user experience on mobile devices
const withFullScreenControl =
  () => (Component: typeof MapContainer) => {
    const MapWithFullScreenControl = (
      props: MapContainerProps,
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
        } as any);

        L.control.fullscreen({
          position: "topleft",
          title: "Passer en plein écran",
          titleCancel: "Quitter le mode plein écran",
        }).addTo(map);

        return null;
      };

      return (
        <Component {...props}>
          <Elt />
        </Component>
      );
    };

    return MapWithFullScreenControl;
  };

export default withFullScreenControl;

// Add this near the top of your file (after imports)
declare module "leaflet" {
  namespace control {
    function fullscreen(options?: any): Control;
  }
}
