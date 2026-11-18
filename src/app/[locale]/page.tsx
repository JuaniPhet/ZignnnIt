import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import { routing } from "@/i18n/routing";
import { pageAlternates, pageOpenGraph } from "@/i18n/metadata";

type PageProps = { params: Promise<{ locale: string }> };

// Title/description come from the layout defaults (metadata.home).
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "metadata.home" });
  return {
    alternates: pageAlternates(locale, "/"),
    openGraph: pageOpenGraph(locale, { title: t("title"), description: t("description") }),
  };
}

// Server component: renders the sections (client components) — no "use client" needed here.
export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <TechStack />
      <About />
      <Services />
      <Projects />
      <Stats />
      <Testimonials />
    </main>
  );
}
