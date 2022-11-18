import { getHikesForTransportLine } from '@/lib/hike'
import { Hike } from '@/lib/types'
import LinePage from '@/components/transport/LinePage'
import Link from 'next/link'

type HikePerLineProps = {
  hikes: Hike[],
}

const HikesOnLine = ({ hikes }: HikePerLineProps) => (
  <LinePage
    hikes={hikes}
    title="Randonnées sur le RER E"
    meta="Randonnées accessibles en transports par le RER E en Île-de-France"
    banner="/images/transport/banner/rer-e.jpeg"
    borderColor="border-rer-e"
    bgColor="bg-rer-e"
    line="E"
  >
    <p>
      Le RER E suit le début de la
      {' '}
      <Link href="/randonnees-par-ligne/randonnees-transilien-ligne-p">
        
          ligne P du Transilien
        
      </Link>
      {' '}
      avec des arrêts supplémentaires permettant de desservir quelques forêts.
    </p>

    <p>On appréciera son prolongement vers l’Ouest dans quelques années, facilitant l’accès des randonnées dans le Vexin, entre autres.</p>
  </LinePage>
)

export default HikesOnLine

export function getStaticProps() {
  return {
    props: {
      hikes: getHikesForTransportLine('E'),
    }
  }
}

