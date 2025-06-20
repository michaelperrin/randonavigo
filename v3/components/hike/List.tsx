import { Hike } from '@/lib/types'
import HikeCard from './Card'

type ListProps = {
  hikes: Hike[],
}

const List = ({ hikes }: ListProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {hikes.map(hike => (
      <HikeCard hike={hike} key={hike.slug} />
    ))}
  </div>
);

export default List;
