import { getHikesForTransportLine } from "@/lib/hike";
import { Hike } from "@/lib/types";
import LinePage from "@/components/transport/LinePage";

type HikePerLineProps = {
  hikes: Hike[];
};

const HikesOnLine = ({ hikes }: HikePerLineProps) => (
  <LinePage
    hikes={hikes}
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
  return {
    props: {
      hikes: getHikesForTransportLine("T6"),
    },
  };
}
