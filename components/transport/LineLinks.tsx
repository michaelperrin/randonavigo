import { Network } from "@/lib/transport";
import LineIcon from "@/components/LineIcon";
import NetworkIcon from "@/components/NetworkIcon";

type HikePerLineProps = {};

const LineLinks = ({}: HikePerLineProps) => (
  <div className="md:mb-12">
    <div
      className="md:shadow-lg md:rounded-xl"
      style={{ fontFamily: "Barlow" }}
    >
      <div className="md:p-5 md:border-t md:border-l md:border-r md:border-gray-100 md:rounded-xl bg-white">
        <h3 className="uppercase text-sm font-bold text-gray-700 mb-4 font-sans-serif">
          Des randonnées sur toutes les lignes
        </h3>

        <section className="flex flex-wrap gap-1 mb-4">
          <NetworkIcon network={Network.RER} size={32} />
          <LineIcon line="A" size={32} />
          <LineIcon line="B" size={32} />
          <LineIcon line="C" size={32} />
          <LineIcon line="D" size={32} />
          <LineIcon line="E" size={32} />
        </section>

        <section className="flex flex-wrap gap-1 mb-4">
          <NetworkIcon network={Network.Transilien} size={32} />
          <LineIcon line="H" size={32} />
          <LineIcon line="J" size={32} />
          <LineIcon line="L" size={32} />
          <LineIcon line="N" size={32} />
          <LineIcon line="P" size={32} />
          <LineIcon line="R" size={32} />
          <LineIcon line="U" size={32} />
        </section>

        <section className="flex flex-wrap gap-1">
          <NetworkIcon network={Network.Tram} size={32} />
          <LineIcon line="T2" size={32} />
          <LineIcon line="T6" size={32} />
          <LineIcon line="T11" size={32} />
          <LineIcon line="T13" size={32} />
        </section>
      </div>
    </div>
  </div>
);

export default LineLinks;
