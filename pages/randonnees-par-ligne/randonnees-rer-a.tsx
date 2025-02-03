import { getHikesForTransportLine } from "@/lib/hike";
import { FilterDefaults, Hike } from "@/lib/types";
import LinePage from "@/components/transport/LinePage";
import getFilterDefaults from '@/lib/getFilterDefaults';

type HikePerLineProps = {
  hikes: Hike[];
  filterDefaults: FilterDefaults;
};

const HikesOnLine = ({ hikes, filterDefaults }: HikePerLineProps) => (
  <LinePage
    hikes={hikes}
    filterDefaults={filterDefaults}
    title="Randonnées sur le RER A"
    meta="Randonnées accessibles en transports par le RER A en Île-de-France"
    banner="/images/transport/banner/rer-a.jpeg"
    borderColor="border-rer-a"
    bgColor="bg-rer-a"
    line="A"
  >
    <p>
      Ligne la plus empruntée d&apos;Île-de-France et même d&apos;Europe, le
      RER A dessert principalement des zones fortement urbaines. Son avantage ?
      Avec une fréquence élevée et sa rapidité, il permet d&amp;improviser une
      petite randonnée pour une demi-journée sans avoir à planifier des heures à
      l&apos;avance. Il est ainsi possible de trouver des randonnées à proximité
      de certaines de ses gares, notamment dans les forêts de
      Saint-Germain-en-Laye ou de Vincennes. Des randonnées qui ne seront donc
      pas toujours 100% nature, mais qui permettent de s&apos;évader un peu de
      la ville tout de même !
    </p>
  </LinePage>
);

export default HikesOnLine;

export function getStaticProps() {
  const hikes = getHikesForTransportLine("A");
  const filterDefaults = getFilterDefaults(hikes);

  return {
    props: {
      hikes,
      filterDefaults,
    },
  };
}
