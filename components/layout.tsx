import Head from 'next/head';
import styles from './layout.module.css'

type LayoutProps = {
  children: JSX.Element | JSX.Element[],
}

const Layout = ({ children }: LayoutProps) => (
  <div className={styles.container}>
    <Head>
      <title>Rando Navigo</title>
      <meta name="description" content="Rando Navigo" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>
      {children}
    </main>

    <footer className={styles.footer}>
      Rando Navigo
    </footer>
  </div>
);

export default Layout;
