import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import Image from 'next/image'
import Link from 'next/link';

const Header = () => (
  <header className="container flex align-middle items-center">
    <div className="flex-1" />
    <div className="flex flex-col flex-1 my-5" style={{ flexGrow: 2 }}>
      <div className="flex flex-col items-center">
        {/* <div className="mr-4">
          <Link href="/">
            <a>
              <Image
                priority
                src="/images/logo2.svg"
                width={80}
                height={80}
                alt=""
              />
            </a>
          </Link>
        </div> */}

        <div>
          <Link href="/">
            <a>
              <h1 className="text-5xl font-condensed font-medium tracking-wide leading-relaxed">RandoNavigo</h1>
            </a>
          </Link>
        </div>
        <p className="font-condensed text-gray-600">Randonnées en Ile-de-France accessibles en transport en commun.</p>
      </div>

    </div>
    <div className="flex flex-1 social-media">
      <ul className="flex ml-auto items-center">
        <li className="mr-4">
          <Link href="/a-propos">
            <a>
              A propos
            </a>
          </Link>
        </li>
        <li className="mr-4">
          <a href="https://www.instagram.com/randonavigo" title="RandoNavigo sur Instagram" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faInstagram} size="lg" />
          </a>
        </li>
        <li className="mr-4">
          <a href="https://www.facebook.com/randonavigo/" title="RandoNavigo sur Facebook" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faFacebook} size="lg" />
          </a>
        </li>
        <li>
          <a href="https://twitter.com/randonavigo" title="RandoNavigo sur Twitter" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faTwitter} size="lg" />
          </a>
        </li>
      </ul>
    </div>
    {/* <div className="banner">
      <div className="container-fluid">
        <div className="row no-gutters align-items-center">
          <div className="col-xl-8 col-lg-8 col-md-8 col-sm-6 offset-sm-1">
            <div className="brand">
              <div className="logo">

              </div>
              <div className="brand-name">
                <h1>
                  <Link href="/">
                    <a>
                      RandoNavigo
                    </a>
                  </Link>
                </h1>

                <p className="tagline hidden-xs-down">
                  Randonnées en Ile-de-France accessibles en transport en commun.
                </p>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-5">
            <div className="social-links">

            </div>
          </div>
        </div>
      </div>
    </div> */}
  </header>
);

export default Header;
