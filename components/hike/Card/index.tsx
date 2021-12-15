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
  <article className="flex flex-col mb-4 bg-white" style={{ boxShadow: '0px 0px 18px rgb(83 70 29 / 15%) !important' }}>
    <Link href={getHikeUrl(hike)}>
      <a className="h-64 md:h-48 xl:h-64 flex-none relative">
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

    <div className="flex flex-col flex-1 mx-4 mt-4">
      <div>
        <div className="mt-2 mb-4">
          {hike.categories.length >= 0 && (
            <div className="uppercase text-xs text-gray-500 text-center leading-none mb-1" style={{color: '#4e6c85'}}>
              {/* Only display first category */}
              {hike.categories[0]}
            </div>
          )}

          <h2 className="font-sans-serif text-lg font-semibold text-center mx-8 leading-snug">
            <Link href={getHikeUrl(hike)}>
              <a>
                {hike.title}
              </a>
            </Link>
          </h2>
        </div>

        <div className="text-justify text-gray-600 mt-2 mb-4 font-serif" style={{ fontSize: '15px', hyphens: 'auto' }}>
          { hike.summary }
        </div>
      </div>

      <div className="flex mt-auto mb-3 pt-3 border-t border-gray-200">
        <div className="flex-grow-1 text-sm items-center font-sans-serif">
          <TransportPoint line={hike.starting_point.line} station={hike.starting_point.station} iconSize={20} />
        </div>

        <div className="flex ml-auto font-sans-serif text-sm font-medium">
          <div>
            <Image
              src="/images/hike-icon.svg"
              alt="Distance de marche"
              width={20}
              height={20}
            />
          </div>
          <div className="ml-1">
            {hike.distance}
            km
          </div>
        </div>
      </div>
    </div>
  </article>
)

export default HikeCard;
