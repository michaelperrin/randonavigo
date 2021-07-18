import Image from 'next/image'
import { Hike } from "../../../lib/types"
import styles from './Distance.module.css'

type DistanceProps = {
  hike: Hike,
}

const Distance = ({ hike }: DistanceProps) => (
  <div>
    <Image
      src="/images/hike-icon.svg"
      alt="Distance de marche"
      className={styles['hike-icon']}
      width={32}
      height={32}
    />
    { hike.distance }km

    <span className={styles['hike-type']}>
      {hike.ending_point ? '(gare à gare).' : '(boucle).'}
    </span>
  </div>
)

export default Distance;
