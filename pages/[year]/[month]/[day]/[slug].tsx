import Head from 'next/head'
import { Hike as HikeType } from '../../../../lib/types'
import HikeHeader from '../../../../components/hike/Header/index'
import styles from './[slug].module.css'
import Gallery from '../../../../components/hike/Gallery'
import { getHikeData } from '../../../../lib/hike'
import { getAllHikePaths } from '../../../../lib/hike'
import Layout from '../../../../components/layout'
import getHikePicturePath from '../../../../lib/getHikePicturePath'

type HikeProps = {
  hike: HikeType,
}

type Params = {
  params: {
    slug: string
  }
}

const Hike = ({ hike }: HikeProps) => (
  <Layout>
    <Head>
      <title>{hike.title} – RandoNavigo</title>
      <link rel="canonical" href="" />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={hike.title} />
      <meta property="og:description" content={hike.summary} />
      <meta property="og:site_name" content="Rando Navigo" />
      <meta property="article:section" content={hike.categories[0]} />
      <meta property="article:published_time" content={hike.publication_date} />
      <meta property="article:modified_time" content={hike.publication_date} />
      <meta property="og:updated_time" content={hike.publication_date} />
      <meta property="og:image" content={`${process.env.BASE_URL}${getHikePicturePath(hike, hike.main_picture)}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:description" content={hike.summary} />
      <meta name="twitter:title" content={hike.title} />
      <meta name="twitter:image" content={`${process.env.BASE_URL}${getHikePicturePath(hike, hike.main_picture)}`} />
    </Head>

    <article id="hike" className="hike-show" data-gpx-file="{{ path('hike_download_gpx_file', {slug: hike.slug}) }}">
      <HikeHeader hike={hike} />
      <div className={styles.details}>
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-8 col-lg-8 ml-lg-auto">
              <div className={styles.description} dangerouslySetInnerHTML={{ __html: hike.content }} />
            </div>
            <div className="col-md-6 col-lg-3" />
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
            <div className="col-lg-10">
              <Gallery hike={hike} />
            </div>
          </div>
        </div>
      </section>
    </article>
  </Layout>
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
