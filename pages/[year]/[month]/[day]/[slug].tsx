import { getAllHikePaths, getHikeData } from '../../../../lib/hike'
import { Hike as HikeType } from '../../../../lib/types'

type HikeProps = {
  hike: HikeType,
}

type Params = {
  params: {
    slug: string
  }
}

const Hike = ({ hike }: HikeProps) => (
  <div>
    {hike.title}
  </div>
)

export const getStaticProps = async ({ params }: Params) => {
  return {
    props: {
      hike: getHikeData(params.slug),
    }
  }
}

export const getStaticPaths = async function () {
  const paths = getAllHikePaths()

  return {
    paths,
    fallback: false
  }
}

export default Hike
