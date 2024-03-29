import Image from "next/image";
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
        style={{
          maxWidth: "100%",
          height: "auto"
        }} />
    </div>
  )

  if (!linkToPage) {
    return image;
  }

  return (
    <Link href={getLinePageUrl(line)} title={getTransportPageLinkLabel(line)}>
      {image}
    </Link>
  );
}

export default LineIcon
