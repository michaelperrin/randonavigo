import { getHikesForTransportLine } from '../../lib/hike'
import { Hike } from '../../lib/types'
import LinePage from '../../components/transport/LinePage'

type HikePerLineProps = {
  hikes: Hike[],
}

const HikesOnLine = ({ hikes }: HikePerLineProps) => (
  <LinePage
    hikes={hikes}
    title="Randonnées sur la ligne P du Transilien"
    banner="/images/transport/banner/ligne-p.jpeg"
    borderColor="border-transilien-p"
    bgColor="bg-transilien-p"
    line="P"
  >
    <p>La ligne P part bien loin dans l’Est de l’Île-de-France pour desservir une large partie du plus grand département de la région : la Seine-et-Marne.</p>

    <p>Des trajets parfois longs au départ de la Gare de l’Est, mais donnant accès à la <b>Brie</b>, terreau de randonnées. Certaines branches sont parfois minuscules, et l’on pourrait se croire dans des petits villages de province. Les lignes ne sont pas toujours électrifiées, et parfois mono-voie !</p>

    <p>Le bout de ligne tutoie la <b>Champagne</b>, et permet de profiter de ses paysages tout en restant en Île-de-France.</p>

    <p>La ligne est également connue pour desservir <b>Provins</b>, l’un des plus beaux villages médivaux (on y fera une rando à l’avenir). Une ligne à l’évocation fromagère également, entre le brie (de Meaux) et le coulommiers (de… Coulommiers). De quoi lier l’utile à l’agréable.</p>
  </LinePage>
)

export default HikesOnLine

export function getStaticProps() {
  return {
    props: {
      hikes: getHikesForTransportLine('P'),
    }
  }
}

