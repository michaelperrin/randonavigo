import type { AppProps } from "next/app";
import Script from "next/script";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "tailwindcss/tailwind.css";
import "leaflet/dist/leaflet.css";
import "leaflet.locatecontrol/dist/L.Control.Locate.css";

config.autoAddCss = false;

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    {/* Global Site Tag (gtag.js) - Google Analytics */}
    <Script
      strategy="lazyOnload"
      src={`https://www.googletagmanager.com/gtag/js?id=UA-82485566-1`}
    />

    <Script strategy="lazyOnload">
      {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'UA-82485566-1', {
        page_path: window.location.pathname,
      });
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
