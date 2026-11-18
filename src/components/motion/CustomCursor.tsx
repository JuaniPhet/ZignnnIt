"use client"

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";

const INTERACTIVE = "a, button, [role='button'], label, select, summary";

/**
 * Desktop-only custom cursor + magnetic buttons.
 * - An amber dot follows the mouse (gsap.quickTo = one reusable tween, smooth and cheap).
 * - It grows over clickable elements and shows "View" over [data-cursor="view"].
 * - [data-magnetic] elements are pulled slightly toward the pointer.
 * Never mounted on touch screens or with prefers-reduced-motion; the native cursor
 * stays visible in text fields.
 */
export default function CustomCursor() {
  const t = useTranslations("cursor");
  const wrapRef = useRef<HTMLDivElement>(null); // follows the pointer
  const dotRef = useRef<HTMLDivElement>(null); // scales
  const labelRef = useRef<HTMLSpanElement>(null); // fades (real size, stays crisp)

  useEffect(() => {
    const wrap = wrapRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!wrap || !dot || !label || !hasFinePointer() || prefersReducedMotion()) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");
    gsap.set(wrap, { autoAlpha: 0 });

    const moveX = gsap.quickTo(wrap, "x", { duration: 0.35, ease: "power3.out" });
    const moveY = gsap.quickTo(wrap, "y", { duration: 0.35, ease: "power3.out" });
    let state: "default" | "hover" | "view" = "default";
    let magnet: HTMLElement | null = null;

    const setState = (next: typeof state) => {
      if (next === state) return;
      state = next;
      gsap.to(dot, {
        scale: next === "view" ? 5.5 : next === "hover" ? 3 : 1,
        backgroundColor: next === "hover" ? "rgba(245,158,11,0.25)" : "rgba(245,158,11,1)",
        duration: 0.3,
        ease: "power3.out",
      });
      gsap.to(label, { autoAlpha: next === "view" ? 1 : 0, duration: 0.2 });
    };

    const releaseMagnet = () => {
      if (!magnet) return;
      gsap.to(magnet, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
      magnet = null;
    };

    const onMove = (e: PointerEvent) => {
      gsap.to(wrap, { autoAlpha: 1, duration: 0.2, overwrite: "auto" });
      moveX(e.clientX);
      moveY(e.clientY);

      const target = e.target as Element | null;
      const view = target?.closest?.("[data-cursor='view']");
      setState(view ? "view" : target?.closest?.(INTERACTIVE) ? "hover" : "default");

      // Magnetic pull: move the element by 30% of the pointer's offset from its centre.
      const m = target?.closest?.<HTMLElement>("[data-magnetic]") ?? null;
      if (m !== magnet) releaseMagnet();
      if (m) {
        magnet = m;
        const r = m.getBoundingClientRect();
        gsap.to(m, {
          x: (e.clientX - (r.left + r.width / 2)) * 0.3,
          y: (e.clientY - (r.top + r.height / 2)) * 0.3,
          duration: 0.4,
          ease: "power3.out",
        });
      }
    };
    const onLeaveWindow = () => {
      gsap.to(wrap, { autoAlpha: 0, duration: 0.2 });
      releaseMagnet();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeaveWindow);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeaveWindow);
      root.classList.remove("has-custom-cursor");
      releaseMagnet();
    };
  }, []);

  return (
    <div ref={wrapRef} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[90] invisible">
      <div ref={dotRef} className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber" />
      <span
        ref={labelRef}
        className="invisible absolute -translate-x-1/2 -translate-y-1/2 text-xs font-semibold uppercase tracking-wider text-carbon"
      >
        {t("view")}
      </span>
    </div>
  );
}
