import { format } from 'date-fns'
import Image from 'next/image'
import { Hike } from "../../../lib/types"

type DistanceProps = {
  hike: Hike,
}

const Distance = ({ hike }: DistanceProps) => (
  <div>
    <Image
      src="/images/hike-icon.svg"
      alt="Distance de marche"
      className="hike-icon"
      width={32}
      height={32}
    />
    { hike.distance }km

    <span className="hike-type">
      {hike.ending_point ? '(gare à gare).' : '(boucle).'}
    </span>
  </div>
)

export default Distance;
