import Image from 'next/image'
import Link from 'next/link';
import getLinePageUrl from '@/lib/getLinePageUrl';
import getTransportPageLinkLabel from '@/lib/getTransportPageLinkLabel';

type LineIconProps = {
  line: string,
  size?: number,
  linkToPage?: boolean,
}

const LineIcon = ({ line, size = 24, linkToPage = true }: LineIconProps) => {
  const image = (
    <div style={{ height: `${size}px` }}>
      <Image
        src={`/images/transport/${line}.svg`}
        width={size}
        height={size}
        alt={`Ligne ${line}`}
      />
    </div>
  )

  if (!linkToPage) {
    return image;
  }

  return (
    <Link href={getLinePageUrl(line)}>
      <a title={getTransportPageLinkLabel(line)}>{image}</a>
    </Link>
  )
}

export default LineIcon
