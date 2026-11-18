"use client"

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

export default function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("stats");

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
      },
    });

    tl.fromTo(
      ".stats-title",
      { autoAlpha: 0, y: 40 },
      { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )
    .fromTo(
      ".stats-subtitle",
      { autoAlpha: 0, y: 30 },
      { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.4"
    )
    .fromTo(
      ".stats-divider",
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: "power2.inOut" },
      "-=0.3"
    )
    .fromTo(
      ".stat-card",
      { autoAlpha: 0, y: 30 },
      { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.12, ease: "power2.out" },
      "-=0.3"
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative isolate overflow-hidden bg-carbon text-white py-24 sm:py-32">
      <Image
        src="/img/stats_background.jpg"
        alt={t("backgroundAlt")}
        fill
        sizes="100vw"
        className="absolute inset-0 -z-10 size-full object-cover object-right md:object-center opacity-30"
      />

      <div className="px-4 sm:px-6 lg:px-8 w-full">
        <div className="container mx-auto max-w-7xl w-full">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="invisible stats-title text-5xl sm:text-7xl lg:text-8xl font-bold text-white">
            {t.rich("title", { hl: (chunks) => <span className="text-amber">{chunks}</span> })}
          </h2>
          <p className="invisible stats-subtitle mt-6 text-base sm:text-lg text-gray-300 leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Divider */}
        <div className="stats-divider my-10 w-20 h-[2px] bg-gradient-to-r from-amber to-transparent origin-left"></div>

        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <dl className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="invisible stat-card flex flex-col-reverse gap-1 border-l-2 border-amber pl-4">
              <dt className="text-sm sm:text-base text-gray-400 uppercase tracking-wider">{t("projects")}</dt>
              <dd className="text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white">60+</dd>
            </div>
            <div className="invisible stat-card flex flex-col-reverse gap-1 border-l-2 border-amber pl-4">
              <dt className="text-sm sm:text-base text-gray-400 uppercase tracking-wider">{t("clients")}</dt>
              <dd className="text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white">43+</dd>
            </div>
            <div className="invisible stat-card flex flex-col-reverse gap-1 border-l-2 border-amber pl-4">
              <dt className="text-sm sm:text-base text-gray-400 uppercase tracking-wider">{t("years")}</dt>
              <dd className="text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white">6</dd>
            </div>
            <div className="invisible stat-card flex flex-col-reverse gap-1 border-l-2 border-amber pl-4">
              <dt className="text-sm sm:text-base text-gray-400 uppercase tracking-wider">{t("creativity")}</dt>
              <dd className="text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white">100%</dd>
            </div>
          </dl>
        </div>
        </div>
      </div>
    </div>
  );
}