import Image from 'next/image'

const RER_LINES = ['A', 'B', 'C', 'D', 'E']
const TRAM_LINES = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12', 'T13']
const TRANSILIEN_LINES = ['H', 'J', 'K', 'L', 'N', 'P', 'R', 'U']

enum Network {
  RER,
  Tram,
  Transilien,
}

const getLineNetwork = (line: string): number => {
  if (isRER(line)) {
    return Network.RER
  }

  if (isTram(line)) {
    return Network.Tram
  }

  if (isTransilien(line)) {
    return Network.Transilien
  }

  throw new Error('Network for line could not be found')
}


const isRER = (line: string): boolean => RER_LINES.includes(line)
const isTransilien = (line: string): boolean => TRANSILIEN_LINES.includes(line)
const isTram = (line: string): boolean => TRAM_LINES.includes(line)

type TransportIconProps = {
  line: string|string[],
  size?: number,
}

const groupLinesByNetwork = (lines: string[]): string[][] => {
  return lines.reduce((current: string[][], line: string) => {
    const network = getLineNetwork(line)

    if (!current[network]) {
      current[network] = [];
    }
    current[network].push(line)

    return current
  }, [])
}

const TransportIcon = ({ line, size = 24 }: TransportIconProps) => {
  const lines = Array.isArray(line) ? line : [line];
  const linesPerNetwork = groupLinesByNetwork(lines)

  return (
    <div className="flex gap-4">
      {linesPerNetwork.map((networkLines, network) => (
        <div className={styles.line} key={network}>
          <div className={styles.network}>
            {network === Network.RER && (
              <Image
                src="/images/transport/RER.svg"
                width={size}
                height={size}
                alt="RER"
              />
            )}
            {network === Network.Transilien && (
              <Image
                src="/images/transport/Transilien.svg"
                width={size}
                height={size}
                alt="Transilien"
              />
            )}
            {network === Network.Tram && (
              <Image
                src="/images/transport/tram.svg"
                width={size}
                height={size}
                alt="Tram"
              />
            )}
          </div>

          <div className="flex gap-2">
            {networkLines.map((line: string) => (
              <div className={styles.lineName} key={line}>
                <Image
                  src={`/images/transport/${line}.svg`}
                  width={24}
                  height={24}
                  alt={`Ligne ${line}`}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default TransportIcon;
