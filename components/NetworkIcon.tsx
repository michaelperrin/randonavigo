import React from 'react';
import Image from 'next/image'
import { Network } from '@/lib/transport';

type NetworkIconProps = {
  network: Network,
  size?: number,
}

const NetworkIcon = ({ network, size = 24 }: NetworkIconProps) => (
  <div style={{ height: `${size}px` }}>
    {network === Network.RER && (
      <Image
        src="/images/transport/RER.svg"
        width={size}
        height={size}
        alt="RER"
      />
    )}
    {network === Network.Transilien && (
      <Image
        src="/images/transport/Transilien.svg"
        width={size}
        height={size}
        alt="Transilien"
      />
    )}
    {network === Network.Tram && (
      <Image
        src="/images/transport/tram.svg"
        width={size}
        height={size}
        alt="Tram"
      />
    )}
  </div>
)

export default NetworkIcon;
