import Head from "next/head";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { Hike as HikeType } from "@/lib/types";
import HikeHeader from "@/components/hike/Header/index";
import { getHikeData } from "@/lib/hike";
import { getAllHikePaths } from "@/lib/hike";
import Layout from "@/components/layout";
import getHikePicturePath from "@/lib/getHikePicturePath";
import HikeProperties from "@/components/hike/Properties";
import RelatedHikes from "@/components/hike/RelatedHikes";
import Gallery from "@/components/hike/Gallery";
import InfoBox from "@/components/hike/InfoBox";
import Picture from "@/components/hike/Picture";
import HikeGallery from "@/components/hike/HikeGallery";

type HikeProps = {
  hike: HikeType;
  mdxSource: MDXRemoteSerializeResult;
};

type Params = {
  params: {
    slug: string;
  };
};

const Hike = ({ hike, mdxSource }: HikeProps) => (
  <Layout>
    <Head>
      {/* TODO: set meta on Astro */}
      <title>{`${hike.title} – RandoNavigo`}</title>
      <meta name="description" content={hike.summary} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={hike.title} />
      <meta property="og:description" content={hike.summary} />
      <meta property="og:site_name" content="RandoNavigo" />
      <meta property="og:locale" content="fr_FR" />
      <meta
        property="og:image"
        content={`${process.env.BASE_URL}${encodeURI(
          getHikePicturePath(hike, hike.main_picture)
        )}`}
      />
      <meta property="article:section" content={hike.categories[0]} />
      <meta property="article:published_time" content={hike.publication_date} />
      <meta property="article:modified_time" content={hike.publication_date} />
      <meta property="og:updated_time" content={hike.publication_date} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@randonavigo" />
      <meta name="twitter:title" content={hike.title} />
      <meta name="twitter:description" content={hike.summary} />
      <meta
        name="twitter:image"
        content={`${process.env.BASE_URL}${encodeURI(
          getHikePicturePath(hike, hike.main_picture)
        )}`}
      />
    </Head>

    <article>
      <HikeHeader hike={hike} />

      <div className="container">
        <div className="grid md:grid-cols-10 gap-0 md:gap-6 lg:gap-12 xl:gap-16 mb-12">
          <main className="order-2 md:order-1 md:col-span-6 font-serif mt-0 md:mt-12">
            <div className="text-lg font-semibold italic mb-8">
              {hike.summary}
            </div>

            {/* <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: hike.content }}
            /> */}
            <div className="prose max-w-none">
              <MDXRemote
                {...mdxSource}
                components={{ Gallery, Picture, InfoBox }}
              />
            </div>
          </main>

          <aside className="order-1 md:order-2 md:col-span-4 md:pt-0 z-30 font-serif mt-8 md:-mt-24 mb-5 md:mb-0 md:p-2">
            <HikeProperties hike={hike} />
          </aside>
        </div>

        <section>
          <HikeGallery hike={hike} />
        </section>

        <section>
          <RelatedHikes hike={hike} />
        </section>
      </div>
    </article>
  </Layout>
);

export const getStaticProps = async ({ params }: Params) => {
  const { mdxSource, ...hike } = await getHikeData(params.slug);

  return {
    props: {
      hike,
      mdxSource,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = await getAllHikePaths();

  return {
    paths,
    fallback: false,
  };
};

export default Hike;
