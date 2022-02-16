import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import getHikeGpxPath from '@/lib/getHikeGpxPath';
import { Hike } from '@/lib/types'

type DownloadButtonProps = {
  hike: Hike,
}

const DownloadButton = ({ hike }: DownloadButtonProps) => (
  <div>
    <a className="block w-full font-sans bg-yellow-500 hover:bg-yellow-700 text-white text-center py-3 px-4 rounded uppercase font-semibold" download href={getHikeGpxPath(hike)} style={{ fontFamily: 'Barlow' }}>
      <i className="fa fa-download" aria-hidden="true"></i>
      Télécharger la trace GPS
    </a>

    {/* {' '}

    <Link href="/aide/gpx">
      <a className="gpx-help">
        <FontAwesomeIcon icon={faQuestionCircle} size="sm" />
        <span>{' '}Aide</span>
      </a>
    </Link> */}
  </div>
)

export default DownloadButton;
