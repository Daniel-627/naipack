// Turns content/defaults.json into seed/seed.ndjson, which `sanity dataset import` understands.
// Run through `npm run seed` after your Sanity project ID is in .env.local.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const defaults = JSON.parse(readFileSync(new URL("../content/defaults.json", import.meta.url), "utf8"));

const docs = [
  {
    _id: "siteSettings",
    _type: "siteSettings",
    // Empty values are left out so the Studio's field validation doesn't flag them.
    ...Object.fromEntries(Object.entries(defaults.settings).filter(([, value]) => value !== "")),
  },
  ...defaults.products.map((p) => ({
    _id: `product-${p.slug}`,
    _type: "product",
    title: p.title,
    slug: { _type: "slug", current: p.slug },
    order: p.order,
    tagline: p.tagline,
    description: p.description,
    options: p.options.map((o, i) => ({
      _key: `${p.slug}-opt-${i}`,
      _type: "option",
      label: o.label,
      choices: o.choices,
    })),
    worksFor: p.worksFor,
  })),
  ...defaults.faqs.map((f, i) => ({
    _id: `faq-${i + 1}`,
    _type: "faq",
    question: f.question,
    answer: f.answer,
    order: f.order,
  })),
];

mkdirSync(new URL("../seed/", import.meta.url), { recursive: true });
writeFileSync(new URL("../seed/seed.ndjson", import.meta.url), docs.map((d) => JSON.stringify(d)).join("\n") + "\n");
console.log(`Wrote seed/seed.ndjson with ${docs.length} documents.`);
