import { defineRouting } from "next-intl/routing";

/**
 * Single source of truth for the site languages.
 * - Every URL is prefixed (/en/…, /fr/…): each language has its own crawlable URL.
 * - English is the default (international audience).
 * - First visit: the proxy reads the Accept-Language header; once the visitor picks
 *   a language, it is remembered in the NEXT_LOCALE cookie.
 */
export const routing = defineRouting({
  locales: ["en", "fr"],
  defaultLocale: "en",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
