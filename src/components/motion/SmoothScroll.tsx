"use client"

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "@/i18n/navigation";
import { HEADER_OFFSET, prefersReducedMotion, setLenis, getLenis } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Smooth scrolling with Lenis, driven by GSAP's ticker so that ScrollTrigger
 * (reveals, pinned projects carousel, parallax) and Lenis share one clock and
 * never get out of sync.
 * - Disabled with prefers-reduced-motion (native scrolling).
 * - Touch devices keep native scrolling (Lenis' default: syncTouch false).
 * - anchors: clicks on "#services" links scroll smoothly, below the fixed header.
 */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      lerp: 0.1,
      autoRaf: false,
      anchors: { offset: -HEADER_OFFSET },
    });
    setLenis(lenis);

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000); // GSAP time is in seconds
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  // New page: start at the top (Lenis keeps its own scroll target) and let
  // ScrollTrigger re-measure the new layout. A #hash in the URL is honoured.
  useEffect(() => {
    const lenis = getLenis();
    const hash = window.location.hash;
    const target = hash ? document.querySelector(hash) : null;
    if (lenis) {
      if (target) lenis.scrollTo(target as HTMLElement, { offset: -HEADER_OFFSET, immediate: true });
      else lenis.scrollTo(0, { immediate: true });
    }
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
