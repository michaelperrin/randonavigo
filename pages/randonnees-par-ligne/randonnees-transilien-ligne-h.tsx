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
    line="H"
    title="Randonnées sur la ligne H du Transilien"
    meta="Randonnées accessibles en transports par la ligne H du Transilien en Île-de-France"
    banner="/images/transport/banner/ligne-h.jpeg"
    hikes={hikes}
    filterDefaults={filterDefaults}
    borderColor="border-transilien-h"
    bgColor="bg-transilien-h"
  >
    <p>La ligne H du Transilien dessert une large partie du Nord de l’Île-de-France. Des stations parfois très peu fréquentées, et c’est en général bon signe pour la randonnée !</p>

    <p>La ligne dessert de charmantes petites villes telles qu’Auvers-sur-Oise et Luzarches. On y reviendra avec de nouvelles randonnées dans ces environs.</p>

    <p>Plusieurs forêts sont également accessibles, telles que la <b>Forêt de Montmorency</b> ou celle <b>la Canelle</b>.</p>

    <p>Les trains de la ligne (les « Franciliens ») sont modernes et confortables.</p>
  </LinePage>
)

export default HikesOnLine

export function getStaticProps() {
  const hikes = getHikesForTransportLine('H')
  const filterDefaults = getFilterDefaults(hikes)

  return {
    props: {
      hikes,
      filterDefaults,
    }
  }
}

