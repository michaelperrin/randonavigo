import Link from 'next/link';
import getHikeUrl from '../../../lib/getHikeUrl';
import { Hike } from '../../../lib/types';
import TransportPoint from '../../TransportPoint';
// import styles from './HikeCard.module.css'

type HikeCardProps = {
  hike: Hike,
}

const HikeCard = ({ hike }: HikeCardProps) => (
  <article className="card">
    { hike.favorite && (
      <div className="favorite">
        <img src="/images/favorite.svg" alt="Randonnée favorite" />
      </div>
    )}

    <Link href={getHikeUrl(hike)}>
      <a>
        {/* <div className="main-picture">
          <Image
            src={`/hikes/`}
        </div> */}
      </a>
    </Link>

    <div className="details">
      {hike.categories.length >= 0 && (
        <div className="category">
          {/* Only display first category */}
          { hike.categories[0] }
        </div>
      )}

      <div className="access">
        <div className="transport">
          <TransportPoint line={hike.starting_point.line} station={ hike.starting_point.station } />
        </div>

        <div className="distance">
          <img src="/images/hike-icon.svg" alt="Distance de marche" className="hike-icon" />
          { hike.distance }
          km
        </div>
      </div>
    </div>

    <div className="content">
      <h2 className="title">
        <Link href={getHikeUrl(hike)}>
          <a>
            { hike.title }
          </a>
        </Link>
      </h2>

      <div className="summary">
        { hike.summary }
      </div>
    </div>
  </article>
)

export default HikeCard;
