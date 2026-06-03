"use client"

import Image from "next/image";

export default function About() {
  return (
    <div id="about-us">
      {/* Notre environnement de travail */}
      <div className="bg-[#F6EEDD] dark:bg-amber-950/20 mt-24 py-16">
        <div className="container mx-auto px-4 w-full">
          <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[80vh] rounded-[30px] sm:rounded-[70px] overflow-hidden mb-12 shadow-lg">
            <Image
              src="/img/setup-odc.jpg"
              alt="setup a ODC"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="container mx-auto px-4 w-full text-center max-w-4xl">
          <h1 className="text-3xl sm:text-5xl font-bold pb-8 text-foreground leading-tight">
            Bringing Your Ideas to Life with Creativity and Innovation
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            In a world where user experience and tailored digital solutions make
            all the difference, <b className="text-foreground">ZignnnIt</b> has established itself as a key
            player in graphic design, UI/UX, and web and mobile development.
            <br /><br />
            By combining creativity, technical expertise, and a deep
            understanding of business needs, we transform your ideas into
            impactful visual and digital experiences. Through our agile and
            collaborative approach, we support our clients at every stage of
            their projects—from conception to launch—with a constant focus on
            quality and innovation. <br /><br />
            With <b className="text-foreground">ZignnnIt</b>, don’t let your projects sit on hold due to a
            lack of suitable solutions. Together, let’s build unique products
            that inspire, engage, and shape the future of your business.
          </p>
        </div>
      </div>
    </div>
  );
}
