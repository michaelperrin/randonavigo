import Image from 'next/image'
import { Hike } from "../../../lib/types"
import styles from './Distance.module.css'

type DistanceProps = {
  hike: Hike,
}

const Distance = ({ hike }: DistanceProps) => (
  <>
    <span className="leading-none text-2xl font-bold">
      {`${hike.distance} km`}
    </span>

    <span>
      {' '}
      {hike.ending_point ? ' (gare à gare)' : ' (boucle)'}
    </span>
  </>
)

export default Distance;
