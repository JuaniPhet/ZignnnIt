import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { pageAlternates, pageOpenGraph } from "@/i18n/metadata";
import { getNextProject, getProject, projects } from "@/data/projects";
import ToolBadges from "@/components/projects/ToolBadges";
import YouTubeFacade from "@/components/projects/YouTubeFacade";
import ProjectGallery from "@/components/projects/ProjectGallery";
import CoverLoop from "@/components/projects/CoverLoop";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

// One static page per project × language, generated at build time (no database).
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
// Any slug not listed above is a 404 (no on-demand rendering).
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project || !hasLocale(routing.locales, locale)) return {};
  return {
    title: project.title,
    description: project.summary[locale],
    alternates: pageAlternates(locale, `/projects/${slug}`),
    openGraph: pageOpenGraph(locale, {
      title: project.title,
      description: project.summary[locale],
      path: `/projects/${slug}`,
    }),
  };
}

const sectionTitle = "text-2xl sm:text-3xl text-foreground mb-6";
const buttonBase =
  "inline-flex items-center gap-2 rounded-xl px-6 py-3.5 font-semibold transition-all duration-200 active:scale-[0.98]";

/**
 * Single template for every project type. Blocks render only when their field exists:
 * Hero → summary → body → video → gallery → tools → actions → next project.
 */
export default async function ProjectPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const project = getProject(slug);
  if (!project) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("projectPage");
  const tp = await getTranslations("projects");
  const next = getNextProject(slug);
  const body = project.body?.[locale] ?? [];
  const hasActions = Boolean(project.downloadUrl || project.live || project.stores);
  const newTab = <span className="sr-only"> {t("newTab")}</span>;

  return (
    <main className="pt-28 sm:pt-32 pb-20 min-h-screen bg-background">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <i className="ri-arrow-left-line" aria-hidden="true"></i>
            {t("allProjects")}
          </Link>

          {/* Hero */}
          <header className="mt-6 sm:mt-8">
            <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-extrabold text-foreground">{project.title}</h1>
            <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-sm">
              <div className="flex gap-2">
                <dt className="text-muted-foreground">{t("category")}</dt>
                <dd className="font-semibold text-foreground">{tp(`categories.${project.category}`)}</dd>
              </div>
              {project.year && (
                <div className="flex gap-2">
                  <dt className="text-muted-foreground">{t("year")}</dt>
                  <dd className="font-semibold text-foreground">{project.year}</dd>
                </div>
              )}
            </dl>
          </header>

          <div className="relative mt-8 sm:mt-10 w-full aspect-video overflow-hidden rounded-2xl sm:rounded-3xl bg-amber/15 shadow-xl">
            {project.coverLoop ? (
              <CoverLoop {...project.coverLoop} label={project.title} />
            ) : (
              <Image src={project.cover} alt={project.title} fill priority sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover" />
            )}
          </div>

          {/* Summary + body */}
          <section className="mt-12 sm:mt-16 max-w-3xl" aria-label={t("overview")} data-reveal>
            <p className="text-xl sm:text-2xl leading-relaxed text-foreground">{project.summary[locale]}</p>
            {body.map((paragraph, i) => (
              <p key={i} className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </section>

          {project.youtubeId && (
            <section className="mt-16" data-reveal>
              <h2 className={sectionTitle}>{t("video")}</h2>
              <YouTubeFacade videoId={project.youtubeId} playLabel={t("playVideo", { title: project.title })} />
            </section>
          )}

          {project.gallery && project.gallery.length > 0 && (
            <section className="mt-16" data-reveal>
              <h2 className={sectionTitle}>{t("gallery")}</h2>
              <ProjectGallery title={project.title} images={project.gallery} />
            </section>
          )}

          <section className="mt-16" data-reveal>
            <h2 className={sectionTitle}>{t("tools")}</h2>
            <ToolBadges ids={project.tools} className="h-9 sm:h-10 gap-4" />
          </section>

          {hasActions && (
            <section className="mt-16" aria-label={t("actions")} data-reveal>
              <div className="flex flex-col md:flex-row flex-wrap gap-4">
                {project.downloadUrl && (
                  <a href={project.downloadUrl} target="_blank" rel="noopener noreferrer" className={`${buttonBase} bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:brightness-110`}>
                    <i className="ri-download-2-line text-lg" aria-hidden="true"></i>
                    {t("download")}
                    {newTab}
                  </a>
                )}
                {project.live && (
                  <a href={project.live.url} target="_blank" rel="noopener noreferrer" className={`${buttonBase} bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:brightness-110`}>
                    <i className="ri-external-link-line text-lg" aria-hidden="true"></i>
                    {t(`live.${project.live.kind}`)}
                    {newTab}
                  </a>
                )}
                {project.stores?.playStore && (
                  <a href={project.stores.playStore} target="_blank" rel="noopener noreferrer" className={`${buttonBase} border border-border text-foreground hover:bg-muted`}>
                    <i className="ri-google-play-fill text-lg" aria-hidden="true"></i>
                    {t("playStore")}
                    {newTab}
                  </a>
                )}
                {project.stores?.appStore && (
                  <a href={project.stores.appStore} target="_blank" rel="noopener noreferrer" className={`${buttonBase} border border-border text-foreground hover:bg-muted`}>
                    <i className="ri-apple-fill text-lg" aria-hidden="true"></i>
                    {t("appStore")}
                    {newTab}
                  </a>
                )}
              </div>
            </section>
          )}

          {/* Next project */}
          <nav className="mt-20 sm:mt-24 border-t border-border pt-10" aria-label={t("nextProject")} data-reveal>
            <Link href={`/projects/${next.slug}`} className="group flex flex-col md:flex-row md:items-center gap-6" data-cursor="view">
              <div className="relative w-full md:w-64 aspect-video shrink-0 overflow-hidden rounded-2xl bg-amber/15">
                <Image src={next.cover} alt="" fill sizes="(max-width: 540px) 100vw, 256px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{t("nextProject")}</p>
                <p className="mt-1 font-display text-3xl sm:text-4xl font-bold text-foreground transition-colors group-hover:text-amber-deep dark:group-hover:text-amber">
                  {next.title}
                  <i className="ri-arrow-right-line ml-3 inline-block transition-transform group-hover:translate-x-1" aria-hidden="true"></i>
                </p>
              </div>
            </Link>
          </nav>
        </div>
      </div>
    </main>
  );
}
