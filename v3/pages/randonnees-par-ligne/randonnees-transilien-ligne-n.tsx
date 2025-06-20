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
    line="N"
    title="Randonnées sur la ligne N du Transilien"
    meta="Randonnées accessibles en transports par la ligne N du Transilien en Île-de-France"
    banner="/images/transport/banner/ligne-n.jpeg"
    hikes={hikes}
    filterDefaults={filterDefaults}
    borderColor="border-transilien-n"
    bgColor="bg-transilien-n"
  >
    <p>La ligne N du Transilien dessert depuis la Gare Montparnasse tout le Sud Ouest de l’Île-de-France. Et ça c’est top.</p>
    <p>Déjà, car toute la <b>Forêt de Rambouillet</b> se trouve par là. Plus besoin de la présenter, c’est avec Fontainebleau celle que l’on cite directement pour la région parisienne. Il ne faut pas croire qu’il faut s’arrêter à la station de Rambouillet pour la découvrir, plusieurs autres stations permettent de l’explorer.</p>
    <p>Ensuite, on rejoint également avec cette ligne toute une partie de la <b>Vallée de Chevreuse</b>, terre de randonnées également.</p>
  </LinePage>
)

export default HikesOnLine

export function getStaticProps() {
  const hikes = getHikesForTransportLine('N')
  const filterDefaults = getFilterDefaults(hikes)

  return {
    props: {
      hikes,
      filterDefaults,
    }
  }
}

