import { getHikesForTransportLine } from '@/lib/hike'
import { Hike, FilterDefaults } from '@/lib/types'
import LinePage from '@/components/transport/LinePage'
import getFilterDefaults from '@/lib/getFilterDefaults'

type HikePerLineProps = {
  hikes: Hike[],
  filterDefaults: FilterDefaults;
}

const HikesOnLine = ({ hikes, filterDefaults }: HikePerLineProps) => (
  <LinePage
    hikes={hikes}
    filterDefaults={filterDefaults}
    banner="/images/transport/banner/ligne-t2.jpeg"
    title="Randonnées sur le Tram T2"
    meta="Randonnées accessibles en transports par la ligne T2 du tramway en Île-de-France"
    borderColor="border-tram-t2"
    bgColor="bg-tram-t2"
    line="T2"
  >
    <p>Ancienne ligne de chemin de fer reconvertie dans les années 90 en tram, le T2 propose un parcours agréable (quasi-bucolique) longeant la partie Ouest de la Seine. Blindé en semaine, il sera assez tranquille le weekend pour rejoindre les autres lignes de Transilien ou même comme point de départ pour une randonnée à condition de ne pas exiger un parcours en pleine nature.</p>
    <p>Tout proche de Paris, elle permettra tout de même d’accéder au <b>Domaine de Saint-Cloud</b>, lui-même porte d’entrée de la <b>forêt de Fausses-Reposes</b>.</p>
    <p>La passerelle de l’Avre accessible depuis la station des <em>Milons</em> est également un point d’entrée intéressant vers le Bois de Boulogne.</p>
  </LinePage>
)

export default HikesOnLine

export function getStaticProps() {
  const hikes = getHikesForTransportLine('T2')
  const filterDefaults = getFilterDefaults(hikes)

  return {
    props: {
      hikes,
      filterDefaults,
    }
  }
}

