import Head from 'next/head';
import Header from './layout/header';
import Script from 'next/script'
// import styles from './layout.module.css'  // TODO

type LayoutProps = {
  children: JSX.Element | JSX.Element[],
  home?: boolean,
}

const Layout = ({ children, home }: LayoutProps) => (
  <>
    <Head>
      <title>RandoNavigo</title>
      <meta name="description" content="Randonnées en Ile-de-France accessibles en transport en commun" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="theme-color" content="#ffffff" />
    </Head>

    {home !== true && (
      <Header />
    )}

    <main className="main">
      {children}
    </main>

    <footer className="main-footer">
      <div className="container">
        ©
        {' '}
        <a href="http://www.michaelperrin.fr" target="_blank" rel="noreferrer">
          Michaël Perrin
        </a>
      </div>
    </footer>

    <Script id="mcjs" strategy="lazyOnload">
      {`!function(c,h,i,m,p){m = c.createElement(h), p = c.getElementsByTagName(h)[0], m.async = 1, m.src = i, p.parentNode.insertBefore(m, p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/638b84bb33b30902b1122a2c7/04edd094392a25a03e7825794.js");`}
    </Script>
  </>
);

export default Layout;
