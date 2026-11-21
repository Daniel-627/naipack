import type { ReactNode } from "react";

// The site (app/(site)) and the Sanity Studio (app/(studio)) each bring their own styles.
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
