import classNames from "classnames";
import dynamic from "next/dynamic";

import getHikeGpxPath from "@/lib/getHikeGpxPath";
import { Hike } from "@/lib/types";
import Access from "./Header/Access";
import Distance from "./Header/Distance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleDown,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import DonationCard from "./DonationCard";

const MapWithNoSSR = dynamic(() => import("./Map"), { ssr: false });

type HikePropertiesProps = {
  hike: Hike;
};

const HikeProperties = ({ hike }: HikePropertiesProps) => (
  <div className="md:mb-12">
    <div
      className="md:shadow-lg md:rounded-xl"
      style={{ fontFamily: "Barlow" }}
    >
      <div className="md:p-5 md:border-t md:border-l md:border-r md:border-gray-100 md:rounded-t-xl bg-white">
        <div className="mb-6">
          <h3
            className="uppercase text-sm font-bold text-gray-500 mb-2"
            style={{ fontFamily: "Barlow" }}
          >
            Départ / arrivée
          </h3>
          <Access hike={hike} transportIconSize={26} />
        </div>
        <div className="mb-4">
          <h3
            className="uppercase text-sm font-bold text-gray-500 mb-2"
            style={{ fontFamily: "Barlow" }}
          >
            Distance
          </h3>
          <Distance hike={hike} />
        </div>
      </div>
      <div>
        <MapWithNoSSR hike={hike} />
      </div>

      <a
        className={classNames(
          "mt-4 md:mt-0 block w-full font-sans bg-gradient-to-r hover:from-indigo-700 from-softblue via-softblue to-indigo-700 md:after:bg-gradient-to-r md:after:from-softblue after:indigo-700 md:after:blur-2xl md:after:absolute relative md:after:inset-0 md:after:z-10 z-20 text-white text-center py-4 px-4 uppercase font-semibold md:rounded-t-none",
          {
            rounded: hike.gpx_alternatives === undefined,
            "rounded-t": hike.gpx_alternatives !== undefined,
          }
        )}
        href={getHikeGpxPath(hike.slug, hike.publication_date, hike.gpx_file)}
        style={{ fontFamily: "Barlow" }}
      >
        <div className="flex justify-center items-center z-50 text-white tracking-wider relative text-sm">
          <div className="pr-2">
            <FontAwesomeIcon icon={faArrowCircleDown} size="lg" aria-label="" />
          </div>
          <div>Télécharger la trace GPS</div>
        </div>
      </a>
    </div>

    {hike.gpx_alternatives && (
      <div className="font-sans-serif text-sm text-center bg-slate-50/70 z-20 relative rounded-b py-5 px-6 shadow-xl shadow-slate-200">
        <div className="uppercase font-semibold text-gray-600 mb-2">
          Trace GPS alternative
        </div>
        <ul>
          {hike.gpx_alternatives.map((alternative) => (
            <li key={alternative.file}>
              <a
                href={getHikeGpxPath(
                  hike.slug,
                  hike.publication_date,
                  alternative.file
                )}
                className="font-medium text-gray-800"
              >
                <FontAwesomeIcon icon={faArrowCircleDown} size="xs" />{" "}
                {alternative.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )}

    {/* <div className="font-sans-serif font-bold text-sm text-center mt-2">
      <Link href="/aide/gpx">
        <a>
          <FontAwesomeIcon icon={faQuestionCircle} size="sm" />
          {' '}
          Aide
        </a>
      </Link>
    </div> */}

    <div className="mt-8 md:mt-16">
      <DonationCard />
    </div>
  </div>
);

export default HikeProperties;
