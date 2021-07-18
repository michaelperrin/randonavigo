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
          <TransportPoint
            className="starting-point"
            line={hike.starting_point.line}
            station={hike.starting_point.station}
            label="Point de départ"
          />
        </div>

        { hike.ending_point && (
          <div className="col-xl-6">
            <TransportPoint
              className="ending-point"
              line={hike.ending_point.line}
              station={hike.ending_point.station}
              label="Point d'arrivée"
            />
          </div>
        )}
      </div>
    </div>
  </div>
)

export default Access;
