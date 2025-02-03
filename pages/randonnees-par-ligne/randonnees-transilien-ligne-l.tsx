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
    title="Randonnées sur la ligne L du Transilien"
    meta="Randonnées accessibles en transports par la ligne L du Transilien en Île-de-France"
    banner="/images/transport/banner/ligne-l.jpeg"
    borderColor="border-transilien-l"
    bgColor="bg-transilien-l"
    line="L"
  >
    <p>La ligne L du Transilien dessert entre autres le Sud-Ouest parisien, sans s’éloigner bien loin dans la région. La ligne est bien pratique pour rejoindre différentes forêts, telle que celle de Marly, de Fausses-Reposes et Meudon, sans oublier également la desserte de Versailles de manière rapide (bien plus qu’avec le RER C en général).</p>

    <p>Les trains sont modernes, et c’est toujours appréciable !</p>
  </LinePage>
)

export default HikesOnLine

export function getStaticProps() {
  const hikes = getHikesForTransportLine('L')
  const filterDefaults = getFilterDefaults(hikes)

  return {
    props: {
      hikes,
      filterDefaults,
    }
  }
}

