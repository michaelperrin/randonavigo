import Image from 'next/image'
import { Hike } from "../../../lib/types"
import styles from './Distance.module.css'

type DistanceProps = {
  hike: Hike,
}

const Distance = ({ hike }: DistanceProps) => (
  <div className={styles.distance}>
    <Image
      src="/images/hike-icon.svg"
      alt="Distance de marche"
      className={styles.hikeIcon}
      width={32}
      height={32}
    />
    <div>
      {`${hike.distance}km`}
      {' '}
      {hike.ending_point ? ' (gare à gare).' : ' (boucle).'}
    </div>
  </div>
)

export default Distance;
