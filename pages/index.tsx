import Head from 'next/head'
import Image from 'next/image'
import List from '../components/hike/List'
import Layout from '../components/layout'
import { getHikes } from '../lib/hike'
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

      <div>
        <h1>Rando Navigo</h1>

        <List hikes={hikes} />
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      hikes: await getHikes()
    }
  }
}
