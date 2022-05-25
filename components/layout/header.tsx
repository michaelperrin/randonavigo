import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const Header = () => (
  <header className="container flex align-middle items-center">
    <div className="lg:flex-1" />
    <div className="flex flex-col flex-1 my-5 flex-grow-2">
      <div className="flex flex-col lg:items-center mr-2 sm:mr-4 lg:mr-0">
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
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-condensed font-medium tracking-wide mb-1 md:mb-2">
                RandoNavigo
              </h1>
            </a>
          </Link>
        </div>
        <p className="text-sm md:text-base font-condensed text-gray-600">
          Randonnées en Ile-de-France accessibles en transport en commun.
        </p>
      </div>
    </div>
    <div className="flex flex-wrap gap-x-4 gap-y-3 justify-end flex-1">
      <div>
        <Link href="/a-propos">
          <a className="whitespace-nowrap">A propos</a>
        </Link>
      </div>
      <div>
        <ul className="flex ml-auto items-center">
          <li className="mr-4">
            <a
              href="https://www.instagram.com/randonavigo"
              title="RandoNavigo sur Instagram"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram as IconProp} size="lg" />
            </a>
          </li>
          <li className="mr-4">
            <a
              href="https://www.facebook.com/randonavigo/"
              title="RandoNavigo sur Facebook"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faFacebook as IconProp} size="lg" />
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/randonavigo"
              title="RandoNavigo sur Twitter"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faTwitter as IconProp} size="lg" />
            </a>
          </li>
        </ul>
      </div>
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
