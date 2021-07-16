import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring'
import { getAllHikePaths, getHikeData } from '../../../../lib/hike'
import { Hike as HikeType } from '../../../../lib/types'

type HikeProps = {
  hike: HikeType,
}

interface IParams extends ParsedUrlQuery {
  slug: string
}

const Hike = ({ hike }: HikeProps) => (
  <div>
    {hike.title}
  </div>
)

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams

  return {
    props: {
      hike: getHikeData(slug),
    }
  }
}

export const getStaticPaths: GetStaticPaths = async function () {
  const paths = getAllHikePaths()

  return {
    paths,
    fallback: false
  }
}

export default Hike
