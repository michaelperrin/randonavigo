import { LeafletEventHandlerFn } from "leaflet";

declare module "leaflet" {
  interface LeafletEventHandlerFnMap {
    exitFullscreen?: LeafletEventHandlerFn | undefined;
    enterFullscreen?: LeafletEventHandlerFn | undefined;
  }

  interface Map {
    gestureHandling: {
      enable: () => void;
      disable: () => void;
    };
  }
}
