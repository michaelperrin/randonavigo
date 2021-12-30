import { getHikesForTransportLine } from '../../lib/hike'
import { Hike } from '../../lib/types'
import LinePage from '../../components/transport/LinePage'
import Link from 'next/link'

type HikePerLineProps = {
  hikes: Hike[],
}

const HikesOnLine = ({ hikes }: HikePerLineProps) => (
  <LinePage
    hikes={hikes}
    title="Randonnées sur le RER C"
    banner="/images/transport/banner/rer-c.jpeg"
    borderColor="border-rer-c"
    bgColor="bg-rer-c"
    line="C"
  >
    <p>
      Le défaut du RER C : on ne comprend pas grand chose à son plan alambiqué !<br />
      Son avantage : il dessert de nombreux points de départ ou d’arrivée de randonnée !
    </p>

    <p>Il dessert entre autres la <b>Vallée de la Bièvre</b>, et surtout le Parc Naturel Régional du <b>Gâtinais</b>, qui sont à eux deux d’excellents spots pour la randonnée.</p>

    <p>
      Il traverse — à son rythme — Paris, mais peut également être rejoint par
      {' '}
      <Link href="/randonnees-par-ligne/randonnees-transilien-ligne-n"><a>la ligne N du Transilien</a></Link>
      {' '}
      à Chaville à Versailles Chantier ou Viroflay, ce qui peut s’avérer assez pratique.
    </p>
  </LinePage>
)

export default HikesOnLine

export function getStaticProps() {
  return {
    props: {
      hikes: getHikesForTransportLine('C'),
    }
  }
}

