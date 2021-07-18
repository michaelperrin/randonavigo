import { getAllHikePaths, getHikeData } from '../../../../lib/hike'
import { Hike as HikeType } from '../../../../lib/types'
import HikeHeader from '../../../../components/hike/Header/index'
import HikeDescription from '../../../../components/hike/Description'
import styles from './[slug].module.css'

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
            <HikeDescription hike={hike} />
          </div>

          <div className="col-md-6 col-lg-5" />
        </div>
      </div>
    </div>
  </article>
)

export const getStaticProps = async ({ params }: Params) => {
  return {
    props: {
      hike: await getHikeData(params.slug),
    }
  }
}

export const getStaticPaths = async function () {
  const paths = await getAllHikePaths()

  return {
    paths,
    fallback: false
  }
}

export default Hike
