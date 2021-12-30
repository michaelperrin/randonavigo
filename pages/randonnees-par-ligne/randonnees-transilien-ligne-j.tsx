import { getHikesForTransportLine } from '../../lib/hike'
import { Hike } from '../../lib/types'
import LinePage from '../../components/transport/LinePage'

type HikePerLineProps = {
  hikes: Hike[],
}

const HikesOnLine = ({ hikes }: HikePerLineProps) => (
  <LinePage
    line="J"
    title="Randonnées sur la ligne J du Transilien"
    banner="/images/transport/banner/ligne-j.jpeg"
    hikes={hikes}
    borderColor="border-transilien-j"
    bgColor="bg-transilien-j"
  >
    <p>La ligne J du Transilien s’étend sur tout l’Ouest de l’Île-de-France en longeant de part et d’autre les rives de la Seine sur chacune des deux branches qui la composent.</p>
    <p>Ce sont parfois de toutes petites gares qui donnent accès au Parc Naturel Régional du Vexin, lieu parfait pour des départs de randonnée.</p>
    <p>Bords calme de rivière, grandes étendues agricoles, zone forestières, de quoi se régaler !</p>
  </LinePage>
)

export default HikesOnLine

export function getStaticProps() {
  return {
    props: {
      hikes: getHikesForTransportLine('J'),
    }
  }
}
