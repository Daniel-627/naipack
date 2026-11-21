import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { getSettings } from "@/lib/content";
import { tiktokHandle } from "@/lib/site";
import { formatPhone, waLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Naipack on WhatsApp, visit the shop at New Kireita House in Nairobi, or follow our latest jobs on TikTok.",
};

const QUICK_MESSAGES = [
  ["Ask about prices", "Hi Naipack, can you tell me how pricing works?"],
  ["Ask about a custom job", "Hi Naipack, I have a custom packaging idea. Can we talk?"],
  ["Check on my order", "Hi Naipack, I'd like to check on my order."],
  ["Ask about opening hours", "Hi Naipack, what are your opening hours?"],
] as const;

export default async function ContactPage() {
  const settings = await getSettings();
  const phone = formatPhone(settings.whatsappNumber);
  const mapQuery = encodeURIComponent(settings.mapQuery || settings.address);

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>Contact us</h1>
          <p>WhatsApp is the fastest way to reach us. You can also visit the shop.</p>
        </div>
      </section>

      <div className="wrap layout-contact">
        <div>
          <h2>Ways to reach us</h2>
          <p className="sub">Send your logo, ask a question or check on an order.</p>
          <ul className="methods">
            <li className="method">
              <div>
                <h3>WhatsApp</h3>
                <p className="detail">{phone || "Message us any time"}</p>
              </div>
              <a
                className="btn btn-kraft"
                href={waLink(settings.whatsappNumber, "Hi Naipack, I have a question.")}
                target="_blank"
                rel="noopener"
              >
                Open WhatsApp
              </a>
            </li>
            <li className="method">
              <div>
                <h3>Visit the shop</h3>
                <p>{settings.address}</p>
              </div>
              <a className="text-link" href="#map">
                See the map
              </a>
            </li>
            {settings.tiktokUrl && (
              <li className="method">
                <div>
                  <h3>TikTok</h3>
                  <p>Recent jobs and behind-the-scenes at the shop.</p>
                </div>
                <a className="text-link" href={settings.tiktokUrl} target="_blank" rel="noopener">
                  {tiktokHandle(settings.tiktokUrl)}
                </a>
              </li>
            )}
          </ul>

          <h2>Not sure what to say?</h2>
          <p className="sub">Tap one and WhatsApp opens with the message ready.</p>
          <div className="quick">
            {QUICK_MESSAGES.map(([label, text]) => (
              <a key={label} href={waLink(settings.whatsappNumber, text)} target="_blank" rel="noopener">
                {label}
              </a>
            ))}
          </div>

          <h2>Send a message</h2>
          <p className="sub">Write it here and we open WhatsApp for you.</p>
          <ContactForm whatsappNumber={settings.whatsappNumber} />
          <p className="form-note">
            Looking for a price? The <Link href="/quote">quote page</Link> collects the details we need.
          </p>
        </div>

        <div id="map" className="map-card">
          <iframe
            title={`Map showing ${settings.address}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://maps.google.com/maps?q=${mapQuery}&output=embed`}
          />
          <div className="map-info">
            <h3>{settings.businessName} shop</h3>
            <p>{settings.address}</p>
            {settings.openingHours && (
              <dl>
                <div>
                  <dt>Opening hours</dt>
                  <dd>{settings.openingHours}</dd>
                </div>
              </dl>
            )}
            <a
              className="btn btn-kraft"
              href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
              target="_blank"
              rel="noopener"
            >
              Get directions
            </a>
          </div>
        </div>
      </div>

      <section className="closing light">
        <div className="wrap">
          <div>
            <h2>Ready to order?</h2>
            <p>Tell us the item, quantity and options, and we reply with a price.</p>
          </div>
          <Link className="btn btn-forest" href="/quote">
            Request a quote
          </Link>
        </div>
      </section>
    </>
  );
}
