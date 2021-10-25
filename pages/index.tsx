import Head from 'next/head'
import List from '../components/hike/List'
import Intro from '../components/home/Intro'
import TopBanner from '../components/home/TopBanner'
import Layout from '../components/layout'
import { getSortedHikesData } from '../lib/hike'
import { Hike } from '../lib/types'

type HomeProps = {
  hikes: Hike[],
}

export default function Home({ hikes }: HomeProps) {
  return (
    <Layout>
      <Head>
        <title>Rando Navigo</title>
        <meta name="description" content="Rando Navigo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="page-home">
        <TopBanner />
        <Intro />

        <section className="hike-list">
          <div className="container">
            <List hikes={hikes} />
          </div>
        </section>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      hikes: await getSortedHikesData(),
    }
  }
}
