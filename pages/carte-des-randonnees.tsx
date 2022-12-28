import Layout from "@/components/layout";
// import dynamic from "next/dynamic";
import { getSortedHikesData } from "@/lib/hike";
// import withLeafletGestureHandling from "@/components/map/withLeafletGestureHandling";
import MapContainer from "@/components/map/MapContainer";
import { Hike } from "@/lib/types";
import HikesOverviewMapContainer from "@/components/hikes-overview-map/HikesOverviewMapContainer";

type HikesOverviewMapPageProps = {
  hikes: Hike[];
};

// const MapContainerWithGestureHandling =
//   withLeafletGestureHandling(MapContainer);

// const MapWithNoSSR = dynamic(
//   () => import("../components/hikes-overview-map/HikesOverviewMap"),
//   { ssr: false }
// );

// const gpxFiles = (hikes: Hike[]): string[] => {
//   return hikes.map((hike) => {
//     return hike.gpx_file;
//   });
// };

const HikesOverviewMapPage = ({ hikes }: HikesOverviewMapPageProps) => (
  <Layout>
    {/* <MapWithNoSSR hikes={hikes} /> */}
    <HikesOverviewMapContainer hikes={hikes} />
    {/* <MapContainerWithGestureHandling
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
      gpxFiles={gpxFiles(hikes)}
    /> */}
  </Layout>
);

export default HikesOverviewMapPage;

export function getStaticProps() {
  return {
    props: {
      hikes: getSortedHikesData(),
    },
  };
}
