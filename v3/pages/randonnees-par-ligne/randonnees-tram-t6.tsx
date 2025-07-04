import { getHikesForTransportLine } from "@/lib/hike";
import { Hike, FilterDefaults } from "@/lib/types";
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
    banner="/images/transport/banner/ligne-t6.jpeg"
    title="Randonnées sur le Tram T6"
    meta="Randonnées accessibles en transports par la ligne T6 du tramway en Île-de-France"
    borderColor="border-tram-t6"
    bgColor="bg-tram-t6"
    line="T6"
  >
    <p>
      Le T6 dessert un grand nombre de quartiers neufs, depuis Châtillon (ligne
      13 du métro) jusque Chaville. Il permet une connexion avec la ligne L du
      Transilien en gare de Chaville-Rive-Droite, et avec la ligne N en gare de
      Chaville-Rive-Gauche. Ces deux stations en sous-sol, esthétiquement
      réussies, donnent un petit air de station de métro (type métro 14) en
      pleine petite ville pavillonaire !
    </p>
    <p>
      Pour la randonnée, il permet l’accès aux forêts de Meudon et de
      Fausses-Reposes.
    </p>
  </LinePage>
);

export default HikesOnLine;

export function getStaticProps() {
  const hikes = getHikesForTransportLine("T6");
  const filterDefaults = getFilterDefaults(hikes);

  return {
    props: {
      hikes,
      filterDefaults,
    },
  };
}
