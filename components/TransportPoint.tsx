import TransportIcon from './TransportIcon'
import styles from './TransportPoint.module.css'

type TransportPointProps = {
  line: string,
  station: string,
}

const TransportPoint = ({ line, station }: TransportPointProps) => (
  <div className={styles.point}>
    <TransportIcon line={line} size={24} />
    <span className="font-medium">{station}</span>
  </div>
)

export default TransportPoint;
