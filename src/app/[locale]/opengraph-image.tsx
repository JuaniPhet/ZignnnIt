import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { OG_SIZE, renderOgImage } from "@/components/brand/og";

/**
 * Social share image (Open Graph), one per language, generated at build time.
 * Next.js file convention: applies to every page under /[locale] unless a deeper
 * folder has its own opengraph-image (project pages do).
 */
export const alt = "ZignnnIt — Design. Code. Launch.";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: requested } = await params;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "hero" });
  const tf = await getTranslations({ locale, namespace: "footer" });

  return renderOgImage({ headline: t("title"), highlight: t("highlight"), footer: tf("signature") });
}
