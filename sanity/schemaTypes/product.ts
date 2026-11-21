import { BasketIcon } from "@sanity/icons/Basket";
import { defineArrayMember, defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: BasketIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 60 },
      description: "Used in links, for example /quote?item=this-slug",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers come first on the site.",
      initialValue: 10,
    }),
    defineField({
      name: "tagline",
      title: "Short line",
      type: "string",
      description: "Shown under the name in the homepage slider.",
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "One or two sentences for the Products page.",
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      description:
        "A photo of the real product. Shown in the homepage slider and on the Products page. Without one, a simple drawing is used.",
      fields: [
        defineField({
          name: "alt",
          title: "Describe the photo",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "options",
      title: "What the customer can choose",
      type: "array",
      description:
        "Each row becomes a list on the Products page and a drop-down on the quote form.",
      of: [
        defineArrayMember({
          type: "object",
          name: "option",
          fields: [
            defineField({
              name: "label",
              title: "Name",
              type: "string",
              description: "For example: Paper, Size, Finish",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "choices",
              title: "Choices",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
              options: { layout: "tags" },
              validation: (rule) => rule.required().min(1),
            }),
          ],
          preview: {
            select: { title: "label", choices: "choices" },
            prepare: ({ title, choices }) => ({
              title,
              subtitle: Array.isArray(choices) ? choices.join(", ") : "",
            }),
          },
        }),
      ],
    }),
    defineField({
      name: "worksFor",
      title: "Works well for",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
  ],
  orderings: [
    {
      title: "Order on the site",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "tagline", media: "photo" },
  },
});
