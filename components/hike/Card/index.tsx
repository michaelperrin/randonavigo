import Image from 'next/image'
import Link from 'next/link';
import getHikePicturePath from '../../../lib/getHikePicturePath';
import getHikeUrl from '../../../lib/getHikeUrl';
import { Hike } from '../../../lib/types';
import TransportPoint from '../../TransportPoint';
// import styles from './HikeCard.module.css'

type HikeCardProps = {
  hike: Hike,
}

const HikeCard = ({ hike }: HikeCardProps) => (
  <article className="hike-card">
    <Link href={getHikeUrl(hike)}>
      <a>
        <div className="main-picture">
          {hike.favorite && (
            <div className="favorite">
              <Image
                src="/images/favorite.svg"
                alt="Randonnée favorite"
                layout="fixed"
                width={48}
                height={48}
              />
            </div>
          )}

          <Image
            src={getHikePicturePath(hike, hike.main_picture)}
            layout="fill"
            objectFit="cover"
            sizes="350px"
            quality={40}
            alt=""
          />
        </div>
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
          <Image
            src="/images/hike-icon.svg"
            alt="Distance de marche"
            className="hike-icon"
            width={16}
            height={16}
          />
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
