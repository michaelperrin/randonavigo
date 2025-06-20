import Image from "next/image";
import "react-18-image-lightbox/style.css";
import dynamic from "next/dynamic";

type PictureProps = {
  src: string;
  caption?: string;
};

const Picture = ({ src, caption }: PictureProps) => (
  <div className="mx-auto mb-2 max-w-lg">
    <figure className="relative">
      <Image
        src={src}
        width={800}
        height={800}
        quality={70}
        alt=""
        sizes="800px"
        style={{
          maxWidth: "100%",
          height: "auto"
        }} />
      {caption && (
        <figcaption className="text-center text-sm text-gray-500">
          {caption}
        </figcaption>
      )}
    </figure>
  </div>
);

export default Picture;
