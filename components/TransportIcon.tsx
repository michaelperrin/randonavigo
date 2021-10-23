import Image from 'next/image'
// import styles from './TransportIcon.module.css' // TODO

const RER_LINES = ['A', 'B', 'C', 'D', 'E']
const TRAM_LINES = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12', 'T13']
const TRANSILIEN_LINES = ['H', 'J', 'K', 'L', 'N', 'P', 'R', 'U']


const isRER = (line: string): boolean => RER_LINES.includes(line)
const isTransilien = (line: string): boolean => TRANSILIEN_LINES.includes(line)
const isTram = (line: string): boolean => TRAM_LINES.includes(line)

type TransportIconProps = {
  line: string,
}

const TransportIcon = ({ line }: TransportIconProps) => (
  <div className="line">
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

    {isTram(line) && (
      <Image
        src="/images/transport/tram.svg"
        width={24}
        height={24}
        alt="Tram"
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
