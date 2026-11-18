"use client"

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { featuredProjects } from "@/data/projects";
import ProjectCard from "@/components/projects/ProjectCard";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations("projects");
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
          <div className="px-4 sm:px-6 lg:px-8 w-full mb-8 sm:mb-10">
            <div className="invisible projects-heading container mx-auto max-w-7xl w-full">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
                {t.rich("title", { hl: (chunks) => <span className="text-amber">{chunks}</span> })}
              </h2>
              <p className="mt-2 sm:mt-3 text-base sm:text-lg lg:text-xl text-muted-foreground">
                {t("subtitle")}
              </p>
            </div>
          </div>

          <div
            ref={scrollTrackRef}
            className="flex gap-x-6 lg:gap-x-12 will-change-transform"
            style={{
              width: "max-content",
              paddingLeft: "max(1rem, calc((100vw - 1280px) / 2 + 2rem))",
              paddingRight: "max(1rem, calc((100vw - 1280px) / 2 + 2rem))",
            }}
          >
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 500px, 600px"
                className="justify-between w-[calc(100vw-2rem)] lg:w-[500px] xl:w-[600px] flex-shrink-0"
              />
            ))}

            {/* "See all projects" CTA card */}
            <Link
              href="/projects"
              className="flex flex-col items-center justify-center w-[calc(100vw-2rem)] lg:w-[500px] xl:w-[600px] flex-shrink-0 group relative"
            >
              {/* Fine glowing gradient line border */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-amber/40 via-primary to-amber/40 rounded-2xl opacity-50 group-hover:opacity-100 blur-[1px] group-hover:blur-[3px] transition-all duration-500"></div>

              <div className="relative bg-secondary/90 dark:bg-card/90 backdrop-blur-sm rounded-2xl w-full aspect-[16/9] shadow-xl flex flex-col items-center justify-center gap-4 sm:gap-6 transition-all duration-300">
                <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 border border-primary/20 shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary w-6 h-6 sm:w-7 sm:h-7 lg:w-9 lg:h-9 group-hover:translate-x-1 transition-transform duration-300"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
                <div className="text-center px-4 sm:px-6">
                  <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-foreground">
                    {t("seeAll")}
                  </h3>
                  <p className="mt-1 sm:mt-2 text-xs sm:text-sm lg:text-base text-muted-foreground">
                    {t("seeAllSubtitle")}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
