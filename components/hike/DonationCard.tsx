import Image from "next/image";
import Link from "next/link";

const DonationCard = () => (
  <div>
    <div className="flex items-center bg-stone-100 rounded-t p-5 md:p-6 font-sans-serif shadow-md">
      <div className="grow pr-4 md:pr-6">
        <div className="font-bold uppercase mb-2 text-stone-800">
          Vous aimez cette suggestion de randonnée ?
        </div>
        <div className="text-sm flex flex-col gap-2 md:gap-3 text-stone-700">
          <p>
            RandoNavigo est entièrement{" "}
            <span className="font-medium text-amber-700">
              gratuit et sans publicité
            </span>
            .
          </p>

          <p>
            Un don me permettra de{" "}
            <span className="font-medium">
              supporter les frais liés au site
            </span>{" "}
            et de m’encourager à vous{" "}
            <span className="font-medium">
              concocter de nouvelles randonnées
            </span>
            , toujours en pleine nature et accessibles en transports.{" "}
            <Link
              href="/a-propos"
              className="underline hover:text-amber-700 whitespace-nowrap">
              
                En savoir plus
              
            </Link>
          </p>
        </div>
      </div>
      <div className="w-12 md:w-16 shrink-0">
        <Image
          src="/images/coffee-cup.png"
          className="rounded-full"
          width={90}
          height={148}
          alt=""
          style={{
            maxWidth: "100%",
            height: "auto"
          }} />
      </div>
    </div>
    <a
      className="relative before:duration-500 transition-all block w-full font-sans bg-gradient-to-r z-20 text-white text-center text-sm py-2 px-4 uppercase font-semibold rounded-b from-amber-600 to-amber-800 before:absolute before:block before:inset-0 before:-z-10 before:opacity-0 before:rounded-b hover:before:opacity-100 before:transition-opacity before:bg-gradient-to-r before:from-yellow-600 before:to-yellow-800 focus:from-yellow-600 focus:to-yellow-800"
      href="https://ko-fi.com/W7W46TRZ2"
      target="_blank"
      rel="noopener noreferrer"
    >
      Offrir un café
    </a>
  </div>
);

export default DonationCard;
