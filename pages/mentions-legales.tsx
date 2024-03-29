import Head from 'next/head'
import Layout from '@/components/layout'
import TopBanner from '@/components/TopBanner'

const LegalNotice = () => (
  <Layout>
    <Head>
      <title>Mentions légales</title>
    </Head>
    <article>
      <TopBanner overlay>
        <h1 className="text-center text-4xl font-bold">Mentions légales</h1>
      </TopBanner>

      <div className="container mt-12">
        <div className="prose">
          <p>Les présentes conditions générales fixent les modalités d’utilisation du service web https://www.randonavigo.fr</p>
          <h3>Editeur et responsable de la publication</h3>
          <p>Ce site est édité par Michaël Perrin.</p>

          <h3>Hébergement</h3>
          <p>
            RandoNavigo est hébergé par:

            <address>
              Vercel Inc.<br />
              340 S Lemon Ave #4133<br />
              Walnut, CA 91789<br />
              USA<br />
            </address>
          </p>

          <p>Conformément à la loi, les éléments d’identification personnelle de l’auteur lui ont été communiqués.</p>

          <h3>Responsabilité</h3>
          <p>RandoNavigo met à disposition un contenu d’informations gratuit.</p>
          <p>
            Il s’assure en permanence de mettre les moyens à sa disposition pour s’assurer de la qualité de ces contenus.
            Toutefois, il ne pourra être tenu responsable des oublis, des inexactitudes et des carences dans la mise à jour, qu’elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.
            Il advient à l’utilisateur de s’assurer de la pertinence des contenus proposés. L’utilisateur s’engage donc à utiliser ces informations sous son entière responsabilité et dégage l’éditeur de toute responsabilité à cet égard.
          </p>

          <h3>Collecte et confidentialité des données personnelles</h3>
          <p>En vertu de l’application des dispositions de l’article 24-II de la loi du 6 janvier 1978 modifiée, sont dispensés de déclarations les sites web diffusant ou collectant des données à caractère personnel mis en œuvre par des particuliers dans le cadre d’une activité exclusivement personnelle.</p>
          <p>
            Les données personnelles collectées par RandoNavigo sont uniquement destinées à un usage interne. Ces données ne seront en aucun cas cédées ou revendues à des tiers.
          </p>
          <h4>COOKIES</h4>
          <p>
            L’utilisateur est informé que des cookies peuvent s’installer sur son navigateur. Un cookie est un petit fichier que va déposer un site internet sur votre ordinateur pour y stocker des informations qui vous sont propres.
            Sur ce site, des cookies sont utilisés pour analyser son audience via le service Google Analytics.
          </p>

          <h3>Newsletter</h3>
          <p>
            L’utilisateur a la possibilité de s’inscrire à la newsletter de RandoNavigo. Dans ce cas, il accepte de recevoir des messages informatifs de la part de l’éditeur. L’utilisateur a la possibilité de se désinscrire à tout moment en cliquant sur le lien de désinscription, qui se trouve dans chaque email envoyé par RandoNavigo.
          </p>
          <h3>Licences, droits de reproduction</h3>
          <p>Tous droits réservés. La reproduction du contenu de ce site, en tout ou en partie, est interdite sans la permission écrite de l’auteur.</p>
        </div>
      </div>
    </article>
  </Layout>
)

export default LegalNotice
