import React from 'react';
import Image from "next/image";
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
        style={{
          maxWidth: "100%",
          height: "auto"
        }} />
    )}
    {network === Network.Transilien && (
      <Image
        src="/images/transport/Transilien.svg"
        width={size}
        height={size}
        alt="Transilien"
        style={{
          maxWidth: "100%",
          height: "auto"
        }} />
    )}
    {network === Network.Tram && (
      <Image
        src="/images/transport/tram.svg"
        width={size}
        height={size}
        alt="Tram"
        style={{
          maxWidth: "100%",
          height: "auto"
        }} />
    )}
  </div>
)

export default NetworkIcon;
