import type { Metadata } from "next";
import { routing, type Locale } from "./routing";

// Primary domain as configured on Vercel (zignnnit.com redirects to www): canonical,
// hreflang, sitemap and share URLs must point to the final address, not a redirect.
export const SITE_URL = "https://www.zignnnit.com";

/**
 * hreflang + canonical for a page, e.g. pageAlternates("en", "/contact") →
 *   canonical  /en/contact
 *   en         /en/contact
 *   fr         /fr/contact
 *   x-default  /en/contact   (version for languages we don't offer)
 * URLs are relative: Next resolves them against `metadataBase` (root layout).
 */
export function pageAlternates(locale: Locale, path: string = ""): Metadata["alternates"] {
  const suffix = path === "/" ? "" : path;
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = `/${l}${suffix}`;
  languages["x-default"] = `/${routing.defaultLocale}${suffix}`;

  return {
    canonical: `/${locale}${suffix}`,
    languages,
  };
}

/**
 * Complete Open Graph block for a page. In Next.js a page's `openGraph` REPLACES the
 * layout's (it is not deep-merged), so each page rebuilds the whole object here.
 * Without `images`, the per-language opengraph-image.tsx is used.
 */
export function pageOpenGraph(
  locale: Locale,
  page: { title: string; description: string; path?: string; images?: { url: string }[] }
): Metadata["openGraph"] {
  return {
    title: page.title,
    description: page.description,
    url: `/${locale}${page.path && page.path !== "/" ? page.path : ""}`,
    siteName: "ZignnnIt",
    locale: locale === "fr" ? "fr_FR" : "en_US",
    alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
    type: "website",
    ...(page.images ? { images: page.images } : {}),
  };
}
