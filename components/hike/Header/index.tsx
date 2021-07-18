import { format } from 'date-fns'
import { Hike } from '../../../lib/types'
import Access from './Access'
import Distance from './Distance'
import styles from './Header.module.css'

type HikeHeaderProps = {
  hike: Hike,
}

const HikeHeader = ({ hike }: HikeHeaderProps) => (
  <header className="hike-header">
    <div className={styles['main-picture']} />

    <div className="row align-items-center no-gutters">
      <div className="col-md-5 col-lg-4 offset-lg-1 px-2">
        {hike.categories && (
          <div className={styles['category']}>
            {/* Only display first category */}
            {hike.categories[0]}
          </div>
        )}

        <time
          className={styles['publication-date']}
          dateTime={format(new Date(hike.publication_date), 'yyyy-MM-dd')}
        >
          {format(new Date(hike.publication_date), 'dd/MM/yyyy')}
        </time>

        <h1 className="title">{hike.title}</h1>

        <div className={styles['summary']}>
          {hike.summary}
        </div>

        <div className={styles['access']}>
          <Access hike={hike} />
        </div>

        <div className={styles['distance']}>
          <Distance hike={hike} />
        </div>
      </div>
    </div>
  </header>
)

export default HikeHeader;
