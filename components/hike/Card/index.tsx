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
  <article className="flex flex-col hike-card mb-3 bg-white">
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
            src={getHikePicturePath(hike, hike.main_picture)}
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



    <div className="flex flex-col flex-1">
      <div className="px-0">
        <div className="my-2">
          {hike.categories.length >= 0 && (
            <div className="text-xs text-black text-center leading-none mt-5 mb-1 font-bold">
              {/* Only display first category */}
              {hike.categories[0]}
            </div>
          )}

          <h2 className="font-serif font-light text-xl text-center mx-8 mt-2 mb-4">
            <Link href={getHikeUrl(hike)}>
              <a>
                {hike.title}
              </a>
            </Link>
          </h2>
        </div>

        <div className="text-center text-gray-600 mb-2 font-light leading-relaxed" style={{ fontSize: '14.4px', fontFamily: 'Lato' }}>
          { hike.summary }
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <div className="text-sm flex items-center justify-center font-sans-serif mb-2 mt-2">
          <TransportPoint line={hike.starting_point.line} station={hike.starting_point.station} iconSize={20} />
        </div>

        <div className="flex items-center justify-center font-sans-serif text-sm font-medium">
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

      {/* <div className="mt-auto flex justify-center">
        <div className="inline-block text-xs px-4 py-2 bg-gray-600 text-white tracking-wider">VIEW</div>
      </div> */}
    </div>
  </article>
)

export default HikeCard;
