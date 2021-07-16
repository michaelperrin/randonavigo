import Link from 'next/link'
import { Hike } from '../../lib/types'
import getHikeUrl from '../../lib/getHikeUrl'

type ListProps = {
  hikes: Hike[],
}

const List = ({ hikes }: ListProps) => (
  <div>
    {hikes.map(hike => (
      <li key={hike.slug}>
        <Link href={`/${getHikeUrl(hike)}`}>
          <a>{hike.title}</a>
        </Link>
      </li>
    ))}
  </div>
);

export default List;
