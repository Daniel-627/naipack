import type { Metadata } from "next";
import { Illustration } from "@/components/Illustration";
import { Photo } from "@/components/Photo";
import { ProductChips } from "@/components/ProductChips";
import { getFaqs, getProducts, getSettings } from "@/lib/content";
import { waLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Branded packaging bags, business cards, brochures, delivery notes and thank-you cards printed in Nairobi. See what you can choose and request a quote on WhatsApp.",
};

export default async function ProductsPage() {
  const [settings, products, faqs] = await Promise.all([getSettings(), getProducts(), getFaqs()]);

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>Everything we print for your brand.</h1>
          <p>
            {products.length} products, each made to your size, paper and design. Pick one to see what you can choose.
          </p>
        </div>
      </section>

      <ProductChips items={products.map((p) => ({ slug: p.slug, label: p.title }))} />

      {products.map((product, i) => (
        <section
          key={product.slug}
          id={product.slug}
          className={`pd${i % 2 === 0 ? " tint" : ""}${i % 2 === 1 ? " rev" : ""}`}
        >
          <div className="wrap pd-grid">
            <div className={`pd-visual${product.photo ? " has-photo" : ""}`}>
              {product.photo ? (
                <Photo image={product.photo} alt={product.title} sizes="(max-width: 860px) 100vw, 480px" />
              ) : (
                <Illustration slug={product.slug} title={product.title} />
              )}
            </div>
            <div>
              <h2>{product.title}</h2>
              <p className="pd-lead">{product.description}</p>
              <div className="pd-lists">
                {product.options.length > 0 && (
                  <div>
                    <h3>You choose</h3>
                    <ul className="plain">
                      {product.options.map((option) => (
                        <li key={option.label}>
                          <strong>{option.label}:</strong> {option.choices.join(", ")}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {product.worksFor.length > 0 && (
                  <div>
                    <h3>Works well for</h3>
                    <ul className="plain">
                      {product.worksFor.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <a
                className="btn btn-forest"
                href={waLink(settings.whatsappNumber, `Hi Naipack, I'd like a quote for ${product.title.toLowerCase()}.`)}
                target="_blank"
                rel="noopener"
              >
                Request a quote on WhatsApp
              </a>
            </div>
          </div>
        </section>
      ))}

      {faqs.length > 0 && (
        <section className="band">
          <div className="wrap faq-grid">
            <h2>Before you message us</h2>
            <div>
              {faqs.map((faq) => (
                <details key={faq._id}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="closing">
        <div className="wrap">
          <div>
            <h2>Not sure what your business needs?</h2>
            <p>Tell us what you sell and who buys it. We will suggest what to print first.</p>
          </div>
          <a
            className="btn btn-kraft"
            href={waLink(settings.whatsappNumber, "Hi Naipack, I'm not sure what to print for my business. Can you advise?")}
            target="_blank"
            rel="noopener"
          >
            Message us on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
