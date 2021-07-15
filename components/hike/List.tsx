import Link from 'next/link'
import getHikeUrl from '../../lib/getHikeUrl'

const List = ({ hikes }) => (
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
