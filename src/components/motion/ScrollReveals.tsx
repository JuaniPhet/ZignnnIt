"use client"

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Declarative scroll reveals: add `data-reveal` to any element (section title,
 * card…) and it fades/slides in when it enters the viewport. Elements entering
 * together are staggered (ScrollTrigger.batch), e.g. a row of cards.
 * - Nothing is hidden in the HTML: without JavaScript everything stays visible.
 * - Reduced motion: opacity only, no movement.
 * - Runs again after each client-side navigation.
 */
export default function ScrollReveals() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    if (!elements.length) return;
    const y = prefersReducedMotion() ? 0 : 40;

    gsap.set(elements, { autoAlpha: 0, y });
    const triggers = ScrollTrigger.batch(elements, {
      start: "top 88%",
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1, overwrite: true }),
    });

    return () => {
      triggers.forEach((t) => t.kill());
      gsap.set(elements, { clearProps: "opacity,visibility,transform" });
    };
  }, [pathname]);

  return null;
}
