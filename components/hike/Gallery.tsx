import Image from 'next/image'
import { useState } from 'react'
import Lightbox from 'react-image-lightbox'
import getHikePicturePath from '../../lib/getHikePicturePath'
import { Hike } from '../../lib/types'
import 'react-image-lightbox/style.css';

type GalleryProps = {
  hike: Hike,
}

const Gallery = ({ hike }: GalleryProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)

  const pictures = hike.pictures.map((picture: string) => getHikePicturePath(hike, picture))

  const showPicture = (index: number) => {
    setPhotoIndex(index)
    setIsOpen(true)
  }

  return (
    <>
      <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
        {pictures.map((picture: string, index: number) => (
          <div
            key={picture}
            className="aspect-w-1 aspect-h-1"
            style={{ position: 'relative', margin: '1px' }}
            onClick={() => { showPicture(index) }}
          >
            <Image
              src={picture}
              layout="fill"
              objectFit="cover"
              sizes="300px"
              quality={40}
              alt=""
            />
          </div>
        ))}
      </div>

      {isOpen && (
        <Lightbox
          mainSrc={pictures[photoIndex]}
          nextSrc={pictures[(photoIndex + 1) % pictures.length]}
          prevSrc={pictures[(photoIndex + pictures.length - 1) % pictures.length]}
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
  )
}

export default Gallery;
