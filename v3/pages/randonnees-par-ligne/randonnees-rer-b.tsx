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
    title="Randonnées sur le RER B"
    meta="Randonnées accessibles en transports par le RER B en Île-de-France"
    banner="/images/transport/banner/rer-b.jpeg"
    borderColor="border-rer-b"
    bgColor="bg-rer-b"
    line="B"
  >
    <p>
      Ah ! Le RER B… Synonyme de galères bien souvent. Très sollicité et avec
      des rames dont la modernisation ou le remplacement se font attendre… Il
      n’a pas grand chose pour plaire !
    </p>
    <p>
      Et pourtant. Il est idéal pour partir en randonnée dans la célèbre{" "}
      <b>Vallée de Chevreuse</b>. Ce Parc Naturel est idéal pour la randonnée et
      le RER sera beaucoup plus calme le week-end. Bien loin de
      Châtelet-les-Halles et Gare du Nord — qu’il dessert certes idéalement —
      vous verrez désormais le RER B comme un nouveau compagnon de randonnée 😄
    </p>
  </LinePage>
);

export default HikesOnLine;

export function getStaticProps() {
  const hikes = getHikesForTransportLine("B");
  const filterDefaults = getFilterDefaults(hikes);

  return {
    props: {
      hikes,
      filterDefaults,
    },
  };
}
