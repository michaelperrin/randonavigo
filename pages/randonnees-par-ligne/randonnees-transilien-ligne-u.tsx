import { getHikesForTransportLine } from '../../lib/hike'
import { Hike } from '../../lib/types'
import LinePage from '../../components/transport/LinePage'
import Link from 'next/link'

type HikePerLineProps = {
  hikes: Hike[],
}

const HikesOnLine = ({ hikes }: HikePerLineProps) => (
  <LinePage
    line="U"
    title="Randonnées sur la ligne U du Transilien"
    banner="/images/transport/banner/ligne-u.jpeg"
    hikes={hikes}
    borderColor="border-transilien-u"
    bgColor="bg-transilien-u"
  >
    <p>
      La ligne U est une petite ligne tangeantielle de l’Ouest parisien. Départ à <em>La Défense</em> bien pratique et des connexions avec la
      {' '}
      <Link href="/randonnees-par-ligne/randonnees-transilien-ligne-n">
        <a>ligne N du Transilien</a>
      </Link>
      {' '}
      et le
      {' '}
      <Link href="/randonnees-par-ligne/randonnees-rer-c">
        <a>RER C</a>
      </Link>
      {' '}
      à Versailles Chantiers
      {' '}
      <Link href="/randonnees-par-ligne/randonnees-rer-c">
        <a>RER C</a>
      </Link>
      {' '}
      ainsi que la
      {' '}
      <Link href="/randonnees-par-ligne/randonnees-transilien-ligne-l">
        <a>ligne L du Transilien</a>
      </Link>
      {' '}
      à Saint-Cloud.
    </p>

    <p>On regrettera sa fréquence trop faible en particulier le week-end (un train par heure).</p>
  </LinePage>
)

export default HikesOnLine

export function getStaticProps() {
  return {
    props: {
      hikes: getHikesForTransportLine('U'),
    }
  }
}

