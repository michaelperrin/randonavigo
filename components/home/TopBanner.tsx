import Image from 'next/image'
import heroImage from '../../public/images/IMG_9140-blur.jpg'

const TopBanner = () => (
  <div className="banner" style={{ position: 'relative' }}>
    <Image
      src={heroImage}
      layout="fill"
      objectFit="cover"
      placeholder="blur"
      alt=""
      priority
    />

    <div className="overlay" />

    <div className="container-fluid">
      <div className="row align-items-center">
        <div className="col-lg-2 col-md-2 col-sm-1 col-4"></div>

        <div className="col-lg-1 col-md-2 col-sm-2 col-4">
          <Image
            src="/images/logo.svg"
            alt="RandoNavigo"
            className="logo"
            width={100}
            height={100}
            priority
          />
        </div>

        <div className="col-lg-7 col-md-6 col-sm-8 col-12">
          <div className="text">
            <h1>RandoNavigo</h1>
            <p>Randonnées en Ile-de-France accessibles en transport en commun.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default TopBanner
