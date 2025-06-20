"use client";

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
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const MapWithNoSSR = dynamic(() => import("./Map"), { ssr: false });

type HikePropertiesProps = {
  hike: Hike;
};

const HikeProperties = ({ hike }: HikePropertiesProps) => {
  const roundedButtonClasses = {
    rounded: hike.gpx_alternatives === undefined,
    "rounded-t": hike.gpx_alternatives !== undefined,
  };

  return (
    <div className="md:mb-12">
      <div className="md:shadow-lg md:rounded-xl font-sans-serif">
        <div className="md:p-5 md:border-t md:border-l md:border-r md:border-gray-100 md:rounded-t-xl bg-white">
          <div className="mb-6">
            <h3 className="uppercase text-sm font-bold text-gray-500 mb-2">
              Départ / arrivée
            </h3>
            <Access hike={hike} transportIconSize={26} />
          </div>
          <div className="mb-4">
            <h3 className="uppercase text-sm font-bold text-gray-500 mb-2">
              Distance
            </h3>
            <Distance hike={hike} />
          </div>

          {/* <div className="mb-4">
            <div className="flex gap-4 justify-between">
              <div>
                <h3 className="uppercase text-sm font-bold text-gray-500 mb-2">
                  Nature
                </h3>
                <div className="flex gap-1">
                  <Image
                    src="/images/icons/leaf.png"
                    width={20}
                    height={20}
                    alt=""
                  />
                  <Image
                    src="/images/icons/leaf.png"
                    width={20}
                    height={20}
                    alt=""
                  />
                  <Image
                    src="/images/icons/leaf.png"
                    width={20}
                    height={20}
                    alt=""
                    className="grayscale opacity-40"
                  />
                </div>
              </div>

              <div>
                <h3 className="uppercase text-sm font-bold text-gray-500 mb-2">
                  Patrimoine
                </h3>
                <div className="flex gap-1">
                  <Image
                    src="/images/icons/castle2.png"
                    width={12}
                    height={12}
                    alt=""
                  />
                  <Image
                    src="/images/icons/castle2.png"
                    width={12}
                    height={12}
                    alt=""
                  />
                  <Image
                    src="/images/icons/castle2.png"
                    width={12}
                    height={12}
                    alt=""
                    className="grayscale opacity-40"
                  />
                </div>
              </div>

              <div>
                <h3 className="uppercase text-sm font-bold text-gray-500 mb-2">
                  Difficulté
                </h3>
                <div className="flex gap-1">
                  <Image
                    src="/images/icons/hiker.svg"
                    width={14}
                    height={14}
                    alt=""
                  />
                  <Image
                    src="/images/icons/hiker.svg"
                    width={14}
                    height={14}
                    alt=""
                  />
                  <Image
                    src="/images/icons/hiker.svg"
                    width={14}
                    height={14}
                    alt=""
                    className="grayscale opacity-40"
                  />
                </div>
              </div>
            </div>
          </div> */}
        </div>
        <div>
          <MapWithNoSSR hike={hike} />
        </div>

        <a
          className={classNames(
            "mt-4 md:mt-0 block w-full bg-linear-to-r from-softblue to-indigo-700 md:after:bg-linear-to-r md:after:from-softblue after:indigo-700 md:after:blur-2xl md:after:absolute relative md:after:inset-0 md:after:z-10 z-20 md:rounded-t-none",
            roundedButtonClasses
          )}
          href={getHikeGpxPath(hike.slug, hike.publication_date, hike.gpx_file)}
          role="button"
        >
          <div
            className={classNames(
              "rounded-sm flex justify-center items-center z-50 text-white tracking-wider relative text-sm bg-transparent transition-all hover:bg-softblue-light text-center py-4 px-4 uppercase font-semibold duration-500",
              roundedButtonClasses
            )}
          >
            <div className="pr-2">
              <FontAwesomeIcon
                icon={faArrowCircleDown as IconProp}
                size="lg"
                aria-label=""
              />
            </div>
            <div>Télécharger la trace GPS</div>
          </div>
        </a>
      </div>

      {hike.gpx_alternatives && (
        <div className="font-sans-serif text-sm bg-slate-50/70 z-20 relative rounded-b py-5 px-6 shadow-xl shadow-slate-200">
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
                  <FontAwesomeIcon
                    icon={faArrowCircleDown as IconProp}
                    size="xs"
                  />{" "}
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
                  <FontAwesomeIcon icon={faQuestionCircle as IconProp} size="sm" />
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
};

export default HikeProperties;
