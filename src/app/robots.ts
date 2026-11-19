import type { MetadataRoute } from "next";
import { SITE_URL } from "@/i18n/metadata";

/** /robots.txt — everything is crawlable except the API; points to the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
