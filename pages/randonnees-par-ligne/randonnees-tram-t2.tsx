import { getHikesForTransportLine } from '../../lib/hike'
import { Hike } from '../../lib/types'
import LinePage from '../../components/transport/LinePage'

type HikePerLineProps = {
  hikes: Hike[],
}

const HikesOnLine = ({ hikes }: HikePerLineProps) => (
  <LinePage
    hikes={hikes}
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
  return {
    props: {
      hikes: getHikesForTransportLine('T2'),
    }
  }
}

