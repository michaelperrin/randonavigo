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
  <article className="flex flex-col hike-card shadow-lg rounded-md pb-4">
    <Link href={getHikeUrl(hike)}>
      <a>
        <div className="h-52 relative">
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
            src={getHikePicturePath(hike, hike.thumbnail_picture ?? hike.main_picture)}
            layout="fill"
            objectFit="cover"
            sizes="350px"
            quality={40}
            className="rounded-t-md object-fill"
            alt=""
          />
        </div>
      </a>
    </Link>



    <div className="flex flex-col flex-1 pt-4">
      <div className="flex-grow pb-4 px-4">
        {hike.categories.length >= 0 && (
          <div className="uppercase text-sm text-gray-500 leading-none">
            {/* Only display first category */}
            {hike.categories[0]}
          </div>
        )}
        <h2 className="font-sans-serif font-bold text-md mb-3">
          <Link href={getHikeUrl(hike)}>
            <a>
              { hike.title }
            </a>
          </Link>
        </h2>

        <div className="text-gray-700 font-sans-serif" style={{ fontSize: '16px' }}>
          { hike.summary }
        </div>
      </div>

      <div className="relative">
        {/* <div className="absolute inset-0">
          <Image
            src={getHikePicturePath(hike, hike.main_picture)}
            layout="fill"
            objectFit="cover"
            sizes="350px"
            quality={40}
            className="rounded-t-md object-fill"
            objectPosition="center bottom"
            alt=""
          />
        </div> */}

        <div className="flex px-4">
          {/* <div className="flex pt-4 pb-5 px-4 backdrop-filter backdrop-blur-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)' }}> */}
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

      {/* <div className="rounded-b-md relative">
        <div className="flex pt-4 pb-5 px-4" style={{ background: 'linear-gradient(151deg, hsl(240deg 8% 95%), hsl(30deg 6% 94%) 60%, hsl(30deg 16% 99%))' }}>
          <div className="flex-grow text-sm">
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
      </div> */}
      {/* <div className="rounded-b-md relative">
        <div className="absolute inset-0">
          <Image
            src={getHikePicturePath(hike, hike.main_picture)}
            layout="fill"
            objectFit="cover"
            sizes="350px"
            quality={40}
            className="rounded-t-md object-fill"
            objectPosition="center bottom"
            alt=""
          />
        </div>

        <div className="flex pt-4 pb-5 px-4 backdrop-filter backdrop-blur-none" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)'}}>
          <div className="flex-grow text-sm">
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
      </div> */}
    </div>
  </article>
)

export default HikeCard;
