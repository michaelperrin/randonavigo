declare module "leaflet.fullscreen" {
  import { Control } from "leaflet";

  export interface FullScreenOptions {
    position?: "topleft" | "topright" | "bottomright" | "bottomleft";
    title?: string;
    titleCancel?: string;
    content?: string | null;
    forceSeparateButton?: boolean;
    forcePseudoFullscreen?: boolean;
    fullscreenElement?: HTMLElement | false;
  }

  export class FullScreen extends Control {
    constructor(options?: FullScreenOptions);
    toggleFullScreen(): void;
  }
}

