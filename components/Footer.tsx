import Link from "next/link";
import { NAV_LINKS, tiktokHandle } from "@/lib/site";
import { formatPhone, waLink } from "@/lib/whatsapp";
import type { Settings } from "@/types";
import { Brand } from "./Brand";

export function Footer({ settings }: { settings: Settings }) {
  const phone = formatPhone(settings.whatsappNumber);
  return (
    <>
      <footer className="site-footer">
        <div className="wrap footer-grid">
          <div>
            <Brand settings={settings} />
            <p className="footer-blurb">
              Branded packaging bags, business cards, brochures, delivery notes and thank-you cards in Nairobi.
            </p>
          </div>
          <nav aria-label="Footer">
            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="footer-contact">
            <li>
              <a href={waLink(settings.whatsappNumber, "Hi Naipack, I have a question.")} target="_blank" rel="noopener">
                WhatsApp{phone ? `: ${phone}` : ""}
              </a>
            </li>
            <li>{settings.address}</li>
            {settings.tiktokUrl && (
              <li>
                <a href={settings.tiktokUrl} target="_blank" rel="noopener">
                  TikTok {tiktokHandle(settings.tiktokUrl)}
                </a>
              </li>
            )}
          </ul>
        </div>
      </footer>
      <div className="sticky-cta">
        <a className="btn btn-kraft" href={waLink(settings.whatsappNumber, "Hi Naipack, I'd like a quote.")} target="_blank" rel="noopener">
          Get a quote on WhatsApp
        </a>
      </div>
    </>
  );
}
