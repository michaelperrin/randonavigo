import { getHikesForTransportLine } from "@/lib/hike";
import { Hike, FilterDefaults } from "@/lib/types";
import LinePage from "@/components/transport/LinePage";
import Link from "next/link";
import getFilterDefaults from '@/lib/getFilterDefaults';

type HikePerLineProps = {
  hikes: Hike[];
  filterDefaults: FilterDefaults;
};

const HikesOnLine = ({ hikes, filterDefaults }: HikePerLineProps) => (
  <LinePage
    hikes={hikes}
    filterDefaults={filterDefaults}
    banner="/images/transport/banner/ligne-t13.jpeg"
    title="Randonnées sur le Tram T13"
    meta="Randonnées accessibles en transports par la ligne T13 du tramway en Île-de-France"
    borderColor="border-tram-t13"
    bgColor="bg-tram-t13"
    line="T13"
  >
    <p>
      Cette ligne qui suit en grande partie la ligne historique dite de Grande
      Ceinture Ouest a été inaugurée sous sa forme de tramway en juin 2022.
      Après avoir été longtemps abandonnée au service des passagers, elle fut
      d&apos;abord relancée en 2004 sous une forme presque ridicule, avec
      seulement quatre stations desservies par des Transilien,
      &quot;complétant&quot; ainsi le réseau de la
      <Link href="/randonnees-par-ligne/randonnees-transilien-ligne-l">
        ligne L du Transilien
      </Link>
      . Surnommée la &quot;ligne des golfs&quot; – chacune des villes desservies
      en possédant un – ce ne fut pas le grand succès.
    </p>
    <p>
      La ligne a donc été prolongée et reconfigurée sous forme de tram-train. Un
      tramway avec des pointes à 100 km/h, loin des lignes parfois
      &quot;tortillard&quot; des centre-villes. Celle-ci devrait être allongée à
      nouveau dans le futur en direction de Poissy et d&apos;Achères afin
      d&apos;assurer des correspondances qui n&apos;existent pas à l&apos;heure
      actuelle.
    </p>
    <p>
      Loin des zones urbaines denses, elle a la particularité de traverser la
      forêt. De quoi permettre quelques randonnées le long de la ligne.
    </p>
  </LinePage>
);

export default HikesOnLine;

export function getStaticProps() {
  const hikes = getHikesForTransportLine("T13");
  const filterDefaults = getFilterDefaults(hikes);

  return {
    props: {
      hikes,
      filterDefaults,
    },
  };
}
