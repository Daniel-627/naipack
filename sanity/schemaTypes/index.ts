import type { SchemaTypeDefinition } from "sanity";
import { faq } from "./faq";
import { galleryItem } from "./galleryItem";
import { product } from "./product";
import { siteSettings } from "./siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [siteSettings, product, galleryItem, faq];
