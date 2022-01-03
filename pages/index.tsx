import Head from 'next/head'
import List from '../components/hike/List'
import Intro from '../components/home/Intro'
import TopBanner from '../components/TopBanner'
import Layout from '../components/layout'
import Header from '../components/layout/header'
import { getSortedHikesData } from '../lib/hike'
import { Hike } from '../lib/types'

type HomeProps = {
  hikes: Hike[],
}

export default function Home({ hikes }: HomeProps) {
  return (
    <Layout home>
      <Head>
        <title>RandoNavigo – Randonnées autour de Paris sans voiture</title>
        <meta name="description" content="Randonnées en pleine nature en Ile-de-France accessibles en transport en commun." />
      </Head>

      <div className="page-home">
        <Header />
        <TopBanner />
        <Intro />

        <section className="bg-zinc-50 py-12">
          <div className="container">
            <List hikes={hikes} />
          </div>
        </section>
      </div>
    </Layout>
  )
}

export function getStaticProps() {
  return {
    props: {
      hikes: getSortedHikesData(),
    }
  }
}
