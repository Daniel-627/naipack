import Link from "next/link";
import { HeroSlider, type SlideData } from "@/components/HeroSlider";
import { Illustration } from "@/components/Illustration";
import { Photo } from "@/components/Photo";
import { getGallery, getProducts, getSettings } from "@/lib/content";
import { SHOW_PREVIEW_BANNER, tiktokHandle } from "@/lib/site";
import { waLink } from "@/lib/whatsapp";
import { photoUrl } from "@/sanity/image";

const STEPS = [
  { title: "Tell us what you need", text: "Send the item, the quantity and your logo or idea." },
  { title: "Get your quote", text: "We confirm the size, paper and finish, then send you a price." },
  { title: "Approve the design", text: "You check the artwork before anything is printed." },
  { title: "Collect your order", text: "Pick it up from our shop, or ask us about delivery." },
];

export default async function HomePage() {
  const [settings, products, gallery] = await Promise.all([getSettings(), getProducts(), getGallery()]);
  const quoteLink = waLink(settings.whatsappNumber, "Hi Naipack, I'd like a quote.");

  const slides: SlideData[] = products.map((product) => {
    const src = photoUrl(product.photo, 1200);
    return {
      key: product.slug,
      title: product.title,
      tagline: product.tagline,
      href: `/products#${product.slug}`,
      art: <Illustration slug={product.slug} title={product.title} />,
      image: src ? { src, alt: product.photo?.alt || product.title } : undefined,
    };
  });

  // Up to 5 or 9 photos fill the grid without gaps; fewer than 5 are shown at equal size.
  const shown = gallery.length >= 9 ? 9 : gallery.length >= 5 ? 5 : gallery.length;
  const galleryItems = gallery.slice(0, shown);
  const placeholders = SHOW_PREVIEW_BANNER && galleryItems.length === 0;

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <h1>{settings.heroHeadline}</h1>
            <p className="lead">{settings.heroLead}</p>
            <div className="hero-actions">
              <a className="btn btn-kraft" href={quoteLink} target="_blank" rel="noopener">
                Get a quote on WhatsApp
              </a>
              <Link className="btn btn-ghost" href="/products">
                See what we print
              </Link>
            </div>
          </div>
          <HeroSlider slides={slides} />
        </div>
      </section>

      <section className="band" id="products">
        <div className="wrap">
          <div className="section-head">
            <h2>Print for every order that leaves your shop.</h2>
            <p>From the bag in your customer&apos;s hand to the card inside it.</p>
          </div>
          <ul className="product-list">
            {products.map((product) => (
              <li className="product" key={product.slug}>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <p className="opts">{product.options.map((o) => o.label).join(", ")}</p>
                <Link className="link-btn" href={`/quote?item=${product.slug}`}>
                  Request a quote
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band band-mist" id="how">
        <div className="wrap">
          <div className="section-head">
            <h2>From message to finished print in four steps.</h2>
            <p>No account to open. Start with a WhatsApp message or the quote form.</p>
          </div>
          <ol className="steps">
            {STEPS.map((step, i) => (
              <li key={step.title}>
                <span className="step-n">{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {(galleryItems.length > 0 || placeholders) && (
        <section className="band band-deep" id="work">
          <div className="wrap">
            <div className="work-head">
              <div>
                <h2>Recent work</h2>
                <p>New jobs go up on TikTok first.</p>
              </div>
              {settings.tiktokUrl && (
                <a className="btn btn-ghost" href={settings.tiktokUrl} target="_blank" rel="noopener">
                  Watch on TikTok {tiktokHandle(settings.tiktokUrl)}
                </a>
              )}
            </div>
            <div className={`gallery${galleryItems.length > 0 && galleryItems.length < 5 ? " is-even" : ""}`}>
              {galleryItems.length > 0
                ? galleryItems.map((item, i) => (
                    <figure className="gal-tile has-photo" key={item._id} style={{ margin: 0 }}>
                      <Photo
                        image={item.image}
                        alt={item.title}
                        sizes={i === 0 && shown >= 5 ? "(max-width: 700px) 100vw, 560px" : "(max-width: 700px) 50vw, 280px"}
                      />
                      <figcaption className="cap">{item.title}</figcaption>
                    </figure>
                  ))
                : [...products.map((p) => p.title), "Custom packaging"].slice(0, 5).map((label) => (
                    <div className="gal-tile" key={label}>
                      <span className="cap">{label}</span>
                      <small>Job photo</small>
                    </div>
                  ))}
            </div>
          </div>
        </section>
      )}

      <section className="closing">
        <div className="wrap">
          <div>
            <h2>Ready to print your brand?</h2>
            <p>Tell us what you need and we reply with a price.</p>
          </div>
          <div className="closing-actions">
            <a className="btn btn-kraft" href={quoteLink} target="_blank" rel="noopener">
              Get a quote on WhatsApp
            </a>
            <Link className="btn btn-ghost" href="/quote">
              Use the quote form
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
