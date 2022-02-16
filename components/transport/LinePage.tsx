import Head from 'next/head'
import List from '@/components/hike/List'
import { Hike } from '@/lib/types'
import Layout from '@/components/layout'
import TransportIcon from '@/components/TransportIcon'
import TopBanner from '@/components/TopBanner'
import LineLinks from './LineLinks'

type HikePerLineProps = {
  hikes: Hike[],
  banner?: string,
  line: string,
  meta?: string,
  title: string,
  borderColor: string,
  bgColor: string,
  children: JSX.Element | JSX.Element[],
}

const LinePage = ({
  hikes,
  banner='/images/transport/banner/ligne-j.jpeg',
  title,
  meta,
  line,
  children,
  borderColor,
  bgColor
}: HikePerLineProps) => (
  <Layout>
    <Head>
      <title>{title} – RandoNavigo</title>
      {meta && (
        <meta name="description" content={meta} />
      )}
    </Head>
    <article>
      <TopBanner picture={banner} />

      <div className="container">
        <div className="grid md:grid-cols-10 gap-0 md:gap-6 lg:gap-12 xl:gap-24 mb-12">
          <main className="order-2 md:order-1 md:col-span-6 mt-0 md:mt-12">
            <div className="flex items-center mt-12 mb-6">
              <div>
                <div className="float-right ml-2 mb-2">
                  <TransportIcon line={line} size={40} linkToPage={false} />
                </div>
                <h1 className="text-2xl font-black">{title}</h1>

                <div className={`mb-6 text-2xl font-black mt-4 w-24 h-1 ${bgColor}`} />

                <div className="prose">
                  {children}
                </div>
              </div>
              <div className="ml-auto">

              </div>
            </div>
          </main>

          <aside className="order-1 md:order-2 md:col-span-4 md:pt-0 z-30 font-serif mt-8 md:-mt-24 mb-5 md:mb-0 md:p-2">
            <LineLinks />
          </aside>
        </div>
      </div>

      <div className="relative bg-zinc-50">
        <section className={`py-12 border-b-8 ${borderColor}`}>
          <div className="container z-20">
            <List hikes={hikes} />
          </div>
        </section>
      </div>
    </article>
  </Layout>
)

export default LinePage
