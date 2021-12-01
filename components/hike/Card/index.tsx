import Image from 'next/image'
import Link from 'next/link';
import getHikePicturePath from '../../../lib/getHikePicturePath';
import getHikeUrl from '../../../lib/getHikeUrl';
import { Hike } from '../../../lib/types';
import TransportPoint from '../../TransportPoint';

type HikeCardProps = {
  hike: Hike,
}

const HikeCard = ({ hike }: HikeCardProps) => (
  <article className="flex flex-col hike-card shadow-lg mb-4 bg-white">
    <Link href={getHikeUrl(hike)}>
      <a className="h-56 flex-none relative">
        <div>
          {hike.favorite && (
            <div className="absolute top-0 right-0 z-10">
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
            src={getHikePicturePath(hike, hike.thumbnail_picture ?? hike.main_picture)}
            layout="fill"
            objectFit="cover"
            sizes="350px"
            quality={40}
            className="w-full h-full object-fill"
            alt=""
          />
        </div>
      </a>
    </Link>



    <div className="flex flex-col flex-1 py-4">
      <div className="flex-grow pb-4 px-4">
        <div className="my-3">
          {hike.categories.length >= 0 && (
            <div className="uppercase text-xs text-gray-500 text-center leading-none mb-1">
              {/* Only display first category */}
              {hike.categories[0]}
            </div>
          )}
          <h2 className="font-sans-serif text-lg font-semibold text-center mx-8">
            <Link href={getHikeUrl(hike)}>
              <a>
                { hike.title }
              </a>
            </Link>
          </h2>
        </div>

        <div className="text-gray-600 text-justify mb-4" style={{ fontSize: '15px', fontFamily: 'Lato' }}>
          { hike.summary }
        </div>
      </div>

      <div className="flex px-4">
        <div className="flex-grow text-sm pr-2">
          <TransportPoint line={hike.starting_point.line} station={hike.starting_point.station} />
        </div>
        <div className="flex flex-shrink-0 items-center">
          <Image
            src="/images/hike-icon.svg"
            alt="Distance de marche"
            className="hike-icon"
            width={16}
            height={16}
          />
          <div>
            {hike.distance}
            km
          </div>
        </div>
      </div>
    </div>
  </article>
)

export default HikeCard;
