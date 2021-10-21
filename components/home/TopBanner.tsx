const TopBanner = () => (
  <div className="banner">
    <div className="container-fluid">
      <div className="row align-items-center">
        <div className="col-lg-2 col-md-2 col-sm-1 col-4"></div>

        <div className="col-lg-1 col-md-2 col-sm-2 col-4">
          <img src="{{ asset('images/logo.svg') }}" className="logo" alt="" />
        </div>

        <div className="col-lg-7 col-md-6 col-sm-8 col-12">
          <div className="text">
            <h1>Rando Navigo</h1>
            <p>Randonnées en Ile-de-France accessibles en transport en commun.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default TopBanner
