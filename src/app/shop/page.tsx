"use client"

import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function ShopPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      ".shop-badge",
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" }
    )
    .fromTo(
      ".shop-title",
      { autoAlpha: 0, y: 40 },
      { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    )
    .fromTo(
      ".shop-subtitle",
      { autoAlpha: 0, y: 30 },
      { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" },
      "-=0.4"
    )
    .fromTo(
      ".shop-divider",
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: "power2.inOut" },
      "-=0.3"
    )
    .fromTo(
      ".shop-coming",
      { autoAlpha: 0, scale: 0.9 },
      { autoAlpha: 1, scale: 1, duration: 0.6, ease: "back.out(1.4)" },
      "-=0.3"
    )
    .fromTo(
      ".shop-description",
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.2"
    );

    // Floating animation for decorative elements
    gsap.to(".float-element-1", {
      y: -15,
      duration: 3,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    gsap.to(".float-element-2", {
      y: 12,
      duration: 2.5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: 0.5,
    });

    gsap.to(".float-element-3", {
      y: -10,
      x: 8,
      duration: 3.5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: 1,
    });

    // Pulse animation for the "coming soon" badge
    gsap.to(".pulse-ring", {
      scale: 1.5,
      opacity: 0,
      duration: 2,
      ease: "power1.out",
      repeat: -1,
    });

  }, { scope: containerRef });

  return (
    <>
      <Navbar />
      <main ref={containerRef} className="pt-24 min-h-screen bg-background relative overflow-hidden">
        {/* Decorative gradient blobs */}
        <div
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        >
          <div
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#F7B700] to-[#737373] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            style={{
              clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
            }}
          ></div>
        </div>

        <div
          className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div
            className="relative left-1/2 aspect-[1155/678] w-[36.125rem] max-w-none translate-x-[-30%] bg-gradient-to-bl from-amber-400 to-amber-700 opacity-20 sm:w-[72.1875rem]"
            style={{
              clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
            }}
          ></div>
        </div>

        {/* Floating decorative elements */}
        <div className="float-element-1 absolute top-32 left-[10%] w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 backdrop-blur-sm -z-5" aria-hidden="true"></div>
        <div className="float-element-2 absolute top-48 right-[15%] w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/20 backdrop-blur-sm -z-5" aria-hidden="true"></div>
        <div className="float-element-3 absolute bottom-32 left-[20%] w-20 h-20 rounded-3xl bg-amber-600/10 border border-amber-600/15 backdrop-blur-sm -z-5" aria-hidden="true"></div>

        {/* Main content */}
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 py-24 sm:py-32 text-center">
          {/* Badge */}
          <div className="shop-badge invisible mb-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 dark:bg-amber-500/20 px-5 py-2 text-sm font-medium text-amber-700 dark:text-amber-400 ring-1 ring-inset ring-amber-500/20">
              <span className="relative flex h-2 w-2">
                <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              New Feature
            </span>
          </div>

          {/* Title */}
          <h1 className="shop-title invisible text-5xl sm:text-7xl lg:text-8xl font-bold text-foreground tracking-tight leading-tight">
            Design
            <span className="text-amber-500"> Templates</span>
          </h1>

          {/* Subtitle */}
          <p className="shop-subtitle invisible mt-6 text-xl sm:text-2xl text-muted-foreground max-w-2xl leading-relaxed font-light">
            The ideal place where you can buy premium design templates crafted with passion and precision.
          </p>

          {/* Divider */}
          <div className="shop-divider my-10 w-24 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent origin-center"></div>

          {/* Coming Soon */}
          <div className="shop-coming invisible">
            <div className="relative inline-block">
              <h2 className="text-3xl sm:text-5xl font-extralight text-foreground tracking-[0.3em] uppercase">
                Coming Soon
              </h2>
              <div className="absolute -bottom-3 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
            </div>
          </div>

          {/* Description */}
          <p className="shop-description invisible mt-12 text-base sm:text-lg text-muted-foreground max-w-lg leading-relaxed">
            We&apos;re crafting a curated collection of professional templates — from web designs to brand identity kits. 
            Stay tuned for something extraordinary.
          </p>

          {/* Decorative icons grid */}
          <div className="shop-description invisible mt-16 flex items-center gap-8 text-muted-foreground/40">
            <div className="flex flex-col items-center gap-2">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
              </svg>
              <span className="text-xs">Design</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
              </svg>
              <span className="text-xs">Code</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
              </svg>
              <span className="text-xs">Graphics</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
              </svg>
              <span className="text-xs">Mobile</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
