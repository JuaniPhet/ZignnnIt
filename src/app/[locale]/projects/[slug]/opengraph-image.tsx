import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { getProject, projects } from "@/data/projects";
import { OG_SIZE, renderOgImage } from "@/components/brand/og";

/**
 * Branded share image per project and language (title + category), generated at
 * build time — new projects get one automatically. A PNG is used rather than the
 * WebP cover because some networks (LinkedIn) don't reliably preview WebP.
 */
export const alt = "ZignnnIt project";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectOpenGraphImage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: requested, slug } = await params;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  const project = getProject(slug);
  const tp = await getTranslations({ locale, namespace: "projects" });
  const tf = await getTranslations({ locale, namespace: "footer" });

  return renderOgImage({
    eyebrow: project ? tp(`categories.${project.category}`) : undefined,
    headline: project?.title ?? "ZignnnIt",
    footer: tf("signature"),
  });
}
