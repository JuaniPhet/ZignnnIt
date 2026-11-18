import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { allProjects } from "@/lib/projects";
import { routing } from "@/i18n/routing";
import { pageAlternates } from "@/i18n/metadata";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "metadata.projects" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: pageAlternates(locale, "/projects"),
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
              {allProjects.map((project, idx) => (
                <article
                  key={idx}
                  className="flex flex-col group"
                >
                  {/* Image card */}
                  <div className="relative rounded-2xl w-full aspect-[16/9]">
                    {/* Fine glowing gradient line border */}
                    <div className="absolute -inset-[1px] bg-gradient-to-r from-amber/40 via-primary to-amber/40 rounded-2xl opacity-50 group-hover:opacity-100 blur-[1px] group-hover:blur-[3px] transition-all duration-500"></div>

                    <div className="relative bg-amber/15 dark:bg-amber/5 rounded-2xl w-full h-full shadow-lg overflow-hidden flex items-center justify-center">
                      {/* Fixed-ratio image frame: guarantees the same amber top/bottom band on every project */}
                      <div className="relative w-full aspect-[1.89/1]">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-black/75 flex items-center justify-center p-6 sm:p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                        <p className="text-white text-sm sm:text-base text-center leading-relaxed">
                          {project.description[locale]}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Project info */}
                  <div className="mt-5">
                    <div className="flex flex-wrap gap-3 justify-between items-center">
                      <h2 className="text-2xl font-bold text-foreground">
                        {project.title}
                      </h2>

                      {/* Tools logos */}
                      <div className="flex gap-2 h-6 sm:h-7">
                        {project.tools.map((tool, tIdx) => (
                          <img
                            key={tIdx}
                            src={tool.src}
                            alt={tool.alt}
                            className="h-full w-auto object-contain dark:brightness-200 dark:contrast-100"
                          />
                        ))}
                      </div>
                    </div>

                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {project.description[locale]}
                    </p>

                    <div className="mt-4 flex items-center gap-3">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary text-primary-foreground px-5 py-2 font-semibold rounded-lg hover:brightness-110 active:scale-[0.97] transition-all duration-200 text-sm"
                      >
                        {t("viewProject")}
                      </a>
                      <span className="inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-full bg-amber/15 text-carbon dark:text-amber border border-amber/30">
                        {t(`categories.${project.category}`)}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </main>
  );
}
