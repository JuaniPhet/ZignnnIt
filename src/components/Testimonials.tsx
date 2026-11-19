import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { visibleTestimonials, type Testimonial } from "@/data/testimonials";
import { getProject } from "@/data/projects";

const initials = (name: string) =>
  name
    .replace(/&/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function Card({ item, hidden }: { item: Testimonial; hidden?: boolean }) {
  const t = useTranslations("testimonials");
  const tp = useTranslations("projects");
  const locale = useLocale();
  const project = item.project ? getProject(item.project) : undefined;

  return (
    <li
      // Copies used to make the loop seamless are hidden from assistive tech and keyboard.
      aria-hidden={hidden || undefined}
      className="relative flex w-[85vw] max-w-[26rem] shrink-0 flex-col rounded-3xl border border-amber/20 bg-white dark:bg-white/5 p-7 sm:p-8 shadow-sm"
    >
      <span aria-hidden="true" className="absolute right-7 top-4 font-display text-8xl leading-none text-amber/25 select-none">
        &ldquo;
      </span>
      <div className="flex gap-1 text-amber" role="img" aria-label={t("rating")}>
        {Array.from({ length: 5 }).map((_, i) => (
          <i key={i} className="ri-star-fill" aria-hidden="true"></i>
        ))}
      </div>
      <blockquote className="mt-5 flex-1 text-base sm:text-lg leading-relaxed text-foreground">
        {item.quote[locale]}
      </blockquote>
      <div className="mt-7 flex items-center gap-4">
        <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-carbon font-display text-lg font-bold text-amber dark:bg-amber dark:text-carbon">
          {initials(item.name)}
        </span>
        <div className="min-w-0">
          <p className="font-semibold text-foreground">{item.name}</p>
          <p className="text-sm text-muted-foreground">{item.role[locale]}</p>
        </div>
      </div>
      {project && (
        <Link
          href={`/projects/${project.slug}`}
          tabIndex={hidden ? -1 : undefined}
          className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-amber-deep dark:text-amber hover:underline underline-offset-4"
        >
          {tp("viewProject")} — {project.title}
          <i className="ri-arrow-right-line" aria-hidden="true"></i>
        </Link>
      )}
    </li>
  );
}

/**
 * "What our clients say": a band of testimonials scrolling continuously.
 * - Pure CSS animation (no JS): the track holds the list twice and slides by -50%,
 *   so the end meets the start seamlessly. Short lists are repeated so each half is
 *   wider than any screen.
 * - Pauses on hover and when a card link has keyboard focus.
 * - Reduced motion: no animation, the band becomes a horizontally scrollable row.
 * - Renders nothing when there is no testimonial to show (e.g. only placeholders
 *   in production).
 */
export default function Testimonials() {
  const t = useTranslations("testimonials");
  const items = visibleTestimonials();
  if (items.length === 0) return null;

  // Repeat the list so half the track is at least ~6 cards wide (> 2000px).
  const repeats = Math.max(1, Math.ceil(6 / items.length));
  const half = Array.from({ length: repeats }, () => items).flat();
  // Duration grows with the number of cards: constant speed whatever the list size.
  const duration = `${half.length * 9}s`;

  return (
    <section className="bg-cream dark:bg-amber/5 py-20 sm:py-28 overflow-hidden" aria-labelledby="testimonials-title">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl" data-reveal>
          <h2 id="testimonials-title" className="text-4xl sm:text-5xl lg:text-6xl text-foreground">
            {t.rich("title", { hl: (chunks) => <span className="text-amber">{chunks}</span> })}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
        </div>
      </div>

      <div className="zg-marquee mt-12 sm:mt-16" style={{ "--zg-marquee-duration": duration } as React.CSSProperties}>
        <ul className="zg-marquee-track flex w-max gap-6 px-3">
          {[...half, ...half].map((item, i) => (
            <Card key={i} item={item} hidden={i >= items.length} />
          ))}
        </ul>
      </div>
    </section>
  );
}
