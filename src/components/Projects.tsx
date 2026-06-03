"use client"

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    description: "Designed a modern and professional visual identity for Lumax, capturing the essence of their innovative brand. From logo creation to branded stationery, every detail was crafted with precision."
  },
  {
    title: "Profinder",
    image: "/img/profinder.png",
    tools: [
      { src: "/img/tools/figma.png", alt: "Figma" }
    ],
    link: "https://www.figma.com/design/n5ZAKBrEqYaqXhaqX5QZMR/ProFinder?node-id=0-1&t=aqo6HehkOGyaAy93-1",
    description: "ProFinder is an intuitive platform connecting professionals with clients through a sleek and engaging interface. Each feature is thoughtfully designed for seamless navigation and user satisfaction."
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
    description: "ZignnnIt specializes in crafting exceptional digital solutions. From sleek mobile apps to intuitive web platforms, we combine creativity, innovation, and cutting-edge technology to bring your vision to life."
  },
  {
    title: "BMI Calculator",
    image: "/img/bmi_calculator.jpg",
    tools: [
      { src: "/img/tools/flutter.png", alt: "Flutter" },
      { src: "/img/tools/vs_code.png", alt: "VS Code" }
    ],
    link: "https://www.linkedin.com/posts/japhetseumo_flutter-caparledev-generativeia-activity-7231597137422159872-eqgv?utm_source=share&utm_medium=member_android",
    description: "The BMI Calculator app helps you easily determine your Body Mass Index. With a user-friendly interface, it provides insights into your health and personalized recommendations for a balanced lifestyle."
  }
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !triggerRef.current || !scrollTrackRef.current) return;

    const scrollTrack = scrollTrackRef.current;

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
  }, []);

  return (
    <section ref={sectionRef} id="projects">
      <div ref={triggerRef} className="overflow-hidden">
        <div className="bg-background pt-24 pb-10 min-h-screen flex flex-col justify-center">
          <div className="container mx-auto px-4 w-full mb-10">
            <h2 className="text-pretty text-4xl font-extralight text-foreground sm:text-5xl">
              Projects
            </h2>
            <p className="mt-2 text-2xl text-muted-foreground">
              Take a look at missions we&apos;ve successfully completed.
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
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-6">
                  <div className="flex flex-wrap gap-4 justify-between items-center">
                    <h3 className="text-2xl sm:text-3xl font-semibold text-foreground">
                      {project.title}
                    </h3>
                    
                    {/* Tools logos */}
                    <div className="flex gap-2 h-8">
                      {project.tools.map((tool, tIdx) => (
                        <div key={tIdx} className="h-full relative w-8">
                          <Image 
                            src={tool.src} 
                            alt={tool.alt} 
                            fill 
                            className="object-contain dark:brightness-200 dark:contrast-100"
                          />
                        </div>
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
                          className="bg-primary text-primary-foreground px-5 py-2 font-bold rounded-lg hover:bg-amber-600 transition-colors"
                        >
                          Voir plus
                        </button>
                      </a>
                    </div>
                  </div>
                  <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
