import Head from "next/head";
import Layout from "@/components/layout";
import TopBanner from "@/components/TopBanner";

const PrivacyNotice = () => (
  <Layout>
    <Head>
      <title>Politique de confidentialité</title>
    </Head>
    <article>
      <TopBanner overlay>
        <h1 className="text-center text-4xl font-bold">
          Politique de confidentialité
        </h1>
      </TopBanner>

      <div className="container mt-12">
        <div className="prose">
          <h3>Formulaire de contact</h3>
          <p>
            Lorsque vous utilisez notre formulaire de contact, votre adresse
            mail, ainsi que votre message sont stockés sur notre serveur pour
            une durée indéterminée. Une copie est également envoyée sur notre
            mail : contact AT randonavigo.fr Les informations recueillies sont
            destinées à l’usage exclusif du site internet.
          </p>

          <h3>Statistiques</h3>
          <p>
            Ce site utilise Google Analytics, un service d’analyse web fournit
            par Google Ireland Limited. Si l’organe responsable pour le
            traitement des données récoltées via ce site est basé hors de
            l’Espace économique européen et la Suisse, alors le traitement des
            données associées à Google Analytics sera effectué par Google LLC
            (avec son siège aux Etats-Unis). Google Ireland Limited et Google
            LLC sont ensemble ci-après dénommés “Google”.
          </p>

          <p>
            Google Analytics utilise des “cookies”, des fichiers textes sauvés
            sur l’ordinateur du visiteur du site, pour permettre l’analyse de
            l’utilisation du site par ce dernier. L’information générée par le
            cookie (incluant l’adresse IP tronquée) sur l’utilisation du site
            web est transmise à et stockée par Google.
          </p>

          <p>
            Google Analytics est utilisé exclusivement avec l’extension «
            _anonymizeIp () » sur ce site. L’extension garantit une
            anonymisation de l’adresse IP par troncature et exclu de ce fait une
            référence personnelle directe. Via cette extension, Google tronque
            l’adresse IP du visiteur du site dans un état membre de l’Union
            européenne ou dans un autre État parti à l’accord sur l’Espace
            économique européen. Seulement dans des situations exceptionnelles
            l’adresse IP entière du visiteur du site sera transmise au serveur
            de Google et tronquée aux États-Unis. L’adresse IP, qui est fournie
            par le navigateur du visiteur du site utilisant Google Analytics ne
            sera pas recoupée par Google avec d’autres données de Google.
          </p>

          <p>
            Au nom de l’opérateur du site, Google utilisera l’information
            collectée pour évaluer l’utilisation du site, compiler des rapports
            sur l’activité du site et pour fournir d’autres sites et d’autres
            services internet à l’opérateur du site (article §6 1 f RGPD).
            L’intérêt légitime dans le traitement des données se trouve dans
            l’optimisation de ce site, l’analyse de l’utilisation du site et
            l’adaptation du contenu. L’intérêt des utilisateurs est adéquatement
            protégé par la pseudonymisation de leurs données.
          </p>

          <p>
            Google LLC a certifié sa conformité avec le Bouclier de protection
            des données UE-États-Unis, offrant une garantie du respect des
            législations européennes sur la protection des données. Les données
            envoyées et couplées au cookie de Google Analytics e.g. ID de
            l’utilisateur, ID publicitaire seront automatiquement effacés après
            14 mois. La suppression des données qui ont atteint la date limite
            de conservation est opérée automatiquement une fois par mois.
          </p>

          <p>
            Le visiteur du site peut refuser l’utilisation de cookies en
            sélectionnant le réglage approprié dans le navigateur. Le visiteur
            du site peut aussi empêcher Google de rassembler, via cookies, des
            informations (incluant l’adresse IP) et de traiter cette information
            en téléchargeant et en installant ce plugin dans le browser:
            http://tools.google.com/dlpage/gaoptout.
          </p>

          <p>
            Le visiteur du site peut empêcher la collecte des données par Google
            Analytics en cliquant sur ce lien. Un « cookie d’opt-out » sera
            alors placé et permettra au visiteur du site de ne pas être tracké
            durant sa navigation du site.
          </p>

          <p>
            Plus d’informations à propos du traitement et l’utilisation des
            données par Google, les paramétrages et les possibilités de
            désactivation peuvent être trouvées dans la politique de
            confidentialité de Google : ainsi que dans les paramètres de Google
            ads.
          </p>
        </div>
      </div>
    </article>
  </Layout>
);

export default PrivacyNotice;
