"use client"

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import HeroTitle from "@/components/hero/HeroTitle";
import { prefersReducedMotion } from "@/lib/motion";
import { isLoaderActive, LOADER_DONE_EVENT } from "@/components/motion/FirstVisitLoader";
import HeroIllustration from "@/components/hero/HeroIllustration";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("hero");

  useGSAP(() => {
    // Reduced motion: fades only (no movement, no looping pulse).
    const reduced = prefersReducedMotion();
    const move = (v: number) => (reduced ? 0 : v);

    const tl = gsap.timeline({ paused: true });
    tl.fromTo(
      ".hero-badge",
      { autoAlpha: 0, y: move(-20), scale: reduced ? 1 : 0.9 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
    )
      .fromTo(
        ".we-help-you-to",
        { autoAlpha: 0, y: move(30) },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" },
        0.5
      )
      .fromTo(
        ".hero-cta-group",
        { autoAlpha: 0, y: move(20) },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(
        ".hero-illustration",
        { autoAlpha: 0, x: move(60), scale: reduced ? 1 : 0.95 },
        { autoAlpha: 1, x: 0, scale: 1, duration: 1, ease: "power2.out" },
        "-=0.5"
      );

    // Wait for the first-visit loader (if any) before the entrance.
    const play = () => tl.play();
    if (isLoaderActive()) window.addEventListener(LOADER_DONE_EVENT, play, { once: true });
    else play();

    // Subtle pulse on the glow behind CTA
    if (!reduced) {
      gsap.to(".cta-glow", {
        scale: 1.15,
        opacity: 0.6,
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1,
      });
    }

    return () => window.removeEventListener(LOADER_DONE_EVENT, play);
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="flex min-h-screen items-center relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-16 isolate"
      id="home"
    >
      {/* Background gradient blob - top */}
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

      {/* Background grid pattern */}
      <Image
        alt=""
        src="/img/rb_56040.png"
        fill
        sizes="100vw"
        priority
        className="-z-10 object-cover opacity-10"
      />

      {/* Main content */}
      <div className="px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row justify-between items-center container mx-auto max-w-7xl w-full gap-10 lg:gap-16">

        {/* Left column - Text content */}
        <div className="flex-1 text-left max-w-2xl">

          {/* Badge */}
          <div className="invisible hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold mb-6 sm:mb-8 border border-border/50 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            {t("badge")}
          </div>

          {/* Title */}
          <HeroTitle
            start={t("titleStart")}
            words={t.raw("rotating") as string[]}
            className="text-[clamp(2.5rem,5.6vw,5rem)] leading-[1.02] font-extrabold text-foreground"
          />

          {/* Subtitle */}
          <p className="invisible we-help-you-to text-base sm:text-lg md:text-xl lg:text-2xl mt-6 sm:mt-8 mb-8 sm:mb-10 text-muted-foreground leading-relaxed max-w-xl">
            {t.rich("subtitle", {
              b: (chunks) => <b className="text-foreground font-semibold">{chunks}</b>,
            })}
          </p>

          {/* CTA Group */}
          <div className="invisible hero-cta-group flex flex-col md:flex-row items-stretch md:items-center gap-4 w-full md:w-auto">
            {/* data-magnetic: pulled toward the pointer on desktop (see CustomCursor) */}
            <div className="relative w-full md:w-auto" data-magnetic>
              {/* CTA Glow effect */}
              <div className="cta-glow absolute -inset-1 bg-primary/30 rounded-xl blur-lg opacity-40"></div>
              <Link
                href="/contact"
                className="relative w-full md:w-auto bg-primary text-primary-foreground text-sm sm:text-sm md:text-base px-3 sm:px-6 md:px-8 py-3.5 sm:py-4 font-semibold rounded-xl hover:brightness-110 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-primary/25 flex items-center justify-center gap-1.5 sm:gap-2 text-center whitespace-nowrap"
              >
                {t("cta")}
              </Link>
            </div>

            {/* Secondary link */}
            <a
              href="#services"
              className="w-full md:w-auto text-muted-foreground hover:text-foreground text-sm sm:text-base font-medium transition-colors duration-200 flex items-center justify-center md:justify-start gap-1.5 group py-3 px-6 rounded-xl border md:border-none border-border/50 text-center"
            >
              {t("secondary")}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:translate-x-1 transition-transform duration-200"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right column - Illustration */}
        {/* Animated vector illustration: below the CTAs on mobile (~90% wide, centered), right column from lg */}
        <div className="invisible hero-illustration w-[90%] max-w-[520px] mx-auto lg:mx-0 lg:w-1/2 lg:max-w-2xl flex-shrink-0">
          <HeroIllustration title={t("illustrationTitle")} />
        </div>
      </div>
      </div>

      {/* Bottom-right ambient glow */}
      <div className="w-72 h-72 sm:w-96 sm:h-96 bg-amber/10 dark:bg-amber/5 rounded-full absolute -z-10 bottom-20 right-0 blur-3xl"></div>

      {/* Bottom-left subtle glow */}
      <div className="w-48 h-48 sm:w-64 sm:h-64 bg-primary/10 rounded-full absolute -z-10 bottom-10 left-[-5rem] blur-3xl"></div>
    </section >
  );
}
