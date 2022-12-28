import Layout from "@/components/layout";
// import withLeafletGestureHandling from "@/components/map/withLeafletGestureHandling";
// import MapContainer from "@/components/map/MapContainer";
import { Hike } from "@/lib/types";
import dynamic from "next/dynamic";

type HikesOverviewMapContainerProps = {
  hikes: Hike[];
};

// const MapContainerWithGestureHandling =
//   withLeafletGestureHandling(MapContainer);

// const gpxFiles = (hikes: Hike[]): string[] => {
//   return hikes.map((hike) => {
//     return hike.gpx_file;
//   });
// };

const MapWithNoSSR = dynamic(() => import("./HikesOverviewMap"), {
  ssr: false,
});

const HikesOverviewMapContainer = ({
  hikes,
}: HikesOverviewMapContainerProps) => <MapWithNoSSR hikes={hikes} />;

export default HikesOverviewMapContainer;
