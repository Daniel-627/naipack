import type { Metadata } from "next";
import { QuoteForm } from "@/components/QuoteForm";
import { getProducts, getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Request a quote",
  description:
    "Request a quote for branded packaging bags, business cards, brochures, delivery notes or thank-you cards. Fill in the form and send it to Naipack on WhatsApp.",
};

export default async function QuotePage({ searchParams }: { searchParams: Promise<{ item?: string }> }) {
  const [{ item }, settings, products] = await Promise.all([searchParams, getSettings(), getProducts()]);

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>Request a quote</h1>
          <p>Tell us what you need. We send your request to WhatsApp and reply with a price.</p>
        </div>
      </section>
      <QuoteForm
        products={products.map((p) => ({ slug: p.slug, title: p.title, tagline: p.tagline, options: p.options }))}
        whatsappNumber={settings.whatsappNumber}
        initialSlug={item}
      />
    </>
  );
}
