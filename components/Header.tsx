import { SHOW_PREVIEW_BANNER } from "@/lib/site";
import { waLink } from "@/lib/whatsapp";
import type { Settings } from "@/types";
import { Brand } from "./Brand";
import { Nav } from "./Nav";

export function Header({ settings }: { settings: Settings }) {
  return (
    <>
      {SHOW_PREVIEW_BANNER && (
        <div className="preview">
          Design preview of a possible Naipack website. Sample copy and placeholders, not the live site.
        </div>
      )}
      <header className="site-header">
        <div className="wrap header-row">
          <Brand settings={settings} />
          <Nav whatsappHref={waLink(settings.whatsappNumber, "Hi Naipack, I'd like a quote.")} />
        </div>
      </header>
    </>
  );
}
