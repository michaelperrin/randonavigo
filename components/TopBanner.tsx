import Image from "next/image";

type TopBannerProps = {
  picture?: string;
  children?: JSX.Element | JSX.Element[];
  overlay?: boolean;
};

const TopBanner = ({
  children,
  picture = "/images/home-bg.jpeg",
  overlay = false,
}: TopBannerProps) => {
  const overlayClasses = overlay
    ? "after:absolute after:inset-0 after:bg-gradient-to-b after:from-transparent after:via-transparent after:to-black after:z-20 after:opacity-70"
    : "";

  return (
    <div
      className="relative flex flex-col align-middle justify-center"
      style={{ height: "50vh" }}
    >
      <div
        className="pt-32 px-4 md:px-48 z-30 text-white"
        style={{
          fontFamily: "Barlow",
          textShadow: "0 0 40px rgba(0, 0, 0, 0.9)",
        }}
      >
        {children}
      </div>

      <div className={overlayClasses}>
        <Image
          src={picture}
          priority
          alt=""
          fill
          sizes="100vw"
          style={{
            objectFit: "cover"
          }} />
      </div>
    </div>
  );
};

export default TopBanner;
