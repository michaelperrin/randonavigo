/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Header from "./layout/header";
import Link from "next/link";

type LayoutProps = {
  children: JSX.Element | JSX.Element[];
  home?: boolean;
};

const Layout = ({ children, home }: LayoutProps) => (
  <>
    <Head>
      <title>RandoNavigo</title>
      <meta
        name="description"
        content="Randonnées en Ile-de-France accessibles en transport en commun"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="theme-color" content="#ffffff" />

      <script
        id="mcjs"
        dangerouslySetInnerHTML={{
          __html: `!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/638b84bb33b30902b1122a2c7/04edd094392a25a03e7825794.js");`,
        }}
      />
    </Head>

    {home !== true && <Header />}

    <main className="main">{children}</main>

    <footer className="bg-zinc-700 text-white mt-24 py-16">
      <div className="flex flex-col items-center gap-5">
        <a href="https://ko-fi.com/W7W46TRZ2" target="_blank" rel="noreferrer">
          <div
            dangerouslySetInnerHTML={{
              __html: `<img height='36' style='border:0px;height:36px;' src='https://cdn.ko-fi.com/cdn/kofi2.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' />`,
            }}
          />
        </a>

        <div>
          Développement, design et contenu :{" "}
          <a
            href="http://www.michaelperrin.fr"
            target="_blank"
            rel="noreferrer"
          >
            Michaël Perrin
          </a>
        </div>

        <div className="text-sm">
          <Link href="/mentions-legales">
            <a>Mentions légales</a>
          </Link>
        </div>

        <div>
          <a
            href="https://vercel.com/?utm_source=rando-navigo&amp;utm_campaign=oss"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/images/powered-by-vercel.svg" alt="Powered by Vercel" />
          </a>
        </div>
      </div>
    </footer>
  </>
);

export default Layout;
