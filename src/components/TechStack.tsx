"use client"

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface ToolItem {
  src: string;
  alt: string;
  invertDark?: boolean;
}

const toolsList: ToolItem[] = [
  // Design & Creative
  { src: "/img/tools/adobe-illustrator.svg", alt: "Illustrator" },
  { src: "/img/tools/adobe-photoshop.svg", alt: "Photoshop" },
  { src: "/img/tools/adobe-indesign.svg", alt: "InDesign" },
  { src: "/img/tools/adobe-xd.svg", alt: "XD" },
  { src: "/img/tools/figma.svg", alt: "Figma" },
  { src: "/img/tools/canva.svg", alt: "Canva" },
  { src: "/img/tools/framer.svg", alt: "Framer", invertDark: true },

  // Web Frontend
  { src: "/img/tools/html-5.svg", alt: "HTML 5" },
  { src: "/img/tools/css-3.svg", alt: "CSS 3" },
  { src: "/img/tools/javascript.svg", alt: "JavaScript" },
  { src: "/img/tools/typescript.svg", alt: "TypeScript" },
  { src: "/img/tools/react.svg", alt: "React" },
  { src: "/img/tools/nextjs.svg", alt: "Next.js", invertDark: true },
  { src: "/img/tools/tailwindcss.svg", alt: "Tailwind CSS" },
  { src: "/img/tools/bootstrap.svg", alt: "Bootstrap" },
  { src: "/img/tools/gsap.svg", alt: "GSAP" },
  { src: "/img/tools/google-fonts.svg", alt: "Google Fonts" },

  // Backend & Databases
  { src: "/img/tools/python.svg", alt: "Python" },
  { src: "/img/tools/django.svg", alt: "Django" },
  { src: "/img/tools/mysql-wordmark.svg", alt: "MySQL" },
  { src: "/img/tools/postgresql.svg", alt: "PostgreSQL" },

  // Mobile & Platforms
  { src: "/img/tools/flutter.svg", alt: "Flutter" },
  { src: "/img/tools/android.svg", alt: "Android" },
  { src: "/img/tools/apple.svg", alt: "iOS", invertDark: true },
  { src: "/img/tools/microsoft-windows.svg", alt: "Windows" },

  // DevOps & Cloud
  { src: "/img/tools/docker.svg", alt: "Docker" },
  { src: "/img/tools/visual-studio-code.svg", alt: "VS Code" },
  { src: "/img/tools/github.svg", alt: "GitHub", invertDark: true },
  { src: "/img/tools/vercel.svg", alt: "Vercel", invertDark: true },

  // AI & Ecosystem
  { src: "/img/tools/gemini.svg", alt: "Gemini" },
  { src: "/img/tools/claude.svg", alt: "Claude" },
  { src: "/img/tools/google-antigravity.svg", alt: "Google Antigravity" }
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
      duration: 65,
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
              className={`h-full w-auto object-contain grayscale hover:filter-none opacity-50 hover:opacity-100 transition-all duration-300 ${
                tool.invertDark ? "dark:invert" : "dark:brightness-200 dark:contrast-100"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
