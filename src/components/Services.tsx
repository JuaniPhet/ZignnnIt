"use client"

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";
import { prefersReducedMotion } from "@/lib/motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

gsap.registerPlugin(ScrollTrigger);

// Texts (title, quote, description, deliverables, timeline) are in messages/{en,fr}.json
// under services.items.<key>. Adding a service = one entry here + one block per language.
const services = [
  { key: "graphicDesign", image: "/img/services/graphic-design.webp" },
  { key: "uiUxDesign", image: "/img/services/ui-ux-design.webp" },
  { key: "webDevelopment", image: "/img/services/web-development.webp" },
  { key: "mobileDevelopment", image: "/img/services/mobile-development.webp" },
] as const;

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations("services");

  useGSAP(() => {
    const y = (v: number) => (prefersReducedMotion() ? 0 : v);
    // Entrance animation for the heading area
    gsap.fromTo(
      ".services-heading",
      { autoAlpha: 0, y: y(40) },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );

    // Staggered entrance for each accordion item
    gsap.fromTo(
      ".services-item",
      { autoAlpha: 0, y: y(30) },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".services-accordion",
          start: "top 80%",
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="pt-24 lg:pt-32 px-4 sm:px-6 lg:px-8 w-full" id="services">
      <div className="container mx-auto max-w-7xl w-full">
        <div className="invisible services-heading">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground">
            {t.rich("title", { hl: (chunks) => <span className="text-amber">{chunks}</span> })}
          </h2>
          <p className="pt-4 pb-10 text-lg sm:text-xl text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        <Accordion className="w-full services-accordion">
          {services.map((service) => {
            const item = `items.${service.key}` as const;
            return (
            <AccordionItem
              key={service.key}
              value={service.key}
              className="invisible services-item border-b border-border py-4"
            >
              {/* Base UI exposes the open state through aria-expanded (not Radix's data-state). */}
              <AccordionTrigger className="font-sans font-semibold tracking-tight leading-tight text-3xl sm:text-4xl lg:text-5xl text-foreground hover:text-amber-deep aria-expanded:text-amber-deep dark:hover:text-amber dark:aria-expanded:text-amber hover:no-underline duration-300 py-6 transition-colors">
                {t(`${item}.title`)}
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col md:flex-row items-start justify-center gap-8 py-6">
                  {/* 4:3 frame (was a fixed 240px height that cropped the images into a thin band) */}
                  <div className="relative w-full md:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
                    <Image
                      src={service.image}
                      alt={t(`${item}.title`)}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="w-full md:w-1/2 flex flex-col justify-center">
                    <p className="font-semibold leading-snug text-xl sm:text-2xl text-foreground">
                      {t(`${item}.quote`)}
                    </p>
                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                      {t(`${item}.description`)}
                    </p>
                    <p className="text-sm font-semibold uppercase tracking-wider text-foreground !mb-2">{t("deliverables")}</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 mb-5">
                      {(t.raw(`${item}.deliverables`) as string[]).map((deliverable) => (
                        <li key={deliverable} className="flex items-start gap-2 text-base text-muted-foreground">
                          <i className="ri-check-line text-amber-deep dark:text-amber text-lg leading-6" aria-hidden="true"></i>
                          <span>{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="inline-flex self-start items-center gap-2 rounded-full bg-amber/15 border border-amber/30 px-3 py-1.5 text-sm text-foreground">
                      <i className="ri-time-line" aria-hidden="true"></i>
                      <span>{t.rich("timeline", { duration: t(`${item}.timeline`), b: (chunks) => <b className="font-semibold">{chunks}</b> })}</span>
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
}
