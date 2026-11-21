import { CogIcon } from "@sanity/icons/Cog";
import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "businessName",
      title: "Business name",
      type: "string",
      initialValue: "Naipack",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      description:
        "Optional. Replaces the text logo in the header and footer. A white or light logo on a transparent background works best.",
    }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp number",
      type: "string",
      description:
        "Digits only, with the country code and no + or spaces. Example: 254712345678. Every quote and contact button opens a chat with this number.",
      validation: (rule) =>
        rule.regex(/^\d{10,15}$/, { name: "international number" }).error(
          "Use digits only, including the country code. Example: 254712345678",
        ),
    }),
    defineField({
      name: "address",
      title: "Shop address",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "mapQuery",
      title: "Map search",
      type: "string",
      description: "What Google Maps should search for on the Contact page.",
    }),
    defineField({
      name: "openingHours",
      title: "Opening hours",
      type: "text",
      rows: 3,
      description: "Shown on the Contact page. Leave empty to hide it.",
    }),
    defineField({
      name: "tiktokUrl",
      title: "TikTok link",
      type: "url",
    }),
    defineField({
      name: "heroHeadline",
      title: "Homepage headline",
      type: "string",
    }),
    defineField({
      name: "heroLead",
      title: "Homepage intro line",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site settings" }),
  },
});
