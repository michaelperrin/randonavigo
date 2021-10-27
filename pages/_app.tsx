import type { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import '../styles/global.scss'

config.autoAddCss = false

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>RandoNavigo</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
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
