import Link from 'next/link'

const Intro = () => (
  <section className="container">
      <div className="grid md:grid-cols-12 gap-8 my-12 items-center">
        <div className="md:col-span-8 md:pr-16">
          <h2 className="text-2xl font-bold mb-4">Randonnées en Ile-de-France</h2>

          <div className="prose max-w-none">
            <p>RandoNavigo vous propose de nombreuses <strong>randonnées</strong> en Ile-de-France, toujours <strong>accessibles en transport en commun</strong> !</p>
            <p>Il est en effet possible de s’évader en pleine nature près de chez soi et rapidement grâce aux transports en commun en Ile-de-France. Votre carte Navigo est désormais complètement dézonée, alors <strong>quittez la grisaille parisienne le temps d’une journée</strong> et profitez-en !</p>
            <p>Vous serez étonné du nombre de randonnées possibles partout en Ile-de-France facilement accessibles <strong>sans voiture</strong>.</p>
            <p>Je vous en propose quelques unes sur ce site web qui s’enrichira au fur et à mesure de nouvelles découvertes.</p>
          </div>
        </div>

        <aside className="md:col-span-4 prose">
          <h3 className="text-lg font-bold">Traces GPX</h3>

          <p>
            Toutes les randonnées sont proposées au format GPX. Une fois la randonnée téléchargée sur votre smartphone, impossible de se tromper.
            Il n&apos;y a plus qu&apos;à suivre la trace !
          </p>

          <Link href="/aide/gpx">
            <a className="py-2 px-4 bg-sky-700 text-white no-underline">En savoir plus</a>
          </Link>
        </aside>
    </div>
  </section>
)

export default Intro
