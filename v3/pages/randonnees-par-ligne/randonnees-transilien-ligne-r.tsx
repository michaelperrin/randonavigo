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
    title="Randonnées sur la ligne R du Transilien"
    meta="Randonnées accessibles en transports par la ligne R du Transilien en Île-de-France"
    banner="/images/transport/banner/ligne-r.jpeg"
    borderColor="border-transilien-r"
    bgColor="bg-transilien-r"
    line="R"
  >
    <p>La ligne R du Transilien, qui descend loin dans le Sud, mène au paradis de la randonnée en Île-de-France !</p>
    <p>Elle rejoint la plus renommée des forêts d’Île-de-France, la <b>Forêt de Fontainebleau</b>, au point même d’avoir un point d’arrêt dédié aux randonneurs le week-end.</p>
    <p>La ligne s’arrête également dans les charmants villages autour du <b>Loing</b> et permet de rejoindre la <b>Forêt de Nemours</b>.</p>
    <p>Avec tous ces atouts, pourquoi si peu de randonnées sur RandoNavigo ? Patience, ça ne saurait tarder !</p>
  </LinePage>
)

export default HikesOnLine

export function getStaticProps() {
  const hikes = getHikesForTransportLine('R')
  const filterDefaults = getFilterDefaults(hikes)

  return {
    props: {
      hikes,
      filterDefaults,
    }
  }
}

