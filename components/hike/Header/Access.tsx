import { Hike } from '../../../lib/types'
import TransportPoint from '../../TransportPoint'

type AccessProps = {
  hike: Hike,
}

const Access = ({ hike }: AccessProps) => (
  <div>
    <div className="transport">
      <div className="row no-gutters">
        <div className={ hike.ending_point ? 'col-xl-6' : 'col-xl-12' }>
          {/* TODO: "Point de départ" label */}
          <TransportPoint
            line={hike.starting_point.line}
            station={hike.starting_point.station}
          />
        </div>

        { hike.ending_point && (
          <div className="col-xl-6">
            {/* TODO: "Point d'arrivée" label */}
            <TransportPoint
              line={hike.ending_point.line}
              station={hike.ending_point.station}
            />
          </div>
        )}
      </div>
    </div>
  </div>
)

export default Access;
