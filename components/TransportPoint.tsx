import TransportIcon from './TransportIcon'
import styles from './TransportPoint.module.css'

type TransportPointProps = {
  label: string,
  line: string,
  station: string,
  className?: string,
}

const TransportPoint = ({ className, label, line, station }: TransportPointProps) => (
  <div className={styles.point}>
    <span className={styles.icon}><i className="fa fa-map-marker" aria-hidden="true" aria-label={label}></i></span>
    <TransportIcon line={line} />
    <span className={styles.station}>{station}</span>
  </div>
)

export default TransportPoint;
