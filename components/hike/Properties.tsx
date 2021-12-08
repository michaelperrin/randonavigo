import dynamic from 'next/dynamic'

import getHikeGpxPath from '../../lib/getHikeGpxPath'
import { Hike } from '../../lib/types'
import Access from './Header/Access'
import Distance from './Header/Distance'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleDown } from '@fortawesome/free-solid-svg-icons'

const MapWithNoSSR = dynamic(
  () => import('./Map'),
  { ssr: false }
)

type HikePropertiesProps = {
  hike: Hike,
}

const HikeProperties = ({ hike }: HikePropertiesProps) => (
  <div className="md:mb-12 md:shadow-lg md:rounded-xl" style={{ fontFamily: 'Barlow' }}>
    <div className="md:p-5 md:border-t md:border-l md:border-r md:border-gray-100 md:rounded-t-xl bg-white">
      <div className="mb-6">
        <h3 className="uppercase text-sm font-bold text-gray-500 mb-2" style={{ fontFamily: 'Barlow' }}>Départ / arrivée</h3>
        <Access hike={hike} transportIconSize={26} />
      </div>
      <div className="mb-6">
        <h3 className="uppercase text-sm font-bold text-gray-500 mb-2" style={{ fontFamily: 'Barlow' }}>Distance</h3>
        <Distance hike={hike} />
      </div>
    </div>

    <div>
      <MapWithNoSSR hike={hike} />
    </div>

    {/* Background cool en before et after: hsl(202.8, 70.5%, 33.1%) */}
    {/* <a className="block w-full font-sans bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 after:bg-gradient-to-r after:from-yellow-400 after:via-red-500 after:to-pink-500 after:filter after:blur-2xl after:absolute relative after:inset-0 after:z-10 z-20 hover:bg-yellow-700 text-white text-center py-3 px-4 uppercase font-semibold rounded-b-xl" download href={getHikeGpxPath(hike)} style={{ fontFamily: 'Barlow' }}> */}
    {/* <a className="block w-full font-sans bg-gradient-to-r from-softblue via-softblue to-indigo-700 after:bg-gradient-to-r after:from-softblue after:indigo-700 after:filter after:blur-2xl after:absolute relative after:inset-0 after:z-10 z-20 hover:bg-yellow-700 text-white text-center py-4 px-4 uppercase font-semibold rounded-b-xl" download href={getHikeGpxPath(hike)} style={{ fontFamily: 'Barlow' }}> */}
    <a className="mt-4 md:mt-0 block w-full font-sans bg-gradient-to-r hover:from-indigo-700 from-softblue via-softblue to-indigo-700 md:after:bg-gradient-to-r md:after:from-softblue after:indigo-700 md:after:filter md:after:blur-2xl md:after:absolute relative md:after:inset-0 md:after:z-10 z-20 hover:bg-yellow-700 text-white text-center py-4 px-4 uppercase font-semibold rounded md:rounded-t-none" href={getHikeGpxPath(hike)} style={{ fontFamily: 'Barlow' }}>
      <div className="flex justify-center items-center z-50 text-white tracking-wider relative text-sm">
        <div className="pr-2">
          <FontAwesomeIcon icon={faArrowCircleDown} size="lg" aria-label="Gare de départ" />
        </div>
        <div>Télécharger la trace GPS</div>
      </div>
    </a>
  </div>
)

export default HikeProperties;
