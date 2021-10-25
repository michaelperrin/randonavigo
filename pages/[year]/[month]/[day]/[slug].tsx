import { Hike as HikeType } from '../../../../lib/types'
import HikeHeader from '../../../../components/hike/Header/index'
import styles from './[slug].module.css'
import Gallery from '../../../../components/hike/Gallery'
import { getHikeData } from '../../../../lib/hike'
import { getAllHikePaths } from '../../../../lib/hike'

type HikeProps = {
  hike: HikeType,
}

type Params = {
  params: {
    slug: string
  }
}

const Hike = ({ hike }: HikeProps) => (
  <article id="hike" className="hike-show" data-gpx-file="{{ path('hike_download_gpx_file', {slug: hike.slug}) }}">
    <HikeHeader hike={hike} />

    <div className={styles.details}>
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-md-6 col-lg-6 ml-lg-auto">
            <div className={styles.description} dangerouslySetInnerHTML={{ __html: hike.content }} />
          </div>

          <div className="col-md-6 col-lg-5" />
        </div>
      </div>
    </div>

    <section>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-1"></div>
          <div className="col-lg-9"><h2>Photos en chemin</h2></div>
        </div>

        <div className="row">
          <div className="col-lg-1"></div>
          <div className="col-lg-9">
            <Gallery hike={hike} />
          </div>
        </div>
      </div>
    </section>
  </article>
)

export const getStaticProps = async ({ params }: Params) => {
  return {
    props: {
      hike: await getHikeData(params.slug),
    }
  }
}

export const getStaticPaths = async () => {
  const paths = await getAllHikePaths()

  return {
    paths,
    fallback: false
  }
}

export default Hike
