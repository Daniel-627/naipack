import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getSettings } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import "@/styles/globals.css";

const DESCRIPTION =
  "Branded packaging bags, business cards, brochures, delivery notes and thank-you cards, printed in Nairobi. Get a quote on WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Naipack | Branded packaging bags and print in Nairobi",
    template: "%s | Naipack",
  },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "Naipack",
    title: "Naipack | Branded packaging bags and print in Nairobi",
    description: DESCRIPTION,
    locale: "en_KE",
  },
};

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const settings = await getSettings();
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header settings={settings} />
      <main id="main">{children}</main>
      <Footer settings={settings} />
    </>
  );
}
