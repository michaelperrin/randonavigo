import { getHikesForTransportLine } from '../../lib/hike'
import { Hike } from '../../lib/types'
import LinePage from '../../components/transport/LinePage'

type HikePerLineProps = {
  hikes: Hike[],
}

const HikesOnLine = ({ hikes }: HikePerLineProps) => (
  <LinePage
    hikes={hikes}
    title="Randonnées sur la ligne R du Transilien"
    banner="/images/transport/banner/ligne-r.jpeg"
    borderColor="border-transilien-r"
    bgColor="bg-transilien-r"
    line="R"
  >
    <p>La ligne R du Transilien, qui descend loin dans le Sud, mène au paradis pour la randonnée !</p>
    <p>Elle rejoint la forêt probablement la plus renommée d’Île-de-France, la <b>Forêt de Fontainebleau</b>, au point même d’avoir un point d’arrêt dédié aux randonneurs le week-end.</p>
    <p>La ligne s’arrête également dans les charmants villages autour du <b>Loing</b> et permet de rejoindre la <b>Forêt de Nemours</b>.</p>
    <p>Avec tous ces atouts, pourquoi si peu de randonnées sur RandoNavigo ? Patience, ça ne saurait tarder !</p>
  </LinePage>
)

export default HikesOnLine

export function getStaticProps() {
  return {
    props: {
      hikes: getHikesForTransportLine('R'),
    }
  }
}

