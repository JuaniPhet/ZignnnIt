import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import "../globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { routing } from "@/i18n/routing";
import { pageAlternates, SITE_URL } from "@/i18n/metadata";
import { contact } from "@/data/contact";
import SmoothScroll from "@/components/motion/SmoothScroll";
import PageTransition from "@/components/motion/PageTransition";
import ScrollReveals from "@/components/motion/ScrollReveals";
import CustomCursor from "@/components/motion/CustomCursor";
import FirstVisitLoader, { headInitScript } from "@/components/motion/FirstVisitLoader";

// Self-hosted fonts (Fontshare, ITF Free Font License — see src/fonts/LICENSE-ITF-FFL.txt).
// next/font/local serves them from our own domain, preloads them and generates
// a size-adjusted fallback to avoid layout shift while they load.
const cabinetGrotesk = localFont({
  src: [
    { path: "../../fonts/CabinetGrotesk-Bold.woff2", weight: "700", style: "normal" },
    { path: "../../fonts/CabinetGrotesk-Extrabold.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-cabinet-grotesk",
  display: "swap",
});

const generalSans = localFont({
  src: [
    { path: "../../fonts/GeneralSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../fonts/GeneralSans-Italic.woff2", weight: "400", style: "italic" },
    { path: "../../fonts/GeneralSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../fonts/GeneralSans-Semibold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-general-sans",
  display: "swap",
});

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// Pre-render every page once per language at build time (static HTML, fast CDN).
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    metadataBase: new URL(SITE_URL),
    // Pages set a short title; the template appends the brand: "Contact Us | ZignnnIt".
    title: { default: t("home.title"), template: `%s | ${t("siteName")}` },
    description: t("home.description"),
    alternates: pageAlternates(locale),
    openGraph: {
      siteName: t("siteName"),
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
    twitter: { card: "summary_large_image" },
    // Icons: src/app/favicon.ico, icon.svg and apple-icon.png (Next.js file conventions).
  };
}

/**
 * Root layout, one per language. It owns <html lang>, so screen readers,
 * translation tools and search engines know which language the page is in.
 */
export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Enables static rendering: tells next-intl the locale without reading headers.
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "metadata" });
  // Brand signature: single source (messages → footer.signature), reused by the
  // footer, the loader, the share images and the structured data.
  const signature = (await getTranslations({ locale, namespace: "footer" }))("signature");

  // Structured data (schema.org): tells search engines who we are, what we do and
  // how to reach us — can show up as a richer result. Rendered as JSON in the page.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#organization`,
    name: "ZignnnIt",
    url: `${SITE_URL}/${locale}`,
    logo: `${SITE_URL}/brand/zignnnit-logo.png`,
    image: `${SITE_URL}/${locale}/opengraph-image`,
    description: t("home.description"),
    slogan: signature,
    email: contact.email,
    address: { "@type": "PostalAddress", addressLocality: contact.city, addressCountry: contact.countryCode },
    areaServed: "Worldwide",
    knowsLanguage: ["en", "fr"],
    sameAs: [contact.linkedin],
  };

  return (
    <html lang={locale} suppressHydrationWarning className={cn(cabinetGrotesk.variable, generalSans.variable)}>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        {/* First child of <body>: runs before the content below is parsed/painted
            (loader on first visit + hero letters hidden until animated). Kept out of
            <head>, which Next/React manage and stream into. */}
        <script dangerouslySetInnerHTML={{ __html: headInitScript }} />
        <script
          type="application/ld+json"
          // "<" is escaped so the JSON can never close the <script> tag early.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        {/* Makes the current locale's messages available to client components */}
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <FirstVisitLoader words={signature.split(" ")} />
            <SmoothScroll />
            <PageTransition />
            <ScrollReveals />
            <CustomCursor />
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
