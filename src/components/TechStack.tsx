"use client"

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const toolsList = [
  { src: "/img/tools/ai.png", alt: "Illustrator" },
  { src: "/img/tools/ps.png", alt: "Photoshop" },
  { src: "/img/tools/indesign.png", alt: "Indesign" },
  { src: "/img/tools/xd.png", alt: "XD" },
  { src: "/img/tools/html5.png", alt: "HTML 5" },
  { src: "/img/tools/css3.png", alt: "CSS 3" },
  { src: "/img/tools/JavaScript-logo.png", alt: "Javascript" },
  { src: "/img/tools/typescript.png", alt: "Typescript" },
  { src: "/img/tools/react-logo.png", alt: "React js" },
  { src: "/img/tools/Tailwind_CSS_Logo.png", alt: "Tailwindcss" },
  { src: "/img/tools/python.png", alt: "Python" },
  { src: "/img/tools/django-logo.png", alt: "Django" },
  { src: "/img/tools/Mysql_logo.png", alt: "Mysql" },
  { src: "/img/tools/flutter.png", alt: "Flutter" },
  { src: "/img/tools/figma.png", alt: "Figma" },
  { src: "/img/tools/canva.png", alt: "Canva" },
  { src: "/img/tools/vs_code.png", alt: "Vs Code" },
  { src: "/img/tools/windows.png", alt: "Windows" },
  { src: "/img/tools/android_logo.png", alt: "Android" },
  { src: "/img/tools/apple-logo.png", alt: "iOS" }
];

export default function TechStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  // Double the array to allow seamless scrolling
  const items = [...toolsList, ...toolsList];

  useGSAP(() => {
    if (!scrollRef.current) return;

    // We animate translating X to half the width of the full scroll container
    animationRef.current = gsap.to(scrollRef.current, {
      x: "-50%",
      duration: 45,
      ease: "linear",
      repeat: -1
    });
  }, { scope: containerRef });

  const handleMouseEnter = () => {
    if (animationRef.current) animationRef.current.pause();
  };

  const handleMouseLeave = () => {
    if (animationRef.current) animationRef.current.play();
  };

  return (
    <div
      ref={containerRef}
      className="overflow-hidden relative stack-container w-full py-10 bg-background"
    >
      <div
        ref={scrollRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex h-10 sm:h-14 gap-8 sm:gap-16 lg:gap-24 w-max cursor-pointer"
      >
        {items.map((tool, index) => (
          <div key={index} className="h-full w-auto relative flex-shrink-0">
            <img
              src={tool.src}
              alt={tool.alt}
              className="h-full w-auto object-contain grayscale dark:brightness-200 dark:contrast-100 hover:filter-none opacity-50 hover:opacity-100 transition-all duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
