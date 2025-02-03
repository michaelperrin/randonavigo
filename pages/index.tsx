import Head from 'next/head'
import List from '@/components/hike/List'
import Intro from '@/components/home/Intro'
import TopBanner from '@/components/TopBanner'
import Layout from '@/components/layout'
import Header from '@/components/layout/header'
import FilterBank from '@/components/hike/FilterBank'
import { getSortedHikesData } from '@/lib/hike'
import { Hike, FilterDefaults } from '@/lib/types'
import { useState } from 'react'
import getFilterDefaults from '@/lib/getFilterDefaults'

type HomeProps = {
  hikes: Hike[],
  filterDefaults: FilterDefaults,
}

export default function Home({ hikes, filterDefaults }: HomeProps) {
  const [filteredHikes, setFilteredHikes] = useState(hikes);

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
            <FilterBank allHikes={hikes} setFilteredHikes={setFilteredHikes} filterDefaults={filterDefaults} />
            <List hikes={filteredHikes} />
          </div>
        </section>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const hikes = getSortedHikesData();
  const filterDefaults = getFilterDefaults(hikes);

  console.log(filterDefaults);

  return {
    props: {
      hikes,
      filterDefaults,
    }
  }
}
