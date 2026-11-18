"use client"

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("about");

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
      }
    });

    tl.fromTo(
      ".about-image",
      { autoAlpha: 0, y: 50, scale: 0.95 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }
    )
      .fromTo(
        ".about-title",
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      )
      .fromTo(
        ".about-text",
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      );
  }, { scope: containerRef });

  return (
    <div id="about-us" ref={containerRef}>
      {/* Notre environnement de travail */}
      <div className="bg-cream dark:bg-amber/5 mt-6 sm:mt-10 py-16 overflow-hidden">
        <div className="px-4 sm:px-6 lg:px-8 w-full">
          <div className="container mx-auto max-w-7xl w-full">
            <div className="invisible about-image relative w-full aspect-[16/9] md:h-[60vh] lg:h-[80vh] rounded-[20px] md:rounded-[70px] overflow-hidden mb-8 md:mb-12 shadow-lg">
              <Image
                src="/img/setup-dev.jpeg"
                alt={t("imageAlt")}
                fill
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
        <div className="px-4 sm:px-6 lg:px-8 w-full">
          <div className="container mx-auto w-full text-center max-w-4xl">
            <h2 className="invisible about-title text-4xl sm:text-5xl lg:text-6xl font-bold pb-8 text-foreground">
              {t.rich("title", { hl: (chunks) => <span className="text-amber">{chunks}</span> })}
            </h2>
            <div className="invisible about-text text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed space-y-6">
              <p>{t.rich("p1", { b: (chunks) => <b className="text-foreground font-semibold">{chunks}</b> })}</p>
              <p>{t("p2")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
