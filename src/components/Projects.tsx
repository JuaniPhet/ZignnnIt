"use client"

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const projectsList = [
  {
    title: "Lumax",
    image: "/img/lumax_identity.png",
    tools: [
      { src: "/img/tools/ai.png", alt: "Illustrator" },
      { src: "/img/tools/ps.png", alt: "Photoshop" }
    ],
    link: "https://drive.google.com/file/d/1qWO4bgiAeg4e2IQuQLAvj-CxLUGkoTez/view?usp=sharing",
    description: "A modern visual identity for Lumax — logo, stationery, and branding crafted with precision."
  },
  {
    title: "Profinder",
    image: "/img/profinder.png",
    tools: [
      { src: "/img/tools/figma.png", alt: "Figma" }
    ],
    link: "https://www.figma.com/design/n5ZAKBrEqYaqXhaqX5QZMR/ProFinder?node-id=0-1&t=aqo6HehkOGyaAy93-1",
    description: "An intuitive platform connecting professionals with clients through a sleek, engaging interface."
  },
  {
    title: "ZignnnIt",
    image: "/img/zignnnit_img.png",
    tools: [
      { src: "/img/tools/html5.png", alt: "Html 5" },
      { src: "/img/tools/css3.png", alt: "Css 3" },
      { src: "/img/tools/JavaScript-logo.png", alt: "Javascript" },
      { src: "/img/tools/Tailwind_CSS_Logo.png", alt: "Tailwindcss" },
      { src: "/img/tools/vs_code.png", alt: "Vs Code" }
    ],
    link: "#",
    description: "Our own digital presence — creativity, innovation, and cutting-edge technology in one platform."
  },
  {
    title: "BMI Calculator",
    image: "/img/bmi_calculator.jpg",
    tools: [
      { src: "/img/tools/flutter.png", alt: "Flutter" },
      { src: "/img/tools/vs_code.png", alt: "VS Code" }
    ],
    link: "https://www.linkedin.com/posts/japhetseumo_flutter-caparledev-generativeia-activity-7231597137422159872-eqgv?utm_source=share&utm_medium=member_android",
    description: "A user-friendly Flutter app for health insights and personalized BMI recommendations."
  }
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !triggerRef.current || !scrollTrackRef.current) return;

    const scrollTrack = scrollTrackRef.current;

    // Entrance animation for heading
    gsap.fromTo(
      ".projects-heading",
      { autoAlpha: 0, y: 40 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    // Calculate how far we need to scroll
    const getScrollAmount = () => {
      return -(scrollTrack.scrollWidth - window.innerWidth);
    };

    const tween = gsap.to(scrollTrack, {
      x: getScrollAmount,
      ease: "none",
    });

    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: "top top",
      end: () => `+=${scrollTrack.scrollWidth - window.innerWidth}`,
      pin: true,
      animation: tween,
      scrub: 2,
      invalidateOnRefresh: true,
      anticipatePin: 1,
    });

    return () => {
      scrollTriggerInstance.kill();
      tween.kill();
    };
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="projects">
      <div ref={triggerRef} className="overflow-hidden">
        <div className="bg-background pt-24 pb-10 min-h-screen flex flex-col justify-center">
          <div className="invisible projects-heading container mx-auto px-4 w-full mb-10">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground tracking-tight leading-[1.1]">
              Our <span className="text-amber-500">Projects</span>
            </h2>
            <p className="mt-3 text-lg sm:text-xl text-muted-foreground font-light tracking-wide">
              Missions we&apos;ve successfully completed.
            </p>
          </div>

          <div
            ref={scrollTrackRef}
            className="flex px-4 sm:px-10 gap-x-12 will-change-transform"
            style={{ width: "max-content" }}
          >
            {projectsList.map((project, idx) => (
              <article
                key={idx}
                className="flex flex-col justify-between w-[85vw] sm:w-[500px] md:w-[600px] flex-shrink-0"
              >
                <div className="bg-amber-100 dark:bg-amber-950/20 rounded-2xl w-full h-64 sm:h-80 md:h-96 shadow-xl relative overflow-hidden group">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 85vw, (max-width: 768px) 500px, 600px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Overlay for description on hover */}
                  <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-6 sm:p-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                    <p className="text-white text-base sm:text-lg text-center leading-relaxed font-light">
                      {project.description}
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="flex flex-wrap gap-4 justify-between items-center">
                    <h3 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
                      {project.title}
                    </h3>

                    {/* Tools logos */}
                    <div className="flex gap-2 h-8">
                      {project.tools.map((tool, tIdx) => (
                        <img
                          key={tIdx}
                          src={tool.src}
                          alt={tool.alt}
                          className="h-full w-auto object-contain dark:brightness-200 dark:contrast-100"
                        />
                      ))}
                    </div>

                    <div>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button
                          type="button"
                          className="bg-primary text-primary-foreground px-5 py-2 font-bold rounded-lg hover:bg-amber-600 transition-colors text-sm sm:text-base"
                        >
                          Voir plus
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
