"use client"

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

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
        stagger: 0.05,
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
        ".hero-cta",
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
      y: -12,
      duration: 3,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: 1.5,
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
      className="flex min-h-screen items-center relative overflow-hidden pt-20 isolate"
      id="home"
    >
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

      <Image
        alt="Hero Grid"
        src="/img/rb_56040.png"
        fill
        sizes="100vw"
        priority
        className="-z-10 object-cover opacity-10"
      />

      <div className="flex flex-col lg:flex-row justify-between items-center container mx-auto w-full px-4 gap-8">
        <div className="flex-1 text-left">
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold my-10 text-foreground min-h-[150px] leading-[1.1] tracking-tight">
            {characters.map((item) => (
              <span
                key={item.index}
                className={`captive-letter inline-block ${item.index >= creativeStart && item.index < creativeEnd
                  ? "text-amber-500"
                  : ""
                  }`}
              >
                {item.char}
              </span>
            ))}
          </h1>
          <h2 className="invisible text-lg sm:text-xl lg:text-2xl font-light my-8 text-muted-foreground we-help-you-to leading-relaxed tracking-wide">
            Digital and visual experiences that{" "}
            <b className="text-foreground font-semibold">elevate your business</b>.
          </h2>
          <button
            type="button"
            onMouseEnter={handleCtaMouseEnter}
            onMouseLeave={handleCtaMouseLeave}
            className="invisible hero-cta bg-primary text-primary-foreground text-base sm:text-lg px-6 py-4 font-bold rounded-lg hover:bg-amber-600 transition-colors my-4 zignnn-btn relative flex items-center gap-2"
          >
            <span>Ready to zignnn your project ? ✒️</span>
            <span className="absolute left-0 top-0 pointer-events-none opacity-0 invisible emoji-1 text-2xl">😄</span>
            <span className="absolute left-0 top-0 pointer-events-none opacity-0 invisible emoji-2 text-2xl">✨</span>
            <span className="absolute left-0 top-0 pointer-events-none opacity-0 invisible emoji-3 text-2xl">😃</span>
          </button>
        </div>
        <div className="invisible hero-illustration w-full lg:w-5/12 max-w-md lg:max-w-none">
          <Image
            src="/img/vector2@4x-8.png"
            alt="computer illustration"
            width={600}
            height={500}
            className="w-full h-auto"
            style={{ height: "auto" }}
            priority
          />
        </div>
      </div>

      <div className="w-96 h-96 bg-amber-200/20 dark:bg-amber-950/20 rounded-full absolute -z-10 top-96 right-0 blur-3xl"></div>
    </section>
  );
}
