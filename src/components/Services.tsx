"use client"

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    value: "graphic-design",
    title: "Graphic Design",
    quote: "\u201CTransforming ideas into captivating visuals.\u201D",
    description: "We bring your brand to life with unique, impactful designs\u2014from logos to marketing materials\u2014crafted with precision and attention to detail.",
    image: "/img/graphic_design.jpg",
  },
  {
    value: "ui-ux-design",
    title: "UI UX Design",
    quote: "\u201CIntuitive interfaces, delightful experiences.\u201D",
    description: "Our UI/UX team crafts visually appealing, user-friendly interfaces that drive engagement and satisfaction across every screen.",
    image: "/img/ui_ux_design.jpg",
  },
  {
    value: "web-development",
    title: "Web Development",
    quote: "\u201CWebsites that inspire and perform.\u201D",
    description: "Dynamic, responsive websites tailored to your business goals\u2014built for performance, security, and scalability.",
    image: "/img/web_dev.jpg",
  },
  {
    value: "mobile-development",
    title: "Mobile Development",
    quote: "\u201CMobile solutions for a connected world.\u201D",
    description: "Custom iOS and Android apps optimized for performance and usability, from concept to market launch.",
    image: "/img/mobile_dev.jpg",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Entrance animation for the heading area
    gsap.fromTo(
      ".services-heading",
      { autoAlpha: 0, y: 40 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );

    // Staggered entrance for each accordion item
    gsap.fromTo(
      ".services-item",
      { autoAlpha: 0, y: 30 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".services-accordion",
          start: "top 80%",
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="pt-40 container mx-auto px-4 w-full" id="services">
      <div className="invisible services-heading">
        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground tracking-tight leading-[1.1]">
          Our <span className="text-amber-500">Services</span>
        </h2>
        <p className="pt-4 pb-10 text-lg sm:text-xl text-muted-foreground font-light tracking-wide">
          Grow your business with our expertise.
        </p>
      </div>

      <Accordion className="w-full services-accordion">
        {services.map((service) => (
          <AccordionItem
            key={service.value}
            value={service.value}
            className="invisible services-item border-b border-border py-4"
          >
            <AccordionTrigger className="text-3xl sm:text-4xl lg:text-5xl text-muted-foreground hover:text-foreground font-extralight hover:no-underline duration-300 py-6 transition-colors [&[data-state=open]]:text-foreground [&[data-state=open]]:font-semibold">
              {service.title}
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col md:flex-row items-start justify-center gap-8 py-6">
                <div className="relative w-full md:w-1/2 h-60 rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <h3 className="text-xl sm:text-2xl font-medium text-foreground mb-4">
                    {service.quote}
                  </h3>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-light">
                    {service.description}
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
