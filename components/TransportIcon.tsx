import Image from 'next/image'

const RER_LINES = ['A', 'B', 'C', 'D', 'E']
const TRAM_LINES = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12', 'T13']
const TRANSILIEN_LINES = ['H', 'J', 'K', 'L', 'N', 'P', 'R', 'U']


const isRER = (line: string): boolean => RER_LINES.includes(line)
const isTransilien = (line: string): boolean => TRANSILIEN_LINES.includes(line)
const isTram = (line: string): boolean => TRAM_LINES.includes(line)

type TransportIconProps = {
  line: string,
  size?: number,
}

const TransportIcon = ({ line, size = 24 }: TransportIconProps) => (
  <div className="flex items-center">
    <div className="mr-1" style={{ lineHeight: 0 }}>
      {isRER(line) && (
        <Image
          src="/images/transport/RER.svg"
          width={size}
          height={size}
          alt="RER"
        />
      )}
      {isTransilien(line) && (
        <Image
          src="/images/transport/Transilien.svg"
          width={size}
          height={size}
          alt="Transilien"
        />
      )}
      {isTram(line) && (
        <Image
          src="/images/transport/tram.svg"
          width={size}
          height={size}
          alt="Tram"
        />
      )}
    </div>

    <div className="leading-none">
      <Image
        src={`/images/transport/${line}.svg`}
        width={size}
        height={size}
        alt={`Ligne ${line}`}
      />
    </div>
  </div>
)

export default TransportIcon;
