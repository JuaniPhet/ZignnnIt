"use client"

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);

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
    <div ref={containerRef} className="relative isolate overflow-hidden bg-[#202020] text-white py-24 sm:py-32">
      <Image
        src="/img/stats_background.jpg"
        alt="Work with us background"
        fill
        sizes="100vw"
        className="absolute inset-0 -z-10 size-full object-cover object-right md:object-center opacity-30"
      />

      <div className="container mx-auto px-4 w-full">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="invisible stats-title text-5xl sm:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[1.1]">
            Work with <span className="text-amber-400">us</span>
          </h2>
          <p className="invisible stats-subtitle mt-6 text-base sm:text-lg text-gray-300 leading-relaxed font-light">
            We transform ideas into unique digital and visual experiences — websites, mobile apps, and graphic design brought to life.
          </p>
        </div>

        {/* Divider */}
        <div className="stats-divider my-10 w-20 h-[2px] bg-gradient-to-r from-amber-500 to-transparent origin-left"></div>

        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <dl className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="invisible stat-card flex flex-col-reverse gap-1 border-l-2 border-amber-500 pl-4">
              <dt className="text-sm sm:text-base text-gray-400 font-light tracking-wide uppercase">Projects delivered</dt>
              <dd className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white">60+</dd>
            </div>
            <div className="invisible stat-card flex flex-col-reverse gap-1 border-l-2 border-amber-500 pl-4">
              <dt className="text-sm sm:text-base text-gray-400 font-light tracking-wide uppercase">Happy Clients</dt>
              <dd className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white">43+</dd>
            </div>
            <div className="invisible stat-card flex flex-col-reverse gap-1 border-l-2 border-amber-500 pl-4">
              <dt className="text-sm sm:text-base text-gray-400 font-light tracking-wide uppercase">Years of experience</dt>
              <dd className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white">6</dd>
            </div>
            <div className="invisible stat-card flex flex-col-reverse gap-1 border-l-2 border-amber-500 pl-4">
              <dt className="text-sm sm:text-base text-gray-400 font-light tracking-wide uppercase">Creativity guaranteed</dt>
              <dd className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white">100%</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}