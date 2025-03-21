import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote";
import { Hike as HikeType } from "@/lib/types";
import HikeHeader from "@/components/hike/Header";
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

// Generate metadata for the page
export async function generateMetadata({ params }): Promise<Metadata> {
  const { mdxSource, ...hike } = await getHikeData(params.slug);
  const ogImage = `${process.env.BASE_URL}${encodeURI(
    getHikePicturePath(hike, hike.main_picture)
  )}`;

  return {
    title: `${hike.title} – RandoNavigo`,
    description: hike.summary,
    openGraph: {
      title: hike.title,
      description: hike.summary,
      type: "article",
      publishedTime: hike.publication_date,
      modifiedTime: hike.publication_date,
      locale: "fr_FR",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      site: "@randonavigo",
      title: hike.title,
      description: hike.summary,
      images: [ogImage],
    },
  };
}

// Generate static params (replaces getStaticPaths)
export async function generateStaticParams() {
  const paths = await getAllHikePaths();
  return paths;
}

// Main page component
export default async function HikePage({ params }) {
  const { mdxSource, ...hike } = await getHikeData(params.slug);

  return (
    <Layout>
      <article data-gpx-file="{{ path('hike_download_gpx_file', {slug: hike.slug}) }}">
        <HikeHeader hike={hike} />

        <div className="container">
          <div className="grid md:grid-cols-10 gap-0 md:gap-6 lg:gap-12 xl:gap-16 mb-12">
            <main className="order-2 md:order-1 md:col-span-6 font-serif mt-0 md:mt-12">
              <div className="text-lg font-semibold italic mb-8">
                {hike.summary}
              </div>

              <div className="prose max-w-none">
                {/* <MDXRemote
                  {...mdxSource}
                  components={{ Gallery, Picture, InfoBox }}
                /> */}
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
}
