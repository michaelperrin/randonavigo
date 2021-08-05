import dynamic from 'next/dynamic'
import Image from 'next/image'
import { format } from 'date-fns'
import { Hike } from '../../../lib/types'
import Access from './Access'
import Distance from './Distance'
import getHikePicturePath from '../../../lib/getHikePicturePath'
// import styles from './Header.module.css' // TODO

const MapWithNoSSR = dynamic(
  () => import('../Map'),
  { ssr: false }
)

type HikeHeaderProps = {
  hike: Hike,
}

const HikeHeader = ({ hike }: HikeHeaderProps) => (
  <header className="hike-header">
    <div className="main-picture" style={{ position: 'relative' }}>
      <Image
        src={getHikePicturePath(hike, hike.main_picture)}
        layout="fill"
        objectFit="cover"
        alt=""
      />
    </div>

    <div className="row align-items-center no-gutters">
      <div className="col-md-5 col-lg-4 offset-lg-1 px-2">
        {hike.categories && (
          <div className="category">
            {/* Only display first category */}
            {hike.categories[0]}
          </div>
        )}

        <time
          className="publication-date"
          dateTime={format(new Date(hike.publication_date), 'yyyy-MM-dd')}
        >
          {format(new Date(hike.publication_date), 'dd/MM/yyyy')}
        </time>

        <h1 className="title">{hike.title}</h1>

        <div className="summary">
          {hike.summary}
        </div>

        <div className="access">
          <Access hike={hike} />
        </div>

        <div className="distance">
          <Distance hike={hike} />
        </div>
      </div>

      <div className="col-md-7 col-lg-6 ml-lg-auto">
        <MapWithNoSSR hike={hike} />
      </div>
    </div>
  </header>
)

export default HikeHeader;
