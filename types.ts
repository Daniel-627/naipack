export type SanityImage = {
  _type?: string;
  asset?: { _ref?: string; _type?: string };
  hotspot?: { x: number; y: number; width: number; height: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  alt?: string;
};

export type Settings = {
  businessName: string;
  whatsappNumber: string;
  address: string;
  mapQuery: string;
  openingHours: string;
  tiktokUrl: string;
  heroHeadline: string;
  heroLead: string;
  logo?: SanityImage;
};

export type ProductOption = {
  label: string;
  choices: string[];
};

export type Product = {
  _id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  options: ProductOption[];
  worksFor: string[];
  photo?: SanityImage;
};

export type Faq = {
  _id: string;
  question: string;
  answer: string;
};

export type GalleryItem = {
  _id: string;
  title: string;
  image: SanityImage;
};
