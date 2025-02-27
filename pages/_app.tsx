import type { AppProps } from "next/app";
import Script from "next/script";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "tailwindcss/tailwind.css";
import "leaflet/dist/leaflet.css";
import "leaflet.locatecontrol/dist/L.Control.Locate.css";
import Image from "next/image";
import imageLoader from "../lib/imageLoader";

config.autoAddCss = false;

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    {/* Global Site Tag (gtag.js) - Google Analytics */}
    <Script
      id="google-tag-manager"
      strategy="lazyOnload"
      src={`https://www.googletagmanager.com/gtag/js?id=G-GBHKX90080`}
    />

    <Script strategy="lazyOnload" id="google-analytics">
      {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-GBHKX90080');
      `}
    </Script>

    {process.env.NEXT_PUBLIC_COOKIE_CONSENT_ENABLED === "1" && (
      <Script
        id="cookieyes"
        src="https://cdn-cookieyes.com/client_data/dda1fbe485adcbb48774379e/script.js"
      />
    )}
    <Component {...pageProps} />
  </>
);

export default MyApp;
// Set default loader globally
// Image.defaultProps = {
//   loader: imageLoader,
// };
