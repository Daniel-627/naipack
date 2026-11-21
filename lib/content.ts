import defaults from "@/content/defaults.json";
import { sanityFetch } from "@/sanity/client";
import type { Faq, GalleryItem, Product, SanityImage, Settings } from "@/types";

/**
 * Content comes from Sanity when a project is connected and has documents.
 * Anything missing falls back to content/defaults.json, so the site always renders.
 */

const SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  businessName, whatsappNumber, address, mapQuery, openingHours, tiktokUrl, heroHeadline, heroLead, logo
}`;

const PRODUCTS_QUERY = `*[_type == "product" && defined(slug.current)] | order(order asc, title asc){
  _id, title, "slug": slug.current, tagline, description,
  options[]{ label, choices },
  worksFor,
  photo
}`;

const FAQS_QUERY = `*[_type == "faq"] | order(order asc){ _id, question, answer }`;

const GALLERY_QUERY = `*[_type == "galleryItem" && defined(image.asset)] | order(order asc){ _id, title, image }`;

type Nullable<T> = { [K in keyof T]?: T[K] | null };

export async function getSettings(): Promise<Settings> {
  const base = defaults.settings as Settings;
  const cms = await sanityFetch<Nullable<Settings>>(SETTINGS_QUERY);
  if (!cms) return base;
  const merged: Settings = { ...base };
  for (const key of Object.keys(base) as (keyof Omit<Settings, "logo">)[]) {
    const value = cms[key];
    if (typeof value === "string" && value.trim() !== "") merged[key] = value.trim();
  }
  if (cms.logo?.asset?._ref) merged.logo = cms.logo as SanityImage;
  return merged;
}

type RawProduct = {
  _id: string;
  title: string;
  slug: string;
  tagline?: string | null;
  description?: string | null;
  options?: { label?: string | null; choices?: string[] | null }[] | null;
  worksFor?: string[] | null;
  photo?: SanityImage | null;
};

export async function getProducts(): Promise<Product[]> {
  const cms = await sanityFetch<RawProduct[]>(PRODUCTS_QUERY);
  if (cms && cms.length > 0) {
    return cms.map((p) => ({
      _id: p._id,
      title: p.title,
      slug: p.slug,
      tagline: p.tagline ?? "",
      description: p.description ?? "",
      options: (p.options ?? [])
        .filter((o) => o.label && o.choices && o.choices.length > 0)
        .map((o) => ({ label: o.label as string, choices: o.choices as string[] })),
      worksFor: p.worksFor ?? [],
      photo: p.photo?.asset?._ref ? p.photo : undefined,
    }));
  }
  return defaults.products.map((p) => ({
    _id: `default-${p.slug}`,
    title: p.title,
    slug: p.slug,
    tagline: p.tagline,
    description: p.description,
    options: p.options,
    worksFor: p.worksFor,
  }));
}

export async function getFaqs(): Promise<Faq[]> {
  const cms = await sanityFetch<Faq[]>(FAQS_QUERY);
  if (cms && cms.length > 0) return cms;
  return defaults.faqs.map((f, i) => ({ _id: `default-faq-${i}`, question: f.question, answer: f.answer }));
}

/** Empty until photos are added in the Studio. The homepage shows placeholder tiles meanwhile. */
export async function getGallery(): Promise<GalleryItem[]> {
  const cms = await sanityFetch<GalleryItem[]>(GALLERY_QUERY);
  return cms ?? [];
}
