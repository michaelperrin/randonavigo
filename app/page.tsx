import Layout from "@/components/layout";
import Header from "@/components/layout/Header";
import TopBanner from "@/components/TopBanner";
import Intro from "@/components/home/Intro";
import List from "@/components/hike/List";
import { Metadata } from "next";
import { getSortedHikesData } from "@/lib/hike";

export const metadata: Metadata = {
  title: "RandoNavigo – Randonnées autour de Paris sans voiture",
  description:
    "Randonnées en pleine nature en Ile-de-France accessibles en transport en commun.",
};

export default function Home() {
  const hikes = getSortedHikesData();

  return (
    <Layout home>
      <div className="page-home">
        <Header />
        <TopBanner />
        <Intro />

        <section className="bg-zinc-50 py-12">
          <div className="container">
            <List hikes={hikes} />
          </div>
        </section>
      </div>
    </Layout>
  );
}
