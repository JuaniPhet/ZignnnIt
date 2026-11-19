import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * Next.js 16 "proxy" (formerly middleware): runs before every matched request.
 * next-intl uses it to redirect "/" or "/contact" to "/en/…" or "/fr/…"
 * (cookie first, then Accept-Language, then English), and to keep the cookie in sync.
 */
export default createMiddleware(routing);

export const config = {
  // Everything except API routes, Next internals, Vercel internals and files with an extension.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
