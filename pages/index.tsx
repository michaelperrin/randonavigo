import Head from 'next/head'
import Image from 'next/image'
import List from '../components/hike/List'
import Layout from '../components/layout'
import { getHikes } from '../lib/hike'

export default function Home({ hikes }) {
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
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
      hikes: getHikes()
    }
  }
}
