import { Hike } from "../../../lib/types"
import TransportIcon from "../../TransportIcon"

type AccessProps = {
  hike: Hike,
}

const Access = ({ hike }: AccessProps) => (
  <div>
    <div className="transport">
      <div className="row no-gutters">
        <div className={ hike.ending_point ? 'col-xl-6' : 'col-xl-12' }>
          <div className="point starting-point">
            <span className="icon"><i className="fa fa-map-marker" aria-hidden="true" aria-label="Point de départ"></i></span>
            <TransportIcon line={hike.starting_point.line} />
            <span className="station">{ hike.starting_point.station }</span>
          </div>
        </div>

        { hike.ending_point && (
          <div className="col-xl-6">
            <div className="point ending-point">
              <span className="icon"><i className="fa fa-map-marker" aria-hidden="true" aria-label="Point d'arrivée"></i></span>
              <TransportIcon line={hike.ending_point.line} />
              <span className="station">{ hike.ending_point.station }</span>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
)

export default Access;
