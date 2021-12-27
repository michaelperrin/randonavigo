import Head from 'next/head'
import { Hike as HikeType } from '../../../../lib/types'
import HikeHeader from '../../../../components/hike/Header/index'
import Gallery from '../../../../components/hike/Gallery'
import { getHikeData } from '../../../../lib/hike'
import { getAllHikePaths } from '../../../../lib/hike'
import Layout from '../../../../components/layout'
import getHikePicturePath from '../../../../lib/getHikePicturePath'
import HikeProperties from '../../../../components/hike/Properties'

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
      <meta property="description" content={hike.summary} />
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

    <article data-gpx-file="{{ path('hike_download_gpx_file', {slug: hike.slug}) }}">
      <HikeHeader hike={hike} />

      <div className="container">
        <div className="grid md:grid-cols-10 gap-0 md:gap-6 lg:gap-12 xl:gap-24 mb-12">
          <main className="order-2 md:order-1 md:col-span-6 font-serif mt-0 md:mt-12">
            <div className="text-lg font-semibold italic mb-8">
              {hike.summary}
            </div>

            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: hike.content }} />
          </main>

          <aside className="order-1 md:order-2 md:col-span-4 md:pt-0 z-30 font-serif mt-8 md:-mt-24 mb-5 md:mb-0 md:p-2">
            <HikeProperties hike={hike} />
          </aside>
        </div>

        <section>
          <Gallery hike={hike} />
        </section>
      </div>
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
