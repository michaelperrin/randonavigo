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
      <title>Rando Navigo</title>
      <meta name="description" content="Rando Navigo" />
      <link rel="icon" href="/favicon.ico" />
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
