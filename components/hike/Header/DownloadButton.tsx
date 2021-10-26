import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import getHikeGpxPath from '../../../lib/getHikeGpxPath';
import { Hike } from '../../../lib/types'

type DownloadButtonProps = {
  hike: Hike,
}

const DownloadButton = ({ hike }: DownloadButtonProps) => (
  <div className="gpx-download">
    <a className="btn btn-info" download href={getHikeGpxPath(hike)}>
      <i className="fa fa-download" aria-hidden="true"></i>
      Télécharger la trace GPS
    </a>

    {' '}

    <Link href="/aide/gpx">
      <a className="gpx-help">
        <FontAwesomeIcon icon={faQuestionCircle} size="sm" />
        <span>{' '}Aide</span>
      </a>
    </Link>
  </div>
)

export default DownloadButton;
