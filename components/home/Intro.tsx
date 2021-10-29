import Link from 'next/link'

const Intro = () => (
  <section className="intro">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-8 ml-md-auto">
          <div className="content">
            <h2>Randonnées en Ile-de-France</h2>

            <p>RandoNavigo vous propose de nombreuses <strong>randonnées</strong> en Ile-de-France, toujours <strong>accessibles en transport en commun</strong> !</p>
            <p>Il est en effet possible de s’évader en pleine nature près de chez soi et rapidement grâce aux transports en commun en Ile-de-France. Votre carte Navigo est désormais complètement dézonée, alors <strong>quittez la grisaille parisienne le temps d’une journée</strong> et profitez-en !</p>
            <p>Vous serez étonné du nombre de randonnées possibles partout en Ile-de-France facilement accessibles <strong>sans voiture</strong>.</p>
            <p>Je vous en propose quelques unes sur ce site web qui s’enrichira au fur et à mesure de nouvelles découvertes.</p>
          </div>
        </div>

        <div className="col-md-3">
          <aside className="gpx-info">
            <h3>Traces GPX</h3>

            <p>
              Toutes les randonnées sont proposées au format GPX. Une fois la randonnée téléchargée sur votre smartphone, impossible de se tromper.
              Il n&apos;y a plus qu&apos;à suivre la trace !
            </p>

            <Link href="/aide/gpx">
              <a className="btn btn-info">En savoir plus</a>
            </Link>
          </aside>
        </div>
      </div>
    </div>
  </section>
)

export default Intro
