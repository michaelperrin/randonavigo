import Head from 'next/head';
import Header from './layout/header';
// import styles from './layout.module.css'  // TODO

type LayoutProps = {
  children: JSX.Element | JSX.Element[],
}

const Layout = ({ children }: LayoutProps) => (
  <>
    <Head>
      <title>Rando Navigo</title>
      <meta name="description" content="Rando Navigo" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Header />

    <div className="container">
      <main className="main">
        {children}
      </main>
      <footer className="footer">
        Rando Navigo
      </footer>
    </div>
  </>
);

export default Layout;
