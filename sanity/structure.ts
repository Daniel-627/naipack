import type { StructureResolver } from "sanity/structure";

// Site settings is a single document, so it gets its own entry instead of a list.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Naipack")
    .items([
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      S.documentTypeListItem("product").title("Products"),
      S.documentTypeListItem("galleryItem").title("Recent work"),
      S.documentTypeListItem("faq").title("Questions"),
    ]);
