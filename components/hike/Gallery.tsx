import Image from 'next/image'
import getHikePicturePath from '../../lib/getHikePicturePath'
import { Hike } from '../../lib/types'
import styles from './Gallery.module.css'

type GalleryProps = {
  hike: Hike,
}

const Gallery = ({ hike }: GalleryProps) => (
  <div className={styles.gallery}>
    {hike.pictures.map(picture => (
      <div key={picture} className={styles.thumbnailContainer} style={{ position: 'relative', margin: '1px' }}>
        <Image
          className={styles.thumbnail}
          src={getHikePicturePath(hike, picture)}
          layout="fill"
          objectFit="cover"
          alt=""
        />
      </div>
    ))}
  </div>
)

export default Gallery;
