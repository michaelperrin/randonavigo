import cn from 'classnames'
import { Hike } from '../../../lib/types'
import TransportPoint from '../../TransportPoint'
import styles from './Access.module.css'

type AccessProps = {
  hike: Hike,
}

const Access = ({ hike }: AccessProps) => (
  <div className={cn({
    [styles.access]: true,
    [styles.hasEndPoint]: hike.ending_point !== undefined,
    'pb-4': true,
  })}>
    <div className={styles.transportPoint}>
      <TransportPoint
        line={hike.starting_point.line}
        station={hike.starting_point.station}
      />
    </div>

    { hike.ending_point && (
      <div className={styles.transportPoint}>
        <TransportPoint
          line={hike.ending_point.line}
          station={hike.ending_point.station}
        />
      </div>
    )}
  </div>
)

export default Access;
