import classNames from "classnames";
import Image from "next/image";
import { useState } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

type GalleryProps = {
  pictures: string[];
  width?: "" | "sm";
};

const Gallery = ({ pictures, width = "" }: GalleryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const showPicture = (index: number) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  return (
    <>
      <div
        className={classNames("mx-auto", "grid", "gap-1", "mb-2", {
          "max-w-lg": width === "sm",
        })}
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}
      >
        {pictures.map((picture: string, index: number) => (
          <div
            key={picture}
            className="aspect-[4/3] cursor-zoom-in"
            style={{ position: "relative", margin: "1px" }}
            onClick={() => {
              showPicture(index);
            }}
          >
            <Image
              src={picture}
              layout="fill"
              objectFit="cover"
              sizes={pictures.length === 1 ? "800px" : "300px"}
              quality={70}
              alt=""
            />
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
    </>
  );
};

export default Gallery;
