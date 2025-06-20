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
    line="U"
    title="Randonnées sur la ligne U du Transilien"
    meta="Randonnées accessibles en transports par la ligne U du Transilien en Île-de-France"
    banner="/images/transport/banner/ligne-u.jpeg"
    hikes={hikes}
    filterDefaults={filterDefaults}
    borderColor="border-transilien-u"
    bgColor="bg-transilien-u"
  >
    <p>
      La ligne U est une petite ligne tangeantielle de l’Ouest parisien. Son départ à <em>La Défense</em> est bien pratique et des connexions avec la
      {' '}
      <Link href="/randonnees-par-ligne/randonnees-transilien-ligne-n">
        ligne N du Transilien
      </Link>
      {' '}
      et le
      {' '}
      <Link href="/randonnees-par-ligne/randonnees-rer-c">
        RER C
      </Link>
      {' '}
      à Versailles Chantiers, ainsi que la
      {' '}
      <Link href="/randonnees-par-ligne/randonnees-transilien-ligne-l">
        ligne L du Transilien
      </Link>
      {' '}
      à Saint-Cloud.
    </p>

    <p>On regrettera sa fréquence trop faible en particulier le week-end (un train par heure le dimanche).</p>
  </LinePage>
)

export default HikesOnLine

export function getStaticProps() {
  const hikes = getHikesForTransportLine('U')
  const filterDefaults = getFilterDefaults(hikes)

  return {
    props: {
      hikes,
      filterDefaults,
    }
  }
}

