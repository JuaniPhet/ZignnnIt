import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/data/projects";
import ToolBadges from "@/components/projects/ToolBadges";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  /** Responsive `sizes` for the cover (depends on the layout using the card). */
  sizes: string;
  className?: string;
  /** Heading level: h3 inside a section (home), h2 on the projects page. */
  as?: "h2" | "h3";
};

/**
 * Project card used on the home carousel and on /projects.
 * No "use client": hooks from next-intl work in both server and client components,
 * so the same card renders in either context.
 */
export default function ProjectCard({ project, sizes, className, as: Heading = "h3" }: ProjectCardProps) {
  const t = useTranslations("projects");
  const locale = useLocale();
  const href = `/projects/${project.slug}`;

  return (
    <article className={cn("flex flex-col group", className)}>
      {/* The image repeats the "View project" link: hidden from keyboard/screen readers to avoid a duplicate. */}
      <Link href={href} tabIndex={-1} aria-hidden="true" className="relative block rounded-2xl w-full aspect-[16/9]">
        {/* Fine glowing gradient line border */}
        <div className="absolute -inset-[1px] bg-gradient-to-r from-amber/40 via-primary to-amber/40 rounded-2xl opacity-50 group-hover:opacity-100 blur-[1px] group-hover:blur-[3px] transition-all duration-500"></div>

        <div className="relative bg-amber/15 dark:bg-amber/5 rounded-2xl w-full h-full shadow-xl overflow-hidden flex items-center justify-center">
          {/* Fixed-ratio frame: same amber band on every project, whatever the image ratio */}
          <div className="relative w-full aspect-[1.89/1]">
            <Image
              src={project.cover}
              alt=""
              fill
              sizes={sizes}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          {/* Summary on hover (desktop) */}
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-6 sm:p-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-white text-base sm:text-lg text-center leading-relaxed">{project.summary[locale]}</p>
          </div>
        </div>
      </Link>

      <div className="mt-5 sm:mt-6 flex flex-col gap-3 sm:gap-4">
        <div className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-2 sm:gap-4">
          <Heading className="text-2xl lg:text-3xl font-bold text-foreground">{project.title}</Heading>
          <ToolBadges ids={project.tools} />
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={href}
            className="bg-primary text-primary-foreground px-5 py-2 font-semibold rounded-lg hover:brightness-110 active:scale-[0.97] transition-all text-sm sm:text-base"
          >
            {t("viewProject")}
            <span className="sr-only"> — {project.title}</span>
          </Link>
          <span className="inline-flex items-center text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full bg-amber/15 text-carbon dark:text-amber border border-amber/30">
            {t(`categories.${project.category}`)}
          </span>
        </div>
      </div>
    </article>
  );
}
