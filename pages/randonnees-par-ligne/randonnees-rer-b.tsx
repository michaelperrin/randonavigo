import { getHikesForTransportLine } from '../../lib/hike'
import { Hike } from '../../lib/types'
import LinePage from '../../components/transport/LinePage'

type HikePerLineProps = {
  hikes: Hike[],
}

const HikesOnLine = ({ hikes }: HikePerLineProps) => (
  <LinePage
    hikes={hikes}
    title="Randonnées sur le RER B"
    banner="/images/transport/banner/rer-b.jpeg"
    borderColor="rer-b"
    bgColor="rer-b"
    line="B"
  >
    <p>Ah ! Le RER B… Synonyme de galères bien souvent. Très sollicité et avec des rames dont la modernisation ou le remplacement se font attendre… Il n’a pas grand chose pour plaire !</p>
    <p>Et pourtant. Il est idéal pour partir en randonnée dans la célèbre <b>Vallée de Chevreuse</b>. Ce Parc Naturel est idéal pour la randonnée et le RER sera beaucoup plus calme le week-end. Bien loin de Châtelet-les-Halles et Gare du Nord — qu’il dessert certes idéalement — vous verrez désormais le RER B comme un nouveau compagnon de randonnée 😄</p>
  </LinePage>
)

export default HikesOnLine

export function getStaticProps() {
  return {
    props: {
      hikes: getHikesForTransportLine('B'),
    }
  }
}

