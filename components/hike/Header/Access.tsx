import cn from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { Hike } from '../../../lib/types'
import TransportPoint from '../../TransportPoint'
import styles from './Access.module.css'

type AccessProps = {
  hike: Hike,
}

const Access = ({ hike }: AccessProps) => (
  <div className={cn({
    [styles.access]: true,
    [styles.hasEndPoint]: hike.ending_point !== undefined
  })}>
    <div className={styles.transportPoint}>
      <div className={styles.startPointIcon}>
        <FontAwesomeIcon icon={faMapMarkerAlt} size="3x" aria-label="Gare de départ" />
      </div>
      <div>
        <TransportPoint
          line={hike.starting_point.line}
          station={hike.starting_point.station}
        />
      </div>
    </div>

    { hike.ending_point && (
      <div className={styles.transportPoint}>
        <div className={styles.endPointIcon}>
          <FontAwesomeIcon icon={faMapMarkerAlt} size="3x" aria-label="Gare d'arrivée" />
        </div>
        <div>
          <TransportPoint
            line={hike.ending_point.line}
            station={hike.ending_point.station}
          />
        </div>
      </div>
    )}
  </div>
)

export default Access;
