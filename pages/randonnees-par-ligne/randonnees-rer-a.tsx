import { getHikesForTransportLine } from "@/lib/hike";
import { Hike } from "@/lib/types";
import LinePage from "@/components/transport/LinePage";

type HikePerLineProps = {
  hikes: Hike[];
};

const HikesOnLine = ({ hikes }: HikePerLineProps) => (
  <LinePage
    hikes={hikes}
    title="Randonnées sur le RER A"
    meta="Randonnées accessibles en transports par le RER A en Île-de-France"
    banner="/images/transport/banner/rer-a.jpeg"
    borderColor="border-rer-a"
    bgColor="bg-rer-a"
    line="A"
  >
    <p>
      Ligne la plus empruntée d&apos;Île-de-France et même d&apos;Europe, le RER
      A dessert principalement des zones fortement urbaines. Cependant, il est
      possible de trouver des randonnées à proximité de certaines de ses gares,
      notamment dans les forêts de Saint-Germain-en-Laye ou de Vincennes. Des
      randonnées qui ne seront donc pas toujours 100% nature, mais qui
      permettent de s&apos;évader un peu de la ville tout de même !
    </p>
  </LinePage>
);

export default HikesOnLine;

export function getStaticProps() {
  return {
    props: {
      hikes: getHikesForTransportLine("A"),
    },
  };
}
