import { Hike } from "@/lib/types"

type DistanceProps = {
  hike: Hike,
}

const Distance = ({ hike }: DistanceProps) => (
  <>
    <span className="leading-none text-2xl font-bold">
      {`${hike.distance} km`}
    </span>

    <span className="text-gray-600 inline-block pl-3">
      {hike.ending_point ? '(gare à gare)' : '(boucle)'}
    </span>
  </>
)

export default Distance;
