import type { Metadata } from "next";
import { routing, type Locale } from "./routing";

export const SITE_URL = "https://zignnnit.com";

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
