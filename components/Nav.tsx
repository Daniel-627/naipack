"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/site";

export function Nav({ whatsappHref }: { whatsappHref: string }) {
  const pathname = usePathname();
  // The menu closes by itself when the page changes, because it is only "open" for the page it was opened on.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenOn(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isCurrent = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <nav className="nav" aria-label="Main">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="nav-link"
            aria-current={isCurrent(link.href) ? "page" : undefined}
          >
            {link.label}
          </Link>
        ))}
        <a className="btn btn-kraft nav-cta" href={whatsappHref} target="_blank" rel="noopener">
          Get a quote on WhatsApp
        </a>
      </nav>

      <button
        type="button"
        className="menu-btn"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpenOn(open ? null : pathname)}
      >
        <span className="visually-hidden">{open ? "Close menu" : "Open menu"}</span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      <div id="mobile-menu" className="mobile-menu" hidden={!open}>
        <nav aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isCurrent(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
