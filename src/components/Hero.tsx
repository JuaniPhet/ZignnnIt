"use client"

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleText = "We are a creative Agency";

  // Split title text into characters, replacing spaces with non-breaking spaces
  const characters = titleText.split("").map((char, index) => {
    if (char === " ") return { char: "\u00A0", isSpace: true, index };
    return { char, isSpace: false, index };
  });

  // Determine which characters are the word "creative" (indices 9-16 in the string)
  const creativeStart = titleText.indexOf("creative");
  const creativeEnd = creativeStart + "creative".length;

  useGSAP(() => {
    // Badge entrance
    gsap.fromTo(
      ".hero-badge",
      { autoAlpha: 0, y: -20, scale: 0.9 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
    );

    // Captive title letters animation
    gsap.fromTo(
      ".captive-letter",
      {
        autoAlpha: 0,
        display: "inline-block",
      },
      {
        autoAlpha: 1,
        duration: 1,
        repeat: -1,
        repeatDelay: 5,
        stagger: 0.04,
        display: "inline-block",
      }
    );

    // Entrance timeline for subtitle, CTA, and illustration
    const entranceTl = gsap.timeline({ delay: 0.5 });

    entranceTl
      .fromTo(
        ".we-help-you-to",
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" }
      )
      .fromTo(
        ".hero-cta-group",
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(
        ".hero-illustration",
        { autoAlpha: 0, x: 60, scale: 0.95 },
        { autoAlpha: 1, x: 0, scale: 1, duration: 1, ease: "power2.out" },
        "-=0.5"
      );

    // Subtle float animation for the illustration
    gsap.to(".hero-illustration", {
      y: -14,
      duration: 3.5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: 1.5,
    });

    // Subtle pulse on the glow behind CTA
    gsap.to(".cta-glow", {
      scale: 1.15,
      opacity: 0.6,
      duration: 2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: 1,
    });

  }, { scope: containerRef });

  const handleCtaMouseEnter = () => {
    gsap.to(".emoji-1", {
      visibility: "visible",
      scale: 4,
      duration: 2,
      x: 250,
      y: -50,
      rotation: 360,
      opacity: 0,
      display: "inline-block",
    });
    gsap.to(".emoji-2", {
      visibility: "visible",
      scale: 4,
      duration: 2,
      x: 300,
      rotation: 360,
      opacity: 0,
      display: "inline-block",
    });
    gsap.to(".emoji-3", {
      visibility: "visible",
      scale: 4,
      duration: 2,
      x: 210,
      y: 50,
      rotation: 360,
      opacity: 0,
      display: "inline-block",
    });
  };

  const handleCtaMouseLeave = () => {
    gsap.to([".emoji-1", ".emoji-2", ".emoji-3"], {
      visibility: "hidden",
      scale: 0,
      x: 0,
      y: 0,
      opacity: 1,
      duration: 1,
    });
  };

  return (
    <section
      ref={containerRef}
      className="flex min-h-screen items-center relative overflow-hidden pt-24 pb-16 sm:pt-28 lg:pt-20 lg:pb-0 isolate"
      id="home"
    >
      {/* Background gradient blob - top */}
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#F7B700] to-[#737373] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
          }}
        ></div>
      </div>

      {/* Background grid pattern */}
      <Image
        alt="Hero Grid"
        src="/img/rb_56040.png"
        fill
        sizes="100vw"
        priority
        className="-z-10 object-cover opacity-10"
      />

      {/* Main content */}
      <div className="flex flex-col lg:flex-row justify-between items-center container mx-auto w-full px-4 sm:px-6 gap-10 lg:gap-16">

        {/* Left column - Text content */}
        <div className="flex-1 text-left max-w-2xl">

          {/* Badge */}
          <div className="invisible hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold mb-6 sm:mb-8 border border-border/50 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Creative Digital Agency
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground leading-[1.08] tracking-tight">
            {characters.map((item) => (
              <span
                key={item.index}
                className={`captive-letter inline-block ${item.index >= creativeStart && item.index < creativeEnd
                  ? "text-primary"
                  : ""
                  }`}
              >
                {item.char}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <h2 className="invisible we-help-you-to text-base sm:text-lg md:text-xl lg:text-2xl font-light mt-6 sm:mt-8 mb-8 sm:mb-10 text-muted-foreground leading-relaxed tracking-wide max-w-xl">
            Digital and visual experiences that{" "}
            <b className="text-foreground font-semibold">elevate your business</b>.
          </h2>

          {/* CTA Group */}
          <div className="invisible hero-cta-group flex flex-col md:flex-row items-stretch md:items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-auto">
              {/* CTA Glow effect */}
              <div className="cta-glow absolute -inset-1 bg-primary/30 rounded-xl blur-lg opacity-40"></div>
              <Link href="/contact" className="w-full block">
                <button
                  type="button"
                  className="relative w-full md:w-auto bg-primary text-primary-foreground text-sm sm:text-sm md:text-base px-3 sm:px-6 md:px-8 py-3.5 sm:py-4 font-bold rounded-xl hover:brightness-110 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-primary/25 flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer text-center group whitespace-nowrap"
                >
                  <span>Ready to zignnn your project ?</span>
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
                  </svg> */}
                </button>
              </Link>
            </div>

            {/* Secondary link */}
            <a
              href="#services"
              className="w-full md:w-auto text-muted-foreground hover:text-foreground text-sm sm:text-base font-medium transition-colors duration-200 flex items-center justify-center md:justify-start gap-1.5 group py-3 px-6 rounded-xl border md:border-none border-border/50 text-center"
            >
              Discover our services
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
        <div className="invisible hero-illustration hidden lg:block w-5/12 max-w-lg xl:max-w-xl flex-shrink-0">
          <Image
            src="/img/vector2@4x-8.png"
            alt="computer illustration"
            width={600}
            height={500}
            className="w-full h-auto drop-shadow-2xl"
            style={{ height: "auto" }}
            priority
          />
        </div>
      </div>

      {/* Bottom-right ambient glow */}
      <div className="w-72 h-72 sm:w-96 sm:h-96 bg-amber-200/20 dark:bg-amber-950/20 rounded-full absolute -z-10 bottom-20 right-0 blur-3xl"></div>

      {/* Bottom-left subtle glow */}
      <div className="w-48 h-48 sm:w-64 sm:h-64 bg-primary/10 rounded-full absolute -z-10 bottom-10 left-[-5rem] blur-3xl"></div>
    </section >
  );
}
