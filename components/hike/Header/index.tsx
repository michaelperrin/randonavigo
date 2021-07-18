import { format } from 'date-fns'
import { Hike } from "../../../lib/types"
import Access from './Access'
import Distance from './Distance'

type HikeHeaderProps = {
  hike: Hike,
}

const HikeHeader = ({ hike }: HikeHeaderProps) => (
  <header>
    <div className="main-picture" />

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

        <h1>{hike.title}</h1>

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
    </div>
  </header>
)

export default HikeHeader;
