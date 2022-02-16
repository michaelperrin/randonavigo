import { getLineNetwork } from '@/lib/transport'
import LineIcon from './LineIcon'
import NetworkIcon from './NetworkIcon'

type TransportIconProps = {
  line: string|string[],
  size?: number,
  linkToPage?: boolean,
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

const TransportIcon = ({ line, size = 24, linkToPage = true }: TransportIconProps) => {
  const lines = Array.isArray(line) ? line : [line];
  const linesPerNetwork = groupLinesByNetwork(lines)

  return (
    <div className="flex flex-nowrap gap-3">
      {linesPerNetwork.map((networkLines, network) => (
        <div key={network} className="flex flex-nowrap gap-1">
          <NetworkIcon network={network} size={size} />

          <div className="flex gap-1">
            {networkLines.map((line: string) => (
              <LineIcon key={line} line={line} size={size} linkToPage={linkToPage} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default TransportIcon;
