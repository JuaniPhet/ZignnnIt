import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ContactContent from "@/components/contact/ContactContent";
import { routing } from "@/i18n/routing";
import { pageAlternates, pageOpenGraph } from "@/i18n/metadata";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "metadata.contact" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: pageAlternates(locale, "/contact"),
    openGraph: pageOpenGraph(locale, { title: t("title"), description: t("description"), path: "/contact" }),
  };
}

// Server shell (metadata) around the interactive client form.
export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <ContactContent />;
}
