import cn from 'classnames'
import { Hike } from '@/lib/types'
import TransportPoint from '@/components/TransportPoint'

type AccessProps = {
  hike: Hike,
  transportIconSize?: number,
}

const Access = ({ hike, transportIconSize = 20 }: AccessProps) => (
  <div className="flex flex-wrap gap-y-2">
    <div className={cn({
      'mr-4': hike.ending_point !== undefined,
      'flex-auto': true,
    })}>
      <TransportPoint
        line={hike.starting_point.line}
        station={hike.starting_point.station}
        iconSize={transportIconSize}
      />
    </div>

    { hike.ending_point && (
      <div className="flex-auto">
        <TransportPoint
          line={hike.ending_point.line}
          station={hike.ending_point.station}
          iconSize={transportIconSize}
        />
      </div>
    )}
  </div>
)

export default Access;
