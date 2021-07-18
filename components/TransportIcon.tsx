import Image from 'next/image'
import styles from './TransportIcon.module.css'

const RER_LINES = ['A', 'B', 'C', 'D', 'E']
const TRANSILIEN_LINES = ['H', 'J', 'K', 'L', 'N', 'P', 'R', 'U']

const isRER = (line: string): boolean => RER_LINES.includes(line)
const isTransilien = (line: string): boolean => TRANSILIEN_LINES.includes(line)

type TransportIconProps = {
  line: string,
}

const TransportIcon = ({ line }: TransportIconProps) => (
  <div className={styles.line}>
    {isRER(line) && (
      <Image
        src="/images/transport/RER.svg"
        width={24}
        height={24}
        alt="RER"
      />
    )}

    {isTransilien(line) && (
      <Image
        src="/images/transport/Transilien.svg"
        width={24}
        height={24}
        alt="Transilien"
      />
    )}

    <Image
      src={`/images/transport/${line}.svg`}
      width={24}
      height={24}
      alt={`Ligne ${line}`}
    />
  </div>
)

export default TransportIcon;
