import { getHikesForTransportLine } from '@/lib/hike'
import { FilterDefaults, Hike } from '@/lib/types'
import LinePage from '@/components/transport/LinePage'
import Link from 'next/link'
import getFilterDefaults from '@/lib/getFilterDefaults';

type HikePerLineProps = {
  hikes: Hike[],
  filterDefaults: FilterDefaults;
}

const HikesOnLine = ({ hikes, filterDefaults }: HikePerLineProps) => (
  <LinePage
    hikes={hikes}
    filterDefaults={filterDefaults}
    title="Randonnées sur le RER C"
    meta="Randonnées accessibles en transports par le RER C en Île-de-France"
    banner="/images/transport/banner/rer-c.jpeg"
    borderColor="border-rer-c"
    bgColor="bg-rer-c"
    line="C"
  >
    <p>
      Le défaut du RER C : on ne comprend pas grand chose à son plan alambiqué !<br />
      Son avantage : ses méandres desservent de nombreux points de départ ou d’arrivée de randonnée !
    </p>

    <p>La ligne dessert entre autres la <b>Vallée de la Bièvre</b>, et surtout le Parc Naturel Régional du <b>Gâtinais</b>, qui sont à eux deux d’excellents spots pour la randonnée.</p>

    <p>
      Il traverse — à son rythme — Paris, mais peut également être rejoint par
      {' '}
      <Link href="/randonnees-par-ligne/randonnees-transilien-ligne-n">la ligne N du Transilien</Link>
      {' '}
      à Chaville à Versailles-Chantier ou Viroflay, ce qui peut s’avérer assez pratique.
    </p>
  </LinePage>
)

export default HikesOnLine

export function getStaticProps() {
  const hikes = getHikesForTransportLine('C');
  const filterDefaults = getFilterDefaults(hikes);

  return {
    props: {
      hikes,
      filterDefaults,
    }
  }
}

