"use client"

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/motion";
import { isLoaderActive, LOADER_DONE_EVENT } from "@/components/motion/FirstVisitLoader";

type HeroTitleProps = {
  /** Fixed part: "We craft brands and products that". */
  start: string;
  /** Rotating amber ending: ["stand out.", "inspire.", "convert."]. */
  words: string[];
  className?: string;
};

/** Letters inside a nowrap word span: lines can only break between words. */
function Letters({ text, className }: { text: string; className?: string }) {
  return (
    <>
      {text.split(" ").map((word, w, all) => (
        <span key={w}>
          <span className="inline-block whitespace-nowrap">
            {Array.from(word).map((char, c) => (
              <span key={c} className={cn("inline-block", className)} data-letter>
                {char}
              </span>
            ))}
          </span>
          {w < all.length - 1 && " "}
        </span>
      ))}
    </>
  );
}

/**
 * Hero h1: letter-by-letter entrance, then the amber ending cycles through `words`.
 * - No layout shift: all rotating words sit in the SAME grid cell, so the box is as
 *   wide as the longest word from the first paint and never resizes.
 * - Screen readers get the first full sentence once (aria-label), not the animation.
 * - Reduced motion: a simple fade, no rotation.
 * - The loop pauses while the hero is off screen.
 */
export default function HeroTitle({ start, words, className }: HeroTitleProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const h1 = ref.current;
    if (!h1) return;
    const reduced = prefersReducedMotion();
    const groups = gsap.utils.toArray<HTMLElement>("[data-word-index]", h1);
    const lettersOf = (el: Element) => el.querySelectorAll("[data-letter]");

    const ctx = gsap.context(() => {
      // Rotating words other than the first: make the word boxes visible and hide
      // their letters instead (GSAP's autoAlpha sets visibility:inherit on letters,
      // which would stay hidden inside a hidden parent).
      if (!reduced) {
        groups.slice(1).forEach((g) => {
          gsap.set(g, { visibility: "visible" });
          gsap.set(lettersOf(g), { autoAlpha: 0 });
        });
      }

      // Entrance (fixed part + first word), after the first-visit loader if it runs.
      const entrance = gsap.timeline({ paused: true });
      const firstLetters = [...h1.querySelectorAll("[data-start] [data-letter]"), ...lettersOf(groups[0])];
      entrance.fromTo(
        firstLetters,
        reduced ? { autoAlpha: 0 } : { autoAlpha: 0, yPercent: 40 },
        { autoAlpha: 1, yPercent: 0, duration: reduced ? 0.4 : 0.6, stagger: reduced ? 0 : 0.025, ease: "power3.out" }
      );
      if (reduced || words.length < 2) {
        entrance.play();
        return;
      }

      // Rotation loop: current word letters leave upward, next ones rise in.
      const loop = gsap.timeline({ repeat: -1, paused: true });
      groups.forEach((group, i) => {
        const next = groups[(i + 1) % groups.length];
        loop
          .to(lettersOf(group), { yPercent: -110, autoAlpha: 0, duration: 0.4, stagger: 0.02, ease: "power2.in" }, "+=2.2")
          .fromTo(
            lettersOf(next),
            { yPercent: 110, autoAlpha: 0 },
            { yPercent: 0, autoAlpha: 1, duration: 0.45, stagger: 0.02, ease: "power3.out" },
            "-=0.1"
          );
      });
      entrance.eventCallback("onComplete", () => {
        loop.play();
      });

      const startEntrance = () => entrance.play();
      if (isLoaderActive()) window.addEventListener(LOADER_DONE_EVENT, startEntrance, { once: true });
      else startEntrance();

      // Pause the loop while the hero is not visible (battery, CPU).
      const io = new IntersectionObserver(([entry]) => {
        if (!entrance.isActive() && entrance.progress() === 1) {
          if (entry.isIntersecting) loop.play();
          else loop.pause();
        }
      });
      io.observe(h1);
      return () => {
        io.disconnect();
        window.removeEventListener(LOADER_DONE_EVENT, startEntrance);
      };
    }, h1);

    return () => ctx.revert();
  }, [words]);

  return (
    <h1 ref={ref} className={className} aria-label={`${start} ${words[0]}`} data-hero-title>
      <span aria-hidden="true" data-start>
        <Letters text={start} />
      </span>{" "}
      {/* overflow-hidden keeps the leaving/arriving word inside its own line; the padding
          (cancelled by a negative margin) leaves room for accents and descenders. */}
      <span aria-hidden="true" className="inline-grid align-top text-primary overflow-hidden py-[0.15em] -my-[0.15em]">
        {words.map((word, i) => (
          <span
            key={word}
            data-word-index={i}
            className="col-start-1 row-start-1 whitespace-nowrap"
            // Only the first word is visible before JavaScript runs.
            style={i === 0 ? undefined : { visibility: "hidden" }}
          >
            <Letters text={word} />
          </span>
        ))}
      </span>
    </h1>
  );
}
