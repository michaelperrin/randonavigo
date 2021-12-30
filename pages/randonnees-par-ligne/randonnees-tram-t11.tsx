import { getHikesForTransportLine } from '../../lib/hike'
import { Hike } from '../../lib/types'
import LinePage from '../../components/transport/LinePage'

type HikePerLineProps = {
  hikes: Hike[],
}

const HikesOnLine = ({ hikes }: HikePerLineProps) => (
  <LinePage
    hikes={hikes}
    title="Randonnées sur le Tram T11"
    banner="/images/transport/banner/ligne-t11.jpeg"
    borderColor="border-tram-t11"
    bgColor="bg-tram-t11"
    line="T11"
  >
    <p>
      La ligne T11 du tram (nommée parfois <em>T11 Express</em> du fait de son utilisation de tram-trains plus rapides) dessert principalement des zones urbaines. La ligne est encore toute petite, Elle est toutefois amenée à être prolongée et assurera alors des connexions intéressantes entres les différentes lignes, ce qui permettra aux habitants des différentes banlieues parisiennes de rejoindre facilement diverses lignes de RER et Transilien… et des randonnées à la clé ! Et ça, on aime bien.
    </p>
  </LinePage>
)

export default HikesOnLine

export function getStaticProps() {
  return {
    props: {
      hikes: getHikesForTransportLine('T11'),
    }
  }
}

