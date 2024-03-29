import Head from 'next/head'
import Image from "next/image";
import Layout from '@/components/layout'

const AideGpx = () => (
  <Layout>
    <Head>
      <title>Aide sur les fichiers GPX — RandoNavigo</title>
    </Head>

    <article className="">
      <div className="container">
        <div className="row">
          <div className="col-sm-1"></div>
          <div className="col-sm-10 prose">
            <p className="intro">
              Toutes les randonnées sur le site sont proposées au format GPX. Voici quelques indications pour les utiliser et trouver votre chemin pendant la randonnée.
            </p>

            <p>Lorsque ces fichiers sont ouverts avec une application dédiée sur votre smartphone, une carte présentant dessus le tracé de la randonnée permet de se repérer à tout moment de la randonnée. Aucun risque de se tromper, il suffit de suivre la trace par rapport à votre position actuelle.</p>

            <p>Il existe un certain nombre d’applications iOS et Android qui permettent d’ouvrir ce type de fichier. Je recommande l’application <strong>ViewRanger</strong> qui malgré son ergonomie déroutante a l’avantage d’être gratuite et de présenter une carte très détaillée des routes et chemins. Vous pourrez ainsi improviser des détours ou des raccourcis à tout moment. L&apos;application <strong>VisoRando</strong> est également une bonne alternative.</p>

            <p>Voici la procédure pour charger un fichier GPX dans ViewRanger sur iPhone. Les étapes sont similaires sur Android.</p>

            <ol>
              <li>Rendez-vous sur la page d&apos;une des randonnées de RandoNavigo.</li>
              <li>Appuyez sur « Télécharger la trace GPS ».</li>
              <li>Choisir « Options… ».</li>
              <li>Choisissez « Copier dans View Ranger » ou « Copier dans VisoRando »</li>
              <li>Rendez-vous dans l&apos;onglet « Profil » de ViewRanger et sélectionnez la randonnée.</li>
              <li>Choisissez « Voir ce tracé sur la carte ».</li>
            </ol>

            <p>Bonne randonnée !</p>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            <Image
              src="/images/help/gpx/transfer-1.png"
              width={750}
              height={1334}
              alt=""
              style={{
                maxWidth: "100%",
                height: "auto"
              }} />
            <Image
              src="/images/help/gpx/transfer-1.png"
              width={750}
              height={1334}
              alt=""
              style={{
                maxWidth: "100%",
                height: "auto"
              }} />
            <Image
              src="/images/help/gpx/transfer-2.png"
              width={750}
              height={1334}
              alt=""
              style={{
                maxWidth: "100%",
                height: "auto"
              }} />
            <Image
              src="/images/help/gpx/transfer-3.png"
              width={750}
              height={1334}
              alt=""
              style={{
                maxWidth: "100%",
                height: "auto"
              }} />
            <Image
              src="/images/help/gpx/transfer-4.png"
              width={750}
              height={1334}
              alt=""
              style={{
                maxWidth: "100%",
                height: "auto"
              }} />
          </div>
        </div>
      </div>
    </article>
  </Layout>
)

export default AideGpx
