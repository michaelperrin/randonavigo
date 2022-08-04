import type { AppProps } from "next/app";
import Script from "next/script";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "tailwindcss/tailwind.css";
import "leaflet/dist/leaflet.css";
import "leaflet.locatecontrol/dist/L.Control.Locate.css";
// import "tarteaucitronjs/tarteaucitron"

config.autoAddCss = false;

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Script
      src="https://cdnjs.cloudflare.com/ajax/libs/tarteaucitronjs/1.9.7/tarteaucitron.js"
      integrity="sha512-Gy4Totoc6VaNgS/4gQaRKBCdObDw3C9jOrWNtO3xjPfpuCRA4pn5hsMIEkDpwgNHpGVcBErESfm9n+9jRfLnqg=="
      crossOrigin="anonymous"
      referrerPolicy="no-referrer"
      onLoad={() => {
        tarteaucitron.init({
          privacyUrl: "" /* Privacy policy url */,
          bodyPosition:
            "bottom" /* or top to bring it as first element for accessibility */,

          hashtag: "#tarteaucitron" /* Open the panel with this hashtag */,
          cookieName: "tarteaucitron" /* Cookie name */,

          orientation:
            "bottom" /* Banner position (top - bottom - middle - popup) */,

          groupServices: false /* Group services by category */,
          serviceDefaultState: "wait" /* Default state (true - wait - false) */,

          showAlertSmall: false /* Show the small banner on bottom right */,
          cookieslist: false /* Show the cookie list */,

          showIcon: true /* Show cookie icon to manage cookies */,
          // "iconSrc": "", /* Optionnal: URL or base64 encoded image */
          iconPosition:
            "BottomRight" /* Position of the icon between BoñttomRight, BottomLeft, TopRight and TopLeft */,

          adblocker: false /* Show a Warning if an adblocker is detected */,

          DenyAllCta: true /* Show the deny all button */,
          AcceptAllCta:
            true /* Show the accept all button when highPrivacy on */,
          highPrivacy: true /* HIGHLY RECOMMANDED Disable auto consent */,

          handleBrowserDNTRequest:
            false /* If Do Not Track == 1, disallow all */,

          removeCredit: false /* Remove credit link */,
          moreInfoLink: true /* Show more info link */,
          useExternalCss:
            false /* If false, the tarteaucitron.css file will be loaded */,
          useExternalJs:
            false /* If false, the tarteaucitron.services.js file will be loaded */,

          //"cookieDomain": ".my-multisite-domaine.fr", /* Shared cookie for subdomain website */

          readmoreLink:
            "" /* Change the default readmore link pointing to tarteaucitron.io */,

          mandatory: true /* Show a message about mandatory cookies */,
          mandatoryCta:
            true /* Show the disabled accept button when mandatory on */,
        });

        tarteaucitron.user.analyticsUa = "UA-82485566-1";
        tarteaucitron.user.analyticsMore = function () {
          /* optionnal ga.push() */
        };
        tarteaucitron.user.analyticsUaCreate = {
          /* optionnal create configuration */
        };
        tarteaucitron.user.analyticsAnonymizeIp = true;
        tarteaucitron.user.analyticsPageView = {
          /* optionnal pageview configuration */
        };
        tarteaucitron.user.analyticsMore = function () {
          /* optionnal ga.push() */
        };
        (tarteaucitron.job = tarteaucitron.job || []).push("analytics");
      }}
    />

    <Component {...pageProps} />
  </>
);

export default MyApp;
