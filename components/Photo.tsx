import Image from "next/image";
import { photoUrl } from "@/sanity/image";
import type { SanityImage } from "@/types";

/** A photo uploaded in the Studio, cropped to fill its parent (which must be position: relative). */
export function Photo({
  image,
  alt,
  sizes,
  priority,
  className,
}: {
  image: SanityImage;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const src = photoUrl(image, 1400);
  if (!src) return null;
  return <Image src={src} alt={image.alt || alt} fill sizes={sizes} priority={priority} className={className} />;
}
