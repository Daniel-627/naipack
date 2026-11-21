"use client";

import { useEffect, useState } from "react";

/** Sticky row of buttons that jump to a product and highlight the one in view. */
export function ProductChips({ items }: { items: { slug: string; label: string }[] }) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const item of items) {
      const el = document.getElementById(item.slug);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="chips" aria-label="Product categories">
      <div className="wrap">
        <ul>
          {items.map((item) => (
            <li key={item.slug}>
              <a href={`#${item.slug}`} className={active === item.slug ? "is-active" : undefined}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
