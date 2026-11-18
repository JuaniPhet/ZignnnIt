import type { Metadata } from "next";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { pageAlternates, pageOpenGraph } from "@/i18n/metadata";
import { team } from "@/data/team";
import TeamCard from "@/components/about/TeamCard";
import Stats from "@/components/Stats";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "metadata.about" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: pageAlternates(locale, "/about"),
    openGraph: pageOpenGraph(locale, { title: t("title"), description: t("description"), path: "/about" }),
  };
}

// Keys only: texts are in messages/*.json (aboutPage.steps / aboutPage.values).
const steps = [
  { key: "discover", icon: "ri-search-eye-line" },
  { key: "design", icon: "ri-pen-nib-line" },
  { key: "build", icon: "ri-code-s-slash-line" },
  { key: "launch", icon: "ri-rocket-2-line" },
] as const;
const values = [
  { key: "craft", icon: "ri-focus-3-line" },
  { key: "clarity", icon: "ri-chat-smile-2-line" },
  { key: "impact", icon: "ri-line-chart-line" },
  { key: "partnership", icon: "ri-shake-hands-line" },
] as const;

const hl = (chunks: React.ReactNode) => <span className="text-amber">{chunks}</span>;
const b = (chunks: React.ReactNode) => <b className="font-semibold text-foreground">{chunks}</b>;
const sectionTitle = "text-4xl sm:text-5xl lg:text-6xl text-foreground";

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("aboutPage");

  // Build-time check: show the photo only once the file has been added to /public.
  const hasPhoto = (photo: string) => existsSync(join(process.cwd(), "public", photo));

  return (
    <main className="bg-background">
      {/* 1. Hero */}
      <section className="relative isolate overflow-hidden px-4 sm:px-6 lg:px-8 pt-36 sm:pt-44 pb-20 sm:pb-28">
        <div className="absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(ellipse_at_20%_20%,color-mix(in_srgb,var(--amber)_14%,transparent),transparent_60%)]" aria-hidden="true" />
        <div className="container mx-auto max-w-7xl">
          <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold border border-border/50">
            <span className="w-2 h-2 rounded-full bg-primary" aria-hidden="true"></span>
            {t("badge")}
          </p>
          <h1 className="mt-6 max-w-5xl text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.02] font-extrabold text-foreground">
            {t.rich("heroTitle", { hl })}
          </h1>
          <p className="mt-8 max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed">{t("heroText")}</p>
        </div>
      </section>

      {/* 2. Story / mission */}
      <section className="bg-cream dark:bg-amber/5 px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="container mx-auto max-w-7xl grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <h2 className={sectionTitle} data-reveal>{t.rich("storyTitle", { hl })}</h2>
          <div className="space-y-6 text-lg sm:text-xl text-muted-foreground leading-relaxed" data-reveal>
            <p>{t.rich("storyP1", { b })}</p>
            <p>{t("storyP2")}</p>
          </div>
        </div>
      </section>

      {/* 3. Process */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="container mx-auto max-w-7xl">
          <h2 className={sectionTitle} data-reveal>{t.rich("processTitle", { hl })}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{t("processSubtitle")}</p>
          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <li key={step.key} data-reveal className="relative rounded-3xl border border-border p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="font-display text-5xl font-extrabold text-amber" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <i className={`${step.icon} text-3xl text-foreground/70`} aria-hidden="true"></i>
                </div>
                <h3 className="mt-6 text-2xl text-foreground">{t(`steps.${step.key}.title`)}</h3>
                <p className="mt-3 text-base text-muted-foreground leading-relaxed">{t(`steps.${step.key}.text`)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. Values */}
      <section className="bg-carbon text-white px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl text-white" data-reveal>{t.rich("valuesTitle", { hl })}</h2>
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <li key={value.key} data-reveal className="rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber text-carbon text-2xl" aria-hidden="true">
                  <i className={value.icon}></i>
                </span>
                <h3 className="mt-6 text-2xl text-white">{t(`values.${value.key}.title`)}</h3>
                <p className="mt-3 text-base text-white/70 leading-relaxed">{t(`values.${value.key}.text`)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Current collaborators */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="container mx-auto max-w-7xl">
          <h2 className={sectionTitle} data-reveal>{t.rich("teamTitle", { hl })}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{t("teamSubtitle")}</p>
          <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <div key={member.name} data-reveal>
              <TeamCard
                key={member.name}
                member={member}
                locale={locale}
                hasPhoto={hasPhoto(member.photo)}
                linkedinLabel={t("linkedinAria", { name: member.name })}
              />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Key figures + CTA */}
      <Stats />
      <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
        <h2 className="text-4xl sm:text-5xl text-foreground">{t("ctaTitle")}</h2>
        <p className="mt-4 text-lg text-muted-foreground">{t("ctaText")}</p>
        <Link
          href="/contact"
          data-magnetic
          className="mt-8 inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-semibold rounded-xl shadow-lg shadow-primary/25 hover:brightness-110 active:scale-[0.98] transition-all"
        >
          {t("ctaButton")}
          <i className="ri-arrow-right-line" aria-hidden="true"></i>
        </Link>
      </section>
    </main>
  );
}
