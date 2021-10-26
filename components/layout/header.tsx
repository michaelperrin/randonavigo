import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import Image from 'next/image'
import Link from 'next/link';

const Header = () => (
  <header className="main-header">
    <div className="banner">
      <div className="container-fluid">
        <div className="row no-gutters align-items-center">
          <div className="col-xl-8 col-lg-8 col-md-8 col-sm-6 offset-sm-1">
            <div className="brand">
              <div className="logo">
                <Link href="/">
                  <a>
                    <Image
                      src="/images/logo.svg"
                      width={400}
                      height={300}
                      alt=""
                    />
                  </a>
                </Link>
              </div>
              <div className="brand-name">
                <h1>
                  <Link href="/">
                    <a>
                      Rando Navigo
                    </a>
                  </Link>
                </h1>

                <p className="hidden-xs-down">
                  Randonnées en Ile-de-France accessibles en transport en commun.
                </p>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-5">
            <div className="social-links">
              <ul>
                <li className="about">
                  <Link href="/a-propos">
                    <a>
                      A propos
                    </a>
                  </Link>
                </li>
                <li>
                  <a href="https://www.instagram.com/randonavigo" title="Rando Navigo sur Instagram" target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={faInstagram} size="sm" />
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/randonavigo/" title="Rando Navigo sur Facebook" target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={faFacebook} size="sm" />
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/randonavigo" title="Rando Navigo sur Twitter" target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={faTwitter} size="sm" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
