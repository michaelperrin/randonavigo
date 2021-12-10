import TransportIcon from './TransportIcon'
import styles from './TransportPoint.module.css'

type TransportPointProps = {
  line: string|string[],
  station: string,
}

const TransportPoint = ({ line, station }: TransportPointProps) => (
  <div className={styles.point}>
    <TransportIcon line={line} />
    <span className={styles.station}>{station}</span>
  </div>
)

export default TransportPoint;
