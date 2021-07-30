import { Hike } from '../../lib/types'
import HikeCard from './Card'

type ListProps = {
  hikes: Hike[],
}

const List = ({ hikes }: ListProps) => (
  <div className="container">
    <div className="row">
      {hikes.map(hike => (
        <div key={hike.slug} className="col-md-6 col-lg-4 hike-card-column">
          <HikeCard hike={hike} />
        </div>
      ))}
    </div>
  </div>
);

export default List;
