import Head from 'next/head'
import Image from 'next/image'
import List from '../components/hike/List'
import { getHikes } from '../lib/hike'
import styles from '../styles/Home.module.css'

export default function Home({ hikes }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Rando Navigo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Rando Navigo</h1>

        <List hikes={hikes} />
      </main>

      <footer className={styles.footer}>
        Rando Navigo
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {
      hikes: getHikes()
    }
  }
}
