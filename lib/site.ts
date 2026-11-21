export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
export const SHOW_PREVIEW_BANNER = process.env.NEXT_PUBLIC_SHOW_PREVIEW_BANNER === "true";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/quote", label: "Get a quote" },
  { href: "/contact", label: "Contact" },
] as const;

export function tiktokHandle(url: string): string {
  const match = url.match(/tiktok\.com\/@([^/?#]+)/i);
  return match ? `@${match[1]}` : "TikTok";
}
