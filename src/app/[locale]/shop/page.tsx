import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ShopContent from "@/components/shop/ShopContent";
import { routing } from "@/i18n/routing";
import { pageAlternates, pageOpenGraph } from "@/i18n/metadata";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "metadata.shop" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: pageAlternates(locale, "/shop"),
    openGraph: pageOpenGraph(locale, { title: t("title"), description: t("description"), path: "/shop" }),
  };
}

// Server shell (metadata) around the animated client content.
export default async function ShopPage({ params }: PageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <ShopContent />;
}
