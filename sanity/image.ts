import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImage } from "@/types";
import { dataset, hasSanity, projectId } from "./env";

const builder = hasSanity ? createImageUrlBuilder({ projectId, dataset }) : null;

/** A ready-to-render image URL for a photo uploaded in the Studio, or undefined when there is none. */
export function photoUrl(image: SanityImage | undefined | null, width: number): string | undefined {
  if (!builder || !image?.asset?._ref) return undefined;
  return builder
    .image({ asset: { _ref: image.asset._ref }, hotspot: image.hotspot, crop: image.crop })
    .width(width)
    .auto("format")
    .url();
}
