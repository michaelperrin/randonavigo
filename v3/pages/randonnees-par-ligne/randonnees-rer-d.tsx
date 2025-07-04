import { getHikesForTransportLine } from '@/lib/hike'
import { Hike, FilterDefaults } from '@/lib/types'
import LinePage from '@/components/transport/LinePage'
import Link from 'next/link'
import getFilterDefaults from '@/lib/getFilterDefaults'

type HikePerLineProps = {
  hikes: Hike[],
  filterDefaults: FilterDefaults;
}

const HikesOnLine = ({ hikes, filterDefaults }: HikePerLineProps) => (
  <LinePage
    hikes={hikes}
    filterDefaults={filterDefaults}
    title="Randonnées sur le RER D"
    meta="Randonnées accessibles en transports par le RER D en Île-de-France"
    banner="/images/transport/banner/rer-d.jpeg"
    borderColor="border-rer-d"
    bgColor="bg-rer-d"
    line="D"
  >
    <p>
      La ligne D s’étend loin loin loin avec ses branches tentaculaires se déployant au Nord et au Sud de l’Île-de-France.
    </p>

    <p>Au Sud, c’est l’eau qui nous accompagne tout le long, avec une branche longeant la Seine dans ses parties parfois les plus bucoliques. L’autre branche suit l’Essone et sa multitude d’étangs.</p>
    <p>Au Nord, ce sont les forêts du Nord et du Val d’Oise qui sont desservies.</p>
  </LinePage>
)

export default HikesOnLine

export function getStaticProps() {
  const hikes = getHikesForTransportLine('D')
  const filterDefaults = getFilterDefaults(hikes)

  return {
    props: {
      hikes,
      filterDefaults,
    }
  }
}

