import Image from 'next/image'

type LineIconProps = {
  line: string | string[],
  size?: number,
}

const LineIcon = ({ line, size = 24 }: LineIconProps) => (
  <div style={{ height: `${size}px` }}>
    <Image
      src={`/images/transport/${line}.svg`}
      width={size}
      height={size}
      alt={`Ligne ${line}`}
    />
  </div>
)

export default LineIcon;
