import Image from 'next/image'
import { Hike } from '@/lib/types'
import getHikePicturePath from '@/lib/getHikePicturePath'
import Date from '@/components/date'

type HikeHeaderProps = {
  hike: Hike,
}

const HikeHeader = ({ hike }: HikeHeaderProps) => (
  <header>
    <div className="flex flex-col justify-center relative h-screen/3 md:h-hero-header" style={{ minHeight: '400px' }}>
      <div className="pt-32 px-4 md:px-48 z-30 text-white" style={{ fontFamily: 'Barlow', textShadow: '0 0 40px rgba(0, 0, 0, 0.9)' }}>
        {hike.categories && (
          <div className="uppercase text-sm md:text-base tracking-wider mb-1 leading-none">
            {hike.categories[0]}
          </div>
        )}

        <h1 className="z-30 text-3xl md:text-4xl font-condensed font-medium leading-none">{hike.title}</h1>

        <Date dateString={hike.publication_date} className="block mt-4" />
      </div>

      <div className="after:absolute after:inset-0 after:bg-gradient-to-b after:from-transparent after:via-transparent after:to-black after:z-20 after:opacity-70">
        <Image
          src={getHikePicturePath(hike, hike.main_picture)}
          layout="fill"
          objectFit="cover"
          priority
          alt=""
        />
      </div>
    </div>
  </header>
)

export default HikeHeader;
