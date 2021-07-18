import { Hike } from '../../../lib/types';
import styles from './HikeDescription.module.css'

type HikeDescriptionProps = {
  hike: Hike,
}

const HikeDescription = ({ hike }: HikeDescriptionProps) => (
  <div className={styles.description} dangerouslySetInnerHTML={{ __html: hike.description }} />
)

export default HikeDescription;
