import { Hike } from '@/lib/types'
import 'react-image-lightbox/style.css';
import TransportIcon from '@/components/TransportIcon'
import Link from 'next/link'
import getHikeLines from '@/lib/getHikeLines'
import getLinePageUrl from '@/lib/getLinePageUrl'
import getTransportPageLinkLabel from '@/lib/getTransportPageLinkLabel';

type RelatedHikesProps = {
  hike: Hike,
}

const RelatedHikes = ({ hike }: RelatedHikesProps) => {
  const hikeLines = getHikeLines(hike);

  if (hikeLines.length === 0) {
    return <div />;
  }

  return (
    <div className="flex">
      <div className="bg-stone-100 px-4 py-4 rounded my-6">
        <h4 className="font-bold uppercase mb-5">Randonnées sur toute la ligne</h4>
        <ul className="flex flex-col gap-4">
          {hikeLines.map(line => (
            <li key={line}>
              <div className="flex items-center gap-2">
                <TransportIcon line={line} size={24} />
                <div className="text-sm text-stone-700">
                  <Link href={getLinePageUrl(line)}>
                    {getTransportPageLinkLabel(line)}
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RelatedHikes;
