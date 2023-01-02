import React, { ComponentType, useEffect } from "react";
import * as L from "leaflet";
import "leaflet-gpx";
import "leaflet.locatecontrol";
import { GestureHandling } from "leaflet-gesture-handling";

const withLeafletGestureHandling = <T,>(Component: ComponentType<T>) => {
  const MapWithGestureHandling = (props: T, children: React.ReactNode) => {
    const Elt = () => {
      useEffect(() => {
        L.Map.addInitHook("addHandler", "gestureHandling", GestureHandling);
      }, []);

      return null;
    };

    return (
      <Component {...props} gestureHandling>
        <Elt />
      </Component>
    );
  };

  return MapWithGestureHandling;
};

export default withLeafletGestureHandling;
