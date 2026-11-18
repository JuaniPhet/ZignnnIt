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
    deliverables: ["Logo & visual identity", "Brand guidelines", "Print & marketing materials", "Social media kits"],
    timeline: "1–3 weeks",
    image: "/img/services/graphic_design.jpg",
  },
  {
    value: "ui-ux-design",
    title: "UI/UX Design",
    quote: "\u201CIntuitive interfaces, delightful experiences.\u201D",
    description: "Our UI/UX team crafts visually appealing, user-friendly interfaces that drive engagement and satisfaction across every screen.",
    deliverables: ["User research & user flows", "Wireframes", "High-fidelity mockups", "Interactive Figma prototype"],
    timeline: "2–4 weeks",
    image: "/img/services/ui_ux_design.jpg",
  },
  {
    value: "web-development",
    title: "Web Development",
    quote: "\u201CWebsites that inspire and perform.\u201D",
    description: "Dynamic, responsive websites tailored to your business goals\u2014built for performance, security, and scalability.",
    deliverables: ["Showcase websites & landing pages", "Web apps & dashboards", "SEO & performance optimization", "Deployment & hosting setup"],
    timeline: "2–8 weeks",
    image: "/img/services/web_dev.jpg",
  },
  {
    value: "mobile-development",
    title: "Mobile Development",
    quote: "\u201CMobile solutions for a connected world.\u201D",
    description: "Custom iOS and Android apps optimized for performance and usability, from concept to market launch.",
    deliverables: ["iOS & Android apps (Flutter)", "App UI design", "API & back-end integration", "App Store & Play Store publishing"],
    timeline: "6–12 weeks",
    image: "/img/services/mobile_dev.jpg",
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
    <section ref={sectionRef} className="pt-24 lg:pt-32 px-4 sm:px-6 lg:px-8 w-full" id="services">
      <div className="container mx-auto max-w-7xl w-full">
        <div className="invisible services-heading">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground">
            Our <span className="text-amber">Services</span>
          </h2>
          <p className="pt-4 pb-10 text-lg sm:text-xl text-muted-foreground">
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
              {/* Base UI exposes the open state through aria-expanded (not Radix's data-state). */}
              <AccordionTrigger className="font-sans font-semibold tracking-tight leading-tight text-3xl sm:text-4xl lg:text-5xl text-foreground hover:text-amber-deep aria-expanded:text-amber-deep dark:hover:text-amber dark:aria-expanded:text-amber hover:no-underline duration-300 py-6 transition-colors">
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
                    <p className="font-semibold leading-snug text-xl sm:text-2xl text-foreground">
                      {service.quote}
                    </p>
                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                    <p className="text-sm font-semibold uppercase tracking-wider text-foreground !mb-2">Deliverables</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-5">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-base text-muted-foreground">
                          <i className="ri-check-line text-amber-deep dark:text-amber text-lg leading-6" aria-hidden="true"></i>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="inline-flex self-start items-center gap-2 rounded-full bg-amber/15 border border-amber/30 px-3 py-1.5 text-sm text-foreground">
                      <i className="ri-time-line" aria-hidden="true"></i>
                      <span>Indicative timeline: <b className="font-semibold">{service.timeline}</b></span>
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
