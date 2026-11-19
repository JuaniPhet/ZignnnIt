import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/i18n/metadata";
import { projects } from "@/data/projects";

/**
 * /sitemap.xml — every page in every language, each entry listing its translations
 * (xhtml:link hreflang), so search engines index /en and /fr as alternates
 * rather than duplicates. New projects are added automatically.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/about", "/projects", "/contact", "/shop", ...projects.map((p) => `/projects/${p.slug}`)];
  const lastModified = new Date();

  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : path.startsWith("/projects/") ? 0.6 : 0.8,
      alternates: {
        languages: Object.fromEntries([
          ...routing.locales.map((l) => [l, `${SITE_URL}/${l}${path}`]),
          ["x-default", `${SITE_URL}/${routing.defaultLocale}${path}`],
        ]),
      },
    }))
  );
}
