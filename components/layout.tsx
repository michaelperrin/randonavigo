import Head from 'next/head';
import Header from './layout/header';
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
  </>
);

export default Layout;
