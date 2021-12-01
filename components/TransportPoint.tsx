import TransportIcon from './TransportIcon'

type TransportPointProps = {
  line: string,
  station: string,
}

const TransportPoint = ({ line, station }: TransportPointProps) => (
  <div className="flex items-center">
    <div className="flex-shrink-0 mr-2">
      <TransportIcon line={line} size={20} />
    </div>
    <span className="font-medium">{station}</span>
  </div>
)

export default TransportPoint;
