import React, { ComponentType, useEffect } from "react";
import { useLeafletContext } from "@react-leaflet/core";
import { useMap } from "react-leaflet";
import * as L from "leaflet";
import "leaflet-gpx";
import "leaflet.locatecontrol";
import { GestureHandling } from "leaflet-gesture-handling";

const withLeafletGestureHandling = <T,>(Component: ComponentType<T>) => {
  const MapWithGestureHandling = (props: T, children: React.ReactNode) => {
    L.Map.addInitHook("addHandler", "gestureHandling", GestureHandling);
    const Elt = () => {
      const context = useLeafletContext();
      const map = useMap();

      useEffect(() => {
        L.Map.addInitHook("addHandler", "gestureHandling", GestureHandling);
      }, []);

      return null;
    };

    return (
      <Component {...props} gestureHandling="true">
        <Elt />
      </Component>
    );
  };

  return MapWithGestureHandling;
};

export default withLeafletGestureHandling;
