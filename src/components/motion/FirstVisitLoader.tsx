"use client"

import { useEffect, useRef } from "react";
import gsap from "gsap";

export const LOADER_KEY = "zg-loader-seen";
export const LOADER_DONE_EVENT = "zg:loader-done";

/**
 * Runs in <head> before the first paint (see layout). Without reduced motion it:
 * - adds the "motion" class (CSS hides the hero letters until GSAP animates them,
 *   so the title never flashes in full before its entrance);
 * - shows the loader on the first visit of the session.
 * Doing this in React would be too late: the first paint would already be on screen.
 */
export const headInitScript = `try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches){var d=document.documentElement;d.classList.add("motion");if(!sessionStorage.getItem("${LOADER_KEY}")){d.dataset.loader="1"}}}catch(e){}`;

/** True while the first-visit loader covers the page (hero entrance waits for it). */
export const isLoaderActive = () => typeof document !== "undefined" && document.documentElement.dataset.loader === "1";

/**
 * First-visit loader (≤ 1.2 s, once per session): the signature "Design. Code. Zignnn."
 * word by word, then the carbon panel slides up to reveal the page.
 * Hidden by CSS unless <html data-loader="1">; a CSS fallback removes it after 2.5 s
 * even if JavaScript fails.
 */
export default function FirstVisitLoader({ signature }: { signature: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !isLoaderActive()) return;
    try {
      sessionStorage.setItem(LOADER_KEY, "1");
    } catch {}

    const finish = () => {
      delete document.documentElement.dataset.loader;
      window.dispatchEvent(new Event(LOADER_DONE_EVENT));
    };
    const tl = gsap.timeline({ onComplete: finish });
    tl.from(el.querySelectorAll("[data-word]"), { yPercent: 110, autoAlpha: 0, duration: 0.35, stagger: 0.12, ease: "power3.out" })
      .to(el, { yPercent: -100, duration: 0.45, ease: "power3.inOut" }, 0.75);

    return () => {
      tl.kill();
    };
  }, []);

  const words = signature.split(" ");
  return (
    <div id="zg-loader" ref={ref} aria-hidden="true" className="fixed inset-0 z-[110] items-center justify-center bg-carbon">
      <p className="flex gap-3 overflow-hidden font-display text-4xl sm:text-6xl font-extrabold text-white">
        {words.map((word, i) => (
          <span key={i} data-word className={i === words.length - 1 ? "text-amber" : undefined}>
            {word}
          </span>
        ))}
      </p>
    </div>
  );
}
