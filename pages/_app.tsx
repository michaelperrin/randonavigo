import type { AppProps } from 'next/app'
import Script from 'next/script'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
// import '../styles/global.scss'
import 'tailwindcss/tailwind.css'
import 'leaflet/dist/leaflet.css';

config.autoAddCss = false

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
    <Component {...pageProps} />
  </>
)

export default MyApp
