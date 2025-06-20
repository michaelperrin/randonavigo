import Image from "next/image";
import { useState } from "react";
import Lightbox from "react-18-image-lightbox";
import getHikePicturePath from "../../lib/getHikePicturePath";
import { Hike } from "../../lib/types";
import "react-18-image-lightbox/style.css";

type HikeGalleryProps = {
  hike: Hike;
};

const HikeGallery = ({ hike }: HikeGalleryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const pictures = hike.pictures.map((picture: string) =>
    getHikePicturePath(hike, picture)
  );

  const showPicture = (index: number) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  return <>
    <div
      className="grid gap-1"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}
    >
      {pictures.map((picture: string, index: number) => (
        <div
          key={picture}
          className="aspect-square cursor-zoom-in"
          style={{ position: "relative", margin: "1px" }}
          onClick={() => {
            showPicture(index);
          }}
        >
          <Image
            src={picture}
            quality={40}
            alt=""
            fill
            sizes="300px"
            style={{
              objectFit: "cover"
            }} />
        </div>
      ))}
    </div>

    {isOpen && (
      <Lightbox
        mainSrc={pictures[photoIndex]}
        nextSrc={pictures[(photoIndex + 1) % pictures.length]}
        prevSrc={
          pictures[(photoIndex + pictures.length - 1) % pictures.length]
        }
        onCloseRequest={() => setIsOpen(false)}
        onMovePrevRequest={() =>
          setPhotoIndex((photoIndex + pictures.length - 1) % pictures.length)
        }
        onMoveNextRequest={() =>
          setPhotoIndex((photoIndex + 1) % pictures.length)
        }
      />
    )}
  </>;
};

export default HikeGallery;
