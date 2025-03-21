import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "tailwindcss/tailwind.css";
import "leaflet/dist/leaflet.css";
import "leaflet.locatecontrol/dist/L.Control.Locate.css";
// TODO: add scripts from old _app.tsx

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | RandoNavigo",
    default: "RandoNavigo – Randonnées autour de Paris sans voiture",
  },
  description:
    "Randonnées en pleine nature en Ile-de-France accessibles en transport en commun.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
