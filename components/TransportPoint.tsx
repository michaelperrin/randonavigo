import TransportIcon from './TransportIcon'

type TransportPointProps = {
  line: string|string[],
  station: string,
  iconSize?: number,
}

const TransportPoint = ({ line, station, iconSize = 20 }: TransportPointProps) => (
  <div className="flex">
    <div className="flex-shrink-0 mr-2">
      <TransportIcon line={line} size={iconSize} />
    </div>
    <span className="font-medium">{station}</span>
  </div>
)

export default TransportPoint;
