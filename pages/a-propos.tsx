import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/layout'

const About = () => (
  <Layout>
    <Head>
      <title>A propos de RandoNavigo</title>
    </Head>
    <article className="about">
      <div className="container">
        <section className="intro">
          <div className="row">
            <div className="col-2">
              <Image
                src="/images/about/profile.jpg"
                className="profile-picture"
                width={200}
                height={200}
                alt=""
              />
            </div>

            <div className="col-10">
              <p>
                J&apos;ai créé ce site internet dans le but de partager les randonnées que j&apos;ai faites en Ile-de-France, et également pour m&apos;en rappeler moi-même.<br />
                La région possède de nombreux sites naturels insoupçonnés qui sont accessibles en transports en commun. Alors profitez-en pour vous éloigner du stress de la ville !
              </p>

              <p>
                Ce site internet n&apos;est pas affilié à la marque Navigo, ni à aucune autre marque ou entité.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h3>Les avantages des transports en commun</h3>

          <p>
            Partir pour une randonnée en transports présente de nombreux avantages. En voici quelques uns :
          </p>

          <ul>
            <li><strong>Vous respectez l&apos;environnement.</strong> Quitte à aller se ressourcer en pleine nature, autant la respecter plutôt que d&apos;utiliser un mode de transport polluant&nbsp;!</li>
            <li><strong>C&apos;est gratuit !</strong> (ou presque) Votre passe Navigo que vous utilisez habituellement vous donne accès à toute l&apos;Ile-de-France.</li>
            <li><strong>Vous êtes plus libre.</strong> La voiture vous imposerait une randonnée sous forme de boucle ou d&apos;aller-retour. Une randonnée gare à gare vous permettra d&apos;aller plus loin.</li>
            <li><strong>C&apos;est plus reposant.</strong> Les trains sont de plus en plus confortables et vous méritez bien une petite sieste à votre retour de randonnée plutôt que les stressants embouteillages.</li>
            <li><strong>Vous gagnez du temps.</strong> Si vous partez en fin de matinée, profitez de votre trajet en train pour y prendre votre déjeuner.</li>
            <li>Vous laissez place à l&apos;imprévu. Vous attendez votre train ? Pourquoi ne pas prendre une petite bière (et oui, vous ne conduisez pas !) au café du coin ou même à l&apos;auberge&nbsp;!</li>
            <li>… et bien sûr, vous n&apos;avez pas besoin de posséder une voiture.</li>
          </ul>
        </section>

        <section>
          <h3>Quelques conseils</h3>

          <p>
            Les chemins peuvent avoir varié ou la trace GPS enregistrée n&apos;est peut-être pas tout à fait exacte.
            N&apos;hésitez pas à improviser en repérant les chemins grâce à votre application&nbsp;!
          </p>

          <p>Préparez votre randonnée sans oublier :</p>

          <ul>
            <li>De l&apos;eau (on n&apos;en a jamais de trop).</li>
            <li>Des en-cas.</li>
            <li>Le minimum de secours (pansements, etc.).</li>
            <li>Votre carte de transport.</li>
          </ul>
        </section>

        <section>
          <h3>RandoNavigo sur les réseaux sociaux</h3>

          <ul>
            <li><a href="https://www.facebook.com/randonavigo/" target="_blank" rel="noreferrer">Facebook</a></li>
            <li><a href="https://twitter.com/RandoNavigo" target="_blank" rel="noreferrer">Twitter</a></li>
            <li><a href="https://www.instagram.com/randonavigo/" rel="noreferrer">Instagram</a></li>
          </ul>

          <p>Le code de ce site web est open-source ! Les sources sont <a href="https://github.com/michaelperrin/randonavigo">disponibles sur Github</a>.</p>
        </section>
      </div>
    </article>
  </Layout>
)AboutAideGpx
