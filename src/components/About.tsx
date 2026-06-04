"use client"

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

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
      <div className="bg-[#F6EEDD] dark:bg-amber-950/20 mt-24 py-16 overflow-hidden">
        <div className="container mx-auto px-4 w-full">
          <div className="invisible about-image relative w-full h-[50vh] sm:h-[60vh] md:h-[80vh] rounded-[30px] sm:rounded-[70px] overflow-hidden mb-12 shadow-lg">
            <Image
              src="/img/setup-odc.jpg"
              alt="setup a ODC"
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
        <div className="container mx-auto px-4 w-full text-center max-w-4xl">
          <h1 className="invisible about-title text-4xl sm:text-5xl lg:text-6xl font-bold pb-8 text-foreground leading-[1.2] tracking-tight">
            Bringing Your Ideas to Life with <span className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 bg-clip-text text-transparent">Creativity and Innovation</span>
          </h1>
          <p className="invisible about-text text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed font-light">
            In a world where user experience and tailored digital solutions make
            all the difference, <b className="text-foreground font-semibold">ZignnnIt</b> has established itself as a key
            player in graphic design, UI/UX, and web and mobile development.
            <br /><br />
            By combining creativity, technical expertise, and a deep
            understanding of business needs, we transform your ideas into
            impactful visual and digital experiences. Through our agile and
            collaborative approach, we support our clients at every stage of
            their projects—from conception to launch—with a constant focus on
            quality and innovation. <br /><br />
            With <b className="text-foreground font-semibold">ZignnnIt</b>, don’t let your projects sit on hold due to a
            lack of suitable solutions. Together, let’s build unique products
            that inspire, engage, and shape the future of your business.
          </p>
        </div>
      </div>
    </div>
  );
}
