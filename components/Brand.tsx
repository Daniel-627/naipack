import Image from "next/image";
import Link from "next/link";
import { photoUrl } from "@/sanity/image";
import type { Settings } from "@/types";

/** Logo from the Studio when one is uploaded, otherwise the text lockup. */
export function Brand({ settings }: { settings: Settings }) {
  const logo = photoUrl(settings.logo, 480);
  return (
    <Link className="brand" href="/" aria-label={`${settings.businessName} home`}>
      {logo ? (
        <Image className="brand-img" src={logo} alt={settings.businessName} width={240} height={64} />
      ) : (
        <>
          <span className="brand-name">{settings.businessName.toUpperCase()}</span>
          <span className="brand-tag">PACK IT</span>
        </>
      )}
    </Link>
  );
}
