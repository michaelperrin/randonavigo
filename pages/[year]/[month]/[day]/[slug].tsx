import Head from 'next/head'
import { getAllHikePaths, getHikeData } from '../../../../lib/hike';

const Hike = ({ hike }) => (
  <div>
    {hike.title}
  </div>
)

export async function getStaticProps({ params }) {
  return {
    props: {
      hike: getHikeData(params.slug),
    }
  }
}

export async function getStaticPaths() {
  const paths = getAllHikePaths()

  return {
    paths,
    fallback: false
  }
}

export default Hike
