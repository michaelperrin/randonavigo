const Header = () => (
  <header>
    <div className="banner">
      <div className="container-fluid">
        <div className="row no-gutters align-items-center">
          <div className="col-xl-8 col-lg-8 col-md-8 col-sm-6 offset-sm-1">
            <div className="brand">
              <div className="logo">
                <a href="{{ path('homepage') }}">
                  <img src="{{ asset('images/logo.svg') }}" alt="" />
                </a>
              </div>
              <div className="brand-name">
                <h1>
                  <a href="{{ path('homepage') }}">Rando Navigo</a>
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
                  <a href="{{ path('about') }}">
                    A propos
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/randonavigo" title="Rando Navigo sur Instagram" target="_blank">
                    <i className="fa fa-instagram" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/randonavigo/" title="Rando Navigo sur Facebook" target="_blank">
                    <i className="fa fa-facebook" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/randonavigo" title="Rando Navigo sur Twitter" target="_blank">
                    <i className="fa fa-twitter" aria-hidden="true"></i>
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
