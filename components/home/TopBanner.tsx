import Image from 'next/image'
// import heroImage from '../../public/images/IMG_9140-blur.jpg'

const TopBanner = () => (
  <div className="relative flex flex-col align-middle justify-center" style={{ height: '50vh' }}>
    <div>
      {/* <div className="after:absolute after:inset-0 after:bg-gradient-to-b after:from-transparent after:via-transparent after:to-black after:z-20 after:opacity-70"> */}
      <div>
        <Image
          src="/hikes/2017/06/a-travers-les-vignes-dans-la-vallee-de-la-marne/pictures/IMG_7513.jpg"
          layout="fill"
          objectFit="cover"
          // placeholder="blur"
          alt=""
          priority
        />
      </div>
      {/* <div className="overlay" /> */}
      {/* <div className="flex gap-4 z-10 relative mx-48">
        <Image
          src="/images/logo.svg"
          alt="RandoNavigo"
          className="logo"
          width={120}
          height={120}
          priority
        />
        <div className="flex flex-col" style={{ textShadow: '0 0 40px rgba(0, 0, 0, 0.9)' }}>
          <h1 className="flex-grow-1 text-white text-5xl font-bold">RandoNavigo</h1>
          <p className="flex-grow-1 text-white text-xl">Randonnées en Ile-de-France accessibles en transport en commun.</p>
        </div>
      </div> */}
    </div>
  </div>
)

export default TopBanner
