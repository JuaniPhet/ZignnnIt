import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/projects/ProjectCard";
import { routing } from "@/i18n/routing";
import { pageAlternates, pageOpenGraph } from "@/i18n/metadata";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "metadata.projects" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: pageAlternates(locale, "/projects"),
    openGraph: pageOpenGraph(locale, { title: t("title"), description: t("description"), path: "/projects" }),
  };
}

// Server component: no interactivity here, so no client JavaScript is shipped for it.
export default async function ProjectsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("projects");

  return (
      <main className="pt-24 min-h-screen bg-background">
        <div className="isolate px-4 sm:px-6 py-16 sm:py-24 lg:px-8 relative">
          {/* Background gradient blob */}
          <div
            className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
            aria-hidden="true"
          >
            <div
              className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-amber to-neutral-500 opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
              style={{
                clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
              }}
            ></div>
          </div>

          {/* Page header */}
          <div className="mx-auto max-w-2xl text-center mb-16 sm:mb-20">
            <h1 className="text-balance text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
              {t.rich("title", { hl: (chunks) => <span className="text-primary">{chunks}</span> })}
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-muted-foreground">
              {t("pageSubtitle")}
            </p>
          </div>

          {/* Projects grid */}
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12">
              {projects.map((project) => (
                <div key={project.slug} data-reveal>
                  <ProjectCard
                    project={project}
                    as="h2"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
  );
}
