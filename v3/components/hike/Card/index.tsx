import Image from "next/image";
import Link from "next/link";
import getHikePicturePath from "@/lib/getHikePicturePath";
import getHikeUrl from "@/lib/getHikeUrl";
import { Hike } from "@/lib/types";
import TransportPoint from "@/components/TransportPoint";
import hikeIcon from "./hike-icon.svg";

type HikeCardProps = {
  hike: Hike;
};

const HikeCard = ({ hike }: HikeCardProps) => {
  return (
    <article className="flex flex-col mb-4 bg-white shadow-card">
      <Link
        href={getHikeUrl(hike)}
        className="h-64 md:h-48 xl:h-64 flex-none relative"
      >
        <div>
          {hike.favorite && (
            <div className="absolute top-0 right-0 z-10">
              <Image
                src="/images/favorite.svg"
                alt="Randonnée favorite"
                width={48}
                height={48}
              />
            </div>
          )}

          <Image
            src={getHikePicturePath(
              hike,
              hike.thumbnail_picture ?? hike.main_picture
            )}
            quality={60}
            className="w-full h-full object-fill"
            alt=""
            fill
            sizes="350px"
            style={{
              objectFit: "cover",
            }}
          />
        </div>
      </Link>

      <div className="flex flex-col flex-1 mx-4 mt-4">
        <div>
          <div className="mt-2 mb-4">
            {hike.categories.length >= 0 && (
              <div
                className="uppercase text-xs text-gray-500 text-center leading-none mb-1"
                style={{ color: "#4e6c85" }}
              >
                {/* Only display first category */}
                {hike.categories[0]}
              </div>
            )}

            <h2 className="font-sans-serif text-lg font-semibold text-center mx-8 leading-snug">
              <Link href={getHikeUrl(hike)}>{hike.title}</Link>
            </h2>
          </div>

          <div
            className="text-justify text-zinc-600 mt-2 mb-4 font-serif"
            style={{ fontSize: "15px", hyphens: "auto" }}
          >
            {hike.summary}
          </div>
        </div>

        <div className="flex items-center mt-auto mb-3 pt-3 border-t border-gray-200">
          <div className="flex-grow-1 text-sm items-center font-sans-serif">
            <TransportPoint
              line={hike.starting_point.line}
              station={hike.starting_point.station}
              iconSize={20}
            />
          </div>

          <div className="shrink-0 flex ml-auto font-sans-serif text-sm font-medium">
            <div className="shrink-0 relative w-5 h-5">
              <Image src={hikeIcon} alt="Distance de marche" fill />
            </div>
            <div className="ml-1">
              {hike.distance}
              km
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default HikeCard;
