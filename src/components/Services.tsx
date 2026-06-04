"use client"

import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const services = [
  {
    value: "graphic-design",
    title: "Graphic Design",
    quote: "“Transforming your ideas into captivating visuals.”",
    description: "At ZignnnIt, we bring your brand to life with unique and impactful designs. From logos to marketing materials, we create visuals that resonate with your audience and convey your message effectively. Our approach combines creativity, precision, and attention to detail to ensure your brand stands out in a crowded marketplace.",
    image: "/img/graphic_design.jpg",
  },
  {
    value: "ui-ux-design",
    title: "UI UX Design",
    quote: "“Designing intuitive and delightful user experiences.”",
    description: "User experience is at the heart of everything we do. Whether it's a mobile app, website, or software, our UI/UX design team crafts interfaces that are not only visually appealing but also user-friendly and functional. We focus on understanding your users' needs to deliver seamless interactions that drive engagement and satisfaction.",
    image: "/img/ui_ux_design.jpg",
  },
  {
    value: "web-development",
    title: "Web Development",
    quote: "“Building websites that inspire and perform.”",
    description: "We create dynamic and responsive websites tailored to your business goals. From e-commerce platforms to portfolio websites, our development process focuses on performance, security, and scalability. Let ZignnnIt help you establish a strong online presence that leaves a lasting impression.",
    image: "/img/web_dev.jpg",
  },
  {
    value: "mobile-development",
    title: "Mobile Development",
    quote: "“Creating mobile solutions for a connected world.”",
    description: "Our mobile development services deliver apps that are both functional and engaging. Whether it's iOS or Android, we build custom solutions that align with your vision and meet your users' needs. From concept to launch, we ensure your app is optimized for performance, usability, and market success.",
    image: "/img/mobile_dev.jpg",
  },
];

export default function Services() {
  return (
    <section className="pt-40 container mx-auto px-4 w-full" id="services">
      <div>
        <h2 className="text-pretty text-4xl font-extralight text-foreground sm:text-5xl">
          Services
        </h2>
        <p className="pt-6 pb-10 text-2xl text-muted-foreground">
          Learn how to grow your business with our expertise.
        </p>
      </div>

      <Accordion className="w-full">
        {services.map((service) => (
          <AccordionItem 
            key={service.value} 
            value={service.value}
            className="border-b border-border py-4"
          >
            <AccordionTrigger className="text-3xl sm:text-5xl text-muted-foreground hover:text-foreground font-light hover:no-underline duration-300 py-6 transition-colors [&[data-state=open]]:text-foreground [&[data-state=open]]:font-semibold">
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
                    className="object-cover"
                  />
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <h3 className="text-2xl font-medium text-foreground mb-4">
                    {service.quote}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
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
