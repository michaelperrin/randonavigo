import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const Header = () => {
  return (
    <header className="container flex align-middle items-center">
      {/* <div className="lg:flex-1" /> */}
      {/* <div className="flex flex-col flex-1 my-5 flex-grow-2">
        <div className="flex flex-col lg:items-center mr-2 sm:mr-4 lg:mr-0">
          <div>
            <Link href="/">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-condensed font-medium tracking-wide mb-1 md:mb-2">
                RandoNavigo
              </h1>
            </Link>
          </div>
          <p className="text-sm md:text-base font-condensed text-gray-600">
            Randonnées en Ile-de-France accessibles en transport en commun.
          </p>
        </div>
      </div> */}
      <div className="flex flex-wrap gap-x-4 gap-y-3 justify-end flex-1">
        <div>
          <Link href="/a-propos" className="whitespace-nowrap">
            A propos
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
                {/* TODO */}
                {/* <FontAwesomeIcon icon={faInstagram as IconProp} size="lg" /> */}
              </a>
            </li>
            <li className="mr-4">
              <a
                href="https://www.facebook.com/randonavigo/"
                title="RandoNavigo sur Facebook"
                target="_blank"
                rel="noreferrer"
              >
                {/* <FontAwesomeIcon icon={faFacebook as IconProp} size="lg" /> */}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
